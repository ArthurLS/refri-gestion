import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product.model';
import { Measure } from '../models/Measure.model';
import { DatabaseService } from '../services/database.service';
import { AuthentificationService } from '../services/authentification.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
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
  errorLog: string = null;
  successLog: string = null;

  constructor(private authenService: AuthentificationService, private dbService : DatabaseService) { }

  ngOnInit() {
    this.initMeasures();
    this.belloff = "assets/img/belloff.png";
    this.bellon = "assets/img/bellon.png";

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
        this.productDate = null;
        this._success.next("Produit ajouté au frigo !");
      }
      else{
        this.errorLog="Remplir tous les champs pour ajouter un produit";
      }
  }

}
