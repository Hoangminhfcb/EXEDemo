package com.example.bakemarket.activities;

import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.bakemarket.R;
import com.example.bakemarket.adapters.CartAdapter;
import com.example.bakemarket.managers.CartManager;
import com.example.bakemarket.models.CartItem;

import java.util.List;

public class CartActivity extends AppCompatActivity {
    private RecyclerView cartRecyclerView;
    private TextView totalPriceText;
    private Button checkoutButton;
    private CartAdapter cartAdapter;
    private List<CartItem> cartItems;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cart);

        // Setup ActionBar
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            getSupportActionBar().setTitle("Giỏ hàng");
        }

        // Initialize views
        cartRecyclerView = findViewById(R.id.cartRecyclerView);
        totalPriceText = findViewById(R.id.totalPriceText);
        checkoutButton = findViewById(R.id.checkoutButton);

        // Setup RecyclerView
        cartRecyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Load cart items
        loadCartItems();

        // Setup checkout button
        checkoutButton.setOnClickListener(v -> checkout());
    }

    private void loadCartItems() {
        cartItems = CartManager.getInstance().getCartItems();

        if (cartItems.isEmpty()) {
            // Show empty cart message
            Toast.makeText(this, "Giỏ hàng trống", Toast.LENGTH_SHORT).show();
        }

        // Setup adapter
        cartAdapter = new CartAdapter(this, cartItems, this::updateTotal);
        cartRecyclerView.setAdapter(cartAdapter);

        // Update total price
        updateTotal();
    }

    private void updateTotal() {
        long totalPrice = CartManager.getInstance().getTotalPrice();
        totalPriceText.setText(String.format("Tổng cộng: %,d VNĐ", totalPrice));

        // Enable/disable checkout button
        checkoutButton.setEnabled(!CartManager.getInstance().isEmpty());
    }

    private void checkout() {
        if (CartManager.getInstance().isEmpty()) {
            Toast.makeText(this, "Giỏ hàng trống", Toast.LENGTH_SHORT).show();
            return;
        }

        // Simulate checkout process
        Toast.makeText(this, "Đặt hàng thành công!", Toast.LENGTH_LONG).show();

        // Clear cart after successful checkout
        CartManager.getInstance().clearCart();

        // Refresh the view
        loadCartItems();
    }

    @Override
    public boolean onSupportNavigateUp() {
        onBackPressed();
        return true;
    }

    @Override
    protected void onResume() {
        super.onResume();
        // Refresh cart when returning to this activity
        loadCartItems();
    }
}