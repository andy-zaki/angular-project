import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  RentalBuildingInfo,
  RentalBuildingDetails,
  RentalBuildingLocation,
  RentalStatusFlag,
  RentalDecision
} from '../models/rental.model';
import { environment } from '../../environments/environment.development';

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
  private readonly baseUrl = `${environment.apiUrl}/api/rentals`;

  /**
   * Get all rental buildings
   */
  getAllRentalBuildings(): Observable<RentalBuildingDetails[]> {
    return this.http.get<RentalBuildingDetails[]>(this.baseUrl);
  }

  /**
   * Get rental building by identification number
   */
  getRentalBuildingByIdNumber(identificationNumber: string): Observable<RentalBuildingInfo> {
    return this.http.get<RentalBuildingInfo>(`${this.baseUrl}/by-id-number/${identificationNumber}`);
  }

  /**
   * Get rental building by ID
   */
  getRentalBuildingById(id: string): Observable<RentalBuildingDetails> {
    return this.http.get<RentalBuildingDetails>(`${this.baseUrl}/${id}`);
  }

  /**
   * Search rental buildings by criteria
   */
  searchRentalBuildings(criteria: { status?: string; substatus?: string; buildingType?: string }): Observable<RentalBuildingDetails[]> {
    return this.http.post<RentalBuildingDetails[]>(`${this.baseUrl}/search`, criteria);
  }

  /**
   * Create new rental building
   */
  createRentalBuilding(building: Omit<RentalBuildingDetails, 'id'>): Observable<RentalBuildingDetails> {
    return this.http.post<RentalBuildingDetails>(this.baseUrl, building);
  }

  /**
   * Update rental building
   */
  updateRentalBuilding(id: string, building: Partial<RentalBuildingDetails>): Observable<RentalBuildingDetails> {
    return this.http.put<RentalBuildingDetails>(`${this.baseUrl}/${id}`, building);
  }

  /**
   * Delete rental building
   */
  deleteRentalBuilding(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }

  /**
   * Get rental building location
   */
  getRentalBuildingLocation(buildingId: string): Observable<RentalBuildingLocation | null> {
    return this.http.get<RentalBuildingLocation | null>(`${this.baseUrl}/${buildingId}/location`);
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
