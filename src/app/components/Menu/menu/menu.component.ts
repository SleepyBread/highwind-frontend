import { Component } from '@angular/core';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-menu',
  imports: [MatFormFieldModule, MatFormField, MatIconModule, MatInputModule, MatButtonModule, MatDatepickerModule],
  templateUrl: './menu.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
