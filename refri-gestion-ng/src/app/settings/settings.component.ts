import { Measure } from './../models/Measure.model';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Product } from '../models/Product.model';
import { User } from '../models/User.model';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  id: number
  email: string;
  name: string;
  old_password: string;
  current_password: string;
  new_password: string;
  new_confirmed_password: string;
  notif_by_default: boolean;
  has_an_error: boolean;
  error_msg: string;

  constructor(private authenService: AuthentificationService, private dbService : DatabaseService) {
    this.has_an_error = false;
    this.error_msg = "";
    authenService.current_user.subscribe(user => {
      this.current_password = user.password;
      this.email = user.email;
      this.name = user.name;
      this.notif_by_default = user.notifByDefault;
    })
  }

  ngOnInit() {

  }

  valid(){
    if(this.email == null ||
      this.name == null ||
      this.old_password == null ||
      this.new_password == null ||
      this.new_confirmed_password == null){
      this.has_an_error = true;
      this.error_msg = "Champs vides."
    }
    else if(this.old_password != this.current_password){
      this.has_an_error = true;
      this.error_msg = "Mot de passe incorrect.";
    }else if(this.new_password != this.new_confirmed_password){
      this.has_an_error = true;
      this.error_msg = "Mot de passe incorrect.";
    }else{
      this.has_an_error = true;
      this.error_msg = "Modifications enregistrées."
      let new_user = new User(this.id, this.email, this.name, this.new_password, this.notif_by_default)
      this.authenService.changeUser(new_user)
    }
  }

}
