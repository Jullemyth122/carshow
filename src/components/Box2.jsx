import React,{ Suspense, useState } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { Canvas, useFrame,useThree,extend } from '@react-three/fiber'
import { useRef } from 'react'
import { useEffect } from 'react'
import { SpotLight } from 'three'
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
        <object3D>
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

function City2({position,delay,lookAt}) {
    
    const ref = useRef()

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
                emissive={"#000000"} 
            ></meshStandardMaterial>
        </mesh>
        {/* <vector3></vector3> */}
    </>
    )
}

const Scene = forwardRef((props,ref) => {

    let moveForward = useRef(false);
    let moveBackward = useRef(false);
    let moveLeft = useRef(false);
    let moveRight = useRef(false);
    let canJump = useRef(false);

    const {refBlock,refInstruct,pointerRef} = ref

    // const pointerRef = useRef()

    const {
        camera, gl:{domElement},
        
    } = useThree()

    useEffect(() => {
        camera.position.set(0,5,0)
        
        // const controls = new PointerLockControls(camera,document.querySelector('#three-canvas-container'))
        
        pointerRef.current.addEventListener( 'unlock', function () {
            refBlock.current.style.display = 'block';
            refInstruct.current.style.display = '';
        } );
        
    },[])

    useFrame(() => {
        const time = performance.now()

        if (pointerRef.current.isLocked == true) {
            
        }

        const onKeyDown = function ( event ) {
            switch ( event.code ) {

                case 'ArrowUp':
                case 'KeyW':
                    moveForward.current = true;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    moveLeft.current = true;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    moveBackward.current = true;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    moveRight.current = true;
                    break;

                case 'Space':
                    if ( canJump.current === true ) {
                        // velocity.y += 350;
                        console.log("Pump")
                    }
                    canJump.current = false;
                    break;

            }

        };

        const onKeyUp = function ( event ) {

            switch ( event.code ) {

                case 'ArrowUp':
                case 'KeyW':
                    moveForward.current = false;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    moveLeft.current = false;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    moveBackward.current = false;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    moveRight.current = false;
                    break;

            }

        };

        document.addEventListener( 'keydown', onKeyDown );
        document.addEventListener( 'keyup', onKeyUp );

    })

    return (
        <>
            <ambientLight lookAt={[0,0,0]} intensity="1"/>
            {/* <pointLight position={[10,10,10]} lookAt={[0,0,0]}/> */}
            <spotLight position={[0,50,0]} scale={[10,10,10]} ></spotLight>
            <City position={[0,0,0]}/>
            <pointerLockControls ref={pointerRef} args={[camera,document.querySelector('#three-canvas-container')]} />
            {/* <orbitControls args={[camera,domElement]}/> */}
        </>
    )
})

const Box = () => {

    const refBlock = useRef(null)
    const refInstruct = useRef(null)
    const pointerRef = useRef(null)

    const handleClick = () => {

        pointerRef.current.lock()
        pointerRef.current.addEventListener("lock", () => {
            refInstruct.current.style.display = 'none';
            refBlock.current.style.display = 'none';
        })
    }

    return (
        <div className='box'>
            <div id="blocker" ref={refBlock} onClick={e => handleClick()}>
                <div id="instructions" ref={refInstruct}>
                    <p style={{fontSize:"36px"}}>
                        Click to play
                    </p>
                    <p>
                        Move: WASD<br/>
                        Jump: SPACE<br/>
                        Look: MOUSE
                    </p>
                </div>
            </div>
            <Canvas id="three-canvas-container">
                <Scene ref={{refBlock,refInstruct,pointerRef}}></Scene>
            </Canvas>
        </div>
    )
}

export default Box