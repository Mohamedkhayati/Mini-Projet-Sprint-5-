import { Component, OnInit } from '@angular/core';
import { Supplement } from '../model/supplement.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplementService } from '../services/supplement.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Nutritional } from '../model/nutritional.model';

@Component({
  selector: 'app-update-supplement',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-supplement.component.html',
  styles: ``
})
export class UpdateSupplementComponent implements OnInit {
  currentSupplement = new Supplement();
  nutritionals: Nutritional[] = [];
  updatedNutId: number | null = null;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private supplementService: SupplementService
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
        this.loadSupplement();
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des catégories : ' + err.message;
        this.loading = false;
      }
    });
  }

  loadSupplement() {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.supplementService.consulterSupplement(id).subscribe({
      next: (supp) => {
        this.currentSupplement = supp;
        this.updatedNutId = supp.nutritional?.idNutri || null;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement du supplément : ' + err.message;
        this.loading = false;
      }
    });
  }

  trackByNutritional(index: number, nut: Nutritional): number {
    return nut.idNutri;
  }

  updateSupplement() {
    if (this.updatedNutId === null) {
      this.errorMessage = 'Veuillez sélectionner une catégorie.';
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    const selectedNut = this.nutritionals.find(nut => nut.idNutri === this.updatedNutId);
    if (!selectedNut) {
      this.errorMessage = 'Catégorie sélectionnée non valide.';
      this.loading = false;
      return;
    }
    this.currentSupplement.nutritional = selectedNut;
    this.supplementService.updateSupplement(this.currentSupplement).subscribe({
      next: () => {
        this.router.navigate(['supplements']);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la mise à jour du supplément : ' + err.message;
        this.loading = false;
      }
    });
  }
}