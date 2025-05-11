import { Injectable } from '@angular/core';
import { Supplement } from '../model/supplement.model';
import { Nutritional } from '../model/nutritional.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NutritionalWrapper } from '../model/Nutritional-Wrapped';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SupplementService {
  apiURL: string = 'http://localhost:8090/supplements/api';
  apiURLNut: string = 'http://localhost:8090/supplements/api/nut';

  constructor(private http: HttpClient, private authService: AuthService) {}

  listeSupplements(): Observable<Supplement[]> {
    return this.http.get<Supplement[]>(`${this.apiURL}/all`, httpOptions);
  }

  ajouterSupplement(supp: Supplement): Observable<Supplement> {
    return this.http.post<Supplement>(`${this.apiURL}/addsupp`, supp, httpOptions);
  }

  supprimerSupplement(id: number) {
    const url = `${this.apiURL}/delsupp/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterSupplement(id: number): Observable<Supplement> {
    const url = `${this.apiURL}/getbyid/${id}`;
    return this.http.get<Supplement>(url, httpOptions);
  }

  updateSupplement(supp: Supplement): Observable<Supplement> {
    return this.http.put<Supplement>(`${this.apiURL}/updatesupp`, supp, httpOptions);
  }

  listeNutritionals(): Observable<NutritionalWrapper> {
    return this.http.get<NutritionalWrapper>(this.apiURLNut, httpOptions);
  }

  consulterNutritional(id: number): Observable<Nutritional> {
    const url = `${this.apiURLNut}/${id}`;
    return this.http.get<Nutritional>(url, httpOptions);
  }

  rechercherParNutritional(idNut: number): Observable<Supplement[]> {
    const url = `${this.apiURL}/suppsnutri/${idNut}`;
    return this.http.get<Supplement[]>(url, httpOptions);
  }

  rechercherParNom(nom: string): Observable<Supplement[]> {
    const url = `${this.apiURL}/supplementsByName/${nom}`;
    return this.http.get<Supplement[]>(url, httpOptions);
  }

  addNutritional(nut: Nutritional): Observable<Nutritional> {
    return this.http.post<Nutritional>(this.apiURLNut, nut, httpOptions);
  }

  updateNutritional(nut: Nutritional): Observable<Nutritional> {
    const url = `${this.apiURLNut}/${nut.idNutri}`;
    return this.http.put<Nutritional>(url, nut, httpOptions);
  }
}