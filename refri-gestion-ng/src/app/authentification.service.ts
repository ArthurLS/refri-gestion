/* import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private user = new BehaviorSubject<User>(new User('', '', '', false, ''))
  castUser = this.user.asObservable();

  constructor(private http : HttpClient) {
   }

  authenticate(credentials, callback){
    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.pseudo + ':' + credentials.password)
    } : {});

    this.http.get('api/user', {headers: headers}).subscribe(response => {
      if(response['name']){
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('pseudo', response['name']);
      } else{
        localStorage.setItem('authenticated', 'false');
        localStorage.removeItem('pseudo');
      }
      return callback && callback();
    })
  }

  public isAuthenticated():boolean{
    return localStorage.getItem('authenticated') == 'true' || false;
  }

  public getPseudo():String{
    return localStorage.getItem('pseudo');
  }

  public logup(user: User): Observable<any>{
    const url = '/api/users/create'
    return this.http.post<any>(url, user)
  }

  public logout(callback){
    const url = '/api/logout';
    localStorage.setItem('authenticated', 'false');
    localStorage.removeItem('pseudo');
    this.http.post(url, {}).subscribe(() => {
          return callback && callback();
      });
  }

  changeUser(newUser){
    this.user.next(newUser);
  }
}
 */