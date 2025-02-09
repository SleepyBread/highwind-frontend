import { Mesh, Points } from "three";

export interface SpaceObject {
    get mesh() : Mesh | Points;
    animate(): void;
}