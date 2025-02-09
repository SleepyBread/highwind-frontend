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

    @Input() rayon: number = 5;
    @Input() segments: number = 64;
    @Input() color: string = '#ffffff'; // Couleur de la ligne
    @Input() orbitalAngle: number = 0; // Inclinaison orbitale en degrés

    public meshObj!: Line;
  
    ngOnInit() {
      this.createCircle();
    }
  
    private createCircle() {
      const points: Vector3[] = [];
      const orbitalRad = this.orbitalAngle; // Conversion en radians
  
      for (let i = 0; i <= this.segments; i++) {
        const theta = (i / this.segments) * Math.PI * 2; // Angle du cercle
        const x = this.rayon * Math.cos(theta);
        const y = this.rayon * Math.sin(theta) * Math.sin(orbitalRad); // Applique l'angle orbital
        const z = this.rayon * Math.sin(theta);
  
        points.push(new Vector3(x, y, z));
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
