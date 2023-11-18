package com.ziio.backend.config.handler;

import com.ziio.backend.entity.User;
import com.ziio.backend.repository.UserRepository;
import com.ziio.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class OAuthLoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        // 토큰에서 email 추출
        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;

        String email = token.getPrincipal().getAttribute("email").toString();
        String name = token.getPrincipal().getAttribute("name").toString();
        log.info("LOGIN SUCCESS : EMAIL - {}, NAME - {}", email, name);

        // Email로 기존 유저 & 신규 유저인지 확인
        // 1. 신규 유저인 경우 저장
        if (!userService.isUserExistsByEmail(email)) {
            log.info("{} NOT EXISTS. REGISTER", email);
            User user = new User();
            user.setEmail(email);
            user.setName(name);

            userService.save(user);
        }
        // 2. 기존 유저인 경우 id 반환 (추후 추가)
        else {
            User existUser = userRepository.findUserByEmail(email);
            Long id = existUser.getId();
            log.info("{} EXISTS. ID : {}", email, id);
        }

        getRedirectStrategy().sendRedirect(request, response, "http://localhost:3000/login");

        super.onAuthenticationSuccess(request, response, authentication);

    }
}
