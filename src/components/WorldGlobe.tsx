import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

// Mental health center coordinates
const centers = [
  { city: "New York", lat: 40.7128, lng: -74.0060, available: true },
  { city: "London", lat: 51.5074, lng: -0.1278, available: true },
  { city: "Tokyo", lat: 35.6762, lng: 139.6503, available: true },
  { city: "Sydney", lat: -33.8688, lng: 151.2093, available: true },
  { city: "Berlin", lat: 52.5200, lng: 13.4050, available: true },
  { city: "Toronto", lat: 43.6532, lng: -79.3832, available: true },
  { city: "Mumbai", lat: 19.0760, lng: 72.8777, available: false },
  { city: "São Paulo", lat: -23.5505, lng: -46.6333, available: false },
];

// Convert lat/lng to 3D sphere coordinates
const latLngToVector3 = (lat: number, lng: number, radius: number = 2) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
};

const Globe = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  
  // Auto-rotate the globe
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  // Create earth texture using a simple gradient
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext('2d')!;
    
    // Create a gradient for the earth
    const gradient = context.createLinearGradient(0, 0, 1024, 512);
    gradient.addColorStop(0, '#1e40af'); // Ocean blue
    gradient.addColorStop(0.3, '#0369a1');
    gradient.addColorStop(0.7, '#22c55e'); // Land green
    gradient.addColorStop(1, '#16a34a');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1024, 512);
    
    // Add some simple continent shapes
    context.fillStyle = '#16a34a';
    for (let i = 0; i < 50; i++) {
      context.beginPath();
      context.arc(
        Math.random() * 1024,
        Math.random() * 512,
        Math.random() * 30 + 10,
        0,
        Math.PI * 2
      );
      context.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group>
      {/* Main Globe */}
      <Sphere ref={globeRef} args={[2, 64, 64]}>
        <meshPhongMaterial 
          map={earthTexture}
          shininess={100}
          transparent
          opacity={0.9}
        />
      </Sphere>
      
      {/* Atmosphere glow */}
      <Sphere args={[2.1, 64, 64]}>
        <meshBasicMaterial 
          color="#4f9df9"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Center markers */}
      {centers.map((center) => {
        const position = latLngToVector3(center.lat, center.lng, 2.05);
        return (
          <group key={center.city}>
            {/* Marker sphere */}
            <Sphere 
              position={[position.x, position.y, position.z]} 
              args={[0.02, 8, 8]}
            >
              <meshBasicMaterial 
                color={center.available ? "#ef4444" : "#fbbf24"}
              />
            </Sphere>
            
            {/* Pulsing ring */}
            <mesh position={[position.x, position.y, position.z]}>
              <ringGeometry args={[0.03, 0.05, 16]} />
              <meshBasicMaterial 
                color={center.available ? "#ef4444" : "#fbbf24"}
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
              />
            </mesh>
            
            {/* City label */}
            <Text
              position={[position.x * 1.2, position.y * 1.2, position.z * 1.2]}
              fontSize={0.08}
              color={center.available ? "#ef4444" : "#fbbf24"}
              anchorX="center"
              anchorY="middle"
            >
              {center.city}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

const WorldGlobe = () => {
  return (
    <div className="w-full h-96 bg-gradient-to-b from-slate-900 to-slate-800 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'linear-gradient(to bottom, #0f172a, #1e293b)' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />
        
        {/* Globe */}
        <Globe />
        
        {/* Controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate={false}
        />
      </Canvas>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span>Available Centers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <span>Coming Soon</span>
        </div>
        <p className="mt-2 text-slate-300">Click and drag to rotate • Scroll to zoom</p>
      </div>
    </div>
  );
};

export default WorldGlobe;