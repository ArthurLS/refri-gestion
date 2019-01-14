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
  measures: Measure[] = [];

  productName: string;
  productQuantity: number;
  productMeasure: number;

  constructor() { }

  ngOnInit() {
    var measure = {id: 1, name: 'qte', graduation: 1};
    var measure2 = {id: 4, name: 'L', graduation: 1};
    var measure3 = {id: 3, name: 'g', graduation: 5};
    this.measures.push(measure);
    this.measures.push(measure2);
    this.measures.push(measure3);

    this.shopList.push({id: 6, name:'Lait', initialQuantity:6, currentQuantity:4, alertQuantity:2,
      expiryDate: new Date(), measure: measure2, notify: true});

    this.shopList.push({id: 7, name:'Oeuf', initialQuantity:12, currentQuantity:2, alertQuantity:2,
      expiryDate: new Date(), measure: measure, notify: true});

    this.shopList.push({id: 8, name:'Beurre', initialQuantity:500, currentQuantity:200, alertQuantity:50,
      expiryDate: new Date(), measure: measure3, notify: false});

  }


  emptyList(){
    var that = this;
    this.shopList.forEach(function(product){
      that.removeFromList(product.id);
    });
  }

  addToList(){
    if(this.productName!=null && this.productName!=""
      && this.productQuantity!=null
      && this.productMeasure!= null){

      let m = this.measures.filter(measure => measure.id == this.productMeasure)[0];

      let p = {id: 10, name:this.productName,initialQuantity: this.productQuantity, currentQuantity: this.productQuantity,
      alertQuantity: this.productQuantity/10, expiryDate: null, measure: m, notify: false};

      this.shopList.push(p);
      this.productName = "";
      this.productQuantity = null;
    }
    else{
      alert("Remplir tous les champs correctement pour ajouter un produit")
    }
  }

  removeFromList(id: number){
      console.log("id",id);
  }

  confirmChanges(){

  }

}
