// ─── Shader Wallpapers ────────────────────────────────────────────────
// Five interactive fragment shaders that react to mouse position and clicks.
// Each exported as { name, label, fragmentShader }. All share the same vertex
// shader and uniforms (u_time, u_mouse, u_click, u_clickTime, u_resolution).

window.DD_SHADERS = (function () {
  const VERT = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  const HEADER = `
    precision highp float;
    uniform vec2  u_resolution;
    uniform vec2  u_mouse;      // 0..1
    uniform float u_time;
    uniform vec2  u_click;      // 0..1
    uniform float u_clickTime;  // seconds since last click
    uniform float u_pixelRatio;

    // DataDial palette
    const vec3 P_DEEP   = vec3(0.302, 0.165, 0.874); // #4D2ADF
    const vec3 P_LIGHT  = vec3(0.443, 0.467, 0.965); // #7177F6
    const vec3 P_VIOLET = vec3(0.490, 0.063, 0.984); // #7D10FB
    const vec3 P_INK    = vec3(0.039, 0.039, 0.039); // #0A0A0A
    const vec3 P_GREY   = vec3(0.129, 0.129, 0.141); // #212124
    const vec3 P_WHITE  = vec3(0.965, 0.972, 0.988);

    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      float a = hash(i), b = hash(i+vec2(1,0));
      float c = hash(i+vec2(0,1)), d = hash(i+vec2(1,1));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
    }
    float fbm(vec2 p) {
      float v = 0.0, a = 0.5;
      for (int i=0;i<5;i++){ v += a*noise(p); p*=2.02; a*=0.5; }
      return v;
    }
  `;

  // ── 1. AURORA ─────────────────────────────────────────────────────
  // flowing ribbons of purple haze that bend toward the cursor.
  const AURORA = HEADER + `
    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 p  = uv;
      p.x *= u_resolution.x / u_resolution.y;
      vec2 m = u_mouse;
      m.x *= u_resolution.x / u_resolution.y;

      float t = u_time * 0.18;
      vec2 q = p;
      q += 0.25 * vec2(
        sin(p.y*3.0 + t*1.7 + (m.x-0.5)*3.0),
        cos(p.x*2.2 + t*1.3 + (m.y-0.5)*3.0)
      );

      // ribbon bands
      float n = fbm(q*1.6 + vec2(t, -t*0.5));
      float bands = 0.5 + 0.5*sin((q.x + q.y)*3.5 + n*6.0 + t*2.0);
      bands = pow(bands, 2.2);

      // cursor halo
      float d = length(p - m);
      float halo = smoothstep(0.65, 0.0, d) * 0.6;

      // click ripple
      vec2 cp = u_click; cp.x *= u_resolution.x / u_resolution.y;
      float cd = length(p - cp);
      float ring = exp(-pow((cd - u_clickTime*0.55)*8.0, 2.0)) * exp(-u_clickTime*1.2);

      vec3 col = mix(P_INK, P_DEEP, bands*0.75);
      col = mix(col, P_LIGHT, bands*bands*0.55);
      col = mix(col, P_VIOLET, halo*0.4);
      col += vec3(0.55,0.45,1.0) * halo * 0.55;
      col += vec3(0.8,0.7,1.0) * ring * 0.9;

      // subtle grain
      col += (hash(gl_FragCoord.xy) - 0.5) * 0.02;
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  // ── 2. METABALLS ──────────────────────────────────────────────────
  // liquid blobs that orbit and are attracted to the cursor.
  const METABALLS = HEADER + `
    float ball(vec2 p, vec2 c, float r){ return r*r / dot(p-c, p-c); }
    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 p = uv;
      float ar = u_resolution.x / u_resolution.y;
      p.x *= ar;
      vec2 m = u_mouse; m.x *= ar;

      float t = u_time * 0.6;
      vec2 c1 = vec2(0.5*ar + 0.35*cos(t*0.7), 0.5 + 0.28*sin(t*0.9));
      vec2 c2 = vec2(0.5*ar + 0.30*cos(t*1.1+2.0), 0.5 + 0.35*sin(t*0.6+1.5));
      vec2 c3 = vec2(0.5*ar + 0.40*cos(t*0.5+4.0), 0.5 + 0.22*sin(t*1.2+3.0));

      // cursor-attracted ball
      vec2 c4 = m;

      float f = 0.0;
      f += ball(p, c1, 0.16);
      f += ball(p, c2, 0.14);
      f += ball(p, c3, 0.12);
      f += ball(p, c4, 0.18);

      // click explosion
      vec2 cp = u_click; cp.x *= ar;
      float boom = exp(-u_clickTime*2.0) * ball(p, cp, 0.25 + u_clickTime*0.2);
      f += boom;

      float mask = smoothstep(0.9, 1.3, f);
      float edge = smoothstep(0.85, 1.0, f) - smoothstep(1.0, 1.2, f);

      vec3 bg = mix(P_INK, P_GREY, uv.y);
      vec3 fill = mix(P_DEEP, P_LIGHT, uv.y);
      vec3 col = mix(bg, fill, mask);
      col = mix(col, P_WHITE, edge * 0.25);

      // chromatic rim
      float rim = smoothstep(0.75, 1.0, f) - smoothstep(1.0, 1.15, f);
      col += vec3(0.3, 0.1, 0.6) * rim * 0.5;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  // ── 3. GRID PULSE ─────────────────────────────────────────────────
  // dot grid where dots swell/bend toward the cursor, click = shockwave.
  const GRID = HEADER + `
    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 p = uv;
      float ar = u_resolution.x / u_resolution.y;
      p.x *= ar;
      vec2 m = u_mouse; m.x *= ar;

      // subtle background sheen
      vec3 bg = mix(P_INK, P_DEEP*0.35, 1.0 - length(p - vec2(0.5*ar, 0.5))*0.9);
      bg = mix(bg, P_INK, 0.5);

      // grid
      float cell = 0.045;
      vec2 gp = p / cell;
      vec2 gi = floor(gp);
      vec2 gf = fract(gp) - 0.5;

      vec2 centerWorld = (gi + 0.5) * cell;

      // displacement toward cursor within a radius
      vec2 toM = m - centerWorld;
      float dM = length(toM);
      float pull = smoothstep(0.42, 0.0, dM) * 0.35;
      vec2 disp = normalize(toM + 1e-6) * pull * cell;
      vec2 dotC = gf - disp/cell;

      // click wave: radius expands from click point
      vec2 cp = u_click; cp.x *= ar;
      float cd = length(centerWorld - cp);
      float wave = exp(-pow((cd - u_clickTime*0.55)*5.0, 2.0)) * exp(-u_clickTime*1.4);

      float r = 0.15 + 0.12*pull/0.35 + 0.18*wave;
      float d = length(dotC);
      float dot = smoothstep(r, r-0.06, d);

      vec3 dotCol = mix(P_LIGHT, P_VIOLET, smoothstep(0.0, 0.35, pull));
      dotCol = mix(dotCol, vec3(1.0), wave*0.6);

      vec3 col = mix(bg, dotCol, dot);
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  // ── 4. SILK ───────────────────────────────────────────────────────
  // flowing silk fabric with parallax folds that tilt with the cursor.
  const SILK = HEADER + `
    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 p = uv - 0.5;
      p.x *= u_resolution.x / u_resolution.y;
      vec2 m = u_mouse - 0.5;

      float t = u_time * 0.25;
      vec2 q = p + vec2(m.x*0.4, m.y*0.4);

      // multi-layered sine folds
      float f1 = sin(q.x*5.0 + sin(q.y*3.0 + t)*1.5 + t);
      float f2 = sin(q.y*4.0 + sin(q.x*2.5 - t*0.7)*1.2 - t*0.8);
      float f3 = sin((q.x+q.y)*2.5 + t*1.2);
      float v = (f1 + f2*0.8 + f3*0.6) * 0.3;

      float fold = 0.5 + 0.5*v;
      float highlight = pow(smoothstep(0.55, 0.85, fold), 3.0);
      float shadow    = pow(smoothstep(0.45, 0.15, fold), 2.0);

      vec3 col = mix(P_DEEP*0.6, P_LIGHT, fold);
      col = mix(col, P_VIOLET, shadow*0.6);
      col += vec3(0.8,0.7,1.0) * highlight * 0.5;

      // click burst — brief sheen ring
      vec2 cp = (u_click - 0.5); cp.x *= u_resolution.x/u_resolution.y;
      float cd = length(p - cp);
      float sheen = exp(-pow((cd - u_clickTime*0.5)*6.0, 2.0)) * exp(-u_clickTime);
      col += vec3(1.0,0.95,1.0) * sheen * 0.7;

      col += (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.025;
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  // ── 5. CONSTELLATION ──────────────────────────────────────────────
  // starfield with connecting lines near the cursor, click spawns a burst.
  const CONSTELLATION = HEADER + `
    float star(vec2 p, vec2 c, float r){
      float d = length(p-c);
      return smoothstep(r, 0.0, d);
    }
    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 p = uv;
      float ar = u_resolution.x / u_resolution.y;
      p.x *= ar;
      vec2 m = u_mouse; m.x *= ar;

      // deep space
      vec3 col = mix(P_INK, P_DEEP*0.25, smoothstep(1.0, 0.0, length(p - vec2(0.5*ar,0.5))));

      // nebula haze
      float neb = fbm(p*2.0 + u_time*0.05);
      col += P_DEEP * neb * 0.35;
      col += P_VIOLET * pow(neb, 3.0) * 0.4;

      // stars on a grid with jitter
      float cell = 0.11;
      vec2 gp = p / cell;
      for (int dy=-1; dy<=1; dy++){
        for (int dx=-1; dx<=1; dx++){
          vec2 gi = floor(gp) + vec2(float(dx),float(dy));
          vec2 jitter = vec2(hash(gi), hash(gi+17.3)) - 0.5;
          vec2 sc = (gi + 0.5 + jitter*0.8) * cell;
          float tw = 0.6 + 0.4*sin(u_time*2.0 + hash(gi)*30.0);
          float r = (0.004 + 0.008*hash(gi+3.1)) * tw;
          float s = star(p, sc, r);

          // line to cursor if close
          float dm = length(sc - m);
          if (dm < 0.28) {
            vec2 a = sc, b = m;
            vec2 pa = p - a, ba = b - a;
            float h = clamp(dot(pa,ba)/dot(ba,ba), 0.0, 1.0);
            float lineD = length(pa - ba*h);
            float line = smoothstep(0.003, 0.0, lineD) * smoothstep(0.28, 0.0, dm);
            col += P_LIGHT * line * 0.8;
          }
          col += mix(P_WHITE, P_LIGHT, hash(gi+5.0)) * s * (1.0 + tw);
        }
      }

      // click burst — expanding ring of stars
      vec2 cp = u_click; cp.x *= ar;
      float cd = length(p - cp);
      float ring = exp(-pow((cd - u_clickTime*0.5)*9.0, 2.0)) * exp(-u_clickTime*1.5);
      col += vec3(1.0,0.9,1.0) * ring * 0.8;

      // cursor glow
      float glow = smoothstep(0.25, 0.0, length(p - m));
      col += P_LIGHT * glow * 0.25;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  return {
    VERT,
    list: [
      { key: 'aurora',        label: 'Aurora',        frag: AURORA },
      { key: 'metaballs',     label: 'Metaballs',     frag: METABALLS },
      { key: 'grid',          label: 'Grid Pulse',    frag: GRID },
      { key: 'silk',          label: 'Silk Folds',    frag: SILK },
      { key: 'constellation', label: 'Constellation', frag: CONSTELLATION },
    ],
  };
})();
