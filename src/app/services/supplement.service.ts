import { Injectable } from '@angular/core';
import { Supplement } from '../model/supplement.model';
import { Nutritional } from '../model/nutritional.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};


@Injectable({
  providedIn: 'root'
})
export class SupplementService {
  apiURL: string = 'http://localhost:8090/supplements/api';
  supplements: Supplement[];
  nutritionals:Nutritional[];  // List of supplements
  supplement!: Supplement;    // Single supplement object

  constructor( private http : HttpClient) {
    this.nutritionals=[
      { idNut: 1, nomNut: "Mass Gainer" },
      { idNut: 2, nomNut: "Whey Protein" },
      { idNut: 3, nomNut: "Vitamins" },
      { idNut: 4, nomNut: "BCAA" },
      { idNut: 5, nomNut: "Creatine" }
    ];

    
    this.supplements = [
      { idSupplement: 1, nomSupplement: "Protéine", prixSupplement: 200, dosageSupplement: 30, quantity: 10, dateCreation: new Date("2023-01-01") ,nutritional:{idNut:2,nomNut:"Whey"}},
      { idSupplement: 2, nomSupplement: "Créatine", prixSupplement: 150, dosageSupplement: 10, quantity: 20, dateCreation: new Date("2023-02-01"),nutritional:{idNut:2,nomNut:"Whey"} },
      { idSupplement: 3, nomSupplement: "BCAA", prixSupplement: 120, dosageSupplement: 20, quantity: 15, dateCreation: new Date("2023-03-01"),nutritional:{idNut:2,nomNut:"Whey"} },
      { idSupplement: 4, nomSupplement: "Glutamine", prixSupplement: 100, dosageSupplement: 5, quantity: 25, dateCreation: new Date("2023-04-01"),nutritional:{idNut:2,nomNut:"Whey"} },
      { idSupplement: 5, nomSupplement: "Acides Aminés", prixSupplement: 80, dosageSupplement: 15, quantity: 30, dateCreation: new Date("2023-05-01"),nutritional:{idNut:2,nomNut:"Whey"} }
    ];
    
  }

  // Get list of supplements
  listeSupplements(): Supplement[] {
    return this.supplements;
  }

  // Add a new supplement
  ajouterSupplement(supp: Supplement) {
    this.supplements.push(supp);
  }

  // Remove a supplement
  supprimerSupplement(supp: Supplement) {
    const index = this.supplements.indexOf(supp, 0);
    if (index > -1) {
      this.supplements.splice(index, 1);
    }
  }

  // Get supplement by ID
  consulterSupplement(id: number): Supplement {
    this.supplement = this.supplements.find(s => s.idSupplement == id)!;
    return this.supplement;
  }

  // Update a supplement in the list
  updateSupplement(supp: Supplement) {
    // Find the supplement by ID and replace it in the list
    const index = this.supplements.indexOf(supp, 0);
    if (index > -1) {
      this.supplements.splice(index, 1);  // Remove the old supplement
      this.supplements.splice(index, 0, supp);  // Insert the updated supplement
    }
  }
  listeNutritionals():Nutritional[] {
    return this.nutritionals;
    }
    consulterNutritional(id:number): Nutritional{
      return this.nutritionals.find(cat => cat.idNut == id)!;
      }
}
