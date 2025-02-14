import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { PlanetComponent } from './components/planet/planet.component';
import { SpaceComponent } from './components/space/space.component';
import { StarsComponent } from './components/stars/stars.component';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MenuComponent } from './components/Menu/menu/menu.component';
import { OrbitComponent } from './components/orbit/orbit.component';
import { CircularAnimationComponent } from './components/circularAnimation/circularAnimation.component';
import { PlanetService } from './service/planet.service';
import { Planet } from './class/planet';
import { SolarWindService } from './service/solar-wind.service';
import { FormsModule } from '@angular/forms';
import { SpaceShipComponent } from './components/spaceShip/spaceShip.component';
import { SolarWindMapComponent } from './components/solarWindMap/solarWindMap.component';
import { SpaceShip } from './class/ship';

@Component({
    selector: 'app-root',
    imports: [FormsModule,SpaceComponent, PlanetComponent, StarsComponent, OrbitComponent, CircularAnimationComponent, MatGridList, MatGridTile, MenuComponent, SpaceShipComponent, SolarWindMapComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    public title = 'HighwindFrontend';
    @ViewChild(SpaceComponent) private spaceComponent!: SpaceComponent;

      public speed = 1;
      public displaySolarMap:boolean = false;
      public resetTemps:boolean = false;
      public dateSimu = new Date();
      public formSimulation: any;

    public readonly scale = 1e-8;
    public solarAccel: {ax: number, ay: number, az: number} = {ax: 0, ay: 0, az: 0};


    public planets: Planet[] = [
        {
            img: "../../assets/textures/sun.jpg",
            name: "Sun",
            command:"sun",
            mass: 1.9884e30,
            radius: 7e5,
            posX: 0,
            posY: 0,
            posZ: 0,
            orbit: {
                rayon: 0,
                inclination: 0,
                longNode: 0,
                revSpeed: 0
            }
        },
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

    public tempShip: SpaceShip = {
        "mass": 1e6,
        "positionX": -149.6e6,
        "positionY": 1500,
        "positionZ": 12000,
        "vX": 0,
        "vY": -18.33,
        "vZ": 0,
        "sailArea": 81,
        "sailAngle": Math.PI,
        "sailDeployed": false
    }

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

        this.init()
    }

    async init() {
        await this.planetService.getPlanetsLocations(this.planets)
    }

    public onSpeedChange(newSpeed: number) {
        this.speed = newSpeed;
    }

    public resetDateEvent(ev: boolean) {
        location.reload()
    }

    public displayVSEvent(ev: boolean) {
        this.displaySolarMap = ev;
    }

    public formEvent(data: any) {
        this.formSimulation = { ...data };
    }

}