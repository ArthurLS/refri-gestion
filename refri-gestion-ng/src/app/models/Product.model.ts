import { Measure } from './Measure.model';

export class Product {
  constructor(
    public id: number,
    public name:string,
    public initialQuantity: number,
    public currentQuantity: number,
    public alertQuantity: number,
    public expiryDate: Date,
    public measure: Measure
  ) {}
}
