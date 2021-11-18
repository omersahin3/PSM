import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ServicesComponent } from './services/services.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { ServersComponent } from './servers/servers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from '../custom/home/home.component';
import { ServiceAddComponent } from './service-add/service-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { ServerAddComponent } from './server-add/server-add.component';
import { ServerEditComponent } from './server-edit/server-edit.component';
import { ServerDetailComponent } from './server-detail/server-detail.component';
import { LoginGuard } from '../login/login.guard';
import { ServerDeleteComponent } from './server-delete/server-delete.component';
import { ServiceDeleteComponent } from './service-delete/service-delete.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // Component olarak Home'u aç ve en son router-outlet'in çocuğuna aşşağıdaki componentleri yerleştir.
    canActivate: [LoginGuard],
    children: [
      { path: '', redirectTo: 'services', pathMatch: 'full' },
      { path: 'services', component: ServicesComponent },
      { path: 'servers', component: ServersComponent},
      { path: 'dashboard', component: DashboardComponent},
    ],
  },
];

@NgModule({
  declarations: [
    ServicesComponent,
    ServersComponent,
    DashboardComponent,
    ServiceAddComponent,
    ServiceEditComponent,
    ServiceDetailComponent,
    ServerAddComponent,
    ServerEditComponent,
    ServerDetailComponent,
    ServerDeleteComponent,
    ServiceDeleteComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule], // dışardan tanımlanmasını sağlanmış
  providers: [DatePipe]
})
export class AdminModule {}
