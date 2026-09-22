# Shan Decorations — 3D Professional Functional Frontend Specification

## 1. Project Overview

**Project Name:** Shan Decorations  
**Project Type:** Premium 3D Event Decoration, Booking & E-Commerce Website  
**Prepared By:** CodeNext Solution  
**Frontend Goal:** Build a visually premium, elegant, responsive, modern, and fully functional frontend for Shan Decorations based on the approved SRS.

Shan Decorations provides professional decoration services for weddings, birthdays, engagements, baby showers, anniversaries, corporate events, parties, and custom events. The company can also sell decoration-related products such as balloons, flowers, lighting items, party items, backdrops, props, and accessories.

The website should feel like a **luxury event design studio + online booking platform + modern e-commerce store**.

---

# 2. Main Frontend Objectives

The frontend must allow users to:

- Discover decoration services
- Browse event packages
- Explore previous decoration projects
- View 3D-inspired visual experiences
- Search and filter services/products
- Book decoration services
- Check event date availability
- Request custom quotations
- Shop decoration products
- Add products to cart
- Add products to wishlist
- Complete checkout
- Track orders
- View bookings
- View quotations
- View payment information
- Receive notifications
- Manage their customer profile
- Contact Shan Decorations through WhatsApp, phone, email, and forms

The frontend must be fully responsive and ready to connect with a backend API.

---

# 3. Design Direction

## 3.1 Visual Style

The visual language should be:

- Luxury
- Elegant
- Premium
- Modern
- Soft 3D
- Editorial
- Minimal
- Immersive
- Professional
- High-end
- Cinematic
- Responsive

Avoid:

- Cheap gradients
- Overcrowded layouts
- Excessive motion
- Cartoon-like graphics
- Too many colors
- Heavy shadows everywhere
- Confusing navigation

---

# 4. Color System

```css
:root {
  --background: #FFFDF8;
  --surface: #F7F1E8;
  --white: #FFFFFF;

  --gold: #C6A15B;
  --champagne: #E4CFA3;
  --soft-gold: #F1E4C8;

  --charcoal: #1C1A18;
  --brown: #6D5946;
  --muted: #81776D;

  --success: #3D8B62;
  --warning: #D69E2E;
  --error: #C94A4A;

  --border: rgba(28, 26, 24, 0.10);
}
```

Use gold only as an accent, not as the dominant background color.

---

# 5. Typography

## Heading Font

Recommended:

- Cormorant Garamond
- Playfair Display
- DM Serif Display

## Body Font

Recommended:

- Manrope
- Inter
- Poppins

Recommended combination:

```text
Headings: Cormorant Garamond
Body: Manrope
```

Hero heading:

```css
font-size: clamp(52px, 8vw, 108px);
line-height: 0.95;
font-weight: 500;
letter-spacing: -0.03em;
```

---

# 6. 3D Experience

The website should use tasteful 3D effects that improve the visual identity.

## 6.1 Hero 3D Scene

The homepage hero can include:

- Golden circular arches
- Floral arrangements
- Floating flowers
- Elegant stage
- Semi-transparent glass objects
- Decorative ribbons
- Soft particles
- Floating rose petals
- Light beams
- Wedding podium
- Balloons for birthday theme transitions

Recommended technologies:

```text
Three.js
React Three Fiber
Drei
GSAP
Framer Motion
```

The 3D scene should:

- React gently to mouse movement
- Use slow floating animation
- Support device orientation where appropriate
- Reduce quality automatically on low-end devices
- Be simplified or replaced by static imagery on small mobile devices
- Respect reduced-motion settings

---

# 7. 3D Card Interaction

Service, package, and product cards may use:

```css
perspective: 1000px;
transform-style: preserve-3d;
```

On hover:

- Card rotates slightly toward pointer
- Main image moves forward
- Text moves slightly forward
- Shadow changes dynamically
- Gold edge glow appears subtly

Rotation should remain subtle:

```text
Maximum 3–5 degrees
```

---

# 8. Main Navigation

## Desktop Navigation

```text
SHAN DECORATIONS

Home
About
Services
Packages
Gallery
Shop
Offers
Booking
Contact

Search
Wishlist
Cart
Account
```

### Navbar Behavior

- Transparent over homepage hero
- Sticky navigation
- Changes to glass/frosted style after scrolling
- Active page indicator
- Smooth hover underline
- Cart badge
- Wishlist badge
- User menu when authenticated

---

# 9. Mobile Navigation

Mobile header:

```text
Logo
Search
Cart
Menu
```

Menu opens as:

- Full-screen overlay
or
- Slide-in panel

Include:

- Home
- About
- Services
- Packages
- Gallery
- Shop
- Offers
- Booking
- Contact
- Login/Register
- WhatsApp
- Social links

Main mobile CTA:

```text
Book Your Event
```

---

# 10. Homepage Structure

Recommended order:

```text
1. Navbar
2. Hero + 3D Scene
3. Event Category Selector
4. Featured Services
5. Featured Packages
6. Before / After Transformation
7. Portfolio Preview
8. Why Choose Us
9. Shop Preview
10. Testimonials
11. Booking CTA
12. Social / Instagram Gallery
13. Footer
```

---

# 11. Homepage Hero

Full-height cinematic layout.

## Left Content

Small label:

```text
PREMIUM EVENT STYLING & DECORATION
```

Main heading:

```text
Turning Special Moments
Into Beautiful Memories.
```

Description:

```text
Elegant decorations for weddings, birthdays,
engagements and unforgettable celebrations.
```

Primary buttons:

```text
Explore Decorations
Book Your Event
```

Secondary text link:

```text
View Our Portfolio →
```

## Right Content

Interactive 3D decorative scene.

Possible objects:

- Wedding arch
- Floating flowers
- Gold rings
- Soft fabric
- Decorative podium
- Glass shapes
- Warm lighting
- Flower petals

## Hero Statistics

```text
250+ Events Styled
100+ Decoration Themes
4.9 Customer Rating
```

---

# 12. Event Category Selector

Create an interactive category selector:

```text
Wedding
Birthday
Engagement
Baby Shower
Anniversary
Corporate
Custom Events
```

When a category is selected, dynamically update:

- Background image
- Main image
- 3D decorative object
- Description
- Suggested package
- Accent visual
- CTA

Use smooth crossfade or slide transitions.

---

# 13. Featured Services Section

Heading:

```text
Designed For Every Celebration
```

Services:

```text
Wedding Decoration
Birthday Decoration
Engagement Decoration
Baby Shower Decoration
Anniversary Decoration
Corporate Event Decoration
Custom Decoration
```

Each service card contains:

- Cover image
- Service name
- Short description
- Starting price if available
- Explore button
- 3D hover effect

CTA:

```text
View All Services
```

---

# 14. Service Details Page

Route example:

```text
/services/wedding-decoration
```

Sections:

1. Hero
2. Service overview
3. Included items
4. Available themes
5. Decoration styles
6. Service gallery
7. Packages
8. Reviews
9. FAQ
10. CTA

Sticky action bar:

```text
Request Quote
Book Service
WhatsApp
```

---

# 15. Featured Packages

Display premium package cards.

Each package shows:

```text
Package Name
Event Category
Main Image
Starting Price
Guest Capacity
Decoration Style
Included Features
Availability
```

Example:

## Royal Wedding Package

```text
Starting From LKR 85,000

Includes:
✓ Premium Stage Decoration
✓ Floral Arrangement
✓ Welcome Board
✓ Couple Table
✓ Ambient Lighting
✓ Entrance Decoration
```

Buttons:

```text
View Package
Book Package
```

---

# 16. Packages Page

Filters:

```text
Event Type
Budget
Guest Count
Indoor / Outdoor
Theme
Availability
```

Sorting:

```text
Popular
Price Low to High
Price High to Low
Newest
```

Display:

- Grid view
- Optional comparison mode

---

# 17. Package Details Page

Include:

```text
Package Name
Image Gallery
Starting Price
Description
Event Type
Guest Capacity
Included Items
Optional Add-ons
Theme Options
Availability
Reviews
Related Packages
```

Buttons:

```text
Book This Package
Customize Package
Request Quote
```

---

# 18. Before / After Section

Section title:

```text
See The Transformation
```

Use a draggable before/after image slider.

Labels:

```text
Before Decoration
After Shan Decorations
```

Support multiple transformation projects.

---

# 19. Portfolio / Gallery

Create a premium masonry gallery.

Filters:

```text
All
Wedding
Birthday
Engagement
Baby Shower
Anniversary
Corporate
Outdoor
Indoor
```

Gallery interaction:

- Animated filtering
- Image hover
- Fullscreen lightbox
- Keyboard navigation
- Next/previous buttons
- Swipe support on mobile

---

# 20. Gallery Project Modal

When a project is opened, show:

```text
Project Name
Event Type
Theme
Location
Event Date
Description
Gallery Images
Related Package
```

CTA:

```text
Request Similar Decoration
```

---

# 21. Shop Preview

Homepage shop section:

```text
Shop Decoration Essentials
```

Categories:

```text
Balloons
Flowers
Lighting
Party Items
Backdrops
Props
Accessories
```

Show featured products.

CTA:

```text
Visit Shop
```

---

# 22. Shop Page

Header controls:

```text
Search
Category
Filter
Sort
Result Count
```

Desktop sidebar:

```text
Categories
Price Range
Rating
Availability
Offers
```

Grid:

```text
Desktop: 4 columns
Laptop: 3 columns
Tablet: 2 columns
Mobile: 2 columns
```

---

# 23. Product Card

Each card includes:

```text
Product Image
Product Name
Category
Current Price
Previous Price
Discount
Rating
Stock Status
Wishlist Button
Quick View
Add to Cart
```

Interactions:

- Product floating effect
- Image zoom
- Wishlist heart animation
- Add-to-cart success animation
- Quick view modal

---

# 24. Product Details Page

Sections:

## Product Gallery

- Main image
- Thumbnails
- Zoom
- Optional 360° view
- Optional 3D view

## Product Information

```text
Product Name
Rating
Price
Discount
Stock
Quantity
Category
SKU
Description
```

Buttons:

```text
Add to Cart
Buy Now
Add to Wishlist
Share
```

Tabs:

```text
Description
Specifications
Delivery
Reviews
```

---

# 25. Search

Global search should search across:

```text
Services
Packages
Products
Gallery
```

Features:

- Search suggestions
- Popular searches
- Recent searches
- Keyboard navigation
- Empty state
- Search modal
- Search results page

---

# 26. Wishlist

Customers can:

- Add items
- Remove items
- Move item to cart
- Check availability
- View current price

Wishlist should persist for logged-in users.

---

# 27. Shopping Cart

Cart page:

```text
Product
Image
Unit Price
Quantity
Subtotal
Remove
```

Order summary:

```text
Subtotal
Discount
Delivery
Total
```

Coupon field:

```text
Enter Promo Code
Apply
```

Actions:

```text
Continue Shopping
Proceed to Checkout
```

---

# 28. Cart Drawer

When adding an item:

- Open mini cart drawer
- Show recently added item
- Show updated cart total

Buttons:

```text
View Cart
Checkout
```

---

# 29. Checkout

Use multi-step checkout.

```text
1. Customer Details
2. Delivery Information
3. Payment
4. Review
5. Confirmation
```

Fields:

```text
Full Name
Email
Phone
Address
City
Postal Code
Order Notes
```

Payment UI:

```text
Cash on Delivery
Bank Transfer
Online Payment
```

Include secure payment indicators.

---

# 30. Order Confirmation

Show:

```text
Thank You
Order Number
Order Summary
Payment Status
Delivery Address
Estimated Delivery
```

Actions:

```text
Track Order
Continue Shopping
```

---

# 31. Decoration Booking Page

Create a premium multi-step booking wizard.

## Step 1 — Event Type

Cards:

```text
Wedding
Birthday
Engagement
Baby Shower
Anniversary
Corporate
Other
```

## Step 2 — Event Date & Time

Interactive calendar.

Statuses:

```text
Available
Limited
Booked
Unavailable
```

## Step 3 — Venue

Fields:

```text
Venue Name
Address
City
Indoor / Outdoor
Google Maps Link
```

## Step 4 — Event Details

Fields:

```text
Guest Count
Theme
Preferred Colors
Special Requirements
```

## Step 5 — Service / Package

Choices:

```text
Select Service
Select Package
Custom Decoration
```

## Step 6 — Customer Details

```text
Full Name
Phone
WhatsApp
Email
```

## Step 7 — Review

Show full booking summary.

Button:

```text
Submit Booking Request
```

---

# 32. Booking Success Page

Display:

```text
Booking Request Submitted
Booking Reference
Event Type
Event Date
Venue
Selected Package
Status: Pending
```

Message:

```text
Our team will review your request and contact you shortly.
```

Buttons:

```text
View Booking
WhatsApp Us
Return Home
```

---

# 33. Request a Quote Page

Create a guided quotation form.

Fields:

```text
Full Name
Phone
Email
Event Type
Event Date
Venue
Guest Count
Budget
Decoration Theme
Preferred Colors
Selected Service
Selected Package
Special Requirements
```

Upload field:

```text
Upload Inspiration Images
```

Budget selection cards:

```text
Under LKR 25,000
LKR 25,000 – 50,000
LKR 50,000 – 100,000
LKR 100,000+
Custom
```

CTA:

```text
Request My Quotation
```

---

# 34. Offers Page

Offer cards:

```text
Offer Image
Offer Title
Discount
Valid Until
Applicable Services
Applicable Products
Terms
```

Optional countdown timers.

---

# 35. Why Choose Us Section

Use floating glassmorphism cards.

Items:

```text
Creative Designs
Premium Materials
Custom Themes
On-Time Setup
Experienced Team
Affordable Packages
```

Place around a decorative 3D centerpiece.

---

# 36. Customer Testimonials

Each testimonial:

```text
Customer Name
Event Type
Rating
Review
Customer Photo
Event Image
```

Use horizontal carousel.

---

# 37. Reviews Page

Overall rating:

```text
4.9 / 5
```

Rating distribution:

```text
5 Star
4 Star
3 Star
2 Star
1 Star
```

Filters:

```text
Wedding
Birthday
Shop
Latest
Highest Rated
```

---

# 38. Social Gallery

Homepage section:

```text
Follow Our Latest Decorations
@ShanDecorations
```

Use a responsive social-style image grid.

Hover:

```text
View Post
Like Count
```

---

# 39. Contact Page

Show:

```text
Phone
WhatsApp
Email
Business Location
Opening Hours
Social Media
```

Contact form:

```text
Name
Email
Phone
Subject
Message
```

Include:

- Interactive map
- Floating WhatsApp button
- Call button on mobile

---

# 40. About Page

Hero:

```text
We Create Beautiful Moments
```

Sections:

- Company story
- Experience
- Design philosophy
- Team
- Why choose Shan Decorations
- Statistics

Statistics:

```text
250+ Events
100+ Themes
5+ Years Experience
4.9 Rating
```

---

# 41. Login Page

Luxury split-screen design.

Left:

- Premium event image
- Decorative 3D visual

Right:

```text
Welcome Back

Email
Password
Remember Me
Forgot Password

Login
```

Link:

```text
Don't have an account?
Create Account
```

---

# 42. Registration Page

Fields:

```text
Full Name
Email
Phone
Password
Confirm Password
```

Checkbox:

```text
I agree to the Terms and Privacy Policy
```

CTA:

```text
Create Account
```

---

# 43. Forgot Password

Flow:

```text
Enter Email
Send Reset Link
Verify Request
Create New Password
```

---

# 44. Customer Dashboard

Sidebar/navigation:

```text
Overview
My Bookings
My Quotations
My Orders
Wishlist
Payments
Notifications
Profile
Logout
```

Desktop:

- Left sidebar
- Main dashboard content

Mobile:

- Dashboard top navigation
or
- Bottom sheet / menu

---

# 45. Customer Dashboard Overview

Cards:

```text
Upcoming Events
Pending Bookings
Active Quotations
Recent Orders
Wishlist Items
```

Example event:

```text
Wedding Decoration
12 December 2026
Colombo
Status: Confirmed
```

---

# 46. My Bookings

Booking card:

```text
Booking ID
Event Type
Event Date
Venue
Package
Total
Advance
Balance
Status
```

Statuses:

```text
Pending
Confirmed
Completed
Cancelled
```

Actions:

```text
View
Contact Team
Cancel Request
Download Details
```

---

# 47. My Quotations

Card:

```text
Quotation ID
Event
Date
Amount
Advance
Balance
Status
```

Actions:

```text
View Quotation
Download PDF
Accept Quotation
Contact Team
```

---

# 48. My Orders

Card:

```text
Order Number
Order Date
Products
Total
Payment Status
Order Status
```

Timeline:

```text
Placed
Confirmed
Processing
Ready
Dispatched
Delivered
```

---

# 49. Payments

Display:

```text
Payment ID
Booking / Order
Amount
Method
Date
Status
Receipt
```

Statuses:

```text
Pending
Paid
Partially Paid
Failed
Refunded
```

---

# 50. Notification Center

Notification types:

```text
Booking Confirmation
Quotation Ready
Payment Received
Order Confirmed
Order Dispatched
Offer
System Update
```

Functions:

- Mark as read
- Mark all as read
- Delete
- Open linked booking/order/quotation

---

# 51. Profile Page

Fields:

```text
Profile Photo
Full Name
Email
Phone
WhatsApp
Address
City
```

Actions:

```text
Update Profile
Change Password
Delete Account
```

---

# 52. Fully Functional Frontend Requirements

The website must NOT be a static prototype.

Implement functional frontend behavior for:

- Navigation
- Authentication UI
- Protected routes
- Search
- Filters
- Sorting
- Cart
- Wishlist
- Quantity updates
- Product quick view
- Checkout steps
- Booking wizard
- Quote form
- Contact form
- Dashboard tabs
- Gallery filtering
- Lightbox
- Before/after slider
- Notification panel
- Toast messages
- Form validation
- Loading states
- Empty states
- Error states
- Modal dialogs
- Confirmation dialogs

---

# 53. Frontend State Management

Recommended:

```text
Zustand
```

Alternative:

```text
Redux Toolkit
```

Global stores:

```text
authStore
cartStore
wishlistStore
bookingStore
notificationStore
searchStore
uiStore
```

---

# 54. Recommended Technology Stack

```text
React.js
Vite
TypeScript or JavaScript
React Router
Three.js
React Three Fiber
Drei
Framer Motion
GSAP
Lenis
Zustand
Axios
React Hook Form
Zod
Swiper
Lucide React
```

Styling:

```text
SCSS + CSS Variables
```

Alternative:

```text
Tailwind CSS
```

---

# 55. React Project Structure

```text
src/
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── models/
│   └── fonts/
│
├── components/
│   ├── common/
│   ├── layout/
│   ├── home/
│   ├── services/
│   ├── packages/
│   ├── gallery/
│   ├── shop/
│   ├── booking/
│   └── dashboard/
│
├── pages/
│   ├── Home/
│   ├── About/
│   ├── Services/
│   ├── Packages/
│   ├── Gallery/
│   ├── Shop/
│   ├── Product/
│   ├── Cart/
│   ├── Checkout/
│   ├── Booking/
│   ├── Quote/
│   ├── Offers/
│   ├── Reviews/
│   ├── Contact/
│   ├── Auth/
│   └── Dashboard/
│
├── routes/
├── services/
├── store/
├── hooks/
├── utils/
├── data/
├── styles/
├── App.jsx
└── main.jsx
```

---

# 56. Reusable Components

Create:

```text
Navbar
MobileMenu
Footer
SectionHeading
PrimaryButton
SecondaryButton
GlassCard
ServiceCard
PackageCard
ProductCard
GalleryCard
ReviewCard
OfferCard
BookingCard
OrderCard
QuotationCard
PaymentCard
StatusBadge
SearchModal
CartDrawer
WishlistDrawer
NotificationPanel
Lightbox
BeforeAfterSlider
QuantitySelector
PriceRangeSlider
FilterDrawer
Pagination
Breadcrumb
Modal
ConfirmDialog
Toast
Skeleton
EmptyState
ErrorState
```

---

# 57. API-Ready Service Layer

Create:

```text
authService.js
userService.js
serviceService.js
packageService.js
galleryService.js
productService.js
cartService.js
bookingService.js
quotationService.js
orderService.js
paymentService.js
reviewService.js
offerService.js
notificationService.js
```

Use mock JSON during frontend development.

Replace mock calls with backend API calls later.

---

# 58. Suggested Routes

```text
/
 /about
 /services
 /services/:slug
 /packages
 /packages/:slug
 /gallery
 /shop
 /shop/:category
 /product/:slug
 /cart
 /checkout
 /order-success
 /booking
 /booking-success
 /request-quote
 /offers
 /reviews
 /contact
 /login
 /register
 /forgot-password

 /dashboard
 /dashboard/bookings
 /dashboard/quotations
 /dashboard/orders
 /dashboard/payments
 /dashboard/wishlist
 /dashboard/notifications
 /dashboard/profile
```

---

# 59. Animation System

Use motion carefully.

Recommended:

```text
Framer Motion
GSAP
Lenis
React Three Fiber
```

Animation types:

- Fade reveal
- Image reveal
- Text masking
- Parallax
- Page transition
- Product floating
- Card tilt
- Button microinteraction
- Menu reveal
- Modal spring
- Cart badge pulse
- Heart animation
- Scroll-driven 3D changes
- Section transitions

Do not make animations too long.

---

# 60. Smooth Scrolling

Use:

```text
Lenis
```

Requirements:

- Smooth but responsive
- No excessive delay
- Disable or simplify when reduced motion is enabled

---

# 61. Cursor Interaction

Desktop only.

Optional:

- Small gold cursor dot
- Larger soft outer circle
- Expand on interactive items
- Show `VIEW` over gallery
- Show `DRAG` over sliders

Disable on touch devices.

---

# 62. Loading Experience

Create an elegant initial loader:

```text
SHAN
DECORATIONS
```

Possible animation:

- Rotating gold ring
- Flower unfolding
- Small logo reveal

Keep loader short.

Do not replay it on every route change.

---

# 63. Mobile Experience

Mobile must feel intentionally designed.

Important:

- Touch-friendly controls
- Minimum button height around 44px
- Compact navigation
- Sticky CTA where useful
- Responsive product grid
- Swipeable sliders
- Optimized images
- Simplified 3D scenes
- No horizontal overflow

Optional mobile bottom navigation:

```text
Home
Explore
Shop
Cart
Account
```

---

# 64. Responsive Breakpoints

```text
Mobile: 320px – 767px
Tablet: 768px – 1023px
Laptop: 1024px – 1439px
Desktop: 1440px+
```

Use fluid layouts rather than relying only on fixed breakpoints.

---

# 65. Forms and Validation

Recommended:

```text
React Hook Form
Zod
```

Validation:

- Required fields
- Valid email
- Phone validation
- Password requirements
- Confirm password match
- Future event date
- Required terms
- Product quantity cannot exceed stock
- File upload size/type validation
- Budget input validation

Display inline field errors.

---

# 66. Toast Messages

Examples:

```text
Added to cart.
Added to wishlist.
Removed from wishlist.
Booking request submitted.
Quotation request submitted.
Profile updated.
Order placed successfully.
Payment recorded.
Something went wrong. Please try again.
```

---

# 67. Empty States

Create custom empty states for:

```text
Cart
Wishlist
Orders
Bookings
Quotations
Notifications
Search
Gallery Results
Shop Filters
```

Example:

```text
Your cart is waiting for something beautiful.
```

CTA:

```text
Explore Shop
```

---

# 68. Error Pages

Create:

```text
404
500
Offline
API Error
```

404 copy:

```text
Looks Like This Celebration
Has Moved Somewhere Else.
```

CTA:

```text
Return Home
```

---

# 69. Performance Requirements

Target:

```text
Lighthouse Performance: 85+
Accessibility: 90+
Best Practices: 90+
SEO: 90+
```

Use:

- Code splitting
- Route lazy loading
- Lazy images
- WebP/AVIF
- Responsive images
- Compressed 3D models
- Dynamic 3D import
- Reduced model polygon count
- Skeleton loading
- Image CDN
- API request caching where appropriate

---

# 70. Accessibility

Include:

- Semantic HTML
- Keyboard navigation
- Visible focus styles
- ARIA labels
- Accessible modals
- Alt text
- Form labels
- Error announcements
- Sufficient contrast
- Reduced motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 71. SEO Requirements

Each public page should have:

```text
Unique title
Meta description
Canonical URL
Open Graph data
Social image
Structured headings
Alt text
```

Structured data where applicable:

```text
LocalBusiness
Product
Review
BreadcrumbList
```

---

# 72. Demo Data

Create realistic demo content.

Minimum:

```text
7 Services
8 Packages
20 Products
20 Gallery Projects
6 Reviews
4 Offers
3 Bookings
3 Quotations
4 Orders
5 Notifications
```

Do not use Lorem Ipsum.

---

# 73. Example Package Data

```json
{
  "id": 1,
  "name": "Royal Wedding Experience",
  "slug": "royal-wedding-experience",
  "category": "Wedding",
  "price": 85000,
  "startingPrice": true,
  "guestCapacity": 250,
  "features": [
    "Luxury Stage Decoration",
    "Premium Floral Arrangement",
    "Couple Table",
    "Welcome Board",
    "Entrance Decoration",
    "Ambient Lighting"
  ],
  "status": "available"
}
```

---

# 74. Example Product Data

```json
{
  "id": 101,
  "name": "Premium Rose Gold Balloon Set",
  "slug": "premium-rose-gold-balloon-set",
  "category": "Balloons",
  "price": 4500,
  "oldPrice": 5200,
  "rating": 4.8,
  "stock": 18,
  "featured": true
}
```

---

# 75. Example Booking Data

```json
{
  "bookingId": "SD-BK-10024",
  "eventType": "Wedding",
  "eventDate": "2026-12-12",
  "venue": "Colombo",
  "package": "Royal Wedding Experience",
  "status": "Confirmed",
  "total": 85000,
  "advance": 30000,
  "balance": 55000
}
```

---

# 76. Authentication Behavior

Guests can:

- Browse website
- Browse shop
- Search
- Add items to local cart
- View services
- View packages
- View gallery

Protected functionality may require login:

```text
Booking
Quotation
Checkout
Dashboard
Saved Wishlist
Order History
Payment History
```

If login is required:

1. Save intended destination
2. Redirect to login
3. After login, return user to original action

---

# 77. Frontend Security Considerations

Frontend must:

- Never store raw card details
- Never expose backend secrets
- Use environment variables for public configuration
- Protect authenticated routes
- Hide unauthorized controls
- Sanitize displayed content
- Validate user input
- Handle tokens securely
- Use secure HTTPS API endpoints in production

---

# 78. Admin Frontend Separation

Do not mix the customer UI with the admin dashboard.

Recommended:

```text
Customer Website:
www.shandecorations.lk
```

Admin:

```text
admin.shandecorations.lk
```

or:

```text
www.shandecorations.lk/admin
```

Admin can use a more data-focused dashboard design.

---

# 79. Recommended UI Keywords

```text
Luxury Event Website
3D Floral Website
Premium Wedding Design
Editorial Layout
Champagne Gold UI
Soft Glassmorphism
Immersive Hero
Modern Luxury E-Commerce
Elegant Typography
Cinematic Photography
Soft 3D
Premium Event Studio
```

---

# 80. Final Frontend Goal

The website should feel like:

```text
A Premium Digital Event Showroom
+
A Professional Decoration Booking Platform
+
A Modern Decoration E-Commerce Store
```

Users should be able to:

```text
Discover
Explore
Visualize
Compare
Book
Request Quotes
Shop
Pay
Track
Review
Contact
```

The frontend should make Shan Decorations feel professional, trustworthy, creative, modern, and premium.

---

# 81. Development Checklist

## Main Pages

- [ ] Home
- [ ] About
- [ ] Services
- [ ] Service Details
- [ ] Packages
- [ ] Package Details
- [ ] Gallery
- [ ] Shop
- [ ] Product Details
- [ ] Cart
- [ ] Checkout
- [ ] Order Success
- [ ] Booking
- [ ] Booking Success
- [ ] Request Quote
- [ ] Offers
- [ ] Reviews
- [ ] Contact
- [ ] Login
- [ ] Register
- [ ] Forgot Password
- [ ] Customer Dashboard
- [ ] Bookings
- [ ] Quotations
- [ ] Orders
- [ ] Payments
- [ ] Wishlist
- [ ] Notifications
- [ ] Profile

## Functional Features

- [ ] Navigation
- [ ] Search
- [ ] Filters
- [ ] Sorting
- [ ] Cart
- [ ] Wishlist
- [ ] Quantity updates
- [ ] Checkout flow
- [ ] Booking wizard
- [ ] Quote request
- [ ] Login/register validation
- [ ] Protected routes
- [ ] Gallery filters
- [ ] Lightbox
- [ ] Before/after slider
- [ ] Toasts
- [ ] Modals
- [ ] Notifications
- [ ] Dashboard navigation
- [ ] Loading states
- [ ] Error states
- [ ] Empty states

## 3D / Visual

- [ ] 3D hero
- [ ] Floating decorations
- [ ] Card tilt
- [ ] Soft parallax
- [ ] Scroll reveals
- [ ] Product floating effect
- [ ] Smooth scrolling
- [ ] Premium page transitions
- [ ] Reduced motion support

## Quality

- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop responsive
- [ ] Accessibility
- [ ] SEO
- [ ] Performance optimization
- [ ] Browser testing
- [ ] API-ready architecture
- [ ] Reusable components
- [ ] Clean code structure

---

# 82. Final Developer Instruction

Build this frontend as a **production-quality functional application**, not only as a static design prototype.

All navigation must work.

All important buttons must perform their intended frontend action.

Forms must include validation.

Cart and wishlist must update dynamically.

Search, filtering, and sorting must function.

Booking and checkout must use real multi-step UI flows.

The gallery must support category filtering and lightbox viewing.

The customer dashboard must include realistic functional demo states.

Use realistic Shan Decorations content instead of generic placeholder text.

The 3D visual experience must enhance the brand without reducing accessibility, usability, responsiveness, or performance.

The final visual impression should communicate:

```text
Luxury
Trust
Creativity
Celebration
Elegance
Professionalism
```

---

**Project:** Shan Decorations  
**Document:** 3D Professional Functional Frontend Specification  
**Prepared By:** CodeNext Solution  
**Version:** 1.0  
**Date:** September 2026
