import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  username: String;
  password: String;

  errorFlag: boolean;
  errorMsg = 'Invalid Username or password!';

  constructor(private userService: UserService, private router: Router, private sharedService: SharedService) { }
  login() {
    // fetching data from loginForm
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    // calling client side userservice to send login information
    console.log('data', this.username);
    this.userService.login(this.username, this.password)
      .subscribe(
        (data: any) => {
          this.sharedService.user = data;
          console.log( "print");
          this.router.navigate(['/profile']);
          },
        (error: any) => {
          console.log( "print2");
          console.log(error);
        }
      );
  }

  register() {
    this.router.navigate(['/register']);
  }
  ngOnInit() {
  }

}
