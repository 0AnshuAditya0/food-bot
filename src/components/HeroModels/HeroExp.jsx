import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';
import { useRef } from 'react';
import { Model as Donuts } from './Donuts';
import HeroLights from './HeroLights';

// Rotating Group Component
const RotatingGroup = ({ children, ismobile }) => {
  const groupRef = useRef();
  
  useFrame((state, delta) => {
    // Very slow rotation - adjust the speed by changing this value
    groupRef.current.rotation.y += 0.2 * delta; // 0.2 = slow, 0.5 = medium, 1 = fast
  });

  return (
    <group
      ref={groupRef}
      scale={ismobile ? 0.5 : 1}
      position={[0, 0, 0]}
      rotation={[0, -Math.PI / 4, 0]}
    >
      {children}
    </group>
  );
};

const HeroExp = () => {
    const istablet = useMediaQuery({ query: '(max-width: 1024px)' });
    const ismobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <Canvas camera={{ position: [2, 5, 10], fov:10 }}>
        

        <OrbitControls 
        enableZoom={!istablet}
        enablePan={false}
        maxDistance={2}
        minDistance={0.8}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 5}
        />

        <HeroLights />
        <RotatingGroup ismobile={ismobile}>
            <Donuts />
        </RotatingGroup>
    </Canvas>
  )
}

export default HeroExp;