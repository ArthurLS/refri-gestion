import { User } from './../models/User.model';
import { Measure } from './../models/Measure.model';
import { Observable, of } from 'rxjs';
import { Product } from '../models/Product.model';
import { Injectable } from '@angular/core';
import { AngularIndexedDB } from 'angular2-indexeddb';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  private db = new AngularIndexedDB('myDB', 1);

  constructor() {


    this.db.openDatabase(1, (evt) => {

      let userStore = evt.currentTarget.result.createObjectStore('user', { keyPath: "id", autoIncrement: true });
      userStore.createIndex("name", "name", { unique: false });
      userStore.createIndex("email", "email", { unique: true });
      userStore.createIndex("password", "password", { unique: false });
      userStore.createIndex("settings", "settings", { unique: false });

      let fridgeStore = evt.currentTarget.result.createObjectStore('fridge', { keyPath: "id", autoIncrement: true });
      fridgeStore.createIndex("name", "name", { unique: false });
      fridgeStore.createIndex("initialQuantity", "initialQuantity", { unique: false });
      fridgeStore.createIndex("currentQuantity", "currentQuantity", { unique: false });
      fridgeStore.createIndex("alertQuantity", "alertQuantity", { unique: false });
      fridgeStore.createIndex("expiryDate", "expiryDate", { unique: false });
      fridgeStore.createIndex("measure", "measure", {unique: false})
      fridgeStore.createIndex("notify", "notify", {unique: false});

      let measureStore = evt.currentTarget.result.createObjectStore('measure', { keyPath: "id", autoIncrement: true });
      measureStore.createIndex("name", "name", { unique: false });
      measureStore.createIndex("graduation", "graduation", { unique: false });

      let shoppingStore = evt.currentTarget.result.createObjectStore('shoppingList', { keyPath: "id", autoIncrement: true });
      shoppingStore.createIndex("name", "name", { unique: false });
      shoppingStore.createIndex("initialQuantity", "initialQuantity", { unique: false });
      shoppingStore.createIndex("currentQuantity", "currentQuantity", { unique: false });
      shoppingStore.createIndex("alertQuantity", "alertQuantity", { unique: false });
      shoppingStore.createIndex("expiryDate", "expiryDate", { unique: false });
      fridgeStore.createIndex("measure", "measure", {unique: false});
      shoppingStore.createIndex("notify", "notify", {unique: false});
    })
  }

  /**
   * adds a measure to database, return promise
   */
  addmeasure(measure: Measure) {
    var that = this;
    return this.db.openDatabase(1).then(function () {
      that.db.add('fridge', { name: measure.name, amount: measure.graduation }).then(() => {
        console.log("added succes");
      }), (error) => {
        console.log("added error");
      }
    })
  }

  /**
   * get all measures from database
   * @returns array of measure
   */
  getmeasureAll(): Array<Measure> {
    var that = this;
    let measures: Array<Measure> = [];
    this.db.openDatabase(1).then(function () {
      that.db.getAll('measure').then((measure) => {
        measures.push(...measure);
      }), (error) => {
        console.log("get error");
      }
    });
    return measures;
  }

  removemeasure(index: number) {
    var that = this;
    return this.db.openDatabase(1).then(function () {
      that.db.delete('measure', index)
    })
  }

  /**
   * adds a product to database, return promise
   * @param product the product to add
   */
  addProduct(product: Product) {
    var that = this;
    return this.db.openDatabase(1).then(function () {
      that.db.add('fridge', {
        name: product.name, initialQuantity: product.initialQuantity, currentQuantity: product.currentQuantity,
        alertQuantity: product.alertQuantity, measure:product.measure, expiryDate: product.expiryDate,
      }).then(() => {
        console.log("added succes");
      }), (error) => {
        console.log("added error");
      }
    })
  }


  getProduct(name: string): Array<Product> {
    console.log("getting");
    let result: Array<Product> = [];
    var that = this;
    this.db.openDatabase(1).then(function () {
      that.db.getByIndex('fridge', 'name', name).then((prod) => {
        result.push(...prod);
        console.log( prod);
      }, (error) => { console.log("error get product"); console.log(name); });
    })
    return result;
  }

  /**
   * return all products from database
   */
  getProductAll(): Array<Product> {

    var that = this;
    let products: Array<Product> = [];
    this.db.openDatabase(1).then(function () {
      that.db.getAll('fridge').then((fridge) => {
        products.push(...fridge);
      }), (error) => {
        console.log("get error");
      }
    });

    return products;
  }

  removeProduct(index: number) {
    var that = this;
    return this.db.openDatabase(1).then(function () {
      that.db.delete('fridge', index)
    })
  }
  /**
   * adds a user to database, return promise
   */
  addUser(user: User) {
    var that = this;
    return this.db.openDatabase(1).then(function () {
      that.db.add('user', { name: user.name, email: user.email, password: user.password }).then(() => {
        console.log("added succes");
      }), (error) => {
        console.log("added error");
      }
    })
  }

  /**
   * get all users from database
   * @returns array of user
   */
  getUserAll(): User[] {
    var that = this;
    let users: User[] = [];
    this.db.openDatabase(1).then(function () {
      that.db.getAll('user').then((user) => {
        users.push(...user);
      }), (error) => {
        console.log("get user error");
      }
    })
    return users;
  }

  removeUser(index: number) {
    var that = this;
    return this.db.openDatabase(1).then(function () {
      that.db.delete('user', index)
    })


  }
  addShopping(product: Product) {
    var that = this;
    return this.db.openDatabase(1).then(function () {
      that.db.add('shoppingList', {
        product: product.name, initialQuantity: product.initialQuantity, currentQuantity: product.currentQuantity,
        alertQuantity: product.alertQuantity, expiryDate: product.expiryDate
      }).then(() => {
        console.log("added succes");
      }), (error) => {
        console.log("added error");
      }
    })
  }
  getShoppingAll(): Array<Product> {
    var that = this;
    let products: Array<Product> = [];
    this.db.openDatabase(1).then(function () {
      that.db.getAll('shoppingList').then((fridge) => {
        console.log("fin prod all");
        products.push(...fridge);
      }), (error) => {
        console.log("get error");
      }
    });
    return products;
  }

  removeShopping(index: number) {
    var that = this;
    return this.db.openDatabase(1).then(function () {
      that.db.delete('shoppingList', index)
    })

}
}
