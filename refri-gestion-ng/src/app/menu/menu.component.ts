import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

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
  is_logged_in: boolean;

  constructor(
    private authenService: AuthentificationService,
    private router: Router) {
    this.fridgePNG = "../../assets/img/fridge.png";
    this.cartPNG = "../../assets/img/cart.png";
    this.listPNG = "../../assets/img/list.png";
    this.accountPNG = "../../assets/img/account.png";
   }

  ngOnInit() {
    // this.is_logged_in = this.authenService.isLoggedIn()
    this.authenService.isLoggedObs().subscribe(isLoggedIn =>
      this.is_logged_in = isLoggedIn)
  }

  logout(){
    this.authenService.logout();
    // go back to home page
    this.router.navigate(['']);
  }

}
