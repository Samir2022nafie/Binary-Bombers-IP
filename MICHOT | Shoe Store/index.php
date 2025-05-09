<?php
session_start();
require_once 'db.php';

class Product {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function getAllProducts() {
        $stmt = $this->pdo->query("SELECT * FROM products");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getProductDetails($productId) {
        $stmt = $this->pdo->prepare("SELECT * FROM products WHERE product_id = ?");
        $stmt->execute([$productId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}

// Database connection
$db = new Database();
$productModel = new Product($db->getPDO());

// Get all products
$products = $productModel->getAllProducts();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>MICHOT | Shoe Store</title>
    <link rel="stylesheet" href="homepage_style.css">
</head>
<body>
    <!-- Modal Overlay -->
    <div class="modal-overlay" id="modalOverlay"></div>
    <div class="product-modal" id="productModal">
        <div id="modalContent"></div>
        <button onclick="closeModal()" style="margin-top: 1rem">Close</button>
    </div>

    <!-- Header -->
    <header>
        <div class="logo">MICHOT Footwear</div>
        <nav>
            <a href="#">Women</a>
            <a href="#">Men</a>
            <a href="#">Kids</a>
            <a href="#">Sports</a>
        </nav>
        <div class="auth-section">
            <?php if (isset($_SESSION['user_id'])): ?>
                <!-- Logged-in state -->
                <a href="profile.php" class="user-icon">👤</a>
                <a href="logout.php" class="auth-btn">Logout</a>
            <?php else: ?>
                <!-- Guest state -->
                <a href="login.php" class="auth-btn">Sign In</a>
                <a href="register.php" class="auth-btn">Register</a>
            <?php endif; ?>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero" style="background-image: url('uploads/backgrounds/search.jpg')">
        <h1>Search for shoes, brands, categories etc.</h1>
        <div class="search-bar">
            <input type="text" placeholder="Search">
            <button>Search</button>
        </div>
    </section>

    <!-- Featured Brands Section -->
    <section class="hero" style="background-color:rgb(19, 19, 44); color: white;">
        <h2>Featured Brands</h2>
        <div class="brand-grid">
            <?php foreach (['Nike', 'Adidas', 'New Balance', 'Jordans', "Yeezy's", 'Sandals'] as $brand): ?>
                <div class="brand-card" 
                     data-brand="<?= htmlspecialchars($brand) ?>"
                     onclick="filterProducts('<?= htmlspecialchars($brand) ?>')">
                    <img src="uploads/logos/<?= strtolower(str_replace([' ', "'"], ['_', ''], $brand)) ?>.png" 
                         alt="<?= htmlspecialchars($brand) ?>">
                    <p><?= htmlspecialchars($brand) ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- Stock Section -->
    <section class="stock">
        <h2>Stock</h2>
        <div class="product-grid" id="productGrid">
            <?php foreach ($products as $product): ?>
                <div class="product-card" 
                     onclick="showProductModal(<?= $product['product_id'] ?>)"
                     data-brand="<?= htmlspecialchars($product['brand']) ?>">
                    <img src="uploads/shoes/<?= htmlspecialchars($product['picture']) ?>" 
                         alt="<?= htmlspecialchars($product['name']) ?>">
                    <h3><?= htmlspecialchars($product['brand']) ?></h3>
                    <p class="shoe-name"><?= htmlspecialchars($product['name']) ?></p>
                    <p class="category"><?= htmlspecialchars($product['category']) ?></p>
                    <p class="price">$<?= htmlspecialchars($product['price']) ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </section>

    <script src="homepage_script.js"></script>
</body>
</html>
