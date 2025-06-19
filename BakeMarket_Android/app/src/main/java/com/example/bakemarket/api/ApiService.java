package com.example.bakemarket.api;

import com.example.bakemarket.models.Product;
import com.example.bakemarket.models.User;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface ApiService {

    // GET - Lấy danh sách users
    @GET("api/users")
    Call<List<User>> getUsers();

    @GET("api/cakes")
    Call<List<Product>> getProducts();
}
