import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { Measure } from '../models/Measure.model';
import { DatabaseService } from './../services/database.service';

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

  unsaved: Product[] = [];
  newProducts : Product[] = [];

  constructor(private dbService : DatabaseService) { }

  ngOnInit() {

    this.shopList = this.dbService.getShoppingAll();
    console.log("shopList",this.shopList);

    this.measures = this.dbService.getMeasureAll();
    console.log("measures",this.measures);
  }


  emptyList(){
    var that = this;
    this.shopList.forEach(function(product){
      that.removeFromList(product);
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
      this.addNewProducts(p);
      this.productName = "";
      this.productQuantity = null;
    }
    else{
      alert("Remplir tous les champs correctement pour ajouter un produit")
    }
  }

  removeFromList(product: Product){
      console.log("p",product);
      this.addUnsaved(product);
  }

  addUnsaved(product:Product){
    let isThere = false;
    this.unsaved.forEach(prod => {
      if(product.id == prod.id){
        prod = product;
        isThere = true;
      }

    });
    if(!isThere) this.unsaved.push(product);
    console.log("this.unsaved",this.unsaved);
    console.log("this.product",this.shopList);
  }

  addNewProducts(product:Product){
    let isThere = false;
    this.newProducts.forEach(prod => {
      if(product.id == prod.id){
        prod = product;
        isThere = true;
      }

    });
    if(!isThere) this.newProducts.push(product);
  }

  confirmChanges(){

    this.newProducts = [];
    this.unsaved = [];
  }

  quantityChange(product: Product){
    this.addNewProducts(product);
  }
}
