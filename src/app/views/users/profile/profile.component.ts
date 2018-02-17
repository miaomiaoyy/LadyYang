import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../service/user.service.client';
import {User} from '../../../models/user.model.client';
import {NgForm} from '@angular/forms';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  // constructor() { }
  constructor(
    private router: ActivatedRoute,
    private userService: UserService
  ) { }

  updateUser(user) {
    console.log(user);
    this.user = this.userService.updateUser(user);
  }
  ngOnInit() {
    this.router.params.subscribe(params => {
      this.user = this.userService.findUserById(params['userId']);
    });
  }


}
