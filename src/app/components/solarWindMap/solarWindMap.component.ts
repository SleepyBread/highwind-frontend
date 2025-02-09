import { Component, Input } from '@angular/core';
import { BufferGeometry, Color, Float32BufferAttribute, Object3D, Object3DEventMap, Points, PointsMaterial } from 'three';
import { SpaceObject } from '../../core/models/spaceObject.model';

@Component({
  selector: 'app-solar-wind-map',
  imports: [],
  templateUrl: './solarWindMap.component.html',
  styleUrl: './solarWindMap.component.css'
})
export class SolarWindMapComponent implements SpaceObject {
    @Input() quantity: number = 5000;
    @Input() spacing: number = 0.1;
    public meshObj!: Points;

    constructor(){
        const rows = 1000;
        const columns = 1000;

        const positions: number[] = [];
        const colors: number[] = []; // Tableau pour les couleurs des points

        const maxDistance = Math.sqrt(Math.pow(rows * this.spacing / 2, 2) + Math.pow(columns * this.spacing / 2, 2)); // La distance maximale du centre (coin du carré)

        //Merci ChatGPT
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                // Calculer la position (x, y, z) de chaque point
                const x = i * this.spacing - (rows * this.spacing) / 2;  // Centrer sur 0,0
                const y = j * this.spacing - (columns * this.spacing) / 2;  // Centrer sur 0,0
                const z = 0;

                // Ajouter la position du point dans le tableau
                positions.push(x, y, z);

                // Calculer la distance du centre (0,0,0)
                const distance = Math.sqrt(x * x + y * y);

                // Mapper cette distance à une couleur, ici vers le rouge
                const intensity = Math.min(1, distance / maxDistance);  // La distance est limitée entre 0 et 1

                // Couleur basée sur l'intensité (plus l'intensité est élevée, plus la couleur se rapproche du rouge)
                const color = new Color();
                color.setHSL(0, 1, 1 - intensity);  // 0 pour le rouge, intensité pour foncer la couleur

                // Ajouter la couleur correspondante à ce point
                colors.push(color.r, color.g, color.b);
            }
        }

        const geometry = new BufferGeometry();
        geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));  // Ajouter les couleurs aux géométries

        const material = new PointsMaterial({ size: 0.1, vertexColors: true });  // Utiliser vertexColors pour appliquer les couleurs
        this.meshObj = new Points(geometry, material);
        this.meshObj.rotateX(Math.PI/2); //On le couche! God ça me tente aussi, yé 3h30 du matin on est décalisse

    }
    
    get mesh(): Object3D<Object3DEventMap>[] {
        if(!this.meshObj) return [];
        return [this.meshObj];
    }
}
