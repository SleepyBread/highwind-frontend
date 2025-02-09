import { Component, Input } from '@angular/core';
import { PlanetAnimation } from '../../core/models/animation.model';
import { PlanetComponent } from '../planet/planet.component';

@Component({
  selector: 'app-circular-animation',
  imports: [],
  templateUrl: './circularAnimation.component.html',
  styleUrl: './circularAnimation.component.css'
})
export class CircularAnimationComponent implements PlanetAnimation {

    @Input() public orbitRadius: number = 5;
    @Input() public orbitSpeed: number = 0.001;
    @Input() public orbitalAngle: number = 0.001;
    @Input() public dephasage: number = 0.001;      //TODO!!!!!!

    private angle: number = 0;

    public animate(planet: PlanetComponent): void {
        this.angle += this.orbitSpeed;

        const x = this.orbitRadius * Math.cos(this.angle); // Pos en X
        const y = this.orbitRadius * Math.sin(this.angle) * Math.sin(this.orbitalAngle); // Pos en Y
        const z = this.orbitRadius * Math.sin(this.angle); // Pos en Z
    
        planet.meshObj.position.set(planet.posX + x, planet.posY + y, planet.posZ + z);
    }

}