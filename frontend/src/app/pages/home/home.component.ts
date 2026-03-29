import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../../_services/blog.service';
import { ForumService } from '../../_services/forum.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  questions: any[] = [];
  techNews: any[] = [];
  loadingNews = true;

  constructor(
    private blogService: BlogService,
    private forumService: ForumService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.blogService.getAllPosts().subscribe({
      next: data => {
        this.posts = data.content || data; // handle pagination format
      },
      error: err => console.error(err)
    });

    this.forumService.getAllQuestions().subscribe({
      next: data => {
        this.questions = data.content || data;
      },
      error: err => console.error(err)
    });

    // Fetch Tech News from Hacker News API
    this.http.get<number[]>('https://hacker-news.firebaseio.com/v0/topstories.json').subscribe({
      next: ids => {
        const top5 = ids.slice(0, 5);
        top5.forEach(id => {
          this.http.get<any>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).subscribe(story => {
            this.techNews.push(story);
            if (this.techNews.length === 5) {
              this.loadingNews = false;
            }
          });
        });
      },
      error: () => this.loadingNews = false
    });
  }
}
