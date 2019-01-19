import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service'
import { DatabaseService } from '../services/database.service';

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
    private databaseService: DatabaseService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.email == null ||
      this.password == null) {
      this.has_an_error = true;
      this.error_msg = "Champs vides.";
    } else {
      this.authenService.login(this.email, this.password).then(result => {
        if (result) {
          this.has_an_error = false;
          //console.log('email: ', this.email, 'password: ', this.password);
          // go to fridge
          this.router.navigate(['fridge']);
        } else {
          this.has_an_error = true;
          this.error_msg = "Champs invalides"
        }
      })
    }
  }
}
