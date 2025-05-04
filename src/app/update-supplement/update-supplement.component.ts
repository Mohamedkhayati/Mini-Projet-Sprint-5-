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
  nutritionals!: Nutritional[];
  updatedNutId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private supplementService: SupplementService
  ) {}

  ngOnInit(): void {
    this.nutritionals = this.supplementService.listeNutritionals();
    this.currentSupplement = this.supplementService.consulterSupplement(
      this.activatedRoute.snapshot.params['id']
    );
    this.updatedNutId = this.currentSupplement.nutritional.idNut;
  }

  // TrackBy function for *ngFor
  trackByNutritional(index: number, nut: Nutritional): number {
    return nut.idNut;
  }

  updateSupplement() {
    // Update the nutritional object in currentSupplement based on updatedNutId
    const selectedNutritional = this.supplementService.consulterNutritional(this.updatedNutId);
    this.currentSupplement.nutritional = selectedNutritional;

    // Update the supplement
    this.supplementService.updateSupplement(this.currentSupplement);
    this.router.navigate(['supplements']);
  }
}