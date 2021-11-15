import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CPasswordComponent } from './c-password/c-password.component';



@NgModule({
  declarations: [HeaderComponent, SidebarComponent, ContentComponent, HomeComponent, ProfileComponent, CPasswordComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule, // for router
    ReactiveFormsModule
  ],
  exports:[HeaderComponent, SidebarComponent, ContentComponent]
})
export class CustomModule { }
