import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { TokenStorageService } from './token-storage.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client;
  public notifications = new Subject<string>();

  constructor(private tokenStorage: TokenStorageService) {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      
      const user = this.tokenStorage.getUser();
      if (user && user.username) {
        this.stompClient.subscribe(`/user/${user.username}/queue/notifications`, (message) => {
          this.notifications.next(message.body);
        });
      }
      
      this.stompClient.subscribe('/topic/public', (message) => {
        this.notifications.next(message.body);
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };
  }

  public connect(): void {
    if (!this.stompClient.active) {
      this.stompClient.activate();
    }
  }

  public disconnect(): void {
    if (this.stompClient.active) {
      this.stompClient.deactivate();
    }
  }
}
