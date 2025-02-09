import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-menu',
    imports: [FormsModule, MatFormFieldModule, MatFormField, MatIconModule, MatInputModule, MatButtonModule, MatDatepickerModule],
    templateUrl: './menu.component.html',
    providers: [provideNativeDateAdapter()],
    styleUrl: './menu.component.css'
})
export class MenuComponent {

    @Input() public vitesse: number = 0.00;
    @Input() public dateSimulatire: Date = new Date();
    @Output() public vitesseChange = new EventEmitter<number>();
    @Output() public resetDate = new EventEmitter<boolean>();
    @Output() public displayVS = new EventEmitter<boolean>();

    private displayVSMemory: boolean = false;

    public onVitesseChange(newVitesse: number) {
        this.vitesseChange.emit(newVitesse);
    }

    public onReset() {
        this.resetDate.emit(true);
    }

    public onDisplayVS() {
        this.displayVSMemory = !this.displayVSMemory;
        this.displayVS.emit(this.displayVSMemory);
    }
}