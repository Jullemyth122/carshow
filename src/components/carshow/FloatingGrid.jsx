import { useFrame, useLoader } from '@react-three/fiber'
import React from 'react'
import { useEffect } from 'react';
import { RepeatWrapping, TextureLoader } from 'three'

export const FloatingGrid = () => {
    const diffuse = useLoader(TextureLoader,process.env.PUBLIC_URL + "textures/grid-texture.png");

    useEffect(() => {
        diffuse.wrapS = RepeatWrapping;
        diffuse.wrapST = RepeatWrapping;
        diffuse.anisotropy = 4;
        diffuse.repeat.set(30,30);
        diffuse.offset.set(0,0);
    },[diffuse])

    useFrame((state,delta) => {
        let t = -state.clock.getElapsedTime() * 0.68;
        diffuse.offset.set(0,t);
    })

    return (
        <>
            <mesh rotation={[-Math.PI * 0.5,0,0]} position={[0,0,0]}>
                <planeGeometry args={[35,35]}/>
                <meshBasicMaterial
                    color={[1,1,1]}
                    opacity={0}
                    map={diffuse}
                    alphaMap={diffuse}
                    transparent={true}
                />
            </mesh>
        </>
    )
}