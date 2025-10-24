import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {
  FinalCompensationEntry,
  DisplayListEntry,
  ConformityCertificate,
  RealEstateUnit,
  SaleForm,
  MinisterDecision,
  DisplacementProcessData,
  CouncilApprovalData
} from '../models/displacement.model';

/**
 * Mock Displacement Database Service
 * Simulates database operations for displacement and compensation data
 * 
 * MIGRATION NOTE: Replace this service with actual HTTP calls to your backend API
 * See DATABASE_INTEGRATION.md for detailed migration instructions
 */
@Injectable({
  providedIn: 'root'
})
export class MockDisplacementDatabaseService {
  private displacementProcesses: DisplacementProcessData[] = [];
  private compensationEntries: FinalCompensationEntry[] = [];
  private displayLists: DisplayListEntry[] = [];
  private certificates: ConformityCertificate[] = [];
  private realEstateUnits: RealEstateUnit[] = [];
  private saleForms: SaleForm[] = [];
  private ministerDecisions: MinisterDecision[] = [];
  private councilApprovals: CouncilApprovalData[] = [];

  constructor() {
    this.initializeMockData();
  }

  /**
   * Get displacement process by school number
   * @param schoolNumber - School identification number
   * @returns Observable of displacement process data
   */
  getDisplacementProcess(schoolNumber: string): Observable<DisplacementProcessData | null> {
    const process = this.displacementProcesses.find(p => p.schoolNumber === schoolNumber);
    return of(process || this.generateDisplacementProcess(schoolNumber)).pipe(delay(400));
  }

  /**
   * Get all displacement processes
   * @returns Observable of all processes
   */
  getAllDisplacementProcesses(): Observable<DisplacementProcessData[]> {
    return of(this.displacementProcesses).pipe(delay(500));
  }

  /**
   * Get compensation entries for a displacement
   * @param displacementId - Displacement ID
   * @returns Observable of compensation entries
   */
  getCompensationEntries(displacementId: string): Observable<FinalCompensationEntry[]> {
    const entries = this.compensationEntries.filter(e => e.displacementId === displacementId);
    return of(entries.length > 0 ? entries : this.generateCompensationEntries(displacementId)).pipe(delay(300));
  }

  /**
   * Get display list entries
   * @param displacementId - Displacement ID
   * @returns Observable of display list entries
   */
  getDisplayListEntries(displacementId: string): Observable<DisplayListEntry[]> {
    const entries = this.displayLists.filter(e => e.id === displacementId);
    return of(entries.length > 0 ? entries : this.generateDisplayListEntries()).pipe(delay(300));
  }

  /**
   * Get conformity certificates
   * @param displacementId - Displacement ID
   * @returns Observable of certificates
   */
  getConformityCertificates(displacementId: string): Observable<ConformityCertificate[]> {
    const certs = this.certificates.filter(c => c.id === displacementId);
    return of(certs.length > 0 ? certs : this.generateCertificates()).pipe(delay(300));
  }

  /**
   * Get real estate units
   * @param displacementId - Displacement ID
   * @returns Observable of real estate units
   */
  getRealEstateUnits(displacementId: string): Observable<RealEstateUnit[]> {
    const units = this.realEstateUnits.filter(u => u.id === displacementId);
    return of(units.length > 0 ? units : this.generateRealEstateUnits()).pipe(delay(300));
  }

  /**
   * Get sale forms
   * @param displacementId - Displacement ID
   * @returns Observable of sale forms
   */
  getSaleForms(displacementId: string): Observable<SaleForm[]> {
    const forms = this.saleForms.filter(f => f.id === displacementId);
    return of(forms.length > 0 ? forms : this.generateSaleForms()).pipe(delay(300));
  }

  /**
   * Get minister decisions
   * @param displacementId - Displacement ID
   * @returns Observable of minister decisions
   */
  getMinisterDecisions(displacementId: string): Observable<MinisterDecision[]> {
    const decisions = this.ministerDecisions.filter(d => d.id === displacementId);
    return of(decisions.length > 0 ? decisions : this.generateMinisterDecisions()).pipe(delay(300));
  }

  /**
   * Get council approvals
   * @param displacementId - Displacement ID
   * @returns Observable of council approvals
   */
  getCouncilApprovals(displacementId: string): Observable<CouncilApprovalData[]> {
    const approvals = this.councilApprovals.filter(a => a.displacementId === displacementId);
    return of(approvals.length > 0 ? approvals : this.generateCouncilApprovals(displacementId)).pipe(delay(300));
  }

  /**
   * Save displacement process
   * @param process - Process data to save
   * @returns Observable of saved process
   */
  saveDisplacementProcess(process: DisplacementProcessData): Observable<DisplacementProcessData> {
    const index = this.displacementProcesses.findIndex(p => p.id === process.id);
    if (index >= 0) {
      this.displacementProcesses[index] = process;
    } else {
      this.displacementProcesses.push(process);
    }
    return of(process).pipe(delay(400));
  }

  /**
   * Save compensation entry
   * @param entry - Compensation entry to save
   * @returns Observable of saved entry
   */
  saveCompensationEntry(entry: FinalCompensationEntry): Observable<FinalCompensationEntry> {
    if (!entry.id) {
      entry.id = `COMP-${Date.now()}`;
      this.compensationEntries.push(entry);
    } else {
      const index = this.compensationEntries.findIndex(e => e.id === entry.id);
      if (index >= 0) {
        this.compensationEntries[index] = entry;
      }
    }
    return of(entry).pipe(delay(300));
  }

  // Private methods for generating mock data

  private initializeMockData(): void {
    this.displacementProcesses = [
      this.generateDisplacementProcess('12345'),
      this.generateDisplacementProcess('12346'),
    ];
  }

  private generateDisplacementProcess(schoolNumber: string): DisplacementProcessData {
    return {
      id: `DISP-${Date.now()}`,
      schoolNumber,
      schoolName: this.randomChoice([
        'مدرسة النور الابتدائية',
        'مدرسة الأمل الإعدادية',
        'مدرسة الرازي الثانوية'
      ]),
      branchCode: `BR-${Math.floor(Math.random() * 1000)}`,
      rentedBuildingCode: `RBC-${Math.floor(Math.random() * 10000)}`,
      cabinetDecisionNumber: `CAB-${Math.floor(Math.random() * 10000)}`,
      cabinetDecisionDate: this.randomDate(2020, 2024),
      publicationCount: Math.floor(Math.random() * 5) + 1,
      publicationDate: this.randomDate(2021, 2024),
      educationProject: this.randomChoice([
        'مشروع التوسعة التعليمية',
        'مشروع تطوير المباني',
        'مشروع البنية التحتية'
      ]),
      ownersCount: Math.floor(Math.random() * 20) + 5,
      pricePerMeter: Math.floor(Math.random() * 2000) + 500,
      dateFrom: this.randomDate(2022, 2023),
      dateTo: this.randomDate(2024, 2025),
      formsCount: Math.floor(Math.random() * 50) + 10,
      status: this.randomChoice(['قيد المعالجة', 'مكتمل', 'معلق', 'قيد المراجعة']),
      createdDate: this.randomDate(2020, 2023),
      lastModifiedDate: this.randomDate(2023, 2024)
    };
  }

  private generateCompensationEntries(displacementId: string): FinalCompensationEntry[] {
    const count = Math.floor(Math.random() * 5) + 2;
    return Array.from({ length: count }, (_, i) => ({
      id: `COMP-${Date.now()}-${i}`,
      displacementId,
      checkNumber: `CHK-${Math.floor(Math.random() * 100000)}`,
      value: Math.floor(Math.random() * 500000) + 100000,
      date: this.randomDate(2022, 2024),
      recipientName: this.randomChoice([
        'عبدالله محمد',
        'أحمد سعيد',
        'محمد علي',
        'سعيد أحمد',
        'علي حسن'
      ]),
      status: this.randomChoice(['مدفوع', 'قيد الصرف', 'معلق'])
    }));
  }

  private generateDisplayListEntries(): DisplayListEntry[] {
    const count = Math.floor(Math.random() * 4) + 2;
    return Array.from({ length: count }, (_, i) => ({
      id: `DL-${Date.now()}-${i}`,
      schoolNumber: '12345',
      schoolName: 'مدرسة النور الابتدائية',
      displacementDecisionNumber: `DD-${Math.floor(Math.random() * 10000)}`,
      serialId: `SER-${1000 + i}`,
      ownerName: this.randomChoice([
        'عبدالله محمد',
        'أحمد سعيد',
        'محمد علي',
        'سعيد أحمد'
      ]),
      propertyArea: Math.floor(Math.random() * 1000) + 200,
      compensationAmount: Math.floor(Math.random() * 1000000) + 200000,
      displayDate: this.randomDate(2023, 2024)
    }));
  }

  private generateCertificates(): ConformityCertificate[] {
    const count = Math.floor(Math.random() * 3) + 1;
    return Array.from({ length: count }, (_, i) => ({
      id: `CERT-${Date.now()}-${i}`,
      certificateNumber: `CN-${Math.floor(Math.random() * 10000)}`,
      issueDate: this.randomDate(2022, 2024),
      propertyId: `PROP-${Math.floor(Math.random() * 10000)}`,
      ownerName: this.randomChoice(['عبدالله محمد', 'أحمد سعيد', 'محمد علي']),
      propertyDescription: 'أرض سكنية',
      conformityStatus: this.randomChoice(['مطابق', 'غير مطابق', 'قيد المراجعة']),
      verifiedBy: this.randomChoice(['المهندس أحمد', 'المهندس محمد', 'المهندس عبدالله'])
    }));
  }

  private generateRealEstateUnits(): RealEstateUnit[] {
    const count = Math.floor(Math.random() * 3) + 1;
    return Array.from({ length: count }, (_, i) => ({
      id: `REU-${Date.now()}-${i}`,
      unitNumber: `UN-${Math.floor(Math.random() * 10000)}`,
      registrationNumber: `RN-${Math.floor(Math.random() * 100000)}`,
      area: Math.floor(Math.random() * 1000) + 200,
      location: this.randomChoice(['الرياض', 'جدة', 'الدمام', 'مكة']),
      ownerName: this.randomChoice(['عبدالله محمد', 'أحمد سعيد', 'محمد علي']),
      ownershipType: this.randomChoice(['فردية', 'مشتركة', 'حكومية']),
      evaluationAmount: Math.floor(Math.random() * 2000000) + 500000,
      evaluationDate: this.randomDate(2022, 2024)
    }));
  }

  private generateSaleForms(): SaleForm[] {
    const count = Math.floor(Math.random() * 4) + 2;
    return Array.from({ length: count }, (_, i) => ({
      id: `SF-${Date.now()}-${i}`,
      formNumber: `FN-${Math.floor(Math.random() * 10000)}`,
      submissionDate: this.randomDate(2022, 2024),
      propertyId: `PROP-${Math.floor(Math.random() * 10000)}`,
      sellerName: this.randomChoice(['عبدالله محمد', 'أحمد سعيد', 'محمد علي']),
      buyerName: 'وزارة التعليم',
      saleAmount: Math.floor(Math.random() * 1500000) + 500000,
      approvalStatus: this.randomChoice(['معتمد', 'قيد المراجعة', 'مرفوض'])
    }));
  }

  private generateMinisterDecisions(): MinisterDecision[] {
    const count = Math.floor(Math.random() * 2) + 1;
    return Array.from({ length: count }, (_, i) => ({
      id: `MD-${Date.now()}-${i}`,
      decisionNumber: `DN-${Math.floor(Math.random() * 10000)}`,
      decisionDate: this.randomDate(2021, 2024),
      decisionType: this.randomChoice(['موافقة نزع ملكية', 'موافقة تعويض', 'قرار إداري']),
      description: 'قرار بشأن نزع ملكية للمصلحة العامة',
      approvedBy: 'معالي الوزير',
      implementationStatus: this.randomChoice(['منفذ', 'قيد التنفيذ', 'معلق'])
    }));
  }

  private generateCouncilApprovals(displacementId: string): CouncilApprovalData[] {
    const count = Math.floor(Math.random() * 2) + 1;
    return Array.from({ length: count }, (_, i) => ({
      id: `CA-${Date.now()}-${i}`,
      displacementId,
      councilName: this.randomChoice([
        'مجلس الإدارة',
        'المجلس البلدي',
        'اللجنة العليا'
      ]),
      approvalNumber: `AN-${Math.floor(Math.random() * 10000)}`,
      approvalDate: this.randomDate(2022, 2024),
      sessionNumber: `${Math.floor(Math.random() * 100) + 1}`,
      attendees: [
        'رئيس المجلس',
        'نائب الرئيس',
        'الأعضاء',
        'المستشار القانوني'
      ],
      decision: this.randomChoice(['موافق', 'موافق بشروط', 'مرفوض', 'محول للدراسة']),
      notes: this.randomChoice(['لا يوجد', 'يتطلب متابعة', 'معتمد حسب الأصول'])
    }));
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
