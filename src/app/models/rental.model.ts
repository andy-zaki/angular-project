/**
 * Rental Building Info
 * Basic rental building information
 */
export interface RentalBuildingInfo {
  id: string;
  identificationNumber: string;
  name: string;
  status: string;
  substatus: string;
  tenant?: string;
  location?: string;
  monthlyRent?: number;
  contractStartDate?: string;
  contractEndDate?: string;
}

/**
 * Rental Building Details
 * Extended rental building information
 */
export interface RentalBuildingDetails extends RentalBuildingInfo {
  buildingType: string;
  totalArea: number;
  usableArea: number;
  numberOfRooms: number;
  numberOfFloors: number;
  yearBuilt: number;
  lastInspectionDate?: string;
  inspectionStatus?: string;
  maintenanceRequired?: boolean;
}

/**
 * Rental Building Location
 * Geographic and administrative location data
 */
export interface RentalBuildingLocation {
  id: string;
  buildingId: string;
  governorate: string;
  city: string;
  district: string;
  neighborhood: string;
  street: string;
  buildingNumber: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Rental Status Flag
 * Status indicators for rental buildings
 */
export interface RentalStatusFlag {
  id: string;
  code: string;
  label: string;
  category: string;
  isActive: boolean;
}

/**
 * Rental Decision
 * Approval and decision records for rental buildings
 */
export interface RentalDecision {
  id: string;
  buildingId: string;
  decisionNumber: string;
  decisionDate: string;
  decisionType: string;
  approvedBy: string;
  notes?: string;
}
