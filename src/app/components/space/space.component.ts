import { Component, ContentChildren, ElementRef, Input, QueryList, ViewChild } from '@angular/core';
import { PerspectiveCamera, WebGLRenderer, Scene, Color, DirectionalLight, AmbientLight } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { PlanetComponent } from '../planet/planet.component';
import { StarsComponent } from '../stars/stars.component';
import { SpaceShipComponent } from '../spaceShip/spaceShip.component';
import { SolarWindService } from '../../service/solar-wind.service';
import { temp } from 'three/src/nodes/TSL.js';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrl: './space.component.css'
})
export class SpaceComponent {
    @ViewChild('canvas', { static: true }) canvasElement!: ElementRef;
    @ContentChildren(PlanetComponent) planetChildren!: QueryList<PlanetComponent>;
    @ContentChildren(StarsComponent) starsChildren!: QueryList<StarsComponent>;
    @ContentChildren(SpaceShipComponent) spaceShips!: QueryList<SpaceShipComponent>;
    @Input() public orbitControls: boolean = true;

    private planetComponents: PlanetComponent[] = []
    private spaceShipComponents: SpaceShipComponent[] = []

    private scene!: Scene;
    private camera!: PerspectiveCamera;
    private renderer!: WebGLRenderer;
    private controls!: OrbitControls;

    private solarWindService: SolarWindService

    public tempShip = {
        "mass": 1e4,
        "positionX": -1.496e11,
        "positionY": 1.496e11,
        "positionZ": 0,
        "vX": 0,
        "vY": 0,
        "vZ": 0,
        "sailArea": 200,
        "sailAngle": Math.PI*3/4,
        "sailDeployed": false
    }

    constructor(solar: SolarWindService) {
        this.solarWindService = solar
    }

    private initThreeJs(): void {
        this.scene = new Scene();
        this.scene.background = new Color(0x000000);
    
        this.renderer = new WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize(window.innerWidth, window.innerHeight);            

        let aspectRatio = this.aspectRatio;
        this.camera = new PerspectiveCamera(1, aspectRatio, 1, 10000);
        this.camera.position.z = 800;

        window.addEventListener('resize', () => this.onWindowResize());
        this.InitOrbitControls();
        this.animate();
    }

    private InitOrbitControls(){
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.enablePan = false;
        this.controls.dampingFactor = 0.25;
        this.controls.screenSpacePanning = false;
    }

    private onWindowResize(): void {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    private get aspectRatio() {
        return this.canvas.clientWidth / this.canvas.clientHeight;
    }

    private get canvas(): HTMLCanvasElement {
        return this.canvasElement.nativeElement;
    }

    private addChildrens(): void {

        
            // Ajoute une lumière directionnelle puissante
            const light = new DirectionalLight(0xffffff, 3);
            light.position.set(10, 10, 10);
            this.scene.add(light);
        
            // Ajoute une lumière ambiante pour éviter un modèle totalement noir
            const ambient = new AmbientLight(0xffffff, 2);
            this.scene.add(ambient);

        
        this.planetChildren.forEach(child => {
            if (!child.mesh) return;
            this.scene.add(...child.mesh);
        });

        this.starsChildren.forEach(child => {
            if (!child.mesh) return;
            this.scene.add(...child.mesh);
        });
        
        this.spaceShips.forEach(async child => {
            child.posX = this.tempShip.positionX
            child.posY = this.tempShip.positionY
            child.posZ = this.tempShip.positionZ
            await child.modelLoaded;    //On met un await parce que le modèle doit être loader
            if (!child.mesh.length) return;
            this.scene.add(...child.mesh);
        });
    }

    public ngAfterViewInit(): void {
      this.initThreeJs();
      this.addChildrens();
        this.planetComponents = this.planetChildren.toArray();
        this.spaceShipComponents = this.spaceShips.toArray();
    }

    public animate() {
        requestAnimationFrame(() => this.animate());

        this.planetChildren.forEach(child => {
            if (!child.animate) return;
            child.animate();
        });

        this.spaceShips.forEach(child => {
            if (!child.animate) return;
            child.animate();
        });


        this.renderer.render(this.scene, this.camera);
    }

    private getShipAcceleration() {
        let solarAccel = this.solarWindService.getShipAccel("id")
        let gravityAccel = {ax:0, ay:0, az:0}

        for (let p in this.planetComponents) {
            let x = this.planetComponents[p].posX - this.tempShip.positionX
            let y = this.planetComponents[p].posY - this.tempShip.positionY
            let z = this.planetComponents[p].posZ - this.tempShip.positionZ

            let distance = Math.sqrt(x**2 + y**2 + z**2)

            let force = 6.67e-11 * this.tempShip.mass * this.planetComponents[p].mass / (distance**2)
            console.log(z)

            gravityAccel.ax += force * x / (this.tempShip.mass * distance)
            gravityAccel.ay += force * y / (this.tempShip.mass * distance)
            gravityAccel.az += force * z / (this.tempShip.mass * distance)
        }

        return {
            ax: solarAccel.ax + gravityAccel.ax,
            ay: solarAccel.ay + gravityAccel.ay,
            az: solarAccel.az + gravityAccel.az
        }
    }
}
