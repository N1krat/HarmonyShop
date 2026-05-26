# Quick Testing Guide - Checkout, Search & Filtering

## 🚀 Quick Start

### Backend Status
```
✅ Server running on http://localhost:3000
📊 Database: database.db (with category & rating fields)
✅ All endpoints operational
```

### Frontend Status
```
✅ Application running on http://localhost:4200
✅ All components integrated and ready
```

---

## 🧪 Testing Scenarios

### Scenario 1: Basic Checkout
**Goal:** Create an order and verify it's saved

1. Login with `user@example.com` / `user123`
2. Go to Products page
3. Add 2-3 items to cart
4. Go to Cart page
5. Click "Checkout"
6. **Expected:** Order confirmation with ID, cart cleared, redirect to profile

**Console Output Should Show:**
```
📝 Creating order for user: X total: XXX.XX
✅ 📝 Order created with ID: X
```

---

### Scenario 2: Search Products
**Goal:** Test search functionality

1. Go to Products page or any page
2. Type in header search bar: `Laptop`
3. Press Enter
4. **Expected:** Only Laptop product shows

**Try These Searches:**
- `Mouse` - Find wireless mouse
- `Electronic` - Find all electronics
- `LED` - Find desk lamp (searches description)
- `Monitor` - Find 27-inch monitor

**Console Output Should Show:**
```
🔍 Searching products: Laptop
✅ 🔍 Search results: [...]
```

---

### Scenario 3: Filter by Category
**Goal:** Test category filtering

1. Go to Products page
2. Left sidebar → "Category" dropdown
3. Select `Electronics`
4. **Expected:** Only Electronics category products show

**Try These:**
- Select "Accessories" → Only Desk Lamp & USB Cable
- Select "Electronics" → Laptop, Mouse, Keyboard, Monitor
- Select "All Categories" → All 6 products

**Console Output Should Show:**
```
🔍 Filtering products - category: Electronics price range: 0 - 10000
✅ 🔍 Filtered results: [...]
```

---

### Scenario 4: Filter by Price
**Goal:** Test price range filtering

1. Go to Products page
2. Left sidebar → "Price Range"
3. Set Min slider to 50
4. Set Max slider to 500
5. **Expected:** Shows Keyboard ($79.99), Desk Lamp ($49.99), Monitor can't reach $349

**Try These Ranges:**
- Min: 0, Max: 100 → Shows Mouse ($29.99), Desk Lamp ($49.99), Keyboard ($79.99), USB Cable ($9.99)
- Min: 100, Max: 400 → Shows Monitor ($349.99)
- Min: 900, Max: 1000 → Shows Laptop ($999.99)

---

### Scenario 5: Combined Search + Filter
**Goal:** Test search and filter together

1. Search for `electronic` in header
2. Results show products with "electronic" in name/description
3. On results page, select Category: "Electronics"
4. **Expected:** Filters apply to search results

**Or:**
1. Select Category: "Accessories"
2. See Desk Lamp & USB Cable
3. Set price Max to 50
4. **Expected:** Only USB Cable ($9.99) shows

---

### Scenario 6: Reset Filters
**Goal:** Test reset functionality

1. Apply multiple filters (category + price)
2. Click "Reset Filters" button
3. **Expected:** All filters cleared, all products shown again

---

### Scenario 7: Error Handling
**Goal:** Test error scenarios

**Checkout without login:**
1. Add items to cart
2. DON'T login
3. Click Checkout
4. **Expected:** Alert "Please log in to checkout", redirect to login

**Empty cart checkout:**
1. Login
2. Empty cart (remove all items)
3. Click Checkout
4. **Expected:** Alert "Cart is empty"

---

## 📊 Sample Products for Testing

All 6 products should be seeded in database:

| Product | Category | Price | Rating |
|---------|----------|-------|--------|
| Laptop | Electronics | $999.99 | 4.5 ⭐ |
| Mouse | Electronics | $29.99 | 4.2 ⭐ |
| Keyboard | Electronics | $79.99 | 4.8 ⭐ |
| Monitor | Electronics | $349.99 | 4.6 ⭐ |
| Desk Lamp | Accessories | $49.99 | 4.3 ⭐ |
| USB Cable | Accessories | $9.99 | 4.1 ⭐ |

---

## 🔐 Test Accounts

### Admin Account
```
Email: admin@example.com
Password: admin123
```
Can access Admin Panel, manage products

### Regular User
```
Email: user@example.com
Password: user123
```
Can browse, search, filter, and checkout

### Create New User
1. Go to Login page
2. Click "Register"
3. Enter new email/password
4. **Expected:** Account created, can login

---

## 🔍 Console Logging Checklist

### Search Operations (🔍)
```
🔍 Searching products: <query>
✅ 🔍 Search results: <count> products
```

### Filter Operations (🔍)
```
🔍 Filtering products - category: <cat> price range: <min> - <max>
✅ 🔍 Filtered results: <count> products
```

### Cart Operations (🛒)
```
🛒 Add to cart clicked for product: <product>
🛒 Adding to cart: <item>
✅ <product> added to cart
```

### Checkout Operations (📝)
```
📝 Creating order for user: <userId> total: <total>
✅ 📝 Order created with ID: <orderId>
```

### Category Operations (📂)
```
📂 Fetching product categories
✅ 📂 Categories loaded: <categories>
```

---

## 🐛 Debugging Tips

### If Search Not Working
```bash
# Check in browser console
1. Open DevTools (F12)
2. Go to Network tab
3. Search for a product
4. Look for GET /api/products/search?q=test
5. Should return 200 status with results
```

### If Filters Not Showing
```bash
# Check categories are loading
1. Open Console (F12)
2. Look for: ✅ 📂 Categories loaded:
3. Should show ["Electronics", "Accessories"]
```

### If Checkout Fails
```bash
# Check network request
1. Open Console → Network
2. Click Checkout
3. Look for POST /orders request
4. Should have: user_id, total, products
5. Response should have: success: true, orderId: X
```

---

## 📱 Responsive Testing

The layout should work on:
- **Desktop:** 3-column product grid, sidebar filters visible
- **Tablet:** 2-column product grid, filters may collapse
- **Mobile:** 1-column product grid, filters in dropdown/accordion

Test by:
1. Opening DevTools (F12)
2. Click Device Toolbar (Ctrl+Shift+M)
3. Test different screen sizes

---

## ✅ Final Verification Checklist

- [ ] Backend server running (node server.js)
- [ ] Frontend app running (npm start)
- [ ] Can login with test accounts
- [ ] Can add products to cart
- [ ] Can search products from header
- [ ] Can filter by category
- [ ] Can filter by price range
- [ ] Can combine search + filters
- [ ] Can reset filters
- [ ] Can checkout and create order
- [ ] Cart clears after checkout
- [ ] Order appears in user profile
- [ ] All console logs visible with correct emojis

---

## 🎉 Features Implemented

✅ **Checkout Functionality**
- Order creation with all items in cart
- User authentication check
- Cart clearing after order
- Order confirmation with ID
- Redirect to profile
- Error handling

✅ **Product Search**
- Global search in header
- Search by name, description, category
- Results displayed on products page
- Query parameter routing

✅ **Product Filtering**
- Category dropdown filter
- Price range sliders (min/max)
- Dynamic category loading
- "Reset Filters" button
- Combined search + filter support

✅ **Database Schema**
- Added category field to products
- Added rating field to products
- 6 sample products with categories
- All backward compatible

✅ **Backend Endpoints**
- GET /api/products/search?q=query
- GET /api/products/filter?category=X&minPrice=Y&maxPrice=Z
- GET /api/categories
- POST /orders (checkout)
- All with proper logging

✅ **Frontend UX**
- Search bar in header navigation
- Filter sidebar on products page
- Product count display
- Loading spinners
- "No results" messaging
- Responsive layout

---

## 📞 Support

If anything doesn't work:
1. Check browser console (F12) for errors
2. Check backend console for server errors
3. Check Network tab (F12) for failed requests
4. Verify backend is running: http://localhost:3000
5. Verify frontend is running: http://localhost:4200

All features are fully functional and ready for use!
