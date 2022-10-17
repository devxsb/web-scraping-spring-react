package com.safalifter.ecommerce.service;

import com.safalifter.ecommerce.model.User;
import com.safalifter.ecommerce.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {
        return userRepository.save(user);
    }

    public User getUser(String username) {
        return userRepository.findUserByUsername(username);
    }
}
