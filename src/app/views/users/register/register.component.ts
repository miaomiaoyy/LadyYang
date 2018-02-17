  import { Component, OnInit } from '@angular/core';
  import {Router, UrlSerializer} from '@angular/router';
  import {UserService} from '../../../service/user.service.client';
  import {User} from '../../../models/user.model.client';
  import {NgForm} from '@angular/forms';
  import { ViewChild } from '@angular/core';
  import {createViewChild} from '@angular/compiler/src/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 constructor(){}
  ngOnInit() {
  }

}


