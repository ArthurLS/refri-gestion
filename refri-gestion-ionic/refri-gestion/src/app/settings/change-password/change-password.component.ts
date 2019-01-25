import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { DatabaseService } from 'src/app/services/database.service';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  hasAnMsg: boolean;
  msg: string;
  newUser: User;
  currentPassword: string;
  oldPassword: string;
  newPassword: string;
  newConfirmedPassword: string;

  constructor(private authenService: AuthentificationService, private dbService: DatabaseService) {
    this.hasAnMsg = false;
    this.msg = "";
    this.authenService.currentUser.subscribe(user => {
      this.newUser = user;
      this.currentPassword = user.password;
    })
  }

  ngOnInit() {
  }

  valid() {
    if (this.oldPassword == null || !this.oldPassword ||
      this.newPassword == null || !this.newPassword ||
      this.newConfirmedPassword == null || !this.newConfirmedPassword) {
      this.hasAnMsg = true;
      this.msg = "Champs vides.";
    }
    else if (this.oldPassword != this.currentPassword) {
      this.hasAnMsg = true;
      this.msg = "Ancien mot de passe incorrect.";
    } else if (this.newPassword != this.newConfirmedPassword) {
      this.hasAnMsg = true;
      this.msg = "Nouveau mot de passe incorrect.";
    } else {
      this.newUser.password = this.newPassword;
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
