// Volt Horizon — WebGL Shader Enhancements
// Exports: VH_PriaOrbShader, VH_OrbitSceneWebGL, VH_KenBurnsShaderBG, VH_DayNightRingShader

(() => {
  const { useEffect, useRef } = React;

  // ──────────────────────────────────────────────────────────────────────
  //  Shared WebGL2 bootstrap
  // ──────────────────────────────────────────────────────────────────────
  const VERT = `#version 300 es
in vec2 aPos;
void main(){gl_Position=vec4(aPos,0,1);}`;

  function compShader(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src.trim());
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
      console.warn('[VH shader]', gl.getShaderInfoLog(s));
    return s;
  }

  function makeGL(canvas, fsSrc) {
    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: false });
    if (!gl) return null;
    const prog = gl.createProgram();
    gl.attachShader(prog, compShader(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compShader(gl, gl.FRAGMENT_SHADER, fsSrc));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const a = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(a);
    gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    return { gl, prog, u: n => gl.getUniformLocation(prog, n) };
  }

  // Render-loop hook: init WebGL once on mount, run RAF every frame.
  // bindExtra(gl, u, t) is called each frame for dynamic uniforms.
  function useLoop(canvasRef, fsSrc, bindExtra) {
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = makeGL(canvas, fsSrc);
      if (!ctx) return;
      const { gl, u } = ctx;
      const resLoc  = u('iResolution');
      const timeLoc = u('iTime');
      const start   = performance.now();
      let id;
      const tick = () => {
        const t = (performance.now() - start) * 0.001;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(resLoc, canvas.width, canvas.height);
        gl.uniform1f(timeLoc, t);
        if (bindExtra) bindExtra(gl, u, t);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        id = requestAnimationFrame(tick);
      };
      id = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(id);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  }

  // ══════════════════════════════════════════════════════════════════════
  //  1. PRIA ORB — fluid plasma (two-level domain-warped FBM)
  //     Replaces the CSS conic-gradient for orb size ≥ 32 px.
  //     Colors: voltage #FF6B35 · bio #7BFFAB · horizon #58C8FF
  // ══════════════════════════════════════════════════════════════════════
  const FS_ORB = `#version 300 es
precision highp float;
uniform vec2  iResolution;
uniform float iTime;
uniform float uState;
out vec4 fragColor;

float hash(vec2 p){
  vec3 p3=fract(vec3(p.xyx)*0.1031);
  p3+=dot(p3,p3.yzx+33.33);
  return fract((p3.x+p3.y)*p3.z);
}
float noise(vec2 x){
  vec2 p=floor(x),f=fract(x);
  f=f*f*(3.0-2.0*f);
  return mix(mix(hash(p),hash(p+vec2(1.0,0.0)),f.x),
             mix(hash(p+vec2(0.0,1.0)),hash(p+vec2(1.0,1.0)),f.x),f.y);
}
const mat2 MM=mat2(1.6,1.2,-1.2,1.6);
float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<4;i++){v+=a*noise(p);p=MM*p;a*=0.5;}return v;}

void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*iResolution.xy)/min(iResolution.x,iResolution.y);
  float r=length(uv);
  float mask=smoothstep(0.52,0.44,r);
  if(mask<0.002){fragColor=vec4(0.0);return;}
  // Animate faster in active states (1=listen,2=speak,3=think)
  float sp=1.0+uState*0.55;
  float t=iTime*sp;
  // Two-level domain warp for fluid plasma look
  vec2 q=vec2(fbm(uv*2.8+t*0.12),fbm(uv*2.8+vec2(5.2,1.3)+t*0.09));
  vec2 rr=vec2(fbm(uv*2.2+0.8*q+vec2(1.7,9.2)+t*0.07),
               fbm(uv*2.2+0.8*q+vec2(8.3,2.8)+t*0.06));
  float f=fbm(uv*1.6+1.1*rr);
  // Polar sweep for rotational feel
  float ang=atan(uv.y,uv.x)/6.28318+0.5+t*0.055;
  float tt=fract(f*0.65+ang+t*0.045);
  // Brand palette: voltage → bio → horizon → voltage
  vec3 V=vec3(1.0,0.42,0.21);
  vec3 B=vec3(0.48,1.0,0.67);
  vec3 H=vec3(0.35,0.78,1.0);
  float seg=tt*3.0;
  vec3 col;
  if(seg<1.0)      col=mix(V,B,seg);
  else if(seg<2.0) col=mix(B,H,seg-1.0);
  else             col=mix(H,V,seg-2.0);
  // Brightness: fbm variation + center-bright falloff
  col*=(0.55+0.6*f)*(0.45+0.55*(1.0-r*1.7))*1.3;
  // Warm core highlight
  col+=vec3(0.9,0.7,0.4)*exp(-r*r*12.0)*0.5;
  col=col/(1.0+col);
  fragColor=vec4(col*mask,mask);
}`;

  const PriaOrbShader = ({ size, state }) => {
    const sz       = size || 28;
    const stateRef = useRef(0);
    stateRef.current = ({ idle:0, listening:1, speaking:2, thinking:3 }[state] || 0);
    const canvasRef = useRef(null);
    useLoop(canvasRef, FS_ORB, (gl, u) => {
      gl.uniform1f(u('uState'), stateRef.current);
    });
    return (
      <canvas ref={canvasRef} width={sz} height={sz}
        style={{ width:sz, height:sz, borderRadius:'50%', display:'block', flexShrink:0 }}/>
    );
  };

  // ══════════════════════════════════════════════════════════════════════
  //  2. ORBIT SCENE — stateless WebGL particle system
  //     3 orbital rings (voltage / horizon / bio) + Archimedean spiral dots.
  //     Additive alpha-blended overlay inside OrbitScene.
  // ══════════════════════════════════════════════════════════════════════
  const FS_ORBIT = `#version 300 es
precision highp float;
uniform vec2  iResolution;
uniform float iTime;
out vec4 fragColor;

void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*iResolution.xy)/min(iResolution.x,iResolution.y);
  float t=iTime;
  vec3 col=vec3(0.0);
  vec3 Vc=vec3(1.0,0.42,0.21);
  vec3 Hc=vec3(0.35,0.78,1.0);
  vec3 Bc=vec3(0.48,1.0,0.67);
  float TAU=6.28318;

  // Ring 1 — voltage, R=0.44, 3 satellites CW
  float r1=0.44;
  for(int i=0;i<3;i++){
    float a=t*0.22+float(i)*2.094;
    vec2 p=vec2(cos(a)*r1,sin(a)*r1);
    float d=length(uv-p);
    col+=Vc*0.0009/(d*d+0.0018);
  }
  {float dr=abs(length(uv)-r1)-0.003;
   col+=Vc*exp(-max(dr,0.0)*110.0)*0.10;}

  // Ring 2 — horizon, R=0.335, 1 satellite CCW
  float r2=0.335;
  {float a=-t*0.18+1.57;
   vec2 p=vec2(cos(a)*r2,sin(a)*r2);
   float d=length(uv-p);
   col+=Hc*0.0011/(d*d+0.002);
   float dr=abs(length(uv)-r2)-0.0025;
   col+=Hc*exp(-max(dr,0.0)*140.0)*0.09;}

  // Ring 3 — bio, R=0.23, fast CW
  float r3=0.23;
  {float a=t*0.55;
   vec2 p=vec2(cos(a)*r3,sin(a)*r3);
   float d=length(uv-p);
   col+=Bc*0.0007/(d*d+0.0013);
   float dr=abs(length(uv)-r3)-0.002;
   col+=Bc*exp(-max(dr,0.0)*170.0)*0.07;}

  // Spiral: 3 dots cycling inward along Archimedean spiral
  for(int j=0;j<3;j++){
    float fr=fract(t*0.143+float(j)/3.0);
    float sa=fr*TAU*2.2;
    float sr=(1.0-fr)*0.45;
    vec2 sp=vec2(cos(sa)*sr,sin(sa)*sr);
    float d=length(uv-sp);
    col+=Vc*0.0006/(d*d+0.0009)*(1.0-fr);
  }

  // Soft centre glow
  col+=Vc*0.012/(dot(uv,uv)+0.04)*0.25;

  col=col/(1.0+col);
  col=pow(max(col,0.0),vec3(0.9));
  float alpha=(1.0-smoothstep(0.45,0.52,length(uv)))*0.9;
  fragColor=vec4(col,alpha);
}`;

  const OrbitSceneWebGL = ({ size }) => {
    const sz = size || 380;
    const canvasRef = useRef(null);
    useLoop(canvasRef, FS_ORBIT, null);
    return (
      <canvas ref={canvasRef} width={sz} height={sz}
        style={{ position:'absolute', inset:0, width:sz, height:sz, pointerEvents:'none' }}/>
    );
  };

  // ══════════════════════════════════════════════════════════════════════
  //  3. KENBURNS SHADER BACKGROUND
  //     FBM domain-warp in the VH dark palette (near-black + warm orange + gold).
  //     Sits behind hero photos as a position:absolute canvas layer.
  // ══════════════════════════════════════════════════════════════════════
  const FS_HERO_BG = `#version 300 es
precision highp float;
uniform vec2  iResolution;
uniform float iTime;
out vec4 fragColor;

float hash(vec2 p){
  vec3 p3=fract(vec3(p.xyx)*0.1031);
  p3+=dot(p3,p3.yzx+33.33);
  return fract((p3.x+p3.y)*p3.z);
}
float noise(vec2 x){
  vec2 p=floor(x),f=fract(x);
  f=f*f*(3.0-2.0*f);
  return mix(mix(hash(p),hash(p+vec2(1.0,0.0)),f.x),
             mix(hash(p+vec2(0.0,1.0)),hash(p+vec2(1.0,1.0)),f.x),f.y);
}
const mat2 MM=mat2(1.6,1.2,-1.2,1.6);
float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p=MM*p;a*=0.5;}return v;}
vec2 fbm2(vec2 p){return vec2(fbm(p+vec2(1.7,9.2)),fbm(p+vec2(8.3,2.8)));}

void main(){
  vec2 uv=gl_FragCoord.xy/iResolution.xy;
  float t=iTime*0.07;
  vec2 q=fbm2(uv*2.0+t);
  vec2 r=fbm2(uv*2.0+0.5*q+t*0.6);
  float f=0.5+0.5*fbm(uv*1.5+1.1*r+t*0.3);
  vec3 dark=vec3(0.039,0.059,0.078);
  vec3 warm=vec3(0.33,0.15,0.055);
  vec3 gold=vec3(0.55,0.30,0.06);
  vec3 col=mix(dark,warm,f*0.45);
  col=mix(col,gold,pow(f,3.0)*0.28);
  col=mix(col,vec3(0.05,0.12,0.22),smoothstep(0.35,1.0,uv.y)*0.45);
  vec2 pp=1.0-2.0*uv;
  pp.y*=iResolution.y/iResolution.x;
  col*=0.72+0.28*(1.0-dot(pp,pp)*0.45);
  col*=0.62;
  fragColor=vec4(col,1.0);
}`;

  const KenBurnsShaderBG = () => {
    const canvasRef = useRef(null);
    useLoop(canvasRef, FS_HERO_BG, null);
    return (
      <canvas ref={canvasRef} width={800} height={380}
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}/>
    );
  };

  // ══════════════════════════════════════════════════════════════════════
  //  4. DAYNIGHT RING ATMOSPHERIC GLOW
  //     Pulsing arc glow rendered as a mix-blend-mode:screen overlay.
  //     Solar = horizon blue, Battery = bio green, Gap flash = voltage.
  // ══════════════════════════════════════════════════════════════════════
  const FS_RING = `#version 300 es
precision highp float;
uniform vec2  iResolution;
uniform float iTime;
out vec4 fragColor;

void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*iResolution.xy)/(0.5*min(iResolution.x,iResolution.y));
  float t=iTime;
  float TAU=6.28318;
  float cOff=-1.5708; // 12-o'clock at top
  float rM=0.76;      // ring mid-radius (normalised)
  vec3 col=vec3(0.0);

  // Solar arc: hours 7..17 — horizon blue
  vec3 Hc=vec3(0.35,0.78,1.0);
  for(int i=0;i<=32;i++){
    float h=7.0+float(i)*(10.0/32.0);
    float a=(h/24.0)*TAU+cOff;
    float pulse=0.7+0.3*sin(t*2.0+float(i)*0.25);
    vec2 pt=vec2(cos(a),sin(a))*rM;
    float d=length(uv-pt);
    col+=Hc*0.00065/(d*d+0.0024)*pulse;
  }

  // Battery arc: hours 18..28 (wraps midnight) — bio green
  vec3 Bg=vec3(0.48,1.0,0.67);
  for(int i=0;i<=28;i++){
    float h=18.0+float(i)*(10.0/28.0);
    float a=(h/24.0)*TAU+cOff;
    float pulse=0.6+0.4*sin(t*1.5+float(i)*0.35);
    vec2 pt=vec2(cos(a),sin(a))*rM;
    float d=length(uv-pt);
    col+=Bg*0.00055/(d*d+0.0024)*pulse;
  }

  // Gap flash ~5am — voltage orange
  vec3 Vc=vec3(1.0,0.42,0.21);
  float ga=(5.0/24.0)*TAU+cOff;
  vec2 gp=vec2(cos(ga),sin(ga))*rM;
  float gd=length(uv-gp);
  col+=Vc*0.0005/(gd*gd+0.003)*(0.3+0.7*abs(sin(t*2.8)));

  col=col/(1.0+col);
  float alpha=min(dot(col,vec3(0.333))*3.5,0.9);
  fragColor=vec4(col,alpha);
}`;

  const DayNightRingShader = ({ size }) => {
    const sz = size || 240;
    const canvasRef = useRef(null);
    useLoop(canvasRef, FS_RING, null);
    return (
      <canvas ref={canvasRef} width={sz} height={sz}
        style={{
          position:'absolute', inset:0,
          width:sz, height:sz,
          pointerEvents:'none',
          mixBlendMode:'screen',
        }}/>
    );
  };

  Object.assign(window, {
    VH_PriaOrbShader:      PriaOrbShader,
    VH_OrbitSceneWebGL:    OrbitSceneWebGL,
    VH_KenBurnsShaderBG:   KenBurnsShaderBG,
    VH_DayNightRingShader: DayNightRingShader,
  });
})();
