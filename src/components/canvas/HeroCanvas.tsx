"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate camera moving forward through the shapes on scroll
    gsap.to(camera.position, {
      z: -15, // Move deep into the scene
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [camera]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-2, 1, -3]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#ef4444" wireframe opacity={0.5} transparent />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[2, -1, -2]}>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#dc2626" wireframe opacity={0.6} transparent />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, -5]}>
          <torusKnotGeometry args={[1.5, 0.4, 100, 16]} />
          <MeshDistortMaterial color="#7f1d1d" distort={0.3} speed={2} roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>

      {/* Add some more shapes in the distance for the fly-through effect */}
      <Float speed={1} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[4, 2, -10]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ef4444" wireframe opacity={0.3} transparent />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[-3, -2, -15]}>
          <octahedronGeometry args={[2, 0]} />
          <meshStandardMaterial color="#dc2626" wireframe opacity={0.4} transparent />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} color="#ef4444" />
          <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#dc2626" />
          
          <FloatingShapes />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
