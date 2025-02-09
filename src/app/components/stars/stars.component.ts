import { Component, Input, OnInit } from '@angular/core';
import { BufferGeometry, Float32BufferAttribute, MathUtils, Object3D, Points, PointsMaterial } from "three";
import { SpaceObject } from '../../core/models/spaceObject.model';

@Component({
  selector: 'app-stars',
  imports: [],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.css'
})
export class StarsComponent implements OnInit, SpaceObject {
    @Input() public quantity: number = 20000;
    
    private stars!: Points;
    private geometry!: BufferGeometry;
    private material!: PointsMaterial;
  
    constructor() {}
  
    public ngOnInit(): void {
        this.createStarField();
    }
  
    private createStarField() {
        this.geometry = new BufferGeometry();
        const positions: number[] = [];
        const sizes: number[] = [];
        const colors: number[] = [];
    
        for (let i = 0; i < this.quantity; i++) {
            positions.push(MathUtils.randFloatSpread(1000), MathUtils.randFloatSpread(1000), MathUtils.randFloatSpread(1000)); // X, Y et Z

            sizes.push(MathUtils.randFloat(0.5, 3)); // Taille de l'étoile (en pixels)

            colors.push(Math.random(), Math.random(), Math.random()); // Couleur aléatoire de l'étoile
        }

        //Pour cette section MERCI ChatGPT!!!
        // Ajouter les données de positions, tailles et couleurs aux attributs du BufferGeometry
        this.geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));   //Prend par bond de 3 (pour X, Y et Z)
        this.geometry.setAttribute('size', new Float32BufferAttribute(sizes, 1));           //Prend par bond de 1
        this.geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));         //Prend par bond de 3 (RGB)
    
        // Créer le matériel de particules (ici un point lumineux de couleur blanche)
        this.material = new PointsMaterial({
            size: 1,
            vertexColors: true, // Utilise les couleurs définies dans l'attribut 'color'
            transparent: true,
            opacity: 0.8,
            depthWrite: false
        });
    
        // Créer le système de particules (les étoiles)
        this.stars = new Points(this.geometry, this.material);
    }
  
    public get mesh(): Object3D[] {
        return [this.stars];
    }

    public animate(): void {}
}