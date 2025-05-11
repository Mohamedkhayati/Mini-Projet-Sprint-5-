import { Pipe, PipeTransform } from '@angular/core';
import { Supplement } from './model/supplement.model';

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {
  transform(supplements: Supplement[], searchText: string): Supplement[] {
    if (!supplements) return [];
    if (!searchText) return supplements;
    
    searchText = searchText.toLowerCase();
    
    return supplements.filter(supp => {
      return supp.nomSupplement.toLowerCase().includes(searchText) ||
             supp.marqueSupplement.toLowerCase().includes(searchText) ||
             (supp.nutritional && supp.nutritional.nomNutri.toLowerCase().includes(searchText)) ||
             supp.dosageSupplement.toLowerCase().includes(searchText);
    });
  }
}