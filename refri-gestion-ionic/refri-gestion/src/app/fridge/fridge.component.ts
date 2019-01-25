import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/Product.model';
import { Measure } from '../models/Measure.model';
import { DatabaseService } from './../services/database.service';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})
export class FridgeComponent implements OnInit {

  search_item: string = "";
  food: Product;
  food1: Product;
  food2: Product;
  foodList: Product[];

  date: Date;
  date1: Date;
  date2: Date;
  measure: Measure;
  measure1: Measure;
  measure2: Measure;

  unsavedProd: Product[];
  deletedProd: Product[];

  belloff: string;
  bellon: string;

  sorts = ['Default', 'AlphaB', 'Quantity', 'Date'];

  constructor(private dbService : DatabaseService) {
    this.unsavedProd = [];
    this.deletedProd = [];
    this.belloff = "assets/img/belloff.png";
    this.bellon = "assets/img/bellon.png";

  }

  ngOnInit() {
    this.foodList = this.dbService.getProductAll();
    console.log("Food List");
    console.log(this.foodList);
  }

  bellSwitch(prod:Product) {
    prod.notify = !prod.notify;
    this.addUnsaved(prod);
  }

  quantityChange(prod: Product){
    this.addUnsaved(prod);
  }

  addUnsaved(product:Product){
    let isThere = false;
    this.unsavedProd.forEach(prod => {
      if(product.id == prod.id){
        prod = product;
        isThere = true;
      }
    });
    if(!isThere) this.unsavedProd.push(product);
  }

  addDeleted(product:Product){
    this.deletedProd.push(product);
  }

  saveChanges(){
    this.unsavedProd.forEach(elem => {
      this.addShopList(elem);
      this.dbService.updateProduct(elem);
    });
    this.unsavedProd = [];

    this.deletedProd.forEach(elem => {
      this.dbService.removeProduct(elem.id);
    });
    this.unsavedProd = [];

    this.foodList = this.dbService.getProductAll();
  }

  sortChange(e){
    switch (e.target.value) {
      case "AlphaB":
        this.foodList.sort(function(a, b){
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
        })
      break;
      case "Quantity":
        this.foodList.sort(function(a, b){
          if((a.currentQuantity/a.measure.graduation) < (b.currentQuantity/a.measure.graduation)) { return -1; }
          if((a.currentQuantity/a.measure.graduation) > (b.currentQuantity/a.measure.graduation)) { return 1; }
          return 0;
        })

      break;
      case "Date":
        this.foodList.sort(function(a, b){
          if(a.expiryDate < b.expiryDate) { return -1; }
          if(a.expiryDate > b.expiryDate) { return 1; }
          return 0;
        })

      break;

      default:
        console.log("Default Sort");
        this.foodList.sort(function(a, b){
          if(a.id < b.id) { return -1; }
          if(a.id > b.id) { return 1; }
          return 0;
        })
      break;
    }

  }

  addShopList(product:Product){
    if(product.currentQuantity <= product.alertQuantity && product.notify){
      // check is the product is already in the shopping list
      let promise = this.dbService.getShopping(product.name);
      promise.then(productDb => {
        if(productDb == null){
          this.dbService.addShopping(product);
        }
      })
    }
  }

}
