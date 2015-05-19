window._events = [];

$(document).ready(function() {
    _.each(products_list, function(product) {
        var $container = $("[data-product-id=" + product.id + "]")

        $container.find("[data-product-title]").html(product.title);

        var image = document.createElement("img");
        image.src = product.image;

        $container.find("[data-product-image]").html(image);
    });

    setInterval(showEvents, 1000);

    window._addEvent = function(collection, event, callback, reason) {
        window._keenClient.addEvent(collection, event, callback);
        window._events.push({
            code: getEventCode(collection, event),
            reason: reason
        });
    };
    window._keenClient = new Keen({
        projectId: '5557fe1c2fd4b1326f14444e',
        writeKey: '500da5dd41d521713afc7e1b323f1d70f707fc9b4d9014b9911892a054c2849a9b1f2b2ab500c28fc8f03613cfc125b4c3a432d7f43e69acb8824d249d0cb65b6802d8a610bf1a7ab37d5d17bc27aa5617ca2a51742dedd735b65ca5fc4d62b1405c13f30b575375e171d44708b598c4'
    });
});

var products_list = [
    {
        "id": 1,
        "title": "Be grateful, for everything.",
        "image": "https://behapy.s3.amazonaws.com/76/34/597634/default.jpg"
    },
    {
        "id": 2,
        "title": "Joy is the simplest form of gratitude.",
        "image": "https://behapy.s3.amazonaws.com/76/30/597630/default.jpg"
    },
    {
        "id": 3,
        "title": "Spend your life doing strange things with weird people",
        "image": "https://behapy.s3.amazonaws.com/74/36/597436/default.jpg"
    },
    {
        "id": 4,
        "title": "People are as  happy  as they make their minds up to be",
        "image": "https://behapy.s3.amazonaws.com/72/11/597211/default.jpg"
    },
    {
        "id": 5,
        "title": "Not all of us can do great things But we can do small things with great love",
        "image": "https://behapy.s3.amazonaws.com/70/79/597079/default.jpg"
    },
    {
        "id": 6,
        "title": "A pessimist sleeps with a knife under his pillow",
        "image": "https://behapy.s3.amazonaws.com/61/65/596165/default.jpg"
    },
    {
        "id": 7,
        "title": "Everything you want is out there waiting for you to ask",
        "image": "https://behapy.s3.amazonaws.com/61/42/596142/default.jpg"
    },
    {
        "id": 8,
        "title": "Kind words can be short",
        "image": "https://behapy.s3.amazonaws.com/27/99/592799/default.jpg"
    },
    {
        "id": 9,
        "title": "Be who you are",
        "image": "https://behapy.s3.amazonaws.com/39/40/593940/default.jpg"
    }
];

function showEvents() {
    if (!window._events || (window._events && !window._events.length)) {
        $('body').removeClass('visible-events-list');
        return;
    }

    var $container = $('.events-list .events');
    var text = "";

    _.each(window._events, function(event) {
        text += event.code + "\n";
        text += "// " + event.reason + "\n";
        text += "\n";
    });

    $container.html(text);

    $('body').addClass('visible-events-list');
}

function getEventCode(collection, event) {
    return "Keen.addEvent(collection, " + JSON.stringify(event, null, 2) + ")";
}