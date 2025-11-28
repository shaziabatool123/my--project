// Sample vendor data with products
const vendors = [
    {
        id: 1,
        name: "Traditional Cap",
        specialty: "Pottery & Ceramics",
        location: "Gilgit BAltistan",
        experience: "15 years",
        rating: 4.9,
        reviews: 127,
        products: 45,
        image: "imges/batitopi3.jpg",
        badge: "Featured",
        category: "pottery",
        productsList: [
            { id: 1, name: "Handmade Clay Pot", price: "₹1,200", image: "imges/gilgiticap.png" },
            { id: 2, name: "Traditional Urli", price: "₹2,500", image: "imges/baltitopi1.jpg" },
            { id: 3, name: "Decorative Vase", price: "₹1,800", image: "imges/baltiwome1.jpg" }
        ]
    },
    {
        id: 2,
        name: "Traditional pottery G.B",
        specialty: "Textiles & Fabrics",
        location: "Gilgit BAltistan",
        experience: "25 years",
        rating: 4.8,
        reviews: 89,
        products: 32,
        image: "imges/pottery.png",
        badge: "Premium",
        category: "textiles",
        productsList: [
            { id: 1, name: "Banarasi Silk Saree", price: "₹8,500", image: "imges/handmade stone pot.webp" },
            { id: 2, name: "Handwoven Shawl", price: "₹2,200", image: "imges/OIP (5).jpeg" },
            { id: 3, name: "Silk Stole", price: "₹1,500", image: "imges/korumbo.png" }
        ]
    },
    {
        id: 3,
        name: "Gemstone Jewelers",
        specialty: "Handmade Jewelry",
        location: "Gilgit BAltistan",
        experience: "12 years",
        rating: 4.7,
        reviews: 156,
        products: 67,
        image: "imges/forehead srtip.png",
        badge: "Verified",
        category: "jewelry",
        productsList: [
            { id: 1, name: "Ruby Necklace", price: "₹12,000", image: "imges/silverjewelry.png" },
            { id: 2, name: "Pearl Earrings", price: "₹3,500", image: "imges/baltiwomen2.jpg" },
            { id: 3, name: "Silver Bracelet", price: "₹2,800", image: "imges/2022-08-24-63064489bc6dc.png" }
        ]
    }
    // ... Add more vendors with productsList
];

class VendorPage {
    constructor() {
        this.allVendors = [...vendors];
        this.filteredVendors = [...vendors];
        this.displayedCount = 8;
        this.currentFilters = {
            search: '',
            category: '',
            location: '',
            experience: ''
        };
        
        this.init();
    }

    init() {
        this.renderVendors();
        this.bindEvents();
        this.addAnimations();
        this.createProductsModal(); // Create modal for products display
    }

    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('vendor-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentFilters.search = e.target.value.toLowerCase();
                this.applyFilters();
            });
        }

        // Filter functionality
        const categoryFilter = document.getElementById('category-filter');
        const locationFilter = document.getElementById('location-filter');
        const experienceFilter = document.getElementById('experience-filter');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilters.category = e.target.value;
                this.applyFilters();
            });
        }

        if (locationFilter) {
            locationFilter.addEventListener('change', (e) => {
                this.currentFilters.location = e.target.value;
                this.applyFilters();
            });
        }

        if (experienceFilter) {
            experienceFilter.addEventListener('change', (e) => {
                this.currentFilters.experience = e.target.value;
                this.applyFilters();
            });
        }

        // Load more functionality
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreVendors();
            });
        }
    }

    applyFilters() {
        let filtered = [...this.allVendors];

        // Search filter
        if (this.currentFilters.search) {
            filtered = filtered.filter(vendor => 
                vendor.name.toLowerCase().includes(this.currentFilters.search) ||
                vendor.specialty.toLowerCase().includes(this.currentFilters.search) ||
                vendor.location.toLowerCase().includes(this.currentFilters.search)
            );
        }

        // Category filter
        if (this.currentFilters.category) {
            filtered = filtered.filter(vendor => 
                vendor.category === this.currentFilters.category
            );
        }

        // Location filter
        if (this.currentFilters.location) {
            filtered = filtered.filter(vendor => {
                const locationMap = {
                    'north': ['rajasthan', 'punjab', 'uttar pradesh'],
                    'south': ['tamil nadu', 'telangana', 'kerala'],
                    'east': ['west bengal'],
                    'west': ['rajasthan', 'gujarat']
                };
                const regions = locationMap[this.currentFilters.location] || [];
                return regions.some(region => vendor.location.toLowerCase().includes(region));
            });
        }

        // Experience filter
        if (this.currentFilters.experience) {
            filtered = filtered.filter(vendor => {
                const years = parseInt(vendor.experience);
                switch(this.currentFilters.experience) {
                    case 'beginner': return years <= 3;
                    case 'intermediate': return years > 3 && years <= 10;
                    case 'expert': return years > 10;
                    default: return true;
                }
            });
        }

        this.filteredVendors = filtered;
        this.displayedCount = 8;
        this.renderVendors();
    }

    renderVendors() {
        const grid = document.getElementById('vendors-grid');
        if (!grid) {
            console.error('Vendors grid element not found!');
            return;
        }

        const vendorsToShow = this.filteredVendors.slice(0, this.displayedCount);

        if (vendorsToShow.length === 0) {
            grid.innerHTML = `
                <div class="no-vendors" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; color: #666;">
                    <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                    <h3>No vendors found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            `;
        } else {
            grid.innerHTML = vendorsToShow.map(vendor => `
                <div class="vendor-card" data-id="${vendor.id}">
                    <div class="vendor-header">
                        <img src="${vendor.image}" alt="${vendor.name}" class="vendor-image" 
                             onerror="this.src='https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'">
                        <span class="vendor-badge ${vendor.badge.toLowerCase().replace(' ', '-')}">${vendor.badge}</span>
                    </div>
                    <div class="vendor-info">
                        <h3 class="vendor-name">${vendor.name}</h3>
                        <span class="vendor-specialty">${vendor.specialty}</span>
                        <div class="vendor-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${vendor.location}
                        </div>
                        <div class="vendor-stats">
                            <div class="stat">
                                <span class="stat-value">${vendor.experience}</span>
                                <span class="stat-label">Experience</span>
                            </div>
                            <div class="stat">
                                <span class="stat-value">${vendor.products}</span>
                                <span class="stat-label">Products</span>
                            </div>
                            <div class="stat">
                                <span class="stat-value">${vendor.reviews}</span>
                                <span class="stat-label">Reviews</span>
                            </div>
                        </div>
                        <div class="vendor-rating">
                            <div class="stars">${this.renderStars(vendor.rating)}</div>
                            <span class="rating-value">${vendor.rating}</span>
                        </div>
                        <div class="vendor-actions">
                            <button class="view-btn" onclick="vendorPage.viewVendorProducts(${vendor.id})">
                                <i class="fas fa-eye"></i> View Products
                            </button>
                            <button class="contact-btn" onclick="vendorPage.contactVendor(${vendor.id})">
                                <i class="fas fa-envelope"></i> Contact
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        this.updateLoadMoreButton();
        this.animateVendorCards();
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }

    loadMoreVendors() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            loadMoreBtn.disabled = true;
            
            setTimeout(() => {
                this.displayedCount += 4;
                this.renderVendors();
                
                loadMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Load More Vendors';
                loadMoreBtn.disabled = false;
            }, 1000);
        }
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            if (this.displayedCount >= this.filteredVendors.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'flex';
            }
        }
    }

    createProductsModal() {
        // Create modal element
        const modal = document.createElement('div');
        modal.id = 'products-modal';
        modal.className = 'products-modal';
        modal.innerHTML = `
            <div class="modal-overlay" id="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3 id="modal-vendor-name">Vendor Products</h3>
                    <button class="close-modal" id="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="products-grid" id="modal-products-grid"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add modal styles
        this.addModalStyles();
        
        // Bind modal events
        this.bindModalEvents();
    }

    addModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .products-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
            }
            
            .products-modal.active {
                display: block;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border-radius: 15px;
                width: 90%;
                max-width: 1000px;
                max-height: 80vh;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem 2rem;
                border-bottom: 1px solid #e2e8f0;
                background: #f8f9fa;
            }
            
            .modal-header h3 {
                margin: 0;
                color: #2d3748;
                font-size: 1.5rem;
            }
            
            .close-modal {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
                padding: 0;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .close-modal:hover {
                background: #e53e3e;
                color: white;
            }
            
            .modal-body {
                padding: 2rem;
                max-height: 60vh;
                overflow-y: auto;
            }
            
            #modal-products-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1.5rem;
            }
            
            .modal-product-card {
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
                border: 1px solid #e2e8f0;
            }
            
            .modal-product-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            }
            
            .modal-product-image {
                width: 100%;
                height: 200px;
                object-fit: cover;
            }
            
            .modal-product-info {
                padding: 1.5rem;
            }
            
            .modal-product-name {
                font-size: 1.1rem;
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 0.5rem;
            }
            
            .modal-product-price {
                font-size: 1.3rem;
                font-weight: bold;
                color: #e53e3e;
            }
            
            .no-products-message {
                grid-column: 1 / -1;
                text-align: center;
                padding: 3rem 2rem;
                color: #666;
            }
            
            .no-products-message i {
                font-size: 3rem;
                color: #ccc;
                margin-bottom: 1rem;
            }
        `;
        document.head.appendChild(style);
    }

    bindModalEvents() {
        const modal = document.getElementById('products-modal');
        const overlay = document.getElementById('modal-overlay');
        const closeBtn = document.getElementById('close-modal');

        if (overlay) {
            overlay.addEventListener('click', () => {
                this.closeProductsModal();
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeProductsModal();
            });
        }

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeProductsModal();
            }
        });
    }

    viewVendorProducts(vendorId) {
        const vendor = this.allVendors.find(v => v.id == vendorId);
        if (!vendor) {
            this.showNotification('Vendor not found!', 'error');
            return;
        }

        const modal = document.getElementById('products-modal');
        const vendorName = document.getElementById('modal-vendor-name');
        const productsGrid = document.getElementById('modal-products-grid');

        if (!modal || !vendorName || !productsGrid) {
            this.showNotification('Error loading products!', 'error');
            return;
        }

        // Update modal title
        vendorName.textContent = `${vendor.name} - Products`;

        // Display products
        if (vendor.productsList && vendor.productsList.length > 0) {
            productsGrid.innerHTML = vendor.productsList.map(product => `
                <div class="modal-product-card">
                    <img src="${product.image}" alt="${product.name}" class="modal-product-image"
                         onerror="this.src='https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop'">
                    <div class="modal-product-info">
                        <h4 class="modal-product-name">${product.name}</h4>
                        <div class="modal-product-price">${product.price}</div>
                    </div>
                </div>
            `).join('');
        } else {
            productsGrid.innerHTML = `
                <div class="no-products-message">
                    <i class="fas fa-box-open"></i>
                    <h3>No Products Available</h3>
                    <p>This vendor hasn't added any products yet.</p>
                </div>
            `;
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        this.showNotification(`Showing products from ${vendor.name}`);
    }

    closeProductsModal() {
        const modal = document.getElementById('products-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    contactVendor(vendorId) {
        const vendor = this.allVendors.find(v => v.id == vendorId);
        if (vendor) {
            // Create contact modal or redirect
            this.showContactModal(vendor);
        }
    }

    showContactModal(vendor) {
        const modal = document.createElement('div');
        modal.className = 'contact-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Contact ${vendor.name}</h3>
                    <button class="close-modal" onclick="this.closest('.contact-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Contact information for ${vendor.name}:</p>
                    <div class="contact-info">
                        <p><strong>Specialty:</strong> ${vendor.specialty}</p>
                        <p><strong>Location:</strong> ${vendor.location}</p>
                        <p><strong>Experience:</strong> ${vendor.experience}</p>
                    </div>
                    <div class="contact-form">
                        <textarea placeholder="Type your message to ${vendor.name}..." rows="4"></textarea>
                        <button class="send-message-btn">Send Message</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add contact modal styles
        const style = document.createElement('style');
        if (!document.querySelector('#contact-modal-styles')) {
            style.id = 'contact-modal-styles';
            style.textContent = `
                .contact-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .contact-modal .modal-content {
                    background: white;
                    border-radius: 15px;
                    width: 90%;
                    max-width: 500px;
                    max-height: 80vh;
                    overflow: auto;
                }
                
                .contact-info {
                    background: #f8f9fa;
                    padding: 1rem;
                    border-radius: 8px;
                    margin: 1rem 0;
                }
                
                .contact-form textarea {
                    width: 100%;
                    padding: 1rem;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    margin-bottom: 1rem;
                    resize: vertical;
                }
                
                .send-message-btn {
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    cursor: pointer;
                    width: 100%;
                }
                
                .send-message-btn:hover {
                    background: #5a6fd8;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Bind send message event
        const sendBtn = modal.querySelector('.send-message-btn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                const textarea = modal.querySelector('textarea');
                const message = textarea.value.trim();
                if (message) {
                    this.showNotification(`Message sent to ${vendor.name}!`);
                    modal.remove();
                } else {
                    this.showNotification('Please enter a message!', 'error');
                }
            });
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `vendor-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#48bb78' : '#e53e3e'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    addAnimations() {
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.vendor-card, .stat-card, .benefit-card');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const isVisible = elementTop < window.innerHeight - 100;
                
                if (isVisible) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

        const animatedElements = document.querySelectorAll('.vendor-card, .stat-card, .benefit-card');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        animateOnScroll();
        window.addEventListener('scroll', animateOnScroll);
    }

    animateVendorCards() {
        const vendorCards = document.querySelectorAll('.vendor-card');
        vendorCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.vendorPage = new VendorPage();
    console.log('Vendor page initialized with working product viewing!');
});