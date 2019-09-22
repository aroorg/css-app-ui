import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layouts/header/header.component';
import {FormsModule} from '@angular/forms'
import {MatIconModule} from '@angular/material/icon';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MembersViewComponent } from './members/members-view/members-view.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MemberAddEditComponent } from './members/member-add-edit/member-add-edit.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './core/common/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MembersViewComponent,
    HomePageComponent,
    MemberAddEditComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    AgGridModule.withComponents([MembersViewComponent]),
    HttpClientModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[MemberAddEditComponent, ModalComponent]
})
export class AppModule { }
