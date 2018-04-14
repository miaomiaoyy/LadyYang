import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Website} from '../models/website.model.client';
import {Cake} from '../models/cake.model.client';


@Injectable()
export class CakeService {
  constructor(private http: Http) {
  }

  baseUrl = environment.baseUrl;
  options = new RequestOptions();

  showCake() {
    return this.http.post(this.baseUrl + '/api/cakes', '', this.options)
      .map(
        (res) => {
          const data = res;
        }
      );
  }


  createCake(cake: Cake) {
    const url = this.baseUrl + '/api/cakes/new';
    return this.http.post(url, cake).map((response: Response) => {
      console.log("cake");
      return response.json();
    });
  }
}

