package com.blogforum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendNotification(String username, String message) {
        // Send a direct message to a specific user
        messagingTemplate.convertAndSendToUser(username, "/queue/notifications", message);
    }
    
    public void sendPublicNotification(String message) {
        // Send a broadcast message
        messagingTemplate.convertAndSend("/topic/public", message);
    }
}
