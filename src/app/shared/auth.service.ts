import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  host = 'http://localhost:8000/api/';

  constructor(private http: HttpClient, private router: Router) { }

  login(user: string, pass: string) {
    console.log(user)
    console.log(pass)
    
    let authData = {
      name: user,
      password: pass
    }
    let data = JSON.stringify(authData);

    let headerObj = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let header = {
      headers: headerObj
    }

    let endpoint = 'login';
    let url = this.host + endpoint;
    return this.http.post<any>(url, data, header);
  }

  isLoggedIn() {
    if(localStorage.getItem('currentUser') === null) {
      // console.log('Kint')
      return false;
    }
    // console.log('Bejelentkezve')
    let data:any = localStorage.getItem('currentUser');
    let currentUser = JSON.parse(data)
    let token = currentUser.token;
    return token;
  }

  logout() {
    if(localStorage.getItem('currentUser') === null) {
      return;
    }
    let data:any = localStorage.getItem('currentUser');
    localStorage.removeItem('currentUser');
    let currentUser = JSON.parse(data)
    let token = currentUser.token;

    let headerObj = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    let httpOption = {
      headers: headerObj
    };
    let endpoint = 'logout';
    let url = this.host + endpoint;

    return this.http.post<any>(url, '', httpOption )
    .subscribe(res => {
      console.log(res);
      this.router.navigate(['login']);
    })
  }
}
