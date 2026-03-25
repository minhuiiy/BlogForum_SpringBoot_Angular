import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = '/api/v1/posts';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<any> {
    return this.http.get(API_URL);
  }

  getPostById(id: number): Observable<any> {
    return this.http.get(`${API_URL}/${id}`);
  }

  createPost(postData: any): Observable<any> {
    return this.http.post(API_URL, postData);
  }
}
