import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {
  LandData,
  BuildingLocationData,
  LandCoordinates
} from '../models/land.model';

/**
 * Mock Land Database Service
 * Simulates database operations for land-related data
 * 
 * MIGRATION NOTE: Replace this service with actual HTTP calls to your backend API
 * See DATABASE_INTEGRATION.md for detailed migration instructions
 */
@Injectable({
  providedIn: 'root'
})
export class MockLandDatabaseService {
  // In-memory storage simulating database
  private lands: LandData[] = [];
  private buildingLocations: BuildingLocationData[] = [];
  private coordinates: LandCoordinates[] = [];
  
  constructor() {
    this.initializeMockData();
  }

  /**
   * Get land data by reference number
   * @param referenceNumber - The land reference number
   * @returns Observable of land data or null if not found
   */
  getLandByReferenceNumber(referenceNumber: string): Observable<LandData | null> {
    // Simulate network delay (300-800ms)
    const simulatedDelay = Math.floor(Math.random() * 500) + 300;
    
    const land = this.lands.find(l => l.referenceNumber === referenceNumber);
    return of(land || this.generateLandData(referenceNumber)).pipe(delay(simulatedDelay));
  }

  /**
   * Get all lands
   * @returns Observable of all land data
   */
  getAllLands(): Observable<LandData[]> {
    return of(this.lands).pipe(delay(500));
  }

  /**
   * Search lands by criteria
   * @param criteria - Search criteria object
   * @returns Observable of matching lands
   */
  searchLands(criteria: Partial<LandData>): Observable<LandData[]> {
    const results = this.lands.filter(land => {
      return Object.entries(criteria).every(([key, value]) => {
        if (!value) return true;
        return land[key as keyof LandData]?.toString().toLowerCase().includes(value.toString().toLowerCase());
      });
    });
    return of(results).pipe(delay(400));
  }

  /**
   * Get building locations for a land parcel
   * @param landId - The land ID
   * @returns Observable of building locations
   */
  getBuildingLocationsByLandId(landId: string): Observable<BuildingLocationData[]> {
    const buildings = this.buildingLocations.filter(b => b.id.startsWith(landId));
    return of(buildings.length > 0 ? buildings : this.generateBuildingLocations(landId)).pipe(delay(300));
  }

  /**
   * Get coordinates for a land parcel
   * @param landId - The land ID
   * @returns Observable of land coordinates
   */
  getLandCoordinates(landId: string): Observable<LandCoordinates[]> {
    const coords = this.coordinates.filter(c => c.landId === landId);
    return of(coords.length > 0 ? coords : this.generateCoordinates(landId)).pipe(delay(300));
  }

  /**
   * Create or update land data
   * @param land - Land data to save
   * @returns Observable of saved land data
   */
  saveLand(land: LandData): Observable<LandData> {
    const index = this.lands.findIndex(l => l.id === land.id);
    if (index >= 0) {
      this.lands[index] = land;
    } else {
      this.lands.push(land);
    }
    return of(land).pipe(delay(400));
  }

  // Private methods for generating mock data

  private initializeMockData(): void {
    // Pre-populate with some sample data
    this.lands = [
      this.generateLandData('REF-2024-001'),
      this.generateLandData('REF-2024-002'),
      this.generateLandData('REF-2024-003'),
    ];
  }

  private generateLandData(referenceNumber: string): LandData {
    const id = `LAND-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    return {
      id,
      referenceNumber,
      usageStatus: this.randomChoice(['شاغرة', 'مستخدمة', 'قيد الإنشاء', 'محجوزة']),
      headquarters: this.randomChoice(['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة']),
      approvalStatus: this.randomChoice(['معتمد', 'قيد المراجعة', 'مرفوض', 'معلق']),
      identificationNumber: `ID-${Math.floor(Math.random() * 100000)}`,
      centerDepartment: this.randomChoice(['الإدارة المركزية', 'الإدارة الفرعية الشرقية', 'الإدارة الفرعية الغربية']),
      totalArea: Math.floor(Math.random() * 5000) + 1000,
      phase: this.randomChoice(['المرحلة الأولى', 'المرحلة الثانية', 'المرحلة النهائية']),
      approval: this.randomChoice(['موافق عليها', 'قيد الموافقة', 'بحاجة للمراجعة']),
      housing: this.randomChoice(['سكني', 'تجاري', 'صناعي', 'تعليمي']),
      committeePricing: `${Math.floor(Math.random() * 1000) + 500} ريال/متر`,
      purchasePrice: `${Math.floor(Math.random() * 5000000) + 1000000} ريال`,
      saleNegotiations: this.randomChoice(['جارية', 'متوقفة', 'مكتملة', 'لم تبدأ']),
      landCode: `LC-${Math.floor(Math.random() * 10000)}`,
      village: this.randomChoice(['قرية النور', 'قرية الأمل', 'قرية السلام', 'قرية الرياض']),
      currentOwner: this.randomChoice(['وزارة التعليم', 'وزارة الإسكان', 'القطاع الخاص', 'ملكية خاصة']),
      originalOwner: this.randomChoice(['عبدالله محمد', 'أحمد سعيد', 'محمد علي', 'سعيد أحمد']),
      model: this.randomChoice(['نموذج A', 'نموذج B', 'نموذج C']),
      documents: this.randomChoice(['مكتملة', 'ناقصة', 'قيد المراجعة']),
      plan: this.randomChoice(['معتمدة', 'قيد الاعتماد', 'بحاجة للتحديث']),
      branchNotification: this.randomChoice(['تم الإشعار', 'قيد الإشعار', 'لم يتم الإشعار']),
      realEstateStatus: this.randomChoice(['مسجلة', 'قيد التسجيل', 'غير مسجلة']),
      buildingBoundaries: this.randomChoice(['متاح', 'غير متاح', 'قيد التحديث']),
      networkData: this.randomChoice(['متوفر', 'غير متوفر', 'جزئي']),
      networkObservations: this.randomChoice(['لا يوجد', 'بحاجة للصيانة', 'بحالة جيدة']),
      landAreaFromTotal: `${Math.floor(Math.random() * 100)}%`,
      landUseDatabase: this.randomChoice(['محدّث', 'قديم', 'قيد التحديث']),
      landInspectionDatabase: this.randomChoice(['متوفر', 'غير متوفر', 'قيد الإضافة']),
      landConstructionObstacles: this.randomChoice(['لا يوجد', 'عوائق بسيطة', 'عوائق كبيرة']),
      landCreationObstacles: this.randomChoice(['لا يوجد', 'عوائق إدارية', 'عوائق فنية']),
      landConstructionData: this.randomChoice(['متوفر', 'غير متوفر', 'جزئي']),
      landReceiptDatabase: this.randomChoice(['مكتمل', 'ناقص', 'قيد التحديث']),
      paidAmountsDatabase: this.randomChoice(['محدّث', 'قديم', 'قيد المراجعة']),
      decisionData: this.randomChoice(['متاح', 'غير متاح', 'قيد الإصدار']),
      landCommittees: this.randomChoice(['مشكّلة', 'قيد التشكيل', 'غير مشكّلة']),
      landFacilities: this.randomChoice(['متوفرة', 'غير متوفرة', 'جزئية']),
      landCoordinatesData: this.randomChoice(['محددة', 'غير محددة', 'قيد التحديد']),
      educationalStudies: this.randomChoice(['مكتملة', 'جارية', 'لم تبدأ']),
      landReviewCommittees: this.randomChoice(['تمت المراجعة', 'قيد المراجعة', 'لم تبدأ المراجعة'])
    };
  }

  private generateBuildingLocations(landId: string): BuildingLocationData[] {
    const count = Math.floor(Math.random() * 3) + 1;
    return Array.from({ length: count }, (_, i) => ({
      id: `${landId}-BLD-${i + 1}`,
      code: `BC-${Math.floor(Math.random() * 10000)}`,
      locationName: this.randomChoice([
        'مبنى المدرسة الابتدائية',
        'مبنى المدرسة الإعدادية',
        'مبنى المدرسة الثانوية',
        'مبنى إداري',
        'مبنى خدمي'
      ]),
      coordinates: Math.floor(Math.random() * 1000),
      status: this.randomChoice(['قائم', 'قيد الإنشاء', 'مخطط']),
      requiredStatus: this.randomChoice(['مطلوب', 'اختياري', 'ضروري'])
    }));
  }

  private generateCoordinates(landId: string): LandCoordinates[] {
    const count = Math.floor(Math.random() * 6) + 4; // 4-9 points
    return Array.from({ length: count }, (_, i) => ({
      id: `COORD-${Date.now()}-${i}`,
      landId,
      pointNumber: i + 1,
      latitude: 24.7136 + (Math.random() - 0.5) * 0.1,
      longitude: 46.6753 + (Math.random() - 0.5) * 0.1,
      elevation: Math.floor(Math.random() * 100) + 600
    }));
  }

  private randomChoice<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
}
