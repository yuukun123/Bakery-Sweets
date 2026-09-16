-- ==============================================================================
-- SEED DATA: Dữ liệu mẫu cơ bản
-- ==============================================================================
-- Kích cỡ bánh
INSERT INTO size (size_name) VALUES
('Size S (16cm)'),
('Size M (20cm)'),
('Size L (24cm)');
-- Danh mục bánh
INSERT INTO category (category_name) VALUES
('Mousse'),
('Croissant'),
('Drink');
-- Phòng ban
INSERT INTO departments (department_name, description) VALUES
('Quản Lý',             'Điều hành và quản lý hoạt động cửa hàng'),
('Bán Hàng & Thu Ngân', 'Tư vấn, bán hàng tại quầy và online'),
('Bếp Bánh',            'Sản xuất và đóng gói các loại bánh');
-- Chức vụ
INSERT INTO positions (position_name, base_salary, salary_type) VALUES
('Quản Lý Cửa Hàng',    12000000, 'monthly'),
('Nhân Viên Bán Hàng',   6500000, 'monthly'),
('Thu Ngân',              7000000, 'monthly'),
('Thợ Làm Bánh',          8000000, 'monthly');
-- Tài khoản mẫu (password: 123 đã hash bcrypt)
INSERT INTO users (user_name, email, password, role, status) VALUES
('admin',        'admin@thesweets.com',   '$2y$10$0QZVDBb/jOeoCdhAdB4JB.Sbjc.DSuksus.QtCPiXh0oEnOFOQCc2', 'admin',    'active'),
('staff_sales1', 'sales1@thesweets.com',  '$2y$10$0QZVDBb/jOeoCdhAdB4JB.Sbjc.DSuksus.QtCPiXh0oEnOFOQCc2', 'staff',    'active'),
('cus1',         'customer1@gmail.com',   '$2y$10$0QZVDBb/jOeoCdhAdB4JB.Sbjc.DSuksus.QtCPiXh0oEnOFOQCc2', 'customer', 'active');
-- Hồ sơ khách hàng
INSERT INTO customers (user_name, first_name, last_name, phone, loyalty_points) VALUES
('cus1', 'Nguyễn', 'Văn An', '0912345678', 50);
-- Hồ sơ nhân viên
INSERT INTO employees (employee_code, user_name, first_name, last_name, phone, citizen_id, department_id, position_id, hire_date) VALUES
('NV001', 'staff_sales1', 'Nguyễn Thị', 'Hoa', '0909888777', '079123456789', 2, 2, '2025-01-10');