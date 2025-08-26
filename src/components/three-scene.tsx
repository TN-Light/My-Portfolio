
'use client';

import React, { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  type: 'particles' | 'cube' | 'sphere' | 'torus' | 'avatar' | 'torusKnot' | 'octahedron';
  primaryColor: string;
  accentColor: string;
}

function parseHsl(hsl: string): [number, number, number] {
    if (!hsl) return [0, 0, 0];
    const [h, s, l] = hsl.match(/\d+/g)?.map(Number) || [0, 0, 0];
    return [h / 360, s / 100, l / 100];
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ type, primaryColor, accentColor }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const primaryThreeColor = new THREE.Color().setHSL(...parseHsl(primaryColor));
    const accentThreeColor = new THREE.Color().setHSL(...parseHsl(accentColor));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setClearAlpha(0);
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    
    let object: THREE.Mesh | THREE.Points | null = null;
    let clock: THREE.Clock | null = null;
    const mouse = new THREE.Vector2();

    if (type === 'particles') {
        const particlesCount = 5000;
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);
        clock = new THREE.Clock();

        for (let i = 0; i < positions.length; i += 3) {
            positions[i] = (Math.random() - 0.5) * 10;
            positions[i + 1] = (Math.random() - 0.5) * 10;
            positions[i + 2] = (Math.random() - 0.5) * 10;
            
            const randomColor = Math.random() > 0.5 ? primaryThreeColor : accentThreeColor;
            colors[i] = randomColor.r;
            colors[i+1] = randomColor.g;
            colors[i+2] = randomColor.b;
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        object = new THREE.Points(particlesGeometry, particlesMaterial);
        group.add(object);
        camera.position.z = 5;
    } else {
        const material = new THREE.MeshStandardMaterial({
          color: primaryThreeColor,
          wireframe: true,
        });

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(primaryThreeColor, 5, 10);
        pointLight.position.set(2, 3, 4);
        scene.add(pointLight);

        let geometry: THREE.BufferGeometry;
        switch(type) {
            case 'cube': geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5); break;
            case 'sphere': geometry = new THREE.SphereGeometry(1, 32, 32); break;
            case 'torus': geometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100); break;
            case 'avatar': geometry = new THREE.IcosahedronGeometry(1, 0); break;
            case 'torusKnot': geometry = new THREE.TorusKnotGeometry(0.8, 0.25, 100, 16); break;
            case 'octahedron': geometry = new THREE.OctahedronGeometry(1.2, 0); break;
            default: geometry = new THREE.BoxGeometry(1, 1, 1);
        }

        object = new THREE.Mesh(geometry, material);
        group.add(object);
        camera.position.z = type === 'avatar' ? 2 : 4;
    }

    let animationFrameId: number;

    const onMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener('mousemove', onMouseMove);


    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        group.rotation.y += 0.002;

        if (type === 'particles' && clock) {
            const elapsedTime = clock.getElapsedTime();
            group.rotation.x = mouse.y * 0.2;
            group.rotation.y = mouse.x * 0.2 + (elapsedTime * 0.1);
        } else {
            group.rotation.x += 0.005;
            group.rotation.y += 0.005;
        }

        renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      scene.traverse(child => {
          if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              if (child.material instanceof THREE.Material) {
                  child.material.dispose();
              } else if (Array.isArray(child.material)) {
                   child.material.forEach(material => material.dispose());
              }
          }
      });
      renderer.dispose();
      currentMount.removeChild(renderer.domElement);
    };
  }, [type, primaryColor, accentColor]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default ThreeScene;
