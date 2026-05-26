# 🚀 Quick Reference Card

## ⚡ Quick Start (30 seconds)

### Terminal 1 - Backend
```bash
cd c:\Users\bogdan\Desktop\eShopAngular\backend
node server.js
# ✅ Server running on http://localhost:3000
```

### Terminal 2 - Frontend  
```bash
cd c:\Users\bogdan\Desktop\eShopAngular
npm start
# ✅ App running on http://localhost:4200
```

---

## 🔓 Test Login

```
👨 Admin
Email: admin@example.com
Pass:  admin123

👤 User
Email: user@example.com
Pass:  user123
```

---

## 🎯 Try These Right Now

### 1️⃣ Search
```
1. Type "Laptop" in header search
2. Press Enter
3. See results
```

### 2️⃣ Filter
```
1. Go to Products
2. Click category dropdown → "Electronics"
3. Drag price slider to 50-100
4. See filtered results
```

### 3️⃣ Checkout
```
1. Add item to cart
2. Go to Cart
3. Click Checkout
4. See order ID
```

---

## 📊 Sample Products

| Product | Price | Category |
|---------|-------|----------|
| Laptop | $999.99 | Electronics |
| Mouse | $29.99 | Electronics |
| Keyboard | $79.99 | Electronics |
| Monitor | $349.99 | Electronics |
| Desk Lamp | $49.99 | Accessories |
| USB Cable | $9.99 | Accessories |

---

## 🔍 Console Logs Explained

```
🛒 - Cart operations (add, remove, checkout)
📦 - Product operations (load, search, filter)
🔍 - Search/filter results
📂 - Categories loaded
📝 - Order created
✅ - Success
❌ - Error
```

---

## 🌐 API Endpoints

### Search
```
GET /api/products/search?q=laptop
```

### Filter
```
GET /api/products/filter?category=Electronics&minPrice=50&maxPrice=500
```

### Categories
```
GET /api/categories
```

### Create Order
```
POST /orders
{user_id, total, products}
```

---

## 📁 Key Files

**Backend:**
- `backend/server.js` - All endpoints

**Frontend:**
- `src/app/shared/header.component.ts` - Search
- `src/app/components/products/body/` - Filters
- `src/app/components/cart/body/` - Checkout

**Services:**
- `product.service.ts` - Search/Filter
- `order.service.ts` - Checkout
- `cart.service.ts` - Cart management

---

## ✅ Features Checklist

- [x] Search products from header
- [x] Filter by category
- [x] Filter by price range
- [x] Combined search + filter
- [x] Add to cart
- [x] View cart
- [x] Checkout flow
- [x] Order creation
- [x] Cart clearing
- [x] User authentication

---

## 🐛 Troubleshooting

### Backend not starting?
```
Check: Is database.db in backend folder?
Fix: cd backend && node server.js
```

### Frontend not loading?
```
Check: Is npm start running?
Fix: npm start in project root
```

### Search not working?
```
Check: Is backend running on :3000?
Fix: Restart backend server
```

### Can't checkout?
```
Check: Are you logged in?
Fix: Login with admin@example.com / admin123
```

---

## 📚 Full Docs

- **IMPLEMENTATION_SUMMARY.md** - Technical details
- **TESTING_GUIDE.md** - Testing procedures
- **README_FEATURES.md** - Complete docs
- **ARCHITECTURE_DIAGRAMS.md** - Flow diagrams
- **FEATURES_COMPLETE.md** - Feature overview
- **STATUS_REPORT.md** - Implementation status

---

## 🎉 You're All Set!

Everything works. Go build! 🚀

Questions? Check the docs or browser console (F12).
