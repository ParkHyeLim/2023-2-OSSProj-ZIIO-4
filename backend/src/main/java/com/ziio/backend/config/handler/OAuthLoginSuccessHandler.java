package com.ziio.backend.config.handler;

import com.ziio.backend.entity.User;
import com.ziio.backend.repository.UserRepository;
import com.ziio.backend.service.UserService;
import com.ziio.backend.util.JwtUtil;
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
    @Autowired
    JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        // 토큰에서 email 추출
        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;

        String email = token.getPrincipal().getAttribute("email").toString();
        String name = token.getPrincipal().getAttribute("name").toString();
        log.info("LOGIN SUCCESS : EMAIL - {}, NAME - {}", email, name);

        // Jwt 토큰 발급
        String jwtToken = jwtUtil.generateToken(email, 3600000); // 1시간 동안 유효한 토큰

        // Jwt를 헤더에 담음
        response.setHeader("Authorization", "Bearer " + jwtToken);

        // Email로 기존 유저 & 신규 유저인지 확인
        // 1. 신규 유저인 경우 저장
        if (!userService.isUserExistsByEmail(email)) {
            log.info("{} NOT EXISTS. REGISTER", email);
            User user = new User();
            user.setEmail(email);
            user.setName(name);

            userService.save(user);
        }
        // 2. 기존 유저인 경우 log만 출력
        else {
            User existUser = userRepository.findUserByEmail(email);
            Long id = existUser.getId();
            log.info("{} EXISTS. ID : {}", email, id);
        }
        // 유저 리다이렉트 시, uri에 쿼리 파라미터로 jwt 토큰을 함께 보냄
        String redirectUri = "http://localhost:3000/login?jwt=" + jwtToken;
        getRedirectStrategy().sendRedirect(request, response, redirectUri);
        
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
