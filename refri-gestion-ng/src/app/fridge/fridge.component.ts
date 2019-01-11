import { Component, OnInit } from '@angular/core';

export interface Food {
  product: string;
  date: string;
  qte: number;
  alert: boolean;
}

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css']
})
export class FridgeComponent implements OnInit {

  search_item: string;
  food: Food;
  foodList: Food[];

  sorts = ['AlphaB', 'Quantité', 'Date'];

  constructor() {
    this.food = {product: 'oeuf', date: '12/12/12', qte: 5, alert: true};
    this.foodList = [this.food];
  }

  ngOnInit() {
  }

}
