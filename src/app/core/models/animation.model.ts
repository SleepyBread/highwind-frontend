import { PlanetComponent } from "../../components/planet/planet.component";

export interface PlanetAnimation {
    animate(planet: PlanetComponent) : void;
}