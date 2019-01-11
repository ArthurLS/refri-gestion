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
      fridgeStore.createIndex("product", "product", { unique: false });
      fridgeStore.createIndex("InitialQuantity", "InitialQuantity", {unique: false});
      fridgeStore.createIndex("CurrentQuantity", "CurrentQuantity", {unique: false});
      fridgeStore.createIndex("AlertQuantity", "AlertQuantity", {unique: false});
      fridgeStore.createIndex("ExpiryDate", "ExpiryDate", {unique: false});

      let measureStore = evt.currentTarget.result.createObjectStore('measure', { keyPath: "id", autoIncrement: true });
      measureStore.createIndex("name", "name", {unique : true});
      measureStore.createIndex("amount", "amount", {unique: false});


    })
    console.log(this.db);
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

  addProduct(addName: string, addQuantity: number, addAlert: number, addDate: string){
    var that = this;
    this.db.openDatabase(1).then(function() {
      that.db.add('fridge', { product: addName, InitialQuantity: addQuantity, CurrentQuantity: addQuantity,
      AlertQuantity: addAlert, ExpiryDate: addDate }).then(() => {
          console.log("added succes");
        }), (error) => {
          console.log("added error");
        }
    })
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
    this.db.openDatabase(1).then(function() {
      that.db.getAll('user').then((user) => {
          console.log(user);
        }), (error) => {
          console.log("get error");
        }
    })
  }

  debug(){
    console.log("debug");
  }
}
