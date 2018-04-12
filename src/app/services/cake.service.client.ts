import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';


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
}

