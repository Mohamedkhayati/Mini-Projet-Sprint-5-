import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Supplement } from '../model/supplement.model';
import { SupplementService } from '../services/supplement.service';
import { Nutritional } from '../model/nutritional.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-supplement',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-supplement.component.html'
})
export class AddSupplementComponent implements OnInit {
  newSupplement = new Supplement();
  nutritionals: Nutritional[] = [];
  newIdNut: number | null = null;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private supplementService: SupplementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadNutritionals();
  }

  loadNutritionals() {
    this.loading = true;
    this.errorMessage = '';
    this.supplementService.listeNutritionals().subscribe({
      next: (cats) => {
        console.log(cats);
        this.nutritionals = cats._embedded.nutritionals;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des catégories : ' + err.message;
        this.loading = false;
      }
    });
  }

  trackByNut(index: number, nut: Nutritional): number {
    return nut.idNutri;
  }

  addSupplement() {
    if (this.newIdNut === null) {
      this.errorMessage = 'Veuillez sélectionner une catégorie.';
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    const selectedNut = this.nutritionals.find(nut => nut.idNutri === this.newIdNut);
    if (!selectedNut) {
      this.errorMessage = 'Catégorie sélectionnée non valide.';
      this.loading = false;
      return;
    }
    this.newSupplement.nutritional = selectedNut;
    this.supplementService.ajouterSupplement(this.newSupplement).subscribe({
      next: () => {
        this.successMessage = 'Supplément ajouté avec succès !';
        this.loading = false;
        this.router.navigate(['supplements']);
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de l\'ajout du supplément : ' + err.message;
        this.loading = false;
      }
    });
  }
}