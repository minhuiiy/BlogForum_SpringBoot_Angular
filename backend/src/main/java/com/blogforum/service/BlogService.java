package com.blogforum.service;

import com.blogforum.model.Post;
import com.blogforum.model.User;
import com.blogforum.repository.PostRepository;
import com.blogforum.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BlogService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Page<Post> getAllPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }

    public Post createPost(Post post) {
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            throw new RuntimeException("No authentication found in security context");
        }
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }
        
        if ("anonymousUser".equals(username)) {
            throw new RuntimeException("Cannot create post as anonymous user");
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
        post.setAuthor(user);
        return postRepository.save(post);
    }

    public Post updatePost(Post post) {
        return postRepository.save(post);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    public List<Post> searchPosts(String query) {
        return postRepository.findByTitleContainingIgnoreCase(query);
    }

    @Transactional
    public Post likePost(Long postId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found: " + postId));

        if (post.getLikedByUsers().contains(user)) {
            post.getLikedByUsers().remove(user);
            post.setLikes(Math.max(0, post.getLikes() - 1));
        } else {
            post.getLikedByUsers().add(user);
            post.setLikes(post.getLikes() + 1);
        }

        return postRepository.save(post);
    }
}
