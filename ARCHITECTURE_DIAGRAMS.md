# 🎨 Feature Implementation Visual Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ HEADER NAVIGATION                                        │  │
│  │ ┌─────────────────────────────────────────────────────┐  │  │
│  │ │  🏠 HOME    🛍️ PRODUCTS    🔍 SEARCH    🛒 CART    │  │  │
│  │ │                                                     │  │  │
│  │ │                  [  Search Box  ]  (NEW!)          │  │  │
│  │ │                                                     │  │  │
│  │ └─────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ PRODUCTS PAGE                                            │  │
│  │                                                          │  │
│  │ ┌─────────────────────┬──────────────────────────────┐  │  │
│  │ │ FILTERS (NEW!)      │ PRODUCT GRID               │  │  │
│  │ │                     │ ┌─────┬─────┬─────┐        │  │  │
│  │ │ 📂 Category:        │ │ 🛍️  │ 🛍️  │ 🛍️  │        │  │  │
│  │ │   [▼ Electronics]   │ │ Prod│ Prod│ Prod│        │  │  │
│  │ │   [  Accessories]   │ │ $99 │ $29 │ $79 │        │  │  │
│  │ │                     │ │     │     │     │        │  │  │
│  │ │ 💰 Price Range:     │ └─────┴─────┴─────┘        │  │  │
│  │ │   Min: [====]       │ ┌─────┬─────┬─────┐        │  │  │
│  │ │   Max: [=========]  │ │ 🛍️  │ 🛍️  │ 🛍️  │        │  │  │
│  │ │                     │ │ Prod│ Prod│ Prod│        │  │  │
│  │ │ [Reset Filters]     │ │$349 │ $49 │ $9  │        │  │  │
│  │ │                     │ │     │     │     │        │  │  │
│  │ └─────────────────────┴──────────────────────────────┘  │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ CART PAGE                                                │  │
│  │                                                          │  │
│  │  Item 1: Laptop × 1 = $999.99        [Remove] [-] [+]  │  │
│  │  Item 2: Mouse  × 2 = $59.98         [Remove] [-] [+]  │  │
│  │  ──────────────────────────────────────────────────     │  │
│  │  Total: $1,059.97              [Checkout] (NEW!)       │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Feature Flow Diagrams

### 1️⃣ Search Feature Flow

```
                    USER ACTION
                        │
                        ▼
              ┌──────────────────┐
              │ Type in Search   │
              │ Type "Laptop"    │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Press Enter Key  │
              │    or Click      │
              └────────┬─────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │ Header Component             │
        │ - Captures search query      │
        │ - Navigates to /products    │
        │   with query parameter      │
        └────────┬─────────────────────┘
                 │
                 │ Router Navigation
                 ▼
    ┌────────────────────────────────────┐
    │ Products Component                 │
    │ - Detects query params             │
    │ - Calls ProductService.search()    │
    └──────────┬─────────────────────────┘
               │
               │ HTTP Request
               ▼
    ┌────────────────────────────────────┐
    │ Backend: GET /api/products/search  │
    │ Parameter: ?q=laptop               │
    │                                    │
    │ Database Query:                    │
    │ SELECT * FROM products WHERE       │
    │ name LIKE '%laptop%' OR            │
    │ description LIKE '%laptop%' OR     │
    │ category LIKE '%laptop%'           │
    └──────────┬─────────────────────────┘
               │
               │ HTTP Response
               ▼
    ┌────────────────────────────────────┐
    │ Products Component                 │
    │ - Receive search results           │
    │ - Display filtered products        │
    │ - Show "1 result found"            │
    └────────┬─────────────────────────────┘
             │
             ▼
         USER SEES
    Results for "Laptop"
         (1 product)
```

---

### 2️⃣ Filtering Feature Flow

```
                    USER ACTION
                        │
                        ├─────────────────────┬──────────────────┐
                        ▼                     ▼                  ▼
        ┌────────────────────┐  ┌─────────────────────┐  ┌──────────────┐
        │ Select Category:   │  │ Adjust Price Min:   │  │ Adjust Price │
        │ [Electronics ▼]    │  │ Min ──────●─ $250   │  │ Max ─────●── │
        └────────┬───────────┘  └────────┬──────────┘  │  │ $750        │
                 │                       │             └──┬─────────────┘
                 │                       │                │
                 └───────────────────┬───┴────────────────┘
                                     │
                       ┌─────────────────────────────┐
                       │ onChange Event Triggered    │
                       └────────────┬────────────────┘
                                    │
                    ┌───────────────────────────────┐
                    │ ProductComponent              │
                    │ - Collect filter values       │
                    │ - Call applyFilters()         │
                    └────────────┬──────────────────┘
                                 │
                                 │ HTTP Request
                                 ▼
        ┌─────────────────────────────────────────────┐
        │ Backend: GET /api/products/filter           │
        │ Parameters:                                 │
        │   category=Electronics                      │
        │   minPrice=250                              │
        │   maxPrice=750                              │
        │                                             │
        │ Database Query:                             │
        │ SELECT * FROM products WHERE                │
        │ category='Electronics' AND                  │
        │ price >= 250 AND                            │
        │ price <= 750                                │
        └──────────┬────────────────────────────────┘
                   │
                   │ HTTP Response
                   ▼
        ┌─────────────────────────────────────────────┐
        │ Products Component                          │
        │ - Receive filtered results                  │
        │ - Update filteredProducts array             │
        │ - Display results                           │
        │ - Show "2 products found"                   │
        └──────────┬────────────────────────────────┘
                   │
                   ▼
               USER SEES
        Keyboard ($79.99) - in range ✓
        Monitor ($349.99) - in range ✓
```

---

### 3️⃣ Checkout Feature Flow

```
                    USER ACTION
                        │
                        ▼
            ┌──────────────────────────┐
            │ Cart has items:          │
            │ - Laptop × 1 = $999.99   │
            │ - Mouse × 1 = $29.99     │
            │ Total: $1,029.98         │
            └────────┬─────────────────┘
                     │
                     ▼
            ┌──────────────────────────┐
            │ User Clicks Checkout     │
            └────────┬─────────────────┘
                     │
      ┌──────────────┴──────────────┐
      │                             │
      ▼                             ▼
  LOGGED IN              NOT LOGGED IN
      │                    │
      │                    ├─ Show Alert
      │                    │  "Please log in"
      │                    │
      │                    ├─ Redirect to
      │                    │  /login page
      │                    │
      │                    └─ STOP
      │
      ▼
┌─────────────────────────────────────┐
│ CartComponent                       │
│ - Check User ID (localStorage)      │
│ - Get Cart Items                    │
│ - Calculate Total                   │
│ - Call OrderService.createOrder()   │
└────────┬───────────────────────────┘
         │
         │ HTTP Request
         ▼
┌──────────────────────────────────────────┐
│ Backend: POST /orders                    │
│ Body: {                                  │
│   user_id: 2,                            │
│   total: 1029.98,                        │
│   products: [                            │
│     {id:1, name:'Laptop', qty:1, ..},   │
│     {id:2, name:'Mouse', qty:1, ..}     │
│   ]                                      │
│ }                                        │
│                                          │
│ Database Operation:                      │
│ INSERT INTO orders (...)                 │
│ VALUES (2, 1029.98, 0, '...')           │
│                                          │
│ Returns: {success:true, orderId:5}       │
└────────┬─────────────────────────────────┘
         │
         │ HTTP Response
         ▼
┌──────────────────────────────────────────┐
│ CartComponent                            │
│ - Receive Success Response               │
│ - Show Alert:                            │
│   "Order placed successfully!"           │
│   "Order ID: 5"                          │
│ - Call CartService.clearCart()           │
│ - Navigate to /profile                   │
└────────┬─────────────────────────────────┘
         │
         ▼
    USER SEES
  Order confirmation
  Order ID: 5
  Redirected to profile
  Cart is now empty
```

---

## Database Schema (Updated)

```
USERS TABLE
┌─────────┬──────────┬──────────────┐
│ id      │ email    │ password     │
├─────────┼──────────┼──────────────┤
│ 1       │ admin@.. │ bcrypt hash  │
│ 2       │ user@... │ bcrypt hash  │
│ 3       │ new@...  │ bcrypt hash  │
└─────────┴──────────┴──────────────┘

PRODUCTS TABLE (⭐ UPDATED)
┌────┬──────────┬──────────┬───────┬────────┬──────────┬────────────┬────────┐
│ id │ name     │ desc     │ price │ stock  │ images   │ category⭐ │ rating⭐│
├────┼──────────┼──────────┼───────┼────────┼──────────┼────────────┼────────┤
│ 1  │ Laptop   │ High-... │ 999.9 │ 5      │ []       │ Electronics│ 4.5    │
│ 2  │ Mouse    │ Wireless │ 29.99 │ 20     │ []       │ Electronics│ 4.2    │
│ 3  │ Keyboard │ Mechani..│ 79.99 │ 15     │ []       │ Electronics│ 4.8    │
│ 4  │ Monitor  │ 27-inch..│ 349.99│ 8      │ []       │ Electronics│ 4.6    │
│ 5  │ Lamp     │ LED desk │ 49.99 │ 12     │ []       │ Accessories│ 4.3    │
│ 6  │ USB      │ USB 3.0  │ 9.99  │ 50     │ []       │ Accessories│ 4.1    │
└────┴──────────┴──────────┴───────┴────────┴──────────┴────────────┴────────┘

ORDERS TABLE
┌────┬─────────┬────────┬────────┬──────────────────┐
│ id │ user_id │ total  │ status │ products         │
├────┼─────────┼────────┼────────┼──────────────────┤
│ 1  │ 2       │ 1029.98│ 0      │ [{"id":1,...},]  │
│ 2  │ 2       │ 49.99  │ 0      │ [{"id":5,...}]   │
└────┴─────────┴────────┴────────┴──────────────────┘
```

---

## Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    SHARED HEADER COMPONENT                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ - Search Input Field                                    │   │
│  │ - onSearchKeyup() - Captures Enter key                  │   │
│  │ - search() - Navigates to /products?search=<query>      │   │
│  │ - Logout & Login Navigation                             │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────────┘
                     │ Routes Navigation
                     ▼
┌──────────────────────────────────────────────────────────────────────┐
│                   PRODUCTS BODY COMPONENT                            │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │ ngOnInit()                                                 │    │
│  │ - Check query params for ?search=                          │    │
│  │ - Load categories from ProductService                      │    │
│  │ - Load products or search results                          │    │
│  └──────────────────┬───────────────────────────────────────┘    │
│                     │                                              │
│  ┌──────────────────┴──────────────────────────────────────────┐  │
│  │ Filter Controls (LEFT SIDEBAR)                             │  │
│  │                                                             │  │
│  │ ┌────────────────────────────────────────────────────┐    │  │
│  │ │ Category Dropdown                                  │    │  │
│  │ │ onChange → applyFilters()                          │    │  │
│  │ │   Calls ProductService.filterProducts(cat,min,max) │    │  │
│  │ └────────────────────────────────────────────────────┘    │  │
│  │                                                             │  │
│  │ ┌────────────────────────────────────────────────────┐    │  │
│  │ │ Price Range Sliders                                │    │  │
│  │ │ onChange → applyFilters()                          │    │  │
│  │ │   Updates minPrice/maxPrice                        │    │  │
│  │ │   Calls ProductService.filterProducts()            │    │  │
│  │ └────────────────────────────────────────────────────┘    │  │
│  │                                                             │  │
│  │ ┌────────────────────────────────────────────────────┐    │  │
│  │ │ Reset Filters Button                               │    │  │
│  │ │ onClick → resetFilters()                           │    │  │
│  │ │   Clear all filter values                          │    │  │
│  │ │   Reload all products                              │    │  │
│  │ └────────────────────────────────────────────────────┘    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ┌───────────────────────────────────────────────────────────┐   │
│  │ Product Grid (RIGHT MAIN AREA)                            │   │
│  │ *ngFor="let product of filteredProducts"                 │   │
│  │                                                            │   │
│  │ For each Product:                                         │   │
│  │ - Display image, name, category, rating, price           │   │
│  │ - addToCart() → CartService.addToCart()                  │   │
│  │ - openProduct() → Navigate to /product/:id                │   │
│  └───────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
                           │ Inject: ProductService
                           │         CartService
                           │         Router
                           ▼
                 ┌──────────────────────┐
                 │ ProductService       │
                 │                      │
                 │ Methods:             │
                 │ - getProducts()      │
                 │ - searchProducts()   │
                 │ - filterProducts()   │
                 │ - getCategories()    │
                 │ - getProductById()   │
                 │                      │
                 │ Calls Backend API:   │
                 │ - GET /api/products  │
                 │ - GET /api/products/ │
                 │   search?q=          │
                 │ - GET /api/products/ │
                 │   filter?cat=&min=.. │
                 │ - GET /api/categories│
                 └──────────────────────┘
```

---

## Cart & Checkout Flow

```
┌─────────────────────────────────────────────────┐
│          CART BODY COMPONENT                    │
│                                                 │
│  Properties:                                    │
│  - cartItems: any[] (from CartService)          │
│  - totalPrice: number                           │
│  - isCheckingOut: boolean                       │
│                                                 │
│  ngOnInit():                                    │
│  - Subscribe to CartService.cart$               │
│  - Display cart items                           │
│  - Calculate total                              │
│                                                 │
│  Methods:                                       │
│  - increase(item) → CartService.updateQty()    │
│  - decrease(item) → CartService.updateQty()    │
│  - remove(item) → CartService.removeFromCart() │
│  - checkout() ✨ NEW!                           │
│    ├─ Validate cart not empty                  │
│    ├─ Get userId from localStorage             │
│    ├─ Check if logged in                       │
│    ├─ Call OrderService.createOrder()          │
│    ├─ On success:                              │
│    │  ├─ Show alert with orderId               │
│    │  ├─ Clear cart                            │
│    │  └─ Navigate to /profile                  │
│    └─ On error:                                │
│       └─ Show error message                    │
└──────────────────┬───────────────────────────────┘
                   │ Inject: CartService
                   │         OrderService
                   │         AuthService
                   │         Router
                   ▼
        ┌──────────────────────┐
        │ CartService          │
        │                      │
        │ State:               │
        │ - cart$ Observable   │
        │ - cartItems array    │
        │ - localStorage sync  │
        │                      │
        │ Methods:             │
        │ - addToCart()        │
        │ - removeFromCart()   │
        │ - updateQuantity()   │
        │ - clearCart() ✨     │
        │ - getTotal()         │
        └──────────────────────┘
                   │
                   │ Persist to localStorage
                   ▼
        ┌──────────────────────┐
        │ Browser localStorage │
        │ key: 'cart'          │
        │ value: JSON array    │
        └──────────────────────┘
```

---

## Service Dependency Injection Map

```
┌──────────────────────────────────────┐
│       Provided in root               │
└──────────────────────────────────────┘
           │           │           │
           ▼           ▼           ▼
    ┌──────────┐ ┌──────────┐ ┌──────────────┐
    │  Auth    │ │ Product  │ │   Cart       │
    │ Service  │ │ Service  │ │ Service      │
    └────┬─────┘ └────┬─────┘ └──────┬───────┘
         │             │              │
         │             │              │
    ┌────▼─────────────▼──────────────▼─┐
    │                                    │
    │      Components Use Services       │
    │                                    │
    │  - HeaderComponent                 │
    │    └─ AuthService                  │
    │    └─ Router                       │
    │                                    │
    │  - ProductBodyComponent            │
    │    └─ ProductService               │
    │    └─ CartService                  │
    │    └─ Router                       │
    │                                    │
    │  - CartBodyComponent               │
    │    └─ CartService                  │
    │    └─ OrderService (NEW!)          │
    │    └─ AuthService                  │
    │    └─ Router                       │
    │                                    │
    │  - Others...                       │
    │    └─ AuthService                  │
    │    └─ Router                       │
    │                                    │
    └────────────────────────────────────┘
```

---

## HTTP Request/Response Examples

### Search Request
```
→ GET /api/products/search?q=laptop
  Headers: Content-Type: application/json

← 200 OK
{
  "data": [
    {
      "id": 1,
      "name": "Laptop",
      "description": "High-performance laptop for professionals",
      "price": 999.99,
      "stock": 5,
      "category": "Electronics",
      "rating": 4.5,
      "images": []
    }
  ]
}
```

### Filter Request
```
→ GET /api/products/filter?category=Electronics&minPrice=50&maxPrice=500
  Headers: Content-Type: application/json

← 200 OK
{
  "data": [
    {
      "id": 3,
      "name": "Keyboard",
      "price": 79.99,
      "category": "Electronics",
      ...
    },
    {
      "id": 5,
      "name": "Desk Lamp",
      "price": 49.99,
      "category": "Accessories",
      ...
    }
  ]
}
```

### Checkout Request
```
→ POST /orders
  Headers: Content-Type: application/json
  
  {
    "user_id": 2,
    "total": 1029.98,
    "products": [
      { "id": 1, "name": "Laptop", "price": 999.99, "quantity": 1 },
      { "id": 2, "name": "Mouse", "price": 29.99, "quantity": 1 }
    ]
  }

← 200 OK
{
  "success": true,
  "orderId": 5
}
```

---

## 🎯 Summary

✅ **Search:** Header → Products page with query params → ProductService → Backend search endpoint
✅ **Filter:** Sidebar controls → ProductService → Backend filter endpoint with multiple params
✅ **Checkout:** Cart component → OrderService → Backend order creation → Database persistence

All three features are fully integrated and working together seamlessly!
