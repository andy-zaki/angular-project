# 🧪 Navigation Testing Guide

## Table of Contents
1. [Setup & Prerequisites](#setup--prerequisites)
2. [Running the Application](#running-the-application)
3. [Testing Navigation Flows](#testing-navigation-flows)
4. [Manual Testing Checklist](#manual-testing-checklist)
5. [Troubleshooting](#troubleshooting)
6. [Test Scenarios](#test-scenarios)

---

## Setup & Prerequisites

### Requirements
- Node.js 18+ installed
- Angular CLI 17+ installed
- npm or yarn package manager
- A modern web browser (Chrome, Firefox, Edge, Safari)

### Installation Steps

```bash
# 1. Navigate to project directory
cd "d:\Andrew\Work\Konecta\Angular\Angular Project\angular-project"

# 2. Install dependencies (if not already installed)
npm install

# 3. Verify Angular CLI
ng version
```

---

## Running the Application

### Development Server

```bash
# Start the development server
npm start
# OR
ng serve

# Application will be available at:
# http://localhost:4200
```

### Build for Production

```bash
# Create production build
npm run build

# Output will be in: dist/
```

### Run Tests

```bash
# Run unit tests
npm run test

# Run E2E tests (if configured)
npm run e2e
```

---

## Testing Navigation Flows

### ✅ Quick Start Testing

1. **Start the application:**
   ```bash
   npm start
   ```

2. **Navigate to:**
   ```
   http://localhost:4200
   ```

3. **Login with any credentials** (no validation yet):
   - Username: any value
   - Password: any value

4. **You'll land on the Dashboard** - Start testing from here!

---

## Manual Testing Checklist

### 🔓 Authentication Flow
- [ ] Homepage redirects to `/login`
- [ ] Login page displays correctly
- [ ] Can submit login form with any credentials
- [ ] Dashboard loads after login

---

### 🏫 Navigation Flow #1: Land Inquiry (استعلام عن بيانات قطع الأراضي)

**Entry Point:** Dashboard → Applications → Educational Building

#### Test Steps:

1. **From Dashboard:**
   ```
   Dashboard → Applications Menu → Applications → Educational Building
   ```

2. **Select "استعلام عن بيانات قطع الأراضي"**
   - ✅ Should navigate to `/land-inquiry-id`
   - ✅ Page displays the inquiry form

3. **On Land Inquiry ID Page:**
   - [ ] Enter any government number (e.g., "13000")
   - [ ] Click "🔍 استعلام" button
   - [ ] Should navigate to `/land-coordinates`

4. **On Land Coordinates Page:**
   - [ ] Display government number from previous page
   - [ ] Show land coordinates (dummy data):
     - Latitude: 30.0444° N
     - Longitude: 31.2357° E
     - Area: 500.50 م²
   - [ ] Click "→ استعلام المبنى"
   - [ ] Should navigate to `/building-inquiry`

5. **On Building Inquiry Page:**
   - [ ] Display building details:
     - Building Name: مدرسة الحسن بن الهيثم
     - Type: مدرسة ابتدائية
     - Area: 5000 م²
     - Location: صلاح الدين الايوبي
     - Rental Status: مؤجرة
   - [ ] Click "← العودة" to go back
   - [ ] Navigation works correctly

**Test Results:**
```
Flow: ✅ Land ID → Land Coordinates → Building Inquiry
```

---

### 🏢 Navigation Flow #2: Building Displacement Pre-PM Decision

**Entry Point:** Educational Building menu

#### Test Steps:

1. **From Educational Building:**
   - [ ] Select "استعلام المشروعات الغير مسندة"
   - [ ] Should navigate to `/building-displacement-pre`

2. **On Building Displacement Pre Page:**
   - [ ] Form displays with fields:
     - Government Number (required)
     - Property Owner
     - Total Area
     - Reason (textarea)
     - Proposal Date
   - [ ] Enter sample data:
     ```
     Government Number: 13000
     Property Owner: اسم المالك
     Area: 5000
     Reason: سبب نزع الملكية
     Date: Any date
     ```
   - [ ] Click "✓ إرسال البيانات"
   - [ ] Should navigate to `/displacement-council-approval`

3. **On Council Approval Page:**
   - [ ] Status badge shows: "قيد المراجعة"
   - [ ] Form displays:
     - Approval Date field
     - Council Decision dropdown
     - Notes textarea
   - [ ] Select decision: "موافق" (Approved)
   - [ ] Enter approval date
   - [ ] Click "✓ إرسال الموافقة"
   - [ ] Should navigate to `/educational-building`

**Test Results:**
```
Flow: ✅ Displacement Pre → Council Approval
```

---

### 📋 Navigation Flow #3: Building Displacement Post-PM Decision

**Entry Point:** Educational Building menu

#### Test Steps:

1. **From Educational Building:**
   - [ ] Select an option that leads to post-displacement
   - [ ] Or navigate directly to: `http://localhost:4200/building-displacement-post`

2. **On Building Displacement Post Page:**
   - [ ] Menu displays 6 options:
     - 💰 التعويض النهائي (Final Compensation)
     - 📊 كشوف العرض (Display Lists)
     - 📜 شهادات المطابقة (Compliance Certificates)
     - 📋 قرار الوزير المختص (Minister Decision)
     - 🏠 صحيفة وحدة عقارية (Property Unit Sheet)
     - 📝 استمارات البيع (Sales Forms)

3. **Test Final Compensation Option:**
   - [ ] Click option 1 "💰 التعويض النهائي"
   - [ ] Should navigate to `/displacement-final-compensation`

4. **On Final Compensation Page:**
   - [ ] Form displays:
     - Property Value field
     - Compensation Amount field
     - Payment Method dropdown
     - Payment Date field
     - Status (read-only): "قيد المراجعة"
   - [ ] Fill in sample data:
     ```
     Property Value: 100000
     Compensation Amount: 95000
     Payment Method: تحويل بنكي
     Payment Date: Any date
     ```
   - [ ] Click "✓ حفظ التعويض"
   - [ ] Should navigate back to `/educational-building`

**Test Results:**
```
Flow: ✅ Displacement Post Menu → Final Compensation
```

---

### 🗺️ Navigation Flow #4: School Map Inquiry (الاستعلام عن بيانات الخريطة المدرسية)

**Entry Point:** Educational Building → School Inquiry

#### Test Steps:

1. **From Educational Building:**
   - [ ] Select "استعلام حر للابنية الادارية"
   - [ ] Should navigate to `/school-map-inquiry`

2. **On School Map Inquiry Page:**
   - [ ] Menu displays 4 options:
     - 📅 بيانات الفترة الدراسية (Study Period Data)
     - 🛣️ بيانات الطرق المحيطة (Surrounding Roads)
     - 🏗️ بيانات الملاحق (Annexes Data)
     - 📋 تسجيل بيانات الفراغات (Spaces Registration)

3. **Test Study Period:**
   - [ ] Click "📅 بيانات الفترة الدراسية"
   - [ ] Navigate to `/school-map-study-period`
   - [ ] Display table with periods:
     | Period | Start | End | Students |
     |--------|-------|-----|----------|
     | الفترة الصباحية | 08:00 | 13:00 | 450 |
     | الفترة المسائية | 14:00 | 19:00 | 380 |

4. **Test Surrounding Roads:**
   - [ ] Go back to school-map-inquiry
   - [ ] Click "🛣️ بيانات الطرق المحيطة"
   - [ ] Navigate to `/school-map-roads`
   - [ ] Display road cards with information

5. **Test Annexes:**
   - [ ] Go back to school-map-inquiry
   - [ ] Click "🏗️ بيانات الملاحق"
   - [ ] Navigate to `/school-map-annexes`
   - [ ] Display annexes grid (Lab, Playground, Library)

6. **Test Spaces:**
   - [ ] Go back to school-map-inquiry
   - [ ] Click "📋 تسجيل بيانات الفراغات"
   - [ ] Navigate to `/school-map-spaces`
   - [ ] Display table with classroom information

**Test Results:**
```
✅ School Map Inquiry
├── ✅ Study Period Data
├── ✅ Surrounding Roads
├── ✅ Annexes Data
└── ✅ Spaces Registration
```

---

### 🏛️ Navigation Flow #5: Building Data Completion (استكمال بيانات مبنى تعليمي)

**Entry Point:** Educational Building menu

#### Test Steps:

1. **From Educational Building:**
   - [ ] Select an option for building data completion
   - [ ] Should navigate to `/building-data-completion`

2. **On Building Data Completion Page:**
   - [ ] Menu displays 2 options:
     - 📋 تسجيل البيانات الأساسية (Basic Data Registration)
     - 🏗️ تسجيل بيانات الملاحق (Annexes Data Registration)

3. **Test Basic Data:**
   - [ ] Click option 1
   - [ ] Navigate to `/building-basic-data`
   - [ ] Form displays fields:
     ```
     School Name (required)
     Building Type (select: Primary/Middle/Secondary)
     Total Area (number)
     Geographic Location (text)
     Construction Year (number)
     Number of Floors (number)
     ```
   - [ ] Fill sample data
   - [ ] Click "✓ حفظ البيانات"
   - [ ] Should navigate back

4. **Test Annexes Data:**
   - [ ] Go back to building-data-completion
   - [ ] Click option 2
   - [ ] Navigate to `/building-annexes-data`
   - [ ] Form displays:
     - Dynamic annex item 1 (with fields)
     - Dynamic annex item 2 (with fields)
     - "+ إضافة ملحق" button
   - [ ] Fill annex data
   - [ ] Click "+ إضافة ملحق" to add new annex
   - [ ] Click "✓ حفظ البيانات"
   - [ ] Should navigate back

**Test Results:**
```
✅ Building Data Completion
├── ✅ Basic Data Form
└── ✅ Annexes Data (Dynamic Form)
```

---

### 🏠 Navigation Flow #6: Rental Buildings Status (موقف المباني المؤجرة)

**Entry Point:** Dashboard → Applications Menu (Option 2)

#### Test Steps:

1. **From Dashboard:**
   ```
   Dashboard → Applications Menu (Choose "برنامج الاستعلام للمواقف (2)")
   ```
   - [ ] Should navigate to `/rental-buildings-status`

2. **On Rental Buildings Status Page:**
   - [ ] Displays program card
   - [ ] Click "اختر ←"
   - [ ] Navigate to `/rental-buildings-list`

3. **On Rental Buildings List Page:**
   - [ ] Display list of buildings:
     ```
     • مدرسة الرازي (مؤجرة - وزارة التعليم)
     • مدرسة ابن سينا (مؤجرة - وزارة الصحة)
     • مدرسة الفارابي (شاغرة - -)
     ```
   - [ ] Click on any building (e.g., مدرسة الرازي)
   - [ ] Navigate to `/rental-building-location?buildingId=1`

4. **On Rental Building Location Page:**
   - [ ] Display location information:
     ```
     Address: صلاح الدين الايوبي - المديرية
     Latitude: 30.0444° N
     Longitude: 31.2357° E
     Area: 5000 م²
     ```
   - [ ] Click "→ استعلام المبنى"
   - [ ] Navigate to `/rental-building-details?buildingId=1`

5. **On Rental Building Details Page:**
   - [ ] Display building card with header
   - [ ] Show details:
     ```
     Name: مدرسة الرازي
     Status: مؤجرة
     Tenant: وزارة التعليم
     Rental Start: 2020-01-15
     Rental End: 2025-01-14
     Annual Rent: 500000 ريال
     ```
   - [ ] Click "✎ تعديل الموقف"
   - [ ] Navigate to `/rental-building-modify-status?buildingId=1`

6. **On Modify Status Page:**
   - [ ] Form displays:
     ```
     Rental Status (select)
     Tenant Name
     Rental Start Date
     Rental End Date
     Annual Rent
     Notes (textarea)
     ```
   - [ ] Fill sample modification data
   - [ ] Click "✓ حفظ التعديلات"
   - [ ] Should navigate back to details page
   - [ ] Click "← العودة" and verify navigation chain

**Test Results:**
```
✅ Rental Buildings Status
├── ✅ Status Menu
├── ✅ Buildings List
├── ✅ Building Location
├── ✅ Building Details
└── ✅ Modify Status
```

---

## Test Scenarios

### Scenario 1: Complete Land Inquiry Flow
```
Login → Dashboard → Applications Menu → Applications 
→ Educational Building → Land Inquiry 
→ (Enter Gov#) → Coordinates → Building Details → Back
```

**Expected Result:** ✅ All pages load correctly with dummy data

### Scenario 2: Displacement Data Entry (Pre & Post)
```
Educational Building → Displacement Pre 
→ (Fill Form) → Council Approval 
→ (Approve) → Educational Building
```

**Expected Result:** ✅ Forms accept input and navigate correctly

### Scenario 3: School Map Data Exploration
```
Educational Building → School Map Inquiry 
→ [Study Period/Roads/Annexes/Spaces] 
→ Back → Back → Educational Building
```

**Expected Result:** ✅ All sub-pages display with sample data

### Scenario 4: Complete Rental Buildings Workflow
```
Applications Menu → Rental Status → List 
→ Select Building → Location → Details 
→ Modify Status → (Update) → Back
```

**Expected Result:** ✅ Complete workflow without errors

### Scenario 5: Navigation Breadcrumbs
From any page:
- [ ] "← العودة" button takes you to previous page
- [ ] Each page maintains context (query params)
- [ ] Can navigate forward and backward

**Expected Result:** ✅ Navigation state preserved

---

## Browser Testing

### Chrome/Chromium
```bash
# Already tested during development
# Test at: http://localhost:4200
```

### Firefox
```bash
# Open: http://localhost:4200
# Test RTL layout for Arabic content
```

### Safari (macOS/iOS)
```bash
# Test responsive design
# Test touch navigation on iOS
```

### Edge
```bash
# Test compatibility
# Verify CSS rendering
```

---

## Responsive Design Testing

### Desktop (1920x1080)
- [ ] All layouts display correctly
- [ ] Buttons are clickable
- [ ] Forms are easy to fill

### Tablet (768x1024)
- [ ] Responsive grid adjusts
- [ ] Touch targets are large enough
- [ ] Horizontal scroll not needed

### Mobile (375x667)
- [ ] Stack layout works
- [ ] Forms adapt to small screens
- [ ] Navigation is intuitive

### Test Command
```bash
# Open DevTools (F12)
# Click responsive design toggle (Ctrl+Shift+M)
# Test various dimensions
```

---

## Performance Testing

### Check Bundle Size
```bash
npm run build

# Check dist/ folder size
# Should be reasonable for an Angular app
```

### Check Runtime Performance
```bash
# Open Chrome DevTools → Performance tab
# Record page load and navigation
# Check for performance issues
```

### Lazy Loading Verification
```bash
# Open Chrome DevTools → Network tab
# Navigate between routes
# Verify chunks load on demand
```

---

## Troubleshooting

### Issue: Application won't start
```bash
# Solution 1: Clear node_modules
rm -r node_modules
npm install

# Solution 2: Clear Angular cache
ng cache clean

# Solution 3: Kill process and restart
npm start
```

### Issue: Port 4200 already in use
```bash
# Use different port
ng serve --port 4201
# Access at: http://localhost:4201
```

### Issue: Components not loading
```bash
# Check browser console (F12)
# Look for errors
# Verify component imports in routes
```

### Issue: Styling looks wrong
```bash
# Clear browser cache (Ctrl+Shift+Delete)
# Hard refresh (Ctrl+Shift+R)
# Check CSS file paths
```

### Issue: Navigation not working
```bash
# Verify routes in app.routes.ts
# Check component imports
# Look for typos in route paths
# Check browser console for errors
```

---

## Automated Testing (Future)

### Unit Tests
```bash
# Create test files for each component
ng generate component --skip-tests=false

# Run tests
npm run test
```

### E2E Tests
```bash
# Create E2E tests with Cypress or Playwright
# Test complete user flows
npm run e2e
```

---

## Checklist for Sign-Off

### Functionality
- [ ] All 6 navigation flows work
- [ ] All forms accept input
- [ ] All buttons navigate correctly
- [ ] Back navigation works
- [ ] Query parameters pass data correctly

### UI/UX
- [ ] Arabic text displays correctly (RTL)
- [ ] Forms are user-friendly
- [ ] Colors are consistent
- [ ] Icons display correctly
- [ ] Responsive design works

### Performance
- [ ] App loads in <3 seconds
- [ ] Navigation is instant
- [ ] No console errors
- [ ] Lazy loading works

### Code Quality
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Components follow best practices
- [ ] Code is well-documented

---

## Support & Questions

For issues or questions:
1. Check the browser console (F12)
2. Review component files
3. Check app.routes.ts for routing issues
4. Verify dummy data is loaded
5. Check IMPLEMENTATION_SUMMARY.md for details

---

**Last Updated:** October 22, 2025
**Angular Version:** 17+
**Status:** ✅ Ready for Testing
