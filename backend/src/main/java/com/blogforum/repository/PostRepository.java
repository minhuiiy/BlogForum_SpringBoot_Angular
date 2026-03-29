package com.blogforum.repository;

import com.blogforum.model.Post;
import com.blogforum.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    @EntityGraph(attributePaths = {"author", "category"})
    Page<Post> findAll(Pageable pageable);

    @EntityGraph(attributePaths = {"author", "category"})
    Page<Post> findByAuthor(User author, Pageable pageable);

    @EntityGraph(attributePaths = {"author", "category"})
    Page<Post> findByCategoryId(Long categoryId, Pageable pageable);

    @EntityGraph(attributePaths = {"author", "category"})
    Page<Post> findByTagsName(String tagName, Pageable pageable);

    @EntityGraph(attributePaths = {"author", "category"})
    List<Post> findByTitleContainingIgnoreCase(String title);
}
