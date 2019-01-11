import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/Product.model';
import { Measure } from '../models/Measure.model';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css']
})
export class FridgeComponent implements OnInit {

  @Input() search_item: string;
  food: Product;
  food1: Product;
  food2: Product;
  foodList: Product[];

  date: Date;
  measure: Measure;
  measure1: Measure;
  measure2: Measure;

  belloff: string;

  sorts = ['AlphaB', 'Quantité', 'Date'];

  constructor() {
    this.belloff = "../../assets/img/belloff.png";
    this.measure = {id: 5, name: 'qte', graduation: 1};
    this.measure1 = {id: 2, name: 'L', graduation: 0.1};
    this.measure2 = {id: 1, name: 'g', graduation: 10};

    this.date = new Date('01/15/2018');

    this.food = {id: 5, name: 'Oeuf', initialQuantity: 6, currentQuantity: 4, alertQuantity: 2,
     expiryDate: this.date, measure: this.measure};
    this.food1 = {id: 2, name: 'Lait', initialQuantity: 6, currentQuantity: 0.3, alertQuantity: 2,
      expiryDate: this.date, measure: this.measure1};
    this.food2 = {id: 1, name: 'Beurre', initialQuantity: 6, currentQuantity: 200, alertQuantity: 2,
     expiryDate: this.date, measure: this.measure2};

    this.foodList = [this.food, this.food1, this.food2];
  }

  ngOnInit() {
  }

}
