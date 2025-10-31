-- Drop dependent tables first
DROP TABLE IF EXISTS StudyPeriods;
DROP TABLE IF EXISTS SchoolRoads;
DROP TABLE IF EXISTS SchoolAnnexes;
DROP TABLE IF EXISTS SchoolSpaces;

-- Drop the main table
DROP TABLE IF EXISTS EducationalBuildings;

PRINT 'Old EducationalBuildings table and related tables dropped successfully';
