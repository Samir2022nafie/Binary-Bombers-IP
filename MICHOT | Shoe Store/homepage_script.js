document.addEventListener('DOMContentLoaded', () => {
    // Brand filtering functionality
    let selectedBrand = null;
    
    window.filterProducts = function(brand) {
        const brandCards = document.querySelectorAll('.brand-card');
        brandCards.forEach(card => card.classList.remove('selected'));
        
        if(selectedBrand === brand) {
            selectedBrand = null;
            document.querySelectorAll('.product-card').forEach(card => 
                card.style.display = 'block');
        } else {
            selectedBrand = brand;
            document.querySelector(.brand-card[data-brand="${brand}"])
                .classList.add('selected');
            document.querySelectorAll('.product-card').forEach(card => {
                card.style.display = card.dataset.brand === brand ? 'block' : 'none';
            });
        }
    }

    // Product modal functionality
    window.showProductModal = async function(productId) {
        const response = await fetch(get_product.php?id=${productId});
        const product = await response.json();
        
        const modalContent = `
            <div class="modal-product">
                <img src="uploads/shoes/${product.picture}" 
                     alt="${product.name}" style="width:100%">
                <h2>${product.brand} ${product.name}</h2>
                <p>${product.category}</p>
                <p class="price">$${product.price}</p>
                <p>or 4 payments of $${(product.price / 4).toFixed(2)} with <strong>AttaBuy</strong></p>
                
                <div class="size-selector">
                    ${['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5']
                        .map(size => <button class="size-btn">${size}</button>).join('')}
                </div>
                
                <button class="add-to-bag">Add to Bag</button>
            </div>
        `;
        
        document.getElementById('modalContent').innerHTML = modalContent;
        document.getElementById('productModal').style.display = 'block';
        document.getElementById('modalOverlay').style.display = 'block';
    }

    window.closeModal = function() {
        document.getElementById('productModal').style.display = 'none';
        document.getElementById('modalOverlay').style.display = 'none';
    }
});
