import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/user.service.client';
import {User} from '../../../models/user.model.client';
import {NgForm} from '@angular/forms';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  username: String;
  password: String;
  verifyPassword: String;
  firstName: String;
  lastName: String;
  errorFlag: boolean;
  userDuplicateError: boolean;
  errorMsg = 'Two passwords mismatch, please retry';
  userDuplicateErrorMsg = 'The user already exits';

  constructor(
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {}
  register() {

    if (this.verifyPassword !== this.password) {
      this.errorFlag = true;
      const user = new User(Math.random().toString() + '', this.username, this.password, this.firstName, this.lastName);
      this.userService.createUser(user).subscribe(
        (data: User) => {
          this.errorFlag = true;
          this.router.navigate(['/profile', data.uid]);
        },
      (error: any) => console.log(error)
      );
    }
    if (this.userService.findUserByCredentials(this.username, this.password) != null) {
      const user = new User('', this.username, this.password, '', '');
      this.userService.createUser(user).subscribe(
        (data: User) => {
          this.userDuplicateError = true;
          alert(this.userDuplicateErrorMsg);
          this.router.navigate(['/login', data.uid]);
        });
    }

    if (this.errorFlag) {
      this.password = null;
    }
    const user: User = new User(Math.random().toString() + '', this.username, this.password, this.firstName, this.lastName);
    this.userService.createUser(user);
    this.router.navigate(['/profile', user.uid]);
    }
  ngOnInit() {
    this.lastName = this.registerForm.value.lastName;
    this.firstName = this.registerForm.value.firstName;
    this.password = this.registerForm.value.password;
  }
}
