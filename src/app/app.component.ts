import { Component } from '@angular/core';

import { PlanetComponent } from './components/planet/planet.component';
import { SpaceComponent } from './components/space/space.component';
import { StarsComponent } from './components/stars/stars.component';
import { OrbitComponent } from './components/orbit/orbit.component';
import { CircularAnimationComponent } from './components/circularAnimation/circularAnimation.component';


export class Orbit {
    public rayon: number = 0;
    public inclinaison: number = 0;
}

export class Planet {
    public img: string = "../../assets/textures/earth.jpg";
    public size: number = 1;
    public orbit!: Orbit;
}


@Component({
    selector: 'app-root',
    imports: [SpaceComponent, PlanetComponent, StarsComponent, OrbitComponent, CircularAnimationComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    public title = 'HighwindFrontend';

    public planets: Planet[] = [
        {
            img: "../../assets/textures/mercury.jpg",
            size: 0.1,
            orbit: {
                rayon: 1.5,
                inclinaison: 0.122173
            }
        },
        {
            img: "../../assets/textures/venus.jpg",
            size: 0.2,
            orbit: {
                rayon: 2.5,
                inclinaison: 0.05916666
            }
        },
        {
            img: "../../assets/textures/earth.jpg",
            size: 0.4,
            orbit: {
                rayon: 3.5,
                inclinaison: 0
            }
        },
        {
            img: "../../assets/textures/mars.jpg",
            size: 0.2,
            orbit: {
                rayon: 4.5,
                inclinaison: 0.03228859
            }
        },
        {
            img: "../../assets/textures/jupiter.jpg",
            size: 0.6,
            orbit: {
                rayon: 7.5,
                inclinaison: 0.02275909
            }
        },
        {
            img: "../../assets/textures/saturn.jpg",
            size: 0.3,
            orbit: {
                rayon: 9,
                inclinaison: 0.04337143
            }
        },
        {
            img: "../../assets/textures/uranus.jpg",
            size: 0.2,
            orbit: {
                rayon: 11,
                inclinaison: 0.01347394
            }
        },
        {
            img: "../../assets/textures/neptune.jpg",
            size: 0.2,
            orbit: {
                rayon: 15,
                inclinaison: 0.03087487
            }
        },
    ]

    public textureSun = "../../assets/textures/sun.jpg";
    public textureEarth = "../../assets/textures/earth.jpg";
    public textureMercury = "../../assets/textures/mercury.jpg";
    public textureVenus = "../../assets/textures/venus.jpg";
    public textureMars = "../../assets/textures/mars.jpg";
    public textureJupiter = "../../assets/textures/jupiter.jpg";
    public textureSaturn = "../../assets/textures/saturn.jpg";
    public textureUranus = "../../assets/textures/uranus.jpg";
    public textureNeptune = "../../assets/textures/neptune.jpg";


    public inclinaisonOrbitRadercury = 0.122173;
    public inclinaisonOrbitRadVenus = 0.05916666;
    public inclinaisonOrbitRadEarth = 0;
    public inclinaisonOrbitRadMars = 0.03228859;

    public inclinaisonOrbitRadJupiter = 0.02275909;
    public inclinaisonOrbitRadSaturn = 0.04337143;
    public inclinaisonOrbitRadUranus = 0.01347394;
    public inclinaisonOrbitRadNeptune = 0.03087487;




}