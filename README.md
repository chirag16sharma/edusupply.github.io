# edusupply.github.io

# EDUSUPPLY

An online e-commerce platform for buying educational supplies including stationery, furniture, lab equipment, and boards.

## Features

- **Product Categories** — Browse stationery, furniture, lab equipment, and boards
- **User Authentication** — Secure login and dashboard system
- **Admin Panel** — Manage products and orders
- **Order Tracking** — Real-time order status tracking
- **WhatsApp Integration** — Direct customer support via WhatsApp
- **Responsive Design** — Works on desktop and mobile devices
- **Product Search** — Quick product discovery and filtering

## Tech Stack

- **Frontend** — HTML5, CSS3, Vanilla JavaScript
- **Hosting** — GitHub Pages
- **No Backend** — Static site with client-side logic

## Getting Started

### Prerequisites

- Web browser (Chrome, Firefox, Safari, Edge)
- No installation required—fully browser-based

### Installation

1. Clone the repository:
```bash
git clone https://github.com/chirag16sharma/edusupply.github.io.git
cd edusupply.github.io
```

2. Open in browser:
- Double-click `index.html` or
- Run a local server:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`

## Project Structure

```
.
├── index.html           # Homepage
├── login.html          # User login
├── dashboard.html      # User dashboard
├── admin.html          # Admin panel
├── product.html        # Product detail page
├── stationery.html     # Stationery category
├── furniture.html      # Furniture category
├── lab.html            # Lab equipment category
├── boards.html         # Boards category
├── track-order.html    # Order tracking
├── whatsapp-button.html# WhatsApp support button
├── style.css           # Main stylesheet
├── script.js           # Main JavaScript logic
├── products.js         # Product data
└── images/             # Product images
```

## Usage

**Browse Products** — Navigate to category pages (stationery, furniture, lab, boards)

**User Login** — Create account and access dashboard

**Track Orders** — Check status on track-order page

**Admin Functions** — Login as admin to manage inventory and orders

## File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | Landing page with featured products |
| `products.js` | Product database/catalog |
| `script.js` | Core functionality (cart, auth, filtering) |
| `style.css` | Unified styling for all pages |
| `admin.html` | Product/order management interface |
| `dashboard.html` | User order history and profile |

## Features Breakdown

### Authentication
- Login system with local storage
- User dashboard access
- Admin role management

### Shopping
- Product browsing by category
- Product details and specifications
- Shopping cart functionality

### Admin
- Add/edit/delete products
- Order management
- Inventory tracking

### Customer Support
- WhatsApp integration for instant messaging
- Order status tracking

## Customization

**Update Products** — Edit `products.js` with new items

**Change Styling** — Modify `style.css` for colors, fonts, layout

**Add Categories** — Create new `.html` files and link in navigation

**Admin Users** — Configure in `script.js` authentication logic

## Deployment

Already deployed on GitHub Pages at: https://chirag16sharma.github.io/edusupply.github.io

To update live site:
```bash
git add .
git commit -m "Update [changes]"
git push origin main
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Limitations

- No backend database (data stored client-side)
- No payment processing integration
- No email notifications
- Limited to static assets on GitHub Pages

## Future Enhancements

- [ ] Backend API for persistent data
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] User reviews and ratings
- [ ] Search analytics
- [ ] Inventory management system

## License

MIT License — See LICENSE file for details

## Contact

**Developer** — Chirag Sharma  
**GitHub** — [@chirag16sharma](https://github.com/chirag16sharma)  
**WhatsApp** — See site for support contact

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m 'Add YourFeature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open Pull Request

## Troubleshooting

**Products not loading** — Check `products.js` syntax

**Login not working** — Clear browser localStorage and refresh

**Styling issues** — Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

**Images missing** — Ensure image paths in HTML match `/images/` folder structure
