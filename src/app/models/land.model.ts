/**
 * Land Data Model
 * Represents land parcels and their associated information
 */
export interface LandData {
  id: string;
  referenceNumber: string;
  usageStatus: string;
  headquarters: string;
  approvalStatus: string;
  identificationNumber: string;
  centerDepartment: string;
  totalArea: number;
  phase: string;
  approval: string;
  housing: string;
  committeePricing: string;
  purchasePrice: string;
  saleNegotiations: string;
  landCode: string;
  village: string;
  currentOwner: string;
  originalOwner: string;
  model: string;
  documents: string;
  plan: string;
  branchNotification: string;
  realEstateStatus: string;
  
  // Availability fields
  buildingBoundaries: string;
  networkData: string;
  networkObservations: string;
  landAreaFromTotal: string;
  landUseDatabase: string;
  landInspectionDatabase: string;
  landConstructionObstacles: string;
  landCreationObstacles: string;
  landConstructionData: string;
  landReceiptDatabase: string;
  paidAmountsDatabase: string;
  decisionData: string;
  landCommittees: string;
  landFacilities: string;
  landCoordinatesData: string;
  educationalStudies: string;
  landReviewCommittees: string;
}

/**
 * Building Location Data
 * Represents buildings on a land parcel
 */
export interface BuildingLocationData {
  id: string;
  code: string;
  locationName: string;
  coordinates: number;
  status: string;
  requiredStatus: string;
}

/**
 * Land Coordinates
 * Represents coordinate points for a land parcel
 */
export interface LandCoordinates {
  id: string;
  landId: string;
  pointNumber: number;
  latitude: number;
  longitude: number;
  elevation?: number;
}
