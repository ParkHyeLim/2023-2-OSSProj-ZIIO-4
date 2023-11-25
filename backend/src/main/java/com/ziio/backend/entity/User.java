package com.ziio.backend.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.oauth2.core.OAuth2AccessToken;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private OAuth2AccessToken accessToken;
}
