import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'

import { AppTestService } from '../service/app-test.service'
// import { ApiUtilService } from '../app/common/http-status.service'
// import { HttpCli } from '../app/common/http-cli'

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // HttpCli,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    // ApiUtilService,
    AppTestService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
