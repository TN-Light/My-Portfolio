
'use client';

import React, { useRef, useEffect, useLayoutEffect } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  type: 'particles' | 'cube' | 'sphere' | 'torus' | 'avatar' | 'torusKnot' | 'octahedron';
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ type }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (!mountRef.current) return;

    // Cleanup function to run before re-initializing or on unmount
    const cleanup = () => {
        if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
        }
        
        if (sceneRef.current) {
            sceneRef.current.traverse(obj => {
                if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
                    obj.geometry?.dispose();
                    if (Array.isArray(obj.material)) {
                        obj.material.forEach(mat => mat.dispose());
                    } else if (obj.material) {
                        obj.material.dispose();
                    }
                }
            });
            sceneRef.current.clear();
        }

        if (rendererRef.current) {
            rendererRef.current.dispose();
            mountRef.current?.removeChild(rendererRef.current.domElement);
        }
        
        rendererRef.current = null;
        sceneRef.current = null;
        cameraRef.current = null;
        animationFrameIdRef.current = null;
    };

    cleanup();

    // Re-initialization logic
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setClearAlpha(0); // Ensure transparent background
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    let object: THREE.Object3D | null = null;
    const mouse = new THREE.Vector2(-10, -10); // Initialize off-screen
    let handleMouseMove: ((event: MouseEvent) => void) | null = null;
    const group = new THREE.Group();
    scene.add(group);

    const initializeScene = () => {
        function getThreeColor(cssVar: string) {
            if (typeof window === 'undefined') return new THREE.Color(0xffffff);
            const colorValue = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
            
            // Handle HSL string like "240 10% 3.9%"
            if (colorValue.includes(' ')) {
                const parts = colorValue.split(" ");
                if (parts.length < 3) return new THREE.Color(0xffffff);
                const h = parseFloat(parts[0]) / 360;
                const s = parseFloat(parts[1].replace('%','')) / 100;
                const l = parseFloat(parts[2].replace('%','')) / 100;
                return new THREE.Color().setHSL(h, s, l);
            }
            // Handle hex string
            return new THREE.Color(colorValue);
        }

        const primaryThreeColor = getThreeColor('--primary');
        const accentThreeColor = getThreeColor('--accent');
        
        if (type === 'particles') {
          const particlesCount = 5000;
          const positions = new Float32Array(particlesCount * 3);
          const originalPositions = new Float32Array(particlesCount * 3);
          const colors = new Float32Array(particlesCount * 3);

          const particleColor = primaryThreeColor;

          for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            const x = (Math.random() - 0.5) * 15;
            const y = (Math.random() - 0.5) * 15;
            const z = (Math.random() - 0.5) * 15;
            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;

            originalPositions[i3] = x;
            originalPositions[i3 + 1] = y;
            originalPositions[i3 + 2] = z;

            colors[i3] = particleColor.r;
            colors[i3 + 1] = particleColor.g;
            colors[i3 + 2] = particleColor.b;
          }

          const particlesGeometry = new THREE.BufferGeometry();
          particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
          
          const particlesMaterial = new THREE.PointsMaterial({
            size: 0.025,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
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
                  geometry = sphereGeom; 
                  break;
                case 'torus': geometry = new THREE.TorusGeometry(0.8, 0.3, 16, 100); break;
                case 'avatar': 
                  geometry = new THREE.IcosahedronGeometry(1, 0); 
                  camera.position.z = 2;
                  break;
                case 'torusKnot': geometry = new THREE.TorusKnotGeometry(0.8, 0.25, 100, 16); break;
                case 'octahedron': geometry = new THREE.OctahedronGeometry(1.2, 0); break;
                default: geometry = new THREE.BoxGeometry(1, 1, 1);
            }

          if (type !== 'sphere') {
            object = new THREE.Mesh(geometry, material);
            group.add(object);
          }
          if (type !== 'avatar') {
            camera.position.z = 4;
          }
        }

        const clock = new THREE.Clock();
        const raycaster = new THREE.Raycaster();

        const animate = () => {
          animationFrameIdRef.current = requestAnimationFrame(animate);
          const elapsedTime = clock.getElapsedTime();

          if (object && type === 'particles' && object instanceof THREE.Points) {
            object.rotation.y = elapsedTime * 0.05;

            raycaster.setFromCamera(mouse, camera);

            const positionAttribute = object.geometry.getAttribute('position');
            const originalPositions = (object.geometry.getAttribute('originalPosition') as THREE.BufferAttribute);
            
            for (let i = 0; i < positionAttribute.count; i++) {
                const i3 = i * 3;
                const x = positionAttribute.getX(i);
                const y = positionAttribute.getY(i);
                const z = positionAttribute.getZ(i);

                const ox = originalPositions.getX(i);
                const oy = originalPositions.getY(i);
                const oz = originalPositions.getZ(i);

                const mouseDistance = new THREE.Vector3(x,y,z).distanceTo(new THREE.Vector3(mouse.x*7, mouse.y*7, 0));

                const maxDist = 2;
                const forceFactor = Math.max(0, 1 - mouseDistance / maxDist);
                const dx = (mouse.x * 7 - x) * forceFactor * 0.1;
                const dy = (mouse.y * 7 - y) * forceFactor * 0.1;

                const newX = x + (ox + dx - x) * 0.1;
                const newY = y + (oy + dy - y) * 0.1;
                const newZ = z + (oz - z) * 0.1;

                positionAttribute.setXYZ(i, newX, newY, newZ);
            }

            positionAttribute.needsUpdate = true;

          } else if(object) {
              group.rotation.x += 0.005;
              group.rotation.y += 0.005;

              if(type === 'sphere') {
                group.children.forEach((child, index) => {
                    if (index > 0) {
                        const angle = (index - 1) / 5 * Math.PI * 2 + elapsedTime * 0.5;
                        const radius = 1.8;
                        child.position.x = Math.cos(angle) * radius;
                        child.position.z = Math.sin(angle) * radius;
                        child.position.y = Math.sin(elapsedTime * 2 + index) * 0.3;
                    }
                })
              }
          }
          if (rendererRef.current && sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
          }
        };

        if (type === 'particles' && object instanceof THREE.Points) {
            object.geometry.setAttribute('originalPosition', new THREE.BufferAttribute((object.geometry.getAttribute('position') as THREE.BufferAttribute).array.slice(), 3));
        }
        animate();
    }
    
    initializeScene();

    const handleResize = () => {
      if (!currentMount || !rendererRef.current || !cameraRef.current) return;
      cameraRef.current.aspect = currentMount.clientWidth / currentMount.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (handleMouseMove) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cleanup();
    };
  }, [type]);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default ThreeScene;
