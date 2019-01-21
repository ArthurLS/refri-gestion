import { Measure } from './../models/Measure.model';
import { Product } from './../models/Product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenFoodService {

  constructor(private http: HttpClient) { }

  // How to use getProduct
  // this.foodService.getProduct("5000112558272").then(prod => {
  //   console.log(prod);
  // });

  public async getProduct(barCode : string){
    console.log("getPokeList");

    let product = await(this.http.get("https://fr.openfoodfacts.org/api/v0/produit/"+barCode+".json").toPromise().then(response => {
      var full = response["product"];
      var quantityML = full["product_quantity"];
      var measure : Measure = {id : -1, graduation: quantityML/10, name: "mL"}
      var prod : Product = {
          id : -1,
          name : full["product_name_fr"],
          initialQuantity : quantityML,
          currentQuantity : quantityML,
          measure: measure,
          alertQuantity : quantityML * 0.15,
          expiryDate : new Date("12/25/0000"),
          notify : false
        }
      return prod;
    }));

    return product;

  }
}
