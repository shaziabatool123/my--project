// Sample product data
const products = [
    {
        id: 1,
        name: "Handmade stone pot",
        category: "   Stone & Gem Crafts",
        description: "Stone Tea Sets & Bowls",
        price: 490.00,
        rating: 5,
        reviews: 1,
        image: "imges/handmade stone pot.webp",
        favorite: true,
        bestSelling: true,
        topRated: true
    },
    {
        id: 2,
        name: "Handmade Baskit",
        category: "handmade ",
        description: "Traditional herbal remedy for respiratory health",
        price: 650.00,
        rating: 4,
        reviews: 3,
        image: "imges/hand1.jpg",
        favorite: false,
        bestSelling: true,
        topRated: false
    },
    {
        id: 3,
        name: "forehead srtip",
        category: "tea",
        description: "Pure Himalayan tea with authentic flavor and aroma",
        price: 680.00,
        rating: 4,
        reviews: 2,
        image: "imges/forehead srtip.png",
        favorite: true,
        bestSelling: false,
        topRated: true
    },
    {
        id: 4,
        name: "Handmade pottery",
        category: "grains",
        description: "Organic buckwheat grains for healthy cooking",
        price: 792.00,
        rating: 5,
        reviews: 4,
        image: "imges/pottery.png",
        favorite: false,
        bestSelling: true,
        topRated: true
    },
    {
        id: 5,
        name: "silver jewelry",
        category: "herbal",
        description: "Pure Himalayan Shilajit resin for energy and vitality",
        price: 1200.00,
        rating: 5,
        reviews: 12,
        image: "imges/silverjewelry.png",
        favorite: true,
        bestSelling: true,
        topRated: true
    },
    {
        id: 6,
        name: "Balti Cap",
        category: "tea",
        description: "Fresh green tea leaves from Darjeeling gardens",
        price: 450.00,
        rating: 4,
        reviews: 8,
        image: "imges/gilgiticap.png",
        favorite: false,
        bestSelling: false,
        topRated: false
    },
    {
        id: 7,
        name: "Balti korumbo",
        category: "grains",
        description: "Protein-rich organic quinoa grains",
        price: 890.00,
        rating: 4,
        reviews: 6,
        image: "imges/korumbo.png",
        favorite: true,
        bestSelling: true,
        topRated: false
    },
    {
        id: 8,
        name: "Handmade silverjewelry",
        category: "spices",
        description: "Pure turmeric powder with high curcumin content",
        price: 320.00,
        rating: 5,
        reviews: 15,
        image: "imges/silverjewelry.png",
        favorite: false,
        bestSelling: true,
        topRated: true
    }
];

class BrandPage {
    constructor() {
        this.allProducts = [...products];
        this.filteredProducts = [...products];
        this.displayedCount = 8;
        this.currentFilters = {
            search: '',
            categories: [],
            minPrice: 0,
            maxPrice: 38000,
            mostFavorite: false,
            sortBy: 'default'
        };
        
        this.init();
    }

    init() {
        console.log('Initializing Brand Page...');
        this.renderProducts();
        this.bindEvents();
        this.updateItemCount();
    }

    bindEvents() {
        // Main search
        const mainSearch = document.getElementById('main-search');
        const searchBtn = document.querySelector('.search-btn');
        
        if (mainSearch) {
            mainSearch.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value.toLowerCase();
                this.applyFilters();
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.applyFilters();
            });
        }

        // Most Favorite checkbox
        const mostFavorite = document.getElementById('most-favorite');
        if (mostFavorite) {
            mostFavorite.addEventListener('change', (e) => {
                this.currentFilters.mostFavorite = e.target.checked;
                this.applyFilters();
            });
        }

        // Sort select
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentFilters.sortBy = e.target.value;
                this.applyFilters();
            });
        }

        // Price filters
        const minPrice = document.getElementById('min-price');
        const maxPrice = document.getElementById('max-price');
        
        if (minPrice) {
            minPrice.addEventListener('input', (e) => {
                this.currentFilters.minPrice = parseInt(e.target.value) || 0;
                this.applyFilters();
            });
        }
        
        if (maxPrice) {
            maxPrice.addEventListener('input', (e) => {
                this.currentFilters.maxPrice = parseInt(e.target.value) || 38000;
                this.applyFilters();
            });
        }

        // Category filters
        const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
        categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateCategoryFilters();
            });
        });

        // Filter buttons
        const applyFilters = document.getElementById('apply-filters');
        if (applyFilters) {
            applyFilters.addEventListener('click', () => {
                this.applyFilters();
            });
        }

        const resetFilters = document.getElementById('reset-filters');
        if (resetFilters) {
            resetFilters.addEventListener('click', () => {
                this.resetFilters();
            });
        }

        // Load more
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMore();
            });
        }
    }

    updateCategoryFilters() {
        const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
            .map(checkbox => checkbox.value);
        this.currentFilters.categories = selectedCategories;
    }

    applyFilters() {
        console.log('Applying filters:', this.currentFilters);
        
        let filtered = [...this.allProducts];

        // Search filter
        if (this.currentFilters.search) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(this.currentFilters.search) ||
                product.description.toLowerCase().includes(this.currentFilters.search)
            );
        }

        // Category filter
        if (this.currentFilters.categories.length > 0) {
            filtered = filtered.filter(product => 
                this.currentFilters.categories.includes(product.category)
            );
        }

        // Price filter
        filtered = filtered.filter(product => 
            product.price >= this.currentFilters.minPrice && 
            product.price <= this.currentFilters.maxPrice
        );

        // Most Favorite filter
        if (this.currentFilters.mostFavorite) {
            filtered = filtered.filter(product => product.favorite);
        }

        // Sort
        filtered = this.sortProducts(filtered, this.currentFilters.sortBy);

        this.filteredProducts = filtered;
        this.displayedCount = 8; // Reset to initial count
        this.renderProducts();
        this.updateItemCount();
    }

    sortProducts(products, sortBy) {
        console.log('Sorting by:', sortBy);
        
        switch (sortBy) {
            case 'price-low':
                return [...products].sort((a, b) => a.price - b.price);
            case 'price-high':
                return [...products].sort((a, b) => b.price - a.price);
            case 'best-selling':
                return [...products].sort((a, b) => (b.bestSelling ? 1 : 0) - (a.bestSelling ? 1 : 0));
            case 'top-rated':
                return [...products].sort((a, b) => b.rating - a.rating);
            case 'most-favorite':
                return [...products].sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));
            default:
                return products;
        }
    }

    resetFilters() {
        console.log('Resetting all filters');
        
        // Reset form elements
        document.getElementById('main-search').value = '';
        document.getElementById('most-favorite').checked = false;
        document.getElementById('sort-select').value = 'default';
        document.getElementById('min-price').value = 0;
        document.getElementById('max-price').value = 38000;
        
        document.querySelectorAll('input[name="category"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Reset filter state
        this.currentFilters = {
            search: '',
            categories: [],
            minPrice: 0,
            maxPrice: 38000,
            mostFavorite: false,
            sortBy: 'default'
        };

        this.applyFilters();
    }

    renderProducts() {
        const grid = document.getElementById('products-grid');
        if (!grid) {
            console.error('Products grid element not found!');
            return;
        }

        const productsToShow = this.filteredProducts.slice(0, this.displayedCount);
        console.log('Rendering products:', productsToShow.length);

        if (productsToShow.length === 0) {
            grid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters or search terms</p>
                </div>
            `;
        } else {
            grid.innerHTML = productsToShow.map(product => `
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" 
                             onerror="this.src='https://via.placeholder.com/300x200/667eea/white?text=Product+Image'">
                    </div>
                    <div class="product-info">
                        <div class="product-category">${this.getCategoryName(product.category)}</div>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-rating">
                            <div class="stars">${this.renderStars(product.rating)}</div>
                            <span class="rating-count">(${product.reviews})</span>
                        </div>
                        <div class="product-price">Rs${product.price.toFixed(2)}</div>
                        <div class="product-actions">
                            <button class="add-to-cart" onclick="brandPage.addToCart(${product.id})">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                            <button class="favorite-btn ${product.favorite ? 'active' : ''}" 
                                    onclick="brandPage.toggleFavorite(${product.id})">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        this.updateLoadMoreButton();
    }

    renderStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= rating ? '★' : '☆';
        }
        return stars;
    }

    getCategoryName(category) {
        const categories = {
            'stone_gem_crafts': ' Stone & Gem Crafts',
            'wool_textile_crafts': '  Wool & Textile Crafts',
            'wood_bamboo_crafts"': 'Wood & Bamboo Crafts',
            'embroidery_fabric_art': '      Embroidery & Fabric Art'
        };
        return categories[category] || category;
    }

    loadMore() {
        this.displayedCount += 4;
        this.renderProducts();
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            if (this.displayedCount >= this.filteredProducts.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }
    }

    updateItemCount() {
        const countElement = document.querySelector('.item-count');
        if (countElement) {
            countElement.textContent = `${this.filteredProducts.length} items found`;
        }
    }

    addToCart(productId) {
        const product = this.allProducts.find(p => p.id === productId);
        if (product) {
            this.showNotification(`${product.name} added to cart!`);
        }
    }

    toggleFavorite(productId) {
        const product = this.allProducts.find(p => p.id === productId);
        if (product) {
            product.favorite = !product.favorite;
            this.applyFilters(); // Re-apply filters to update display
        }
    }

    showNotification(message) {
        // Simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.brandPage = new BrandPage();
    console.log('Brand page initialized successfully!');
});