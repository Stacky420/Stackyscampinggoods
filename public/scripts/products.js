document.addEventListener('DOMContentLoaded', () => {
    fetch('/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const dynamicProductsContainer = document.getElementById('dynamic-products');
            dynamicProductsContainer.innerHTML = '';

            const rowElement = document.createElement('div');
            rowElement.classList.add('row', 'gy-5'); // Add vertical spacing between rows

            data.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('col-md-4', 'mb-4', 'd-flex'); // Use flexbox for equal-height columns

                productElement.innerHTML = `
                    <div class="card border border-dark h-100">
                        <img src="images/${product.image}" class="card-img-top img-fluid" alt="${product.name}" style="height: 200px; object-fit: cover;">
                        <div class="card-body d-flex flex-column">
                            <p class="card-text">${product.name} - $${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                `;

                rowElement.appendChild(productElement);
            });

            dynamicProductsContainer.appendChild(rowElement);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            dynamicProductsContainer.innerHTML = '<p>Failed to load products. Please try again later.</p>';
        });
});
