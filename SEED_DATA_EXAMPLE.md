# مثال بيانات الزرع (Seed Data Example)

## البيانات المطلوبة للأرض

بناءً على المتطلبات، إليك مثال كامل لكيفية يجب أن تكون بيانات الزرع في قاعدة البيانات:

### المثال المطلوب:

```
موقف الاستخدام: جاري الانشاء
موقف الاعتماد: ارض قضاء
المقر: الرئيسي للهيئة
المركز/القسم: قسم عين شمس
المرحلة: ثانوي عام
الاعتماد: الارض معتمدة بالموافقة
التسكين: الارض مسكنة
```

---

## خريطة الحقول (Field Mapping)

| الحقل العربي | الحقل الإنجليزي | النوع | المثال |
|---|---|---|---|
| **موقف الاستخدام** | `UsageStatus` | VARCHAR(50) | `جاري الانشاء` |
| **موقف الاعتماد** | `ApprovalStatus` | VARCHAR(50) | `ارض قضاء` |
| **المقر** | `Headquarters` | VARCHAR(100) | `الرئيسي للهيئة` |
| **المركز/القسم** | `CenterDepartment` | VARCHAR(100) | `قسم عين شمس` |
| **المرحلة** | `Phase` | VARCHAR(50) | `ثانوي عام` |
| **الاعتماد** | `Approval` | VARCHAR(100) | `الارض معتمدة بالموافقة` |
| **التسكين** | `Housing` | VARCHAR(100) | `الارض مسكنة` |

---

## مثال SQL للبيانات الجديدة

```sql
-- إدراج أرض جديدة مع البيانات المطلوبة
INSERT INTO [Lands] 
(
    [Id], 
    [ReferenceNumber], 
    [UsageStatus], 
    [Headquarters], 
    [ApprovalStatus], 
    [IdentificationNumber], 
    [CenterDepartment], 
    [TotalArea], 
    [Phase], 
    [Approval], 
    [Housing],
    [Village], 
    [CurrentOwner], 
    [OriginalOwner], 
    [LandCode], 
    [CreatedAt], 
    [UpdatedAt]
)
VALUES 
(
    NEWID(),                                    -- Id
    N'301001',                                  -- ReferenceNumber: رقم مرجعي فريد
    N'جاري الانشاء',                          -- UsageStatus
    N'الرئيسي للهيئة',                         -- Headquarters
    N'ارض قضاء',                               -- ApprovalStatus
    N'12345678',                                -- IdentificationNumber
    N'قسم عين شمس',                            -- CenterDepartment
    5000.00,                                    -- TotalArea: المساحة الإجمالية بالمتر المربع
    N'ثانوي عام',                              -- Phase
    N'الارض معتمدة بالموافقة',                -- Approval
    N'الارض مسكنة',                            -- Housing
    N'حي عين شمس',                             -- Village
    N'وزارة التعليم والتعليم الفني',         -- CurrentOwner
    N'وزارة التعليم والتعليم الفني',         -- OriginalOwner
    N'401001',                                  -- LandCode
    GETUTCDATE(),                               -- CreatedAt
    GETUTCDATE()                                -- UpdatedAt
);
```

---

## مثال SQL شامل مع البيانات المرتبطة

```sql
-- 1. متغيرات للمعرفات
DECLARE @LandId UNIQUEIDENTIFIER = NEWID();
DECLARE @EduBuildingId UNIQUEIDENTIFIER = NEWID();
DECLARE @BuildingId UNIQUEIDENTIFIER = NEWID();

-- 2. إدراج مبنى تعليمي جديد
INSERT INTO [EducationalBuildings] 
(
    [Id], 
    [BuildingCode], 
    [BuildingName], 
    [EducationType], 
    [BuildingStatus], 
    [TotalArea], 
    [NumberOfClassrooms], 
    [ConstructionYear], 
    [CreatedAt], 
    [UpdatedAt]
)
VALUES 
(
    @EduBuildingId,
    N'501001',
    N'مدرسة عين شمس الثانوية العامة',
    N'ثانوي عام',
    N'نشط',
    5000.00,
    30,
    2024,
    GETUTCDATE(),
    GETUTCDATE()
);

-- 3. إدراج الأرض مع جميع البيانات المطلوبة
INSERT INTO [Lands] 
(
    [Id], 
    [ReferenceNumber], 
    [UsageStatus], 
    [Headquarters], 
    [ApprovalStatus], 
    [IdentificationNumber], 
    [CenterDepartment], 
    [TotalArea], 
    [Phase], 
    [Approval], 
    [Housing],
    [Village], 
    [CurrentOwner], 
    [OriginalOwner], 
    [LandCode],
    [EducationalBuildingId],
    [CreatedAt], 
    [UpdatedAt]
)
VALUES 
(
    @LandId,
    N'301001',
    N'جاري الانشاء',                          -- موقف الاستخدام
    N'الرئيسي للهيئة',                         -- المقر
    N'ارض قضاء',                               -- موقف الاعتماد
    N'12345678',
    N'قسم عين شمس',                            -- المركز/القسم
    5000.00,
    N'ثانوي عام',                              -- المرحلة
    N'الارض معتمدة بالموافقة',                -- الاعتماد
    N'الارض مسكنة',                            -- التسكين
    N'حي عين شمس',
    N'وزارة التعليم والتعليم الفني',
    N'وزارة التعليم والتعليم الفني',
    N'401001',
    @EduBuildingId,
    GETUTCDATE(),
    GETUTCDATE()
);

-- 4. إدراج إحداثيات الأرض
INSERT INTO [LandCoordinates] 
(
    [Id], 
    [LandId], 
    [PointNumber], 
    [Latitude], 
    [Longitude], 
    [Elevation], 
    [CreatedAt]
)
VALUES 
(
    NEWID(),
    @LandId,
    1,
    30.1500,
    31.5000,
    50.00,
    GETUTCDATE()
),
(
    NEWID(),
    @LandId,
    2,
    30.1510,
    31.5010,
    50.50,
    GETUTCDATE()
);

-- 5. إدراج حدود وجوانب الأرض
INSERT INTO [BuildingLocations] 
(
    [Id], 
    [LandId], 
    [Code], 
    [LocationName], 
    [Coordinates], 
    [Status], 
    [RequiredStatus], 
    [NeighborDescription], 
    [CreatedAt]
)
VALUES 
(
    NEWID(),
    @LandId,
    N'01',
    N'شمال',
    30,
    N'يوجد',
    N'مطلوب',
    N'شارع طريق السويس',
    GETUTCDATE()
),
(
    NEWID(),
    @LandId,
    N'02',
    N'جنوب',
    30,
    N'يوجد',
    N'مطلوب',
    N'شارع الأمام الشافعي',
    GETUTCDATE()
),
(
    NEWID(),
    @LandId,
    N'03',
    N'شرق',
    25,
    N'يوجد',
    N'مطلوب',
    N'شارع عين شمس',
    GETUTCDATE()
),
(
    NEWID(),
    @LandId,
    N'04',
    N'غرب',
    25,
    N'يوجد',
    N'مطلوب',
    N'حي سكني',
    GETUTCDATE()
);

-- 6. إدراج المبنى العام
INSERT INTO [Buildings] 
(
    [Id], 
    [BuildingNumber], 
    [SchoolName], 
    [UsageStatus], 
    [Affiliation], 
    [BuildingOwnership], 
    [Governorate], 
    [RegionalCenter], 
    [EducationalAdministration], 
    [District], 
    [Neighborhood], 
    [Stage], 
    [EducationType],
    [EducationalBuildingId],
    [CreatedAt], 
    [UpdatedAt]
)
VALUES 
(
    @BuildingId,
    N'601001',
    N'مدرسة عين شمس الثانوية العامة',
    N'نشط',
    N'وزارة التعليم والتعليم الفني',
    N'حكومي',
    N'محافظة القاهرة',
    N'مركز القاهرة',
    N'إدارة تعليم القاهرة',
    N'منطقة عين شمس',
    N'حي عين شمس',
    N'ثانوي عام',
    N'تعليم عام',
    @EduBuildingId,
    GETUTCDATE(),
    GETUTCDATE()
);

-- 7. إدراج البيانات الأساسية للمبنى
INSERT INTO [BuildingBasicData] 
(
    [Id], 
    [BuildingId], 
    [BuildingNumber], 
    [SchoolName], 
    [BuildingName], 
    [LandArea], 
    [BuiltArea], 
    [Floors], 
    [ConstructionYear], 
    [BuildingCondition], 
    [OwnershipType], 
    [RentalStatus], 
    [CreatedAt], 
    [UpdatedAt]
)
VALUES 
(
    NEWID(),
    @BuildingId,
    N'601001',
    N'مدرسة عين شمس الثانوية العامة',
    N'المبنى الرئيسي',
    5000.00,
    4000.00,
    3,
    2024,
    N'جديد',
    N'ملك',
    N'غير مؤجر',
    GETUTCDATE(),
    GETUTCDATE()
);
```

---

## الحقول الإضافية المهمة

### حقول إضافية قد تكون مفيدة:

```sql
-- حقول إضافية في جدول Lands
[Model]                          -- النموذج (نموذج A1، نموذج B2، إلخ)
[Documents]                      -- الوثائق (صك ملكية، خرائط معتمدة)
[Plan]                           -- المخطط (مخطط معتمد، مخطط قيد المراجعة)
[BranchNotification]             -- إبلاغ الفرع (تم إبلاغ الفرع، جاري الإبلاغ)
[RealEstateStatus]               -- حالة العقار (مسجل، قيد التسجيل)
[BuildingBoundaries]             -- حدود البناء (موجود، غير موجود)
[NetworkData]                    -- بيانات الشبكات (موجود، غير موجود)
[LandUseDatabase]                -- قاعدة بيانات استخدام الأرض
[LandInspectionDatabase]         -- قاعدة بيانات فحص الأرض
```

---

## ملاحظات مهمة

1. **الترميز**: جميع النصوص العربية يجب أن تكون بصيغة Unicode (NVARCHAR)
2. **المعرفات**: استخدم `NEWID()` لإنشاء معرفات فريدة
3. **التواريخ**: استخدم `GETUTCDATE()` للحصول على الوقت الحالي بصيغة UTC
4. **الأرقام**: استخدم `DECIMAL(18,2)` للمساحات والأسعار
5. **الفهارس الفريدة**: `ReferenceNumber` و `BuildingNumber` و `BuildingCode` يجب أن تكون فريدة

---

## تنسيق البيانات الموصى به

### عند إدراج بيانات جديدة، تأكد من:

1. ✅ جميع الحقول المطلوبة (Required) معبأة
2. ✅ النصوص العربية بصيغة Unicode
3. ✅ المعرفات الفريدة
4. ✅ التواريخ بصيغة صحيحة
5. ✅ الأرقام العشرية بصيغة صحيحة
6. ✅ الارتباطات بين الجداول (Foreign Keys) صحيحة
