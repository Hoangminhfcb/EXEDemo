🍰 BakeMarket – Kết nối Tiệm Bánh và Người Mua
BakeMarket là một nền tảng trung gian kết nối các tiệm bánh với người mua, được khởi đầu trong môn học EXE. Dự án hỗ trợ website và ứng dụng Android, mang đến trải nghiệm tiện lợi cho người dùng.

🚀 Demo & Triển khai

🌐 Website: https://exe.zanis.id.vn  
🔌 API: https://api.zanis.id.vn


🧱 Kiến trúc hệ thống
Hệ thống bao gồm các thành phần chính:



Thành phần
Công nghệ sử dụng
Mô tả



🎯 Backend API
ASP.NET Core, Entity Framework
Cung cấp RESTful APIs


🌐 Frontend Web
Next.js (React), Tailwind CSS
Tối ưu SEO với Server-Side Rendering (SSR)


📱 Ứng dụng Android
Android (Java)
Ứng dụng di động độc lập


☁️ Lưu trữ ảnh
NextCloud cá nhân
Lưu trữ ảnh sản phẩm và người dùng


🐳 Triển khai
Docker, Docker Compose
Triển khai đồng thời Web và API



🧩 Công nghệ sử dụng
Backend

.NET Core 7+
Entity Framework (Code First)
RESTful APIs

Frontend

Next.js (React)
Axios
Tailwind CSS

Mobile App

Android Studio (Java)
Retrofit
WebSocket

Khác

Lưu trữ ảnh: NextCloud tự host  
Triển khai: Docker & Docker Compose


⚙️ Hướng dẫn chạy dự án
🐳 Chạy bằng Docker Compose
Yêu cầu:

Docker
Docker Compose

Bước thực hiện:

Chạy lệnh:docker-compose up --build


Truy cập:
Frontend: http://localhost:3000  
API: http://localhost:5000



Lưu ý:  

Cấu hình biến môi trường trong file .env hoặc docker-compose.yml nếu cần.

📱 Chạy ứng dụng Android

Mở thư mục android-app bằng Android Studio.  
Cấu hình base URL của API trong code (ví dụ: https://api.zanis.id.vn hoặc http://10.0.2.2:5000 nếu chạy local).  
Build và chạy ứng dụng trên máy ảo hoặc thiết bị thật.


👨‍👩‍👧‍👦 Thành viên nhóm

Hoàng Lê Nhật Minh: Backend & DevOps  
Minh Hoàng Lê Nhật: Frontend  
Nhật Minh Hoàng Lê: Mobile App

Lưu ý: Các contributor khác chỉ hỗ trợ tinh thần 😄.

📜 Giấy phép sử dụng
Dự án được phát triển cho mục đích học tập và phi thương mại. Vui lòng liên hệ nhóm nếu muốn sử dụng cho mục đích thương mại.
