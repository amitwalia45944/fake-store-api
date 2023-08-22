let url = 'https://fakestoreapi.com/products';

window.addEventListener("load", () => {
    fetch_item(url);
});

function reload() {
    window.location.reload();
};

function fetch_item(url) {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((next_response) => {
            bind_data(next_response);
        })
        .catch((error) => {
            console.log(error);
        });

};

function bind_data(products) {
    const cards_container = document.getElementById("cards-container");
    const product_card_emplate = document.getElementById("template-product-card");

    cards_container.innerHTML = "";

    products.map((product) => {
        const card_clone = product_card_emplate.content.cloneNode(true);
        fill_data_in_card(card_clone, product);
        cards_container.appendChild(card_clone);
        return;
    });

};

function fill_data_in_card(card_clone, product) {

    const product_img = card_clone.querySelector("#product-img");
    const product_title = card_clone.querySelector("#product-title");
    let product_price = card_clone.querySelector("#product-price");
    const product_desc = card_clone.querySelector("#product-desc");
    let product_rating = card_clone.querySelector("#product-rating");
    let product_comment = card_clone.querySelector("#product-comment");

    product_img.src = product.image;
    product_rating.innerHTML = product.rating["rate"] + ' ' + '⭐';

    if (product.price < 50) {
        product_comment.innerHTML = "🤩" + ' ' + 'low price';
    } else {
        product_comment.innerHTML = '😅' + ' ' + 'expensive one';
    }

    product_price.innerHTML = '$' + product.price;
    product_title.innerHTML = product.title;
    const desc = product.description.slice(0, 100);
    product_desc.innerHTML = desc;
};

let current_status = null;

function search_item(specific_category) {

    let category_url = `${url}/${'category'}/${specific_category}`;

    fetch_item(category_url);

    const category = document.getElementById(specific_category);

    current_status?.classList.remove("active");
    current_status = category;
    current_status.classList.add("active");
};
