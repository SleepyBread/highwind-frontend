import { Component, Input,Output, EventEmitter } from '@angular/core';
import { PlanetAnimation } from '../../core/models/animation.model';
import { PlanetComponent } from '../planet/planet.component';
import { Planet } from '../../class/planet';
import { Clock } from 'three';

@Component({
  selector: 'app-circular-animation',
  templateUrl: './circularAnimation.component.html',
  styleUrl: './circularAnimation.component.css'
})
export class CircularAnimationComponent implements PlanetAnimation {

    private readonly scale = 1e-8;
    @Input() public speedMultiplier = 1e5;
    @Input() public dateSimu = new Date();
    @Input() public orbitRadius: number = 5;
    @Input() public orbitSpeed: number = 0.001;
    @Input() public orbitalAngle: number = 0.001;
    @Input() public longNode: number = 0.001;
    @Input() public initX: number = 0;
    @Input() public initY: number = 0;

    private angle: number = 0;

    private clock = new Clock();

    private timeElapsed: number = 0;

    public animate(planet: PlanetComponent): void {
    //   console.log(this.speedMultiplier);
        let delta = this.clock.getDelta();
        this.angle -= this.orbitSpeed * delta * this.speedMultiplier;
        let deltaAngle = this.getDeltaAngle();
        this.timeElapsed += delta * this.speedMultiplier * 1000;

        this.dateSimu.setTime(Date.now() + this.timeElapsed - this.clock.elapsedTime);
        // console.log(this.dateSimu);

        // Bonne chance :)
        planet.posX = this.orbitRadius * Math.cos(this.angle + deltaAngle); // Pos en X
        planet.posY = this.orbitRadius * Math.sin(this.angle + deltaAngle - this.longNode) * Math.sin(this.orbitalAngle); // Pos en Y
        planet.posZ = this.orbitRadius * Math.sin(this.angle + deltaAngle); // Pos en Z
    
        planet.meshObj.position.set(planet.posX * this.scale, planet.posY * this.scale, planet.posZ * this.scale);
    }

    public getDeltaAngle():number {
      let angle = 0;

      if (this.initX < -1 || this.initX > 1) {
          angle = Math.atan(this.initY / this.initX);
      }

      if (this.initX < 0) {
          angle += Math.PI;
      }

      return angle
    }
}
