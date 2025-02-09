import {  Component, Input, OnInit, } from '@angular/core';
import { TextureLoader, SphereGeometry, MeshBasicMaterial, Mesh } from "three";
import { SpaceObject } from '../../core/models/spaceObject.model';

@Component({
  selector: 'app-planet',
  imports: [],
  templateUrl: './planet.component.html',
  styleUrl: './planet.component.css'
})
export class PlanetComponent implements OnInit, SpaceObject {

    @Input() public rotate: boolean = true;
    @Input() public rotationSpeedX: number = 0.00;
    @Input() public rotationSpeedY: number = 0.001;
    @Input() public size: number = 1;
    @Input() public texture: string = "../../assets/textures/earth.jpg";

    @Input() public posX: number = 0;
    @Input() public posY: number = 0;
    @Input() public posZ: number = 0;

    @Input() public orbitRadius: number = 5;
    @Input() public orbitSpeed: number = 0.001;
    @Input() public animations: ((orbitRadius: number, angle: number) => [number, number, number])[] = [];


    private angle: number = 0;
    private loader = new TextureLoader();
    public mesh!: Mesh;

    private rotateAnimation(){
        this.mesh.rotation.x += this.rotationSpeedX;
        this.mesh.rotation.y += this.rotationSpeedY;
    }

    public ngOnInit(): void {
        const geometry = new SphereGeometry(this.size, 32, 16 );
        const material = new MeshBasicMaterial({ map: this.loader.load(this.texture) });
        this.mesh = new Mesh(geometry, material);
        this.mesh.position.set(this.posX, this.posY, this.posZ);
        
    }

    public animate() {
        if(this.rotate) this.rotateAnimation();
        
        this.angle += this.orbitSpeed;
    
        this.animations.forEach(animation => {
            const animationResult = animation(this.orbitRadius, this.angle);
            this.mesh.position.set(this.posX + animationResult[0], this.posY + animationResult[1], this.posZ + animationResult[2]);
        });
    }
}
