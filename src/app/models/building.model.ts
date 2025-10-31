/**
 * Building Data Model
 * Represents educational buildings and their basic information
 */
export interface BuildingData {
  buildingNumber: string;
  schoolName: string;
  usageStatus: string;
  affiliation: string;
  buildingOwnership: string;
  governorate?: string;
  regionalCenter?: string;
  educationalAdministration?: string;
  district?: string;
  neighborhood?: string;
  stage?: string;
  educationType?: string;
  // Additional fields for full display
  usagePeriods?: string;
  gender?: string;
  secondPeriodSchoolName?: string;
  thirdPeriodSchoolName?: string;
  totalStudents?: number;
  boysCount?: number;
  girlsCount?: number;
  landOwnership?: string;
  annexesCount?: number;
  fenceType?: string;
  constructionSystem?: string;
  constructionMethod?: string;
  powerSource?: string;
  sewerageSystem?: string;
  waterSupply?: string;
  classroomsCount?: number;
  educationalSpacesCount?: number;
  hostingStatus?: string;
  complementarySpacesCount?: number;
  directorate?: string;
  village?: string;
  address?: string;
}

/**
 * Building Basic Data
 * Detailed building information for data completion forms
 */
export interface BuildingBasicData {
  buildingNumber: string;
  schoolName: string;
  buildingName: string;
  landArea: number;
  builtArea: number;
  floors: number;
  constructionYear: number;
  lastMaintenanceYear?: number;
  buildingCondition: string;
  ownershipType: string;
  rentalStatus?: string;
  // Additional fields for full display
  usagePeriods?: string;
  gender?: string;
  secondPeriodSchoolName?: string;
  thirdPeriodSchoolName?: string;
  totalStudents?: number;
  boysCount?: number;
  girlsCount?: number;
  landOwnership?: string;
  annexesCount?: number;
  fenceType?: string;
  constructionSystem?: string;
  constructionMethod?: string;
  powerSource?: string;
  sewerageSystem?: string;
  waterSupply?: string;
  classroomsCount?: number;
  educationalSpacesCount?: number;
  hostingStatus?: string;
  complementarySpacesCount?: number;
}

/**
 * Building Annex Data
 * Represents annexes and additional structures
 */
export interface BuildingAnnexData {
  id: string;
  buildingId: string;
  annexType: string;
  area: number;
  constructionYear: number;
  condition: string;
  purpose: string;
}

/**
 * Network Costs Data
 * Represents utilities and infrastructure costs
 */
export interface NetworkCostsData {
  id: string;
  buildingId: string;
  networkType: string; // 'water' | 'electricity' | 'sewage' | 'telecom'
  installationCost: number;
  maintenanceCost: number;
  installationDate: string;
  provider: string;
  contractNumber?: string;
}
