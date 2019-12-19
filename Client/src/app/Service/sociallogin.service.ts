import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SocialloginService {

  private REST_API_SERVER = "http://localhost:3000/api/";

  constructor(private httpClient: HttpClient) { }
 
  config = {
    headers: {
          'Authorization': window.sessionStorage.getItem('token')
    }
  };

  public getDataRequest(){    
    return this.httpClient.get(this.REST_API_SERVER+'users', this.config );
  }

  public oAuthDataRequest(response){
    return this.httpClient.post(this.REST_API_SERVER+'oauth/google',response);
  }

    public signin(response) {
        return this.httpClient.post(this.REST_API_SERVER+'signin',response);
    }

    public signup(response) {
        return this.httpClient.post(this.REST_API_SERVER + 'signup', response);
    }
}
