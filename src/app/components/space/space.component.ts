import { Component, ContentChildren, ElementRef, Input, QueryList, ViewChild } from '@angular/core';
import { PerspectiveCamera, WebGLRenderer, Scene, Color } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { PlanetComponent } from '../planet/planet.component';
import { StarsComponent } from '../stars/stars.component';

@Component({
  selector: 'app-space',
  imports: [],
  templateUrl: './space.component.html',
  styleUrl: './space.component.css'
})
export class SpaceComponent {
    @ViewChild('canvas', { static: true }) canvasElement!: ElementRef;
    @ContentChildren(PlanetComponent) planetChildren!: QueryList<PlanetComponent>;
    @ContentChildren(StarsComponent) starsChildren!: QueryList<StarsComponent>;
    @Input() public orbitControls: boolean = true;

    private scene!: Scene;
    private camera!: PerspectiveCamera;
    private renderer!: WebGLRenderer;
    private controls!: OrbitControls;

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

        this.planetChildren.forEach(child => {
            if (!child.mesh) return;
            this.scene.add(...child.mesh);
        });

        this.starsChildren.forEach(child => {
            if (!child.mesh) return;
            this.scene.add(...child.mesh);
        });
    }

    public ngAfterViewInit(): void {
      this.initThreeJs();
      this.addChildrens();
    }

    public animate() {
        requestAnimationFrame(() => this.animate());

        this.planetChildren.forEach(child => {
            if (!child.animate) return;
            child.animate();
        });

        this.renderer.render(this.scene, this.camera);
    }

}
