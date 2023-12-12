package com.ziio.backend.config;

import com.ziio.backend.config.handler.OAuthLoginFailureHandler;
import com.ziio.backend.config.handler.OAuthLoginSuccessHandler;
import com.ziio.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

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
                // cors 관련 설정
                .cors().configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowCredentials(true);
                    config.setAllowedOrigins(List.of("https://2023-2-oss-proj-ziio-4.vercel.app")); // vercel 접근 허용
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setExposedHeaders(List.of("*"));
                    return config;
                })
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/login/**").permitAll()
                .antMatchers("/user/**").permitAll()
                .antMatchers("/academics/**").permitAll()
                .antMatchers("/notices/**").permitAll()
                .antMatchers("/bookmarks/**").permitAll()
                .antMatchers("/mypages/**").permitAll()
                .antMatchers("/scraps/**").permitAll()
                .antMatchers("/health-check/**").permitAll()
                .anyRequest().authenticated()
                .and()
                // 구글 OAuth 2.0 로그인 관련 설정
                .oauth2Login()
                .userInfoEndpoint()
                .userService(userService)
                .and()
                .successHandler(oAuthLoginSuccessHandler)
                .failureHandler(oAuthLoginFailureHandler);
    }
}