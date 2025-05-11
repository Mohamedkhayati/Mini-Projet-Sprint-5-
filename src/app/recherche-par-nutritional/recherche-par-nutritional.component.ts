import { Component, OnInit } from '@angular/core';
import { Supplement } from '../model/supplement.model';
import { Nutritional } from '../model/nutritional.model';
import { SupplementService } from '../services/supplement.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recherche-par-nutritional',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-par-nutritional.component.html',
  styles: ``
})
export class RechercheParNutritionalComponent implements OnInit {

  supplements!: Supplement[];
  idNutritional!: number;
  nutritionals!: Nutritional[];

  constructor(private supplementService: SupplementService) {}
  ngOnInit(): void {
    this.supplementService.listeNutritionals().subscribe({
      next: (response) => {
        this.nutritionals = response._embedded.nutritionals;
        console.log('Nutritionals loaded:', this.nutritionals);
      },
      error: (err) => {
        console.error('Error loading nutritionals:', err);
      }
    });
  }

  onChange() {
    if (this.idNutritional) {
      this.supplementService.rechercherParNutritional(this.idNutritional).subscribe({
        next: (supplements) => {
          this.supplements = supplements;
          console.log('Filtered supplements:', supplements);
        },
        error: (err) => {
          console.error('Error filtering supplements:', err);
        }
      });
    }
  }
}