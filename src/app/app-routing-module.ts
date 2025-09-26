import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhackAMole } from './whack-a-mole/whack-a-mole';
import { Home } from './home/home';
import { Prcatice } from './prcatice/prcatice';

const routes: Routes = [
  {
    path: 'game',
    component: WhackAMole,   // ✅ lowercase "component"
  },
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full',
  },
  // {
  //   path:'home',
  //   loadChildren:()=>import('./home/home').then(c=>c.Home)
  // },
  // {
  //   path:"about",
  //   loadChildren:()=>import('./home/home').then(c=>c.Home)
  // },
  {
    path:'Practice',
    component:Prcatice
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}