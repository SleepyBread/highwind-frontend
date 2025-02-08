import { Component } from '@angular/core';
import { PlanetComponent } from './components/planet/planet.component';
import { SpaceComponent } from './components/space/space.component';

@Component({
  selector: 'app-root',
  imports: [SpaceComponent, PlanetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TJ';
}
