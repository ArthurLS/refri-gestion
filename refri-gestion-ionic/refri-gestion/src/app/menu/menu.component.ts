import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  title: string;
  fridgePNG: string;
  cartPNG: string;
  listPNG: string;
  accountPNG: string;
  logoutPNG: string;
  is_logged_in: boolean;

  constructor(
    private authenService: AuthentificationService,
    private router: Router) {
    this.fridgePNG = "assets/img/fridge.png";
    this.cartPNG = "assets/img/cart.png";
    this.listPNG = "assets/img/list.png";
    this.accountPNG = "assets/img/account.png";
    this.logoutPNG = "assets/img/logout.png";
   }

  ngOnInit() {
    this.title = "Réfri'Gestion";
    // check if the user is log
    this.authenService.isLoggedObs().subscribe(isLoggedIn =>
      this.is_logged_in = isLoggedIn
    );
  }

  logout() {
    this.authenService.logout();
    this.changeTitle("Réfri\'Gestion");
    // go back to home page
    this.router.navigate(['']);
  }

  changeTitle(newTitle: string){
    this.title = newTitle;
  }

}
