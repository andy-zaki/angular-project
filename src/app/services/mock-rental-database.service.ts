import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {
  RentalBuildingInfo,
  RentalBuildingDetails,
  RentalBuildingLocation,
  RentalStatusFlag,
  RentalDecision,
  RentalReportCategory
} from '../models/rental.model';

/**
 * Mock Rental Database Service
 * Simulates database operations for rental building data
 * 
 * MIGRATION NOTE: Replace this service with actual HTTP calls to your backend API
 * See DATABASE_INTEGRATION.md for detailed migration instructions
 */
@Injectable({
  providedIn: 'root'
})
export class MockRentalDatabaseService {
  private rentalBuildings: RentalBuildingDetails[] = [];
  private locations: RentalBuildingLocation[] = [];
  private statusFlags: RentalStatusFlag[] = [];
  private decisions: RentalDecision[] = [];
  private reportCategories: RentalReportCategory[] = [];

  constructor() {
    this.initializeMockData();
  }

  /**
   * Get rental building by identification number
   * @param identificationNumber - Building identification number
   * @returns Observable of rental building info
   */
  getRentalBuildingByIdNumber(identificationNumber: string): Observable<RentalBuildingInfo | null> {
    const building = this.rentalBuildings.find(b => b.identificationNumber === identificationNumber);
    return of(building || this.generateRentalBuilding(identificationNumber)).pipe(delay(400));
  }

  /**
   * Get all rental buildings
   * @returns Observable of all rental buildings
   */
  getAllRentalBuildings(): Observable<RentalBuildingInfo[]> {
    return of(this.rentalBuildings).pipe(delay(500));
  }

  /**
   * Get rental buildings by status
   * @param status - Building status filter
   * @returns Observable of filtered buildings
   */
  getRentalBuildingsByStatus(status: string): Observable<RentalBuildingInfo[]> {
    const filtered = this.rentalBuildings.filter(b => b.status.includes(status));
    return of(filtered).pipe(delay(400));
  }

  /**
   * Get detailed rental building information
   * @param buildingId - Building ID
   * @returns Observable of detailed building info
   */
  getRentalBuildingDetails(buildingId: string): Observable<RentalBuildingDetails | null> {
    const building = this.rentalBuildings.find(b => b.id === buildingId);
    return of(building || null).pipe(delay(300));
  }

  /**
   * Get building location
   * @param buildingId - Building ID
   * @returns Observable of location data
   */
  getRentalBuildingLocation(buildingId: string): Observable<RentalBuildingLocation | null> {
    const location = this.locations.find(l => l.buildingId === buildingId);
    return of(location || this.generateLocation(buildingId)).pipe(delay(300));
  }

  /**
   * Get all rental status flags
   * @returns Observable of status flags
   */
  getRentalStatusFlags(): Observable<RentalStatusFlag[]> {
    return of(this.statusFlags).pipe(delay(200));
  }

  /**
   * Get rental decisions for a building
   * @param buildingId - Building ID
   * @returns Observable of decisions
   */
  getRentalDecisions(buildingId: string): Observable<RentalDecision[]> {
    const buildingDecisions = this.decisions.filter(d => d.buildingId === buildingId);
    return of(buildingDecisions.length > 0 ? buildingDecisions : this.generateDecisions(buildingId)).pipe(delay(300));
  }

  /**
   * Update rental building status
   * @param buildingId - Building ID
   * @param status - New status
   * @param substatus - New substatus
   * @returns Observable of updated building
   */
  updateRentalBuildingStatus(buildingId: string, status: string, substatus: string): Observable<RentalBuildingInfo> {
    const building = this.rentalBuildings.find(b => b.id === buildingId);
    if (building) {
      building.status = status;
      building.substatus = substatus;
    }
    return of(building!).pipe(delay(400));
  }

  /**
   * Save rental building
   * @param building - Building data to save
   * @returns Observable of saved building
   */
  saveRentalBuilding(building: RentalBuildingDetails): Observable<RentalBuildingDetails> {
    const index = this.rentalBuildings.findIndex(b => b.id === building.id);
    if (index >= 0) {
      this.rentalBuildings[index] = building;
    } else {
      this.rentalBuildings.push(building);
    }
    return of(building).pipe(delay(400));
  }

  /**
   * Get rental report categories
   * @param categoryType - Category type filter (optional)
   * @returns Observable of report categories
   */
  getRentalReportCategories(categoryType?: 'in-progress' | 'completed' | 'finished'): Observable<RentalReportCategory[]> {
    const filtered = categoryType 
      ? this.reportCategories.filter(c => c.categoryType === categoryType)
      : this.reportCategories;
    return of(filtered).pipe(delay(300));
  }

  // Private methods for generating mock data

  private initializeMockData(): void {
    this.rentalBuildings = [
      this.generateRentalBuilding('12345'),
      this.generateRentalBuilding('12346'),
      this.generateRentalBuilding('12347'),
    ];

    this.statusFlags = [
      { id: '1', code: 'ACTIVE', label: 'مؤجرة - نشطة', category: 'rental', isActive: true },
      { id: '2', code: 'EXPIRED', label: 'عقد منتهي', category: 'rental', isActive: false },
      { id: '3', code: 'MAINTENANCE', label: 'تحت الصيانة', category: 'maintenance', isActive: true },
      { id: '4', code: 'VACANT', label: 'شاغرة', category: 'occupancy', isActive: true },
      { id: '5', code: 'EFFICIENT', label: 'تعمل بكفاءة', category: 'performance', isActive: true },
      { id: '6', code: 'NEEDS_REPAIR', label: 'بحاجة للإصلاح', category: 'maintenance', isActive: false },
      { id: '7', code: 'UNDER_REVIEW', label: 'قيد المراجعة', category: 'status', isActive: true },
      { id: '8', code: 'APPROVED', label: 'معتمد', category: 'approval', isActive: true },
      { id: '9', code: 'CLOSED', label: 'مغلقة', category: 'status', isActive: false },
      { id: '10', code: 'WORKING', label: 'تعمل', category: 'operational', isActive: true },
      { id: '11', code: 'DONATED', label: 'تم التبرع بها', category: 'ownership', isActive: false },
      { id: '12', code: 'PURCHASED', label: 'تم شراؤها', category: 'ownership', isActive: false },
      { id: '13', code: 'RETURNED', label: 'صدر قرار بردها للمالك', category: 'ownership', isActive: false },
      { id: '14', code: 'DISPLACED', label: 'تم نزع ملكيتها', category: 'ownership', isActive: false },
      { id: '15', code: 'PURCHASE_PENDING', label: 'جاري اتخاذ إجراءات شراء بعد البت', category: 'purchase', isActive: true },
      { id: '16', code: 'PURCHASE_DELIBERATION', label: 'جاري البت للشراء', category: 'purchase', isActive: true }
    ];

    this.reportCategories = [
      // In-progress categories (قيد الدراسة)
      { id: 'RC1', code: 'NEED_STUDY', label: 'دراسة الاحتياج', categoryType: 'in-progress', totalCount: 45, closedCount: 12, workingCount: 33 },
      { id: 'RC2', code: 'LOCATION_VALIDITY', label: 'صلاحية الموقع', categoryType: 'in-progress', totalCount: 38, closedCount: 8, workingCount: 30 },
      { id: 'RC3', code: 'DATA_COMPLETION', label: 'استكمال بيانات', categoryType: 'in-progress', totalCount: 52, closedCount: 15, workingCount: 37 },
      { id: 'RC4', code: 'COMMITTEE_APPROVALS', label: 'اعتمادات اللجنة', categoryType: 'in-progress', totalCount: 35, closedCount: 10, workingCount: 25 },
      { id: 'RC5', code: 'UNDER_COMMITTEE_STUDY', label: 'تدرس باللجنة', categoryType: 'in-progress', totalCount: 42, closedCount: 13, workingCount: 29 },
      { id: 'RC6', code: 'AUTHORITY_SIGNATURE', label: 'توقيع م. الهيئة', categoryType: 'in-progress', totalCount: 38, closedCount: 9, workingCount: 29 },
      
      // Completed categories (تم الدراسة)
      { id: 'RC7', code: 'SEIZURE_DECISION', label: 'اتخاذ ج. استيلاء', categoryType: 'completed', totalCount: 28, closedCount: 7, workingCount: 21 },
      { id: 'RC8', code: 'EVICTION_ADMIN', label: 'اخراج وشأن الادارة', categoryType: 'completed', totalCount: 35, closedCount: 10, workingCount: 25 },
      { id: 'RC9', code: 'RETURN_TOTAL', label: 'رد للمالك (كلى)', categoryType: 'completed', totalCount: 22, closedCount: 5, workingCount: 17 },
      { id: 'RC10', code: 'RETURN_PARTIAL', label: 'رد للمالك (جزء)', categoryType: 'completed', totalCount: 18, closedCount: 4, workingCount: 14 },
      { id: 'RC11', code: 'RETURN_CONDITIONAL', label: 'رد للمالك (شرط)', categoryType: 'completed', totalCount: 25, closedCount: 6, workingCount: 19 },
      { id: 'RC12', code: 'EXPROPRIATION_ACTION', label: 'اتخاذ نزع ملكية', categoryType: 'completed', totalCount: 32, closedCount: 8, workingCount: 24 },
      { id: 'RC13', code: 'STOP_LIQUIDATION', label: 'الايقاف والتصفية', categoryType: 'completed', totalCount: 15, closedCount: 3, workingCount: 12 },
      { id: 'RC14', code: 'CONTINUE_RENTAL', label: 'استمرار الايجار', categoryType: 'completed', totalCount: 40, closedCount: 12, workingCount: 28 },
      { id: 'RC15', code: 'ACCEPT_DONATION', label: 'قبول التبرع', categoryType: 'completed', totalCount: 12, closedCount: 2, workingCount: 10 },
      { id: 'RC16', code: 'DECISION_COMMITTEE', label: 'لجنة البت', categoryType: 'completed', totalCount: 20, closedCount: 5, workingCount: 15 },
      { id: 'RC17', code: 'PURCHASE_AFTER_DECISION', label: 'اتخاذ ج. شراء بعدب', categoryType: 'completed', totalCount: 18, closedCount: 4, workingCount: 14 },
      { id: 'RC18', code: 'PURCHASE_NEGOTIATION', label: 'تفاوض على شراء', categoryType: 'completed', totalCount: 16, closedCount: 3, workingCount: 13 },
      
      // Finished categories (تم الانتهاء)
      { id: 'RC19', code: 'COMPENSATION_BY_RULING', label: 'تم التعويض بحكم', categoryType: 'finished', totalCount: 34, closedCount: 8, workingCount: 26 },
      { id: 'RC20', code: 'RETURN_BEFORE_ID', label: 'رد قبل معرفة الرقم', categoryType: 'finished', totalCount: 28, closedCount: 6, workingCount: 22 },
      { id: 'RC21', code: 'RETURN_TO_OWNER', label: 'رد للمالك', categoryType: 'finished', totalCount: 25, closedCount: 5, workingCount: 20 },
      { id: 'RC22', code: 'PURCHASE', label: 'شراء', categoryType: 'finished', totalCount: 30, closedCount: 7, workingCount: 23 },
      { id: 'RC23', code: 'EXPROPRIATION', label: 'نزع الملكية', categoryType: 'finished', totalCount: 22, closedCount: 4, workingCount: 18 },
      { id: 'RC24', code: 'DONATED', label: 'تم التبرع', categoryType: 'finished', totalCount: 12, closedCount: 2, workingCount: 10 },
      { id: 'RC25', code: 'EVICTION_ADMIN_FINAL', label: 'الاخراج وشأن الادارة', categoryType: 'finished', totalCount: 18, closedCount: 3, workingCount: 15 },
      { id: 'RC26', code: 'STOP_LIQUIDATE_BUILDING', label: 'الايقاف وتصفية مبني', categoryType: 'finished', totalCount: 15, closedCount: 3, workingCount: 12 }
    ];
  }

  private generateRentalBuilding(identificationNumber: string): RentalBuildingDetails {
    const id = `RENT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    return {
      id,
      identificationNumber,
      name: this.randomChoice([
        'مدرسة الرازي الابتدائية',
        'مدرسة ابن سينا الإعدادية',
        'مدرسة الفارابي الثانوية',
        'مدرسة الخوارزمي الابتدائية',
        'مدرسة النور المتوسطة'
      ]),
      status: this.randomChoice(['مؤجرة - نشطة', 'عقد منتهي', 'شاغرة', 'قيد المراجعة']),
      substatus: this.randomChoice(['تعمل بكفاءة', 'بحاجة للصيانة', 'تحت الصيانة', 'معتمد']),
      tenant: this.randomChoice(['وزارة التعليم', 'وزارة الصحة', 'وزارة الداخلية', 'القطاع الخاص']),
      location: this.randomChoice(['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة']),
      monthlyRent: Math.floor(Math.random() * 50000) + 20000,
      contractStartDate: this.randomDate(2020, 2023),
      contractEndDate: this.randomDate(2024, 2027),
      buildingType: this.randomChoice(['تعليمي', 'إداري', 'سكني', 'متعدد الأغراض']),
      totalArea: Math.floor(Math.random() * 3000) + 1000,
      usableArea: Math.floor(Math.random() * 2500) + 800,
      numberOfRooms: Math.floor(Math.random() * 30) + 10,
      numberOfFloors: Math.floor(Math.random() * 3) + 1,
      yearBuilt: Math.floor(Math.random() * 30) + 1990,
      lastInspectionDate: this.randomDate(2023, 2024),
      inspectionStatus: this.randomChoice(['معتمد', 'قيد المراجعة', 'بحاجة لإعادة فحص']),
      maintenanceRequired: Math.random() > 0.5
    };
  }

  private generateLocation(buildingId: string): RentalBuildingLocation {
    return {
      id: `LOC-${Date.now()}`,
      buildingId,
      governorate: this.randomChoice(['الرياض', 'مكة المكرمة', 'المنطقة الشرقية', 'المدينة المنورة']),
      city: this.randomChoice(['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة']),
      district: this.randomChoice(['حي النور', 'حي الأمل', 'حي السلام', 'حي الرياض']),
      neighborhood: this.randomChoice(['الحي الأول', 'الحي الثاني', 'الحي الثالث']),
      street: this.randomChoice(['شارع الملك فهد', 'شارع العروبة', 'شارع التحلية', 'شارع الأمير محمد']),
      buildingNumber: `${Math.floor(Math.random() * 9000) + 1000}`,
      postalCode: `${Math.floor(Math.random() * 90000) + 10000}`,
      latitude: 24.7136 + (Math.random() - 0.5) * 2,
      longitude: 46.6753 + (Math.random() - 0.5) * 2
    };
  }

  private generateDecisions(buildingId: string): RentalDecision[] {
    const count = Math.floor(Math.random() * 3) + 1;
    return Array.from({ length: count }, (_, i) => ({
      id: `DEC-${Date.now()}-${i}`,
      buildingId,
      decisionNumber: `DEC-${Math.floor(Math.random() * 10000)}`,
      decisionDate: this.randomDate(2020, 2024),
      decisionType: this.randomChoice(['موافقة إيجار', 'تجديد عقد', 'إنهاء عقد', 'تعديل شروط']),
      approvedBy: this.randomChoice(['مدير الإدارة', 'وكيل الوزارة', 'اللجنة المختصة']),
      notes: this.randomChoice(['لا يوجد', 'معتمد بشروط', 'يتطلب متابعة'])
    }));
  }

  private randomDate(startYear: number, endYear: number): string {
    const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  private randomChoice<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}
