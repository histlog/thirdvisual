import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  constructor() { }
  scene:any;

  ngOnInit(): void {
    this.scene = this.main();
    console.log(this.scene);
  }

  main() {
    let scene = new THREE.Scene();
    
    let box = this.getBox(1, 1, 1);
    box.position.y = box.geometry.parameters.height/2;

    let plane = this.getPlane(4);
    plane.rotation.x = Math.PI/2;

    scene.add(box);
    scene.add(plane);

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
    document.getElementById('webgl').appendChild(renderer.domElement);
    renderer.render(
      scene,
      camera
    )

    return scene;
  }

  getBox(w, h, d) {
    let geometry = new THREE.BoxGeometry(w, h, d);
    let material = new THREE.MeshBasicMaterial({ 
      color: 0x00f0
    });
    let mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  getPlane(size) {
    let geometry = new THREE.PlaneGeometry(size, size);
    let material = new THREE.MeshBasicMaterial({ 
      color: 0xfcba03,
      side: THREE.DoubleSide
    });
    let mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }
}
