import { Object3D } from "three";

export interface SpaceObject {
    get mesh() : Object3D[];
}