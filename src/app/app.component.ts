import { Component } from '@angular/core';

import { PlanetComponent } from './components/planet/planet.component';
import { SpaceComponent } from './components/space/space.component';
import { circularAnimation } from './core/animations/circular.animation';
import { StarsComponent } from './components/stars/stars.component';
import { PlanetService } from './service/planet.service';

@Component({
    selector: 'app-root',
    imports: [SpaceComponent, PlanetComponent, StarsComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'HighwindFrontend';
    public animation = [circularAnimation];
    public textureSun = "../../assets/textures/sun.jpg";
    public textureEarth = "../../assets/textures/earth.jpg";
    public textureMercury = "../../assets/textures/mercury.jpg";
    public textureVenus = "../../assets/textures/venus.jpg";
    public textureMars = "../../assets/textures/mars.jpg";
    public textureJupiter = "../../assets/textures/jupiter.jpg";
    public textureSaturn = "../../assets/textures/saturn.jpg";
    public textureUranus = "../../assets/textures/uranus.jpg";
    public textureNeptune = "../../assets/textures/neptune.jpg";

    constructor(service: PlanetService) {
      service.getPlanetsLocations()
    }
}
