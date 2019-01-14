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

  cast_user = this.user.asObservable();

  constructor(private databaseService: DatabaseService) {}

  public login(email: string, password: string): boolean{    
    // this.changeUser();
    // localStorage.setItem('currentUser', JSON.stringify(user));
    let users = this.databaseService.getUserAll();
    console.log('users', users);
    let user = users.filter(user =>{
      user.email == email && user.password == password}
    );
    console.log('user', user);
    if(user != null){
      localStorage.setItem('currentUser', email);
      this.logger.next(true);
      return true
    }else{
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
