import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Planet } from '../class/planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private http:HttpClient) { }

  async getPlanetsLocations(planets: Planet[]) {
    for (let p in planets) {
      let data = await firstValueFrom(this.http.get('/planet-api', 
        {params:{
          'EPHEM_TYPE': 'VECTORS',
          'CENTER': '@sun',
          'START_TIME': new Date(Date.now()).toISOString(),
          'STOP_TIME': new Date(Date.now() + 1000).toISOString(),
          'COMMAND': planets[p].command,
          'format': 'text'
        },
        responseType: 'text',
        observe: 'response'}))

      if (data.body) {
        let decodedData = this.decodeData(data.body);
        planets[p].posX = decodedData["posX"]
        planets[p].posY = decodedData["posY"]
        planets[p].posZ = decodedData["posZ"]
      }
    }

    console.log(planets)
  }

  private decodeData(text:String) {
    let data: { [key: string]: any } = {};

    data["posX"] = +(text.substring(text.indexOf("X =") + 3, text.indexOf("X =") + 25).replaceAll('+', ''));
    data["posY"] = +(text.substring(text.indexOf("Y =") + 3, text.indexOf("Y =") + 25).replaceAll('+', ''));
    data["posZ"] = +(text.substring(text.indexOf("Z =") + 3, text.indexOf("Z =") + 25).replaceAll('+', ''));

    return data;
  }
}
