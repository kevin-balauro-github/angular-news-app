import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NewsRoutingModule } from './news-routing.module';

import { NewsListComponent } from './component/news-list/news-list.component';
import { NewsCategoriesComponent } from './component/news-categories/news-categories.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewsListComponent, NewsCategoriesComponent],
  imports: [CommonModule, NewsRoutingModule, HttpClientModule, FormsModule],
  exports: [NewsListComponent, NewsCategoriesComponent],
})
export class NewsModule {}
