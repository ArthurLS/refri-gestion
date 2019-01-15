import { DatabaseService } from './../services/database.service';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/Product.model';
import { Measure } from '../models/Measure.model';
import { DbWrapper } from 'angular2-indexeddb/angular2-indexeddb';

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
    this.belloff = "../../assets/img/belloff.png";
    this.bellon = "../../assets/img/bellon.png";
    // this.measure = {id: 5, name: 'qte', graduation: 1};
    // this.measure1 = {id: 2, name: 'L', graduation: 0.1};
    // this.measure2 = {id: 1, name: 'g', graduation: 10};

    // this.date = new Date('01/15/2018');
    // this.date1 = new Date('02/15/2018');
    // this.date2 = new Date('03/15/2018');

    // this.food = {id: 0, name: 'Oeuf', initialQuantity: 6, currentQuantity: 4, alertQuantity: 2,
    //  expiryDate: this.date, measure: this.measure, notify: true};
    // this.food1 = {id: 1, name: 'Lait', initialQuantity: 6, currentQuantity: 0.3, alertQuantity: 2,
    //   expiryDate: this.date1, measure: this.measure1, notify: true};
    // this.food2 = {id: 2, name: 'Beurre', initialQuantity: 6, currentQuantity: 200, alertQuantity: 2,
    //  expiryDate: this.date2, measure: this.measure2, notify: false};


    //this.foodList = [this.food, this.food1, this.food2];
  }

  ngOnInit() {
    this.foodList = this.dbService.getProductAll();

    console.log(this.foodList);
    //console.log(this.foodList[0].name);
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
        console.log("AlphaB");
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
        console.log("Default");
        this.foodList.sort(function(a, b){
          if(a.id < b.id) { return -1; }
          if(a.id > b.id) { return 1; }
          return 0;
        })
      break;
    }

  }


}
