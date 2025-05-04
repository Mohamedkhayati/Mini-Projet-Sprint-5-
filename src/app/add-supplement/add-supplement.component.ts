import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
  msg: string = '';
  nutritional: Nutritional[] = [];
  newIdNut: number | null = null;
  newNutritional!: Nutritional;

  constructor(
    private supplementService: SupplementService,
    private router: Router
  ) {}

  ngOnInit() {
    this.nutritional = this.supplementService.listeNutritionals();
  }

  trackByNut(index: number, nut: Nutritional): number {
    return nut.idNut;
  }

  addSupplement() {
    if (this.newIdNut !== null) {
      this.newNutritional = this.supplementService.consulterNutritional(this.newIdNut);
      this.newSupplement.nutritional = this.newNutritional;
      this.supplementService.ajouterSupplement(this.newSupplement);
      this.msg = 'Supplément ajouté avec succès !';
      this.router.navigate(['supplements']);
    } 
  }
}