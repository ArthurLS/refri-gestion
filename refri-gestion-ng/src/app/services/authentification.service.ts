import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {
  private user = new BehaviorSubject<User>(new User(-1, '', '','', true))
  castUser = this.user.asObservable();

  constructor() {
   }

  public login(email: string, password: string){
    
  }

  public isAuthenticated():boolean{
    return localStorage.getItem('authenticated') == 'true' || false;
  }

  public getPseudo():String{
    return localStorage.getItem('pseudo');
  }

  public logup(user: User): Observable<User>{
    return this.user;
  }

  public logout(callback){
    const url = '/api/logout';
    localStorage.setItem('authenticated', 'false');
    localStorage.removeItem('pseudo');
    return callback && callback();
  }

  changeUser(newUser){
    this.user.next(newUser);
  }
}
