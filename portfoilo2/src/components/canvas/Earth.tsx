"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";

const TechPlanet = () => {
    const groupRef = useRef<THREE.Group>(null);
    const wireframeRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.005;
        }
        if (wireframeRef.current) {
            wireframeRef.current.rotation.y -= 0.002;
            wireframeRef.current.rotation.x += 0.001;
        }
    });

    return (
        <group ref={groupRef} scale={2.8}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#915EFF" />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00cea8" />

            {/* Core Glow */}
            <Sphere args={[1, 100, 100]}>
                <MeshDistortMaterial
                    color='#1a1a3a'
                    attach='material'
                    distort={0.4}
                    speed={2}
                    roughness={0}
                    metalness={1}
                />
            </Sphere>

            {/* Neural Wireframe Shell */}
            <mesh ref={wireframeRef}>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshStandardMaterial
                    color="#915EFF"
                    wireframe
                    transparent
                    opacity={0.15}
                    emissive="#915EFF"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Orbiting Tech Rings */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[1.5, 0.01, 16, 100]} />
                    <meshStandardMaterial color="#00cea8" emissive="#00cea8" emissiveIntensity={2} />
                </mesh>
            </Float>

            <Float speed={3} rotationIntensity={1} floatIntensity={1}>
                <mesh rotation={[0, Math.PI / 4, Math.PI / 2]}>
                    <torusGeometry args={[1.8, 0.005, 16, 100]} />
                    <meshStandardMaterial color="#915EFF" emissive="#915EFF" emissiveIntensity={1.5} />
                </mesh>
            </Float>

            {/* Floating Data Nodes */}
            {[...Array(20)].map((_, i) => {
                const angle = (i / 20) * Math.PI * 2;
                const radius = 1.3 + Math.random() * 0.4;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                const y = (Math.random() - 0.5) * 2;

                return (
                    <mesh key={i} position={[x, y, z]}>
                        <sphereGeometry args={[0.03, 8, 8]} />
                        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
                    </mesh>
                );
            })}
        </group>
    );
};

const EarthCanvas = () => {
    return (
        <div className="w-full h-full relative">
            <Canvas
                shadows
                frameloop='always'
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [-4, 3, 6],
                }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <OrbitControls
                        autoRotate
                        enableZoom={false}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 2}
                    />
                    <TechPlanet />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default EarthCanvas;
