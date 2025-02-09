import { Component, Input } from '@angular/core';
import { ArrowHelper, Mesh, Object3D, Object3DEventMap, Vector3 } from 'three';
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
    @Input() public sailAngle: number = 0;
    @Input() public scale: number = 1;
    @Input() public solarAccel: {ax: number, ay: number, az: number} = {ax: 0, ay: 0, az: 0};


    public modelLoaded!: Promise<void>;
    private gltf!: GLTF;
    private arrowHelper!: ArrowHelper;

    constructor(){
        this.modelLoaded = this.loadModel();

        const dir = new Vector3( this.solarAccel.ax, this.solarAccel.ay, this.solarAccel.az );

        //normalize the direction vector (convert to vector of length 1)
        dir.normalize();

        const origin = new Vector3(this.posX * this.scale, this.posZ * this.scale, this.posY * this.scale);
        const length = 5e14 * Math.sqrt(this.solarAccel.ax**2 + this.solarAccel.ay**2 + this.solarAccel.az**2);
        const hex = 0xffff00;

        this.arrowHelper = new ArrowHelper( dir, origin, length, hex );
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
        let dir = new Vector3( 1, 0, 0 );

        if (this.sailAngle > Math.PI / 2 && this.sailAngle < Math.PI * 3 / 2) {
            dir.x *= -1
        }
        if (this.posX < 0) {
            dir.x *= -1
        }

        dir.normalize();

        const origin = new Vector3(0, 0, 0);
        const length = 1e13 * Math.sqrt(this.solarAccel.ax**2 + this.solarAccel.ay**2 + this.solarAccel.az**2);
        const hex = 0xffff00;

        this.gltf.scene.remove(this.arrowHelper)
        this.arrowHelper = new ArrowHelper( dir, origin, length, hex );
        this.gltf.scene.position.set(this.posX * this.scale, this.posZ * this.scale, this.posY * this.scale);
        this.gltf.scene.rotation.set(0, this.sailAngle, 0)
        this.gltf.scene.add(this.arrowHelper)

        this.gltf.scene.scale.set(this.size, this.size, this.size);

        return [this.gltf.scene]
    }

    public animate(): void {
        this.mesh;
    }

}