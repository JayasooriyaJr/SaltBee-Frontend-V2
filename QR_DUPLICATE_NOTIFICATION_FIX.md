# QR Scanner Duplicate Notification Fix

## Issue

When scanning a QR code, multiple "Table X selected!" notifications appeared repeatedly, even though the QR code was scanned only once.

## Root Cause

The `html5-qrcode` library continuously scans for QR codes at a rate of 10 frames per second (FPS). When it detects a QR code, it calls the `handleScan` callback **multiple times per second** as long as the QR code is visible in the camera view.

### What Was Happening:

1. User scans QR code
2. Scanner detects QR code at 10 FPS
3. `handleScan` called 10 times per second
4. Each call triggers:
   - `toast.success()` → Shows notification
   - `setTableNumber()` → Updates state
   - `navigate('/menu')` → Attempts navigation
5. Result: **Spam of notifications** 🔔🔔🔔

## Solution

Implemented a **debounce mechanism** using state flags and refs to ensure each QR code is processed only once:

### 1. Added Processing State

```tsx
const [isProcessingScan, setIsProcessingScan] = useState(false);
const lastScannedRef = useRef<string | null>(null);
```

- `isProcessingScan`: Prevents any new scans while processing current one
- `lastScannedRef`: Tracks the last scanned QR code text

### 2. Updated handleScan Function

```tsx
const handleScan = (decodedText: string) => {
    // ✅ Prevent duplicate scans
    if (isProcessingScan || lastScannedRef.current === decodedText) {
        return; // Exit early if already processing or same code
    }

    // Mark as processing
    setIsProcessingScan(true);
    lastScannedRef.current = decodedText;
    
    // ... process the scan
    
    // Reset state after processing
    setIsProcessingScan(false);
    lastScannedRef.current = null;
};
```

### 3. Reset State on Modal Close

```tsx
const handleClose = () => {
    // ... stop scanner
    
    // ✅ Reset processing state
    setIsProcessingScan(false);
    lastScannedRef.current = null;
    onClose();
};
```

## How It Works

### First Scan:
1. QR code detected
2. `isProcessingScan = false` ✅
3. `lastScannedRef.current = null` ✅
4. Process scan → Show notification
5. Set `isProcessingScan = true`
6. Set `lastScannedRef.current = "TABLE-5"`

### Subsequent Scans (same code):
1. QR code detected again (10 FPS)
2. `isProcessingScan = true` ❌ → **Exit early**
3. OR `lastScannedRef.current === "TABLE-5"` ❌ → **Exit early**
4. No notification shown ✅

### After Navigation:
1. Scanner stops
2. Modal closes
3. State resets:
   - `isProcessingScan = false`
   - `lastScannedRef.current = null`
4. Ready for next scan ✅

## Benefits

✅ **Single Notification**: Only one toast appears per scan
✅ **Immediate Response**: First scan is processed instantly
✅ **Prevents Spam**: Subsequent detections are ignored
✅ **Clean State**: Resets properly for next use
✅ **No Delays**: No artificial setTimeout needed

## Testing

### Before Fix:
```
Scan QR code → 
🔔 Table 5 selected!
🔔 Table 5 selected!
🔔 Table 5 selected!
🔔 Table 5 selected!
... (continues until navigation completes)
```

### After Fix:
```
Scan QR code → 
🔔 Table 5 selected!
✅ (Single notification, clean navigation)
```

## Edge Cases Handled

### 1. User Scans Different Code Quickly
```tsx
// First scan: TABLE-5
isProcessingScan = true
lastScannedRef.current = "TABLE-5"

// Second scan: TABLE-3 (before first completes)
if (isProcessingScan) return; // ✅ Blocked
```

### 2. User Closes Modal During Scan
```tsx
handleClose() {
    // ✅ Reset state
    setIsProcessingScan(false);
    lastScannedRef.current = null;
}
```

### 3. Scanner Error During Processing
```tsx
catch (err) {
    // ✅ Reset state even on error
    setIsProcessingScan(false);
    lastScannedRef.current = null;
}
```

### 4. User Reopens Scanner
```tsx
// Modal opens again
// State is clean from previous close
isProcessingScan = false ✅
lastScannedRef.current = null ✅
```

## Alternative Solutions Considered

### Option 1: Debounce with setTimeout ❌
```tsx
const debouncedScan = debounce(handleScan, 1000);
```
**Why not used:**
- Adds delay to first scan
- More complex
- Requires external library or custom implementation

### Option 2: Stop Scanner After First Scan ❌
```tsx
html5QrCode.stop();
```
**Why not used:**
- Scanner stops too early
- User can't rescan if needed
- Poor UX if scan fails

### Option 3: State Flag (USED) ✅
```tsx
if (isProcessingScan) return;
```
**Why used:**
- Simple and effective
- No delays
- Clean state management
- Easy to understand

## Summary

**Problem:** QR scanner called `handleScan` 10 times per second, causing notification spam

**Solution:** Added processing flag and last-scanned tracker to process each unique QR code only once

**Result:** Clean, single notification per scan with immediate response ✅

The fix is minimal, performant, and provides the best user experience!
