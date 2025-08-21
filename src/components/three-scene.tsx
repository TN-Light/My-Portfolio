'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  type: 'particles' | 'cube' | 'sphere' | 'torus' | 'avatar';
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ type }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    let object: THREE.Mesh | THREE.Points | null = null;
    const mouse = new THREE.Vector2();
    let handleMouseMove: ((event: MouseEvent) => void) | null = null;

    // Convert HSL strings from CSS to something THREE can use
    function getThreeColor(cssVar: string) {
        const colorStr = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
        // This is a simplified parser for HSL string like "283 86% 56%"
        const [h, s, l] = colorStr.split(" ").map(v => parseFloat(v) / (v.endsWith('%') ? 100 : 1));
        return new THREE.Color().setHSL(h/360, s, l);
    }

    const primaryThreeColor = getThreeColor('--primary');
    const accentThreeColor = getThreeColor('--accent');

    if (type === 'particles') {
      const particlesCount = 5000;
      const positions = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
      }
      const particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particlesMaterial = new THREE.PointsMaterial({
        color: primaryThreeColor,
        size: 0.02,
        blending: THREE.AdditiveBlending,
      });
      object = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(object);
      camera.position.z = 5;

      handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener('mousemove', handleMouseMove);
    } else {
        let geometry: THREE.BufferGeometry;
        switch(type) {
            case 'cube': geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5); break;
            case 'sphere': geometry = new THREE.SphereGeometry(1, 32, 32); break;
            case 'torus': geometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100); break;
            case 'avatar': geometry = new THREE.IcosahedronGeometry(1.2, 0); break;
            default: geometry = new THREE.BoxGeometry(1, 1, 1);
        }
      const material = new THREE.MeshStandardMaterial({
        color: primaryThreeColor,
        wireframe: true,
      });
      object = new THREE.Mesh(geometry, material);
      scene.add(object);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      scene.add(ambientLight);
      const pointLight = new THREE.PointLight(accentThreeColor, 5, 10);
      pointLight.position.set(2, 3, 4);
      scene.add(pointLight);

      camera.position.z = 3;
    }

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (object) {
        if(type === 'particles' && object instanceof THREE.Points) {
            object.rotation.y = -mouse.x * 0.2;
            object.rotation.x = mouse.y * 0.2;
        } else if (object instanceof THREE.Mesh) {
            object.rotation.x += 0.005;
            object.rotation.y += 0.005;
            if (type === 'avatar') {
                object.scale.setScalar(Math.sin(elapsedTime) * 0.1 + 0.95);
            }
        }
      }
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (handleMouseMove) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [type]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default ThreeScene;
