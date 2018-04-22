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
    return this.http.get(this.baseUrl + '/api/cakes')
      .map(
        (response: Response) => {
          console.log('client server work');
          return response.json();
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

  findCakeByUser(userId: String) {
    const url = this.baseUrl + '/api/user/' + userId + '/cake';
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  findCakeById(cakeId: String) {
    console.log('first: in api call', cakeId);
    const url = this.baseUrl + '/api/cake/' + cakeId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  updateCake(cakeId: String, cake : Cake) {
  const url = this.baseUrl + '/api/cake/' + cakeId
  return this.http.get(url).map((response: Response) => {
    return response.json();
    });
  }

}

