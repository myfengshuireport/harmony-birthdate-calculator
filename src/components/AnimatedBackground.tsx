import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface FloatingCircleProps {
  position: [number, number, number];
  speed: number;
  size: number;
}

const FloatingCircle: React.FC<FloatingCircleProps> = ({ position, speed, size }) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.5) * 0.3;
      meshRef.current.rotation.z += 0.01 * speed;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <circleGeometry args={[size, 32]} />
      <meshBasicMaterial 
        color="#f59e0b" 
        transparent 
        opacity={0.1}
      />
    </mesh>
  );
};

const AnimatedBackground: React.FC = () => {
  const circles = useMemo(() => {
    const circleData = [];
    for (let i = 0; i < 20; i++) {
      circleData.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          -5 + Math.random() * -5
        ] as [number, number, number],
        speed: 0.5 + Math.random() * 1.5,
        size: 0.5 + Math.random() * 2
      });
    }
    return circleData;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Red and Gold Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-prosperity-red via-prosperity-red/80 to-prosperity-gold" />
      
      {/* Three.js Canvas for Floating Circles */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <ambientLight intensity={0.5} />
        {circles.map((circle, index) => (
          <FloatingCircle
            key={index}
            position={circle.position}
            speed={circle.speed}
            size={circle.size}
          />
        ))}
      </Canvas>
      
      {/* Additional CSS-based floating elements for more depth */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-prosperity-gold/5 animate-float"
            style={{
              width: `${20 + Math.random() * 80}px`,
              height: `${20 + Math.random() * 80}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;