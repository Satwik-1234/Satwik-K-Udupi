import { useEffect, useRef } from 'react';

/**
 * Full-viewport generative topographic map.
 *  - contour lines are isolines of a fractal heightfield (index contour every 5th)
 *  - below the water level the map switches to blue bathymetric linework + wash
 *  - level rises with page scroll; the cursor pours water locally; clicks drop rain rings
 * Pure WebGL (no three.js) so it stays light. Falls back to plain paper without WebGL.
 */

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;

const FRAG = `#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform float uLevel; uniform vec2 uMouse; uniform float uMouseOn;
uniform vec3 uPaper; uniform vec3 uInk; uniform vec3 uWater; uniform vec3 uWash; uniform vec3 uSignal;
uniform vec4 uRain[6];

float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y);
}
float fbm(vec2 p){
  float a=.5, s=0.;
  for(int i=0;i<5;i++){ s+=a*noise(p); p=mat2(1.6,1.2,-1.2,1.6)*p+7.1; a*=.5; }
  return s;
}
float height(vec2 p){
  vec2 q = p*1.15 + vec2(uTime*.006, -uTime*.004);
  float h = fbm(q + 1.8*fbm(q*.7));
  // carve a meandering river valley
  float v = abs(p.y*.9 + .35*sin(p.x*1.6+1.2) + .12*sin(p.x*4.1) - .05);
  h -= .22*exp(-v*v*7.);
  return h;
}

void main(){
  vec2 uv = gl_FragCoord.xy/uRes;
  float asp = uRes.x/uRes.y;
  vec2 p = (uv-.5)*vec2(asp,1.)*2.2;

  float h = height(p);

  // local flooding under the cursor + rain rings
  vec2 m = (uMouse-.5)*vec2(asp,1.)*2.2;
  float pour = uMouseOn*.2*exp(-dot(p-m,p-m)*5.5);
  float rain = 0.;
  for(int i=0;i<6;i++){
    vec4 r = uRain[i]; // xy pos(uv), z age, w active
    if(r.w>.5){
      vec2 rp = (r.xy-.5)*vec2(asp,1.)*2.2;
      float d = length(p-rp);
      float ring = abs(d - r.z*.9);
      rain += (1.-smoothstep(0.,.012,ring))*(1.-r.z/1.4)*.9;
    }
  }
  float level = uLevel + pour;
  float depth = level - h;           // >0 under water

  // contour set
  float N = 26.;
  float hv = h*N;
  float d1 = abs(fract(hv-.5)-.5)/ (fwidth(hv)+1e-4);
  float line = 1.-smoothstep(.5,1.1,d1);
  float idx  = floor(hv+.5);
  float isIdx = step(mod(idx,5.),.5);
  float lineIdx = 1.-smoothstep(.9,1.9,d1);

  vec3 col = uPaper;
  // paper grain
  col -= (hash(gl_FragCoord.xy)*.035);
  // faint hypsometric tint on the high ground
  col = mix(col, uPaper*.93, smoothstep(.5,.8,h)*.6);

  float wet = smoothstep(-.004,.004,depth);
  // water wash + bathymetric lines
  vec3 wcol = mix(uWash, uWater, smoothstep(0.,.22,depth)*.55);
  col = mix(col, wcol, wet*.82);
  float bv = depth*N*1.6;
  float bathy = 1.-smoothstep(.5,1.1, abs(fract(bv-.5)-.5)/(fwidth(bv)+1e-4));
  col = mix(col, uWater, bathy*wet*.35);

  // terrain contours (ink on land, water-blue under water)
  vec3 lineCol = mix(uInk, uWater, wet);
  col = mix(col, lineCol, line*.34*(1.-wet*.35));
  col = mix(col, lineCol, lineIdx*isIdx*.62);

  // shoreline in signal colour
  float shore = 1.-smoothstep(0.,1.6, abs(depth)/(fwidth(depth)+1e-4));
  col = mix(col, uSignal, shore*.9);

  // rain rings
  col = mix(col, uWater, clamp(rain,0.,1.)*.85);

  // soft vignette keeps edges calm
  float vig = smoothstep(1.25,.35,length(uv-.5)*1.25);
  col = mix(uPaper, col, .55+.45*vig);
  gl_FragColor = vec4(col,1.);
}`;

const hex = (h: string): [number, number, number] => {
  const n = parseInt(h.replace('#', ''), 16);
  return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

interface Props {
  paper?: string; ink?: string; water?: string; wash?: string; signal?: string;
}

export default function ContourField({
  paper = '#f2ede2', ink = '#0f2236', water = '#1c58a8', wash = '#bcd3ee', signal = '#d8472b',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' });
    if (!gl) return;
    gl.getExtension('OES_standard_derivatives');

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); }
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(prog)); return; }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = U('uRes'), uTime = U('uTime'), uLevel = U('uLevel'), uMouse = U('uMouse'), uMouseOn = U('uMouseOn'), uRain = U('uRain');
    gl.uniform3fv(U('uPaper'), hex(paper)); gl.uniform3fv(U('uInk'), hex(ink));
    gl.uniform3fv(U('uWater'), hex(water)); gl.uniform3fv(U('uWash'), hex(wash)); gl.uniform3fv(U('uSignal'), hex(signal));

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 1, h = 1;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * (window.innerWidth > 1600 ? 0.75 : 1);
      w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    // interaction state
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, on: 0 };
    const onMove = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
      mouse.on = 1;
    };
    const rain: { x: number; y: number; age: number; active: number }[] = Array.from({ length: 6 }, () => ({ x: 0, y: 0, age: 0, active: 0 }));
    let rainIdx = 0;
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('a,button,input,[data-cursor]')) return;
      const r = rain[rainIdx++ % rain.length];
      r.x = e.clientX / window.innerWidth; r.y = 1 - e.clientY / window.innerHeight; r.age = 0; r.active = 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });

    let level = 0.29, targetLevel = 0.29, raf = 0, last = performance.now(), t = 0, visible = true, acc = 0;
    const readScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = window.scrollY / max;
      targetLevel = 0.29 + p * 0.36 + Math.min(1, window.scrollY / window.innerHeight) * 0.04;
      const fade = Math.min(1, window.scrollY / (window.innerHeight * 0.85));
      canvas.style.opacity = String(1 - fade * 0.78);
      visible = fade < 1 || true;
    };
    readScroll();
    window.addEventListener('scroll', readScroll, { passive: true });

    const rainBuf = new Float32Array(24);
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      // throttle to ~30fps when mostly faded out
      const faded = parseFloat(canvas.style.opacity || '1') < 0.4;
      acc += dt; if (faded && acc < 1 / 30) return; const step = acc; acc = 0;
      t += step;
      level += (targetLevel - level) * Math.min(1, step * 3);
      mouse.x += (mouse.tx - mouse.x) * Math.min(1, step * 8);
      mouse.y += (mouse.ty - mouse.y) * Math.min(1, step * 8);
      rain.forEach((r, i) => {
        if (r.active) { r.age += step * 0.7; if (r.age > 1.4) r.active = 0; }
        rainBuf.set([r.x, r.y, r.age, r.active], i * 4);
      });
      gl.uniform1f(uTime, t); gl.uniform1f(uLevel, level);
      gl.uniform2f(uMouse, mouse.x, mouse.y); gl.uniform1f(uMouseOn, reduce ? 0 : mouse.on);
      gl.uniform4fv(uRain, rainBuf);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    if (reduce) { frame(performance.now()); cancelAnimationFrame(raf); window.addEventListener('scroll', () => frame(performance.now())); }
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('scroll', readScroll);
    };
  }, [paper, ink, water, wash, signal]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, display: 'block', background: paper }}
    />
  );
}
