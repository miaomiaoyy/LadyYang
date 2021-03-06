import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user.model.client';
import {Page} from '../../../models/page.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;
  username: String;
  firstName: String;
  lastName: String;
  password: String;
  verifyPassword: String;
  email: String;
  errorFlag: boolean;
  passwordErrorMsg = 'password or username error';


  user: User;
  private error: any;
  constructor(private userService: UserService, private router: Router,
              private activatedRouter: ActivatedRoute, private sharedService: SharedService) { }
  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.verifyPassword = this.registerForm.value.verifyPassword;
    this.firstName = this.registerForm.value.firstName;
    this.lastName = this.registerForm.value.lastName;
    this.email = this.registerForm.value.email;

    if (this.password !== this.verifyPassword) {
      this.errorFlag = true;
      this.passwordErrorMsg = "Password and Username mismatch.";
    }
    else {
      // this.user = new User(undefined, this.username, this.password, this.firstName, this.lastName, this.email);
      // this.userService.createUser(this.user).subscribe(
      //   (user: User) => {
      //     console.log('success');
      //     this.user = user;
      //     this.router.navigate(['/profile', this.user._id]);
      //   }
      // );
      this.userService.register(this.username, this.password, this.firstName, this.lastName, this.email).subscribe(
        (user: User) => {
          if(user) {
            console.log('success');
            //this.user = user;
            this.sharedService.user = user;
            this.router.navigate(['/profile']);
          }
        },
        (error: any) => {
          this.errorFlag = true;
          this.passwordErrorMsg = "Username in use.";
          console.log(error);
        }
      );
    }
  }

  ngOnInit() {
  }

}
