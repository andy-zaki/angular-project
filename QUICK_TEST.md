# 🚀 Quick Start Testing Guide

## Start in 30 Seconds

```bash
# 1. Open terminal
cd "d:\Andrew\Work\Konecta\Angular\Angular Project\angular-project"

# 2. Run the app
npm start

# 3. Open browser
# Navigate to: http://localhost:4200
```

---

## Navigation Flows Quick Map

### 🌳 Flow Tree

```
Login Page
│
├─→ Dashboard
│   │
│   ├─→ Applications Menu
│   │   │
│   │   ├─→ 1️⃣ Applications (Educational Building Menu)
│   │   │   │
│   │   │   ├─→ 🗺️ Land Inquiry
│   │   │   │   └─→ Enter Gov# → Coordinates → Building Info
│   │   │   │
│   │   │   ├─→ 🏗️ School Map Inquiry
│   │   │   │   ├─→ Study Periods
│   │   │   │   ├─→ Surrounding Roads
│   │   │   │   ├─→ Annexes
│   │   │   │   └─→ Spaces
│   │   │   │
│   │   │   ├─→ 📋 Displacement Pre-Decision
│   │   │   │   └─→ Form → Council Approval
│   │   │   │
│   │   │   ├─→ 📊 Displacement Post-Decision
│   │   │   │   └─→ Menu → Final Compensation
│   │   │   │
│   │   │   └─→ 🏢 Building Data Completion
│   │   │       ├─→ Basic Data Form
│   │   │       └─→ Annexes Data (Dynamic)
│   │   │
│   │   └─→ 2️⃣ Rental Buildings Status
│   │       └─→ List → Location → Details → Modify
```

---

## 5-Minute Test Run

### Step 1: Login (10 seconds)
```
1. Go to http://localhost:4200
2. Enter any username/password
3. Click Login
```

### Step 2: Test Land Inquiry (1 min)
```
1. Click: Applications
2. Click: Educational Building
3. Click: استعلام عن بيانات قطع الأراضي
4. Enter: 13000 (any number)
5. Click: 🔍 استعلام
6. See coordinates page
7. Click: → استعلام المبنى
8. See building details
```

### Step 3: Test School Map (1 min)
```
1. Back to Educational Building
2. Click: استعلام حر للابنية الادارية
3. Click: 📅 بيانات الفترة الدراسية
4. See study periods table
5. Back and try other options (Roads, Annexes, Spaces)
```

### Step 4: Test Rental Buildings (1.5 min)
```
1. Back to Dashboard
2. Click: Applications Menu
3. Click: برنامج الاستعلام للمواقف (2)
4. Click: اختر ←
5. Click: Select a building (مدرسة الرازي)
6. See location, details
7. Click: ✎ تعديل الموقف
8. See modification form
```

### Step 5: Test Forms (1 min)
```
1. Back to Educational Building
2. Try any form (Displacement, Building Data)
3. Fill in sample data
4. Click submit
5. Verify navigation
```

---

## Test Checklist (Copy & Paste)

```
BASIC FUNCTIONALITY
☐ App loads without errors
☐ Login works with any credentials
☐ Dashboard displays
☐ No console errors (F12)

LAND INQUIRY FLOW
☐ Can enter government number
☐ Coordinates page loads
☐ Building info displays
☐ Back button works

SCHOOL MAP FLOW
☐ Study periods table shows
☐ Roads page displays
☐ Annexes grid shows
☐ Spaces table displays

DISPLACEMENT FLOW
☐ Pre-decision form works
☐ Council approval loads
☐ Post-decision menu appears
☐ Compensation form submits

RENTAL BUILDINGS FLOW
☐ Buildings list displays
☐ Location details show
☐ Building details card appears
☐ Modify status form works

FORMS & NAVIGATION
☐ All forms accept input
☐ Submit buttons work
☐ Back buttons navigate correctly
☐ Query parameters preserve data

RESPONSIVE DESIGN
☐ Desktop (1920x1080) works
☐ Tablet (768x1024) works
☐ Mobile (375x667) works
☐ No horizontal scroll

STYLING & CONTENT
☐ Arabic text displays RTL
☐ Colors are consistent
☐ Icons show correctly
☐ Forms look professional
```

---

## Common Routes to Test

| Route | What to Test | Expected |
|-------|--------------|----------|
| `/login` | Basic form | Form displays |
| `/dashboard` | Main page | Multiple options |
| `/applications-menu` | Menu options | 2 main options |
| `/applications` | App list | Shows applications |
| `/educational-building` | Building menu | 12 options |
| `/land-inquiry-id` | Land form | Input field |
| `/land-coordinates` | Map view | Coordinates display |
| `/building-inquiry` | Building info | Details card |
| `/school-map-inquiry` | Map menu | 4 sub-options |
| `/building-displacement-pre` | Displacement form | Form displays |
| `/displacement-council-approval` | Approval form | Approval fields |
| `/rental-buildings-status` | Rental menu | Program card |
| `/rental-buildings-list` | Buildings list | List of buildings |
| `/rental-building-details` | Details card | Building info |

---

## Direct URL Testing

Open your browser and paste these URLs directly:

```
http://localhost:4200/land-inquiry-id
http://localhost:4200/school-map-inquiry
http://localhost:4200/building-displacement-pre
http://localhost:4200/rental-buildings-status
http://localhost:4200/building-data-completion
```

---

## Dummy Data Reference

### Building Names
- مدرسة الحسن بن الهيثم (Elementary)
- مدرسة الرازي (Rented)
- مدرسة ابن سينا (Rented)
- مدرسة الفارابي (Vacant)

### Location
- صلاح الدين الايوبي - المديرية

### Coordinates
- Latitude: 30.0444° N
- Longitude: 31.2357° E

### Study Periods
- الفترة الصباحية: 08:00 - 13:00 (450 students)
- الفترة المسائية: 14:00 - 19:00 (380 students)

### Test Government Numbers
- 13000
- 13001
- 13001350

---

## Browser DevTools Tips

### Check Console (F12 → Console)
```javascript
// Should be empty or have no errors
// Red errors = potential issues
```

### Check Network (F12 → Network)
```
1. Clear network tab
2. Navigate between pages
3. Look for failed requests
4. Check bundle sizes
```

### Check Performance (F12 → Performance)
```
1. Click Record
2. Navigate and interact
3. Stop recording
4. Look for long tasks or stutters
```

### Check Elements (F12 → Elements)
```
1. Inspect Arabic text
2. Verify RTL direction
3. Check responsive layout
```

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move between form fields |
| `Enter` | Submit forms |
| `Shift+Tab` | Move backward |
| `Alt+←` | Browser back |
| `F12` | Open DevTools |
| `Ctrl+Shift+R` | Hard refresh |

---

## Mobile Testing

### Using Chrome DevTools
```
1. Press F12 (Open DevTools)
2. Press Ctrl+Shift+M (Toggle device toolbar)
3. Select device (iPhone, iPad, Android)
4. Test all flows on mobile
```

### Devices to Test
- iPhone 12 (390x844)
- iPad (768x1024)
- Android (375x667)
- Tablet (1024x768)

---

## Success Criteria

✅ **You're done testing when:**
- All routes load without errors
- All forms accept input
- Navigation works bidirectionally
- No red errors in console
- Responsive design works
- Arabic text displays correctly
- All buttons are clickable
- Data persists in forms during navigation

---

## Quick Troubleshooting

### "Cannot find module" error?
```bash
npm install
```

### Port already in use?
```bash
ng serve --port 4201
```

### Page not found?
```
1. Check URL spelling
2. Verify route in app.routes.ts
3. Hard refresh (Ctrl+Shift+R)
```

### Form not submitting?
```
1. Check form has FormModule
2. Look console for errors
3. Verify navigation path
```

---

## Next Steps

1. ✅ Complete this 5-minute test
2. ✅ Run the full testing checklist
3. ✅ Test on different browsers
4. ✅ Test responsive design
5. ✅ Review browser console
6. ✅ Sign off on testing

---

**Ready? Start with:** `npm start`

Good luck! 🎉
