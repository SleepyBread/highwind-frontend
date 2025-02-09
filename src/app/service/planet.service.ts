import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private readonly planets_data: {[key: string]: any} = {
    "Mercury": {
      "command":"199",
      "mass": 3.302e23,
      "inclination": 0.12235,
      "long_node": 0.84369,
      "radius": 2439.7
    },
    "Venus": {
      "command":"299",
      "mass": 48.685e23,
      "inclination": 0.05917,
      "long_node": 1.33819,
      "radius": 6051.8
    },
    "Earth": {
      "command":"399",
      "mass": 5.97219e24,
      "inclination": 0.0,
      "long_node": -0.08923,
      "radius": 6371.0
    },
    "Mars": {
      "command":"499",
      "mass": 6.4171e23,
      "inclination": 0.03229,
      "long_node": 49.7132,
      "radius": 3389.5
    },
    "Jupiter": {
      "command":"599",
      "mass": 18.9819e26,
      "inclination": 0.02286,
      "long_node": 0.86766,
      "radius": 69911
    },
    "Saturn": {
      "command":"699",
      "mass": 5.6834e26,
      "inclination": 0.04346,
      "long_node": 1.98339,
      "radius": 58232
    },
    "Uranus": {
      "command":"799",
      "mass": 86.813e24,
      "inclination": 0.01344,
      "long_node": 1.29089,
      "radius": 25362
    },
    "Neptune": {
      "command":"899",
      "mass": 102.409e24,
      "inclination": 0.03089,
      "long_node": 0.84369,
      "radius": 24622
    },
  }
  constructor(private http:HttpClient) { }

  async getPlanetsLocations() {
    let planets: { [key: string]: any } = {};

    for (let p in this.planets_data) {
      let data = await firstValueFrom(this.http.get('/planet-api', 
        {params:{
          'EPHEM_TYPE': 'VECTORS',
          'CENTER': '@sun',
          'START_TIME': new Date(Date.now()).toISOString(),
          'STOP_TIME': new Date(Date.now() + 1000).toISOString(),
          'COMMAND': '199',
          'format': 'text'
        },
        responseType: 'text',
        observe: 'response'}))

      if (data.body) {
        planets[p] = this.decodeData(data.body);
        for (let i in this.planets_data[p]) {
          planets[p][i] = this.planets_data[p][i]
        }
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
