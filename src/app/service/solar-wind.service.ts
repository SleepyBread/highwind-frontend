import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolarWindService {

  constructor() { }

  private readonly tempShip = {
    "mass": 1e4,
    "positionX": -1.496e11,
    "positionY": 1.496e11,
    "sailArea": 200,
    "sailAngle": Math.PI*3/4,
    "sailDeployed": false
  } 

  getShipAccel(shipId:String) {
    // TODO : Get ship data from backend
    let distance = Math.sqrt(this.tempShip.positionX**2 + this.tempShip.positionY**2)
    let sunAngle = 0

    if (this.tempShip.positionX < 1 && this.tempShip.positionX > -1) {
      sunAngle = Math.PI
    } else {
      sunAngle = Math.atan(this.tempShip.positionY/this.tempShip.positionX)
    }

    let totalAngle = this.tempShip.sailAngle - sunAngle
    let force = this.getWindPressure(distance) * this.tempShip.sailArea * Math.cos(totalAngle)

    let accel = {
      "ax": Math.cos(this.tempShip.sailAngle) * force / this.tempShip.mass,
      "ay": Math.sin(this.tempShip.sailAngle) * force / this.tempShip.mass
    }

    if (this.tempShip.positionX < 0) {
      accel["ax"] *= -1
      accel["ay"] *= -1
    }

    return accel
  }

  private getWindPressure(distance:number) {
    return 2.037e17 / (distance * distance)
  }
}
