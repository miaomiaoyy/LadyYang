  import { Component, OnInit } from '@angular/core';
  import {Router} from '@angular/router';
  import {UserService} from '../../../service/user.service.client';
  import {User} from '../../../models/user.model.client';
  import {NgForm} from '@angular/forms';
  import { ViewChild } from '@angular/core';
  import {AlertService} from '../../../service/alert.service.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  user: User;
  verifyPassword: String;
  errorFlag: boolean;

  errorMsg = 'Two passwords mismatch, please retry';


   constructor(
     private userService: UserService,
     private router: Router,
     private alertService: AlertService) {}
     register() {
     this.user.username = this.registerForm.value.username;
     this.user.password = this.registerForm.value.password;
     this.verifyPassword = this.registerForm.value.verifyPassword;
     this.user.lastName = this.registerForm.value.lastName;
     this.user.firstName = this.registerForm.value.firstName;
     this.user._id = Math.random().toString();
     while (this.userService.findUserById(this.user._id) != null) {
       this.user._id = Math.random().toString();
     }
     if (this.verifyPassword !== this.user.password) {
       this.errorFlag = true;
     }
     if (this.errorFlag) {
       this.user.password = null;
     }
     this.userService.createUser(this.user);

     // this.userService.createUser(this.user)
     //   .subscribe(
     //     data => {
     //       this.alertService.success('Registration successful', true);
     //       this.router.navigate(['/login']);
     //     },
     //     error => {
     //       this.alertService.error(error);
     //       this.loading = false;
     //     });
     this.router.navigate(['/profile', this.user._id]);
   }
      OnInit() {}

  ngOnInit(): void {
  }
 }

