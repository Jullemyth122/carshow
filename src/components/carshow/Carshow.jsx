import { CubeCamera, Environment, OrbitControls, PerspectiveCamera, Ring } from '@react-three/drei'
import { Bloom,ChromaticAberration,DepthOfField,EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { Boxes } from './Boxes'
import { Car } from './Car'
import { Ground } from './Ground'
import { Rings } from './Rings'
import { FloatingGrid } from './FloatingGrid'

const Carshow = () => {


    return (
        <div className="box">
            <h3> JulleMyth Vicentillo credits with Sr. Irradiance </h3>
            <Canvas gl={ { antialias:false } } shadows>
                <>
                    <OrbitControls target={[0,0.35,0]} maxPolarAngle={1.45}> </OrbitControls>
                    <PerspectiveCamera makeDefault fov={50} position={[3,2,5]} />

                    <color args={[0,0,0]} attach="background" />
                    
                    <CubeCamera
                        resolution={256}
                        frames={Infinity}
                    >
                        {(texture) => (
                            <>
                                <Environment map={texture} />
                                <Car/>
                            </>
                        )}
                    </CubeCamera>
                    <Rings/>
                    <Boxes></Boxes>
                    <FloatingGrid/>

                    <spotLight
                        color={[1, 0.25, 0.7]}
                        intensity={1.5}
                        angle={0.6}
                        penumbra={0.5}
                        position={[5, 5, 0]}
                        castShadow
                        shadow-bias={-0.0001}
                    />

                    {/* <spotLight
                        color={[1, 0.25, 0.7]}
                        intensity={1.5}
                        angle={0.6}
                        penumbra={0.5}
                        position={[3, 0, 0]}
                        castShadow
                        shadow-bias={-0.0001}
                    /> */}

                    <spotLight
                        color={[0.14, 0.5, 1]}
                        intensity={2}
                        angle={0.6}
                        penumbra={0.5}
                        position={[-5, 5, 0]}
                        castShadow
                        shadow-bias={-0.0001}
                    />

                    {/* <spotLight
                        color={[0.14, 0.5, 1]}
                        intensity={2}
                        angle={0.6}
                        rotateY={2}
                        penumbra={0.5}
                        position={[0, 0, 3]}
                        castShadow
                        shadow-bias={-0.0001}
                    /> */}
                    <Ground />

                    <EffectComposer>
                        <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480}/>
                        <Bloom
                            blendFunction={BlendFunction.ADD}
                            intensity={1}
                            width={300}
                            height={300}
                            kernelSize={3}
                            luminanceThreshold={0.2}
                            luminanceSmoothing={0.025}
                        />
                        <ChromaticAberration
                            blendFunction={BlendFunction.NORMAL}
                            offset={[0.0005,0.0012]}
                        />
                    </EffectComposer>
                </>
            </Canvas>
        </div>
    )
}

export default Carshow