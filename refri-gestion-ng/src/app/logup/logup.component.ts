import { Component, OnInit } from '@angular/core';
/*import { pseudoRandomBytes } from 'crypto';*/

@Component({
  selector: 'app-logup',
  templateUrl: './logup.component.html',
  styleUrls: ['./logup.component.css']
})
export class LogupComponent implements OnInit {

  email: String;
  username: String;
  password: String;
  confirmed_password: String;
  has_an_error: boolean;
  error_msg: String;


  constructor() {
  }
  
  ngOnInit() {
    this.has_an_error = false;
  }

  logup(){
    console.log('email: ', this.email, 'username: ', this.username, 'password: ', this.password, 'confirmed_password: ', this.confirmed_password)
    if(this.email == null ||
      this.username == null ||
      this.password == null ||
      this.confirmed_password == null){
      this.has_an_error = true;
      this.error_msg = "Champs invalides.";
    }else if(this.password !== this.confirmed_password){
      this.has_an_error = true;
      this.error_msg = "Mots de passe invalides."
    }else{
      this.has_an_error = false;
      /* TODO register to the database */
      console.log('email: ', this.email, 'username: ', this.username, 'password: ', this.password, 'confirmed_password', this.confirmed_password);
    }
  }
}
