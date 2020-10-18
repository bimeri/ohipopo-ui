import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSubjectsPage } from './user-subjects.page';

const routes: Routes = [
  {
    path: '',
    component: UserSubjectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSubjectsPageRoutingModule {}
