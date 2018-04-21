import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
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
    this.userService.login(this.username, this.password)
      .subscribe(
        (data: any) => {
          this.sharedService.user = data;
          this.errorFlag = false;

          this.router.navigate(['/profile']);

          },
        (error: any) => {
          this.errorFlag = true;
          console.log( this.username, "print2");
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
