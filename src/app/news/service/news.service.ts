import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NewsModel } from '../model/news.model';
import { ResponseModel } from '../model/response.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly apiUrl = 'http://api.mediastack.com/v1';
  private readonly apiKey = '5103c5aed6af928e56587d524151233b';

  private readonly sortOptions = [
    { name: 'Descend', value: 'published_desc' },
    { name: 'Ascend', value: 'published_asc' },
    { name: 'Popular', value: 'popularity' },
  ];

  private readonly categories = [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ];

  constructor(private http: HttpClient) {}

  getNews(category: string, sort: string, keyword: string): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/news`, {
        params: new HttpParams()
          .set('access_key', this.apiKey)
          .set('languages', 'en')
          .set('countries', 'ph')
          .set('categories', this.specifiedCategory(category))
          .set('sort', sort)
          .set('keywords', keyword)
          .set('date', this.dateToday()),
      })
      .pipe(map(this.newsFormat));
  }

  getSortOptions() {
    return this.sortOptions;
  }

  private specifiedCategory(category: string): string {
    const excludedCategory = this.categories
      .filter((c) => c !== category)
      .map((c) => `-${c}`)
      .join(',');

    const includeCategory = this.categories.map((c) => `${c}`).join(',');

    return category === 'home'
      ? `${includeCategory}`
      : `${category},${excludedCategory}`;
  }

  private newsFormat(response: ResponseModel): ResponseModel {
    return {
      pagination: { ...response.pagination },
      data: response.data.map(
        (news: any) =>
          <NewsModel>{
            title: news.title,
            author: news.author,
            description: news.description,
            source: news.source,
            url: news.url,
            imgUrl: news.image,
            category: news.category,
            published: news.published_at,
          }
      ),
    };
  }

  private dateToday(): string {
    const today = new Date();
    console.log(
      `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - 1}`
    );
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  }
}
