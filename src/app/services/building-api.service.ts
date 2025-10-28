import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  BuildingData,
  BuildingBasicData,
  BuildingAnnexData,
  NetworkCostsData
} from '../models/building.model';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';

/**
 * Building API Service
 * Handles HTTP requests for building-related data
 * Replaces MockBuildingDatabaseService with real database integration
 * 
 * Backend Route: api/buildings (matches BuildingsController)
 */
@Injectable({
  providedIn: 'root'
})
export class BuildingApiService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly baseUrl = `${environment.apiUrl}/api/buildings`;

  /**
   * Get all buildings
   * Backend: GET api/buildings
   */
  getAllBuildings(): Observable<BuildingData[]> {
    return this.http.get<BuildingData[]>(this.baseUrl).pipe(
      tap(data => console.log(`Fetched ${data.length} buildings`)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Get building by number
   * Backend: GET api/buildings/by-number/{buildingNumber}
   */
  getBuildingByNumber(buildingNumber: string): Observable<BuildingData> {
    try {
      this.errorHandler.validateString(buildingNumber, 'رقم المبنى');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'getBuildingByNumber');
      return throwError(() => error);
    }

    return this.http.get<BuildingData>(`${this.baseUrl}/by-number/${buildingNumber}`).pipe(
      tap(data => console.log(`Fetched building by number: ${buildingNumber}`, data)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Get building by ID
   * Backend: GET api/buildings/{id}
   */
  getBuildingById(id: string): Observable<BuildingData> {
    try {
      this.errorHandler.validateGuid(id, 'معرف المبنى');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'getBuildingById');
      return throwError(() => error);
    }

    return this.http.get<BuildingData>(`${this.baseUrl}/${id}`).pipe(
      tap(data => console.log(`Fetched building by ID: ${id}`, data)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Search buildings by criteria
   * Backend: POST api/buildings/search
   */
  searchBuildings(criteria: Partial<BuildingData>): Observable<BuildingData[]> {
    return this.http.post<BuildingData[]>(`${this.baseUrl}/search`, criteria).pipe(
      tap(data => console.log(`Found ${data.length} buildings matching criteria`)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Create new building
   * Backend: POST api/buildings
   */
  createBuilding(building: Omit<BuildingData, 'id'>): Observable<BuildingData> {
    return this.http.post<BuildingData>(this.baseUrl, building).pipe(
      tap(result => console.log('Created building:', result)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Update building
   * Backend: PUT api/buildings/{id}
   */
  updateBuilding(id: string, building: Partial<BuildingData>): Observable<BuildingData> {
    try {
      this.errorHandler.validateGuid(id, 'معرف المبنى');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'updateBuilding');
      return throwError(() => error);
    }

    return this.http.put<BuildingData>(`${this.baseUrl}/${id}`, building).pipe(
      tap(result => console.log('Updated building:', result)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Delete building
   * Backend: DELETE api/buildings/{id}
   */
  deleteBuilding(id: string): Observable<{ message: string }> {
    try {
      this.errorHandler.validateGuid(id, 'معرف المبنى');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'deleteBuilding');
      return throwError(() => error);
    }

    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`).pipe(
      tap(() => console.log(`Deleted building: ${id}`)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Get building basic data
   * Backend: GET api/buildings/{id}/basic-data
   */
  getBuildingBasicData(buildingId: string): Observable<BuildingBasicData | null> {
    try {
      this.errorHandler.validateGuid(buildingId, 'معرف المبنى');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'getBuildingBasicData');
      return throwError(() => error);
    }

    return this.http.get<BuildingBasicData | null>(`${this.baseUrl}/${buildingId}/basic-data`).pipe(
      tap(data => console.log(`Fetched basic data for building: ${buildingId}`, data)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Get building annexes
   * Backend: GET api/buildings/{id}/annexes
   */
  getBuildingAnnexes(buildingId: string): Observable<BuildingAnnexData[]> {
    try {
      this.errorHandler.validateGuid(buildingId, 'معرف المبنى');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'getBuildingAnnexes');
      return throwError(() => error);
    }

    return this.http.get<BuildingAnnexData[]>(`${this.baseUrl}/${buildingId}/annexes`).pipe(
      tap(data => console.log(`Fetched ${data.length} annexes for building: ${buildingId}`)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Get network costs for a building
   * Backend: GET api/buildings/{id}/network-costs
   */
  getNetworkCosts(buildingId: string): Observable<NetworkCostsData[]> {
    try {
      this.errorHandler.validateGuid(buildingId, 'معرف المبنى');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'getNetworkCosts');
      return throwError(() => error);
    }

    return this.http.get<NetworkCostsData[]>(`${this.baseUrl}/${buildingId}/network-costs`).pipe(
      tap(data => console.log(`Fetched ${data.length} network costs for building: ${buildingId}`)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Add building basic data
   * Backend: POST api/buildings/{id}/basic-data
   */
  addBuildingBasicData(buildingId: string, data: Omit<BuildingBasicData, 'id'>): Observable<BuildingBasicData> {
    try {
      this.errorHandler.validateGuid(buildingId, 'معرف المبنى');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'addBuildingBasicData');
      return throwError(() => error);
    }

    return this.http.post<BuildingBasicData>(`${this.baseUrl}/${buildingId}/basic-data`, data).pipe(
      tap(result => console.log('Created building basic data:', result)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Add building annex
   * Backend: POST api/buildings/{id}/annexes
   */
  addBuildingAnnex(buildingId: string, annex: Omit<BuildingAnnexData, 'id' | 'buildingId'>): Observable<BuildingAnnexData> {
    try {
      this.errorHandler.validateGuid(buildingId, 'معرف المبنى');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'addBuildingAnnex');
      return throwError(() => error);
    }

    return this.http.post<BuildingAnnexData>(`${this.baseUrl}/${buildingId}/annexes`, annex).pipe(
      tap(result => console.log('Created building annex:', result)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Add network costs
   * Backend: POST api/buildings/{id}/network-costs
   */
  addNetworkCosts(buildingId: string, costs: Omit<NetworkCostsData, 'id' | 'buildingId'>): Observable<NetworkCostsData> {
    try {
      this.errorHandler.validateGuid(buildingId, 'معرف المبنى');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'addNetworkCosts');
      return throwError(() => error);
    }

    return this.http.post<NetworkCostsData>(`${this.baseUrl}/${buildingId}/network-costs`, costs).pipe(
      tap(result => console.log('Created network costs:', result)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }
}
