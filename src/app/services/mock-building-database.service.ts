import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {
  BuildingData,
  BuildingBasicData,
  BuildingAnnexData,
  NetworkCostsData
} from '../models/building.model';

/**
 * Mock Building Database Service
 * Simulates database operations for building-related data
 * 
 * MIGRATION NOTE: Replace this service with actual HTTP calls to your backend API
 * See DATABASE_INTEGRATION.md for detailed migration instructions
 */
@Injectable({
  providedIn: 'root'
})
export class MockBuildingDatabaseService {
  private buildings: BuildingData[] = [];
  private buildingDetails: BuildingBasicData[] = [];
  private annexes: BuildingAnnexData[] = [];
  private networkCosts: NetworkCostsData[] = [];

  constructor() {
    this.initializeMockData();
  }

  /**
   * Search buildings by criteria
   * @param criteria - Search criteria
   * @returns Observable of matching buildings
   */
  searchBuildings(criteria: any): Observable<BuildingData[]> {
    // Simulate complex search
    const results = this.buildings.filter(building => {
      if (criteria.governorate && building.governorate !== criteria.governorate) return false;
      if (criteria.stage && building.stage !== criteria.stage) return false;
      if (criteria.affiliation && building.affiliation !== criteria.affiliation) return false;
      return true;
    });

    return of(results.length > 0 ? results : this.generateBuildings()).pipe(delay(500));
  }

  /**
   * Get building by number
   * @param buildingNumber - Building identification number
   * @returns Observable of building data
   */
  getBuildingByNumber(buildingNumber: string): Observable<BuildingData | null> {
    const building = this.buildings.find(b => b.buildingNumber === buildingNumber);
    return of(building || this.generateBuilding(buildingNumber)).pipe(delay(300));
  }

  /**
   * Get building basic data
   * @param buildingNumber - Building identification number
   * @returns Observable of detailed building data
   */
  getBuildingBasicData(buildingNumber: string): Observable<BuildingBasicData | null> {
    const details = this.buildingDetails.find(d => d.buildingNumber === buildingNumber);
    return of(details || this.generateBuildingBasicData(buildingNumber)).pipe(delay(300));
  }

  /**
   * Get building annexes
   * @param buildingId - Building ID
   * @returns Observable of annexes
   */
  getBuildingAnnexes(buildingId: string): Observable<BuildingAnnexData[]> {
    const buildingAnnexes = this.annexes.filter(a => a.buildingId === buildingId);
    return of(buildingAnnexes.length > 0 ? buildingAnnexes : this.generateAnnexes(buildingId)).pipe(delay(300));
  }

  /**
   * Get network costs for a building
   * @param buildingId - Building ID
   * @returns Observable of network costs
   */
  getNetworkCosts(buildingId: string): Observable<NetworkCostsData[]> {
    const costs = this.networkCosts.filter(n => n.buildingId === buildingId);
    return of(costs.length > 0 ? costs : this.generateNetworkCosts(buildingId)).pipe(delay(300));
  }

  /**
   * Save building data
   * @param building - Building data to save
   * @returns Observable of saved building
   */
  saveBuilding(building: BuildingData): Observable<BuildingData> {
    const index = this.buildings.findIndex(b => b.buildingNumber === building.buildingNumber);
    if (index >= 0) {
      this.buildings[index] = building;
    } else {
      this.buildings.push(building);
    }
    return of(building).pipe(delay(400));
  }

  /**
   * Save building annex
   * @param annex - Annex data to save
   * @returns Observable of saved annex
   */
  saveAnnex(annex: BuildingAnnexData): Observable<BuildingAnnexData> {
    const index = this.annexes.findIndex(a => a.id === annex.id);
    if (index >= 0) {
      this.annexes[index] = annex;
    } else {
      this.annexes.push(annex);
    }
    return of(annex).pipe(delay(300));
  }

  // Private methods for generating mock data

  private initializeMockData(): void {
    this.buildings = [
      this.generateBuilding('BLD-2024-001'),
      this.generateBuilding('BLD-2024-002'),
      this.generateBuilding('BLD-2024-003'),
    ];
  }

  private generateBuilding(buildingNumber: string): BuildingData {
    return {
      buildingNumber,
      schoolName: this.randomChoice([
        'مدرسة النور الابتدائية',
        'مدرسة الأمل الإعدادية',
        'مدرسة الرازي الثانوية',
        'مدرسة ابن سينا الابتدائية',
        'مدرسة الفارابي الإعدادية'
      ]),
      usageStatus: this.randomChoice(['قيد الاستخدام', 'شاغرة', 'قيد الصيانة', 'مغلقة مؤقتاً']),
      affiliation: this.randomChoice(['وزارة التعليم', 'الإدارة المحلية', 'القطاع الخاص']),
      buildingOwnership: this.randomChoice(['حكومي', 'مستأجر', 'خاص', 'وقف']),
      governorate: this.randomChoice(['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة']),
      regionalCenter: this.randomChoice(['المركز الأول', 'المركز الثاني', 'المركز الثالث']),
      educationalAdministration: this.randomChoice(['إدارة التعليم الشمالية', 'إدارة التعليم الجنوبية', 'إدارة التعليم الشرقية']),
      district: this.randomChoice(['حي النور', 'حي الأمل', 'حي السلام', 'حي الرياض']),
      neighborhood: this.randomChoice(['الحي الأول', 'الحي الثاني', 'الحي الثالث']),
      stage: this.randomChoice(['ابتدائي', 'إعدادي', 'ثانوي']),
      educationType: this.randomChoice(['تعليم عام', 'تعليم خاص', 'تحفيظ قرآن'])
    };
  }

  private generateBuildings(): BuildingData[] {
    const count = Math.floor(Math.random() * 5) + 3;
    return Array.from({ length: count }, (_, i) => 
      this.generateBuilding(`BLD-${Date.now()}-${i}`)
    );
  }

  private generateBuildingBasicData(buildingNumber: string): BuildingBasicData {
    return {
      buildingNumber,
      schoolName: 'مدرسة النور الابتدائية',
      buildingName: `مبنى ${buildingNumber}`,
      landArea: Math.floor(Math.random() * 5000) + 2000,
      builtArea: Math.floor(Math.random() * 3000) + 1000,
      floors: Math.floor(Math.random() * 3) + 1,
      constructionYear: Math.floor(Math.random() * 30) + 1990,
      lastMaintenanceYear: Math.floor(Math.random() * 5) + 2019,
      buildingCondition: this.randomChoice(['ممتاز', 'جيد', 'مقبول', 'يحتاج صيانة']),
      ownershipType: this.randomChoice(['حكومي', 'مستأجر', 'خاص']),
      rentalStatus: this.randomChoice(['غير مؤجر', 'مؤجر', 'عقد منتهي'])
    };
  }

  private generateAnnexes(buildingId: string): BuildingAnnexData[] {
    const count = Math.floor(Math.random() * 4) + 1;
    return Array.from({ length: count }, (_, i) => ({
      id: `ANX-${Date.now()}-${i}`,
      buildingId,
      annexType: this.randomChoice(['قاعة رياضية', 'مختبر', 'مكتبة', 'مسرح', 'كافتيريا']),
      area: Math.floor(Math.random() * 300) + 100,
      constructionYear: Math.floor(Math.random() * 20) + 2000,
      condition: this.randomChoice(['ممتاز', 'جيد', 'مقبول', 'يحتاج صيانة']),
      purpose: this.randomChoice(['تعليمي', 'ترفيهي', 'خدمي', 'إداري'])
    }));
  }

  private generateNetworkCosts(buildingId: string): NetworkCostsData[] {
    const types: Array<'water' | 'electricity' | 'sewage' | 'telecom'> = ['water', 'electricity', 'sewage', 'telecom'];
    return types.map((type, i) => ({
      id: `NET-${Date.now()}-${i}`,
      buildingId,
      networkType: type,
      installationCost: Math.floor(Math.random() * 100000) + 50000,
      maintenanceCost: Math.floor(Math.random() * 10000) + 5000,
      installationDate: this.randomDate(2015, 2023),
      provider: this.getProviderName(type),
      contractNumber: `CNT-${Math.floor(Math.random() * 100000)}`
    }));
  }

  private getProviderName(type: string): string {
    const providers: Record<string, string[]> = {
      water: ['شركة المياه الوطنية', 'المياه المحلية'],
      electricity: ['الشركة السعودية للكهرباء', 'شركة الكهرباء المحلية'],
      sewage: ['شركة الصرف الصحي', 'الصرف الصحي المحلي'],
      telecom: ['STC', 'موبايلي', 'زين']
    };
    return this.randomChoice(providers[type] || ['مزود خدمة']);
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
