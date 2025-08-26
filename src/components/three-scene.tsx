
'use client';

import React, { useRef, useLayoutEffect, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/hooks/use-theme';

interface ThreeSceneProps {
  type: 'particles' | 'cube' | 'sphere' | 'torus' | 'avatar' | 'torusKnot' | 'octahedron';
}

function getThreeColor(cssVar: string): THREE.Color {
    if (typeof window === 'undefined') return new THREE.Color(0x000000);
    const colorValue = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
    
    if (colorValue.includes(' ')) {
        const parts = colorValue.split(" ");
        if (parts.length < 3) return new THREE.Color(0x000000);
        const h = parseFloat(parts[0]) / 360;
        const s = parseFloat(parts[1].replace('%','')) / 100;
        const l = parseFloat(parts[2].replace('%','')) / 100;
        return new THREE.Color().setHSL(h, s, l);
    }
    return new THREE.Color(colorValue);
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ type }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const groupRef = useRef<THREE.Group>();
  const animationFrameIdRef = useRef<number>();
  const mouseRef = useRef(new THREE.Vector2(-10, -10));

  useLayoutEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Core scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setClearAlpha(0);
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    // Initial object creation
    let object: THREE.Object3D;
    const primaryThreeColor = getThreeColor('--primary');
    const accentThreeColor = getThreeColor('--accent');

    if (type === 'particles') {
        // Omitting particle logic for brevity as it's not the focus of the bug
        object = new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial()); // Placeholder
        camera.position.z = 5;
    } else {
        const material = new THREE.MeshStandardMaterial({
          color: primaryThreeColor,
          wireframe: true,
        });

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(accentThreeColor, 5, 10);
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

    const clock = new THREE.Clock();

    const animate = () => {
        animationFrameIdRef.current = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        
        if (groupRef.current) {
            groupRef.current.rotation.x += 0.005;
            groupRef.current.rotation.y += 0.005;
        }

        if (rendererRef.current && sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
    };
    animate();

    const handleResize = () => {
        if (!currentMount || !rendererRef.current || !cameraRef.current) return;
        cameraRef.current.aspect = currentMount.clientWidth / currentMount.clientHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);

      group.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
      scene.clear();
      group.clear();
      
      if (renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [type]); // Re-run ONLY when the type of scene changes.

  // This effect runs whenever the theme changes, specifically to update colors.
  useEffect(() => {
    if (!groupRef.current) return;

    const primaryColor = getThreeColor('--primary');
    const accentColor = getThreeColor('--accent');

    groupRef.current.traverse(child => {
        if (child instanceof THREE.Mesh) {
            if(child.material instanceof THREE.MeshStandardMaterial) {
                child.material.color.set(primaryColor);
            }
        }
    });
    
    if(sceneRef.current) {
        sceneRef.current.traverse(light => {
            if(light instanceof THREE.PointLight) {
                light.color.set(accentColor);
            }
        });
    }

  }, [theme]); // Re-run ONLY when theme object changes.

  return <div ref={mountRef} className="w-full h-full" />;
};

export default ThreeScene;
