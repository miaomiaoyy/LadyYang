import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) { }

  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }

  updateUser(changed_user) {
    return this.userService.updateUser(changed_user).subscribe(
      // (user: User) => {
      //   this.user = user;
      // }
    );
  }

  deleteUser(userId) {
    return this.userService.deleteUser(userId).subscribe(
      () => this.router.navigate(['/login'])
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      return this.userService. findUserById(params['uid']).subscribe(
        (user: User) => {
          this.user = user;
        }
      );
    });
  }

}
