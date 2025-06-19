# 🎂 BakeMarket – Kết nối Tiệm Bánh và Người Mua

**BakeMarket** là một nền tảng trung gian kết nối các **tiệm bánh** với **người mua**, khởi nguồn từ môn học EXE. Dự án gồm **website** và **ứng dụng Android**, mang lại trải nghiệm tiện lợi, hiện đại và dễ triển khai.

---

## 📌 Tổng quan

- **🎯 Mục tiêu**: Tạo cầu nối thân thiện giữa tiệm bánh và khách hàng.  
- **📦 Phạm vi**: Website, RESTful API và ứng dụng Android.  
- **🌟 Đặc điểm nổi bật**:
  - Tối ưu SEO (SSR).
  - Giao diện thân thiện, dễ sử dụng.
  - Triển khai đơn giản bằng Docker.

---

## 🚀 Demo & Triển khai

- 🌐 Website: [https://exe.zanis.id.vn](https://exe.zanis.id.vn)  
- 🔌 API: [https://api.zanis.id.vn](https://api.zanis.id.vn)

---

## 🧱 Kiến trúc hệ thống

| Thành phần         | Công nghệ sử dụng                  | Mô tả                          |
|--------------------|------------------------------------|--------------------------------|
| **Backend API**    | ASP.NET Core, Entity Framework     | Cung cấp RESTful API           |
| **Frontend Web**   | Next.js (React), Tailwind CSS      | SSR tối ưu SEO, giao diện UI   |
| **Ứng dụng Android**| Android (Java), Retrofit, WebSocket| Giao diện di động thân thiện  |
| **Lưu trữ ảnh**    | NextCloud tự host                  | Lưu ảnh sản phẩm & người dùng |
| **Triển khai**     | Docker, Docker Compose             | Triển khai đồng bộ nhiều dịch vụ |

---

## 🛠️ Công nghệ sử dụng

### 🔧 Backend
- ASP.NET Core 7+
- Entity Framework (Code First)
- RESTful APIs

### 🎨 Frontend
- Next.js (React)
- Axios
- Tailwind CSS

### 📱 Mobile App
- Android Studio (Java)
- Retrofit
- WebSocket

### ☁️ Công cụ khác
- Lưu trữ ảnh: NextCloud tự host
- Triển khai: Docker & Docker Compose

---

## ⚙️ Hướng dẫn cài đặt

### 🐳 Sử dụng Docker Compose

**Yêu cầu:**
- Cài đặt [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

**Cách chạy:**
```bash
docker-compose up --build
```

**Truy cập dịch vụ:**
- Frontend: `http://localhost:3000`
- API: `http://localhost:5000`

> 💡 Lưu ý: Kiểm tra và điều chỉnh file `.env` hoặc `docker-compose.yml` nếu cần cấu hình riêng.

---

### 📱 Chạy ứng dụng Android

1. Mở thư mục `android-app` bằng Android Studio.
2. Cấu hình `baseUrl` của API:
   - Local: `http://10.0.2.2:5000`
   - Production: `https://api.zanis.id.vn`
3. Build và chạy ứng dụng trên máy ảo hoặc thiết bị thật.

---

## 👥 Thành viên nhóm

| Thành viên              | Vai trò                |
|-------------------------|------------------------|
| Hoàng Lê Nhật Minh      | Backend & DevOps       |
| Minh Hoàng Lê Nhật      | Frontend               |
| Nhật Minh Hoàng Lê      | Mobile App             |

> 😄 Các contributor khác chủ yếu hỗ trợ tinh thần và "chạy KPI".

---

## 📜 Giấy phép

Dự án được phát triển cho **mục đích học tập và phi thương mại**.  
Vui lòng liên hệ nhóm nếu bạn muốn sử dụng trong các hoạt động thương mại.
