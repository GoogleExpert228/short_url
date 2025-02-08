package com.example.demo.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "short_urls")
public class ShortUrl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Автоинкрементный первичный ключ
    private Long id;

    @Column(nullable = false, unique = true)  // Оригинальная ссылка должна быть уникальной
    private String originalUrl;

    @Column(nullable = false, unique = true)  // Короткий идентификатор тоже должен быть уникальным
    private String shortCode = "default";

    public ShortUrl() { }

    public ShortUrl(String originalUrl) {
        this.originalUrl = originalUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOriginalUrl() {
        return originalUrl;
    }

    public void setOriginalUrl(String originalUrl) {
        this.originalUrl = originalUrl;
    }

    public String getShortCode() {
        return shortCode;
    }

    public void setShortCode(String shortCode) {
        this.shortCode = shortCode;
    }
}
