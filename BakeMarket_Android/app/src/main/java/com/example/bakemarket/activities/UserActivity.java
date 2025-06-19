package com.example.bakemarket.activities;

import static android.content.ContentValues.TAG;

import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.bakemarket.R;
import com.example.bakemarket.models.User;
import com.example.bakemarket.repositories.UserRepository;
import com.example.bakemarket.utils.NetworkUtils;

import java.util.List;

public class UserActivity extends AppCompatActivity {

    private UserRepository userRepository;
    private Button btnGetUsers;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user);

        // Khởi tạo repository
        userRepository = new UserRepository();

        // Tìm views
        btnGetUsers = findViewById(R.id.btnGetUsers);

        // Thiết lập sự kiện click
        btnGetUsers.setOnClickListener(v -> loadUsers());

    }

    private void loadUsers() {
        // Kiểm tra kết nối mạng
        if (!NetworkUtils.isNetworkAvailable(this)) {
            Toast.makeText(this, "Không có kết nối mạng", Toast.LENGTH_SHORT).show();
            return;
        }

        // Hiển thị loading
        Toast.makeText(this, "Đang tải dữ liệu...", Toast.LENGTH_SHORT).show();

        userRepository.getUsers(new UserRepository.ApiCallback<List<User>>() {
            @Override
            public void onSuccess(List<User> users) {
                // Chạy trên UI thread
                runOnUiThread(() -> {
                    Log.d(TAG, "Tải thành công " + users.size() + " users");
                    Toast.makeText(UserActivity.this,
                            "Tải thành công " + users.size() + " users",
                            Toast.LENGTH_SHORT).show();

                    // Hiển thị dữ liệu
                    for (User user : users) {
                        Log.d(TAG, user.toString());
                    }
                });
            }

            @Override
            public void onError(String error) {
                runOnUiThread(() -> {
                    Log.e(TAG, "Lỗi: " + error);
                    Toast.makeText(UserActivity.this,
                            "Lỗi: " + error,
                            Toast.LENGTH_LONG).show();
                });
            }
        });
    }
}