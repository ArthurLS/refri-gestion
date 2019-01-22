import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { User } from 'src/app/models/User.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
@Component({
  selector: 'app-change-credentials',
  templateUrl: './change-credentials.component.html',
  styleUrls: ['./change-credentials.component.css']
})
export class ChangeCredentialsComponent implements OnInit {
  hasAnMsg: boolean;
  msg: string;
  email: string;
  name: string;
  newUser: User;

  constructor(private authenService: AuthentificationService, private dbService: DatabaseService) {
    this.hasAnMsg = false;
    this.msg = "";
    this.authenService.currentUser.subscribe(user => {
      this.newUser = user;
      this.email = user.email;
      this.name = user.name;
    })
  }

  ngOnInit() {
  }

  valid() {
    if (this.email == null || !this.email ||
      this.name == null || !this.name){
      this.hasAnMsg = true;
      this.msg = "Champs vides."
    }else{
      this.newUser.email = this.email;
      this.newUser.name = this.name;
      this.authenService.changeUser(this.newUser).then(result =>{
        if(result){
          this.hasAnMsg = true;
          this.msg = "Modifications enregistrées."
        }else{
          this.hasAnMsg = true;
          this.msg = "Email utilisé par un autre compte."
        }
      })
    }
  }

}
