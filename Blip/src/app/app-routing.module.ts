import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { DetailGuard } from './guards/detail.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detail', component: DetailComponent, canActivate: [DetailGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
