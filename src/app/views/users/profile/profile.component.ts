import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/user.service.client';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  userId: String;

  constructor(
    private router: ActivatedRoute,
    private userService: UserService
  ) { }

  updateUserController(user) {
    //console.log(user);
    this.user = this.userService.updateUser(user);

  }
  ngOnInit() {
    this.router.params.subscribe(
      (params) => {
        this.userId = params['userId'];
        this.user = this.userService.findUserById(params['userId']);
    });
  }
}

