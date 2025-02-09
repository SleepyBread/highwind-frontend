export class Orbit {
    public rayon: number = 0;
    public inclination: number = 0;
    public longNode: number = 0;
}

export class Planet {
    public name: string = "Earth"
    public img: string = "../../assets/textures/earth.jpg";
    public command: string = "199"
    public mass: number = 3.302e23
    public radius: number = 2439.7;
    public posX: number = 0;
    public posY: number = 0;
    public posZ: number = 0;
    public orbit!: Orbit;
}