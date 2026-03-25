import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { AuthGuard } from './_helpers/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'post/:id', component: PostDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
