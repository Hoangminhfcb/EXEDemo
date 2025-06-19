package com.example.bakemarket.models;

import java.io.Serializable;

public class Product implements Serializable {
    private String id;
    private String name;
    private String description;
    private int price;
    private String thumbnailUrl;

    public Product(String id, String name, String description, int price, String thumbnailUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.thumbnailUrl = thumbnailUrl;
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getPrice() {
        return price;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setThumbnailUrl(String imageUrl) {
        this.thumbnailUrl = imageUrl;
    }

    // Format price to Vietnamese currency
    public String getFormattedPrice() {
        return String.format("%,d VNĐ", price);
    }
}