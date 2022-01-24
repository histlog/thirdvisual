import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  constructor() { }
  scene:any;
  renderer:any;

  ngOnInit(): void {
    this.scene = this.main();
    console.log(this.scene);
  }

  main() {
    var scene = new THREE.Scene();
    let enableFog = false;

    let gui = new dat.GUI();

    if(enableFog) {
      scene.fog = new THREE.FogExp2(0xffffff, 0.2);
    }
    
    let box = this.getBox(1, 1, 1);
    box.position.y = box.geometry.parameters.height/2;

    let plane = this.getPlane(20);
    plane.rotation.x = Math.PI/2;
    plane.name = 'plane-1';

    let pointLight = this.getPointLight('#ffffff', 1);
    pointLight.position.y = 2;

    let sphere = this.getSphere(0.05);
    pointLight.add(sphere);

    scene.add(box);
    scene.add(plane);
    scene.add(pointLight);

    let camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth/window.innerHeight,
      1,
      1000
    );

    camera.position.z = 5;
    camera.position.x = 1;
    camera.position.y = 2;

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('#d1d1d1');
    document.getElementById('webgl').appendChild(renderer.domElement);
    this.update(renderer, scene, camera);


    return scene;
  }

  getBox(w, h, d) {
    let geometry = new THREE.BoxGeometry(w, h, d);
    let material = new THREE.MeshPhongMaterial({ 
      color: 'rgb(120, 120, 120)'
    });
    let mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  getPointLight(color, intensity) {
    let light = new THREE.PointLight(color, intensity);

    return light;
  }

  getPlane(size) {
    let geometry = new THREE.PlaneGeometry(size, size);
    let material = new THREE.MeshPhongMaterial({ 
      color: 'rgb(120, 120, 120)',
      side: THREE.DoubleSide
    });
    let mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  getSphere(radius) {
    let geometry = new THREE.SphereGeometry(radius, 24, 24);
    let material = new THREE.MeshBasicMaterial({ 
      color: '#ffffff'
    });
    let mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  update(renderer, scene, camera) {
    renderer.render(
      scene,
      camera
    );

    // let plane = scene.getObjectByName("plane-1");
    // plane.rotation.y += 0.001;
    // plane.rotation.z += 0.001;

    // scene.traverse((child) => {
    //   child.scale.x += 0.0001;
    //   child.scale.y += 0.0001;
    //   child.scale.z += 0.0001;
    // })

    requestAnimationFrame(() => {
      this.update(renderer, scene, camera);
    })
  }
}
