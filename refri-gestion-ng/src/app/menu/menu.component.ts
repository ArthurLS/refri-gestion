import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  fridgePNG: string;
  cartPNG: string;
  listPNG: string;
  accountPNG: string;
  constructor() {
    this.fridgePNG = "../../assets/img/fridge.png";
    this.cartPNG = "../../assets/img/cart.png";
    this.listPNG = "../../assets/img/list.png";
    this.accountPNG = "../../assets/img/account.png";
   }

  ngOnInit() {
  }

}
