import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Observer } from 'rxjs';
import { User } from '../models/User.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {
  private user = new BehaviorSubject<User>(new User(-1, '', '','', true))
  private logger =new BehaviorSubject<boolean>(localStorage.getItem('currentUser') != null);

  current_user = this.user.asObservable();

  constructor(private databaseService: DatabaseService) {}

  public login(email: string, password: string): boolean{    
    // this.changeUser();
    // localStorage.setItem('currentUser', JSON.stringify(user))
    let user = new User(-1, email, '', password, false);
    console.log('user final', user);
    if(user != null){
      this.user.next(user);
      localStorage.setItem('currentUser', email);
      this.logger.next(true);
      return true
    }else{
      console.log('ici')
      return false
    }

    // this.changeIsAuthenticated(true);
  }

  public logup(user: User): Observable<User>{
    // TODO uncomment when the add user take a user.
    this.databaseService.addUser(user);
    return this.user;
  }

  /** Asynchronous function to know if the user is connected
  */
  public isLoggedObs(): Observable<boolean>{
    return this.logger.asObservable();
  }

  /** Synchronous function to know if the user is connected,
   * but prefered the asynchrone version isLoggedObs()
   */
  public isLogged():boolean{
    return localStorage.getItem('currentUser') != null
  }

  public logout(): void{
    let user: User;
    user = new User(-1, '', '','', true);
    this.changeUser(user);
    localStorage.removeItem('currentUser');
    this.logger.next(false);
  }

  changeUser(newUser): void{
    this.user.next(newUser);
  }

}
