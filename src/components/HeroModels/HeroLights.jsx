import React from 'react'
import * as THREE from 'three';

const HeroLights = () => {
    return (
        <>
            <spotLight
            position={[1, 4, 1]}
            angle={0.30}
            intensity={70}
            penumbra={1}
            color="white"
            />

            <primitive
            object={new THREE.RectAreaLight('#0xffffff',8 ,3 , 2)}
            position={[0, 1, 0]}
            intensity={1}
            rotation={[Math.PI / 4, Math.PI / 4, 0]}
            />

                
           
        </>
    )
}

export default HeroLights;   