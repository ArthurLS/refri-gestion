import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
import { User } from '../models/User.model';
import { DatabaseService } from '../services/database.service';

/*import { pseudoRandomBytes } from 'crypto';*/

@Component({
  selector: 'app-logup',
  templateUrl: './logup.component.html',
  styleUrls: ['./logup.component.css']
})
export class LogupComponent implements OnInit {

  new_user: User;
  email: string;
  username: string;
  password: string;
  confirmed_password: string;
  has_an_error: boolean;
  error_msg: string;


  constructor(
    private authenService: AuthentificationService,
    private databaseService: DatabaseService,
    private router: Router) {
  }

  ngOnInit() {
    this.has_an_error = false;
  }

  logup() {
    console.log('email: ', this.email, 'username: ', this.username, 'password: ', this.password, 'confirmed_password: ', this.confirmed_password)
    this.new_user = new User(-1, this.email, this.username, this.password, true);
    if (this.email == null ||
      this.username == null ||
      this.password == null ||
      this.confirmed_password == null) {
      this.has_an_error = true;
      this.error_msg = "Champs vides.";
    } else if (this.password !== this.confirmed_password) {
      this.has_an_error = true;
      this.error_msg = "Mots de passe invalides."
    } else if (this.authenService.logup(this.new_user)) {
      console.log('email: ', this.email, 'username: ', this.username, 'password: ', this.password, 'confirmed_password', this.confirmed_password);
      this.has_an_error = false;
      this.error_msg = "";
      // go back to home page
      this.router.navigate(['']);
    } else {
      this.has_an_error = true;
      this.error_msg = "Impossible de créer ce compte.";
    }
  }
}
