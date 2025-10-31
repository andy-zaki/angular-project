/**
 * Study Period Data
 * Information about school study periods
 */
export interface StudyPeriodData {
  id?: string;
  buildingCode?: string;
  period: string;
  schoolName: string;
  type: string;
  boysCount: number;
  girlsCount: number;
  periodStage: string;
  startTime?: string;
  endTime?: string;
}

/**
 * School Road Data
 * Information about roads surrounding school buildings
 */
export interface SchoolRoadData {
  id: string;
  buildingId: string;
  roadName: string;
  roadType: string; // 'main' | 'secondary' | 'internal'
  roadWidth: number;
  roadCondition: string;
  isPaved: boolean;
  direction: string; // 'north' | 'south' | 'east' | 'west'
}

/**
 * School Annex Data
 * Information about school annexes and extensions
 */
export interface SchoolAnnexData {
  id: string;
  buildingId: string;
  annexName: string;
  annexType: string;
  area: number;
  capacity?: number;
  constructionDate: string;
  purpose: string;
  condition: string;
}

/**
 * School Space Data
 * Information about spaces and rooms within schools
 */
export interface SchoolSpaceData {
  id: string;
  buildingId: string;
  spaceType: string; // 'classroom' | 'lab' | 'library' | 'office' | 'other'
  spaceName: string;
  floor: number;
  area: number;
  capacity?: number;
  currentUse: string;
  condition: string;
  hasAirConditioning: boolean;
  hasProjector: boolean;
}

/**
 * Educational Building Data
 * Comprehensive educational building information
 */
export interface EducationalBuildingData {
  id?: string;
  buildingNumber?: string;
  usageStatus?: string;
  addressNumber?: string;
  street?: string;
  phoneNumber?: string;
  landOwnership?: string;
  buildingOwnership?: string;
  fenceCode?: string;
  fenceHeight?: number;
  fenceCondition?: string;
  northSide?: number;
  southSide?: number;
  eastSide?: number;
  westSide?: number;
  northEast?: number;
  southEast?: number;
  northWest?: number;
  southWest?: number;
  buildingMaterial?: string;
  coordinateX?: number;
  coordinateY?: number;
  coordinateZ?: number;
  positiveEnvironment?: string;
  negativeEnvironment?: string;
}
