import {
    Scene,
    PerspectiveCamera,
    HemisphereLight,
    WebGLRenderer,
    Box3,
    Vector3
} from 'three'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default class Product {
    constructor(canvas, model) {
        this.render(canvas, model);
    }
    render(canvas, model) {        
        const scene = new Scene();
        const camera = new PerspectiveCamera( 30, canvas.width / canvas.height , 0.1, 10000 );

        const hemiLight = new HemisphereLight( 0xffffff, 0x8d8d8d, 3 );
        hemiLight.position.set( 0, 20, 0 );
        scene.add( hemiLight );

        const renderer = new WebGLRenderer({
            canvas: canvas, 
            alpha: true, 
            antialias: true
        });
        renderer.setSize( canvas.width ,  canvas.height, false);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setAnimationLoop(animate);

        //Loads and adds the 3D model to the Scene
        const loader = new GLTFLoader();
        loader.load(
            model.path,
            ( gltf ) => {
                const box = new Box3().setFromObject( gltf.scene );
                const center = box.getCenter( new Vector3() );
                
                gltf.scene.position.x += ( gltf.scene.position.x - center.x );
                gltf.scene.position.y += ( gltf.scene.position.y - center.y );
                gltf.scene.position.z += ( gltf.scene.position.z - center.z );

                scene.add(gltf.scene);
            }
        );

        // Distance between the model and the camera
        camera.position.z = model.distance;

        //OrbitControls Setup
        const controls = new OrbitControls( camera, renderer.domElement );
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.8; 
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.target.set( 0, 1, 0 );
        controls.update();
        
        // controls.addEventListener("start", (event) => cameraPos = camera.position.clone());
        // controls.addEventListener("end", (event) => camera.position = cameraPos);

        function animate() {
            camera.updateProjectionMatrix();

            controls.update();

            renderer.render( scene, camera );
        }
    }
}
