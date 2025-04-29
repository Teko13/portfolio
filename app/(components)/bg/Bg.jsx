"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function ParticleCloud() {
  const ref = useRef();
  const sphere = random.inSphere(new Float32Array(15000), { radius: 2 });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = time * 0.03;
    ref.current.rotation.y = time * 0.05;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

const Bg = () => {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[#030303]" />
      <Canvas
        camera={{ position: [0, 0, 1.5] }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'transparent',
        }}
      >
        <ParticleCloud />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030303]/70" />
    </div>
  );
};

export default Bg;