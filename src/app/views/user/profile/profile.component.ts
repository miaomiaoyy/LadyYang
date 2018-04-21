import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { User } from '../../../models/user.model.client';
import {UserService} from "../../../services/user.service.client";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // 'username' and 'userId' discarded because 'user' can do their job
  user: User;
  updatedFlag: Boolean = false;
  updatedMsg: String = 'Updated!';

  constructor(
    private userService: UserService,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  // canActivate(){
  //   return this.userService.loggedIn();
  // }
  // how to update password?
  updateUser() {
    // this.activatedRoute.params.subscribe(params => {
    this.userService.updateUser(this.user).subscribe(
      (user: User) => {
        console.log(user);
        this.updatedFlag = true;
      }
    );
    // });
  }

  deleteUser() {
    this.userService.deleteUser(this.user._id).subscribe(() => {});
  }

  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }

  ngOnInit() {
    console.log('profile page');
    this.user = this.sharedService.user;
    // this.activatedRoute.params.subscribe((params: any) => {
    //   // alert('userId is' + this.userId);
    //   return this.userService.findUserById(params['userId'])
    //     .subscribe(
    //       (user: User) => {
    //         this.user = user;
    //         console.log(user);
    //       }
    //     );
    // });
  }
}
