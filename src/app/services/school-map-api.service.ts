import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  StudyPeriodData,
  SchoolRoadData,
  SchoolAnnexData,
  SchoolSpaceData,
  EducationalBuildingData
} from '../models/school-map.model';
import { environment } from '../../environments/environment.development';
import { ErrorHandlerService } from './error-handler.service';

/**
 * School Map API Service
 * Handles HTTP requests for school map and educational building data
 * Replaces MockSchoolMapDatabaseService with real database integration
 * 
 * Backend Route: api/schoolmaps (matches SchoolMapsController)
 */
@Injectable({
  providedIn: 'root'
})
export class SchoolMapApiService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);
  // Fixed: Backend uses api/schoolmaps (not api/school-maps)
  private readonly baseUrl = `${environment.apiUrl}/api/schoolmaps`;

  /**
   * Get study periods by building code
   * Backend: GET api/schoolmaps/study-periods/{buildingCode}
   */
  getStudyPeriodsByBuildingCode(buildingCode: string): Observable<StudyPeriodData[]> {
    try {
      this.errorHandler.validateString(buildingCode, 'رمز المبنى');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'getStudyPeriodsByBuildingCode');
      return throwError(() => error);
    }

    return this.http.get<StudyPeriodData[]>(`${this.baseUrl}/study-periods/${buildingCode}`).pipe(
      tap(data => console.log(`Fetched ${data.length} study periods for building ${buildingCode}`)),
      catchError(error => this.errorHandler.handleError(error, `تحميل الفترات الدراسية للمبنى: ${buildingCode}`))
    );
  }

  /**
   * Get roads surrounding a building
   * Backend: GET api/schoolmaps/roads/{buildingId}
   */
  getSchoolRoads(buildingId: string): Observable<SchoolRoadData[]> {
    try {
      this.errorHandler.validateString(buildingId, 'معرف المبنى');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'getSchoolRoads');
      return throwError(() => error);
    }

    return this.http.get<SchoolRoadData[]>(`${this.baseUrl}/roads/${buildingId}`).pipe(
      tap(data => console.log(`Fetched ${data.length} school roads for building ${buildingId}`)),
      catchError(error => this.errorHandler.handleError(error, 'تحميل بيانات الطرق المحيطة'))
    );
  }

  /**
   * Get school annexes by building ID
   * Backend: GET api/schoolmaps/annexes/{buildingId}
   */
  getSchoolAnnexes(buildingId: string): Observable<SchoolAnnexData[]> {
    try {
      this.errorHandler.validateString(buildingId, 'معرف المبنى');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'getSchoolAnnexes');
      return throwError(() => error);
    }

    return this.http.get<SchoolAnnexData[]>(`${this.baseUrl}/annexes/${buildingId}`).pipe(
      tap(data => console.log(`Fetched ${data.length} school annexes for building ${buildingId}`)),
      catchError(error => this.errorHandler.handleError(error, 'تحميل بيانات الملاحق'))
    );
  }

  /**
   * Get school spaces by building ID
   * Backend: GET api/schoolmaps/spaces/{buildingId}
   */
  getSchoolSpaces(buildingId: string): Observable<SchoolSpaceData[]> {
    try {
      this.errorHandler.validateString(buildingId, 'معرف المبنى');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'getSchoolSpaces');
      return throwError(() => error);
    }

    return this.http.get<SchoolSpaceData[]>(`${this.baseUrl}/spaces/${buildingId}`).pipe(
      tap(data => console.log(`Fetched ${data.length} school spaces for building ${buildingId}`)),
      catchError(error => this.errorHandler.handleError(error, 'تحميل بيانات الفراغات'))
    );
  }

  /**
   * Get educational building by code
   * Backend: GET api/schoolmaps/educational-buildings/{buildingCode}
   */
  getEducationalBuildingByCode(buildingCode: string): Observable<EducationalBuildingData> {
    try {
      this.errorHandler.validateString(buildingCode, 'رمز المبنى');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'getEducationalBuildingByCode');
      return throwError(() => error);
    }

    return this.http.get<EducationalBuildingData>(`${this.baseUrl}/educational-buildings/${buildingCode}`).pipe(
      tap(data => console.log(`Fetched educational building: ${buildingCode}`, data)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Get all educational buildings
   * Backend: GET api/schoolmaps/educational-buildings
   */
  getAllEducationalBuildings(): Observable<EducationalBuildingData[]> {
    return this.http.get<EducationalBuildingData[]>(`${this.baseUrl}/educational-buildings`).pipe(
      tap(data => console.log(`Fetched ${data.length} educational buildings`)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Add study period
   * Backend: POST api/schoolmaps/study-periods
   */
  addStudyPeriod(data: Omit<StudyPeriodData, 'id'>): Observable<StudyPeriodData> {
    return this.http.post<StudyPeriodData>(`${this.baseUrl}/study-periods`, data).pipe(
      tap(result => console.log('Created study period:', result)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Add school road
   * Backend: POST api/schoolmaps/roads
   */
  addSchoolRoad(data: Omit<SchoolRoadData, 'id'>): Observable<SchoolRoadData> {
    return this.http.post<SchoolRoadData>(`${this.baseUrl}/roads`, data).pipe(
      tap(result => console.log('Created school road:', result)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Add school annex
   * Backend: POST api/schoolmaps/annexes
   */
  addSchoolAnnex(data: Omit<SchoolAnnexData, 'id'>): Observable<SchoolAnnexData> {
    return this.http.post<SchoolAnnexData>(`${this.baseUrl}/annexes`, data).pipe(
      tap(result => console.log('Created school annex:', result)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Add school space
   * Backend: POST api/schoolmaps/spaces
   */
  addSchoolSpace(data: Omit<SchoolSpaceData, 'id'>): Observable<SchoolSpaceData> {
    return this.http.post<SchoolSpaceData>(`${this.baseUrl}/spaces`, data).pipe(
      tap(result => console.log('Created school space:', result)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Create educational building
   * Backend: POST api/schoolmaps/educational-buildings
   */
  createEducationalBuilding(data: Omit<EducationalBuildingData, 'id'>): Observable<EducationalBuildingData> {
    return this.http.post<EducationalBuildingData>(`${this.baseUrl}/educational-buildings`, data).pipe(
      tap(result => console.log('Created educational building:', result)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Update educational building
   * Backend: PUT api/schoolmaps/educational-buildings/{id}
   */
  updateEducationalBuilding(id: string, data: Partial<EducationalBuildingData>): Observable<EducationalBuildingData> {
    try {
      this.errorHandler.validateGuid(id, 'معرف المبنى التعليمي');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'updateEducationalBuilding');
      return throwError(() => error);
    }

    return this.http.put<EducationalBuildingData>(`${this.baseUrl}/educational-buildings/${id}`, data).pipe(
      tap(result => console.log('Updated educational building:', result)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }
}
