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
      fridgeStore.createIndex("InitialQuantity", "InitialQuantity", { unique: false });
      fridgeStore.createIndex("CurrentQuantity", "CurrentQuantity", { unique: false });
      fridgeStore.createIndex("AlertQuantity", "AlertQuantity", { unique: false });
      fridgeStore.createIndex("ExpiryDate", "ExpiryDate", { unique: false });

      let measureStore = evt.currentTarget.result.createObjectStore('measure', { keyPath: "id", autoIncrement: true });
      measureStore.createIndex("name", "name", { unique: true });
      measureStore.createIndex("amount", "amount", { unique: false });

      let shoppingStore = evt.currentTarget.result.createObjectStore('shoppingList', { keyPath: "id", autoIncrement: true });
      fridgeStore.createIndex("product", "product", { unique: true });
      fridgeStore.createIndex("InitialQuantity", "InitialQuantity", { unique: false });
      fridgeStore.createIndex("CurrentQuantity", "CurrentQuantity", { unique: false });
      fridgeStore.createIndex("AlertQuantity", "AlertQuantity", { unique: false });
      fridgeStore.createIndex("ExpiryDate", "ExpiryDate", { unique: false });

    })
    // console.log(this.db);
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
        AlertQuantity: product.alertQuantity, ExpiryDate: product.expiryDate
      }).then(() => {
        console.log("added succes");
      }), (error) => {
        console.log("added error");
      }
    })
  }


  getProduct(name: string): Product {
    console.log("getting");
    let result: Product;
    var that = this;
    this.db.openDatabase(1).then(function () {
      that.db.getByIndex('fridge', 'product', name).then((prod) => {
        result = prod;
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
        console.log("fin prod all");
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
