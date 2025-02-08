package com.example.demo;

public class Base62Encoder {
    private static final String ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int BASE = ALPHABET.length();

    public static String encode(long number) {
        StringBuilder result = new StringBuilder();
        while (number > 0) {
            result.insert(0, ALPHABET.charAt((int) (number % BASE)));
            number /= BASE;
        }
        return result.toString();
    }
}
