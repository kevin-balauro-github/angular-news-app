import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../service/news.service';
import { NewsModel } from '../../model/news.model';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
})
export class NewsListComponent implements OnInit {
  public newsList: Array<NewsModel> = [];
  public sortValue: string = 'popularity';

  private category: string = 'home';
  private keyword: string = '';

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.onGetNewsByCategory();
    this.onGetNewsBySort();
    this.onGetNewsByKeyword();
  }

  onGetSortOptions() {
    return this.newsService.getSortOptions();
  }

  onGetNews(category: string, sort: string, keyword: string): void {
    this.newsService.getNews(category, sort, keyword).subscribe((news) => {
      this.newsList = news.data;
    });
  }

  onGetNewsByCategory(): void {
    this.keyword = '';
    this.route.paramMap.subscribe({
      next: (c) => {
        this.category = c.get('category')!;
        this.onGetNews(this.category, this.sortValue, this.keyword);
      },
    });
  }

  onGetNewsBySort(): void {
    this.route.queryParamMap.subscribe((param) => {
      const sortFilter = this.onGetSortOptions().filter(
        (s) => s.value === param.get('sort')
      );
      if (sortFilter.length > 0) {
        console.log(this.sortValue);
        this.onGetNews(this.category, this.sortValue, this.keyword);
      }
    });
  }

  onGetNewsByKeyword(): void {
    this.route.queryParamMap.subscribe((param) => {
      if (param.get('keyword')) {
        this.keyword = param.get('keyword')!;
        this.onGetNews(this.category, this.sortValue, param.get('keyword')!);
      }

      console.log(this.keyword);
      console.log(this.sortValue);
    });
  }
}
