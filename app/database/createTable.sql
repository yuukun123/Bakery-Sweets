-- ==============================================================================
-- HỆ THỐNG CƠ SỞ DỮ LIỆU CỬA HÀNG BÁNH "THE SWEETS"
-- Kiến trúc: React (FE) + Backend API (BE)
-- Tổng cộng: 15 BẢNG
-- Phiên bản: MySQL 8.0+ | Charset: utf8mb4_unicode_ci
-- ==============================================================================
SET FOREIGN_KEY_CHECKS = 0;
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
-- PHẦN 1: TÀI KHOẢN XÁC THỰC
-- ==============================================================================
-- 1. Bảng users: Tài khoản đăng nhập (Chỉ lo xác thực & phân quyền)
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
-- PHẦN 2: KHÁCH HÀNG & SỔ ĐỊA CHỈ
-- ==============================================================================
-- 2. Bảng customers: Hồ sơ thông tin cá nhân khách hàng (1-1 với users)
CREATE TABLE customers (
    customer_id    INT PRIMARY KEY AUTO_INCREMENT,
    user_name      VARCHAR(255) UNIQUE NOT NULL,
    first_name     VARCHAR(100) NOT NULL,
    last_name      VARCHAR(100) NOT NULL,
    phone          VARCHAR(20) UNIQUE,
    gender         ENUM('Male', 'Female', 'Other') DEFAULT 'Other',
    date_of_birth  DATE,
    loyalty_points INT DEFAULT 0 CHECK (loyalty_points >= 0),
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_name) REFERENCES users(user_name) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 3. Bảng customer_addresses: Sổ địa chỉ nhận hàng (1 khách có nhiều địa chỉ)
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
-- PHẦN 3: QUẢN LÝ NHÂN SỰ (HRM)
-- ==============================================================================
-- 4. Bảng departments: Phòng ban / Bộ phận trong cửa hàng
CREATE TABLE departments (
    department_id    INT PRIMARY KEY AUTO_INCREMENT,
    department_name  VARCHAR(100) NOT NULL UNIQUE,
    description      TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 5. Bảng positions: Chức vụ / Vị trí công việc & Lương cơ bản
CREATE TABLE positions (
    position_id    INT PRIMARY KEY AUTO_INCREMENT,
    position_name  VARCHAR(100) NOT NULL UNIQUE,
    base_salary    DECIMAL(15,2) NOT NULL DEFAULT 0 CHECK (base_salary >= 0),
    salary_type    ENUM('monthly', 'hourly') DEFAULT 'monthly',
    description    TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 6. Bảng employees: Hồ sơ nhân viên (liên kết users để đăng nhập bán hàng)
CREATE TABLE employees (
    employee_id    INT PRIMARY KEY AUTO_INCREMENT,
    employee_code  VARCHAR(20) UNIQUE NOT NULL,        -- Mã NV: NV001, NV002...
    user_name      VARCHAR(255) UNIQUE NULL,           -- Tài khoản đăng nhập nội bộ
    first_name     VARCHAR(100) NOT NULL,
    last_name      VARCHAR(100) NOT NULL,
    phone          VARCHAR(20) UNIQUE,
    citizen_id     VARCHAR(20) UNIQUE,                 -- Số CCCD/CMND
    gender         ENUM('Male', 'Female', 'Other') DEFAULT 'Male',
    date_of_birth  DATE,
    department_id  INT NULL,
    position_id    INT NULL,
    hire_date      DATE NOT NULL,                      -- Ngày vào làm
    contract_type  ENUM('Full-time', 'Part-time', 'Probation') DEFAULT 'Full-time',
    status         ENUM('Active', 'On Leave', 'Resigned') DEFAULT 'Active',
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_name)      REFERENCES users(user_name)           ON DELETE SET NULL,
    FOREIGN KEY (department_id)  REFERENCES departments(department_id) ON DELETE SET NULL,
    FOREIGN KEY (position_id)    REFERENCES positions(position_id)     ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- ==============================================================================
-- PHẦN 4: SẢN PHẨM & BIẾN THỂ KÍCH CỠ
-- ==============================================================================
-- 7. Bảng category: Danh mục bánh (Mousse, Croissant, Drink...)
CREATE TABLE category (
    category_id    INT PRIMARY KEY AUTO_INCREMENT,
    category_name  VARCHAR(255) UNIQUE NOT NULL,
    description    TEXT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 8. Bảng size: Danh mục kích cỡ (Size S 16cm, Size M 20cm...)
CREATE TABLE size (
    size_id    INT PRIMARY KEY AUTO_INCREMENT,
    size_name  VARCHAR(50) UNIQUE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 9. Bảng product: Thông tin chung của bánh (không lưu price, size_id trực tiếp)
CREATE TABLE product (
    product_id             INT PRIMARY KEY AUTO_INCREMENT,
    product_name           VARCHAR(255) NOT NULL,
    category_id            INT NULL,
    status                 ENUM('Available', 'Out of Stock', 'Discontinued', 'Hidden') DEFAULT 'Available',
    ingredients            TEXT,           -- Thành phần nguyên liệu
    expiration_date        TEXT,           -- Hạn sử dụng
    storage_instructions   TEXT,           -- Cách bảo quản
    image                  VARCHAR(255),
    created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 10. Bảng product_sizes: Biến thể bánh theo size (Giá bán & Tồn kho riêng từng size)
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
-- PHẦN 5: GIỎ HÀNG & ĐƠN HÀNG
-- ==============================================================================
-- 11. Bảng cart: Giỏ hàng của khách hàng (lưu rõ size bánh đã chọn)
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
-- 12. Bảng orders: Quản lý giao dịch đơn hàng
CREATE TABLE orders (
    order_id        INT PRIMARY KEY AUTO_INCREMENT,
    order_code      VARCHAR(20) UNIQUE NULL,                                -- Mã đơn: DH001... (PHP/BE tự sinh)
    customer_id     INT NOT NULL,                                           -- Khách hàng đặt mua
    employee_id     INT NULL,                                               -- Nhân viên phụ trách / duyệt đơn
    total_quantity  INT NOT NULL DEFAULT 1 CHECK (total_quantity > 0),      -- Tổng số lượng bánh trong đơn
    total_cost      DECIMAL(20,2) NOT NULL CHECK (total_cost >= 0),         -- Tổng tiền thanh toán
    payment_method  ENUM('COD', 'Momo', 'Credit Card', 'VNPay') DEFAULT 'COD',
    payment_status  ENUM('Unpaid', 'Paid', 'Refunded') DEFAULT 'Unpaid',
    status          ENUM('Pending', 'Processing', 'Shipping', 'Completed', 'Cancelled') DEFAULT 'Pending',
    order_date      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 13. Bảng order_shipping: Thông tin giao nhận riêng của đơn hàng (1-1 với orders)
CREATE TABLE order_shipping (
    shipping_id        INT PRIMARY KEY AUTO_INCREMENT,
    order_id           INT UNIQUE NOT NULL,
    recipient_name     VARCHAR(100) NOT NULL,    -- Tên người nhận bánh
    recipient_phone    VARCHAR(20) NOT NULL,     -- SĐT người nhận
    shipping_city      VARCHAR(100) NOT NULL,    -- Tỉnh / Thành phố
    shipping_district  VARCHAR(100) NOT NULL,    -- Quận / Huyện
    shipping_ward      VARCHAR(100) NOT NULL,    -- Phường / Xã
    shipping_street    VARCHAR(255) NOT NULL,    -- Số nhà, tên đường
    delivery_date      DATE NULL,               -- Ngày mong muốn nhận
    delivery_time      TIME NULL,               -- Giờ mong muốn nhận
    shipping_fee       DECIMAL(10,2) DEFAULT 0 CHECK (shipping_fee >= 0),
    notes              TEXT,                    -- Ghi chú giao hàng
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- 14. Bảng order_detail: Chi tiết từng món bánh trong đơn hàng
CREATE TABLE order_detail (
    order_id    INT NOT NULL,
    product_id  INT NOT NULL,
    size_id     INT NOT NULL,
    quantity    INT NOT NULL CHECK (quantity > 0),
    price       DECIMAL(15,2) NOT NULL CHECK (price >= 0),  -- Đơn giá tại thời điểm đặt đơn
    note        TEXT,
    PRIMARY KEY (order_id, product_id, size_id),
    FOREIGN KEY (order_id)   REFERENCES orders(order_id)   ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
    FOREIGN KEY (size_id)    REFERENCES size(size_id)       ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- ==============================================================================
-- PHẦN 6: THÔNG BÁO (NOTIFICATIONS)
-- ==============================================================================
-- 15. Bảng notifications: Thông báo đẩy cho React FE
CREATE TABLE notifications (
    notification_id  INT PRIMARY KEY AUTO_INCREMENT,
    user_name        VARCHAR(255) NOT NULL,
    title            VARCHAR(255) NOT NULL,                              -- Tiêu đề thông báo
    message          TEXT NOT NULL,                                      -- Nội dung chi tiết
    type             ENUM('order', 'system', 'promotion') DEFAULT 'order',
    reference_id     INT NULL,                                           -- order_id nếu type = 'order'
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
