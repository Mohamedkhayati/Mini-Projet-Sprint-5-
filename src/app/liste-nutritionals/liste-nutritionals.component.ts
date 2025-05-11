import { Component, OnInit } from '@angular/core';
import { Nutritional } from '../model/nutritional.model';
import { SupplementService } from '../services/supplement.service';
import { CommonModule } from '@angular/common';
import { UpdateNutritionalComponent } from '../update-nutritional/update-nutritional.component';

@Component({
  selector: 'app-liste-nutritionals',
  standalone: true,
  imports: [CommonModule, UpdateNutritionalComponent],
  templateUrl: './liste-nutritionals.component.html',
  styles: ``
})
export class ListeNutritionalsComponent implements OnInit {
  nutritionals: Nutritional[] = [];
  updatedNut: Nutritional = { idNutri: 0, nomNutri: '' };
  ajout: boolean = true;

  constructor(private supplementService: SupplementService) {}

  ngOnInit(): void {
    this.chargerNutritionals();
  }

  chargerNutritionals() {
    this.supplementService.listeNutritionals().subscribe({
      next: (data) => {
        this.nutritionals = data._embedded?.nutritionals || data;
        console.log('Nutritionals loaded:', this.nutritionals);
      },
      error: (err) => {
        console.error('Error loading nutritionals:', err);
      }
    });
  }

  nutritionalUpdated(nut: Nutritional) {
    console.log('Nutritional updated event:', nut);
    if (this.ajout) {
      this.supplementService.addNutritional(nut).subscribe({
        next: () => {
          this.chargerNutritionals();
          this.resetForm();
        },
        error: (err) => console.error('Error adding nutritional:', err)
      });
    } else {
      this.supplementService.updateNutritional(nut).subscribe({
        next: () => {
          this.chargerNutritionals();
          this.resetForm();
        },
        error: (err) => console.error('Error updating nutritional:', err)
      });
    }
  }

  updateNut(nut: Nutritional) {
    this.updatedNut = { ...nut }; // Create a copy to avoid mutating the original
    this.ajout = false;
  }

  resetForm() {
    this.updatedNut = { idNutri: 0, nomNutri: '' };
    this.ajout = true;
  }
}