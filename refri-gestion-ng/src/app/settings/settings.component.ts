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
  notify_by_default: boolean;
  has_an_msg: boolean;
  msg: string;

  constructor(private authenService: AuthentificationService, private dbService : DatabaseService) {
    this.has_an_msg = false;
    this.msg = "";
    authenService.currentUser.subscribe(user => {
      this.id = user.id;
      this.current_password = user.password;
      this.email = user.email;
      this.name = user.name;
      this.notify_by_default = user.notifyByDefault;
      console.log('notify', this.notify_by_default);
    })
  }

  ngOnInit() {

  }
  // TODO allow to just change notify
  valid(){
    if(this.email == null ||
      this.name == null ||
      this.old_password == null ||
      this.new_password == null ||
      this.new_confirmed_password == null ||
      this.notify_by_default == null){
      this.has_an_msg = true;
      this.msg = "Champs vides."
    }
    else if(this.old_password != this.current_password){
      this.has_an_msg = true;
      this.msg = "Mot de passe incorrect.";
    }else if(this.new_password != this.new_confirmed_password){
      this.has_an_msg = true;
      this.msg = "Mot de passe incorrect.";
    }else{    
      let new_user = new User(this.id, this.email, this.name, this.new_password, this.notify_by_default)
      this.authenService.changeUser(new_user).then(result =>{
        if(result){
          this.has_an_msg = true;
          this.msg = "Modifications enregistrées."
        }else{
          this.has_an_msg = true;
          this.msg = "Email utilisé par un autre compte."
        }
      })
    }
  }

}
