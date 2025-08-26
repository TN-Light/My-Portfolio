
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
    
    // Check if HSL
    if (colorValue.includes(' ')) {
        const parts = colorValue.split(" ");
        if (parts.length < 3) return new THREE.Color(0x000000); // Invalid HSL
        const h = parseFloat(parts[0]) / 360;
        const s = parseFloat(parts[1].replace('%','')) / 100;
        const l = parseFloat(parts[2].replace('%','')) / 100;
        return new THREE.Color().setHSL(h, s, l);
    }
    // Assume hex
    return new THREE.Color(colorValue);
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ type }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const groupRef = useRef<THREE.Group>();
  const pointLightRef = useRef<THREE.PointLight>();
  const animationFrameIdRef = useRef<number>();

  useLayoutEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- Cleanup logic from previous render ---
    if (rendererRef.current) {
        const oldCanvas = rendererRef.current.domElement;
        if (currentMount.contains(oldCanvas)) {
            currentMount.removeChild(oldCanvas);
        }
        rendererRef.current.dispose();
    }
    if (sceneRef.current) {
        sceneRef.current.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose();
                child.material.dispose();
            }
        });
        sceneRef.current.clear();
    }
    if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
    }
    // --- End cleanup ---


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
    const primaryThreeColor = getThreeColor('--primary');

    if (type === 'particles') {
        // Omitting particle logic for brevity
        camera.position.z = 5;
    } else {
        const material = new THREE.MeshStandardMaterial({
          color: primaryThreeColor,
          wireframe: true,
        });

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);
        
        // Use primary color for the glow
        const pointLight = new THREE.PointLight(primaryThreeColor, 5, 10);
        pointLight.position.set(2, 3, 4);
        pointLightRef.current = pointLight;
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

        const object = new THREE.Mesh(geometry, material);
        group.add(object);
        camera.position.z = type === 'avatar' ? 2 : 4;
    }

    const animate = () => {
        animationFrameIdRef.current = requestAnimationFrame(animate);
        
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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [type, theme]);

  // This effect updates colors when the theme changes.
  useEffect(() => {
    if (!groupRef.current || !pointLightRef.current) return;

    const primaryColor = getThreeColor('--primary');

    groupRef.current.traverse(child => {
        if (child instanceof THREE.Mesh) {
            if(child.material instanceof THREE.MeshStandardMaterial) {
                child.material.color.set(primaryColor);
            }
        }
    });

    pointLightRef.current.color.set(primaryColor);

  }, [theme]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default ThreeScene;
