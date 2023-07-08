import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "react-three-fiber";
import { Camera, Mesh, OrthographicCamera } from 'three';
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from '@react-three/drei';
import { BarLoader } from "react-spinners";


interface Props {
    url: string;
    rotate_speed?: number | undefined;
}

const DEF_ROTATE_SPEED = 1;

export const ModelViewer = (props: Props) => {

    return (
        <Canvas style={{
            width: "100%",
            height: "600px",
        }}>
            <Inner {...props} />
        </Canvas>
    )

}

const Inner = (props: Props) => {
    const rotate_speed = props.rotate_speed || DEF_ROTATE_SPEED;
    const ref = useRef<any>();
    const geom = useLoader(STLLoader, props.url);

    return (
        <>
            <ambientLight intensity={0.1} />
            <pointLight position={[0, 600, 0]} color="#fff" intensity={0.6} />
            <pointLight position={[0, -1000, 0]} color="#1d1d1d" intensity={0.4} />


            <mesh position={[0, 0, -150]} ref={ref}>
                <primitive object={geom} />
                <meshStandardMaterial color="#67cda8" />
            </mesh>
            <OrbitControls
                enableRotate
                enablePan={false}
                enableZoom={false}
                rotateSpeed={rotate_speed}
                target={[0, 0, -150]}

            />
        </>
    )
}

const Model = ({ url, rotate_speed }: { url: string, rotate_speed: number }) => {
    const ref = useRef<any>();
    const geom = useLoader(STLLoader, url);


    return (
        <mesh position={[0, 0, 0]} ref={ref}>
            <primitive object={geom} />
            <meshStandardMaterial color="#67cda8" />
        </mesh>
    )

}

function useLayoutEffect(arg0: () => void, arg1: never[]) {
    throw new Error("Function not implemented.");
}
