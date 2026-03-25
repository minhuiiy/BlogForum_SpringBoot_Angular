package com.blogforum.config;

import com.blogforum.model.ERole;
import com.blogforum.model.Role;
import com.blogforum.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role(null, ERole.ROLE_USER));
            roleRepository.save(new Role(null, ERole.ROLE_MODERATOR));
            roleRepository.save(new Role(null, ERole.ROLE_ADMIN));
            System.out.println("Roles have been seeded successfully!");
        }
    }
}
