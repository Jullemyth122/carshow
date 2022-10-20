import React,{ Suspense, useState } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Canvas, useFrame,useThree,extend,useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { useEffect } from 'react'
import { SpotLight } from 'three'
import * as THREE from 'three'
import gsap from 'gsap'
import { forwardRef } from 'react';

extend({ OrbitControls,PointerLockControls });

function Boxes(props) {

    const ref = useRef()
    const [hovered,hover] = useState(false)
    const [clicked,click] = useState(false)

    useFrame((state,delta) => (
        ref.current.rotation.x += 0.01
    ))

    // useEffect(() => {
    //     setInterval(() => {
    //         ref.current.rotation.x += 0.01
    //     }, 0);
    // },[])
    
    return(
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(e) => hover(true)}
            onPointerOut={(e) => hover(false)}
        >
            <boxGeometry></boxGeometry>
            <meshStandardMaterial color={hovered ? 'hotpink':'orange'} roughness="0.5" metalness="0.2"></meshStandardMaterial>
        </mesh>
    )

}

function City(props) {

    return (
        <object3D 
        >
            <mesh
            // ref={ref}
            {...props}
            scale={[100,100,0.1]}
            rotation = {[Math.PI/2,0,0]}
            >
                <boxGeometry></boxGeometry>
                <meshStandardMaterial 
                    color={"#232323"} 
                    roughness="0.5" 
                    metalness="0.3" 
                    emissive={"#000000"} 
                ></meshStandardMaterial>
            </mesh>
            {Array.from({length:9},(_,i) => {
                return (Array.from({length:9},(_,ix) => {
                    if (i > 1 && i < 7 && ix > 1 && ix <7) {

                    } else {
                        return (
                            <City2 
                                imgSource={['./img/sample1.jpg','./img/sample2.jpg']}
                                key={ix}
                                delay={i + ix} 
                                position={[(i - 4)*10,props.position[1] + 0.5,(ix - 4)*10]}
                            ></City2>
                        )
                    }
                }))
            })}
        </object3D>
    )
}

function NewCity(props) {
    return(
        <>
            <object3D>
                <mesh
                {...props}
                scale={[100,200,0.1]}
                rotation = {[Math.PI/2,0,0]}
                >
                    <boxGeometry></boxGeometry>
                    <meshStandardMaterial 
                        color={"#232323"} 
                        roughness="0.5" 
                        metalness="0.3" 
                        emissive={"#000000"} 
                    ></meshStandardMaterial>
                </mesh>
                {Array.from({length:9},(_,i) => {
                    return (Array.from({length:9},(_,ix) => {
                        if (i > 1 && i < 7 && ix > (props.count % 2 == 0 ? 1 : -1) && ix < (props.count % 2 == 0 ? 9 : 7)) {

                        } else {
                            return (
                                <NewCity2 
                                    key={ix}
                                    delay={i + ix} 
                                    position={[ props.position[0] + (i - 4)*10, props.position[1] + 0.5, props.position[2] + (ix - 4) * 10]}
                                ></NewCity2>
                            )
                        }
                    }))
                })}
            </object3D>
        </>
    )
}

function City2({position,delay,lookAt,imgSource}) {
    
    const ref = useRef()
    const refImage = useRef()
    const [frontMap] = useLoader(TextureLoader, [
        imgSource[delay % 2],
    ])

    useEffect(() => {
        function gsapIncrease(args,x,y,z) {
            gsap.fromTo(args,{
                y:1
            },{
                y:y,
                delay:delay / (Math.sqrt(delay)),
                duration:2,
                ease:"ease.inOut"
            })
        }
        gsapIncrease(ref.current.scale,0,10,0)
        gsapIncrease(ref.current.position,0,5,0)
        ref.current.lookAt(0,0,0)
        refImage.current.lookAt(0,0,0)

    },[])

    return(
        <>
            <mesh
                position={[position[0],0,position[2]]}
                scale={[4,5,2]}
                ref={ref}
            >
                <boxGeometry></boxGeometry>
                <meshStandardMaterial
                
                    color={"#232323"} 
                    roughness="0.5" 
                    metalness="0.3" 
                ></meshStandardMaterial>
            </mesh>
            <mesh
                position={[position[0],15,position[2]]}
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

function NewCity2({position}) {
    return(
        <>
            <mesh
                position={[position[0],5,position[2]]}
                scale={[4,10,2]}
            >
                <boxGeometry></boxGeometry>
                <meshStandardMaterial
                    color={"#232323"} 
                    roughness="0.5" 
                    metalness="0.3" 
                ></meshStandardMaterial>
            </mesh>
        </>
    )
}

const Scene = forwardRef((props,ref) => {

    const {
        camera, gl:{domElement},controls
        
    } = useThree()

    useEffect(() => {
        camera.position.set(0,5,0)
    },[])

    return (
        <>
            <ambientLight lookAt={[0,0,0]} intensity="1"/>
            <ambientLight lookAt={[150,0,150]} intensity="1"/>
            <spotLight position={[0,50,0]} scale={[10,10,10]} ></spotLight>
            <spotLight position={[150,50,150]} scale={[10,10,10]} ></spotLight>
            <City position={[0,0,0]}/>
            {/* <NewCity position={[100,0,100]} /> */}
            <orbitControls args={[camera,domElement,controls]}/>
        </>
    )
})

const Scene2 = (props) => {

    const list = [
        // x axis,y axis,z axis positions of Object3D and Items
        [0,0,0],
        [100,0,0],
        [200,0,0],
        [300,0,0]
    ]

    const listed2 = [
        // First Point
        {rotate: Math.PI ,pos:[-35,0,35],rotSt:1,posSt:3},
        {rotate: Math.PI * (3/2),pos:[35,0,35],rotSt:1,posSt:3},
        {rotate: Math.PI * (4/2),pos:[35,0,-35],rotSt:1,posSt:3},
        {rotate: Math.PI * (3/2),pos:[35,0,-35],rotSt:1,posSt:0},
        // Second Point
        {rotate: Math.PI ,pos:[65,0,35],rotSt:1,posSt:3},
        {rotate: Math.PI * (4/2) ,pos:[65,0,-35],rotSt:1,posSt:3},
        {rotate: Math.PI * (3/2) ,pos:[135,0,-35],rotSt:1,posSt:3},
        {rotate: Math.PI ,pos:[135,0,35],rotSt:1,posSt:3},
        {rotate: Math.PI * (3/2) ,pos:[135,0,35],rotSt:1,posSt:0},
        //Third Point
        {rotate: Math.PI ,pos:[165,0,-35],rotSt:1,posSt:3},
        {rotate: Math.PI ,pos:[165,0,35],rotSt:1,posSt:3},
        {rotate: Math.PI * (3/2) ,pos:[235,0,35],rotSt:1,posSt:3},
        {rotate: Math.PI * (4/2) ,pos:[235,0,-35],rotSt:1,posSt:3},
        {rotate: Math.PI * (3/2) ,pos:[235,0,-35],rotSt:1,posSt:0},
        // Fourth Point
        {rotate: Math.PI ,pos:[265,0,35],rotSt:1,posSt:3},
        {rotate: Math.PI * (4/2) ,pos:[265,0,-35],rotSt:1,posSt:3},
        {rotate: Math.PI * (3/2) ,pos:[335,0,-35],rotSt:1,posSt:3},
        {rotate: Math.PI ,pos:[335,0,35],rotSt:1,posSt:3},
        {rotate: Math.PI * (1/2) ,pos:[335,0,35],rotSt:1,posSt:0},
    ]

    const {
        camera, gl:{domElement},controls
        
    } = useThree()



    useEffect(() => {

        const tl = gsap.timeline()
        
        camera.position.set(-35,5,-35)
        listed2.map((item,idx) => {
            tl.to(camera.rotation,{y: item.rotate,ease:"power2.inOut",duration:item.rotSt})
            tl.to(camera.position,{
                x:item.pos[0],
                z:item.pos[2],
                ease:"power2.inOut",
                duration:item.posSt
            })
        })

        // tl.yoyo(true).repeat(-1)

    },[])

    return (
        <>
            {list.map((item,idx) => {
                console.log(item)
                return (
                    <>
                        <object3D key={idx}>
                            <ambientLight lookAt={[item[0],0,item[2]]} position={[item[0],50,item[2]]} />
                            <pointLight position={[item[0] + 0,50,item[2] + 0]} scale={[100,100,100]} />
                            <NewCity position={item} count={idx + 1}/>
                        </object3D>
                    </>
                )
            })}
            <orbitControls args={[camera,domElement,controls]}/>
        </>
    )
}

const Box = () => {
    return (
        <div className='box'>

            <Canvas gl={ { antialias:false } } id="three-canvas-container">
                {/* <Scene></Scene> */}
                <Scene2></Scene2>
            </Canvas>
        </div>
    )
}

export default Box