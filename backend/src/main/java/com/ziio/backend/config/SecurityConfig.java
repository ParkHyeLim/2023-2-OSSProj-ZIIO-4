package com.ziio.backend.config;

import com.ziio.backend.config.handler.OAuthLoginFailureHandler;
import com.ziio.backend.config.handler.OAuthLoginSuccessHandler;
import com.ziio.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    UserService userService;
    @Autowired
    OAuthLoginSuccessHandler oAuthLoginSuccessHandler;
    @Autowired
    OAuthLoginFailureHandler oAuthLoginFailureHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                    // 로그인 페이지는 누구나 접근 가능
                    .antMatchers("/login/**").permitAll()
                    .anyRequest().authenticated()
                    .and()
                // oauth 로그인 설정
                .oauth2Login()
                    // loginPage가 따로 없으면, 기본 페이지가 나옴
                    .userInfoEndpoint()
                    .userService(userService)
                    .and()
                // 성공, 실패 핸들러 등록
                .successHandler(oAuthLoginSuccessHandler)
                .failureHandler(oAuthLoginFailureHandler);
    }
}