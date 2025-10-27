import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  BuildingData,
  BuildingBasicData,
  BuildingAnnexData,
  NetworkCostsData
} from '../models/building.model';
import { environment } from '../../environments/environment';

/**
 * Building API Service
 * Handles HTTP requests for building-related data
 * Replaces MockBuildingDatabaseService with real database integration
 */
@Injectable({
  providedIn: 'root'
})
export class BuildingApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/buildings`;

  /**
   * Get all buildings
   */
  getAllBuildings(): Observable<BuildingData[]> {
    return this.http.get<BuildingData[]>(this.baseUrl);
  }

  /**
   * Get building by number
   */
  getBuildingByNumber(buildingNumber: string): Observable<BuildingData> {
    return this.http.get<BuildingData>(`${this.baseUrl}/by-number/${buildingNumber}`);
  }

  /**
   * Get building by ID
   */
  getBuildingById(id: string): Observable<BuildingData> {
    return this.http.get<BuildingData>(`${this.baseUrl}/${id}`);
  }

  /**
   * Search buildings by criteria
   */
  searchBuildings(criteria: Partial<BuildingData>): Observable<BuildingData[]> {
    return this.http.post<BuildingData[]>(`${this.baseUrl}/search`, criteria);
  }

  /**
   * Create new building
   */
  createBuilding(building: Omit<BuildingData, 'id'>): Observable<BuildingData> {
    return this.http.post<BuildingData>(this.baseUrl, building);
  }

  /**
   * Update building
   */
  updateBuilding(id: string, building: Partial<BuildingData>): Observable<BuildingData> {
    return this.http.put<BuildingData>(`${this.baseUrl}/${id}`, building);
  }

  /**
   * Delete building
   */
  deleteBuilding(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }

  /**
   * Get building basic data
   */
  getBuildingBasicData(buildingNumber: string): Observable<BuildingBasicData | null> {
    return this.http.get<BuildingBasicData | null>(`${this.baseUrl}/${buildingNumber}/basic-data`);
  }

  /**
   * Get building annexes
   */
  getBuildingAnnexes(buildingId: string): Observable<BuildingAnnexData[]> {
    return this.http.get<BuildingAnnexData[]>(`${this.baseUrl}/${buildingId}/annexes`);
  }

  /**
   * Get network costs for a building
   */
  getNetworkCosts(buildingId: string): Observable<NetworkCostsData[]> {
    return this.http.get<NetworkCostsData[]>(`${this.baseUrl}/${buildingId}/network-costs`);
  }

  /**
   * Add building basic data
   */
  addBuildingBasicData(buildingNumber: string, data: Omit<BuildingBasicData, 'id'>): Observable<BuildingBasicData> {
    return this.http.post<BuildingBasicData>(`${this.baseUrl}/${buildingNumber}/basic-data`, data);
  }

  /**
   * Add building annex
   */
  addBuildingAnnex(buildingId: string, annex: Omit<BuildingAnnexData, 'id' | 'buildingId'>): Observable<BuildingAnnexData> {
    return this.http.post<BuildingAnnexData>(`${this.baseUrl}/${buildingId}/annexes`, annex);
  }

  /**
   * Add network costs
   */
  addNetworkCosts(buildingId: string, costs: Omit<NetworkCostsData, 'id' | 'buildingId'>): Observable<NetworkCostsData> {
    return this.http.post<NetworkCostsData>(`${this.baseUrl}/${buildingId}/network-costs`, costs);
  }
}
