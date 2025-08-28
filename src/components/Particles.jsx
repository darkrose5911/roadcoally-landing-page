"use client";

import { useRef, useEffect } from 'react';
import { Renderer, Camera, Transform, Geometry, Program, Mesh, Vec3 } from 'ogl';

const vertexShader = `
  precision highp float;
  
  attribute vec3 position;
  attribute vec3 random;
  
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uSize;
  
  varying vec3 vRandom;
  
  void main() {
    vRandom = random;
    
    vec3 pos = position;
    
    // Mouse interaction
    vec2 mouseDistance = uMouse - pos.xy;
    float mouseEffect = 1.0 - smoothstep(0.0, 0.3, length(mouseDistance));
    pos.xy += mouseDistance * mouseEffect * uMouseStrength * 0.1;
    
    // Floating animation
    pos.z += sin(uTime * 2.0 + random.x * 10.0) * 0.02;
    pos.x += sin(uTime * 1.5 + random.y * 15.0) * 0.01;
    pos.y += cos(uTime * 1.8 + random.z * 12.0) * 0.01;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    float sizeAttenuation = 1.0 / -mvPosition.z;
    gl_PointSize = uSize * sizeAttenuation * (0.5 + random.x * 0.5);
  }
`;

const fragmentShader = `
  precision highp float;
  
  uniform vec3 uColor;
  uniform float uAlpha;
  
  varying vec3 vRandom;
  
  void main() {
    vec2 uv = gl_PointCoord;
    vec2 center = uv - 0.5;
    float dist = length(center);
    
    if (dist > 0.5) discard;
    
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= uAlpha * (0.3 + vRandom.x * 0.7);
    
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export const Particles = ({
  count = 2000,
  size = 2.0,
  color = [0.0, 0.65, 0.32],
  alpha = 0.6,
  mouseStrength = 1.0,
  speed = 1.0,
  spread = 2.0,
  className = ""
}) => {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const mouseRef = useRef(new Vec3(0, 0, 0));
  const targetMouseRef = useRef(new Vec3(0, 0, 0));
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new Renderer({ canvas, alpha: true });
    const gl = renderer.gl;
    
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const camera = new Camera(gl, { fov: 45 });
    camera.position.set(0, 0, 2);

    const scene = new Transform();

    // Create particles
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * 0.4;
      
      randoms[i3] = Math.random();
      randoms[i3 + 1] = Math.random();
      randoms[i3 + 2] = Math.random();
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 3, data: randoms }
    });

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new Vec3(0, 0, 0) },
        uMouseStrength: { value: mouseStrength },
        uSize: { value: size },
        uColor: { value: color },
        uAlpha: { value: alpha }
      },
      transparent: true,
      depthTest: false,
      depthWrite: false
    });

    const mesh = new Mesh(gl, { geometry, program, mode: gl.POINTS });
    mesh.setParent(scene);

    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;
    meshRef.current = mesh;

    const handleResize = () => {
      const { clientWidth, clientHeight } = canvas;
      renderer.setSize(clientWidth, clientHeight);
      camera.perspective({ aspect: clientWidth / clientHeight });
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      targetMouseRef.current.set(x * camera.aspect, y, 0);
    };

    const handleMouseLeave = () => {
      targetMouseRef.current.set(0, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = (time) => {
      const t = time * 0.001 * speed;
      
      // Smooth mouse interpolation
      mouseRef.current.lerp(targetMouseRef.current, 0.05);
      
      if (mesh.program) {
        mesh.program.uniforms.uTime.value = t;
        mesh.program.uniforms.uMouse.value = mouseRef.current;
        mesh.program.uniforms.uMouseStrength.value = mouseStrength;
        mesh.program.uniforms.uSize.value = size;
        mesh.program.uniforms.uColor.value = color;
        mesh.program.uniforms.uAlpha.value = alpha;
      }
      
      renderer.render({ scene, camera });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      
      if (geometry) geometry.remove();
      if (program) program.remove();
      if (renderer) renderer.gl.canvas.remove();
    };
  }, [count, size, color, alpha, mouseStrength, speed, spread]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'auto',
        zIndex: 1
      }}
    />
  );
};