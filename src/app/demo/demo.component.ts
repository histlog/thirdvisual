import { Component, OnInit } from "@angular/core";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

@Component({
  selector: "app-demo",
  templateUrl: "./demo.component.html",
  styleUrls: ["./demo.component.scss"],
})
export class DemoComponent implements OnInit {
  constructor() {}
  scene: any;
  renderer: any;

  ngOnInit(): void {
    this.scene = this.main();
    console.log(this.scene);
  }

  main() {
    var scene = new THREE.Scene();
    let enableFog = false;

    let gui = new dat.GUI();

    if (enableFog) {
      scene.fog = new THREE.FogExp2(0xffffff, 0.2);
    }

    let boxGrid = this.getBoxGrid(10, 1.5);

    let plane = this.getPlane(30);
    plane.rotation.x = Math.PI / 2;
    plane.name = "plane-1";

    let directionalLight = this.getDirectionalLight("#ffffff", 1);
    directionalLight.position.x = 13;
    directionalLight.position.y = 10;
    directionalLight.position.z = 10;
    directionalLight.intensity = 2;

    let ambientLight = this.getAmbientLight("rgb(60, 50, 50)", 1);

    let sphere = this.getSphere(0.05);
    directionalLight.add(sphere);

    let helper = new THREE.CameraHelper(directionalLight.shadow.camera);

    // GUI
    gui.add(directionalLight, "intensity", 0, 10);
    gui.add(directionalLight.position, "x", 0, 20);
    gui.add(directionalLight.position, "y", 0, 20);
    gui.add(directionalLight.position, "z", 0, 20);
    // gui.add(directionalLight, "penumbra", 0, 1);

    scene.add(boxGrid);
    scene.add(plane);
    scene.add(directionalLight);
    scene.add(ambientLight);
    scene.add(helper);

    let camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    camera.position.z = 5;
    camera.position.x = 1;
    camera.position.y = 2;

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    let renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#d1d1d1");
    document.getElementById("webgl").appendChild(renderer.domElement);

    let controls = new OrbitControls(camera, renderer.domElement);

    this.update(renderer, scene, camera, controls);

    return scene;
  }

  getBox(w, h, d) {
    let geometry = new THREE.BoxGeometry(w, h, d);
    let material = new THREE.MeshPhongMaterial({
      color: "rgb(120, 120, 120)",
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;

    return mesh;
  }

  getPointLight(color, intensity) {
    let light = new THREE.PointLight(color, intensity);
    light.castShadow = true;

    return light;
  }

  getSpotLight(color, intensity) {
    let light = new THREE.SpotLight(color, intensity);
    light.castShadow = true;

    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    return light;
  }

  getDirectionalLight(color, intensity) {
    let light = new THREE.DirectionalLight(color, intensity);
    light.castShadow = true;

    light.shadow.camera.left = -15;
    light.shadow.camera.bottom = -15;
    light.shadow.camera.right = 15;
    light.shadow.camera.top = 15;

    return light;
  }

  getAmbientLight(color, intensity) {
    let light = new THREE.AmbientLight(color, intensity);

    return light;
  }

  getPlane(size) {
    let geometry = new THREE.PlaneGeometry(size, size);
    let material = new THREE.MeshPhongMaterial({
      color: "rgb(120, 120, 120)",
      side: THREE.DoubleSide,
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;

    return mesh;
  }

  getSphere(radius) {
    let geometry = new THREE.SphereGeometry(radius, 24, 24);
    let material = new THREE.MeshBasicMaterial({
      color: "#ffffff",
    });
    let mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  getBoxGrid(amount, seperationMultiplier) {
    var group = new THREE.Group();

    for (let i = 0; i < amount; i++) {
      let obj = this.getBox(1, 1, 1);
      obj.position.x = i * seperationMultiplier;
      obj.position.y = obj.geometry.parameters.height / 2;
      group.add(obj);

      for (let j = 1; j < amount; j++) {
        let obj = this.getBox(1, 1, 1);
        obj.position.x = i * seperationMultiplier;
        obj.position.y = obj.geometry.parameters.height / 2;
        obj.position.z = j * seperationMultiplier;
        group.add(obj);
      }
    }

    group.position.x = -(seperationMultiplier * (amount - 1)) / 2;
    group.position.z = -(seperationMultiplier * (amount - 1)) / 2;

    return group;
  }

  update(renderer, scene, camera, controls) {
    renderer.render(scene, camera);

    controls.update();

    // let plane = scene.getObjectByName("plane-1");
    // plane.rotation.y += 0.001;
    // plane.rotation.z += 0.001;

    // scene.traverse((child) => {
    //   child.scale.x += 0.0001;
    //   child.scale.y += 0.0001;
    //   child.scale.z += 0.0001;
    // })

    requestAnimationFrame(() => {
      this.update(renderer, scene, camera, controls);
    });
  }
}
