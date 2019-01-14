import { Measure } from './../models/Measure.model';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Product } from '../models/Product.model';
import { User } from '../models/User.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  date: Date;
  measure: Measure;
  food: Product;
  user: User;

  constructor(private dbService : DatabaseService) {
    this.measure = {id: 5, name: 'qte', graduation: 1};

    this.date = new Date('01/15/2018');

    this.food = {id: 5, name: 'oeuf', initialQuantity: 6, currentQuantity: 4, alertQuantity: 2,
     expiryDate: this.date, measure: this.measure, notify: false};

     this.user = {id: 1, email: "test@", name:"me", password:"mepas",notif_by_default:false }
   }

  ngOnInit() {
    // this.dbService.addProduct(this.food);
    // this.dbService.addUser(this.user);
    // this.dbService.getProductAll().subscribe(fridge => console.log(fridge));
    // this.dbService.getProduct('Oeuf').subscribe);
    // console.log(this.dbService.getProduct('pomme'));
    console.log(this.dbService.getUserAll());
      // console.log(this.dbService.getProductAll());

    // this.dbService.getProductAll().then(function(value) {console.log(value);});
  }

}
