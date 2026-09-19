-- ==============================================================================
-- Há»† THá»NG CÆ  Sá»ž Dá»® LIá»†U Cá»¬A HÃ€NG BÃNH "THE SWEETS"
-- Kiáº¿n trÃºc: React (FE) + Backend API (BE)
-- Tá»•ng cá»™ng: 15 Báº¢NG
-- PhiÃªn báº£n: MySQL 8.0+ | Charset: utf8mb4_unicode_ci
-- ==============================================================================
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS order_status_logs;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS order_detail;
DROP TABLE IF EXISTS order_shipping;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS product_sizes;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS size;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS positions;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS customer_addresses;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;
-- ==============================================================================
-- PHáº¦N 1: TÃ€I KHOáº¢N XÃC THá»°C
-- ==============================================================================
-- 1. Báº£ng users: TÃ i khoáº£n Ä‘Äƒng nháº­p (Chá»‰ lo xÃ¡c thá»±c & phÃ¢n quyá»n)
CREATE TABLE users (
    user_name    VARCHAR(255) PRIMARY KEY,
    email        VARCHAR(255) UNIQUE NOT NULL,
    password     VARCHAR(255) NOT NULL,
    role         ENUM('customer', 'staff', 'admin') DEFAULT 'customer',
    status       ENUM('active', 'locked') DEFAULT 'active',
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- ==============================================================================
-- PHáº¦N 2: KHÃCH HÃ€NG & Sá»” Äá»ŠA CHá»ˆ
-- ==============================================================================
-- 2. Báº£ng customers: Há»“ sÆ¡ thÃ´ng tin cÃ¡ nhÃ¢n khÃ¡ch hÃ ng (1-1 vá»›i users)
CREATE TABLE customers (
    customer_id    INT PRIMARY KEY AUTO_INCREMENT,
    user_name      VARCHAR(255) UNIQUE NOT NULL,
    first_name     VARCHAR(100) NOT NULL,
    last_name      VARCHAR(100) NOT NULL,
    phone          VARCHAR(20) UNIQUE,
    gender         ENUM('Male', 'Female', 'Other') DEFAULT 'Other',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_name) REFERENCES users(user_name) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 3. Báº£ng customer_addresses: Sá»• Ä‘á»‹a chá»‰ nháº­n hÃ ng (1 khÃ¡ch cÃ³ nhiá»u Ä‘á»‹a chá»‰)
CREATE TABLE customer_addresses (
    address_id      INT PRIMARY KEY AUTO_INCREMENT,
    customer_id     INT NOT NULL,
    recipient_name  VARCHAR(100) NOT NULL,
    phone           VARCHAR(20) NOT NULL,
    city            VARCHAR(100) NOT NULL,
    district        VARCHAR(100) NOT NULL,
    ward            VARCHAR(100) NOT NULL,
    street          VARCHAR(255) NOT NULL,
    is_default      BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- ==============================================================================
-- PHáº¦N 3: QUáº¢N LÃ NHÃ‚N Sá»° (HRM)
-- ==============================================================================
-- 4. Báº£ng departments: PhÃ²ng ban / Bá»™ pháº­n trong cá»­a hÃ ng
CREATE TABLE departments (
    department_id    INT PRIMARY KEY AUTO_INCREMENT,
    department_name  VARCHAR(100) NOT NULL UNIQUE,
    description      TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 5. Báº£ng positions: Chá»©c vá»¥ / Vá»‹ trÃ­ cÃ´ng viá»‡c & LÆ°Æ¡ng cÆ¡ báº£n
CREATE TABLE positions (
    position_id    INT PRIMARY KEY AUTO_INCREMENT,
    position_name  VARCHAR(100) NOT NULL UNIQUE,
    base_salary    DECIMAL(15,2) NOT NULL DEFAULT 0 CHECK (base_salary >= 0),
    salary_type    ENUM('monthly', 'hourly') DEFAULT 'monthly',
    description    TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 6. Báº£ng employees: Há»“ sÆ¡ nhÃ¢n viÃªn (liÃªn káº¿t users Ä‘á»ƒ Ä‘Äƒng nháº­p bÃ¡n hÃ ng)
CREATE TABLE employees (
    employee_id    INT PRIMARY KEY AUTO_INCREMENT,
    employee_code  VARCHAR(20) UNIQUE NOT NULL,        -- MÃ£ NV: NV001, NV002...
    user_name      VARCHAR(255) UNIQUE NULL,           -- TÃ i khoáº£n Ä‘Äƒng nháº­p ná»™i bá»™
    first_name     VARCHAR(100) NOT NULL,
    last_name      VARCHAR(100) NOT NULL,
    phone          VARCHAR(20) UNIQUE,
    citizen_id     VARCHAR(20) UNIQUE,                 -- Sá»‘ CCCD/CMND
    gender         ENUM('Male', 'Female', 'Other') DEFAULT 'Male',
    date_of_birth  DATE,
    department_id  INT NULL,
    position_id    INT NULL,
    hire_date      DATE NOT NULL,                      -- NgÃ y vÃ o lÃ m
    contract_type  ENUM('Full-time', 'Part-time', 'Probation') DEFAULT 'Full-time',
    status         ENUM('Active', 'On Leave', 'Resigned') DEFAULT 'Active',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_name)      REFERENCES users(user_name)           ON DELETE SET NULL,
    FOREIGN KEY (department_id)  REFERENCES departments(department_id) ON DELETE SET NULL,
    FOREIGN KEY (position_id)    REFERENCES positions(position_id)     ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- ==============================================================================
-- PHáº¦N 4: Sáº¢N PHáº¨M & BIáº¾N THá»‚ KÃCH Cá» 
-- ==============================================================================
-- 7. Báº£ng category: Danh má»¥c bÃ¡nh (Mousse, Croissant, Drink...)
CREATE TABLE category (
    category_id    INT PRIMARY KEY AUTO_INCREMENT,
    category_name  VARCHAR(255) UNIQUE NOT NULL,
    description    TEXT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 8. Báº£ng size: Danh má»¥c kÃ­ch cá»¡ (Size S 16cm, Size M 20cm...)
CREATE TABLE size (
    size_id    INT PRIMARY KEY AUTO_INCREMENT,
    size_name  VARCHAR(50) UNIQUE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 9. Báº£ng product: ThÃ´ng tin chung cá»§a bÃ¡nh (khÃ´ng lÆ°u price, size_id trá»±c tiáº¿p)
CREATE TABLE product (
    product_id             INT PRIMARY KEY AUTO_INCREMENT,
    product_name           VARCHAR(255) NOT NULL,
    category_id            INT NULL,
    status                 ENUM('Available', 'Out of Stock', 'Discontinued', 'Hidden') DEFAULT 'Available',
    ingredients            TEXT,           -- ThÃ nh pháº§n nguyÃªn liá»‡u
    expiration_date        TEXT,           -- Háº¡n sá»­ dá»¥ng
    storage_instructions   TEXT,           -- CÃ¡ch báº£o quáº£n
    image                  VARCHAR(255),
    created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 10. Báº£ng product_sizes: Biáº¿n thá»ƒ bÃ¡nh theo size (GiÃ¡ bÃ¡n & Tá»“n kho riÃªng tá»«ng size)
CREATE TABLE product_sizes (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    product_id      INT NOT NULL,
    size_id         INT NOT NULL,
    price           DECIMAL(15,2) NOT NULL CHECK (price >= 0),
    stock_quantity  INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    UNIQUE KEY unique_product_size (product_id, size_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
    FOREIGN KEY (size_id)    REFERENCES size(size_id)       ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- ==============================================================================
-- PHáº¦N 5: GIá»Ž HÃ€NG & ÄÆ N HÃ€NG
-- ==============================================================================
-- 11. Báº£ng cart: Giá» hÃ ng cá»§a khÃ¡ch hÃ ng (lÆ°u rÃµ size bÃ¡nh Ä‘Ã£ chá»n)
CREATE TABLE cart (
    cart_id     INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    product_id  INT NOT NULL,
    size_id     INT NOT NULL,
    quantity    INT NOT NULL CHECK (quantity > 0),
    added_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id)  REFERENCES product(product_id)    ON DELETE CASCADE,
    FOREIGN KEY (size_id)     REFERENCES size(size_id)          ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 12. Báº£ng orders: Quáº£n lÃ½ giao dá»‹ch Ä‘Æ¡n hÃ ng
CREATE TABLE orders (
    order_id        INT PRIMARY KEY AUTO_INCREMENT,
    order_code      VARCHAR(20) UNIQUE NULL,                                -- MÃ£ Ä‘Æ¡n: DH001... (PHP/BE tá»± sinh)
    customer_id     INT NOT NULL,                                           -- KhÃ¡ch hÃ ng Ä‘áº·t mua
    employee_id     INT NULL,                                               -- NhÃ¢n viÃªn phá»¥ trÃ¡ch / duyá»‡t Ä‘Æ¡n
    total_quantity  INT NOT NULL DEFAULT 1 CHECK (total_quantity > 0),      -- Tá»•ng sá»‘ lÆ°á»£ng bÃ¡nh trong Ä‘Æ¡n
    total_cost      DECIMAL(20,2) NOT NULL CHECK (total_cost >= 0),         -- Tá»•ng tiá»n thanh toÃ¡n
    payment_method  ENUM('COD', 'Momo', 'Credit Card', 'VNPay') DEFAULT 'COD',
    payment_status  ENUM('Unpaid', 'Paid', 'Refunded') DEFAULT 'Unpaid',
    status          ENUM('Pending', 'Processing', 'Shipping', 'Completed', 'Cancelled') DEFAULT 'Pending',
    order_date      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 13. Báº£ng order_shipping: ThÃ´ng tin giao nháº­n riÃªng cá»§a Ä‘Æ¡n hÃ ng (1-1 vá»›i orders)
CREATE TABLE order_shipping (
    shipping_id        INT PRIMARY KEY AUTO_INCREMENT,
    order_id           INT UNIQUE NOT NULL,
    recipient_name     VARCHAR(100) NOT NULL,    -- TÃªn ngÆ°á»i nháº­n bÃ¡nh
    recipient_phone    VARCHAR(20) NOT NULL,     -- SÄT ngÆ°á»i nháº­n
    shipping_city      VARCHAR(100) NOT NULL,    -- Tá»‰nh / ThÃ nh phá»‘
    shipping_district  VARCHAR(100) NOT NULL,    -- Quáº­n / Huyá»‡n
    shipping_ward      VARCHAR(100) NOT NULL,    -- PhÆ°á»ng / XÃ£
    shipping_street    VARCHAR(255) NOT NULL,    -- Sá»‘ nhÃ , tÃªn Ä‘Æ°á»ng
    delivery_date      DATE NULL,               -- NgÃ y mong muá»‘n nháº­n
    delivery_time      TIME NULL,               -- Giá» mong muá»‘n nháº­n
    shipping_fee       DECIMAL(10,2) DEFAULT 0 CHECK (shipping_fee >= 0),
    notes              TEXT,                    -- Ghi chÃº giao hÃ ng
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 14. Báº£ng order_detail: Chi tiáº¿t tá»«ng mÃ³n bÃ¡nh trong Ä‘Æ¡n hÃ ng
CREATE TABLE order_detail (
    order_id    INT NOT NULL,
    product_id  INT NOT NULL,
    size_id     INT NOT NULL,
    quantity    INT NOT NULL CHECK (quantity > 0),
    price       DECIMAL(15,2) NOT NULL CHECK (price >= 0),  -- ÄÆ¡n giÃ¡ táº¡i thá»i Ä‘iá»ƒm Ä‘áº·t Ä‘Æ¡n
    note        TEXT,
    PRIMARY KEY (order_id, product_id, size_id),
    FOREIGN KEY (order_id)   REFERENCES orders(order_id)   ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
    FOREIGN KEY (size_id)    REFERENCES size(size_id)       ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- ==============================================================================
-- PHáº¦N 6: THÃ”NG BÃO (NOTIFICATIONS)
-- ==============================================================================
-- 15. Báº£ng notifications: ThÃ´ng bÃ¡o Ä‘áº©y cho React FE
CREATE TABLE notifications (
    notification_id  INT PRIMARY KEY AUTO_INCREMENT,
    user_name        VARCHAR(255) NOT NULL,
    title            VARCHAR(255) NOT NULL,                              -- TiÃªu Ä‘á» thÃ´ng bÃ¡o
    message          TEXT NOT NULL,                                      -- Ná»™i dung chi tiáº¿t
    type             ENUM('order', 'system', 'promotion') DEFAULT 'order',
    reference_id     INT NULL,                                           -- order_id náº¿u type = 'order'
    is_read          BOOLEAN DEFAULT FALSE,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_name) REFERENCES users(user_name) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- ==============================================================================
-- PHAN 6 (BO SUNG): LICH SU THAY DOI TRANG THAI DON HANG
-- ==============================================================================

-- 16. Bang order_status_logs: Lich su thay doi trang thai don hang
--     Dung cho Web Admin: biet ai duyet luc may gio, ly do huy don la gi
--     Tu dong INSERT moi khi orders.status thay doi (qua BE)
CREATE TABLE order_status_logs (
    log_id       INT PRIMARY KEY AUTO_INCREMENT,
    order_id     INT NOT NULL,
    employee_id  INT NULL,                                                    -- Nhan vien thuc hien (NULL = he thong / khach tu huy)
    old_status   ENUM('Pending', 'Processing', 'Shipping', 'Completed', 'Cancelled') NULL,
    new_status   ENUM('Pending', 'Processing', 'Shipping', 'Completed', 'Cancelled') NOT NULL,
    note         TEXT,                                                        -- Ly do huy, ghi chu xu ly...
    changed_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id)    REFERENCES orders(order_id)       ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
