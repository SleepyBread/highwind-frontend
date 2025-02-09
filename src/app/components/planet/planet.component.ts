import {  Component, ContentChildren, Input, OnInit, QueryList, } from '@angular/core';
import { TextureLoader, SphereGeometry, MeshBasicMaterial, Mesh, Object3D } from "three";
import { SpaceObject } from '../../core/models/spaceObject.model';
import { OrbitComponent } from '../orbit/orbit.component';
import { CircularAnimationComponent } from '../circularAnimation/circularAnimation.component';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrl: './planet.component.css'
})
export class PlanetComponent implements OnInit, SpaceObject {

    private readonly scale = 1e-8

    @ContentChildren(OrbitComponent, { descendants: true }) orbits?: QueryList<OrbitComponent>;
    @ContentChildren(CircularAnimationComponent, { descendants: true }) circularAnimations?: QueryList<CircularAnimationComponent>;
    
    @Input() public rotate: boolean = true;
    @Input() public rotationSpeedX: number = 0.00;
    @Input() public rotationSpeedY: number = 0.001;
    @Input() public radius: number = 1;
    @Input() public texture: string = "../../assets/textures/earth.jpg";

    @Input() public posX: number = 0;
    @Input() public posY: number = 0;
    @Input() public posZ: number = 0;

    @Input() public mass: number = 0;

    private loader = new TextureLoader();
    public meshObj!: Mesh;
    // public angle: number = 0;

    private rotateAnimation(){
        this.meshObj.rotation.x += this.rotationSpeedX;
        this.meshObj.rotation.y += this.rotationSpeedY;
    }

    public ngOnInit(): void {
        const geometry = new SphereGeometry(this.radius*2*this.scale, 32, 16 );
        const material = new MeshBasicMaterial({ map: this.loader.load(this.texture) });
        this.meshObj = new Mesh(geometry, material);
        this.meshObj.position.set(this.posX, this.posY, this.posZ);
        
    }

    public animate() {
        if(this.rotate) this.rotateAnimation();
            
        if(this.circularAnimations){
            this.circularAnimations.forEach(animation => {
                animation.animate(this);
            });    
        }
    }

    public setPosMeshObj(X: number, Y: number, Z: number){
        this.meshObj.position.set(X, Y, Z);
    }


    public get mesh(): Object3D[] {
        if(!this.orbits) return [this.meshObj];
        const orbitMeshes = this.orbits.map(o => [...o.mesh]);
        return [...orbitMeshes.flat(), this.meshObj];
    }
}
