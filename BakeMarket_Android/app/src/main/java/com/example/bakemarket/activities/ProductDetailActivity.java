package com.example.bakemarket.activities;

import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.bumptech.glide.Glide;
import com.example.bakemarket.R;
import com.example.bakemarket.managers.CartManager;
import com.example.bakemarket.models.Product;

public class ProductDetailActivity extends AppCompatActivity {
    private ImageView productImage;
    private TextView productName;
    private TextView productDescription;
    private TextView productPrice;
    private Button addToCartButton;

    private Product currentProduct;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_detail);

        // Setup ActionBar
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            getSupportActionBar().setTitle("Chi tiết sản phẩm");
        }

        // Initialize views
        productImage = findViewById(R.id.productDetailImage);
        productName = findViewById(R.id.productDetailName);
        productDescription = findViewById(R.id.productDetailDescription);
        productPrice = findViewById(R.id.productDetailPrice);
        addToCartButton = findViewById(R.id.addToCartButton);

        // Get product data from intent
        getProductData();

        // Display product information
        displayProductInfo();

        // Setup add to cart button
        addToCartButton.setOnClickListener(v -> addToCart());
    }

    private void getProductData() {
        String id = getIntent().getStringExtra("product_id");
        String name = getIntent().getStringExtra("product_name");
        String description = getIntent().getStringExtra("product_description");
        int price = getIntent().getIntExtra("product_price", 0);
        String imageUrl = getIntent().getStringExtra("product_image");

        currentProduct = new Product(id, name, description, price, imageUrl);
    }

    private void displayProductInfo() {
        productName.setText(currentProduct.getName());
        productDescription.setText(currentProduct.getDescription());
        productPrice.setText(currentProduct.getFormattedPrice());

        Glide.with(this)
                .load("https://api.zanis.id.vn/api/images/file/" + currentProduct.getThumbnailUrl())
                .placeholder(R.drawable.ic_placeholder)
                .error(R.drawable.ic_placeholder)
                .into(productImage);
    }

    private void addToCart() {
        // Add product to cart using CartManager
        CartManager.getInstance().addToCart(currentProduct);

        Toast.makeText(this, "Đã thêm vào giỏ hàng", Toast.LENGTH_SHORT).show();
    }

    @Override
    public boolean onSupportNavigateUp() {
        onBackPressed();
        return true;
    }
}