import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WebSocketService } from './_services/websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  toastMessage: string | null = null;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.connect();
    this.webSocketService.notifications.subscribe(msg => {
      this.toastMessage = msg;
      setTimeout(() => {
        this.toastMessage = null;
      }, 5000);
    });
  }
}
