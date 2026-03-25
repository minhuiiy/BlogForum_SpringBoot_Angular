import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: '',
    password: ''
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login({ username, password }).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser({ username: data.username, id: data.id, email: data.email, roles: data.roles });
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      error: err => {
        this.errorMessage = err.error.message || 'Login failed';
        this.isLoginFailed = true;
      }
    });
  }
}
