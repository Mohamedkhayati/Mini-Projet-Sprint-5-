import { Nutritional } from './nutritional.model';

export interface NutritionalWrapper {
  _embedded: {
    nutritionals: Nutritional[];
  };
}