// ─── ShaderCanvas ─────────────────────────────────────────────────────
// WebGL canvas that runs one of the DD_SHADERS. Listens to mouse + click.
// Graceful fallback to a CSS gradient if WebGL is unavailable.

function ShaderCanvas({ shaderKey = 'aurora', style, onReady }) {
  const ref = React.useRef(null);
  const stateRef = React.useRef({
    gl: null, program: null, raf: 0,
    mouse: [0.5, 0.5], mouseTarget: [0.5, 0.5],
    click: [0.5, 0.5], clickAt: -999,
    start: performance.now(),
  });
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false })
            || canvas.getContext('experimental-webgl');
    if (!gl) { setFailed(true); return; }

    const st = stateRef.current;
    st.gl = gl;

    const compile = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src); gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(sh), src);
        return null;
      }
      return sh;
    };
    const buildProgram = (fragSrc) => {
      const vs = compile(gl.VERTEX_SHADER, window.DD_SHADERS.VERT);
      const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
      if (!vs || !fs) return null;
      const p = gl.createProgram();
      gl.attachShader(p, vs); gl.attachShader(p, fs); gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(p)); return null;
      }
      return p;
    };

    const shader = window.DD_SHADERS.list.find(s => s.key === shaderKey) || window.DD_SHADERS.list[0];
    const program = buildProgram(shader.frag);
    if (!program) { setFailed(true); return; }
    st.program = program;

    // full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uClick = gl.getUniformLocation(program, 'u_click');
    const uClickTime = gl.getUniformLocation(program, 'u_clickTime');
    const uPR = gl.getUniformLocation(program, 'u_pixelRatio');

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width  = Math.max(1, Math.floor(rect.width  * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    // listeners on the canvas itself
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = 1.0 - (e.clientY - r.top) / r.height;
      st.mouseTarget = [x, y];
    };
    const onLeave = () => { st.mouseTarget = [0.5, 0.5]; };
    const onClick = (e) => {
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = 1.0 - (e.clientY - r.top) / r.height;
      st.click = [x, y];
      st.clickAt = (performance.now() - st.start) / 1000;
    };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('pointerdown', onClick);

    gl.useProgram(program);
    const loop = () => {
      // ease cursor
      st.mouse[0] += (st.mouseTarget[0] - st.mouse[0]) * 0.12;
      st.mouse[1] += (st.mouseTarget[1] - st.mouse[1]) * 0.12;
      const t = (performance.now() - st.start) / 1000;
      gl.useProgram(program);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, st.mouse[0], st.mouse[1]);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uClick, st.click[0], st.click[1]);
      gl.uniform1f(uClickTime, t - st.clickAt);
      gl.uniform1f(uPR, dpr);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      st.raf = requestAnimationFrame(loop);
    };
    st.raf = requestAnimationFrame(loop);
    if (onReady) onReady();

    return () => {
      cancelAnimationFrame(st.raf);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('pointerdown', onClick);
      gl.deleteProgram(program);
    };
  }, [shaderKey]);

  if (failed) {
    return (
      <div style={{
        ...style,
        background: 'radial-gradient(1000px 600px at 30% 30%, #7177F6 0%, #4D2ADF 45%, #0A0A0A 100%)',
      }} />
    );
  }
  return <canvas ref={ref} style={{ display: 'block', width: '100%', height: '100%', ...style }} />;
}

window.ShaderCanvas = ShaderCanvas;
