"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }: { isMobile: boolean }) => {
    return (
        <group scale={isMobile ? 1.5 : 2.5} position={isMobile ? [0, -1, 0] : [0, -0.5, 0]}>
            {/* Ambient and Hemisphere Light for base illumination */}
            <hemisphereLight intensity={0.5} groundColor='black' />

            <ambientLight intensity={0.5} />

            <pointLight position={[10, 10, 10]} intensity={1.5} color="#915EFF" />
            <spotLight
                position={[-20, 50, 10]}
                angle={0.12}
                penumbra={1}
                intensity={2}
                castShadow
                shadow-mapSize={1024}
            />

            {/* Main Floating Core */}
            <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
                <Sphere args={[1, 100, 100]} scale={0.7}>
                    <MeshDistortMaterial
                        color="#4d3092"
                        attach="material"
                        distort={0.4}
                        speed={2}
                    />
                </Sphere>

                {/* Outer Ring 1 */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[1.5, 0.02, 16, 100]} />
                    <meshStandardMaterial color="#915EFF" emissive="#915EFF" emissiveIntensity={5} />
                </mesh>

                {/* Outer Ring 2 */}
                <mesh rotation={[0, Math.PI / 4, 0]}>
                    <torusGeometry args={[1.8, 0.015, 16, 100]} />
                    <meshStandardMaterial color="#804dee" emissive="#804dee" emissiveIntensity={1} />
                </mesh>

                {/* Pulsing Core */}
                <Sphere args={[0.3, 32, 32]}>
                    <MeshWobbleMaterial
                        color="#915EFF"
                        factor={0.6}
                        speed={5}
                        emissive="#915EFF"
                        emissiveIntensity={10}
                    />
                </Sphere>
            </Float>

            {/* Particles/Small Cubes around */}
            {[...Array(20)].map((_, i) => (
                <Float
                    key={i}
                    speed={1}
                    rotationIntensity={2}
                    floatIntensity={1}
                    position={[
                        (Math.random() - 0.5) * 8,
                        (Math.random() - 0.5) * 8,
                        (Math.random() - 0.5) * 8
                    ]}
                >
                    <mesh>
                        <boxGeometry args={[0.1, 0.1, 0.1]} />
                        <meshStandardMaterial color="#915EFF" />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};

const ComputersCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Add a listener for changes to the screen size
        const mediaQuery = window.matchMedia("(max-width: 500px)");

        // Set the initial value of the `isMobile` state variable
        setIsMobile(mediaQuery.matches);

        // Define a callback function to handle changes to the media query
        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        // Add the callback function as a listener for changes to the media query
        mediaQuery.addEventListener("change", handleMediaQueryChange);

        // Remove the listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    return (
        <Canvas
            frameloop='always'
            shadows
            dpr={[1, 2]}
            camera={{ position: [20, 3, 5], fov: 25 }}
            gl={{ antialias: false }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Computers isMobile={isMobile} />
            </Suspense>

        </Canvas>
    );
};

export default ComputersCanvas;
