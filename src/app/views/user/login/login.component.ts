import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service';
import {NgForm} from '@angular/forms';


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
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    // alert(this.username);

    // this.userService.findUserByCredential(this.username, this.password).subscribe(
    //   (user: User) => {
    //     this.errorFlag = false;
    //     this.router.navigate(['/profile', user._id]);
    //   },
    //   (error: any) => {
    //     this.errorFlag = true;
    //     // alert(this.errorMsg);
    //   });

    this.userService.login(this.username, this.password).subscribe(
      (data: any) => {
        this.sharedService.user = data;
        this.router.navigate(['/profile'])},
      (error: any) => {
        console.log(error);
      });
  }

  register() {
    this.router.navigate(['/register']);
  }
  ngOnInit() {
  }

}
