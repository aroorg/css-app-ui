import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { MembersViewComponent } from './members/members-view/members-view.component';


const routes: Routes = [ 
{
  path : '', 
  redirectTo: '/home',
  pathMatch: 'full'},
{   
  path : 'home', 
  component : HomePageComponent
},
{
  path :'members',
  component: MembersViewComponent  
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
