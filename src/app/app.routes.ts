import { Routes } from '@angular/router';
import { SupplementsComponent } from './supplements/supplements.component';
import { AddSupplementComponent } from './add-supplement/add-supplement.component';
import { UpdateSupplementComponent } from './update-supplement/update-supplement.component';
import { RechercheParNutritionalComponent } from './recherche-par-nutritional/recherche-par-nutritional.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeNutritionalsComponent } from './liste-nutritionals/liste-nutritionals.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { supplementGuard } from './supplement.guard';

export const routes: Routes = [
  { path: "supplements", component: SupplementsComponent },
  {path: "add-supplement", component : AddSupplementComponent, canActivate:[supplementGuard]},
  {path: "", redirectTo: "supplements", pathMatch: "full"},
  {path: "updateSupplement/:id", component: UpdateSupplementComponent},
  { path: "rechercheParNutritional", component: RechercheParNutritionalComponent },
  { path: "rechercheParNom", component: RechercheParNomComponent },
  { path: "listeNutritionals", component: ListeNutritionalsComponent },
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent}




];
