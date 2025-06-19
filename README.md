# 🍰 BakeMarket – Kết nối Tiệm Bánh và Người Mua

Dự án được khởi đầu cho môn học **EXE**, với mục tiêu xây dựng một **nền tảng trung gian kết nối các tiệm bánh với người mua bánh**. 
Về sau, dự án được mở rộng để hỗ trợ **ứng dụng Android**, mang lại trải nghiệm tiện lợi hơn cho người dùng di động.

---

## 🚀 Demo & Triển khai

- 🌐 Website: [https://exe.zanis.id.vn](https://exe.zanis.id.vn)
- 🔌 API: [https://api.zanis.id.vn](https://api.zanis.id.vn)

---

## 🧱 Kiến trúc hệ thống

Dự án bao gồm các thành phần chính như sau:

| Thành phần         | Công nghệ sử dụng                        | Ghi chú |
|--------------------|-------------------------------------------|--------|
| 🎯 Backend API     | ASP.NET Core, Entity Framework            | Cung cấp các API RESTful |
| 🌐 Frontend Web    | Next.js (React), Tailwind CSS             | Tối ưu SEO với SSR |
| 📱 Ứng dụng Android| Android (Java)                            | Cài đặt và chạy riêng biệt |
| ☁️ Lưu trữ ảnh     | NextCloud cá nhân                         | Lưu ảnh sản phẩm và người dùng |
| 🐳 Triển khai      | Docker + Docker Compose                   | Chạy đồng thời Web + API |

---

## 🧩 Công nghệ sử dụng

- **Backend**:
  - .NET Core 7+
  - Entity Framework (Code First)
  - RESTful APIs
- **Frontend**:
  - Next.js (React)
  - Axios, Tailwind CSS
- **Mobile App**:
  - Android Studio (Java)
  - Retrofit, WebSocket
- **Khác**:
  - NextCloud tự host để lưu ảnh
  - Docker & Docker Compose để triển khai toàn bộ hệ thống

---

## ⚙️ Hướng dẫn chạy dự án

### 🐳 Chạy bằng Docker Compose

Yêu cầu:
- Docker
- Docker Compose

Chạy lệnh:

```bash
docker-compose up --build
Truy cập:

Frontend: http://localhost:3000

API: http://localhost:5000

💡 Lưu ý: Có thể cần cấu hình lại biến môi trường trong .env hoặc docker-compose.yml.

📱 Chạy ứng dụng Android
Mở thư mục android-app bằng Android Studio

Cấu hình base URL của API trong code (ví dụ: https://api.zanis.id.vn hoặc http://10.0.2.2:5000 nếu chạy local)

Build và chạy app trên máy ảo hoặc thiết bị thật

👨‍👩‍👧‍👦 Thành viên nhóm
[Hoàng Lê Nhật Minh] – Backend & DevOps

[Minh Hoàng Lê Nhật] – Frontend

[Nhật Minh Hoàng Lê] – Mobile App

Ps: mấy thằng contributor có cho hay thôi chứ không làm được chi.

📜 Giấy phép sử dụng
Dự án được phát triển phục vụ mục đích học tập và phi thương mại. Vui lòng liên hệ nếu muốn sử dụng cho mục đích thương mại.
