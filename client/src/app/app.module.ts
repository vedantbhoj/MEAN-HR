import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    AdminComponent,
    HeaderComponent,
    MainComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, AppRoutingModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent,EmployeesComponent]
})
export class AppModule { }
