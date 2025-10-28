# Database Table Hierarchy - تسلسل جداول قاعدة البيانات

## Overview - نظرة عامة
This document illustrates the hierarchical structure of all 25 tables in the AngularProjectDB database, showing relationships and foreign key dependencies with Arabic names.

---

## Central Hub Architecture - البنية المركزية

```
                    ╔═══════════════════════════════════════════════╗
                    ║    EducationalBuildings (المباني التعليمية)  ║
                    ║            CENTRAL HUB - المركز الرئيسي      ║
                    ╚═══════════════════════════════════════════════╝
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
        ┌───────────▼──────────────┐  ┌────▼─────┐  ┌──────────▼──────────┐
        │  Study Components        │  │ Entities │  │  School Map Data    │
        │   مكونات الدراسة     │  │ الكيانات │ │  بيانات خريطة المدرسة│
        └──────────────────────────┘  └──────────┘  └─────────────────────┘
```

---

## Level 0: Independent Root Tables - الجداول المستقلة (بدون تبعيات)

These tables have no foreign key dependencies and serve as reference data.

### 1. **Programs** - البرامج
```
Programs (البرامج)
├─ Id (GUID - Primary Key)
├─ Name (nvarchar) - اسم البرنامج
├─ Description (nvarchar) - وصف البرنامج
├─ IsActive (bit) - نشط/غير نشط
└─ CreatedAt (datetime2) - تاريخ الإنشاء

Purpose: Application programs for user access
Example: برنامج إدارة المباني، برنامج الأراضي، برنامج الإيجارات
```

### 2. **Menus** - القوائم
```
Menus (القوائم)
├─ Id (GUID - Primary Key)
├─ Name (nvarchar) - اسم القائمة
├─ Description (nvarchar) - وصف القائمة
├─ IsActive (bit) - نشط/غير نشط
└─ CreatedAt (datetime2) - تاريخ الإنشاء

Purpose: Menu options for user interface
Example: القائمة الرئيسية، قائمة الاستعلامات، قائمة التقارير
```

### 3. **Libraries** - المكتبات
```
Libraries (المكتبات)
├─ Id (GUID - Primary Key)
├─ Name (nvarchar) - اسم المكتبة
├─ Location (nvarchar) - موقع المكتبة
├─ Description (nvarchar) - وصف المكتبة
├─ IsActive (bit) - نشط/غير نشط
└─ CreatedAt (datetime2) - تاريخ الإنشاء

Purpose: Library locations for educational administration
Example: المكتبة المركزية، مكتبة الشرقية، مكتبة الغربية
```

### 4. **RentalStatusFlags** - حالات الإيجار
```
RentalStatusFlags (حالات الإيجار)
├─ Id (GUID - Primary Key)
├─ Code (nvarchar - UNIQUE) - رمز الحالة
├─ Label (nvarchar) - تسمية الحالة
├─ Category (nvarchar) - فئة الحالة
├─ IsActive (bit) - نشط/غير نشط
└─ CreatedAt (datetime2) - تاريخ الإنشاء

Purpose: Status flags for rental buildings
Example: ACTIVE (نشط), PENDING (قيد الانتظار), EXPIRED (منتهي)
```

### 5. **EducationalBuildings** - المباني التعليمية ⭐ CENTRAL HUB
```
EducationalBuildings (المباني التعليمية)
├─ Id (GUID - Primary Key)
├─ BuildingCode (nvarchar - UNIQUE) - رمز المبنى
├─ BuildingName (nvarchar) - اسم المبنى
├─ EducationType (nvarchar) - نوع التعليم (ابتدائي، متوسط، ثانوي، روضة)
├─ BuildingStatus (nvarchar) - حالة المبنى
├─ TotalArea (decimal) - المساحة الإجمالية
├─ NumberOfClassrooms (int) - عدد الفصول
├─ NumberOfLabs (int) - عدد المختبرات
├─ HasLibrary (bit) - يوجد مكتبة
├─ HasGym (bit) - يوجد صالة رياضية
├─ HasCafeteria (bit) - يوجد كافتيريا
├─ ConstructionYear (int) - سنة البناء
├─ LastRenovationYear (int) - سنة آخر ترميم
├─ CreatedAt (datetime2) - تاريخ الإنشاء
└─ UpdatedAt (datetime2) - تاريخ التحديث

Purpose: Central hub for all educational facilities - المركز الرئيسي لجميع المنشآت التعليمية
Example: EDU-001 (مدرسة النور الابتدائية), EDU-002 (مدرسة الأمل المتوسطة)
```

---

## Level 1: Tables Directly Connected to Central Hub

These tables have foreign keys pointing to EducationalBuildings (المباني التعليمية).

### 6. **StudyPeriods** - الفترات الدراسية
```
StudyPeriods (الفترات الدراسية)
├─ Id (GUID - Primary Key)
├─ EducationalBuildingId (GUID - FK) ──→ EducationalBuildings 🔗
├─ BuildingCode (nvarchar) - رمز المبنى
├─ SchoolName (nvarchar) - اسم المدرسة
├─ Period (nvarchar) - الفترة (صباحية/مسائية)
├─ StudentCount (int) - عدد الطلاب
├─ ClassroomCount (int) - عدد الفصول
├─ TeacherCount (int) - عدد المعلمين
├─ EducationalLevel (nvarchar) - المرحلة التعليمية
├─ CreatedAt (datetime2) - تاريخ الإنشاء
└─ UpdatedAt (datetime2) - تاريخ التحديث

Relationship: Many StudyPeriods → One EducationalBuilding (ON DELETE SET NULL)
Example: الفترة الصباحية (450 طالب)، الفترة المسائية (380 طالب)
```

### 7. **SchoolRoads** - طرق المدرسة
```
SchoolRoads (طرق المدرسة)
├─ Id (GUID - Primary Key)
├─ EducationalBuildingId (GUID - FK) ──→ EducationalBuildings 🔗
├─ BuildingId (nvarchar) - رمز المبنى
├─ Direction (nvarchar) - الاتجاه (شمال، جنوب، شرق، غرب)
├─ RoadName (nvarchar) - اسم الطريق
├─ RoadWidth (decimal) - عرض الطريق
├─ RoadType (nvarchar) - نوع الطريق (رئيسي، فرعي)
├─ Condition (nvarchar) - الحالة (جيد، ممتاز)
└─ CreatedAt (datetime2) - تاريخ الإنشاء

Relationship: Many SchoolRoads → One EducationalBuilding (ON DELETE SET NULL)
Example: طريق الملك فهد (شمال)، شارع العليا (جنوب)
```

### 8. **SchoolAnnexes** - ملاحق المدرسة
```
SchoolAnnexes (ملاحق المدرسة)
├─ Id (GUID - Primary Key)
├─ EducationalBuildingId (GUID - FK) ──→ EducationalBuildings 🔗
├─ BuildingId (nvarchar) - رمز المبنى
├─ AnnexType (nvarchar) - نوع الملحق
├─ Area (decimal) - المساحة
├─ Capacity (int) - السعة
├─ Condition (nvarchar) - الحالة
├─ Purpose (nvarchar) - الغرض
├─ CreatedAt (datetime2) - تاريخ الإنشاء
└─ UpdatedAt (datetime2) - تاريخ التحديث

Relationship: Many SchoolAnnexes → One EducationalBuilding (ON DELETE SET NULL)
Example: مبنى إداري، صالة رياضية، مختبر علوم
```

### 9. **SchoolSpaces** - الفراغات المدرسية
```
SchoolSpaces (الفراغات المدرسية)
├─ Id (GUID - Primary Key)
├─ EducationalBuildingId (GUID - FK) ──→ EducationalBuildings 🔗
├─ BuildingId (nvarchar) - رمز المبنى
├─ SpaceType (nvarchar) - نوع الفراغ
├─ Area (decimal) - المساحة
├─ Quantity (int) - الكمية
├─ Condition (nvarchar) - الحالة
├─ Usage (nvarchar) - الاستخدام
├─ CreatedAt (datetime2) - تاريخ الإنشاء
└─ UpdatedAt (datetime2) - تاريخ التحديث

Relationship: Many SchoolSpaces → One EducationalBuilding (ON DELETE SET NULL)
Example: فصول دراسية، مختبرات، قاعات محاضرات
```

### 10. **Buildings** - المباني
```
Buildings (المباني)
├─ Id (GUID - Primary Key)
├─ BuildingNumber (nvarchar - UNIQUE) - رقم المبنى
├─ SchoolName (nvarchar) - اسم المدرسة
├─ UsageStatus (nvarchar) - حالة الاستخدام
├─ Affiliation (nvarchar) - التبعية
├─ BuildingOwnership (nvarchar) - ملكية المبنى
├─ Governorate (nvarchar) - المحافظة
├─ RegionalCenter (nvarchar) - المركز الإقليمي
├─ EducationalAdministration (nvarchar) - الإدارة التعليمية
├─ District (nvarchar) - المنطقة
├─ Neighborhood (nvarchar) - الحي
├─ Stage (nvarchar) - المرحلة
├─ EducationType (nvarchar) - نوع التعليم
├─ EducationalBuildingId (GUID - FK) ──→ EducationalBuildings 🔗
├─ CreatedAt (datetime2) - تاريخ الإنشاء
└─ UpdatedAt (datetime2) - تاريخ التحديث

Relationship: Many Buildings → One EducationalBuilding (ON DELETE SET NULL)
Example: BLD-001 (مدرسة النور الابتدائية)
```

### 11. **Lands** - الأراضي
```
Lands (الأراضي)
├─ Id (GUID - Primary Key)
├─ ReferenceNumber (nvarchar - UNIQUE) - الرقم المرجعي
├─ UsageStatus (nvarchar) - حالة الاستخدام
├─ Headquarters (nvarchar) - المقر
├─ ApprovalStatus (nvarchar) - حالة الموافقة
├─ IdentificationNumber (nvarchar) - رقم التعريف
├─ CenterDepartment (nvarchar) - قسم المركز
├─ TotalArea (decimal) - المساحة الكلية
├─ Phase (nvarchar) - المرحلة
├─ Approval (nvarchar) - الموافقة
├─ Village (nvarchar) - القرية
├─ CurrentOwner (nvarchar) - المالك الحالي
├─ OriginalOwner (nvarchar) - المالك الأصلي
├─ EducationalBuildingId (GUID - FK) ──→ EducationalBuildings 🔗
├─ [... 20+ additional land-specific fields]
├─ CreatedAt (datetime2) - تاريخ الإنشاء
└─ UpdatedAt (datetime2) - تاريخ التحديث

Relationship: Many Lands → One EducationalBuilding (ON DELETE SET NULL)
Example: LAND-2024-001 (5000 متر مربع)
```

### 12. **RentalBuildings** - المباني المستأجرة
```
RentalBuildings (المباني المستأجرة)
├─ Id (GUID - Primary Key)
├─ IdentificationNumber (nvarchar - UNIQUE) - رقم التعريف
├─ Name (nvarchar) - الاسم
├─ StatusFlagId (GUID - FK) ──→ RentalStatusFlags 🔗
├─ EducationalBuildingId (GUID - FK) ──→ EducationalBuildings 🔗
├─ Status (nvarchar) - الحالة
├─ Substatus (nvarchar) - الحالة الفرعية
├─ Tenant (nvarchar) - المستأجر
├─ Location (nvarchar) - الموقع
├─ MonthlyRent (decimal) - الإيجار الشهري
├─ ContractStartDate (datetime2) - تاريخ بداية العقد
├─ ContractEndDate (datetime2) - تاريخ نهاية العقد
├─ BuildingType (nvarchar) - نوع المبنى
├─ TotalArea (decimal) - المساحة الإجمالية
├─ UsableArea (decimal) - المساحة القابلة للاستخدام
├─ NumberOfRooms (int) - عدد الغرف
├─ NumberOfFloors (int) - عدد الأدوار
├─ YearBuilt (int) - سنة البناء
├─ LastInspectionDate (datetime2) - تاريخ آخر فحص
├─ InspectionStatus (nvarchar) - حالة الفحص
├─ MaintenanceRequired (bit) - صيانة مطلوبة
├─ CreatedAt (datetime2) - تاريخ الإنشاء
└─ UpdatedAt (datetime2) - تاريخ التحديث

Relationships: 
- Many RentalBuildings → One RentalStatusFlag (ON DELETE SET NULL)
- Many RentalBuildings → One EducationalBuilding (ON DELETE SET NULL)
Example: RB-2024-001 (مبنى إداري مستأجر - 25,000 ريال/شهر)
```

### 13. **DisplacementRecords** - سجلات الإحلال
```
DisplacementRecords (سجلات الإحلال)
├─ Id (GUID - Primary Key)
├─ ReferenceNumber (nvarchar - UNIQUE) - الرقم المرجعي
├─ BuildingCode (nvarchar) - رمز المبنى
├─ DisplacementType (nvarchar) - نوع الإحلال
├─ Status (nvarchar) - الحالة
├─ RequestDate (datetime2) - تاريخ الطلب
├─ ApprovalDate (datetime2) - تاريخ الموافقة
├─ CompletionDate (datetime2) - تاريخ الإكمال
├─ Reason (nvarchar) - السبب
├─ Notes (nvarchar) - ملاحظات
├─ EducationalBuildingId (GUID - FK) ──→ EducationalBuildings 🔗
├─ CreatedAt (datetime2) - تاريخ الإنشاء
└─ UpdatedAt (datetime2) - تاريخ التحديث

Relationship: Many DisplacementRecords → One EducationalBuilding (ON DELETE SET NULL)
Example: DISP-2024-001 (إحلال كامل)
```

### 14. **Users** - المستخدمون
```
Users (المستخدمون)
├─ Id (GUID - Primary Key)
├─ Username (nvarchar - UNIQUE) - اسم المستخدم
├─ PasswordHash (nvarchar) - كلمة المرور المشفرة
├─ Email (nvarchar) - البريد الإلكتروني
├─ FullName (nvarchar) - الاسم الكامل
├─ Role (nvarchar) - الدور
├─ IsActive (bit) - نشط/غير نشط
├─ LastLoginDate (datetime2) - تاريخ آخر دخول
├─ ProgramId (GUID - FK) ──→ Programs 🔗
├─ MenuId (GUID - FK) ──→ Menus 🔗
├─ LibraryId (GUID - FK) ──→ Libraries 🔗
├─ CreatedAt (datetime2) - تاريخ الإنشاء
└─ UpdatedAt (datetime2) - تاريخ التحديث

Relationships:
- Many Users → One Program (ON DELETE SET NULL)
- Many Users → One Menu (ON DELETE SET NULL)
- Many Users → One Library (ON DELETE SET NULL)
Example: admin (Admin), manager (Manager), user1 (User)
```

---

## Level 2: Child Tables (Dependent on Level 1)

These tables have foreign keys pointing to tables in Level 1.

### 15. **BuildingBasicData** - البيانات الأساسية للمبنى
```
BuildingBasicData (البيانات الأساسية للمبنى)
├─ Id (GUID - Primary Key)
├─ BuildingId (GUID - FK - UNIQUE) ──→ Buildings 🔗
├─ BuildingNumber (nvarchar) - رقم المبنى
├─ SchoolName (nvarchar) - اسم المدرسة
├─ BuildingName (nvarchar) - اسم المبنى
├─ LandArea (decimal) - مساحة الأرض
├─ BuiltArea (decimal) - مساحة البناء
├─ Floors (int) - عدد الأدوار
├─ ConstructionYear (int) - سنة البناء
├─ LastMaintenanceYear (int) - سنة آخر صيانة
├─ BuildingCondition (nvarchar) - حالة المبنى
├─ OwnershipType (nvarchar) - نوع الملكية
├─ RentalStatus (nvarchar) - حالة الإيجار
├─ CreatedAt (datetime2) - تاريخ الإنشاء
└─ UpdatedAt (datetime2) - تاريخ التحديث

Relationship: One BuildingBasicData → One Building (ONE-TO-ONE) (ON DELETE CASCADE)
Example: مبنى رئيسي (2500 م² أرض، 1800 م² مبني)
```

### 16. **BuildingAnnexes** - ملحقات المبنى
```
BuildingAnnexes (ملحقات المبنى)
├─ Id (GUID - Primary Key)
├─ BuildingId (GUID - FK) ──→ Buildings 🔗
├─ AnnexType (nvarchar) - نوع الملحق
├─ Area (decimal) - المساحة
├─ ConstructionYear (int) - سنة البناء
├─ Condition (nvarchar) - الحالة
├─ Purpose (nvarchar) - الغرض
└─ CreatedAt (datetime2) - تاريخ الإنشاء

Relationship: Many BuildingAnnexes → One Building (ON DELETE CASCADE)
Example: سور خارجي، ساحة خارجية، موقف سيارات
```

### 17. **NetworkCosts** - تكاليف الشبكات
```
NetworkCosts (تكاليف الشبكات)
├─ Id (GUID - Primary Key)
├─ BuildingId (GUID - FK) ──→ Buildings 🔗
├─ NetworkType (nvarchar) - نوع الشبكة
├─ InstallationCost (decimal) - تكلفة التركيب
├─ MaintenanceCost (decimal) - تكلفة الصيانة
├─ InstallationDate (datetime2) - تاريخ التركيب
├─ Provider (nvarchar) - المزود
├─ ContractNumber (nvarchar) - رقم العقد
├─ CreatedAt (datetime2) - تاريخ الإنشاء
└─ UpdatedAt (datetime2) - تاريخ التحديث

Relationship: Many NetworkCosts → One Building (ON DELETE CASCADE)
Example: كهرباء (150,000 ريال)، مياه (80,000 ريال)، إنترنت (50,000 ريال)
```

### 18. **LandCoordinates** - إحداثيات الأراضي
```
LandCoordinates (إحداثيات الأراضي)
├─ Id (GUID - Primary Key)
├─ LandId (GUID - FK) ──→ Lands 🔗
├─ PointNumber (int) - رقم النقطة
├─ Latitude (decimal 10,8) - خط العرض
├─ Longitude (decimal 11,8) - خط الطول
├─ Elevation (decimal) - الارتفاع
└─ CreatedAt (datetime2) - تاريخ الإنشاء

Relationship: Many LandCoordinates → One Land (ON DELETE CASCADE)
Example: Point 1 (24.71270000, 46.67520000, 612.50m)
```

### 19. **BuildingLocations** - مواقع المباني على الأراضي
```
BuildingLocations (مواقع المباني على الأراضي)
├─ Id (GUID - Primary Key)
├─ LandId (GUID - FK) ──→ Lands 🔗
├─ Code (nvarchar) - الرمز
├─ LocationName (nvarchar) - اسم الموقع
├─ Coordinates (int) - الإحداثيات
├─ Status (nvarchar) - الحالة
├─ RequiredStatus (nvarchar) - الحالة المطلوبة
└─ CreatedAt (datetime2) - تاريخ الإنشاء

Relationship: Many BuildingLocations → One Land (ON DELETE CASCADE)
Example: الموقع الشمالي الشرقي (متاح)
```

### 20. **RentalBuildingLocations** - مواقع المباني المستأجرة
```
RentalBuildingLocations (مواقع المباني المستأجرة)
├─ Id (GUID - Primary Key)
├─ BuildingId (GUID - FK - UNIQUE) ──→ RentalBuildings 🔗
├─ Governorate (nvarchar) - المحافظة
├─ City (nvarchar) - المدينة
├─ District (nvarchar) - المنطقة
├─ Neighborhood (nvarchar) - الحي
├─ Street (nvarchar) - الشارع
├─ BuildingNumber (nvarchar) - رقم المبنى
├─ PostalCode (nvarchar) - الرمز البريدي
├─ Latitude (decimal 10,8) - خط العرض
├─ Longitude (decimal 11,8) - خط الطول
├─ CreatedAt (datetime2) - تاريخ الإنشاء
└─ UpdatedAt (datetime2) - تاريخ التحديث

Relationship: One RentalBuildingLocation → One RentalBuilding (ONE-TO-ONE) (ON DELETE CASCADE)
Example: الرياض - حي الملز - شارع الملك فهد
```

### 21. **RentalDecisions** - قرارات الإيجار
```
RentalDecisions (قرارات الإيجار)
├─ Id (GUID - Primary Key)
├─ BuildingId (GUID - FK) ──→ RentalBuildings 🔗
├─ DecisionNumber (nvarchar) - رقم القرار
├─ DecisionDate (datetime2) - تاريخ القرار
├─ DecisionType (nvarchar) - نوع القرار
├─ ApprovedBy (nvarchar) - الموافق
├─ Notes (nvarchar) - ملاحظات
└─ CreatedAt (datetime2) - تاريخ الإنشاء

Relationship: Many RentalDecisions → One RentalBuilding (ON DELETE CASCADE)
Example: DEC-2024-001 (عقد إيجار جديد)
```

### 22. **DisplacementCompensations** - التعويضات
```
DisplacementCompensations (التعويضات)
├─ Id (GUID - Primary Key)
├─ DisplacementId (GUID - FK) ──→ DisplacementRecords 🔗
├─ CompensationType (nvarchar) - نوع التعويض
├─ Amount (decimal) - المبلغ
├─ PaymentDate (datetime2) - تاريخ الدفع
├─ PaymentStatus (nvarchar) - حالة الدفع
├─ PaymentMethod (nvarchar) - طريقة الدفع
├─ Notes (nvarchar) - ملاحظات
└─ CreatedAt (datetime2) - تاريخ الإنشاء

Relationship: Many DisplacementCompensations → One DisplacementRecord (ON DELETE CASCADE)
Example: تعويض مالي (500,000 ريال - مدفوع)
```

### 23. **CouncilApprovals** - موافقات المجلس
```
CouncilApprovals (موافقات المجلس)
├─ Id (GUID - Primary Key)
├─ DisplacementId (GUID - FK) ──→ DisplacementRecords 🔗
├─ CouncilName (nvarchar) - اسم المجلس
├─ ApprovalNumber (nvarchar) - رقم الموافقة
├─ ApprovalDate (datetime2) - تاريخ الموافقة
├─ ApprovalStatus (nvarchar) - حالة الموافقة
├─ DecisionDetails (nvarchar) - تفاصيل القرار
└─ CreatedAt (datetime2) - تاريخ الإنشاء

Relationship: Many CouncilApprovals → One DisplacementRecord (ON DELETE CASCADE)
Example: APP-2024-001 (مجلس إدارة التعليم - معتمد)
```

---

## Complete Hierarchy Visualization - التسلسل الهرمي الكامل

```
Level 0 (Independent Root Tables - الجداول المستقلة)
═══════════════════════════════════════════════════════
║ Programs (البرامج)
║ Menus (القوائم)
║ Libraries (المكتبات)
║ RentalStatusFlags (حالات الإيجار)
║ EducationalBuildings (المباني التعليمية) ⭐ CENTRAL HUB
═══════════════════════════════════════════════════════
                        │
                        ▼
Level 1 (Connected to Central Hub - متصل بالمركز الرئيسي)
═══════════════════════════════════════════════════════
║ StudyPeriods (الفترات الدراسية)
║    └─→ EducationalBuildings
║
║ SchoolRoads (طرق المدرسة)
║    └─→ EducationalBuildings
║
║ SchoolAnnexes (ملاحق المدرسة)
║    └─→ EducationalBuildings
║
║ SchoolSpaces (الفراغات المدرسية)
║    └─→ EducationalBuildings
║
║ Buildings (المباني)
║    └─→ EducationalBuildings
║
║ Lands (الأراضي)
║    └─→ EducationalBuildings
║
║ RentalBuildings (المباني المستأجرة)
║    ├─→ EducationalBuildings
║    └─→ RentalStatusFlags
║
║ DisplacementRecords (سجلات الإحلال)
║    └─→ EducationalBuildings
║
║ Users (المستخدمون)
║    ├─→ Programs
║    ├─→ Menus
║    └─→ Libraries
═══════════════════════════════════════════════════════
                        │
                        ▼
Level 2 (Child Tables - الجداول التابعة)
═══════════════════════════════════════════════════════
║ BuildingBasicData (البيانات الأساسية للمبنى)
║    └─→ Buildings (ONE-TO-ONE)
║
║ BuildingAnnexes (ملحقات المبنى)
║    └─→ Buildings
║
║ NetworkCosts (تكاليف الشبكات)
║    └─→ Buildings
║
║ LandCoordinates (إحداثيات الأراضي)
║    └─→ Lands
║
║ BuildingLocations (مواقع المباني على الأراضي)
║    └─→ Lands
║
║ RentalBuildingLocations (مواقع المباني المستأجرة)
║    └─→ RentalBuildings (ONE-TO-ONE)
║
║ RentalDecisions (قرارات الإيجار)
║    └─→ RentalBuildings
║
║ DisplacementCompensations (التعويضات)
║    └─→ DisplacementRecords
║
║ CouncilApprovals (موافقات المجلس)
║    └─→ DisplacementRecords
═══════════════════════════════════════════════════════
```

---

## Relationship Types - أنواع العلاقات

### One-to-One (واحد لواحد)
- **BuildingBasicData ↔ Buildings**
  - One building has exactly one basic data record
  - مبنى واحد له سجل بيانات أساسية واحد فقط

- **RentalBuildingLocation ↔ RentalBuildings**
  - One rental building has exactly one location record
  - مبنى مستأجر واحد له سجل موقع واحد فقط

### One-to-Many (واحد لمتعدد)

#### EducationalBuildings (Central Hub) → Multiple Entities
- EducationalBuildings → StudyPeriods (مبنى تعليمي واحد ← عدة فترات دراسية)
- EducationalBuildings → SchoolRoads (مبنى تعليمي واحد ← عدة طرق)
- EducationalBuildings → SchoolAnnexes (مبنى تعليمي واحد ← عدة ملاحق)
- EducationalBuildings → SchoolSpaces (مبنى تعليمي واحد ← عدة فراغات)
- EducationalBuildings → Buildings (مبنى تعليمي واحد ← عدة مباني)
- EducationalBuildings → Lands (مبنى تعليمي واحد ← عدة أراضي)
- EducationalBuildings → RentalBuildings (مبنى تعليمي واحد ← عدة مباني مستأجرة)
- EducationalBuildings → DisplacementRecords (مبنى تعليمي واحد ← عدة سجلات إحلال)

#### Buildings → Child Tables
- Buildings → BuildingAnnexes (مبنى واحد ← عدة ملحقات)
- Buildings → NetworkCosts (مبنى واحد ← عدة تكاليف شبكات)

#### Lands → Child Tables
- Lands → LandCoordinates (أرض واحدة ← عدة إحداثيات)
- Lands → BuildingLocations (أرض واحدة ← عدة مواقع مباني)

#### RentalBuildings → Child Tables
- RentalBuildings → RentalDecisions (مبنى مستأجر واحد ← عدة قرارات)

#### DisplacementRecords → Child Tables
- DisplacementRecords → DisplacementCompensations (سجل إحلال واحد ← عدة تعويضات)
- DisplacementRecords → CouncilApprovals (سجل إحلال واحد ← عدة موافقات)

#### Authentication Tables
- Programs → Users (برنامج واحد ← عدة مستخدمين)
- Menus → Users (قائمة واحدة ← عدة مستخدمين)
- Libraries → Users (مكتبة واحدة ← عدة مستخدمين)
- RentalStatusFlags → RentalBuildings (حالة واحدة ← عدة مباني مستأجرة)

---

## Delete Behavior - سلوك الحذف

### CASCADE (حذف متسلسل)
When parent is deleted, all children are automatically deleted.
عند حذف السجل الأب، يتم حذف جميع السجلات التابعة تلقائياً.

**Applied to:**
- Buildings → BuildingBasicData, BuildingAnnexes, NetworkCosts
- Lands → LandCoordinates, BuildingLocations
- RentalBuildings → RentalBuildingLocation, RentalDecisions
- DisplacementRecords → DisplacementCompensations, CouncilApprovals

### SET NULL (تعيين فارغ)
When parent is deleted, foreign key in children is set to NULL.
عند حذف السجل الأب، يتم تعيين المفتاح الخارجي في السجلات التابعة إلى NULL.

**Applied to:**
- EducationalBuildings → All connected entities
  - StudyPeriods, SchoolRoads, SchoolAnnexes, SchoolSpaces
  - Buildings, Lands, RentalBuildings, DisplacementRecords
- RentalStatusFlags → RentalBuildings
- Programs → Users
- Menus → Users
- Libraries → Users

---

## Unique Constraints - القيود الفريدة

These fields must be unique across all records:
هذه الحقول يجب أن تكون فريدة عبر جميع السجلات:

1. **EducationalBuildings.BuildingCode** - رمز المبنى التعليمي
2. **Buildings.BuildingNumber** - رقم المبنى
3. **Lands.ReferenceNumber** - الرقم المرجعي للأرض
4. **RentalBuildings.IdentificationNumber** - رقم تعريف المبنى المستأجر
5. **RentalStatusFlags.Code** - رمز حالة الإيجار
6. **DisplacementRecords.ReferenceNumber** - الرقم المرجعي لسجل الإحلال
7. **Users.Username** - اسم المستخدم
8. **BuildingBasicData.BuildingId** - معرف المبنى (علاقة واحد لواحد)
9. **RentalBuildingLocations.BuildingId** - معرف المبنى المستأجر (علاقة واحد لواحد)

---

## Indexes for Performance - الفهارس لتحسين الأداء

All foreign keys automatically have indexes created:
جميع المفاتيح الخارجية لديها فهارس تم إنشاؤها تلقائياً:

- IX_Buildings_EducationalBuildingId
- IX_Lands_EducationalBuildingId
- IX_RentalBuildings_EducationalBuildingId
- IX_RentalBuildings_StatusFlagId
- IX_DisplacementRecords_EducationalBuildingId
- IX_StudyPeriods_EducationalBuildingId
- IX_SchoolRoads_EducationalBuildingId
- IX_SchoolAnnexes_EducationalBuildingId
- IX_SchoolSpaces_EducationalBuildingId
- IX_BuildingAnnexes_BuildingId
- IX_NetworkCosts_BuildingId
- IX_LandCoordinates_LandId
- IX_BuildingLocations_LandId
- IX_RentalDecisions_BuildingId
- IX_DisplacementCompensations_DisplacementId
- IX_CouncilApprovals_DisplacementId
- IX_Users_ProgramId
- IX_Users_MenuId
- IX_Users_LibraryId

---

## Summary Statistics - إحصائيات ملخصة

- **Total Tables:** 25 جدول
- **Level 0 (Independent):** 5 tables
- **Level 1 (Connected to Hub):** 9 tables
- **Level 2 (Child Tables):** 9 tables
- **One-to-One Relationships:** 2 علاقات
- **One-to-Many Relationships:** 23 علاقات
- **Unique Constraints:** 9 قيود
- **Foreign Key Indexes:** 20+ فهرس

---

## Navigation Pattern - نمط التنقل

The typical data flow follows this pattern:
نمط تدفق البيانات النموذجي:

```
User Login (تسجيل الدخول)
    ↓
Select Educational Building (اختيار المبنى التعليمي)
    ↓
View Related Data (عرض البيانات المرتبطة):
    ├─ Study Periods (الفترات الدراسية)
    ├─ School Map Components (مكونات خريطة المدرسة)
    ├─ Buildings (المباني)
    ├─ Lands (الأراضي)
    ├─ Rental Buildings (المباني المستأجرة)
    └─ Displacement Records (سجلات الإحلال)
```

This matches the frontend navigation where users start from **المبنى التعليمي** (Educational Building) as the main entry point.

---

## Notes - ملاحظات

1. **EducationalBuildings** is the central hub connecting all major entities
   المباني التعليمية هو المركز الرئيسي الذي يربط جميع الكيانات الرئيسية

2. All tables use **GUID (uniqueidentifier)** as primary keys
   جميع الجداول تستخدم GUID كمفاتيح أساسية

3. Timestamps use **datetime2** for better precision
   الطوابع الزمنية تستخدم datetime2 لدقة أفضل

4. Geographic coordinates use proper precision:
   الإحداثيات الجغرافية تستخدم دقة مناسبة:
   - Latitude: decimal(10,8) - خط العرض
   - Longitude: decimal(11,8) - خط الطول

5. Monetary values use **decimal(18,2)**
   القيم المالية تستخدم decimal(18,2)

6. All text fields support **Arabic (nvarchar)**
   جميع حقول النص تدعم اللغة العربية
