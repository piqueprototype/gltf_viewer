import { useState, useEffect } from 'react'
import './App.css'
import * as THREE from 'three';
import SceneInit from './lib/SceneInit';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function App() {
    const [selectedModel, setSelectedModel] = useState(1)
    const models = ["assets/scene/fly/scene.gltf",
                    "assets/scene/fox/Fox.gltf",
                    "assets/scene/lion/scene.gltf",
                    "assets/scene/polar_bear/scene.gltf",
                    "assets/scene/sphinx/scene.gltf",
                    "assets/scene/statue/scene.gltf",
                    "assets/scene/teeth/scene.gltf"]


    function changeModel() {
        if (selectedModel < 7 ) {
            setSelectedModel((prevValue) => {prevValue + 1});
        } else {
            setSelectedModel(0)
        }
    }

   useEffect(() => {

    const test = new SceneInit('canvas');
    const loader = new GLTFLoader();


    test.initialize();
    test.animate();

    loader.load(
        models[selectedModel],
        function (gltf) {
            test.scene.add(gltf.scene);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log("An error happened")
        }
    )

  }, [selectedModel]);

  return (
  <>
    <canvas id="canvas" />
    {/*
    <div className="controls">
        <p>{models[String(selectedModel)]}</p>
        <button onClick={changeModel}>Next Model</button>
    </div>
    */}
  </>
  )
}

export default App
