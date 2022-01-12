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

  ngOnInit(): void {
    this.main();
  }

  main() {
    var scene = new THREE.Scene();
    
    var box = this.getBox(1, 1, 1);
    scene.add(box);

    var camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth/window.innerHeight,
      1,
      1000
    );

    camera.position.z = 5;
    camera.position.x = 1;
    camera.position.y = 2;

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl').appendChild(renderer.domElement);
    renderer.render(
      scene,
      camera
    )
  }

  getBox(w, h, d) {
    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshBasicMaterial({ 
      color: 0x00f0
    });
    var mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }
}
