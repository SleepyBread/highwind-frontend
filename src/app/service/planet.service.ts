import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private http:HttpClient) { }

  getPlanetsLocations() {
    let earth = this.http.get('/planet-api', 
      {params:{
        'EPHEM_TYPE': 'VECTORS',
        'CENTER': '@sun',
        'START_TIME': '2025-02-08T18:00',
        'STOP_TIME': '2025-02-08T18:01',
        'COMMAND': '399'
      },
      observe: 'response'}).subscribe(result => {
        console.log(result)
      })
  }

  private decodeData(response:String) {

  }
}
