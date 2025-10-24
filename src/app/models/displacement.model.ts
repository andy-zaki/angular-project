/**
 * Displacement Data Models
 * Models for building displacement and compensation processes
 */

/**
 * Final Compensation Entry
 * Individual compensation payment record
 */
export interface FinalCompensationEntry {
  id?: string;
  displacementId?: string;
  checkNumber: string;
  value: number;
  date: string;
  recipientName?: string;
  status?: string;
}

/**
 * Display List Entry
 * Property owner information for displacement displays
 */
export interface DisplayListEntry {
  id?: string;
  schoolNumber: string;
  schoolName: string;
  displacementDecisionNumber: string;
  serialId: string;
  ownerName: string;
  propertyArea: number;
  compensationAmount: number;
  displayDate: string;
}

/**
 * Conformity Certificate
 * Certificate of conformity for displaced properties
 */
export interface ConformityCertificate {
  id?: string;
  certificateNumber: string;
  issueDate: string;
  propertyId: string;
  ownerName: string;
  propertyDescription: string;
  conformityStatus: string;
  verifiedBy: string;
}

/**
 * Real Estate Unit
 * Real estate unit information for displacement
 */
export interface RealEstateUnit {
  id?: string;
  unitNumber: string;
  registrationNumber: string;
  area: number;
  location: string;
  ownerName: string;
  ownershipType: string;
  evaluationAmount: number;
  evaluationDate: string;
}

/**
 * Sale Form
 * Property sale form for displacement
 */
export interface SaleForm {
  id?: string;
  formNumber: string;
  submissionDate: string;
  propertyId: string;
  sellerName: string;
  buyerName: string;
  saleAmount: number;
  approvalStatus: string;
}

/**
 * Minister Decision
 * Ministerial decision related to displacement
 */
export interface MinisterDecision {
  id?: string;
  decisionNumber: string;
  decisionDate: string;
  decisionType: string;
  description: string;
  approvedBy: string;
  implementationStatus: string;
}

/**
 * Displacement Process Data
 * Complete displacement process information
 */
export interface DisplacementProcessData {
  id: string;
  schoolNumber: string;
  schoolName: string;
  branchCode: string;
  rentedBuildingCode: string;
  cabinetDecisionNumber: string;
  cabinetDecisionDate: string;
  publicationCount: number;
  publicationDate: string;
  educationProject: string;
  ownersCount: number;
  pricePerMeter: number;
  dateFrom: string;
  dateTo: string;
  formsCount: number;
  status: string;
  createdDate: string;
  lastModifiedDate: string;
}

/**
 * Council Approval Data
 * Council approval information for displacement
 */
export interface CouncilApprovalData {
  id: string;
  displacementId: string;
  councilName: string;
  approvalNumber: string;
  approvalDate: string;
  sessionNumber: string;
  attendees: string[];
  decision: string;
  notes?: string;
}
