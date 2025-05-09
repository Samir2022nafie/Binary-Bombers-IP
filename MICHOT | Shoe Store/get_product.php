<?php
require_once 'db.php';

class ProductController {
    private $productModel;

    public function __construct() {
        $db = new Database();
        $this->productModel = new Product($db->getPDO());
    }

    public function handleRequest() {
        if(isset($_GET['id'])) {
            $product = $this->productModel->getProductDetails($_GET['id']);
            header('Content-Type: application/json');
            echo json_encode($product);
        }
    }
}

$controller = new ProductController();
$controller->handleRequest();
?>
