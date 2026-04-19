const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// 1. Cấu hình Port - Quan trọng: Phải khớp với Proxy trong package.json của Frontend
const PORT = 8081;

// 2. Middleware
app.use(cors()); // Cho phép truy cập từ các nguồn khác nhau
app.use(express.json()); // Hỗ trợ đọc dữ liệu JSON trong body request

// PHỤC VỤ ẢNH TĨNH: Giúp hiển thị ảnh trong UserPhotos
// Đảm bảo bạn có thư mục 'images' chứa các file ảnh nằm cùng cấp với index.js
app.use("/images", express.static(path.join(__dirname, "images")));

// 3. Kết nối Cơ sở dữ liệu MongoDB
// Đảm bảo file .env của bạn có dòng: DB_URL=mongodb+srv://...
if (!process.env.DB_URL) {
  console.error("❌ Lỗi: Chưa cấu hình DB_URL trong file .env");
  process.exit(1);
}

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("✅ Đã kết nối MongoDB thành công"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// 4. Import các Router
// Đảm bảo bạn đã tạo thư mục 'routes' và các file tương ứng
const userRouter = require("./routes/UserRouter");
const photoRouter = require("./routes/PhotoRouter");

// 5. Đăng ký các Route API
// Các API sẽ có dạng: http://localhost:8081/user/... và http://localhost:8081/photosOfUser/...
app.use("/user", userRouter);
app.use("/photosOfUser", photoRouter);

// Route mặc định để kiểm tra server
app.get("/", (req, res) => {
  res.send("Backend Server đang chạy bình thường!");
});

// 6. Khởi chạy Server
app.listen(PORT, () => {
  console.log("--------------------------------------------------");
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
  console.log(`📂 Ảnh tĩnh được phục vụ tại: http://localhost:${PORT}/images/`);
  console.log("--------------------------------------------------");
});