"use client";

import { useEffect, useRef } from "react";

const vertexShader = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform vec2 resolution;
  uniform float time;
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float wave = sin((uv.x * 2.1 + uv.y * 1.4 + time * 0.00008) * 6.28318) * 0.5 + 0.5;
    float glow = smoothstep(1.0, 0.05, distance(uv, vec2(0.72, 0.27)));
    vec3 color = mix(vec3(1.0, 0.42, 0.42), vec3(1.0, 0.73, 0.32), uv.x);
    gl_FragColor = vec4(color, glow * wave * 0.12);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

export default function AtmosphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const gl = canvas.getContext("webgl");
    if (!gl) {
      return;
    }

    const renderCanvas = canvas;
    const renderGl = gl;

    const vertex = createShader(renderGl, renderGl.VERTEX_SHADER, vertexShader);
    const fragment = createShader(renderGl, renderGl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) {
      return;
    }

    const program = renderGl.createProgram();
    if (!program) {
      return;
    }

    renderGl.attachShader(program, vertex);
    renderGl.attachShader(program, fragment);
    renderGl.linkProgram(program);
    if (!renderGl.getProgramParameter(program, renderGl.LINK_STATUS)) {
      return;
    }

    const position = renderGl.getAttribLocation(program, "position");
    const resolution = renderGl.getUniformLocation(program, "resolution");
    const time = renderGl.getUniformLocation(program, "time");
    const buffer = renderGl.createBuffer();
    if (!buffer || position < 0 || !resolution || !time) {
      return;
    }

    renderGl.bindBuffer(renderGl.ARRAY_BUFFER, buffer);
    renderGl.bufferData(
      renderGl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      renderGl.STATIC_DRAW,
    );

    let frame = 0;
    function resize() {
      const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
      renderCanvas.width = Math.floor(renderCanvas.clientWidth * pixelRatio);
      renderCanvas.height = Math.floor(renderCanvas.clientHeight * pixelRatio);
    }

    function draw(timestamp: number) {
      resize();
      renderGl.viewport(0, 0, renderCanvas.width, renderCanvas.height);
      renderGl.useProgram(program);
      renderGl.enable(renderGl.BLEND);
      renderGl.blendFunc(renderGl.SRC_ALPHA, renderGl.ONE);
      renderGl.uniform2f(resolution, renderCanvas.width, renderCanvas.height);
      renderGl.uniform1f(time, timestamp);
      renderGl.enableVertexAttribArray(position);
      renderGl.vertexAttribPointer(position, 2, renderGl.FLOAT, false, 0, 0);
      renderGl.drawArrays(renderGl.TRIANGLE_STRIP, 0, 4);
      frame = window.requestAnimationFrame(draw);
    }

    frame = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return <canvas aria-hidden="true" className="atmosphere-canvas" ref={canvasRef} />;
}
