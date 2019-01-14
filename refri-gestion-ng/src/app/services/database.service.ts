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


  private db = new AngularIndexedDB('myData', 1);

  constructor() {


    this.db.openDatabase(1, (evt) => {

      let userStore = evt.currentTarget.result.createObjectStore('user', { keyPath: "id", autoIncrement: true });
      userStore.createIndex("Name", "Name", { unique: false });
      userStore.createIndex("Email", "Email", { unique: true });
      userStore.createIndex("Password", "Password", { unique: false });
      userStore.createIndex("Settings", "Settings", { unique: false });

      let fridgeStore = evt.currentTarget.result.createObjectStore('fridge', { keyPath: "id", autoIncrement: true });
      fridgeStore.createIndex("Name", "Name", { unique: false });
      fridgeStore.createIndex("InitialQuantity", "InitialQuantity", { unique: false });
      fridgeStore.createIndex("CurrentQuantity", "CurrentQuantity", { unique: false });
      fridgeStore.createIndex("AlertQuantity", "AlertQuantity", { unique: false });
      fridgeStore.createIndex("ExpiryDate", "ExpiryDate", { unique: false });
      fridgeStore.createIndex("Measure", "Measure", {unique: false})
      fridgeStore.createIndex("Notify", "Notify", {unique: false});

      let measureStore = evt.currentTarget.result.createObjectStore('measure', { keyPath: "id", autoIncrement: true });
      measureStore.createIndex("Name", "Name", { unique: false });
      measureStore.createIndex("Amount", "Amount", { unique: false });

      let shoppingStore = evt.currentTarget.result.createObjectStore('shoppingList', { keyPath: "id", autoIncrement: true });
      shoppingStore.createIndex("Name", "Name", { unique: false });
      shoppingStore.createIndex("InitialQuantity", "InitialQuantity", { unique: false });
      shoppingStore.createIndex("CurrentQuantity", "CurrentQuantity", { unique: false });
      shoppingStore.createIndex("AlertQuantity", "AlertQuantity", { unique: false });
      shoppingStore.createIndex("ExpiryDate", "ExpiryDate", { unique: false });
      fridgeStore.createIndex("Measure", "Measure", {unique: false});
      shoppingStore.createIndex("Notify", "Notify", {unique: false});
    })
  }

  /**
   * adds a measure to database, return promise
   */
  addMeasure(measure: Measure) {
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
  getMeasureAll(): Array<Measure> {
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

  removeMeasure(index: number) {
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
        product: product.name, InitialQuantity: product.initialQuantity, CurrentQuantity: product.currentQuantity,
        AlertQuantity: product.alertQuantity, Measure:product.measure, ExpiryDate: product.expiryDate,
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
      that.db.getByIndex('fridge', 'product', name).then((prod) => {
        result.push(...prod);
        // console.log( prod);
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
      that.db.add('user', { name: user.name, email: user.email, password: user.email }).then(() => {
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
  getUserAll(): Array<User> {
    var that = this;
    let users: Array<User> = [];
    this.db.openDatabase(1).then(function () {
      that.db.getAll('user').then((user) => {
        users.push(user);
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
        product: product.name, InitialQuantity: product.initialQuantity, CurrentQuantity: product.currentQuantity,
        AlertQuantity: product.alertQuantity, ExpiryDate: product.expiryDate
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
