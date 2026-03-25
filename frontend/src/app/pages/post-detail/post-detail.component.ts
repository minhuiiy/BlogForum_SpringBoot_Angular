import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../_services/blog.service';
import { CommentService } from '../../_services/comment.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { WebSocketService } from '../../_services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post: any = null;
  comments: any[] = [];
  postId!: number;
  newCommentContent = '';
  isLoggedIn = false;
  currentUser: any;
  wsSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private commentService: CommentService,
    private tokenStorage: TokenStorageService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorage.getUser();
    }
    
    this.route.params.subscribe(params => {
      this.postId = +params['id'];
      this.loadPost();
      this.loadComments();
    });

    this.wsSubscription = this.webSocketService.notifications.subscribe(msg => {
      if (msg.includes('bình luận') || msg.includes('post')) {
        this.loadComments();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
  }

  loadPost(): void {
    this.blogService.getPostById(this.postId).subscribe({
      next: data => this.post = data,
      error: err => console.error(err)
    });
  }

  loadComments(): void {
    this.commentService.getCommentsByPost(this.postId).subscribe({
      next: data => this.comments = data,
      error: err => console.error(err)
    });
  }

  submitComment(): void {
    if (!this.newCommentContent.trim()) return;
    this.commentService.addComment(this.postId, this.newCommentContent).subscribe({
      next: data => {
        this.newCommentContent = '';
        this.loadComments();
      },
      error: err => console.error(err)
    });
  }
}
