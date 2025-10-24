import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {
  StudyPeriodData,
  SchoolRoadData,
  SchoolAnnexData,
  SchoolSpaceData,
  EducationalBuildingData
} from '../models/school-map.model';

/**
 * Mock School Map Database Service
 * Simulates database operations for school map and educational building data
 * 
 * MIGRATION NOTE: Replace this service with actual HTTP calls to your backend API
 * See DATABASE_INTEGRATION.md for detailed migration instructions
 */
@Injectable({
  providedIn: 'root'
})
export class MockSchoolMapDatabaseService {
  private studyPeriods: StudyPeriodData[] = [];
  private roads: SchoolRoadData[] = [];
  private annexes: SchoolAnnexData[] = [];
  private spaces: SchoolSpaceData[] = [];
  private educationalBuildings: EducationalBuildingData[] = [];

  constructor() {
    this.initializeMockData();
  }

  /**
   * Get study periods by building code
   * @param buildingCode - Building code
   * @returns Observable of study periods
   */
  getStudyPeriodsByBuildingCode(buildingCode: string): Observable<StudyPeriodData[]> {
    const periods = this.studyPeriods.filter(p => p.buildingCode === buildingCode);
    return of(periods.length > 0 ? periods : this.generateStudyPeriods(buildingCode)).pipe(delay(400));
  }

  /**
   * Get roads surrounding a building
   * @param buildingId - Building ID
   * @returns Observable of roads
   */
  getSchoolRoads(buildingId: string): Observable<SchoolRoadData[]> {
    const buildingRoads = this.roads.filter(r => r.buildingId === buildingId);
    return of(buildingRoads.length > 0 ? buildingRoads : this.generateRoads(buildingId)).pipe(delay(300));
  }

  /**
   * Get school annexes
   * @param buildingId - Building ID
   * @returns Observable of annexes
   */
  getSchoolAnnexes(buildingId: string): Observable<SchoolAnnexData[]> {
    const buildingAnnexes = this.annexes.filter(a => a.buildingId === buildingId);
    return of(buildingAnnexes.length > 0 ? buildingAnnexes : this.generateAnnexes(buildingId)).pipe(delay(300));
  }

  /**
   * Get school spaces (rooms, labs, etc.)
   * @param buildingId - Building ID
   * @returns Observable of spaces
   */
  getSchoolSpaces(buildingId: string): Observable<SchoolSpaceData[]> {
    const buildingSpaces = this.spaces.filter(s => s.buildingId === buildingId);
    return of(buildingSpaces.length > 0 ? buildingSpaces : this.generateSpaces(buildingId)).pipe(delay(300));
  }

  /**
   * Get educational building data
   * @param buildingNumber - Building number
   * @returns Observable of educational building data
   */
  getEducationalBuilding(buildingNumber: string): Observable<EducationalBuildingData | null> {
    const building = this.educationalBuildings.find(b => b.buildingNumber === buildingNumber);
    return of(building || this.generateEducationalBuilding(buildingNumber)).pipe(delay(300));
  }

  /**
   * Save study period
   * @param period - Study period data
   * @returns Observable of saved period
   */
  saveStudyPeriod(period: StudyPeriodData): Observable<StudyPeriodData> {
    if (!period.id) {
      period.id = `SP-${Date.now()}`;
      this.studyPeriods.push(period);
    } else {
      const index = this.studyPeriods.findIndex(p => p.id === period.id);
      if (index >= 0) {
        this.studyPeriods[index] = period;
      }
    }
    return of(period).pipe(delay(300));
  }

  /**
   * Save school space
   * @param space - Space data
   * @returns Observable of saved space
   */
  saveSchoolSpace(space: SchoolSpaceData): Observable<SchoolSpaceData> {
    const index = this.spaces.findIndex(s => s.id === space.id);
    if (index >= 0) {
      this.spaces[index] = space;
    } else {
      this.spaces.push(space);
    }
    return of(space).pipe(delay(300));
  }

  /**
   * Save school annex
   * @param annex - Annex data
   * @returns Observable of saved annex
   */
  saveSchoolAnnex(annex: SchoolAnnexData): Observable<SchoolAnnexData> {
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
    this.studyPeriods = this.generateStudyPeriods('BLD-001');
    this.educationalBuildings = [
      this.generateEducationalBuilding('BLD-2024-001'),
      this.generateEducationalBuilding('BLD-2024-002'),
    ];
  }

  private generateStudyPeriods(buildingCode: string): StudyPeriodData[] {
    const periods = ['الفترة الصباحية', 'الفترة المسائية'];
    return periods.map((period, i) => ({
      id: `SP-${Date.now()}-${i}`,
      buildingCode,
      period,
      schoolName: this.randomChoice([
        'مدرسة النور الابتدائية',
        'مدرسة الأمل الإعدادية',
        'مدرسة الرازي الثانوية'
      ]),
      type: this.randomChoice(['ابتدائي', 'إعدادي', 'ثانوي']),
      boysCount: Math.floor(Math.random() * 300) + 100,
      girlsCount: Math.floor(Math.random() * 300) + 100,
      periodStage: this.randomChoice(['ابتدائي', 'إعدادي', 'ثانوي']),
      startTime: i === 0 ? '07:30' : '13:00',
      endTime: i === 0 ? '12:30' : '18:00'
    }));
  }

  private generateRoads(buildingId: string): SchoolRoadData[] {
    const directions = ['north', 'south', 'east', 'west'] as const;
    return directions.map((direction, i) => ({
      id: `ROAD-${Date.now()}-${i}`,
      buildingId,
      roadName: this.randomChoice([
        'شارع الملك فهد',
        'شارع العروبة',
        'شارع التحلية',
        'شارع الأمير محمد',
        'طريق الملك عبدالله'
      ]),
      roadType: this.randomChoice(['main', 'secondary', 'internal']),
      roadWidth: Math.floor(Math.random() * 30) + 10,
      roadCondition: this.randomChoice(['ممتاز', 'جيد', 'مقبول', 'يحتاج صيانة']),
      isPaved: Math.random() > 0.2,
      direction
    }));
  }

  private generateAnnexes(buildingId: string): SchoolAnnexData[] {
    const count = Math.floor(Math.random() * 3) + 1;
    return Array.from({ length: count }, (_, i) => ({
      id: `ANX-${Date.now()}-${i}`,
      buildingId,
      annexName: this.randomChoice([
        'ملحق رياضي',
        'ملحق مختبرات',
        'ملحق إداري',
        'ملحق خدمات'
      ]),
      annexType: this.randomChoice(['رياضي', 'تعليمي', 'إداري', 'خدمي']),
      area: Math.floor(Math.random() * 500) + 200,
      capacity: Math.floor(Math.random() * 100) + 50,
      constructionDate: this.randomDate(2010, 2023),
      purpose: this.randomChoice(['أنشطة رياضية', 'مختبرات علمية', 'مكاتب إدارية', 'خدمات عامة']),
      condition: this.randomChoice(['ممتاز', 'جيد', 'مقبول', 'يحتاج صيانة'])
    }));
  }

  private generateSpaces(buildingId: string): SchoolSpaceData[] {
    const count = Math.floor(Math.random() * 15) + 10;
    const spaceTypes: Array<'classroom' | 'lab' | 'library' | 'office' | 'other'> = 
      ['classroom', 'lab', 'library', 'office', 'other'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: `SPC-${Date.now()}-${i}`,
      buildingId,
      spaceType: this.randomChoice(spaceTypes),
      spaceName: `${this.getSpaceTypeName(spaceTypes[i % spaceTypes.length])} ${i + 1}`,
      floor: Math.floor(Math.random() * 3) + 1,
      area: Math.floor(Math.random() * 80) + 40,
      capacity: Math.floor(Math.random() * 35) + 20,
      currentUse: this.randomChoice(['قاعة دراسية', 'مختبر', 'مكتبة', 'مكتب إداري', 'قاعة اجتماعات']),
      condition: this.randomChoice(['ممتاز', 'جيد', 'مقبول', 'يحتاج صيانة']),
      hasAirConditioning: Math.random() > 0.3,
      hasProjector: Math.random() > 0.5
    }));
  }

  private generateEducationalBuilding(buildingNumber: string): EducationalBuildingData {
    return {
      id: `EDU-${Date.now()}`,
      buildingNumber,
      schoolName: this.randomChoice([
        'مدرسة النور الابتدائية',
        'مدرسة الأمل الإعدادية',
        'مدرسة الرازي الثانوية',
        'مدرسة ابن سينا المتوسطة'
      ]),
      educationalLevel: this.randomChoice(['elementary', 'middle', 'high']),
      gender: this.randomChoice(['boys', 'girls', 'mixed']),
      totalStudents: Math.floor(Math.random() * 500) + 200,
      totalTeachers: Math.floor(Math.random() * 50) + 20,
      totalClassrooms: Math.floor(Math.random() * 25) + 10,
      hasLibrary: Math.random() > 0.3,
      hasLab: Math.random() > 0.4,
      hasSportsField: Math.random() > 0.5,
      hasCafeteria: Math.random() > 0.4
    };
  }

  private getSpaceTypeName(type: string): string {
    const names: Record<string, string> = {
      classroom: 'فصل دراسي',
      lab: 'مختبر',
      library: 'مكتبة',
      office: 'مكتب',
      other: 'قاعة'
    };
    return names[type] || 'قاعة';
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
