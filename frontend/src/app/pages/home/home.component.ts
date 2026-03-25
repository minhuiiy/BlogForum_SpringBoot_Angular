import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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

  constructor(
    private blogService: BlogService,
    private forumService: ForumService
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
  }
}
