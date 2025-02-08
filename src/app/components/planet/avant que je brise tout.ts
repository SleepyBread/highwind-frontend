import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PerspectiveCamera, TextureLoader, SphereGeometry, MeshBasicMaterial, Mesh, WebGLRenderer, Scene, Color } from "three";

@Component({
  selector: 'app-planet',
  imports: [],
  templateUrl: './planet.component.html',
  styleUrl: './planet.component.css'
})
export class PlanetComponent implements OnInit {

    // @ViewChild("canvas") private canvasElement!: ElementRef;

    @Input() public rotationSpeedX: number = 0.05;
    @Input() public rotationSpeedY: number = 0.01;
    @Input() public size: number = 200;
    @Input() public texture: string = "../../assets/textures/earth.jpg";

    @Input() public cameraZ: number = 400;
    @Input() public fieldOfView: number = 1;
    @Input('nearClipping') public nearClippingPlane: number = 1;
    @Input('farClipping') public farClippingPlane: number = 1000;





    public mesh!: Mesh;
    private loader = new TextureLoader();

    public ngOnInit(): void {
        const geometry = new SphereGeometry(1, 1);    //TODO : Peut-être pas bon comme paramètres...
        const material = new MeshBasicMaterial({ map: this.loader.load(this.texture) });
        this.mesh = new Mesh(geometry, material);
    }






    // private camera!: PerspectiveCamera;


    // private get canvas(): HTMLCanvasElement {
    //     return this.canvasElement.nativeElement;
    // }


    // private geometry = new SphereGeometry(1, 1);    //TODO : Peut-être pas bon comme paramètres...
    // private material = new MeshBasicMaterial({ map: this.loader.load(this.texture) });

    // public mesh: Mesh = new Mesh(this.geometry, this.material);

    // private renderer!: WebGLRenderer;

    // private scene!: Scene;

    // public constructor(){

    // }

    public animate() {
        this.mesh.rotation.x += this.rotationSpeedX;
        this.mesh.rotation.y += this.rotationSpeedY;
    }

    // private createScene() {
    //     //* Scene
    //     this.scene = new Scene();
    //     this.scene.background = new Color(0x000000)
    //     this.scene.add(this.mesh);
    //     //*Camera
    //     let aspectRatio = this.aspectRatio;
    //     this.camera = new PerspectiveCamera(
    //         this.fieldOfView,
    //         aspectRatio,
    //         this.nearClippingPlane,
    //         this.farClippingPlane
    //     );
    //     this.camera.position.z = this.cameraZ;
    // }

    // private get aspectRatio() {
    //     return this.canvas.clientWidth / this.canvas.clientHeight;
    // }

    // private startRenderingLoop() {
    //     //* Renderer
    //     // Use canvas element in template
    //     this.renderer = new WebGLRenderer({ canvas: this.canvas });
    //     this.renderer.setPixelRatio(devicePixelRatio);
    //     this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    
    //     let component: PlanetComponent = this;
    //     (function render() {
    //       requestAnimationFrame(render);
    //       component.animate();
    //       component.renderer.render(component.scene, component.camera);
    //     }());
    // }


    // public ngAfterViewInit(): void {
    //     this.createScene();
    //     this.startRenderingLoop();
    // }

    // public ngOnInit(): void {
    // }

}
