const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "mysecret123";

let db;
try {
  db = new Database("database.db");
} catch (err) {
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

async function initializeDatabase() {
  try {
    db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `).run();

    db.prepare(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        stock INTEGER NOT NULL,
        images TEXT,
        category TEXT DEFAULT 'Electronics',
        rating REAL DEFAULT 0
      )
    `).run();

    try {
      db.prepare("ALTER TABLE products ADD COLUMN category TEXT DEFAULT 'Electronics'").run();
    } catch (err) {}

    try {
      db.prepare("ALTER TABLE products ADD COLUMN rating REAL DEFAULT 0").run();
    } catch (err) {}

    db.prepare(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        total REAL NOT NULL,
        status INTEGER NOT NULL,
        products TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )
    `).run();

    const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get().count;

    if (userCount === 0) {
      const adminPass = await bcrypt.hash("admin123", 10);

      db.prepare(
        "INSERT INTO users (email, password) VALUES (?, ?)"
      ).run("admin@example.com", adminPass);

      const userPass = await bcrypt.hash("user123", 10);

      db.prepare(
        "INSERT INTO users (email, password) VALUES (?, ?)"
      ).run("user@example.com", userPass);

      const products = [
        {
          name: "Laptop",
          description: "High-performance laptop for professionals",
          price: 999.99,
          stock: 5,
          category: "Electronics",
          rating: 4.5
        },
        {
          name: "Mouse",
          description: "Wireless mouse with precision tracking",
          price: 29.99,
          stock: 20,
          category: "Electronics",
          rating: 4.2
        },
        {
          name: "Keyboard",
          description: "Mechanical keyboard with RGB lighting",
          price: 79.99,
          stock: 15,
          category: "Electronics",
          rating: 4.8
        },
        {
          name: "Monitor",
          description: "27-inch 4K monitor",
          price: 349.99,
          stock: 8,
          category: "Electronics",
          rating: 4.6
        },
        {
          name: "Desk Lamp",
          description: "LED desk lamp with adjustable brightness",
          price: 49.99,
          stock: 12,
          category: "Accessories",
          rating: 4.3
        },
        {
          name: "USB Cable",
          description: "High-speed USB 3.0 cable",
          price: 9.99,
          stock: 50,
          category: "Accessories",
          rating: 4.1
        }
      ];

      products.forEach(p => {
        db.prepare(`
          INSERT INTO products 
          (name, description, price, stock, images, category, rating) 
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(
          p.name,
          p.description,
          p.price,
          p.stock,
          JSON.stringify([]),
          p.category,
          p.rating
        );
      });
    }
  } catch (err) {}
}

initializeDatabase();

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.get("/users", (req, res) => {
  try {
    const users = db.prepare("SELECT id, email FROM users").all();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/users", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = db.prepare(`
      INSERT INTO users (email, password)
      VALUES (?, ?)
    `).run(email, hashedPassword);

    res.json({
      success: true,
      id: result.lastInsertRowid
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required"
      });
    }

    const user = db.prepare(`
      SELECT * FROM users WHERE email = ?
    `).get(email);

    if (!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({
        error: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      SECRET_KEY,
      {
        expiresIn: "1h"
      }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/auth/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password required"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = db.prepare(`
      INSERT INTO users (email, password)
      VALUES (?, ?)
    `).run(email, hashedPassword);

    res.json({
      success: true,
      id: result.lastInsertRowid
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/api/products", (req, res) => {
  try {
    const products = db.prepare("SELECT * FROM products").all();

    products.forEach(p => {
      p.images = p.images ? JSON.parse(p.images) : [];
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/search", (req, res) => {
  const { q } = req.query;

  try {
    if (!q) {
      return res.json([]);
    }

    const products = db.prepare(`
      SELECT * FROM products
      WHERE name LIKE ?
      OR description LIKE ?
      OR category LIKE ?
    `).all(`%${q}%`, `%${q}%`, `%${q}%`);

    products.forEach(p => {
      p.images = p.images ? JSON.parse(p.images) : [];
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/filter", (req, res) => {
  const { category, minPrice, maxPrice } = req.query;

  try {
    let query = "SELECT * FROM products WHERE 1=1";
    const params = [];

    if (category) {
      query += " AND category = ?";
      params.push(category);
    }

    if (minPrice !== undefined) {
      query += " AND price >= ?";
      params.push(parseFloat(minPrice));
    }

    if (maxPrice !== undefined) {
      query += " AND price <= ?";
      params.push(parseFloat(maxPrice));
    }

    const products = db.prepare(query).all(...params);

    products.forEach(p => {
      p.images = p.images ? JSON.parse(p.images) : [];
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/categories", (req, res) => {
  try {
    const categories = db.prepare(`
      SELECT DISTINCT category
      FROM products
      WHERE category IS NOT NULL
      ORDER BY category
    `).all();

    const categoryNames = categories.map(c => c.category);

    res.json(categoryNames);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;

  try {
    const product = db.prepare(`
      SELECT * FROM products WHERE id = ?
    `).get(id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    product.images = product.images ? JSON.parse(product.images) : [];

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/products", upload.single("image"), (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      rating
    } = req.body;

    const image = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const result = db.prepare(`
      INSERT INTO products
      (name, description, price, stock, images, category, rating)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      name,
      description,
      parseFloat(price),
      parseInt(stock),
      image ? JSON.stringify([image]) : JSON.stringify([]),
      category || "Electronics",
      parseFloat(rating) || 0
    );

    res.json({
      success: true,
      id: result.lastInsertRowid
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/products/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;

  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      rating
    } = req.body;

    const product = db.prepare(`
      SELECT * FROM products WHERE id = ?
    `).get(id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    let images = product.images
      ? JSON.parse(product.images)
      : [];

    if (req.file) {
      images.push(`/uploads/${req.file.filename}`);
    }

    const result = db.prepare(`
      UPDATE products
      SET
        name = ?,
        description = ?,
        price = ?,
        stock = ?,
        images = ?,
        category = ?,
        rating = ?
      WHERE id = ?
    `).run(
      name,
      description,
      parseFloat(price),
      parseInt(stock),
      JSON.stringify(images),
      category || product.category,
      parseFloat(rating) !== undefined
        ? parseFloat(rating)
        : product.rating,
      id
    );

    if (result.changes === 0) {
      return res.status(400).json({
        error: "Product update failed"
      });
    }

    res.json({
      success: true,
      id
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;

  try {
    const product = db.prepare(`
      SELECT * FROM products WHERE id = ?
    `).get(id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    if (product.images) {
      const imagesArray = JSON.parse(product.images);

      imagesArray.forEach(imgPath => {
        const filePath = path.join(__dirname, imgPath);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    db.prepare(`
      DELETE FROM products WHERE id = ?
    `).run(id);

    res.json({
      success: true,
      message: "Product deleted"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/orders/:userId", (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = db.prepare(`
      SELECT * FROM orders WHERE user_id = ?
    `).all(userId);

    orders.forEach(order => {
      order.products = JSON.parse(order.products);
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/orders", (req, res) => {
  try {
    const orders = db.prepare("SELECT * FROM orders").all();

    orders.forEach(order => {
      order.products = order.products
        ? JSON.parse(order.products)
        : [];
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/orders", (req, res) => {
  const { user_id, total, products } = req.body;

  try {
    const enrichedProducts = products.map(item => {
      const product = db.prepare(`
        SELECT * FROM products WHERE id = ?
      `).get(item.id);

      return {
        id: item.id,
        name: product?.name || item.name,
        price: product?.price || item.price,
        quantity: item.quantity,
        images: product?.images
          ? JSON.parse(product.images)
          : [],
        category: product?.category || "",
        rating: product?.rating || 0
      };
    });

    const productsJSON = JSON.stringify(enrichedProducts);

    const result = db.prepare(`
      INSERT INTO orders
      (user_id, total, status, products)
      VALUES (?, ?, ?, ?)
    `).run(
      user_id,
      total,
      "Pending",
      productsJSON
    );

    res.json({
      success: true,
      orderId: result.lastInsertRowid
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  try {
    const result = db.prepare(`
      UPDATE orders
      SET status = ?
      WHERE id = ?
    `).run(status, orderId);

    if (result.changes === 0) {
      return res.status(404).json({
        error: "Order not found"
      });
    }

    res.json({
      success: true,
      orderId,
      status
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});