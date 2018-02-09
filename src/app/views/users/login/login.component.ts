import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  constructor(private router: Router) { }

  login(username: String, password: String) {
    console.log('navigate to profile');
    this.router.navigate(['/profile']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  ngOnInit() {
  }

}
