import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Supplement } from '../model/supplement.model';
import { SupplementService } from '../services/supplement.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-supplements',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './supplements.component.html',
})
export class SupplementsComponent implements OnInit {
  supplements: Supplement[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private supplementService: SupplementService,
    public authService: AuthService) {}

  ngOnInit(): void {
    this.chargerSupplements();
  }

  chargerSupplements() {
    this.loading = true;
    this.errorMessage = '';
    this.supplementService.listeSupplements().subscribe({
      next: (prods) => {
        console.log(prods);
        this.supplements = prods;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des suppléments : ' + err.message;
        this.loading = false;
      }
    });
  }

  supprimerSupplement(s: Supplement) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.supplementService.supprimerSupplement(s.idSupplement).subscribe({
        next: () => {
          console.log("Supplément supprimé");
          this.chargerSupplements();
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la suppression du supplément : ' + err.message;
        }
      });
    }
  }
}