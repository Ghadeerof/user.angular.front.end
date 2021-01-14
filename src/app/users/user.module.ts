import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list.component'
import { UserDetailComponent } from './user-detail.component'
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pips'

import { RouterModule } from '@angular/router'
import { UserDetailGuard } from './user-detail.guard';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    ConvertToSpacesPipe,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'users', component: UserListComponent},
      { 
        path: 'users/:id',
        canActivate: [UserDetailGuard],
        component: UserDetailComponent
      }
    ]),
    SharedModule
  ]
})
export class UserModule { }
