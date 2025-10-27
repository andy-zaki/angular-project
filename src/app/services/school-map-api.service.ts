import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  StudyPeriodData,
  SchoolRoadData,
  SchoolAnnexData,
  SchoolSpaceData,
  EducationalBuildingData
} from '../models/school-map.model';
import { environment } from '../../environments/environment';

/**
 * School Map API Service
 * Handles HTTP requests for school map and educational building data
 * Replaces MockSchoolMapDatabaseService with real database integration
 */
@Injectable({
  providedIn: 'root'
})
export class SchoolMapApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/school-maps`;

  /**
   * Get study periods by building code
   */
  getStudyPeriodsByBuildingCode(buildingCode: string): Observable<StudyPeriodData[]> {
    return this.http.get<StudyPeriodData[]>(`${this.baseUrl}/study-periods/${buildingCode}`);
  }

  /**
   * Get roads surrounding a building
   */
  getSchoolRoads(buildingId: string): Observable<SchoolRoadData[]> {
    return this.http.get<SchoolRoadData[]>(`${this.baseUrl}/roads/${buildingId}`);
  }

  /**
   * Get school annexes by building ID
   */
  getSchoolAnnexes(buildingId: string): Observable<SchoolAnnexData[]> {
    return this.http.get<SchoolAnnexData[]>(`${this.baseUrl}/annexes/${buildingId}`);
  }

  /**
   * Get school spaces by building ID
   */
  getSchoolSpaces(buildingId: string): Observable<SchoolSpaceData[]> {
    return this.http.get<SchoolSpaceData[]>(`${this.baseUrl}/spaces/${buildingId}`);
  }

  /**
   * Get educational building by code
   */
  getEducationalBuildingByCode(buildingCode: string): Observable<EducationalBuildingData> {
    return this.http.get<EducationalBuildingData>(`${this.baseUrl}/educational-buildings/${buildingCode}`);
  }

  /**
   * Get all educational buildings
   */
  getAllEducationalBuildings(): Observable<EducationalBuildingData[]> {
    return this.http.get<EducationalBuildingData[]>(`${this.baseUrl}/educational-buildings`);
  }

  /**
   * Add study period
   */
  addStudyPeriod(data: Omit<StudyPeriodData, 'id'>): Observable<StudyPeriodData> {
    return this.http.post<StudyPeriodData>(`${this.baseUrl}/study-periods`, data);
  }

  /**
   * Add school road
   */
  addSchoolRoad(data: Omit<SchoolRoadData, 'id'>): Observable<SchoolRoadData> {
    return this.http.post<SchoolRoadData>(`${this.baseUrl}/roads`, data);
  }

  /**
   * Add school annex
   */
  addSchoolAnnex(data: Omit<SchoolAnnexData, 'id'>): Observable<SchoolAnnexData> {
    return this.http.post<SchoolAnnexData>(`${this.baseUrl}/annexes`, data);
  }

  /**
   * Add school space
   */
  addSchoolSpace(data: Omit<SchoolSpaceData, 'id'>): Observable<SchoolSpaceData> {
    return this.http.post<SchoolSpaceData>(`${this.baseUrl}/spaces`, data);
  }

  /**
   * Create educational building
   */
  createEducationalBuilding(data: Omit<EducationalBuildingData, 'id'>): Observable<EducationalBuildingData> {
    return this.http.post<EducationalBuildingData>(`${this.baseUrl}/educational-buildings`, data);
  }

  /**
   * Update educational building
   */
  updateEducationalBuilding(id: string, data: Partial<EducationalBuildingData>): Observable<EducationalBuildingData> {
    return this.http.put<EducationalBuildingData>(`${this.baseUrl}/educational-buildings/${id}`, data);
  }
}
