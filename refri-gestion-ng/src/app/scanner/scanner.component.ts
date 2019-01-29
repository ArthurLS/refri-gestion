import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { Measure } from '../models/Measure.model';
import { DatabaseService } from '../services/database.service';
import { AuthentificationService } from '../services/authentification.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { OpenFoodService } from '../services/open-food.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  _success = new Subject<string>();
  measures: Measure[] = [];
  notify: boolean;
  belloff: string;
  bellon: string;
  productName: string;
  productQuantity: number;
  productMeasure: Measure;
  productDate: string;
  barCode: string;
  errorLog: string = null;
  successLog: string = null;

  constructor(
    private authenService: AuthentificationService,
    private dbService : DatabaseService,
    private openFoodService : OpenFoodService
    ) { }

  ngOnInit() {
    this.initMeasures();
    this.belloff = "assets/img/belloff.png";
    this.bellon = "assets/img/bellon.png";
    this.productDate = this.getTodayDate();
    console.log('productDate', this.productDate);

    // set the default parameter of notify
    this.authenService.currentUser.subscribe(user => {
      this.notify = user.notifyByDefault;
    })

    this._success.subscribe((message) => this.successLog = message);
    this._success.pipe(
      debounceTime(2000)
    ).subscribe(() => this.successLog = null);
  }

  initMeasures(){
    this.productMeasure = new Measure(0,"",1);
    this.dbService.initMeasures();
    this.measures = this.dbService.getMeasureAll();
  }

  changeBell(){
    this.notify = !this.notify;
  }

  addProductToFridge(){
    if(this.productName!=null && this.productName!=""
      && this.productQuantity!=null && this.productQuantity > 0
      && this.productMeasure!= null && this.productMeasure.name!==""
      && this.productDate!=null){

        let p = {id:-1, name:this.productName, initialQuantity: this.productQuantity, currentQuantity: this.productQuantity,
        alertQuantity: this.productQuantity*0.15, expiryDate: new Date(this.productDate), measure: this.productMeasure, notify: this.notify};

        this.dbService.addProduct(p);
        console.log("get",this.dbService.getProductAll())

        this.errorLog=null;
        this.productName = "";
        this.productQuantity = null;
        this.productDate = this.getTodayDate();
        this._success.next("Produit ajouté au frigo !");
      }
      else{
        this.errorLog="Remplir tous les champs pour ajouter un produit";
      }
  }

  scanBarCode(){
    if(this.barCode && this.barCode.length > 7 && !isNaN(parseInt(this.barCode,10))){
      this.openFoodService.getProduct(this.barCode).then(product =>{
        this.productName = product.name;
        this.productQuantity = product.initialQuantity;
        this.productMeasure = product.measure;
      });
    }
  }

  getTodayDate(): string{
    let date = new Date();
    let month = (date.getMonth() + 1).toString();
    if(date.getMonth()<10){
      month = "0" + month
    }
    let day = date.getDate().toString();
    if(date.getDate()<10){
      day = "0" + day;
    }
    return date.getFullYear().toString()+'-' + month +'-' + day
  }
}
