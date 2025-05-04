import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Supplement } from '../model/supplement.model';
import { SupplementService } from '../services/supplement.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-supplements',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './supplements.component.html',
})
export class SupplementsComponent {
  supplements : Supplement[];
  
  constructor(private supplementService: SupplementService) {
    this.supplements = supplementService.listeSupplements();
  }
supprimerSupplement(s: Supplement) {
  // console.log(s);
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
    this.supplementService.supprimerSupplement(s);
}

  
  
  
  


}
