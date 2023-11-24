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

import java.util.Arrays;

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
                .cors().configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // 3000 port 접근 허용
                    config.setAllowedMethods(Arrays.asList("GET", "POST", "HEAD", "OPTIONS"));
                    config.setAllowedHeaders(Arrays.asList("*"));
                    return config;
                })
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/login/**").permitAll()
                .antMatchers("/academics/**").permitAll()
                .antMatchers("/notices/**").permitAll()
                .antMatchers("/user/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
                .userInfoEndpoint()
                .userService(userService)
                .and()
                .successHandler(oAuthLoginSuccessHandler)
                .failureHandler(oAuthLoginFailureHandler);
    }
}