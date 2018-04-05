import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../service/user.service.client';
import {User} from '../../../model/user.model.client';

import {ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  username: String; // see usage as two-way data binding
  password: String; // see usage as two-way data binding
  errorFlag: boolean;
  errorMsg: String;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.errorFlag = false;
    this.errorFlag = false;
  }

  login(username: String, password: String) {
    if (username.trim() === '') {
      this.errorMsg = 'Please input username';
      this.errorFlag = true;
    }
    if (password.trim() === '') {
      this.errorMsg = 'Please input password';
      this.errorFlag = true;
    }
    // this.username = this.loginForm.value.username;
    // this.password = this.loginForm.value.password;
    // console.log(this.username);
    // console.log(this.password);
    alert(this.username);
    // if (!this.errorFlag) {
    this.userService.findUserByCredentials(username, password)
      .subscribe(
        (user: User) => {
          this.errorFlag = false;
          console.log(user);
          this.router.navigate(['/user', user._id]);
        },
        (error: any) => {
          this.errorFlag = true;
          this.errorMsg = 'Invalid username or password !';
          // this.errorMsg = error;
          console.log('this is error message = ' + this.errorMsg);
        }
      );
  }

  // }

  // const user: User = this.userService.findUserByCredentials(this.username, this.password);
  // if (user) {
  //   console.log('login-----success');
  //   console.log('login-----username' + this.username);
  //   console.log('login-----password' + this.password);
  //   // this.router.navigate(['/profile']);
  //   // this.router.navigate(['/profile/123']);
  //   this.router.navigate(['/user', user._id]);
  // } else {
  //   this.errorFlag = true;
  //   console.log('login-----fail');
  // }
}
