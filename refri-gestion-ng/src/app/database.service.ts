import { Injectable } from '@angular/core';
import {AngularIndexedDB} from 'angular2-indexeddb';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  db : AngularIndexedDB;

  constructor() {
    this.db =  new AngularIndexedDB('myDatabase', 1);

   }
}
