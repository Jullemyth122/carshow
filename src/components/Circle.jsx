import React,{ Suspense, useState } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Canvas, useFrame,useThree,extend,useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { forwardRef } from 'react';
import { EllipseCurve } from 'three'

import { LineMaterial } from "three/examples/jsm/lines/LineMaterial"
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry"
import { Line2 } from "three/examples/jsm/lines/Line2"
import { Line } from '@react-three/drei'
import { useMemo } from 'react'

extend({ OrbitControls,EllipseCurve,Line2,LineGeometry,LineMaterial });

const TorusSurface = () => {

    const meshItems = useRef(new Array())
    const lineRef = useRef()
    const torusRef = useRef()
    const refImage = useRef()
    const [frontMap] = useLoader(TextureLoader, [
        './img/sample1.jpg',
    ])

    var mov = useRef(0.01)
    let v = useRef(new THREE.Vector3());

    const points = useMemo(() => new THREE.EllipseCurve(0, 0, 10, 10, 0, 2 * Math.PI, false, 0).getSpacedPoints(100), [])

    // console.log(points)
    // useEffect(() => {
    //     console.log(lineRef.current)
    // },[])

    // useFrame((state) => {
    //     mov.current += 0.01
    //     let t = (mov * 0.05) % 1;
        
    //     // refImage.current.position.copy(v)
    //     // refImage.current.position.applyMatrix4(lineRef.current.matrixWorld)
    //     // meshItems[i][1].getPointAt(t, v)
    // })

    return (
    <>
        <mesh
            ref={torusRef}
            position={[0,0.1,0]}
            scale={[1,1,1]}
            rotation = {[Math.PI/2,0,0]}
        >
            <torusGeometry args={[45, 5, 2, 100]} />
            <meshBasicMaterial 
                color={0xfffb00} 
                roughness="0.1"
                metalness="0.1"
            />            
        </mesh>

        {
            Array.from({length:10},(_,i) => {
                return (
                    <Line
                    ref={lineRef}
                    scale={[1 * (i+1),1 * (i+1),1 * (i+1)]}
                    points={points}
                    color="pink"
e                    lineWidth={5}
                    position={[0,2,0]}
                    rotation={[Math.PI / 2,0,0]}/>
                )
            })
        }
        
        <mesh
            position={[0,2.5,0]}
            scale={[5,5,5]}
            ref={refImage}
        >
            <planeGeometry></planeGeometry>
            <meshBasicMaterial
                map={frontMap}
                side={THREE.DoubleSide}
                toneMapped ={false}    
            ></meshBasicMaterial>
        </mesh>
    </>
    )
}

const CircleArea = (props) => {
    return (
        <object3D>
                <mesh
                {...props}
                scale={[300,300,0.1]}
                rotation = {[Math.PI/2,0,0]}
                >
                    <boxGeometry/>
                    <meshStandardMaterial 
                        color={"#232323"} 
                        roughness="0.5" 
                        metalness="0.3" 
                        emissive={"#000000"} 
                    />
                </mesh>
            <TorusSurface></TorusSurface>
        </object3D>
    )
}

const Scene = () => {

    const {
        camera, gl:{domElement}
        
    } = useThree()

    return (
        <>
            <ambientLight lookAt={[0,0,0]} intensity="1"/>
            <spotLight position={[0,150,0]} scale={[50,50,50]} ></spotLight>
            <CircleArea position={[0,0,0]}></CircleArea>
            <orbitControls args={[camera,domElement]}/>
        </>
    )
}

const Circle = () => {

    return (
        <div className='box'>
            <Canvas gl={{ antialias:true }} id='three-canvas-container'>
                <Scene></Scene>
            </Canvas>
        </div>
    )
}

export default Circle