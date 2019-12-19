import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { MatIconModule, MatTabsModule } from '@angular/material';
import { GoogleLoginProvider, AuthService } from 'angular-6-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { SocialloginService } from './Service/sociallogin.service';
import { SearchPipe } from './search.pipe';

export function socialConfigs() {
    const config = new AuthServiceConfig(
        [
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('271005471692-ilt1jmbtn15fblbec855pbmva7t2i8tp.apps.googleusercontent.com')
            }
        ]
    );
    return config;
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatTabsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
    providers: [
        AuthService,
        {
            provide: AuthServiceConfig,
            useFactory: socialConfigs
        }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
