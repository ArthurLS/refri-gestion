import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { DatabaseService } from 'src/app/services/database.service';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-change-notify',
  templateUrl: './change-notify.component.html',
  styleUrls: ['./change-notify.component.css']
})
export class ChangeNotifyComponent implements OnInit {

  hasAnMsg: boolean;
  msg: string;
  newUser: User;
  notifyByDefault: boolean;

  constructor(private authenService: AuthentificationService, private dbService: DatabaseService) {
    this.hasAnMsg = false;
    this.msg = "";
    this.authenService.currentUser.subscribe(user => {
      this.newUser = user;
      this.notifyByDefault = user.notifyByDefault;
    })}

  ngOnInit() {
  }

  valid(){
    if(this.notifyByDefault == null){
      this.hasAnMsg = true;
      this.msg = "Champs vides."
    }else{
      this.newUser.notifyByDefault = this.notifyByDefault;
      this.authenService.changeUser(this.newUser).then(result => {
        if (result) {
          this.hasAnMsg = true;
          this.msg = "Modifications enregistrées."
        } else {
          this.hasAnMsg = true;
          this.msg = "Impossible d'enregistrer les modifications."
        }
      })
    }
  }

}
