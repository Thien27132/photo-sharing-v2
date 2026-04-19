const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

// 1. Lấy danh sách rút gọn cho sidebar
router.get("/list", async (req, res) => {
  try {
    const users = await User.find({}).select("_id first_name last_name");
    res.json(users);
  } catch (err) {
    res.status(500).send("Lỗi hệ thống");
  }
});

// 2. Lấy chi tiết 1 user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
                           .select("_id first_name last_name location description occupation");
    if (!user) return res.status(400).send("Không tìm thấy user");
    res.json(user);
  } catch (err) {
    res.status(400).send("ID không hợp lệ");
  }
});

module.exports = router;