const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "mysecret123";

// Initialize database with better error handling
let db;
try {
  db = new Database("database.db");
  console.log("✅ Database connected successfully");
  console.log("📍 Database location:", path.resolve("database.db"));
} catch (err) {
  console.error("❌ Database connection failed:", err);
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 

console.log("📁 Uploads directory:", path.join(__dirname, "uploads"));

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
  console.log("✅ Uploads directory created");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Initialize database function
async function initializeDatabase() {
  try {
    // Create tables if they don't exist
    db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE, 
        password TEXT NOT NULL
      )
    `).run();
    console.log("✅ Users table ready");

    db.prepare(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        stock INTEGER NOT NULL, 
        images TEXT
      )
    `).run();
    console.log("✅ Products table ready");

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
    console.log("✅ Orders table ready");

    // Seed test data if tables are empty
    const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get().count;
    if (userCount === 0) {
      console.log("📝 Seeding test data...");
      
      // Add admin user
      const adminPass = await bcrypt.hash("admin123", 10);
      db.prepare("INSERT INTO users (email, password) VALUES (?, ?)").run("admin@example.com", adminPass);
      console.log("✅ Admin user created: admin@example.com / admin123");

      // Add test user
      const userPass = await bcrypt.hash("user123", 10);
      db.prepare("INSERT INTO users (email, password) VALUES (?, ?)").run("user@example.com", userPass);
      console.log("✅ Test user created: user@example.com / user123");

      // Add sample products
      const products = [
        { name: "Laptop", description: "High-performance laptop", price: 999.99, stock: 5 },
        { name: "Mouse", description: "Wireless mouse", price: 29.99, stock: 20 },
        { name: "Keyboard", description: "Mechanical keyboard", price: 79.99, stock: 15 }
      ];

      products.forEach(p => {
        db.prepare(
          "INSERT INTO products (name, description, price, stock, images) VALUES (?, ?, ?, ?, ?)"
        ).run(p.name, p.description, p.price, p.stock, JSON.stringify([]));
      });
      console.log("✅ Sample products created");
    } else {
      const prodCount = db.prepare("SELECT COUNT(*) as count FROM products").get().count;
      console.log(`📊 Database has ${userCount} users and ${prodCount} products`);
    }
  } catch (err) {
    console.error("❌ Table creation error:", err);
  }
}

// Initialize database
initializeDatabase();

// Routes

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Users endpoints
app.get("/users", (req, res) => {
  console.log("👥 Fetching all users");
  try {
    const users = db.prepare("SELECT id, email FROM users").all();
    console.log("✅ Retrieved", users.length, "users");
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/users", async (req, res) => {
  const { email, password } = req.body; 
  console.log("👤 Creating new user:", email);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = db.prepare(
      "INSERT INTO users (email, password) VALUES (?, ?)"
    ).run(email, hashedPassword);
    console.log("✅ User created with ID:", result.lastInsertRowid);
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    console.error("❌ Error creating user:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Auth endpoints
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("🔐 Login attempt for:", email);
  try {
    if (!email || !password) {
      console.warn("⚠️ Missing email or password");
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!user) {
      console.warn("⚠️ User not found:", email);
      return res.status(400).json({ error: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.warn("⚠️ Invalid password for user:", email);
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    console.log("✅ Login successful for:", email);
    res.json({ token, user: { id: user.id, email: user.email } }); 
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/auth/register", async (req, res) => {
  const { email, password } = req.body;
  console.log("📝 Registration attempt for:", email);
  try {
    if (!email || !password) {
      console.warn("⚠️ Missing email or password");
      return res.status(400).json({ error: "Email and password required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = db.prepare(
      "INSERT INTO users (email, password) VALUES (?, ?)"
    ).run(email, hashedPassword);
    console.log("✅ Registration successful for:", email, "ID:", result.lastInsertRowid);
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Products endpoints
app.get("/api/products", (req, res) => {
  console.log("📦 Fetching all products");
  try {
    const products = db.prepare("SELECT * FROM products").all();
    console.log("✅ Retrieved", products.length, "products");
    products.forEach(p => {
      p.images = p.images ? JSON.parse(p.images) : [];
    });
    res.json(products);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  console.log("📦 Fetching product:", id);
  try {
    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
    if (!product) {
      console.warn("⚠️ Product not found:", id);
      return res.status(404).json({ error: "Product not found" });
    }

    product.images = product.images ? JSON.parse(product.images) : [];
    console.log("✅ Retrieved product:", product.name);
    res.json(product);
  } catch (err) {
    console.error("❌ Error fetching product:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/products", upload.single("image"), (req, res) => {
  console.log("📝 Adding new product:", req.body.name);
  try {
    const { name, description, price, stock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const result = db.prepare(
      "INSERT INTO products (name, description, price, stock, images) VALUES (?, ?, ?, ?, ?)"
    ).run(
      name,
      description,
      parseFloat(price),
      parseInt(stock),
      image ? JSON.stringify([image]) : JSON.stringify([])
    );

    console.log("✅ Product created with ID:", result.lastInsertRowid);
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    console.error("❌ Error creating product:", err);
    res.status(400).json({ error: err.message });
  }
});

app.put("/api/products/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  console.log("📝 Updating product:", id);
  try {
    const { name, description, price, stock } = req.body;
    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
    
    if (!product) {
      console.warn("⚠️ Product not found:", id);
      return res.status(404).json({ error: "Product not found" });
    }

    let images = product.images ? JSON.parse(product.images) : [];
    
    if (req.file) {
      images.push(`/uploads/${req.file.filename}`);
    }

    const result = db.prepare(
      "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, images = ? WHERE id = ?"
    ).run(
      name,
      description,
      parseFloat(price),
      parseInt(stock),
      JSON.stringify(images),
      id
    );

    if (result.changes === 0) {
      console.warn("⚠️ Product update failed:", id);
      return res.status(400).json({ error: "Product update failed" });
    }

    console.log("✅ Product updated:", id);
    res.json({ success: true, id });
  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(400).json({ error: err.message });
  }
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  console.log("🗑️ Deleting product:", id);
  try {
    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
    if (!product) {
      console.warn("⚠️ Product not found:", id);
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.images) {
      const imagesArray = JSON.parse(product.images);
      imagesArray.forEach(imgPath => {
        const filePath = path.join(__dirname, imgPath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("🗑️ Deleted image:", imgPath);
        }
      });
    }

    db.prepare("DELETE FROM products WHERE id = ?").run(id);

    console.log("✅ Product deleted:", id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    res.status(500).json({ error: err.message });
  }
});

// Orders endpoints
app.get("/orders/:userId", (req, res) => {
  const userId = req.params.userId;
  console.log("📋 Fetching orders for user:", userId);
  try {
    const orders = db.prepare("SELECT * FROM orders WHERE user_id = ?").all(userId);
    console.log("✅ Retrieved", orders.length, "orders for user", userId);
    orders.forEach(order => {
      order.products = JSON.parse(order.products);
    });
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching user orders:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/orders", (req, res) => {
  console.log("📋 Fetching all orders");
  try {
    const orders = db.prepare("SELECT * FROM orders").all();
    console.log("✅ Retrieved", orders.length, "total orders");
    orders.forEach(order => {
      order.products = order.products ? JSON.parse(order.products) : [];
    });
    res.json(orders);
  } catch (err) {
    console.error("❌ Error fetching all orders:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/orders", (req, res) => {
  const { user_id, total, products } = req.body;
  console.log("📝 Creating order for user:", user_id, "total:", total);
  try {
    const productsJSON = JSON.stringify(products);
    const result = db.prepare(`
      INSERT INTO orders (user_id, total, status, products)
      VALUES (?, ?, 0, ?)
    `).run(user_id, total, productsJSON);

    console.log("✅ Order created with ID:", result.lastInsertRowid);
    res.json({ success: true, orderId: result.lastInsertRowid });
  } catch (err) {
    console.error("❌ Error creating order:", err);
    res.status(400).json({ error: err.message });
  }
});

app.put("/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  console.log("📝 Updating order:", orderId, "status:", status);

  try {
    const result = db.prepare("UPDATE orders SET status = ? WHERE id = ?")
                     .run(status, orderId);

    if (result.changes === 0) {
      console.warn("⚠️ Order not found:", orderId);
      return res.status(404).json({ error: "Order not found" });
    }

    console.log("✅ Order updated successfully");
    res.json({ success: true, orderId, status });
  } catch (err) {
    console.error("❌ Error updating order:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("===============================================");
  console.log("🚀 Server running on http://localhost:3000");
  console.log("📊 Database: database.db");
  console.log("📁 Uploads: ./uploads");
  console.log("===============================================");
  console.log("\n📝 Test credentials:");
  console.log("   Admin:  admin@example.com / admin123");
  console.log("   User:   user@example.com / user123");
  console.log("===============================================\n");
});