package com.example.bakemarket.activities;

import static android.content.ContentValues.TAG;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.appcompat.widget.Toolbar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.bakemarket.R;
import com.example.bakemarket.adapters.ProductAdapter;
import com.example.bakemarket.models.Product;
import com.example.bakemarket.repositories.ProductRepository;
import com.example.bakemarket.utils.NetworkUtils;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    private RecyclerView recyclerView;
    private ProductAdapter productAdapter;
    private List<Product> productList;
    private ProductRepository productRepository;
    private ProgressBar progressBar; // Optional: thêm loading indicator

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        // Initialize views
        recyclerView = findViewById(R.id.recyclerView);
        // progressBar = findViewById(R.id.progressBar); // Nếu có trong layout

        // Setup RecyclerView
        recyclerView.setLayoutManager(new GridLayoutManager(this, 2));

        // Initialize product list as empty list
        productList = new ArrayList<>();

        // Setup adapter with empty list first
        productAdapter = new ProductAdapter(this, productList);
        recyclerView.setAdapter(productAdapter);

        productRepository = new ProductRepository();

        // Load products
        loadProducts();
    }

    private void loadProducts() {
        // Kiểm tra kết nối mạng
        if (!NetworkUtils.isNetworkAvailable(this)) {
            Toast.makeText(this, "Không có kết nối mạng", Toast.LENGTH_SHORT).show();
            showEmptyState();
            return;
        }

        // Hiển thị loading
        showLoadingState();

        productRepository.getProducts(new ProductRepository.ApiCallback<List<Product>>() {
            @Override
            public void onSuccess(List<Product> products) {
                // Chạy trên UI thread
                runOnUiThread(() -> {
                    Log.d(TAG, "Tải thành công " + products.size() + " products");
                    Toast.makeText(MainActivity.this,
                            "Tải thành công " + products.size() + " products",
                            Toast.LENGTH_SHORT).show();

                    // Cập nhật dữ liệu và notify adapter
                    updateProductList(products);
                    hideLoadingState();
                });
            }

            @Override
            public void onError(String error) {
                runOnUiThread(() -> {
                    Log.e(TAG, "Lỗi: " + error);
                    Toast.makeText(MainActivity.this,
                            "Lỗi: " + error,
                            Toast.LENGTH_LONG).show();

                    showErrorState();
                    hideLoadingState();
                });
            }
        });
    }

    private void updateProductList(List<Product> products) {
        if (products != null && !products.isEmpty()) {
            // Clear old data and add new data
            productList.clear();
            productList.addAll(products);

            // Notify adapter về sự thay đổi
            productAdapter.notifyDataSetChanged();

            // Hoặc sử dụng method cụ thể hơn trong adapter nếu có
            // productAdapter.updateProducts(products);
        } else {
            showEmptyState();
        }
    }

    private void showLoadingState() {
        // Hiển thị loading
        Toast.makeText(this, "Đang tải dữ liệu...", Toast.LENGTH_SHORT).show();

        // Nếu có ProgressBar
        // if (progressBar != null) {
        //     progressBar.setVisibility(View.VISIBLE);
        // }

        // Ẩn RecyclerView trong lúc loading (optional)
        // recyclerView.setVisibility(View.GONE);
    }

    private void hideLoadingState() {
        // Ẩn loading indicator
        // if (progressBar != null) {
        //     progressBar.setVisibility(View.GONE);
        // }

        // Hiển thị lại RecyclerView
        // recyclerView.setVisibility(View.VISIBLE);
    }

    private void showEmptyState() {
        // Xử lý khi không có dữ liệu
        productList.clear();
        productAdapter.notifyDataSetChanged();

        // Có thể hiển thị empty state view
        Toast.makeText(this, "Không có sản phẩm nào", Toast.LENGTH_SHORT).show();
    }

    private void showErrorState() {
        // Xử lý khi có lỗi
        showEmptyState();

        // Có thể thêm retry button hoặc error message
    }

    // Method để refresh data (có thể gọi từ pull-to-refresh)
    public void refreshProducts() {
        loadProducts();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == R.id.action_cart) {
            Intent intent = new Intent(this, CartActivity.class);
            startActivity(intent);
            return true;
        }
        if (item.getItemId() == R.id.action_profile) {
            Intent intent = new Intent(this, UserActivity.class);
            startActivity(intent);
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}