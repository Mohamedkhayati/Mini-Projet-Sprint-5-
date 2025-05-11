import { Nutritional } from './nutritional.model';

export class Supplement {
  idSupplement!: number;
  nomSupplement!: string;
  dosageSupplement!: string;
  prixSupplement!: number;
  marqueSupplement!: string;
  dateCreation!: Date;
  nutritional!: Nutritional;
}