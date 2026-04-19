const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    // 1. Lấy tất cả ảnh của user, dùng lean() để có thể chỉnh sửa object
    let photos = await Photo.find({ user_id: userId }).lean();

    if (photos.length === 0) {
      const userExists = await User.exists({ _id: userId });
      if (!userExists) return res.status(400).send("User ID không tồn tại");
      return res.json([]); 
    }

    // 2. Lắp ghép thông tin: Với mỗi ảnh, duyệt qua từng comment
    for (let photo of photos) {
      if (photo.comments) {
        for (let comment of photo.comments) {
          // Tìm thông tin người viết comment
          const author = await User.findById(comment.user_id)
                                   .select("_id first_name last_name")
                                   .lean();
          comment.user = author; // Gán object user vào comment
          delete comment.user_id; // Xóa id cũ cho đúng spec
        }
      }
    }
    res.json(photos);
  } catch (err) {
    res.status(400).send("Lỗi xử lý yêu cầu");
  }
});

module.exports = router;