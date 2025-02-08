package com.example.demo.Controllers;

import com.example.demo.Base62Encoder;
import com.example.demo.Entities.ShortUrl;
import com.example.demo.Repositories.ShortUrlRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;

@RestController
@RequestMapping("/api")  // Теперь все маршруты будут начинаться с /api
public class UrlController {
    private final ShortUrlRepository shortUrlRepository;

    public UrlController(ShortUrlRepository shortUrlRepository) {
        this.shortUrlRepository = shortUrlRepository;
    }

    @GetMapping("/urls")  // Теперь путь будет /api/urls
    public List<ShortUrl> getAllUrls() {
        return shortUrlRepository.findAll();
    }

    @GetMapping("/{shortCode}")  // Путь для редиректа: /api/{shortCode}
    public RedirectView redirectToOriginal(@PathVariable String shortCode) {
        // Получаем ShortUrl по shortCode
        ShortUrl shortUrl = shortUrlRepository.findByShortCode(shortCode).orElse(null);

        if (shortUrl != null) {
            // Убираем кавычки и лишние пробелы из оригинального URL
            String cleanUrl = shortUrl.getOriginalUrl().replace("\"", "").trim();
            // Выполняем редирект на очищенный URL
            return new RedirectView(cleanUrl);
        } else {
            // Если не найден, возвращаем редирект на страницу ошибки
            return new RedirectView("/not-found");
        }
    }

    @PostMapping("/urls")  // Путь для добавления короткой ссылки: /api/urls
    public ResponseEntity<ShortUrl> addShortUrl(@RequestBody String originalUrl) {
        // Создаем объект ShortUrl с полученным URL и дефолтным shortCode
        ShortUrl shortUrl = new ShortUrl(originalUrl);

        // Сохраняем URL в базе данных с дефолтным shortCode
        ShortUrl savedUrl = shortUrlRepository.save(shortUrl);

        // Генерируем shortCode на основе ID
        String shortCode = Base62Encoder.encode(savedUrl.getId());
        savedUrl.setShortCode(shortCode);

        // Сохраняем запись снова с сгенерированным shortCode
        ShortUrl finalSavedUrl = shortUrlRepository.save(savedUrl);

        return ResponseEntity.ok(finalSavedUrl);
    }
}
