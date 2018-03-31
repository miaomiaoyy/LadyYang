import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {}

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    // alert(this.username);
    console.log('Kitty1', this.username, this.password);

    this.userService.findUserByCredentials(this.username, this.password).subscribe(
      (user: User) => {
        this.errorFlag = false;
        const userId = user['_id'];
        this.router.navigate(['/profile', userId]);
      },
      (error: any) => {
        this.errorFlag = true;
        // alert(this.errorMsg);
      });
  }


  register() {
    this.router.navigate(['/register']);
  }

  ngOnInit() {}
  }



