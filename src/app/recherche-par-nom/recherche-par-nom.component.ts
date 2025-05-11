import { Component, OnInit } from '@angular/core';
import { Supplement } from '../model/supplement.model';
import { SupplementService } from '../services/supplement.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: []
})
export class RechercheParNomComponent implements OnInit {
  supplements: Supplement[] = [];
  allSupplements: Supplement[] = [];
  nomSupplement: string = '';

  constructor(private supplementService: SupplementService) {}

  ngOnInit(): void {
    this.supplementService.listeSupplements().subscribe({
      next: (supps) => {
        this.supplements = supps;
        this.allSupplements = supps;
      },
      error: (err) => console.error('Error fetching supplements:', err)
    });
  }

  rechercherSupps(): void {
    if (this.nomSupplement.trim()) {
      this.supplementService.rechercherParNom(this.nomSupplement).subscribe({
        next: (supps) => {
          this.supplements = supps;
        },
        error: (err) => {
          console.error('Error searching supplements:', err);
          this.supplements = [];
        }
      });
    } else {
      this.supplements = [...this.allSupplements];
    }
  }

  onKeyUp(searchTerm: string): void {
    if (searchTerm.trim()) {
      this.supplements = this.allSupplements.filter(
        (item) =>
          item.nomSupplement.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.marqueSupplement.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.supplements = [...this.allSupplements];
    }
  }
}