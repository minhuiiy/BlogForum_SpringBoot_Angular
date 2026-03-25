package com.blogforum.repository;

import com.blogforum.model.Post;
import com.blogforum.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findAll(Pageable pageable);
    Page<Post> findByAuthor(User author, Pageable pageable);
    Page<Post> findByCategoryId(Long categoryId, Pageable pageable);
    Page<Post> findByTagsName(String tagName, Pageable pageable);
    List<Post> findByTitleContainingIgnoreCase(String title);
}
