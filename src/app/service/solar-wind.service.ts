import { Injectable } from '@angular/core';
import { SpaceShip } from '../class/ship';

@Injectable({
  providedIn: 'root'
})
export class SolarWindService {

  constructor() { }

  getShipAccel(shipId:SpaceShip) {
    // TODO : Get ship data from backend
    let distance = Math.sqrt((shipId.positionX*1000)**2 + (shipId.positionY*1000)**2)
    let sunAngle = 0

    console.log(shipId)

    if (shipId.positionX < 1 && shipId.positionX > -1) {
      sunAngle = Math.PI
    } else {
      sunAngle = Math.atan(shipId.positionY/shipId.positionX)
    }

    let totalAngle = shipId.sailAngle - sunAngle
    let force = this.getWindPressure(distance) * shipId.sailArea * Math.cos(totalAngle)

    let accel = {
      "ax": Math.cos(shipId.sailAngle) * force / (shipId.mass * 1000),
      "ay": Math.sin(shipId.sailAngle) * force / (shipId.mass * 1000),
      "az": 0
    }

    if (shipId.positionX < 0) {
      accel["ax"] *= -1
      accel["ay"] *= -1
    }

    return accel
  }

  private getWindPressure(distance:number) {
    return 2.037e17 / (distance**2)
  }
}
