import { Component, Input } from '@angular/core';
import { Mesh, Object3D, Object3DEventMap } from 'three';
import { GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { SpaceObject } from '../../core/models/spaceObject.model';

@Component({
  selector: 'app-space-ship',
  imports: [],
  templateUrl: './space-ship.component.html',
  styleUrl: './space-ship.component.css'
})
export class SpaceShipComponent implements SpaceObject {
    @Input() public rotate: boolean = true;
    @Input() public ressourceUrl: string = "../../assets/gltf/Solar Sail concept 2.gltf";
    @Input() public size: number = 1;
    @Input() public posX: number = 0;
    @Input() public posY: number = 0;
    @Input() public posZ: number = 0;
    @Input() public scale: number = 1;


    public modelLoaded!: Promise<void>;
    private gltf!: GLTF;

    constructor(){
        this.modelLoaded = this.loadModel();
    }

    private loadModel(): Promise<void> {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();
            loader.load(
                this.ressourceUrl,
                (gltf: GLTF) => {
                    this.gltf = gltf;
                    resolve(); //Let's go!!
                },
                undefined,
                (error) => reject(error)
            );
        });
    }

    get mesh(): Object3D<Object3DEventMap>[] {
        if (!this.gltf || !this.gltf.scene) return [];

        this.gltf.scene.position.set(this.posX * this.scale, this.posZ * this.scale, this.posY * this.scale);
        this.gltf.scene.rotation.set(0, 45, 0)

        this.gltf.scene.scale.set(this.size, this.size, this.size);

        return [this.gltf.scene]
    }

    public animate(): void {
        this.mesh
    }

}