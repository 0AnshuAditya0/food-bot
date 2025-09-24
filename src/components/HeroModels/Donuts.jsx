
import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/models/donuts.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.coffee.geometry} material={materials.coffee_and_donuts} position={[0.085, 0.013, 0.006]} />
      <mesh geometry={nodes.donut_2.geometry} material={materials.coffee_and_donuts} position={[-0.122, 0.02, 0.05]} />
      <mesh geometry={nodes.donut_3.geometry} material={materials.coffee_and_donuts} position={[-0.06, 0.043, 0.037]} />
      <mesh geometry={nodes.donut_4.geometry} material={materials.coffee_and_donuts} position={[-0.117, 0.052, -0.001]} />
      <mesh geometry={nodes.donut_1.geometry} material={materials.coffee_and_donuts} position={[-0.08, 0.021, -0.026]} />
      <mesh geometry={nodes.plate.geometry} material={materials.coffee_and_donuts} position={[-0.101, 0.006, 0.009]} />
      <mesh geometry={nodes.cup_plate.geometry} material={materials.coffee_and_donuts_glass} position={[0.085, 0.012, 0.006]} />
      <mesh geometry={nodes.cup.geometry} material={materials.coffee_and_donuts_glass} position={[0.085, 0.003, 0.006]} />
    </group>
  )
}

useGLTF.preload('/models/donuts.glb')
