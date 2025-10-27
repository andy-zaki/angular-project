const express = require('express');
const router = express.Router();
const { sql, getPool } = require('../config/database');

// Get study periods by building code
router.get('/study-periods/:buildingCode', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('buildingCode', sql.NVarChar, req.params.buildingCode)
      .query('SELECT * FROM StudyPeriods WHERE BuildingCode = @buildingCode ORDER BY Period');
    
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching study periods:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get school roads by building ID
router.get('/roads/:buildingId', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('buildingId', sql.NVarChar, req.params.buildingId)
      .query('SELECT * FROM SchoolRoads WHERE BuildingId = @buildingId');
    
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching school roads:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get school annexes by building ID
router.get('/annexes/:buildingId', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('buildingId', sql.NVarChar, req.params.buildingId)
      .query('SELECT * FROM SchoolAnnexes WHERE BuildingId = @buildingId');
    
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching school annexes:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get school spaces by building ID
router.get('/spaces/:buildingId', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('buildingId', sql.NVarChar, req.params.buildingId)
      .query('SELECT * FROM SchoolSpaces WHERE BuildingId = @buildingId');
    
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching school spaces:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get educational building by code
router.get('/educational-buildings/:buildingCode', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('buildingCode', sql.NVarChar, req.params.buildingCode)
      .query('SELECT * FROM EducationalBuildings WHERE BuildingCode = @buildingCode');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Educational building not found' });
    }
    
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error fetching educational building:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get all educational buildings
router.get('/educational-buildings', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .query('SELECT * FROM EducationalBuildings ORDER BY BuildingName');
    
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching educational buildings:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add study period
router.post('/study-periods', async (req, res) => {
  try {
    const pool = await getPool();
    const data = req.body;
    
    const result = await pool.request()
      .input('buildingCode', sql.NVarChar, data.buildingCode)
      .input('schoolName', sql.NVarChar, data.schoolName)
      .input('period', sql.NVarChar, data.period)
      .input('studentCount', sql.Int, data.studentCount)
      .input('classroomCount', sql.Int, data.classroomCount)
      .input('teacherCount', sql.Int, data.teacherCount)
      .input('educationalLevel', sql.NVarChar, data.educationalLevel)
      .query(`
        INSERT INTO StudyPeriods (
          BuildingCode, SchoolName, Period, StudentCount, ClassroomCount,
          TeacherCount, EducationalLevel
        ) OUTPUT INSERTED.* VALUES (
          @buildingCode, @schoolName, @period, @studentCount, @classroomCount,
          @teacherCount, @educationalLevel
        )
      `);
    
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error('Error adding study period:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add school road
router.post('/roads', async (req, res) => {
  try {
    const pool = await getPool();
    const data = req.body;
    
    const result = await pool.request()
      .input('buildingId', sql.NVarChar, data.buildingId)
      .input('direction', sql.NVarChar, data.direction)
      .input('roadName', sql.NVarChar, data.roadName)
      .input('roadWidth', sql.Decimal(10, 2), data.roadWidth)
      .input('roadType', sql.NVarChar, data.roadType)
      .input('condition', sql.NVarChar, data.condition)
      .query(`
        INSERT INTO SchoolRoads (BuildingId, Direction, RoadName, RoadWidth, RoadType, Condition)
        OUTPUT INSERTED.*
        VALUES (@buildingId, @direction, @roadName, @roadWidth, @roadType, @condition)
      `);
    
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error('Error adding school road:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add school annex
router.post('/annexes', async (req, res) => {
  try {
    const pool = await getPool();
    const data = req.body;
    
    const result = await pool.request()
      .input('buildingId', sql.NVarChar, data.buildingId)
      .input('annexType', sql.NVarChar, data.annexType)
      .input('area', sql.Decimal(18, 2), data.area)
      .input('capacity', sql.Int, data.capacity)
      .input('condition', sql.NVarChar, data.condition)
      .input('purpose', sql.NVarChar, data.purpose)
      .query(`
        INSERT INTO SchoolAnnexes (BuildingId, AnnexType, Area, Capacity, Condition, Purpose)
        OUTPUT INSERTED.*
        VALUES (@buildingId, @annexType, @area, @capacity, @condition, @purpose)
      `);
    
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error('Error adding school annex:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add school space
router.post('/spaces', async (req, res) => {
  try {
    const pool = await getPool();
    const data = req.body;
    
    const result = await pool.request()
      .input('buildingId', sql.NVarChar, data.buildingId)
      .input('spaceType', sql.NVarChar, data.spaceType)
      .input('area', sql.Decimal(18, 2), data.area)
      .input('quantity', sql.Int, data.quantity)
      .input('condition', sql.NVarChar, data.condition)
      .input('usage', sql.NVarChar, data.usage)
      .query(`
        INSERT INTO SchoolSpaces (BuildingId, SpaceType, Area, Quantity, Condition, Usage)
        OUTPUT INSERTED.*
        VALUES (@buildingId, @spaceType, @area, @quantity, @condition, @usage)
      `);
    
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error('Error adding school space:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create educational building
router.post('/educational-buildings', async (req, res) => {
  try {
    const pool = await getPool();
    const data = req.body;
    
    const result = await pool.request()
      .input('buildingCode', sql.NVarChar, data.buildingCode)
      .input('buildingName', sql.NVarChar, data.buildingName)
      .input('educationType', sql.NVarChar, data.educationType)
      .input('buildingStatus', sql.NVarChar, data.buildingStatus)
      .input('totalArea', sql.Decimal(18, 2), data.totalArea)
      .input('numberOfClassrooms', sql.Int, data.numberOfClassrooms)
      .input('numberOfLabs', sql.Int, data.numberOfLabs)
      .input('hasLibrary', sql.Bit, data.hasLibrary ? 1 : 0)
      .input('hasGym', sql.Bit, data.hasGym ? 1 : 0)
      .input('hasCafeteria', sql.Bit, data.hasCafeteria ? 1 : 0)
      .input('constructionYear', sql.Int, data.constructionYear)
      .input('lastRenovationYear', sql.Int, data.lastRenovationYear)
      .query(`
        INSERT INTO EducationalBuildings (
          BuildingCode, BuildingName, EducationType, BuildingStatus, TotalArea,
          NumberOfClassrooms, NumberOfLabs, HasLibrary, HasGym, HasCafeteria,
          ConstructionYear, LastRenovationYear
        ) OUTPUT INSERTED.* VALUES (
          @buildingCode, @buildingName, @educationType, @buildingStatus, @totalArea,
          @numberOfClassrooms, @numberOfLabs, @hasLibrary, @hasGym, @hasCafeteria,
          @constructionYear, @lastRenovationYear
        )
      `);
    
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error('Error creating educational building:', err);
    res.status(500).json({ error: err.message });
  }
});

// Update educational building
router.put('/educational-buildings/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const data = req.body;
    
    const result = await pool.request()
      .input('id', sql.UniqueIdentifier, req.params.id)
      .input('buildingName', sql.NVarChar, data.buildingName)
      .input('buildingStatus', sql.NVarChar, data.buildingStatus)
      .input('totalArea', sql.Decimal(18, 2), data.totalArea)
      .input('numberOfClassrooms', sql.Int, data.numberOfClassrooms)
      .query(`
        UPDATE EducationalBuildings SET
          BuildingName = @buildingName,
          BuildingStatus = @buildingStatus,
          TotalArea = @totalArea,
          NumberOfClassrooms = @numberOfClassrooms,
          UpdatedAt = GETDATE()
        OUTPUT INSERTED.*
        WHERE Id = @id
      `);
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Educational building not found' });
    }
    
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error updating educational building:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
