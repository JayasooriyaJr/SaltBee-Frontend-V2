# Quick Start Guide - QR Ordering System

## 🚀 Getting Started

The QR-driven restaurant ordering system is now fully implemented and ready to test!

## ✅ What's Been Built

1. **QR Code Scanning** - Scan table QR codes to assign tables
2. **Order Type Selection** - Choose between dine-in and takeaway
3. **Table Management** - View and clear table assignments
4. **Checkout Lock** - Prevent table changes after order confirmation
5. **Floating QR Button** - Easy access to QR scanner from any page

## 🧪 How to Test

### Option 1: Test with a Real QR Code

1. **Generate a QR code:**
   - Visit: https://www.qr-code-generator.com/
   - Enter text: `TABLE-5`
   - Download or display the QR code

2. **Test the flow:**
   ```bash
   # Make sure dev server is running
   npm run dev
   ```

3. **Open the app** in your browser (http://localhost:5173)

4. **Click the floating QR button** (bottom-right corner)

5. **Scan the QR code** with your device camera

6. **Verify:**
   - Table number is set to "5"
   - You're navigated to /menu
   - Table indicator shows "Table: 5 • Dine-in"

### Option 2: Test Takeaway Flow

1. **Open the app** (http://localhost:5173)

2. **Navigate to /menu**

3. **Click "Add to Order"** on any dish

4. **In the modal:**
   - Click the "Takeaway" tab
   - Click "Proceed as Takeaway"

5. **Verify:**
   - Item is added to cart
   - Order type indicator shows "Order Type: Takeaway"

### Option 3: Test Checkout Lock

1. **Complete either flow above** (QR scan or takeaway)

2. **Add items to cart**

3. **Navigate to /checkout** (click cart icon in navbar)

4. **Click "Confirm Checkout"**

5. **Go back to /menu**

6. **Verify:**
   - "Clear Table" button is hidden or disabled
   - Table assignment cannot be changed

## 📱 Testing on Mobile

For the best QR scanning experience:

1. **Run dev server** on your computer:
   ```bash
   npm run dev
   ```

2. **Find your local IP:**
   ```bash
   # Windows
   ipconfig
   # Look for IPv4 Address (e.g., 192.168.1.100)
   ```

3. **Access from mobile:**
   - Open browser on phone
   - Go to: `http://YOUR_IP:5173`
   - Example: `http://192.168.1.100:5173`

4. **Grant camera permissions** when prompted

5. **Test QR scanning** with a physical QR code

## 🎯 Test Scenarios

### Scenario 1: First-time Dine-in Customer
- [ ] Open app
- [ ] Click floating QR button
- [ ] Scan table QR code
- [ ] See table indicator
- [ ] Add items to cart
- [ ] Proceed to checkout
- [ ] Confirm order
- [ ] Verify checkout lock

### Scenario 2: Takeaway Customer
- [ ] Open app
- [ ] Try to add item
- [ ] See order type modal
- [ ] Select takeaway
- [ ] Add items to cart
- [ ] Proceed to checkout
- [ ] Confirm order

### Scenario 3: Change Table Before Checkout
- [ ] Scan QR code (Table 5)
- [ ] See table indicator
- [ ] Click "Clear Table"
- [ ] Scan different QR code (Table 3)
- [ ] Verify table changed to 3

### Scenario 4: Cannot Change After Checkout
- [ ] Scan QR code
- [ ] Add items
- [ ] Checkout and confirm
- [ ] Try to click "Clear Table"
- [ ] Verify button is disabled

## 🔍 What to Look For

### Visual Elements

**Floating QR Button:**
- Fixed at bottom-right
- Circular button with QR icon
- Smooth animation on page load
- Visible on Index and Menu pages

**Table Indicator:**
- Sticky banner below filters
- Shows "Table: X • Dine-in" or "Order Type: Takeaway"
- "Clear Table" button on the right
- Button disabled when checkout is locked

**QR Scanner Modal:**
- Full-screen camera view
- Clear instructions
- Error messages for invalid codes
- Closes automatically on successful scan

**Order Type Modal:**
- Two tabs: Dine-in and Takeaway
- Clear icons and descriptions
- Smooth transitions

### Functional Behavior

**State Persistence:**
- Refresh the page
- Table number should persist
- Order type should persist
- Checkout lock should persist

**Navigation:**
- QR scan → navigates to /menu
- Add to cart without table → shows modal
- Checkout confirm → navigates to /orders

**Validation:**
- Cannot add to cart without table/orderType
- Cannot change table after checkout
- Invalid QR codes show error

## 🐛 Troubleshooting

### Camera Not Working

**Issue:** QR scanner shows black screen or error

**Solutions:**
1. Check browser permissions (allow camera access)
2. Use HTTPS (camera requires secure context)
3. Try different browser (Chrome/Safari recommended)
4. Check if another app is using camera

### QR Code Not Scanning

**Issue:** QR code not recognized

**Solutions:**
1. Ensure good lighting
2. Hold camera steady
3. Try different distance from QR code
4. Verify QR code format (TABLE-5, TABLE5, or just 5)
5. Generate new QR code

### State Not Persisting

**Issue:** Table number lost on refresh

**Solutions:**
1. Check browser console for errors
2. Verify localStorage is enabled
3. Clear browser cache and try again
4. Check for incognito/private mode

### Floating Button Not Visible

**Issue:** QR button doesn't appear

**Solutions:**
1. Check if on correct page (Index or Menu)
2. Scroll to see if it's hidden
3. Check browser console for errors
4. Verify component is imported

## 📊 Browser Console Testing

Open browser DevTools (F12) and check:

```javascript
// Check current state
localStorage.getItem('saltbee-table-number')
localStorage.getItem('saltbee-order-type')
localStorage.getItem('saltbee-checkout-locked')

// Manually set state for testing
localStorage.setItem('saltbee-table-number', '5')
localStorage.setItem('saltbee-order-type', 'dine-in')
localStorage.setItem('saltbee-checkout-locked', 'false')

// Clear state
localStorage.removeItem('saltbee-table-number')
localStorage.removeItem('saltbee-order-type')
localStorage.removeItem('saltbee-checkout-locked')

// Or clear all
localStorage.clear()
```

## 🎨 UI/UX Features to Notice

1. **Smooth Animations:**
   - Floating button entrance
   - Modal transitions
   - Table indicator slide-in

2. **Responsive Design:**
   - Works on mobile and desktop
   - Touch-friendly buttons
   - Adaptive layouts

3. **Visual Feedback:**
   - Toast notifications on scan
   - Button states (disabled/enabled)
   - Loading states during checkout

4. **Accessibility:**
   - Clear labels and descriptions
   - Keyboard navigation support
   - Screen reader friendly

## 📝 Sample QR Codes to Generate

Create these QR codes for testing:

1. **TABLE-1** → Small table
2. **TABLE-5** → Medium table
3. **TABLE-10** → Large table
4. **TABLE-VIP** → Should show error (invalid)
5. **5** → Should work (just number)

## ✨ Next Steps

After testing, you can:

1. **Customize styling** - Update colors, fonts, animations
2. **Add backend integration** - Connect to real API
3. **Generate QR codes** - Create admin panel for table QR generation
4. **Add analytics** - Track popular tables and order patterns
5. **Enhance validation** - Add more QR code formats
6. **Multi-language** - Add Korean translations

## 🎉 You're Ready!

The system is fully functional and ready for testing. Start with the basic flows and explore the features. If you encounter any issues, refer to the troubleshooting section or check the comprehensive documentation in `QR_ORDERING_SYSTEM.md`.

Happy testing! 🐝
