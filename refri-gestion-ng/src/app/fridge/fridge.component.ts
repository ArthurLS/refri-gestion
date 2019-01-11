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
  foodList: Product[];

  date: Date;
  measure: Measure;

  belloff: string;

  sorts = ['AlphaB', 'Quantité', 'Date'];

  constructor() {
    this.belloff = "../../assets/img/belloff.png"
    this.measure = {id: 5, name: 'qte', graduation: 1};

    this.date = new Date('01/15/2018');

    this.food = {id: 5, name: 'Oeuf', initialQuantity: 6, currentQuantity: 4, alertQuantity: 2,
     expiryDate: this.date, measure: this.measure};

    this.foodList = [this.food, this.food, this.food];
  }

  ngOnInit() {
  }

}
