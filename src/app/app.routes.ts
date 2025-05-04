import { Routes } from '@angular/router';
import { SupplementsComponent } from './supplements/supplements.component';
import { AddSupplementComponent } from './add-supplement/add-supplement.component';
import { UpdateSupplementComponent } from './update-supplement/update-supplement.component';

export const routes: Routes = [
  { path: "supplements", component: SupplementsComponent },
  {path: "add-supplement", component : AddSupplementComponent},
  {path: "", redirectTo: "supplements", pathMatch: "full"},
  {path: "updateSupplement/:id", component: UpdateSupplementComponent}



];
