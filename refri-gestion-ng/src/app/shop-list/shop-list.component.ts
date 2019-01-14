import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { Measure } from '../models/Measure.model';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {

  shopList: Product[] = [];

  constructor() { }

  ngOnInit() {
    var measure = {id: 5, name: 'qte', graduation: 1};
    var measure2 = {id: 4, name: 'L', graduation: 1};

    this.shopList.push({id: 6, name:'Lait', initialQuantity:6, currentQuantity:4, alertQuantity:2,
      expiryDate: new Date(), measure: measure2, notify: true});

    this.shopList.push({id: 7, name:'Oeuf', initialQuantity:12, currentQuantity:2, alertQuantity:2,
      expiryDate: new Date(), measure: measure, notify: true})

  }

}
