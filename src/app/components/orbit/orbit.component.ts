import { Component, Input } from '@angular/core';
import { SpaceObject } from '../../core/models/spaceObject.model';
import { BufferGeometry, Line, Vector3, LineBasicMaterial, Object3D } from 'three';

@Component({
    selector: 'app-orbit',
    imports: [],
    templateUrl: './orbit.component.html',
    styleUrl: './orbit.component.css'
})
export class OrbitComponent implements SpaceObject {

    @Input() rayon: number = 10;
    @Input() segments: number = 64;
    @Input() color: string = '#ffffff';
  
    public meshObj!: Line;
  
    public ngOnInit() {
        this.createCircle();
    }
  
    private createCircle() {
      const points: Vector3[] = [];

        for (let i = 0; i <= this.segments; i++) {
            const theta = (i / this.segments) * Math.PI * 2; // Angle en radians
            points.push(new Vector3(Math.cos(theta) * this.rayon, 0, Math.sin(theta) * this.rayon));
        }
  
        const geometry = new BufferGeometry().setFromPoints(points);
        const material = new LineBasicMaterial({ color: this.color });
        this.meshObj = new Line(geometry, material);
    }
    
    get mesh(): Object3D[] {
        return [this.meshObj];
    }

    public animate(): void {
        throw new Error('Method not implemented.');
    }

}
