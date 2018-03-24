import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../../../service/user.service.client';
import {User} from '../../../models/user.model.client';
import {NgForm} from '@angular/forms';
import { ViewChild } from '@angular/core';


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
  errorMsg = 'Invalid username or password !';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    alert(this.username + '  is login');

    this.userService.findUserByCredentials(this.username, this.password)
      .subscribe(
        (user: User) => {
          if (typeof user.uid === 'undefined') {
            this.errorFlag = true;
          } else {
            this.router.navigate(['/profile', user.uid]);
          }
        },
        (error: any) => console.log(this.errorMsg)
      );
  }

  // login() {
  //   this.username = this.loginForm.value.username;
  //   this.password = this.loginForm.value.password;
  //
  //   this.userService.findUserByCredentials(this.username, this.password).subscribe(
  //     (user: User) => {
  //       console.log(user);
  //       this.errorFlag = false;
  //       console.log(user.uid);
  //
  //       this.router.navigate(['/profile', user.uid]);
  //     },
  //     (error: any) => {
  //       this.errorFlag = true;
  //     }
  //   );
  // }

  register() {
    this.router.navigate(['/register']);
  }

  ngOnInit() {}
  }

