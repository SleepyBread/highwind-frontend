import { Component, QueryList, ViewChildren } from '@angular/core';

import { PlanetComponent } from './components/planet/planet.component';
import { SpaceComponent } from './components/space/space.component';
import { StarsComponent } from './components/stars/stars.component';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MenuComponent} from './components/Menu/menu/menu.component';
import { OrbitComponent } from './components/orbit/orbit.component';
import { CircularAnimationComponent } from './components/circularAnimation/circularAnimation.component';
import { PlanetService } from './service/planet.service';
import { Planet } from './class/planet';
import { SolarWindService } from './service/solar-wind.service';
import { SpaceShipComponent } from './components/spaceShip/spaceShip.component';

@Component({
    selector: 'app-root',
    imports: [SpaceComponent, PlanetComponent, StarsComponent, OrbitComponent, CircularAnimationComponent, MatGridList, MatGridTile, MenuComponent, SpaceShipComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    public title = 'HighwindFrontend';

    public planets: Planet[] = [
        {
            img: "../../assets/textures/mercury.jpg",
            name: "Mercury",
            command:"199",
            mass: 3.302e23,
            radius: 2439.7,
            posX: 0,
            posY: 0,
            posZ: 0,
            orbit: {
                rayon: 57.9e6,
                inclination: 0.12235,
                longNode: 0.84369,
                revSpeed: 8.267e-7
            }
        },
        {
            img: "../../assets/textures/venus.jpg",
            name: "Venus",
            command:"299",
            mass: 48.685e23,
            radius: 6051.8,
            posX: 0,
            posY: 0,
            posZ: 0,
            orbit: {
                rayon: 108.2e6,
                inclination: 0.05917,
                longNode: 1.33819,
                revSpeed: 3.236e-7
            }
        },
        {
            img: "../../assets/textures/earth.jpg",
            name: "Earth",
            command:"399",
            mass: 5.97219e24,
            radius: 6371.0,
            posX: 0,
            posY: 0,
            posZ: 0,
            orbit: {
                rayon: 149.6e6,
                inclination: 0.0,
                longNode: -0.08923,
                revSpeed: 1.991e-7
            }
        },
        {
            img: "../../assets/textures/mars.jpg",
            name: "Mars",
            command:"499",
            mass: 6.4171e23,
            radius: 3389.5,
            posX: 0,
            posY: 0,
            posZ: 0,
            orbit: {
                rayon: 228.0e6,
                inclination: 0.03229,
                longNode: 49.7132,
                revSpeed: 1.059e-7
            }
        },
        {
            img: "../../assets/textures/jupiter.jpg",
            name: "Jupiter",
            command:"599",
            mass: 18.9819e26,
            radius: 69911,
            posX: 0,
            posY: 0,
            posZ: 0,
            orbit: {
                rayon: 779.3e6,
                inclination: 0.02286,
                longNode: 0.86766,
                revSpeed: 1.679e-8
            }
        },
        {
            img: "../../assets/textures/saturn.jpg",
            name: "Saturn",
            command:"699",
            mass: 5.6834e26,
            radius: 58232,
            posX: 0,
            posY: 0,
            posZ: 0,
            orbit: {
                rayon: 1427e6,
                inclination: 0.04346,
                longNode: 1.98339,
                revSpeed: 6.758e-9
            }
        },
        {
            img: "../../assets/textures/uranus.jpg",
            name: "Uranus",
            command:"799",
            mass: 86.813e24,
            radius: 25362,
            posX: 0,
            posY: 0,
            posZ: 0,
            orbit: {
                rayon: 2871e6,
                inclination: 0.01344,
                longNode: 1.29089,
                revSpeed: 2.37e-9
            }
        },
        {
            img: "../../assets/textures/neptune.jpg",
            name: "Neptune",
            command:"899",
            mass: 102.409e24,
            radius: 24622,
            posX: 0,
            posY: 0,
            posZ: 0,
            orbit: {
                rayon: 4497e6,
                inclination: 0.03089,
                longNode: 0.84369,
                revSpeed: 1.18e-9
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

    private planetService: PlanetService

    constructor(service: PlanetService, solarService: SolarWindService) {
        this.planetService = service

        this.init();
    }

    async init() {
        console.log(await this.planetService.getPlanetsLocations(this.planets))
    }
}
