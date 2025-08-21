'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  type: 'particles' | 'cube' | 'sphere' | 'torus' | 'avatar' | 'torusKnot' | 'octahedron';
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

    let object: THREE.Object3D | null = null;
    const mouse = new THREE.Vector2();
    let handleMouseMove: ((event: MouseEvent) => void) | null = null;
    const group = new THREE.Group();
    scene.add(group);

    function getThreeColor(cssVar: string) {
        const colorStr = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
        const [h, s, l] = colorStr.split(" ").map(v => parseFloat(v) / (v.endsWith('%') ? 100 : 1));
        return new THREE.Color().setHSL(h/360, s, l);
    }

    const primaryThreeColor = getThreeColor('--primary');
    const accentThreeColor = getThreeColor('--accent');
    
    const material = new THREE.MeshStandardMaterial({
      color: primaryThreeColor,
      wireframe: true,
    });
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(accentThreeColor, 5, 10);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

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
            case 'sphere':
              const sphereGeom = new THREE.SphereGeometry(1, 32, 32);
              const mainSphere = new THREE.Mesh(sphereGeom, material);
              group.add(mainSphere);

              const agentMaterial = new THREE.MeshStandardMaterial({ color: accentThreeColor, wireframe: true });
              for (let i = 0; i < 5; i++) {
                const agent = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), agentMaterial);
                const angle = (i / 5) * Math.PI * 2;
                const radius = 1.8;
                agent.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
                group.add(agent);
              }
              object = group;
              geometry = sphereGeom; // for type check, not used
              break;
            case 'torus': geometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100); break;
            case 'avatar': geometry = new THREE.IcosahedronGeometry(1.2, 0); break;
            case 'torusKnot': geometry = new THREE.TorusKnotGeometry(0.8, 0.25, 100, 16); break;
            case 'octahedron': geometry = new THREE.OctahedronGeometry(1.2, 0); break;
            default: geometry = new THREE.BoxGeometry(1, 1, 1);
        }

      if (type !== 'sphere') {
        object = new THREE.Mesh(geometry, material);
        group.add(object);
      }
      camera.position.z = 4;
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
        } else {
            group.rotation.x += 0.005;
            group.rotation.y += 0.005;
            if (type === 'avatar') {
                group.scale.setScalar(Math.sin(elapsedTime) * 0.1 + 0.95);
            }
            if (type === 'sphere') {
              group.children.forEach((child, index) => {
                if (index > 0) { // agents
                  const angle = (index-1 / 5) * Math.PI * 2 + elapsedTime * 0.5;
                  const radius = 1.8;
                  child.position.set(Math.cos(angle) * radius, Math.sin(elapsedTime * index) * 0.5, Math.sin(angle) * radius);
                }
              })
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
      scene.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach(mat => mat.dispose());
            } else {
              obj.material.dispose();
            }
        }
      })
      scene.clear();
      renderer.dispose();
    };
  }, [type]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default ThreeScene;
