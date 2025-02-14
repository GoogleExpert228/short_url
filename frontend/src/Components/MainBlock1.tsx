import React, { useState } from "react";
import axios from "axios";
import "../components/styles/mainBlock1.css";

function MainBlock1() {
    const [originalUrl, setOriginalUrl] = useState<string>("");
    const [shortUrl, setShortUrl] = useState<string>("");
    const [copyText, setCopyText] = useState<string>("Copy");
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Обработчик изменения текста в поле ввода
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOriginalUrl(event.target.value);
        setError(null); // Сбрасываем ошибку при вводе
    };

    // Обработчик отправки формы
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!originalUrl.trim()) {
            setError("Please enter a valid URL");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/urls", originalUrl, {
                headers: { "Content-Type": "application/json" },
            });

            setShortUrl(response.data.shortCode);
            setOriginalUrl("");
        } catch (error) {
            console.error("Error creating short URL:", error);
            setError("Failed to shorten URL. Please try again.");
        }
    };

    const handleCopy = () => {
        if (shortUrl) {
            navigator.clipboard.writeText(`http://localhost:8080/api/${shortUrl}`);
            setCopyText("Copied!");
            setIsCopied(true);

            // Через 2 секунды возвращаем кнопку в исходное состояние
            setTimeout(() => {
                setCopyText("Copy");
                setIsCopied(false);
            }, 2000);
        }
    };

    return (
        <div className="mainBlock1">
            <div className="content">
                <h2 className="title">URL Shortener Service</h2>
                <p className="subtitle">Enter a URL to get a short link</p>

                <form className="form" onSubmit={handleSubmit}>
                    <input
                        className={`input ${error ? "input-error" : ""}`}
                        type="text"
                        value={originalUrl}
                        onChange={handleInputChange}
                        placeholder="Enter URL"
                    />
                    <button className="button" type="submit">Shorten URL</button>
                </form>

                {error && <p className="error-text">{error}</p>}

                {shortUrl && (
                    <div className="result fade-in">
                        <p className="short-url-text">Your short URL:</p>
                        <div className="short-url-container">
                            <a
                                href={`http://localhost:8080/api/${shortUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="short-url-link"
                            >
                                http://localhost:8080/api/{shortUrl}
                            </a>
                            <button
                                className={`copy-button ${isCopied ? "copied" : ""}`}
                                onClick={handleCopy}
                            >
                                {copyText}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MainBlock1;
