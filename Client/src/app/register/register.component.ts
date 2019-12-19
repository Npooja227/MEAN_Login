import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, AuthService } from 'angular-6-social-login';

import { Socialusers } from '../Models/socialusers'
import { SocialloginService } from '../Service/sociallogin.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(public OAuth: AuthService,
        private SocialloginService: SocialloginService,
        private router: Router) { }

    ngOnInit() {
    }

    register(form) {
        this.SocialloginService.signup(form.value).subscribe((res: any) => {
            if (res.token) {
                window.sessionStorage.setItem('token', res.token);
                this.router.navigate([`/dashboard`]);
            }
        });
    }

    public socialSignIn() {
        let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

        this.OAuth.signIn(socialPlatformProvider).then(socialusers => {         
            this.SocialloginService.oAuthDataRequest(socialusers).subscribe((res: any) => {
                if (res.token) {
                    window.sessionStorage.setItem('token',res.token);
                    this.router.navigate([`/dashboard`]);   
                }
            });
        });
    }

}
