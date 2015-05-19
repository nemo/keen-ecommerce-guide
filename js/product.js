function addToCart(e) {
    e.preventDefault();

    var queryString = new QS();
    var productId = parseInt(queryString.get('product-id'), 10);
    var product = _.findWhere(window._products_list, {id: productId});

    var addToCartEvent = {
        "cart_id": "1-fake-cart-id",
        "product_id": product.id,
        "product_name": product.title,
        "product_price": product.price,
        "quantity": 1
    }
    window._addEvent("add_to_carts", addToCartEvent, function(err, res) {

    }, "User clicked the Add to Cart button.");

}

$(document).ready(function() {
    $("#product-container .add-to-cart").click(addToCart);
});

$(window).load(function() {
    var queryString = new QS();
    var productId = parseInt(queryString.get('product-id'), 10);
    var product = _.findWhere(window._products_list, {id: productId});

    var productViewEvent = {
        "path": location.pathname + location.search,
        "product_id": product.id,
        "product_name": product.title,
        "product_price": product.price
    };

    window._addEvent("product_views", productViewEvent, function(err, res) {

    }, "Viewed product page.");
});