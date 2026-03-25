package com.blogforum.repository;

import com.blogforum.model.Question;
import com.blogforum.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findAll(Pageable pageable);
    Page<Question> findByAuthor(User author, Pageable pageable);
    Page<Question> findByTagsName(String tagName, Pageable pageable);
    List<Question> findByTitleContainingIgnoreCase(String title);
}
