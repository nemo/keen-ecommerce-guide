# E-Commerce Tracking Guide

This guide will walk you through some best practices for using Keen IO to track common e-commerce metrics such as: 

- Sign Up Rate
- Activation Rate / Conversion Rate
- Add to Cart Rate
- Average Order Value
- Repeat Purchase Rate
- Lifetime Value

## Data Model

In order to be able to do the queries for the metrics, we'll have to have the right data collections in place. Below, you'll find a schema for the collections for the metrics we're  going to display.

### Collections

We'll be using the following collections that will help us 

#### Collection: first_visits
**Purpose:** To track the first visit of each visitor.
**Attributes:**

- `path`: Path of the page.
- `referrer`: Referrer URL, taken from `document.referrer`.
- `params`: Desired URL params.

Example attributes JSON:

```
{
    path: "/ad-landing-page",
    referrer: "http://google.com",
    params: {
        utm_source: "google",        
        utm_medium: "cpc",
        utm_campaign: "campaign_name"
    }
}
```


#### Collection: product_views
**Purpose:** To track product page views.
**Attributes:**

- `path`: Path of the page.
- `product_id`: Product's ID.
- `product_name`: Product's Name.
- `product_price`: Product's Price.

Example attributes JSON:

```
{
    "path": "/products/1800-summer-pants",
    "product_id": "1800"",
    "product_name": "Summer Pants",
    "product_price": 69.99
}
```

#### Collection: add_to_carts
**Purpose:** To track a user adding a product to their Cart.
**Attributes:**

- `cart_id`: Cart'd ID.
- `product_id`: Product's ID.
- `product_name`: Product's Name.
- `product_price`: Product's Price.
- `quantity`: Quantity being added to Cart.

Example attributes JSON:

```
{
    "cart_id": "201",
    "product_id": "1800",
    "product_name": "Summer Pants",
    "product_price": 69.99,
    "quantity": 1
}
```

#### Collection: purchases
**Purpose:** To track a succesful purchase.
***Attributes:***

- `cart_id`: Cart being purchased's ID.
- `total`: Total amount being purchased.

Example attributes JSON:

```
{
    "cart_id": "201",
    "total": 139.98
}
```

### Common attributes

In order to connect the different collections, we will be sending a few common attributes with all our events:

```
{
    user: {
        uuid: An identifier generated for the user when they first visited,
        first_visited_at: A date for when the user first visited
    }
}
```
The common `user` attribute will help us to follow the user's journey through their experience on the site over time.


## Tracking & Metrics

We've built an example 

Here, we'll link them to an example of all of it coming together.