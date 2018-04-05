// import {Component, OnInit} from '@angular/core';
// import {RouterLink, ActivatedRoute, Router} from '@angular/router';
//
// import {UserService} from '../../../service/user.service.client';
// import {User} from '../../../model/user.model.client';
//
// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css']
// })
// export class ProfileComponent implements OnInit {
//   userId: String;
//   // user: User;
//   user: User = {_id: '', username: '', password: '', firstName: '', lastName: ''};
//   errorFlag: boolean;
//   errorMessage: boolean;
//
//   constructor(private userService: UserService,
//               private activatedRoute: ActivatedRoute,
//               private router: Router) {
//   }
//
//   ngOnInit() {
//     // this.activatedRoute.params.subscribe(
//     //   (params: any) => {
//     //     this.userId = params['uid'];
//     //   }
//     // );
//     // console.log('user id= ' + this.userId );
//     // console.log('profile-----userid' + this.userId);
//     // this.user = this.userService.findUserById(this.userId);
//     // console.log(this.user.username);
//
//     this.activatedRoute.params.subscribe(params => {
//       this.userId = params.uid;
//       return this.userService.findUserById(this.userId).subscribe(
//         (user: User) => {
//           console.log('firstname = ' + user.firstName);
//           console.log('lastname = ' + user.lastName);
//           this.user = user;
//         },
//         (error: any) => {
//           this.errorFlag = true;
//           this.errorMessage = error.toString();
//         }
//       );
//     });
//   }
//
//   updateUserInfo(updatedUser) {
//     // this.userService.updateUser(this.userId, user);
//     // this.user = user;
//     this.userService.updateUser(this.userId, updatedUser).subscribe(
//       (user: User) => {
//         this.errorFlag = false;
//         this.user = user;
//       },
//       (error: any) => {
//         this.errorFlag = true;
//         this.errorMessage = error;
//       }
//     );
//   }
//
// }
//


import {Component, OnInit} from '@angular/core';
import {RouterLink, ActivatedRoute, Router} from '@angular/router';

import {UserService} from '../../../service/user.service.client';
import {User} from '../../../model/user.model.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // properties
  user: User = {_id: '', username: '', password: '', firstName: '', lastName: ''};
  userId: String;
  errorFlag: boolean;
  errorMessage: String;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params.uid;
      console.log('user id= ' + this.userId);
      return this.userService.findUserById(this.userId).subscribe(
        (user: User) => {
          this.user = user;
          console.log('profile get the user by uid');
        },
        (error: any) => {
          this.errorFlag = true;
          this.errorMessage = error.toString();
        }
      );
    });
  }

  updateUserInfo(updatedUser) {
    this.userService.updateUser(this.userId, updatedUser).subscribe(
      (user: User) => {
        this.errorFlag = false;
        this.user = user;
      },
      (error: any) => {
        this.errorFlag = true;
        this.errorMessage = error;
      }
    );
  }

  deleteUser() {
    this.userService.deleteUser(this.userId).subscribe(
      (updatedUser: User) => {
        const url: any = '/login';
        this.router.navigate([url]);
      },
      (error: any) => {
        this.errorFlag = true;
        this.errorMessage = error;
      }
    );
  }
}
