import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LandData, BuildingLocationData, LandCoordinates } from '../models/land.model';
import { environment } from '../../environments/environment';
import { ErrorHandlerService } from './error-handler.service';

/**
 * Land API Service
 * Handles HTTP requests for land-related data
 * Replaces MockLandDatabaseService with real database integration
 * 
 * Backend Route: api/lands (matches LandsController)
 */
@Injectable({
  providedIn: 'root'
})
export class LandApiService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly baseUrl = `${environment.apiUrl}/api/lands`;

  /**
   * Get all lands
   * Backend: GET api/lands
   */
  getAllLands(): Observable<LandData[]> {
    return this.http.get<LandData[]>(this.baseUrl).pipe(
      tap(data => console.log(`Fetched ${data.length} lands`)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Get land data by reference number
   * Backend: GET api/lands/reference/{referenceNumber}
   */
  getLandByReferenceNumber(referenceNumber: string): Observable<LandData | null> {
    try {
      this.errorHandler.validateString(referenceNumber, 'الرقم المرجعي');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'getLandByReferenceNumber');
      return throwError(() => error);
    }

    return this.http.get<LandData | null>(`${this.baseUrl}/reference/${referenceNumber}`).pipe(
      tap(data => console.log(`Fetched land by reference: ${referenceNumber}`, data)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Get land by ID
   * Backend: GET api/lands/{id}
   */
  getLandById(id: string): Observable<LandData> {
    try {
      this.errorHandler.validateGuid(id, 'معرف الأرض');
    } catch (error: any) {
      this.errorHandler.logAndShowError(error, 'getLandById');
      return throwError(() => error);
    }

    return this.http.get<LandData>(`${this.baseUrl}/${id}`).pipe(
      tap(data => console.log(`Fetched land by ID: ${id}`, data)),
      catchError(error => this.errorHandler.handleError(error))
    );
  }

  /**
   * Search lands by criteria
   */
  searchLands(criteria: Partial<LandData>): Observable<LandData[]> {
    return this.http.post<LandData[]>(`${this.baseUrl}/search`, criteria);
  }

  /**
   * Create or update land data
   */
  saveLand(land: LandData): Observable<LandData> {
    if (land.id) {
      return this.http.put<LandData>(`${this.baseUrl}/${land.id}`, land);
    } else {
      return this.http.post<LandData>(this.baseUrl, land);
    }
  }

  /**
   * Delete land
   */
  deleteLand(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }

  /**
   * Get building locations for a land parcel
   */
  getBuildingLocationsByLandId(landId: string): Observable<BuildingLocationData[]> {
    return this.http.get<BuildingLocationData[]>(`${this.baseUrl}/${landId}/buildings`);
  }

  /**
   * Get coordinates for a land parcel
   */
  getLandCoordinates(landId: string): Observable<LandCoordinates[]> {
    return this.http.get<LandCoordinates[]>(`${this.baseUrl}/${landId}/coordinates`);
  }

  /**
   * Add coordinates to a land parcel
   */
  addLandCoordinates(landId: string, coordinates: Omit<LandCoordinates, 'id' | 'landId'>): Observable<LandCoordinates> {
    return this.http.post<LandCoordinates>(`${this.baseUrl}/${landId}/coordinates`, coordinates);
  }
}
