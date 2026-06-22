const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

const ADMIN_EMAIL = "admin";
const ADMIN_PASSWORD = "090909";

const serverDir = __dirname;
const dataDir = path.join(serverDir, "data");
const uploadsDir = path.join(serverDir, "uploads");
const apartmentsPath = path.join(dataDir, "apartments.json");
const usersPath = path.join(dataDir, "users.json");

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
if (!fs.existsSync(apartmentsPath)) fs.writeFileSync(apartmentsPath, "[]");
if (!fs.existsSync(usersPath)) fs.writeFileSync(usersPath, "[]");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({ storage });

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

app.get("/apartments", (req, res) => {
  res.json(readJson(apartmentsPath));
});

app.get("/apartments/:id", (req, res) => {
  const apartments = readJson(apartmentsPath);
  const apartment = apartments.find((item) => item.id === Number(req.params.id));

  if (!apartment) {
    return res.status(404).json({ message: "Квартира не найдена" });
  }

  res.json(apartment);
});

app.post("/apartments", upload.single("image"), (req, res) => {
  const apartments = readJson(apartmentsPath);

  if (!req.file) {
    return res.status(400).json({ message: "Фотография обязательна" });
  }

  const newApartment = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    address: req.body.address,
    image: `/uploads/${req.file.filename}`,
    reviews: [],
  };

  apartments.push(newApartment);
  writeJson(apartmentsPath, apartments);

  res.status(201).json(newApartment);
});

app.delete("/apartments/:id", (req, res) => {
  const apartments = readJson(apartmentsPath);
  const apartmentId = Number(req.params.id);

  const updatedApartments = apartments.filter((item) => item.id !== apartmentId);

  if (updatedApartments.length === apartments.length) {
    return res.status(404).json({ message: "Квартира не найдена" });
  }

  writeJson(apartmentsPath, updatedApartments);
  res.json({ message: "Квартира удалена" });
});

app.post("/register", (req, res) => {
  const users = readJson(usersPath);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Заполните все поля" });
  }

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(409).json({ message: "Пользователь уже существует" });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
  };

  users.push(newUser);
  writeJson(usersPath, users);

  res.status(201).json({
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: "user",
    },
  });
});

app.post("/login", (req, res) => {
  const users = readJson(usersPath);
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({
      user: {
        id: 1,
        name: "Администратор",
        email: ADMIN_EMAIL,
        role: "admin",
      },
    });
  }

  const user = users.find(
    (item) => item.email === email && item.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Неверный email или пароль" });
  }

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: "user",
    },
  });
});

app.post("/apartments/:id/reviews", (req, res) => {
  const apartments = readJson(apartmentsPath);
  const apartmentId = Number(req.params.id);
  const { authorId, author, text, rating } = req.body;

  const apartment = apartments.find((item) => item.id === apartmentId);

  if (!apartment) {
    return res.status(404).json({ message: "Квартира не найдена" });
  }

  if (!authorId || !author || !text || !rating) {
    return res.status(400).json({ message: "Заполните отзыв и оценку" });
  }

  if (!apartment.reviews) {
    apartment.reviews = [];
  }

  const existingReview = apartment.reviews.find(
    (review) => review.authorId === Number(authorId)
  );

  if (existingReview) {
    return res.status(409).json({
      message: "Вы уже оставили отзыв на эту квартиру",
    });
  }

  const review = {
    id: Date.now(),
    authorId: Number(authorId),
    author,
    text,
    rating: Number(rating),
    createdAt: new Date().toLocaleDateString("ru-RU"),
  };

  apartment.reviews.push(review);
  writeJson(apartmentsPath, apartments);

  res.status(201).json({ review });
});

app.put("/apartments/:apartmentId/reviews/:reviewId", (req, res) => {
  const apartments = readJson(apartmentsPath);
  const apartmentId = Number(req.params.apartmentId);
  const reviewId = Number(req.params.reviewId);
  const { authorId, text, rating } = req.body;

  const apartment = apartments.find((item) => item.id === apartmentId);

  if (!apartment) {
    return res.status(404).json({ message: "Квартира не найдена" });
  }

  const review = apartment.reviews?.find((item) => item.id === reviewId);

  if (!review) {
    return res.status(404).json({ message: "Отзыв не найден" });
  }

  if (review.authorId !== Number(authorId)) {
    return res.status(403).json({
      message: "Можно редактировать только свой отзыв",
    });
  }

  review.text = text;
  review.rating = Number(rating);

  writeJson(apartmentsPath, apartments);

  res.json({ review });
});

app.delete("/apartments/:apartmentId/reviews/:reviewId", (req, res) => {
  const apartments = readJson(apartmentsPath);
  const apartmentId = Number(req.params.apartmentId);
  const reviewId = Number(req.params.reviewId);
  const { authorId } = req.body;

  const apartment = apartments.find((item) => item.id === apartmentId);

  if (!apartment) {
    return res.status(404).json({ message: "Квартира не найдена" });
  }

  const review = apartment.reviews?.find((item) => item.id === reviewId);

  if (!review) {
    return res.status(404).json({ message: "Отзыв не найден" });
  }

  if (review.authorId !== Number(authorId)) {
    return res.status(403).json({
      message: "Можно удалить только свой отзыв",
    });
  }

  apartment.reviews = apartment.reviews.filter((item) => item.id !== reviewId);

  writeJson(apartmentsPath, apartments);

  res.json({ message: "Отзыв удалён" });
});

const clientDistPath = path.join(__dirname, "..", "dist");

app.use(express.static(clientDistPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});