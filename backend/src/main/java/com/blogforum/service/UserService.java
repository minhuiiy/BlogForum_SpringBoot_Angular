package com.blogforum.service;

import com.blogforum.model.User;
import com.blogforum.payload.request.UserProfileRequest;
import com.blogforum.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getCurrentUserProfile() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
    }

    @Transactional
    public User updateCurrentUserProfile(UserProfileRequest profileRequest) {
        User user = getCurrentUserProfile();
        if (profileRequest.getBio() != null) {
            user.setBio(profileRequest.getBio());
        }
        if (profileRequest.getAvatarUrl() != null) {
            user.setAvatarUrl(profileRequest.getAvatarUrl());
        }
        return userRepository.save(user);
    }
}
