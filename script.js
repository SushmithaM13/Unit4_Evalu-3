let cart = [];
let reviews = [];
async function fetchProductsAndReviews() {
    try {
        const productResponse = await fetch(`https://evaluation-98bd1-default-rtdb.firebaseio.com/products.json`);
        const reviewResponse = await fetch(`https://evalution3-9b867-default-rtdb.firebaseio.com/users.json`);

        const productData = await productResponse.json();
        const reviewData = await reviewResponse.json();

        console.log("Raw Product Data:", productData); 
        console.log("Review Data:", reviewData);  

        const products = Array.isArray(productData.products) ? productData.products : Object.values(productData);

        if (products.length > 0) {
            displayProducts(products);
        } else {
            console.error("No products found.");
        }
    } catch (error) {
        console.error("Error fetching products or reviews:", error);
    }
}

// Display products on the webpage
function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; 

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        
        productElement.innerHTML = `
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price} <del>$${product.strikePrice}</del></p>
            <p>Category: ${product.category}</p>
            <div>
                ${product.images.filter(img => img).map(img => `<img src="${img}" width="100" alt="${product.title}">`).join('')}
            </div>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}
function addToCart(productId) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    console.log("Cart:", cart);
    alert(`Product ${productId} added to cart.`);
}

window.onload = fetchProductsAndReviews;