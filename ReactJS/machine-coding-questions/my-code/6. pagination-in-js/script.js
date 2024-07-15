document.addEventListener("DOMContentLoaded", function () {
    let products = [];
    let page = 1;
    const app = document.getElementById("app");
    const fetchProducts = async (limit) => {
        const respone = await fetch(`https://dummyjson.com/products?limit=${limit}`);
        const data = await respone.json();

        if (data && data.products) {
            products = data.products;
            render();
        }
    }
    fetchProducts(100);

    function render() {
        const productsContainer = document.createElement("div");
        app.innerHTML = ""
        app.appendChild(productsContainer);
        productsContainer.classList.add("products");

        if (products.length > 0) {
            products.slice(page * 10 - 10, page * 10).forEach((product) => {
                const productElement = document.createElement("div");
                productElement.classList.add("products__single");
                productElement.innerHTML = `
                <img src=${product.thumbnail} alt=${product.title}/>
                <span>${product.title}<span>
                `
                productsContainer.appendChild(productElement);
            })

            const pagination = document.createElement("div");
            pagination.classList.add("pagination");

            // Display the previous button
            if (page > 1) {
                const prevButton = createPaginationButton("⏮️", () => {
                    selectPageHandler(page - 1);
                });
                pagination.appendChild(prevButton);
            }
            // Display the middle buttons
            for (let i = 0; i < products.length / 10; i++) {
                const pageButton = createPaginationButton(i + 1, () => {
                    selectPageHandler(i + 1);
                });
                pagination.appendChild(pageButton);
            }

            // Display the next button
            if (page < products.length / 10) {
                const nextButton = createPaginationButton("⏭️", () => {
                    selectPageHandler(page + 1);
                });
                pagination.appendChild(nextButton);
            }
            app.appendChild(pagination);
        }
    }
    const createPaginationButton = (text, clickHandler) => {
        const button = document.createElement("button");
        button.textContent = text;
        button.addEventListener("click", clickHandler);
        return button;
    }

    const selectPageHandler = (selectedPage) => {
        console.log("Invoked with ", selectedPage)
        if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage != page) {
            page = selectedPage;
            render();
        }
    }
})