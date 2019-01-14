import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  has_an_error: boolean;
  error_msg: string;
  
  constructor(
    private authenService: AuthentificationService,
    private router: Router
    ) {}

  ngOnInit() {
  }

  login(){
    if(this.email == null || 
      this.password == null){
      this.has_an_error = true;
      this.error_msg = "Champs invalides.";
    }else{
      this.has_an_error = false;
      /* TODO register to the database */
      console.log('email: ', this.email, 'password: ', this.password);
      this.authenService.login(this.email, this.password);
      // go to fridge
      this.router.navigate(['fridge']);
    }
  }
}
