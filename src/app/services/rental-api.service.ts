import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  RentalBuildingInfo,
  RentalBuildingDetails,
  RentalBuildingLocation,
  RentalStatusFlag,
  RentalDecision
} from '../models/rental.model';
import { environment } from '../../environments/environment.development';
import { ErrorHandlerService } from './error-handler.service';

/**
 * Rental API Service
 * Handles HTTP requests for rental building data
 * Replaces MockRentalDatabaseService with real database integration
 */
@Injectable({
  providedIn: 'root'
})
export class RentalApiService {
  private readonly http = inject(HttpClient);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly baseUrl = `${environment.apiUrl}/api/rentals`;

  /**
   * Get all rental buildings
   */
  getAllRentalBuildings(): Observable<RentalBuildingDetails[]> {
    return this.http.get<RentalBuildingDetails[]>(this.baseUrl).pipe(
      catchError(error => this.errorHandler.handleError(error, 'تحميل قائمة المباني المستأجرة'))
    );
  }

  /**
   * Get rental building by identification number
   */
  getRentalBuildingByIdNumber(identificationNumber: string): Observable<RentalBuildingInfo> {
    return this.http.get<RentalBuildingInfo>(`${this.baseUrl}/by-id-number/${identificationNumber}`).pipe(
      catchError(error => this.errorHandler.handleError(error, `البحث عن مبنى مستأجر برقم: ${identificationNumber}`))
    );
  }

  /**
   * Get rental building by ID
   */
  getRentalBuildingById(id: string): Observable<RentalBuildingDetails> {
    return this.http.get<RentalBuildingDetails>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => this.errorHandler.handleError(error, 'تحميل بيانات المبنى المستأجر'))
    );
  }

  /**
   * Search rental buildings by criteria
   */
  searchRentalBuildings(criteria: { status?: string; substatus?: string; buildingType?: string }): Observable<RentalBuildingDetails[]> {
    return this.http.post<RentalBuildingDetails[]>(`${this.baseUrl}/search`, criteria).pipe(
      catchError(error => this.errorHandler.handleError(error, 'البحث عن المباني المستأجرة'))
    );
  }

  /**
   * Create new rental building
   */
  createRentalBuilding(building: Omit<RentalBuildingDetails, 'id'>): Observable<RentalBuildingDetails> {
    return this.http.post<RentalBuildingDetails>(this.baseUrl, building).pipe(
      catchError(error => this.errorHandler.handleError(error, 'إضافة مبنى مستأجر جديد'))
    );
  }

  /**
   * Update rental building
   */
  updateRentalBuilding(id: string, building: Partial<RentalBuildingDetails>): Observable<RentalBuildingDetails> {
    return this.http.put<RentalBuildingDetails>(`${this.baseUrl}/${id}`, building).pipe(
      catchError(error => this.errorHandler.handleError(error, 'تحديث بيانات المبنى المستأجر'))
    );
  }

  /**
   * Delete rental building
   */
  deleteRentalBuilding(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => this.errorHandler.handleError(error, 'حذف المبنى المستأجر'))
    );
  }

  /**
   * Get rental building location
   */
  getRentalBuildingLocation(buildingId: string): Observable<RentalBuildingLocation | null> {
    return this.http.get<RentalBuildingLocation | null>(`${this.baseUrl}/${buildingId}/location`).pipe(
      catchError(error => this.errorHandler.handleError(error, 'تحميل موقع المبنى المستأجر'))
    );
  }

  /**
   * Get rental decisions for building
   */
  getRentalDecisions(buildingId: string): Observable<RentalDecision[]> {
    return this.http.get<RentalDecision[]>(`${this.baseUrl}/${buildingId}/decisions`);
  }

  /**
   * Get all rental status flags
   */
  getRentalStatusFlags(): Observable<RentalStatusFlag[]> {
    return this.http.get<RentalStatusFlag[]>(`${this.baseUrl}/status-flags/all`);
  }

  /**
   * Add rental building location
   */
  addRentalBuildingLocation(buildingId: string, location: Omit<RentalBuildingLocation, 'id' | 'buildingId'>): Observable<RentalBuildingLocation> {
    return this.http.post<RentalBuildingLocation>(`${this.baseUrl}/${buildingId}/location`, location);
  }
}
