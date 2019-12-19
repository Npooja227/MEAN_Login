import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialloginService } from '../Service/sociallogin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: SocialloginService, private router: Router) { }

  ngOnInit() {}

  data = this.userData();
  my_profile;

  userData(){
    if(window.sessionStorage.getItem('token')){
      this.dataService.getDataRequest().subscribe((response: any)=>{
        this.data = response.data;
        var base64Url = window.sessionStorage.getItem('token').split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let id = JSON.parse(window.atob(base64)).user_id;
        if(response.data.length > 0){
          let index = response.data.findIndex((item) => item._id == id);
          this.my_profile = response.data[index];
        }
      });
    }else {
      this.router.navigate([`/login`]);
    }
  }

  logout(){
    window.sessionStorage.removeItem('token');
    this.router.navigate([`/login`]); 
  }

  profile = {};
  search: string;
  

}
