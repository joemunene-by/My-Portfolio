"use client"

import { useEffect, useRef } from "react"

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2  uResolution;
uniform float uTime;
uniform vec2  uMouse;
uniform vec3  uColorA;
uniform vec3  uColorB;
uniform vec3  uColorC;

// Simplex-ish noise (cheap, good enough for a soft flow field)
vec3 hash3(vec2 p) {
  vec3 q = vec3(dot(p, vec2(127.1, 311.7)),
                dot(p, vec2(269.5, 183.3)),
                dot(p, vec2(419.2, 371.9)));
  return fract(sin(q) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = dot(hash3(i + vec2(0.0, 0.0)).xy - 0.5, f - vec2(0.0, 0.0));
  float b = dot(hash3(i + vec2(1.0, 0.0)).xy - 0.5, f - vec2(1.0, 0.0));
  float c = dot(hash3(i + vec2(0.0, 1.0)).xy - 0.5, f - vec2(0.0, 1.0));
  float d = dot(hash3(i + vec2(1.0, 1.0)).xy - 0.5, f - vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y) + 0.5;
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    v += amp * noise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p  = uv - 0.5;
  p.x *= uResolution.x / uResolution.y;

  // Warp toward mouse — decays with distance
  vec2 m = uMouse - 0.5;
  m.x *= uResolution.x / uResolution.y;
  float d = distance(p, m);
  float pull = 0.15 / (d * d + 0.3);
  vec2 warp = normalize(m - p + 1e-4) * pull;

  // Flow field
  vec2 q = p * 1.6 + warp * 0.25;
  q += vec2(fbm(q + uTime * 0.06), fbm(q - uTime * 0.08));
  float n = fbm(q * 1.2 + uTime * 0.04);

  // Color blend
  vec3 col = mix(uColorA, uColorB, smoothstep(0.2, 0.8, n));
  col = mix(col, uColorC, smoothstep(0.5, 0.95, n * 0.9 + d * 0.5));

  // Vignette toward dark bg
  float vig = smoothstep(1.2, 0.2, length(p));
  col *= vig * 0.22;

  gl_FragColor = vec4(col, 1.0);
}
`

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<[number, number]>([0.5, 0.5])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", { premultipliedAlpha: false, antialias: false })
    if (!gl) return

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) return
    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const aPos = gl.getAttribLocation(program, "aPosition")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, "uResolution")
    const uTime = gl.getUniformLocation(program, "uTime")
    const uMouse = gl.getUniformLocation(program, "uMouse")
    const uA = gl.getUniformLocation(program, "uColorA")
    const uB = gl.getUniformLocation(program, "uColorB")
    const uC = gl.getUniformLocation(program, "uColorC")

    const parseRgb = (s: string, fb: [number, number, number]): [number, number, number] => {
      const parts = s.trim().split(/\s+/).map(Number)
      if (parts.length === 3 && parts.every((n) => Number.isFinite(n))) {
        return [parts[0] / 255, parts[1] / 255, parts[2] / 255]
      }
      return fb
    }
    const readPalette = () => {
      const s = getComputedStyle(document.documentElement)
      const a = parseRgb(s.getPropertyValue("--primary"), [0.42, 0.61, 1])
      const b = parseRgb(s.getPropertyValue("--accent"), [0.77, 0.63, 1])
      const c = parseRgb(s.getPropertyValue("--accent-warm"), [1, 0.69, 0.53])
      return { a, b, c }
    }
    let palette = readPalette()
    const themeObserver = new MutationObserver(() => {
      palette = readPalette()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    })

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = window.innerWidth + "px"
      canvas.style.height = window.innerHeight + "px"
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener("resize", resize)

    const onMove = (e: MouseEvent) => {
      mouseRef.current = [e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight]
    }
    window.addEventListener("mousemove", onMove)

    let raf = 0
    const start = performance.now()
    const loop = () => {
      const t = (performance.now() - start) / 1000
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, t)
      gl.uniform2f(uMouse, mouseRef.current[0], mouseRef.current[1])
      gl.uniform3fv(uA, palette.a)
      gl.uniform3fv(uB, palette.b)
      gl.uniform3fv(uC, palette.c)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      themeObserver.disconnect()
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1, opacity: 0.9 }}
    />
  )
}
