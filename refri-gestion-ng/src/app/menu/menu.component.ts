import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
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
    private titleService: Title,
    private authenService: AuthentificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.fridgePNG = "../../assets/img/fridge.png";
    this.cartPNG = "../../assets/img/cart.png";
    this.listPNG = "../../assets/img/list.png";
    this.accountPNG = "../../assets/img/account.png";
    this.logoutPNG = "../../assets/img/logout.png";
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
