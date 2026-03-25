import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BlogService } from '../../_services/blog.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  form: any = {
    title: '',
    content: ''
  };
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  constructor(private blogService: BlogService, private router: Router) {}

  onSubmit(): void {
    if (!this.form.title || !this.form.content) {
      this.errorMessage = 'Tiêu đề và Nội dung không được để trống';
      this.isFailed = true;
      return;
    }
    
    this.blogService.createPost(this.form).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isFailed = false;
        setTimeout(() => {
          this.router.navigate(['/post', data.id || '']);
        }, 1500);
      },
      error: err => {
        this.errorMessage = err.error.message || 'Lỗi khi đăng bài';
        this.isFailed = true;
      }
    });
  }
}
