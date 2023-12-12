package com.ziio.backend.config.handler;

import com.ziio.backend.entity.User;
import com.ziio.backend.repository.UserRepository;
import com.ziio.backend.service.UserService;
import com.ziio.backend.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

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
    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;
    final String REDIRECT_URI = "https://dgu-campus-calendar-ziio.vercel.app/login?jwt=";
    final long TOKEN_EXPIRATION_TIME = 3600000; // 1시간 동안 유효한 토큰

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;

        // 토큰에서 email, name 추출
        String email = token.getPrincipal().getAttribute("email").toString();
        String name = token.getPrincipal().getAttribute("name").toString();

        final Authentication authenticationObject = SecurityContextHolder.getContext().getAuthentication();
        if (authenticationObject != null) {
            // OAuth2AuthorizedClientService를 통해 액세스 토큰 가져오기
            OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
                    token.getAuthorizedClientRegistrationId(),
                    token.getName());
            OAuth2AccessToken accessToken = authorizedClient.getAccessToken();

            log.info("LOGIN SUCCESS: EMAIL - {}, NAME - {}, ACCESS TOKEN - {}", email, name, accessToken.getTokenValue());

            // Email로 기존 사용자 & 신규 사용자인지 확인
            User user = userRepository.findUserByEmail(email);
            if (user == null) {
                // 1. 신규 사용자인 경우 저장
                log.info("{} NOT EXISTS. REGISTER", email);
                user = new User();
                user.setEmail(email);
                user.setName(name);
            } else {
                // 2. 기존 사용자인 경우 액세스 토큰 업데이트 및 로그 출력
                log.info("{} EXISTS. ID : {}", email, user.getId());
            }

            // 액세스 토큰 업데이트
            user.setAccessToken(accessToken.getTokenValue());
            userService.save(user);

            // Jwt 토큰 발급
            String jwtToken = jwtUtil.generateToken(email, TOKEN_EXPIRATION_TIME);

            // 사용자 리다이렉트 시, uri에 쿼리 파라미터로 jwt 토큰을 함께 보냄
            String redirectUri = REDIRECT_URI + jwtToken;
            getRedirectStrategy().sendRedirect(request, response, redirectUri);
        }
    }
}