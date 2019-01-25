import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Observer } from 'rxjs';
import { User } from '../models/User.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private user = new BehaviorSubject<User>(new User(-1, '', '', '', true))
  private logger = new BehaviorSubject<boolean>(localStorage.getItem('currentUser') != null);

  currentUser = this.user.asObservable();

  constructor(private databaseService: DatabaseService) { }

  /**
   * @returns true if the user is logging, false otherwise 
   */
  public async login(email: string, password: string): Promise<boolean> {
    // wait the promise which return the user and check the password
    let user = await this.databaseService.getUser(email);
    //console.log('user', user);
    if (user != null && user.password == password) {
      this.user.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user))
      this.logger.next(true);
      return true;
    } else {
      return false;
    }
  }

  public async logup(newUser: User): Promise<boolean> {
    // check if a user with the same email already exists
    let result = await this.alreadyExists(newUser.email);
    if (result) {
      return false;
    } else {
      return this.databaseService.addUser(newUser).then(result => {
        return result
      });
    }
  }

  /** Asynchronous function to know if the user is connected
  */
  public isLoggedObs(): Observable<boolean> {
    return this.logger.asObservable();
  }

  /** Synchronous function to know if the user is connected,
   * but prefered the asynchrone version isLoggedObs()
   */
  public isLogged(): boolean {
    return localStorage.getItem('currentUser') != null
  }

  public logout(): void {
    let emptyUser: User;
    emptyUser = new User(-1, '', '', '', true);
    this.user.next(emptyUser);
    localStorage.removeItem('currentUser');
    this.logger.next(false);
  }

  /**
   *@returns true if the user already exists, false otherwise
   */
  public async alreadyExists(email: string): Promise<boolean> {
    // wait the promise to be resolve before returing the result
    let user = await this.databaseService.getUser(email);
    return user != null;
  }

  public async changeUser(newUser: User): Promise<boolean> {
    let userDB = await this.databaseService.getUser(newUser.email)
    if (newUser.id == userDB.id) {
      this.databaseService.updateUser(newUser).then(() => {
        this.user.next(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser))
      })
      return true;
    } else {
      return false;
    }

  }
}
