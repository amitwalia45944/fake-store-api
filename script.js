const loader = document.getElementById("loader");
let error_mssg = document.getElementById("error-message");

let url = 'https://fakestoreapi.com/products';

window.addEventListener("load", () => {
    fetch_item(url);
});

function reload() {
    window.location.reload();
};

function fetch_item(url) {
    loader.style.display = "block";
    error_mssg.textContent = "";

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("API network response problem");
            } else {
                return response.json();
            }
        })
        .then((products) => {
            if (products.length > 0) {

                bind_data(products);

                let container_data = document.getElementById("cards-container");

                container_data.addEventListener("click", (event) => {

                    const target_card = event.target.closest(".card");

                    const clicked_product = target_card.querySelector(".product-id");
                    const pid_of_product = clicked_product.textContent.split(":")[1].trim();

                    const found_product = products.find((item) => {
                        return item.id === parseInt(pid_of_product);
                    });

                    if (found_product) {
                        display(found_product);

                    } else {
                        console.log('not found');
                    }
                    container_data.style.display = 'none';
                });
            } else {
                show_no_product_message();
            }
        })
        .catch((error) => {
            error_mssg.textContent = "Error: " + error.message;
        })
        .finally(() => {
            loader.style.display = "none";
        });
};

function show_no_product_message() {

    const mssg = document.getElementById("no-products-message");
    mssg.innerHTML = "No Products fetched from api";
    mssg.style.display = "block";
}

function bind_data(products) {
    const cards_container = document.getElementById("cards-container");
    const product_card_template = document.getElementById("template-product-card");

    cards_container.innerHTML = "";

    products.map((product) => {
        const card_clone = product_card_template.content.cloneNode(true);
        fill_data_in_card(card_clone, product);
        cards_container.appendChild(card_clone);
        return;
    });

};

function fill_data_in_card(card_clone, product) {

    const product_img = card_clone.querySelector("#product-img");
    const product_title = card_clone.querySelector("#product-title");
    let product_price = card_clone.querySelector("#product-price");
    let product_id = card_clone.querySelector("#product-id");

    product_img.src = product.image;
    product_id.innerHTML = `product-id:${product.id}`;

    product_price.innerHTML = '$' + product.price;
    product_title.innerHTML = product.title;

};


function display(product) {

    const views_container = document.getElementById("views-container");
    const product_card_template = document.getElementById("template-product-card");

    views_container.innerHTML = "";
    const card_clone = product_card_template.content.cloneNode(true);

    const found_product_img = card_clone.querySelector("#product-img");
    const found_product_title = card_clone.querySelector("#product-title");
    let found_product_price = card_clone.querySelector("#product-price");
    let found_product_id = card_clone.querySelector("#product-id");
    let found_product_desc = card_clone.querySelector("#product-desc");
    found_product_img.src = product.image;

    found_product_id.innerHTML = `Rating: ${product.rating.rate}🌟 `;

    found_product_price.innerHTML = '$' + product.price;
    found_product_title.innerHTML = product.title;

    const desc = product.description;

    found_product_desc.innerHTML = desc;

    views_container.appendChild(card_clone);

};


let current_status = null;

function search_item(specific_category) {
    let container_data = document.getElementById("cards-container");
    container_data.style.display = 'flex';
    let category_url = `${url}/${'category'}/${specific_category}`;

    fetch_item(category_url);

    const category = document.getElementById(specific_category);

    current_status?.classList.remove("active");
    current_status = category;
    current_status.classList.add("active");
};
