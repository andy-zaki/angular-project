import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DisplacementProcessData,
  FinalCompensationEntry,
  CouncilApprovalData
} from '../models/displacement.model';
import { environment } from '../../environments/environment.development';

/**
 * Displacement API Service
 * Handles HTTP requests for displacement and compensation data
 * Replaces MockDisplacementDatabaseService with real database integration
 */
@Injectable({
  providedIn: 'root'
})
export class DisplacementApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/displacements`;

  /**
   * Get all displacement records
   */
  getAllDisplacementRecords(): Observable<DisplacementProcessData[]> {
    return this.http.get<DisplacementProcessData[]>(this.baseUrl);
  }

  /**
   * Get displacement by reference number
   */
  getDisplacementByReferenceNumber(referenceNumber: string): Observable<DisplacementProcessData> {
    return this.http.get<DisplacementProcessData>(`${this.baseUrl}/by-reference/${referenceNumber}`);
  }

  /**
   * Get displacement by ID
   */
  getDisplacementById(id: string): Observable<DisplacementProcessData> {
    return this.http.get<DisplacementProcessData>(`${this.baseUrl}/${id}`);
  }

  /**
   * Search displacements by criteria
   */
  searchDisplacements(criteria: { buildingCode?: string; displacementType?: string; status?: string }): Observable<DisplacementProcessData[]> {
    return this.http.post<DisplacementProcessData[]>(`${this.baseUrl}/search`, criteria);
  }

  /**
   * Create displacement record
   */
  createDisplacement(data: Omit<DisplacementProcessData, 'id'>): Observable<DisplacementProcessData> {
    return this.http.post<DisplacementProcessData>(this.baseUrl, data);
  }

  /**
   * Update displacement record
   */
  updateDisplacement(id: string, data: Partial<DisplacementProcessData>): Observable<DisplacementProcessData> {
    return this.http.put<DisplacementProcessData>(`${this.baseUrl}/${id}`, data);
  }

  /**
   * Delete displacement record
   */
  deleteDisplacement(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }

  /**
   * Get compensation records for displacement
   */
  getCompensationRecords(displacementId: string): Observable<FinalCompensationEntry[]> {
    return this.http.get<FinalCompensationEntry[]>(`${this.baseUrl}/${displacementId}/compensation`);
  }

  /**
   * Get council approvals for displacement
   */
  getCouncilApprovals(displacementId: string): Observable<CouncilApprovalData[]> {
    return this.http.get<CouncilApprovalData[]>(`${this.baseUrl}/${displacementId}/council-approvals`);
  }

  /**
   * Add compensation record
   */
  addCompensation(displacementId: string, data: Omit<FinalCompensationEntry, 'id' | 'displacementId'>): Observable<FinalCompensationEntry> {
    return this.http.post<FinalCompensationEntry>(`${this.baseUrl}/${displacementId}/compensation`, data);
  }

  /**
   * Add council approval
   */
  addCouncilApproval(displacementId: string, data: Omit<CouncilApprovalData, 'id' | 'displacementId'>): Observable<CouncilApprovalData> {
    return this.http.post<CouncilApprovalData>(`${this.baseUrl}/${displacementId}/council-approvals`, data);
  }
}
