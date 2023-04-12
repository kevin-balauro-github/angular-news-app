import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './component/news-list/news-list.component';

const routes: Routes = [
  {
    path: ':category',
    component: NewsListComponent,
  },
  {
    path: '',
    redirectTo: '/news/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
