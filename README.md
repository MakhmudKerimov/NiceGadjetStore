# NiceGadjetStore Landing Page

- [DEMO LINK](https://MakhmudKerimov.github.io/NiceGadjetStore/)

## Description

NiceGadjetStore is a responsive e-commerce application showcasing a variety of products, including phones, tablets, and accessories. The app features a product catalog, product details pages, shopping cart, and favorites functionality. Users can browse, filter, sort, and add items to the cart or favorites, with all changes persisted in localStorage.

The project demonstrates advanced React concepts, including React Context / Redux, modular component structure, routing, and state management. It also emphasizes responsive design, pagination, sorting, and smooth UI interactions.

## Technologies

React (with TypeScript) – building UI and managing state

React Router – handling multi-page navigation

React Context – managing cart and favorites state

localStorage – persisting cart and favorites data

CSS Modules / SCSS – modular, maintainable styling

ESLint / Prettier – ensuring code quality and formatting

Responsive Design – for desktop and mobile layouts

# Features

PicturesSlider with auto-slide every 5 seconds, next buttons, and clickable dashes

ProductsSlider for Hot prices and Brand New products

Shop by category block linking to /phones, /tablets, /accessories

Separate pages for Phones (/phones), Tablets (/tablets), Accessories (/accessories)

Products loaded dynamically from /public/api

Loader during fetch, error handling, and "no products" messages

Sorting by Newest, Alphabetically, Cheapest stored in URL query parameters

Pagination with items per page (4, 8, 16, all)

Product details page with selectable colors, capacities, multiple images, breadcrumbs, and "You may also like" block

Back button works like browser back

Error handling for missing products

Cart page (/cart) with list of CartItems

Add to cart button on ProductCard

Remove items or change quantity with - / + buttons

Cart total and quantity auto-calculated

Empty cart message when cart is empty

Checkout modal with clear-cart option

Persist cart in localStorage

Favorites page (/favorites) showing favorite products

Add/remove product with heart button on ProductCard

Favorites count displayed in header

Persist favorites in localStorage

Sticky header with logo, navigation, cart, and favorites

Footer with GitHub link and Back to top button (smooth scroll)

Smooth hover effects and image scaling

Form elements and icons consistent with UI kit

404 NotFoundPage for unknown URLs

# Setup & Installation

Follow these steps to run the project locally:

1. Clone the repository
   git clone https://github.com/MakhmudKerimov/NiceGadjetStore.git

2. Install dependencies
   npm install or yarn install

3. Run the project locally
   npm start or yarn start
