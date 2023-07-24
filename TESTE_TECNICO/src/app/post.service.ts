import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from './IPost';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL:string = 'https://jsonplaceholder.typicode.com/posts';
  public isPost: boolean = true;

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.apiURL)
  }

  getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.apiURL}/${id}`);
  }

  searchPostsByTitle(title: string): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.apiURL).pipe(
      map(data => {
        let titles = data.map(item => item);
        if (title) {
          titles = titles.filter(ptitle => ptitle.title.includes(title));
        }
        return titles;

      }))

  }
}


