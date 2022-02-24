import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './shared/auth.guard';
import { VehicleComponent } from './vehicle/vehicle.component';

const routes: Routes = [{
  path: 'vehicle', 
  component: VehicleComponent,
  canActivate: [AuthGuard]
},
{path: 'login', component: LoginComponent},
{path: 'list', component: ListComponent},

{path: '**', component: ListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
