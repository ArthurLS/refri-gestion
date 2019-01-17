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

  deletedProducts: Product[];
  newProducts : Product[];
  changedProducts : Product[];

  constructor(private dbService : DatabaseService) { }

  ngOnInit() {
    this.deletedProducts = [];
    this.newProducts = [];
    this.changedProducts = [];

    this.shopList = this.dbService.getShoppingAll();
    console.log("shopList",this.shopList);

    this.measures = this.dbService.getMeasureAll();
    console.log("measures",this.measures);
  }

  fieldChecker(){
    if(this.productName!=null
      && this.productQuantity!=null
      && this.productMeasure!= null){

      let m = this.measures.filter(measure => measure.id == this.productMeasure)[0];
      console.log(m);

      let p = {id: this.newProducts.length, name: this.productName, initialQuantity: this.productQuantity, currentQuantity: this.productQuantity,
      alertQuantity: this.productQuantity/10, expiryDate: null, measure: m, notify: false};

      this.addNewProduct(p);
      this.productName = null;
      this.productQuantity = null;
    }
    else{
      alert("Remplir tous les champs correctement pour ajouter un produit")
    }
  }

  addNewProduct(product:Product){
    this.shopList.push(product);
    this.newProducts.push(product);
    console.log(this.shopList);
  }

  quantityChange(product: Product){
    let isThere = false;
    this.changedProducts.forEach(prod => {
      if(product.name == prod.name){
        prod = product;
        isThere = true;
      }
    });
    // It's not in changedProducts
    if(!isThere) {
      // Checks if the change wasn't made to a newly created product
      // Otherwise, it create 2 products (one with udpdate, one with newProduct)
      isThere = false;
      this.newProducts.forEach(prod => {
        if(product.name == prod.name){
          prod = product;
          isThere = true;
        }
      })
      // Not in changed, and not in new
      if(!isThere) {
        this.changedProducts.push(product);
      }
    }
  }

  addDeleted(product:Product){
    this.deletedProducts.push(product);
  }

  emptyList(){
    var that = this;
    this.shopList.forEach(function(product){
      that.addDeleted(product);
    });
  }

  confirmChanges(){

    this.deletedProducts.forEach(prod => {
      // Prevents from deleting a non existant product in the db
      if(!this.newProducts.includes(prod))
        this.dbService.removeShopping(prod.id);
      else {
        let idOfProd = this.newProducts.indexOf(prod, 0);
        this.newProducts.splice(idOfProd, 1);
      }
    });
    this.deletedProducts = [];

    this.newProducts.forEach(prod => {
      this.dbService.addShopping(prod);
    });
    this.newProducts = [];

    this.changedProducts.forEach(prod => {
      this.dbService.updateShopping(prod);
    });
    this.changedProducts = [];


    this.shopList = this.dbService.getShoppingAll();
    console.log(this.shopList);
  }
}
