# QR-Driven Restaurant Ordering Flow

## Overview
This document describes the QR-driven restaurant ordering system implemented in the SaltBee application. The system allows customers to scan table QR codes for dine-in orders or select takeaway mode, with checkout locking to prevent table changes after order confirmation.

## Features Implemented

### 1. State Management (OrderContext)
**Location:** `src/contexts/OrderContext.tsx`

The `OrderContext` provides global state management for:
- `tableNumber` (string | null) - The scanned table number
- `orderType` ('dine-in' | 'takeaway' | null) - The type of order
- `isCheckoutLocked` (boolean) - Prevents table changes after checkout
- `resetOrder()` - Resets all order state

All state is persisted to localStorage for session continuity.

### 2. Floating QR Button
**Location:** `src/components/FloatingQRButton.tsx`

A fixed-position floating action button (FAB) that:
- Appears at the bottom-right corner of the screen
- Opens the QR scanner modal on click
- Includes smooth animation on mount
- Available on Index and Menu pages

### 3. QR Scanner Modal
**Location:** `src/components/QRScannerModal.tsx`

Features:
- Uses device camera to scan QR codes
- Extracts table number from QR code (supports formats: "TABLE-XX" or "XX")
- Automatically sets `orderType` to 'dine-in'
- Navigates to `/menu` after successful scan
- Shows error messages for invalid QR codes
- Handles camera permission errors

**QR Code Format:**
The scanner accepts QR codes in the following formats:
- `TABLE-5` → Table 5
- `TABLE5` → Table 5
- `5` → Table 5

### 4. Order Type Selection Modal
**Location:** `src/components/OrderTypeModal.tsx`

A tabbed modal with two options:

**Tab 1 - Dine-in:**
- Shows "Scan QR to Select Table" button
- Opens QR scanner when clicked
- Sets orderType to 'dine-in' after successful scan

**Tab 2 - Takeaway:**
- Shows "Proceed as Takeaway" button
- Sets orderType to 'takeaway' immediately
- No table number required

### 5. Menu Page Enhancements
**Location:** `src/pages/Menu.tsx`

**Table Indicator Banner:**
- Displays when table number or takeaway mode is set
- Shows "Table: X • Dine-in" for dine-in orders
- Shows "Order Type: Takeaway" for takeaway orders
- Sticky positioned below the filters

**Clear Table Button:**
- Allows users to change their table/order type
- Only visible when `isCheckoutLocked` is false
- Resets table number and order type
- Opens QR scanner modal after clearing

### 6. Product Card Intercept Logic
**Location:** `src/components/DishCard.tsx`

The "Add to Order" button now includes validation:

```typescript
if (!tableNumber && orderType !== 'takeaway') {
  // Show order type selection modal
  setShowOrderTypeModal(true);
  return;
}
```

This ensures customers must:
1. Scan a table QR code (dine-in), OR
2. Select takeaway mode

Before adding items to their cart.

### 7. Checkout Page with Lock
**Location:** `src/pages/Checkout.tsx`

Features:
- Displays order summary with table/order type information
- Cart item management (quantity adjustment, removal)
- Tax calculation (10%)
- "Confirm Checkout" button that:
  - Sets `isCheckoutLocked` to true
  - Prevents table changes
  - Clears the cart
  - Navigates to orders page

**Checkout Lock Behavior:**
Once checkout is confirmed:
- The "Clear Table" button becomes disabled/hidden
- Users cannot change their table assignment
- This prevents confusion and ensures order accuracy

## User Flow

### Dine-in Flow
1. Customer enters restaurant and sits at a table
2. Customer opens the app (sees FloatingQRButton)
3. Customer clicks the QR button
4. QR scanner opens
5. Customer scans table QR code
6. App sets table number and orderType='dine-in'
7. App navigates to /menu
8. Table indicator shows "Table: X • Dine-in"
9. Customer browses menu and adds items
10. Customer proceeds to checkout
11. Customer confirms order
12. Checkout locks (table cannot be changed)

### Takeaway Flow
1. Customer opens the app
2. Customer tries to add an item to cart
3. Order type modal appears
4. Customer selects "Takeaway" tab
5. Customer clicks "Proceed as Takeaway"
6. Item is added to cart
7. Customer continues shopping
8. Customer proceeds to checkout
9. Customer confirms order

### Alternative Dine-in Flow (via Add to Cart)
1. Customer opens the app
2. Customer tries to add an item to cart
3. Order type modal appears
4. Customer selects "Dine-in" tab
5. Customer clicks "Scan QR to Select Table"
6. QR scanner opens
7. Customer scans table QR code
8. Item is added to cart
9. Customer continues shopping

## Technical Implementation

### Dependencies
- `html5-qrcode` - QR code scanning functionality (build-friendly, no React wrapper needed)
- `@radix-ui/react-dialog` - Modal dialogs
- `@radix-ui/react-tabs` - Tabbed interface
- `sonner` - Toast notifications
- `framer-motion` - Animations

### State Persistence
All order state is persisted to localStorage:
- `saltbee-table-number`
- `saltbee-order-type`
- `saltbee-checkout-locked`

This ensures state survives page refreshes.

### Routes
- `/` - Home page (with FloatingQRButton)
- `/menu` - Menu page (with FloatingQRButton, table indicator)
- `/checkout` - Checkout page (with lock functionality)

## Testing the Flow

### Testing Dine-in (without physical QR codes)
Since you may not have physical QR codes, you can test by:

1. **Create a test QR code:**
   - Go to https://www.qr-code-generator.com/
   - Enter text: "TABLE-5"
   - Generate and display on another device/screen

2. **Or modify the QR scanner temporarily:**
   - Add a "Test Mode" button that simulates scanning
   - Hardcode a table number for testing

### Testing Takeaway
1. Open the app
2. Navigate to /menu
3. Click "Add to Order" on any dish
4. Select "Takeaway" tab
5. Click "Proceed as Takeaway"
6. Verify item is added to cart

### Testing Checkout Lock
1. Complete either flow above
2. Add items to cart
3. Navigate to /checkout
4. Click "Confirm Checkout"
5. Go back to /menu
6. Verify "Clear Table" button is hidden/disabled

## Future Enhancements

Potential improvements:
1. **QR Code Generation:** Admin panel to generate table QR codes
2. **Table Status:** Show if a table is occupied
3. **Order History:** Link orders to specific tables
4. **Multi-language:** Support for Korean language
5. **Offline Mode:** Cache menu items for offline browsing
6. **Analytics:** Track popular tables, order patterns
7. **Staff Notifications:** Alert staff when orders are placed
8. **Order Modifications:** Allow changes before kitchen confirmation

## Troubleshooting

### Camera Not Working
- Ensure HTTPS is enabled (camera API requires secure context)
- Check browser permissions
- Try different browsers (Chrome/Safari recommended)

### QR Code Not Scanning
- Ensure good lighting
- Hold camera steady
- Try different QR code formats
- Check QR code is not damaged/blurry

### State Not Persisting
- Check localStorage is enabled
- Clear browser cache and try again
- Check for console errors

## Security Considerations

1. **QR Code Validation:** Only accept valid table numbers
2. **Session Management:** Consider adding session timeouts
3. **Order Verification:** Verify table assignments on backend
4. **HTTPS Required:** Camera access requires secure connection
