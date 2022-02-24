import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: [''],
      password: ['']
    })
  }

  login() {
    let user = this.loginForm.value.name;
    let pass = this.loginForm.value.password;
    console.log(user)
    console.log(pass)

    this.auth.login(user, pass)
    .subscribe(res => {
      console.log(res);
      if (res.success) {
        localStorage.setItem('currentUser', 
        JSON.stringify({token: res.data.token, name: res.data.name})
        );
        this.router.navigate(['list']);

      }else {
        alert('Hiba! A belépés sikertelen!')
      }
    })

  }

  onLogin() {
    let user = this.loginForm.value.name;
    let pass = this.loginForm.value.password;
 
    this.auth.login(user, pass).subscribe({
 
      next: data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.name);
      },
      error: err => {
        console.log('Hiba! Az azonosítás sikertelen');
      }
    });
  }
}
