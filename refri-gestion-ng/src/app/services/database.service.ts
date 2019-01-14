import { Observable, of } from 'rxjs';
import { Product } from '../models/Product.model';
import { Injectable } from '@angular/core';
import { AngularIndexedDB } from 'angular2-indexeddb';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  private db = new AngularIndexedDB('Database', 1);


  constructor() {
    this.db.openDatabase(1, (evt) => {
      let userStore = evt.currentTarget.result.createObjectStore('user', { keyPath: "id", autoIncrement: true });
      userStore.createIndex("name", "name", { unique: false });
      userStore.createIndex("email", "email", { unique: true });
      userStore.createIndex("password", "password", { unique: false });
      userStore.createIndex("settings", "settings", { unique: false });

      let fridgeStore = evt.currentTarget.result.createObjectStore('fridge', { keyPath: "id", autoIncrement: true });
      fridgeStore.createIndex("product", "product", { unique: true });
      fridgeStore.createIndex("InitialQuantity", "InitialQuantity", {unique: false});
      fridgeStore.createIndex("CurrentQuantity", "CurrentQuantity", {unique: false});
      fridgeStore.createIndex("AlertQuantity", "AlertQuantity", {unique: false});
      fridgeStore.createIndex("ExpiryDate", "ExpiryDate", {unique: false});

      let measureStore = evt.currentTarget.result.createObjectStore('measure', { keyPath: "id", autoIncrement: true });
      measureStore.createIndex("name", "name", {unique : true});
      measureStore.createIndex("amount", "amount", {unique: false});


    })
    // console.log(this.db);
  }

  addMeasure(addName: string, addAmount: number){
    var that = this;
    this.db.openDatabase(1).then(function() {
      that.db.add('fridge', { name: addName, amount: addAmount}).then(() => {
          console.log("added succes");
        }), (error) => {
          console.log("added error");
        }
    })
  }

  addProduct(product : Product){
    var that = this;
      this.db.openDatabase(1).then(function() {
        that.db.add('fridge', { product: product.name, InitialQuantity: product.initialQuantity, CurrentQuantity: product.currentQuantity,
        AlertQuantity: product.alertQuantity, ExpiryDate: product.expiryDate }).then(() => {
            console.log("added succes");
          }), (error) => {
            console.log("added error");
          }
      })
  }

  getProduct(name: string):Observable<Product>{
    console.log("getting");
    let result: Product;
    var that = this;
    this.db.openDatabase(1).then(function() {
      that.db.getByIndex('fridge', 'product', name).then((prod) => {
        console.log(prod);
      }, (error) => {console.log("error get product"); console.log(name);});
    })
    return of(result);
  }


  addUser(addName: string, addEmail: string, addPassword: string) {
    var that = this;
    this.db.openDatabase(1).then(function() {
      that.db.add('user', { name: addName, email: addEmail, password: addPassword }).then(() => {
          console.log("added succes");
        }), (error) => {
          console.log("added error");
        }
    })
  }

  getUserAll() {
    var that = this;
    return this.db.openDatabase(1).then(function() {
      that.db.getAll('user').then((user) => {
          console.log(user);
        }), (error) => {
          console.log("get error");
        }
    })
  }

  /**
   * return all products from database
   */
  getProductAll(){
    var that = this;
    let products: Array<string> = [];
    this.db.openDatabase(1).then(function() {
      that.db.getAll('fridge').then((fridge) => {
          console.log("fin prod all");
          products.push(...fridge);
        }), (error) => {
          console.log("get error");
        }
    });

    return products;
  }

  removeProduct(index: number){
var that = this;

  }

  debug(){
    console.log("debug");
  }
}
