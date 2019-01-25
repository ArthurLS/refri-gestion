import { Measure } from './../models/Measure.model';
import { Product } from './../models/Product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class OpenFoodService {

  constructor(
    private http: HttpClient,
    private database: DatabaseService) { }

  public async getProduct(barCode : string):Promise<Product>{

    let product = await(this.http.get("https://fr.openfoodfacts.org/api/v0/produit/"+barCode+".json").toPromise().then(async response => {
      var full = response["product"];
      let quantity;
      if(full['product_quantity']){
        quantity = full['product_quantity'];
      }else{
        quantity = full['quantity'];
      }
      let measure = await this.getMeasure(full['quantity']).then(measure =>{
        // console.log('measure promise', measure)
        return measure;
      }
      );
      // console.log('measure', measure);
      var prod : Product = {
          id : -1,
          name : full["product_name_fr"],
          initialQuantity : quantity,
          currentQuantity : quantity,
          measure: measure,
          alertQuantity : quantity * 0.15,
          expiryDate : new Date("12/25/0000"),
          notify : false
        }
      return prod;
    }));
    // console.log('product', product);
    return product;
  }

  public async getMeasure(quantity: string): Promise<Measure>{
    // test value 
    // 5000112558272
    // 3174660070325
    // 3245412846991

    let startSubstring = quantity.indexOf(' ');
    let endSubstring = quantity.substring(startSubstring + 1).indexOf(' ');
    let unity = quantity.split(' ')[1];
    // if(endSubstring == -1){
    //   unity  = quantity.substring(startSubstring);
    // }else{
    //   unity  = quantity.substring(startSubstring, startSubstring + endSubstring + 1);
    // }
    let measureUnity;
    switch(unity){
      case 'cl':{
        measureUnity = 'mL';
        break;
      }
      case 'kg':{
        measureUnity = 'g'
      }
      case '':{
        measureUnity = 'qte'
      }
    }
    let promise;
    // console.log('unity', unity, unity.length)
    if(unity != 'mL' &&
     unity != 'g' &&
     unity != 'qte'){
       promise  = await this.database.getMeasure(unity).then(measure =>{
         console.log('measure getMeasure', measure)
         return measure
       });
     }else{
      //  console.log('error unity');
     }
    return promise;
  }
}
