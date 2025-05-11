import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Nutritional } from '../model/nutritional.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-nutritional',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-nutritional.component.html',
  styles: ``
})
export class UpdateNutritionalComponent implements OnInit {
  @Input() nutritional: Nutritional = { idNutri: 0, nomNutri: '' };
  @Input() ajout: boolean = true;
  @Output() nutritionalUpdated = new EventEmitter<Nutritional>();

  constructor() {}

  ngOnInit(): void {
    console.log('UpdateNutritional ngOnInit:', this.nutritional);
  }

  saveNutritional() {
    this.nutritionalUpdated.emit({ ...this.nutritional }); // Emit a copy
  }
}