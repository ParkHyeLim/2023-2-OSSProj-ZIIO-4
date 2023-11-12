package com.ziio.backend.service;

import com.ziio.backend.entity.User;
import com.ziio.backend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserService extends DefaultOAuth2UserService {

    @Autowired
    UserRepository userRepository;

    // 사용자 저장 또는 업데이트
    public void save(User user) {
        userRepository.save(user);
    }

    // 이메일로 기존에 로그인한 회원인지 찾기
    public boolean isUserExistsByEmail(String email) {
        return userRepository.findUserByEmail(email) != null;
    }
}
