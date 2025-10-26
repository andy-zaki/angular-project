# Data Models and Arabic Labels Reference

## Overview

This document provides a complete reference of all data models (TypeScript interfaces) used in the application along with their corresponding Arabic labels as they appear in the UI. This application is designed for the Egyptian education system.

---

## Table of Contents

1. [Land Models](#land-models)
2. [Building Models](#building-models)
3. [Rental Models](#rental-models)
4. [School Map Models](#school-map-models)
5. [Displacement Models](#displacement-models)
6. [Common Status Values](#common-status-values)
7. [Location Data](#location-data)

---

## Land Models

### LandData Interface

**File:** `src/app/models/land.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID / Unique identifier |
| `referenceNumber` | string | الرقم المرجعي | Reference number for land parcel |
| `usageStatus` | string | حالة الاستخدام / موقف الاستخدام | Current usage status |
| `headquarters` | string | المقر | Headquarters/main location |
| `approvalStatus` | string | حالة الموافقة | Approval status |
| `identificationNumber` | string | الرقم التعريفي | Identification number |
| `centerDepartment` | string | المركز/القسم | Center/Department |
| `totalArea` | number | المساحة الكلية | Total area in square meters |
| `phase` | string | المرحلة | Project phase |
| `approval` | string | الاعتماد | Approval decision |
| `housing` | string | التسكين | Housing status |
| `committeePricing` | string | تسعير اللجنة | Committee pricing (in EGP) |
| `purchasePrice` | string | سعر الشراء | Purchase price (in EGP) |
| `saleNegotiations` | string | مفاوضات البيع | Sale negotiations status |
| `landCode` | string | كود الأرض | Land code |
| `village` | string | القرية | Village name |
| `currentOwner` | string | المالك الحالي | Current owner |
| `originalOwner` | string | المالك الأصلي | Original owner |
| `model` | string | النموذج | Model type |
| `documents` | string | الوثائق / المستندات | Documents status |
| `plan` | string | الخطة | Plan status |
| `branchNotification` | string | إخطار الفرع | Branch notification status |
| `realEstateStatus` | string | موقف العقارية | Real estate status |
| `buildingBoundaries` | string | حدود قطعة الأرض | Building/Land boundaries availability |
| `networkData` | string | بيانات الميزانية الشبكية | Network budget data availability |
| `networkObservations` | string | ملاحظات الميزانية الشبكية | Network budget observations |
| `landAreaFromTotal` | string | مساحة الأرض من الإجمالي | Land area from total |
| `landUseDatabase` | string | قاعدة بيانات استخدام الأراضي | Land use database status |
| `landInspectionDatabase` | string | ملاحظات معاينة قطعة الارض | Land inspection notes |
| `landConstructionObstacles` | string | معوقات البناء بالأرض | Construction obstacles |
| `landCreationObstacles` | string | عوائق إنشاء قطعة الارض | Land creation obstacles |
| `landConstructionData` | string | مستندات قطعة الارض | Land construction documents |
| `landReceiptDatabase` | string | موقف استلام قطعة الارض | Land receipt status |
| `paidAmountsDatabase` | string | المبالغ المدفوعة للأرض | Paid amounts for land |
| `decisionData` | string | بيانات قرار التخصيص | Allocation decision data |
| `landCommittees` | string | لجان قطعة الارض | Land committees |
| `landFacilities` | string | مرافق قطعة الارض | Land facilities |
| `landCoordinatesData` | string | احداثيات قطعة الارض | Land coordinates data |
| `educationalStudies` | string | الدراسات التربوية | Educational studies |
| `landReviewCommittees` | string | لجان مراجعة قطعة الارض | Land review committees |

---

### BuildingLocationData Interface

**File:** `src/app/models/land.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `code` | string | كود الحد | Border/Boundary code |
| `locationName` | string | اسم الحد / وصف الجار | Border name / Neighbor description |
| `coordinates` | number | طول الحد | Border length |
| `status` | string | جار ملاصق | Adjacent neighbor status |
| `requiredStatus` | string | الاسوار | Fence/Wall status |

**Additional Fields in UI:**
- منسوب الجار (Neighbor's level/elevation)

---

### LandCoordinates Interface

**File:** `src/app/models/land.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `landId` | string | معرف الأرض | Land ID reference |
| `pointNumber` | number | رقم النقطة | Point number |
| `latitude` | number | خط العرض | Latitude |
| `longitude` | number | خط الطول | Longitude |
| `elevation` | number | الارتفاع | Elevation (optional) |

---

## Building Models

### BuildingData Interface

**File:** `src/app/models/building.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `buildingNumber` | string | رقم المبنى / كود المبني | Building number/code |
| `schoolName` | string | اسم المدرسة | School name |
| `usageStatus` | string | موقف الاستخدام | Usage status |
| `affiliation` | string | التبعية | Affiliation |
| `buildingOwnership` | string | ملكية المبنى | Building ownership type |
| `governorate` | string | المحافظة | Governorate |
| `regionalCenter` | string | المركز الإقليمي / مركز | Regional center |
| `educationalAdministration` | string | الإدارة التعليمية | Educational administration |
| `district` | string | القسم/المركز | District/Center |
| `neighborhood` | string | الحي/القرية | Neighborhood/Village |
| `stage` | string | المرحلة / المرحلة التعليمية | Educational stage |
| `educationType` | string | نوع التعليم / نوعية التعليم | Type of education |

---

### BuildingBasicData Interface

**File:** `src/app/models/building.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `buildingNumber` | string | رقم المبنى / كود المبني | Building number/code |
| `schoolName` | string | اسم المدرسة | School name |
| `buildingName` | string | اسم المبنى | Building name |
| `landArea` | number | مساحة الأرض | Land area (m²) |
| `builtArea` | number | المساحة المبنية | Built area (m²) |
| `floors` | number | عدد الطوابق | Number of floors |
| `constructionYear` | number | سنة البناء | Construction year |
| `lastMaintenanceYear` | number | سنة آخر صيانة | Last maintenance year |
| `buildingCondition` | string | حالة المبنى | Building condition |
| `ownershipType` | string | نوع الملكية / ملكية الأرض | Ownership type / Land ownership |
| `rentalStatus` | string | حالة الإيجار | Rental status |

---

### BuildingAnnexData Interface

**File:** `src/app/models/building.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID / Unique identifier |
| `buildingId` | string | معرف المبنى | Building ID |
| `annexType` | string | نوع الملحق | Annex type |
| `area` | number | المساحة | Area (m²) |
| `constructionYear` | number | سنة البناء | Construction year |
| `condition` | string | الحالة | Condition |
| `purpose` | string | الغرض | Purpose |

**Common Values:**

**Annex Type (نوع الملحق):**
- قاعة رياضية (Sports Hall)
- مختبر (Laboratory)
- مكتبة (Library)
- مسرح (Theater)
- كافتيريا (Cafeteria)

**Purpose (الغرض):**
- تعليمي (Educational)
- ترفيهي (Recreational)
- خدمي (Service)
- إداري (Administrative)

---

### NetworkCostsData Interface

**File:** `src/app/models/building.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID / Unique identifier |
| `buildingId` | string | معرف المبنى | Building ID |
| `networkType` | string | نوع الشبكة | Network type |
| `installationCost` | number | تكلفة التركيب | Installation cost |
| `maintenanceCost` | number | تكلفة الصيانة | Maintenance cost |
| `installationDate` | string | تاريخ التركيب | Installation date |
| `provider` | string | المزود | Service provider |
| `contractNumber` | string | رقم العقد | Contract number |


---

## Rental Models

### RentalBuildingInfo Interface

**File:** `src/app/models/rental.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID / Unique identifier |
| `identificationNumber` | string | الرقم التعريفي | Identification number |
| `name` | string | اسم المبنى / اسم المدرسة | Building/School name |
| `status` | string | الحالة / الموقف المسجل | Status / Registered status |
| `substatus` | string | الحالة الفرعية / الموقف الفرعي | Sub-status |
| `tenant` | string | المستأجر | Tenant |
| `location` | string | الموقع | Location |
| `monthlyRent` | number | الإيجار الشهري | Monthly rent (in EGP) |
| `contractStartDate` | string | تاريخ بداية العقد | Contract start date |
| `contractEndDate` | string | تاريخ نهاية العقد | Contract end date |

---

### RentalBuildingDetails Interface

**File:** `src/app/models/rental.model.ts`

Extends `RentalBuildingInfo` with additional properties:

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `buildingType` | string | نوع المبنى | Building type |
| `totalArea` | number | المساحة الكلية | Total area (m²) |
| `usableArea` | number | المساحة القابلة للاستخدام | Usable area (m²) |
| `numberOfRooms` | number | عدد الغرف | Number of rooms |
| `numberOfFloors` | number | عدد الطوابق | Number of floors |
| `yearBuilt` | number | سنة البناء | Year built |
| `lastInspectionDate` | string | تاريخ آخر فحص | Last inspection date |
| `inspectionStatus` | string | حالة الفحص | Inspection status |
| `maintenanceRequired` | boolean | يحتاج صيانة | Maintenance required |

---

### RentalBuildingLocation Interface

**File:** `src/app/models/rental.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `buildingId` | string | معرف المبنى | Building ID |
| `governorate` | string | المحافظة | Governorate |
| `city` | string | المدينة | City |
| `district` | string | القسم/المركز | District/Center |
| `neighborhood` | string | الحي/القرية | Neighborhood/Village |
| `street` | string | الشارع | Street |
| `buildingNumber` | string | رقم المبنى | Building number |
| `postalCode` | string | الرمز البريدي | Postal code |
| `latitude` | number | خط العرض | Latitude |
| `longitude` | number | خط الطول | Longitude |

---

### RentalStatusFlag Interface

**File:** `src/app/models/rental.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `code` | string | الرمز | Status code |
| `label` | string | التسمية | Label (Arabic) |
| `category` | string | الفئة | Category |
| `isActive` | boolean | نشط | Is active |

---

### RentalDecision Interface

**File:** `src/app/models/rental.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `buildingId` | string | معرف المبنى | Building ID |
| `decisionNumber` | string | رقم القرار | Decision number |
| `decisionDate` | string | تاريخ القرار | Decision date |
| `decisionType` | string | نوع القرار | Decision type |
| `approvedBy` | string | معتمد من قبل | Approved by |
| `notes` | string | ملاحظات | Notes |

---

### RentalReportCategory Interface

**File:** `src/app/models/rental.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `code` | string | الرمز | Category code |
| `label` | string | التسمية | Category label (Arabic) |
| `categoryType` | string | نوع الفئة | Category type (in-progress, completed, finished) |
| `totalCount` | number | العدد الكلي | Total count |
| `closedCount` | number | مغلق | Closed count |
| `workingCount` | number | تعمل | Working count |

**Report Category Types:**
- `in-progress`: قيد الدراسة (Under Study)
- `completed`: تم الدراسة (Study Completed)
- `finished`: تم الانتهاء (Finished)

**In-Progress Categories (قيد الدراسة):**
- دراسة الاحتياج (Need Study)
- صلاحية الموقع (Location Validity)
- استكمال بيانات (Data Completion)
- اعتمادات اللجنة (Committee Approvals)
- تدرس باللجنة (Under Committee Study)
- توقيع م. الهيئة (Authority Signature)

**Completed Categories (تم الدراسة):**
- اتخاذ ج. استيلاء (Seizure Decision)
- اخراج وشأن الادارة (Eviction/Administration Matter)
- رد للمالك (كلى) (Return to Owner - Total)
- رد للمالك (جزء) (Return to Owner - Partial)
- رد للمالك (شرط) (Return to Owner - Conditional)
- اتخاذ نزع ملكية (Expropriation Action)
- الايقاف والتصفية (Stop and Liquidation)
- استمرار الايجار (Continue Rental)
- قبول التبرع (Accept Donation)
- لجنة البت (Decision Committee)
- اتخاذ ج. شراء بعدب (Purchase Decision After)
- تفاوض على شراء (Purchase Negotiation)

**Finished Categories (تم الانتهاء):**
- تم التعويض بحكم (Compensation by Ruling)
- رد قبل معرفة الرقم (Return Before ID Known)
- رد للمالك (Return to Owner)
- شراء (Purchase)
- نزع الملكية (Expropriation)
- تم التبرع (Donated)
- الاخراج وشأن الادارة (Eviction/Administration Matter)
- الايقاف وتصفية مبني (Stop and Liquidate Building)

---

## School Map Models

### StudyPeriodData Interface

**File:** `src/app/models/school-map.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل / # | Serial ID / Number |
| `buildingCode` | string | كود المبنى | Building code |
| `period` | string | الفترة | Study period |
| `schoolName` | string | اسم المدرسة | School name |
| `type` | string | النوع | School type |
| `boysCount` | number | عدد التلاميذ بنين | Boys count |
| `girlsCount` | number | عدد التلاميذ بنات | Girls count |
| `periodStage` | string | مرحلة الفترة | Period stage |
| `startTime` | string | وقت البداية | Start time |
| `endTime` | string | وقت النهاية | End time |

---

### SchoolRoadData Interface

**File:** `src/app/models/school-map.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `buildingId` | string | معرف المبنى | Building ID |
| `roadName` | string | اسم الطريق | Road name |
| `roadType` | string | نوع الطريق | Road type |
| `roadWidth` | number | عرض الطريق | Road width (meters) |
| `roadCondition` | string | حالة الطريق | Road condition |
| `isPaved` | boolean | مرصوف | Is paved |
| `direction` | string | الاتجاه | Direction |

---

### SchoolAnnexData Interface

**File:** `src/app/models/school-map.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `buildingId` | string | معرف المبنى | Building ID |
| `annexName` | string | اسم الملحق | Annex name |
| `annexType` | string | نوع الملحق | Annex type |
| `area` | number | المساحة | Area (m²) |
| `capacity` | number | السعة | Capacity |
| `constructionDate` | string | تاريخ البناء | Construction date |
| `purpose` | string | الغرض | Purpose |
| `condition` | string | الحالة | Condition |

---

### SchoolSpaceData Interface

**File:** `src/app/models/school-map.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `buildingId` | string | معرف المبنى | Building ID |
| `spaceType` | string | نوع الفراغ | Space type |
| `spaceName` | string | اسم الفراغ | Space name |
| `floor` | number | الطابق | Floor number |
| `area` | number | المساحة | Area (m²) |
| `capacity` | number | السعة | Capacity |
| `currentUse` | string | الاستخدام الحالي | Current use |
| `condition` | string | الحالة | Condition |
| `hasAirConditioning` | boolean | يوجد تكييف | Has AC |
| `hasProjector` | boolean | يوجد بروجكتر | Has projector |

---

### EducationalBuildingData Interface

**File:** `src/app/models/school-map.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `buildingNumber` | string | رقم المبنى | Building number |
| `schoolName` | string | اسم المدرسة | School name |
| `educationalLevel` | string | المستوى التعليمي | Educational level |
| `gender` | string | نوع التلاميذ / الجنس | Student type / Gender |
| `totalStudents` | number | إجمالي الطلاب / التلاميذ | Total students |
| `totalTeachers` | number | إجمالي المعلمين | Total teachers |
| `totalClassrooms` | number | إجمالي الفصول | Total classrooms |
| `hasLibrary` | boolean | يوجد مكتبة | Has library |
| `hasLab` | boolean | يوجد مختبر | Has laboratory |
| `hasSportsField` | boolean | يوجد ملعب | Has sports field |
| `hasCafeteria` | boolean | يوجد كافتيريا | Has cafeteria |

---

## Displacement Models

### DisplacementProcessData Interface

**File:** `src/app/models/displacement.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `schoolNumber` | string | رقم المدرسة | School number |
| `schoolName` | string | اسم المدرسة | School name |
| `branchCode` | string | كود الفرع | Branch code |
| `rentedBuildingCode` | string | كود المبنى المؤجر | Rented building code |
| `cabinetDecisionNumber` | string | رقم القرار / رقم قرار مجلس الوزراء | Cabinet decision number |
| `cabinetDecisionDate` | string | تاريخ القرار / تاريخ قرار مجلس الوزراء | Cabinet decision date |
| `publicationCount` | number | عدد النشر / عدد النشرات | Publication count |
| `publicationDate` | string | تاريخ النشر | Publication date |
| `educationProject` | string | مشروع تربية وتعليم | Education project |
| `ownersCount` | number | عدد الملاك | Owners count |
| `pricePerMeter` | number | سعر المتر | Price per meter (EGP) |
| `dateFrom` | string | تاريخ من | Date from |
| `dateTo` | string | تاريخ إلى | Date to |
| `formsCount` | number | عدد الاستمارات | Forms count |
| `status` | string | الحالة | Status |
| `createdDate` | string | تاريخ الإنشاء | Created date |
| `lastModifiedDate` | string | تاريخ آخر تعديل | Last modified date |

**UI Section Titles:**
- البيانات الأساسية (Basic Information)
- قرار مجلس الوزراء (Cabinet Decision)
- النشر في جريدة رسمية (Official Gazette Publication)
- كشوف العرض (Display Lists)
- استمارات البيع (Sale Forms)

---

### FinalCompensationEntry Interface

**File:** `src/app/models/displacement.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `displacementId` | string | معرف النزع | Displacement ID |
| `checkNumber` | string | رقم الشيك | Check number |
| `value` | number | القيمة | Value (in EGP) |
| `date` | string | التاريخ | Date |
| `recipientName` | string | اسم المستلم | Recipient name |
| `status` | string | الحالة | Status |

---

### DisplayListEntry Interface

**File:** `src/app/models/displacement.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `schoolNumber` | string | رقم المدرسة | School number |
| `schoolName` | string | اسم المدرسة | School name |
| `displacementDecisionNumber` | string | رقم قرار النزع | Displacement decision number |
| `serialId` | string | الرقم التسلسلي | Serial ID |
| `ownerName` | string | اسم المالك | Owner name |
| `propertyArea` | number | مساحة العقار | Property area (m²) |
| `compensationAmount` | number | مبلغ التعويض | Compensation amount (in EGP) |
| `displayDate` | string | تاريخ العرض | Display date |

---

### ConformityCertificate Interface

**File:** `src/app/models/displacement.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `certificateNumber` | string | رقم الشهادة | Certificate number |
| `issueDate` | string | تاريخ الإصدار | Issue date |
| `propertyId` | string | معرف العقار | Property ID |
| `ownerName` | string | اسم المالك | Owner name |
| `propertyDescription` | string | وصف العقار | Property description |
| `conformityStatus` | string | حالة المطابقة | Conformity status |
| `verifiedBy` | string | تم التحقق بواسطة | Verified by |

---

### RealEstateUnit Interface

**File:** `src/app/models/displacement.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `unitNumber` | string | رقم الوحدة | Unit number |
| `registrationNumber` | string | رقم التسجيل | Registration number |
| `area` | number | المساحة | Area (m²) |
| `location` | string | الموقع | Location |
| `ownerName` | string | اسم المالك | Owner name |
| `ownershipType` | string | نوع الملكية | Ownership type |
| `evaluationAmount` | number | مبلغ التقييم | Evaluation amount (in EGP) |
| `evaluationDate` | string | تاريخ التقييم | Evaluation date |

---

### SaleForm Interface

**File:** `src/app/models/displacement.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `formNumber` | string | رقم الاستمارة | Form number |
| `submissionDate` | string | تاريخ التقديم | Submission date |
| `propertyId` | string | معرف العقار | Property ID |
| `sellerName` | string | اسم البائع | Seller name |
| `buyerName` | string | اسم المشتري | Buyer name |
| `saleAmount` | number | مبلغ البيع | Sale amount (in EGP) |
| `approvalStatus` | string | حالة الموافقة | Approval status |

---

### MinisterDecision Interface

**File:** `src/app/models/displacement.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `decisionNumber` | string | رقم القرار | Decision number |
| `decisionDate` | string | تاريخ القرار | Decision date |
| `decisionType` | string | نوع القرار | Decision type |
| `description` | string | الوصف | Description |
| `approvedBy` | string | معتمد من قبل | Approved by |
| `implementationStatus` | string | حالة التنفيذ | Implementation status |

---

### CouncilApprovalData Interface

**File:** `src/app/models/displacement.model.ts`

| Property | Type | Arabic Label | Description |
|----------|------|--------------|-------------|
| `id` | string | المسلسل | Serial ID |
| `displacementId` | string | معرف النزع | Displacement ID |
| `councilName` | string | اسم المجلس | Council name |
| `approvalNumber` | string | رقم الموافقة | Approval number |
| `approvalDate` | string | تاريخ الموافقة | Approval date |
| `sessionNumber` | string | رقم الجلسة | Session number |
| `attendees` | string[] | الحضور | Attendees |
| `decision` | string | القرار | Decision |
| `notes` | string | ملاحظات | Notes |

---

## Common Status Values

### General Status (الحالة العامة)

| Arabic | English | Usage Context |
|--------|---------|---------------|
| معتمد | Approved | Documents, decisions, approvals |
| تحت المراجعة / قيد المراجعة | Under Review | All review processes |
| موافق | Approved | Approvals |
| قيد الدراسة | Under Study | Under consideration |
| نشط | Active | Active states |
| مؤجرة | Rented | Rental buildings |
| مؤجرة - نشطة | Rented - Active | Active rental buildings |

### Condition Status (حالة الوضع)

| Arabic | English | Usage Context |
|--------|---------|---------------|
| ممتاز | Excellent | Buildings, roads, facilities |
| جيد | Good | Condition assessments |
| مقبول | Acceptable | Minimum acceptable condition |
| يحتاج صيانة | Needs Maintenance | Maintenance requirements |
| تعمل بكفاءة | Operating Efficiently | Performance status |

### Availability Status (حالة التوفر)

| Arabic | English | Usage Context |
|--------|---------|---------------|
| موجود | Available/Exists | Data, resources, physical presence |
| غير موجود | Not Available/Does Not Exist | Missing data or absence |

### Document Status (حالة المستندات)

| Arabic | English | Usage Context |
|--------|---------|---------------|
| مكتملة | Complete | Complete documents |
| ناقصة | Incomplete | Missing documents |

---

## Location Data

### Egyptian Governorates (المحافظات المصرية)

**Major Governorates:**
- القاهرة (Cairo)
- محافظة القاهرة (Cairo Governorate)
- الجيزة (Giza)
- الإسكندرية (Alexandria)

**Administrative Levels:**
- المحافظة (Governorate)
- المركز الإقليمي / مركز (Regional Center / Center)
- الإدارة التعليمية (Educational Administration)
  - Example: إدارة المنيل التعليمية (Al-Manil Educational Administration)
- القسم/المركز (District/Center)
  - Example: مركز القاهرة (Cairo Center)
- الحي/القرية (Neighborhood/Village)
- تابع القرية (Village Affiliate)

---

## School Names (أسماء المدارس)

**Common School Name Pattern:**
- مدرسة [Name] [Stage]
- Example: مدرسة الرازي الابتدائية (Al-Razi Elementary School)

---

## Government Entities (الجهات الحكومية)

**Ministries (الوزارات):**
- وزارة التربية والتعليم (Ministry of Education)

**Decision Makers (صناع القرار):**
- مجلس الوزراء (Cabinet/Council of Ministers)
- المجلس البلدي (Municipal Council)
- المجلس المحلي (Local Council)

---

## Date & Time Formats

**Date Format:** YYYY-MM-DD (e.g., 2024-10-25)
**Time Format:** HH:MM (e.g., 07:30, 13:00)

**Date Labels:**
- تاريخ (Date)
- التاريخ (The Date)
- تاريخ من (Date From)
- تاريخ إلى (Date To)
- تاريخ الإنشاء (Created Date)
- تاريخ آخر تعديل (Last Modified Date)
- تاريخ البناء (Construction Date)
- تاريخ القرار (Decision Date)
- تاريخ النشر (Publication Date)
- تاريخ العرض (Display Date)

---

## Currency

**Currency:** جنيه مصري (Egyptian Pound - EGP / ج.م)

**Amount Labels:**
- القيمة (Value)
- المبلغ (Amount)
- السعر (Price)
- التكلفة (Cost)
- الإيجار (Rent)
- التعويض (Compensation)
- سعر المتر (Price per meter)
- الإيجار الشهري (Monthly rent)
- مبلغ التعويض (Compensation amount)

---

## Measurements

**Area:** متر مربع (Square Meters - m²)
**Width/Length:** متر (Meters - m)
**Coordinates:** درجة (Degrees)

**Measurement Labels:**
- المساحة (Area)
- المساحة الكلية (Total Area)
- الطول (Length)
- العرض (Width)
- الارتفاع (Height/Elevation)
- طول الحد (Border length)

---

## Boolean Fields (نعم/لا)

| Property | Arabic Yes | Arabic No |
|----------|------------|-----------|
| `isPaved` | مرصوف | غير مرصوف |
| `hasAirConditioning` | يوجد تكييف | لا يوجد تكييف |
| `hasProjector` | يوجد بروجكتر | لا يوجد بروجكتر |
| `hasLibrary` | يوجد مكتبة | لا يوجد مكتبة |
| `hasLab` | يوجد مختبر | لا يوجد مختبر |
| `hasSportsField` | يوجد ملعب | لا يوجد ملعب |
| `hasCafeteria` | يوجد كافتيريا | لا يوجد كافتيريا |
| `maintenanceRequired` | يحتاج صيانة | لا يحتاج صيانة |
| `isActive` | نشط | غير نشط |

---

## Usage Notes

1. **RTL Support:** All Arabic labels are displayed right-to-left in the UI
2. **Country Context:** This application is for the Egyptian education system
3. **ID Field:** The `id` property consistently uses "المسلسل" (Serial ID) throughout the application
4. **Currency:** All monetary values are in Egyptian Pounds (EGP / ج.م)
5. **Formal Language:** All labels use formal Arabic (فصحى) suitable for official documents
6. **Consistency:** Property names may have variations in Arabic labels based on specific context

---

## Model File Locations

```
src/app/models/
├── index.ts                    # Central export file
├── land.model.ts              # LandData, BuildingLocationData, LandCoordinates
├── building.model.ts          # BuildingData, BuildingBasicData, BuildingAnnexData, NetworkCostsData
├── rental.model.ts            # RentalBuildingInfo, RentalBuildingDetails, RentalBuildingLocation, RentalStatusFlag, RentalDecision, RentalReportCategory
├── school-map.model.ts        # StudyPeriodData, SchoolRoadData, SchoolAnnexData, SchoolSpaceData, EducationalBuildingData
└── displacement.model.ts      # FinalCompensationEntry, DisplayListEntry, ConformityCertificate, RealEstateUnit, SaleForm, MinisterDecision, DisplacementProcessData, CouncilApprovalData
```

---

## Quick Reference Table

| Model Category | Number of Interfaces | Primary Use Cases |
|----------------|----------------------|-------------------|
| Land Models | 3 | Land management, coordinates, building locations |
| Building Models | 4 | Building info, annexes, network costs |
| Rental Models | 6 | Rental management, locations, decisions, status reports |
| School Map Models | 5 | Study periods, roads, annexes, spaces |
| Displacement Models | 9 | Displacement processes, compensation, approvals |
| **Total** | **27** | Complete application data structures |

---

**Last Updated:** October 25, 2025  
**Version:** 2.0  
**Context:** Egyptian Education System  
**Related Documents:** 
- `DATABASE_INTEGRATION.md` - Migration guide
- `MOCK_SERVICES_GUIDE.md` - Service usage
- `COMPONENT_SERVICE_MAPPING.md` - Component mappings
