import { Component, ContentChildren, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { PerspectiveCamera, WebGLRenderer, Scene, Color, DirectionalLight, AmbientLight, DirectionalLightHelper } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { PlanetComponent } from '../planet/planet.component';
import { StarsComponent } from '../stars/stars.component';
import { SpaceShipComponent } from '../spaceShip/spaceShip.component';
import { SolarWindService } from '../../service/solar-wind.service';
import { SolarWindMapComponent } from '../solarWindMap/solarWindMap.component';
import { SpaceShip } from '../../class/ship';
import { temp } from 'three/src/nodes/TSL.js';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrl: './space.component.css'
})
export class SpaceComponent implements OnChanges {
    @ViewChild('canvas', { static: true }) canvasElement!: ElementRef;
    @ContentChildren(PlanetComponent) planetChildren!: QueryList<PlanetComponent>;
    @ContentChildren(StarsComponent) starsChildren!: QueryList<StarsComponent>;
    @ContentChildren(SpaceShipComponent) spaceShips!: QueryList<SpaceShipComponent>;
    @ContentChildren(SolarWindMapComponent) solarWindMaps!: QueryList<SolarWindMapComponent>;

    @Input() public orbitControls: boolean = true;
    @Input() public displaySolarMaps: boolean = false;
    @Input() public resetTime: boolean = false;
    @Input() public form: {masse:number, coordX:number, coordY:number, aireVoile:number, angleVoile:number} | null = null;

    @Input() public speed: number = 1;
    @Input() public tempShip: SpaceShip = new SpaceShip();
    @Output() public tempShipChange = new EventEmitter<SpaceShip>();
    @Input() public solarAccel: {ax: number, ay: number, az: number} = {ax:0, ay: 0, az: 0};
    @Output() public solarAccelChange = new EventEmitter<{ax: number, ay: number, az: number}>();

    private planetComponents: PlanetComponent[] = []
    private spaceShipComponents: SpaceShipComponent[] = []

    private scene!: Scene;
    private camera!: PerspectiveCamera;
    private renderer!: WebGLRenderer;
    private controls!: OrbitControls;

    private solarWindService: SolarWindService

    public ngOnChanges(changes: SimpleChanges) {
        if (changes['displaySolarMaps']) {
            if(!this.displaySolarMaps) this.removeSolarMap();
            else this.addSolarMap();
        }
        if (changes['resetTime']) {
            this.resetTheTime();
        }
        if (changes['form']) {
            this.receiveForm();
        }
    }
    
    constructor(solar: SolarWindService) {
        this.solarWindService = solar;
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

        let accel = this.getShipAcceleration();

        this.tempShip.vX += accel.ax * this.speed;
        this.tempShip.vY += accel.ay * this.speed;
        this.tempShip.vZ += accel.az * this.speed;

        this.tempShip.positionX += this.tempShip.vX * this.speed;
        this.tempShip.positionY += this.tempShip.vY * this.speed;
        this.tempShip.positionZ += this.tempShip.vZ * this.speed;

        this.tempShipChange.emit(this.tempShip);

        this.renderer.render(this.scene, this.camera);
    }

    private getShipAcceleration() {
        this.solarAccel = this.solarWindService.getShipAccel(this.tempShip);
        this.solarAccelChange.emit(this.solarAccel);

        let gravityAccel = {ax:0, ay:0, az:0}

        for (let p in this.planetComponents) {
            let x = (this.planetComponents[p].posX - this.tempShip.positionX) * 1000;
            let y = (this.planetComponents[p].posY - this.tempShip.positionY) * 1000;
            let z = (this.planetComponents[p].posZ - this.tempShip.positionZ) * 1000;

            let distance = Math.sqrt(x*x + y*y + z*z)

            let force = 6.67e-11 * this.tempShip.mass * this.planetComponents[p].mass / (distance*distance)

            gravityAccel.ax += force * x / (this.tempShip.mass * distance * 1000)
            gravityAccel.ay += force * y / (this.tempShip.mass * distance * 1000)
            gravityAccel.az += force * z / (this.tempShip.mass * distance * 1000)
        }

        return {
            ax: this.solarAccel.ax + gravityAccel.ax,
            ay: this.solarAccel.ay + gravityAccel.ay,
            az: this.solarAccel.az + gravityAccel.az
        }
    }

    private removeSolarMap(){
        if(!this.solarWindMaps) return;
        this.solarWindMaps.forEach(child => {
            if (!child.mesh) return;
            this.scene.remove(...child.mesh);
        });
    }

    private addSolarMap(){
        this.solarWindMaps.forEach(child => {
            this.scene.add(...child.mesh);
        });
    }

    private resetTheTime(){
        console.log("Reset le temps");
        //TODO: Pour reset le temps
    }

    private receiveForm(){
        console.log("Simulation : ", this.form);
        //TODO: Pour la simulation de la fusée, toutes les données sont dans "this.form"
    }

}