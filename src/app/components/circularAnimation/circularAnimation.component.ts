import { Component, Input } from '@angular/core';
import { PlanetAnimation } from '../../core/models/animation.model';
import { PlanetComponent } from '../planet/planet.component';

@Component({
  selector: 'app-circular-animation',
  templateUrl: './circularAnimation.component.html',
  styleUrl: './circularAnimation.component.css'
})
export class CircularAnimationComponent implements PlanetAnimation {

    private readonly scale = 1e-8

    @Input() public orbitRadius: number = 5;
    @Input() public orbitSpeed: number = 0.001;
    @Input() public orbitalAngle: number = 0.001;
    @Input() public longNode: number = 0.001;

    private angle: number = 0;

    public animate(planet: PlanetComponent): void {
        this.angle += this.orbitSpeed;

        const x = this.orbitRadius * this.scale * Math.cos(this.angle); // Pos en X
        const y = this.orbitRadius * this.scale * Math.sin(this.angle - this.longNode) * Math.sin(this.orbitalAngle); // Pos en Y
        const z = this.orbitRadius * this.scale * Math.sin(this.angle); // Pos en Z

        console.log(x)
    
        planet.meshObj.position.set(planet.posX + x, planet.posY + y, planet.posZ + z);
    }

}