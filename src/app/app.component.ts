import { Component } from '@angular/core';

import { PlanetComponent } from './components/planet/planet.component';
import { SpaceComponent } from './components/space/space.component';
import { StarsComponent } from './components/stars/stars.component';
import { OrbitComponent } from './components/orbit/orbit.component';
import { CircularAnimationComponent } from './components/circularAnimation/circularAnimation.component';

@Component({
    selector: 'app-root',
    imports: [SpaceComponent, PlanetComponent, StarsComponent, OrbitComponent, CircularAnimationComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'HighwindFrontend';
    public textureSun = "../../assets/textures/sun.jpg";
    public textureEarth = "../../assets/textures/earth.jpg";
    public textureMercury = "../../assets/textures/mercury.jpg";
    public textureVenus = "../../assets/textures/venus.jpg";
    public textureMars = "../../assets/textures/mars.jpg";
    public textureJupiter = "../../assets/textures/jupiter.jpg";
    public textureSaturn = "../../assets/textures/saturn.jpg";
    public textureUranus = "../../assets/textures/uranus.jpg";
    public textureNeptune = "../../assets/textures/neptune.jpg";
}
