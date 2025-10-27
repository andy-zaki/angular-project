const express = require('express');
const router = express.Router();
const { sql, getPool } = require('../config/database');

// Get all buildings
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM Buildings ORDER BY CreatedAt DESC');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching buildings:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get building by number
router.get('/by-number/:buildingNumber', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('buildingNumber', sql.NVarChar, req.params.buildingNumber)
      .query('SELECT * FROM Buildings WHERE BuildingNumber = @buildingNumber');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Building not found' });
    }
    
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error fetching building:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get building by ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.UniqueIdentifier, req.params.id)
      .query('SELECT * FROM Buildings WHERE Id = @id');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Building not found' });
    }
    
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error fetching building:', err);
    res.status(500).json({ error: err.message });
  }
});

// Search buildings by criteria
router.post('/search', async (req, res) => {
  try {
    const pool = await getPool();
    const { governorate, stage, affiliation, usageStatus, educationType } = req.body;
    
    let query = 'SELECT * FROM Buildings WHERE 1=1';
    const request = pool.request();
    
    if (governorate) {
      query += ' AND Governorate = @governorate';
      request.input('governorate', sql.NVarChar, governorate);
    }
    if (stage) {
      query += ' AND Stage = @stage';
      request.input('stage', sql.NVarChar, stage);
    }
    if (affiliation) {
      query += ' AND Affiliation = @affiliation';
      request.input('affiliation', sql.NVarChar, affiliation);
    }
    if (usageStatus) {
      query += ' AND UsageStatus = @usageStatus';
      request.input('usageStatus', sql.NVarChar, usageStatus);
    }
    if (educationType) {
      query += ' AND EducationType = @educationType';
      request.input('educationType', sql.NVarChar, educationType);
    }
    
    query += ' ORDER BY CreatedAt DESC';
    
    const result = await request.query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error searching buildings:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create new building
router.post('/', async (req, res) => {
  try {
    const pool = await getPool();
    const building = req.body;
    
    const result = await pool.request()
      .input('buildingNumber', sql.NVarChar, building.buildingNumber)
      .input('schoolName', sql.NVarChar, building.schoolName)
      .input('usageStatus', sql.NVarChar, building.usageStatus)
      .input('affiliation', sql.NVarChar, building.affiliation)
      .input('buildingOwnership', sql.NVarChar, building.buildingOwnership)
      .input('governorate', sql.NVarChar, building.governorate)
      .input('regionalCenter', sql.NVarChar, building.regionalCenter)
      .input('educationalAdministration', sql.NVarChar, building.educationalAdministration)
      .input('district', sql.NVarChar, building.district)
      .input('neighborhood', sql.NVarChar, building.neighborhood)
      .input('stage', sql.NVarChar, building.stage)
      .input('educationType', sql.NVarChar, building.educationType)
      .query(`
        INSERT INTO Buildings (
          BuildingNumber, SchoolName, UsageStatus, Affiliation, BuildingOwnership,
          Governorate, RegionalCenter, EducationalAdministration, District, Neighborhood,
          Stage, EducationType
        ) OUTPUT INSERTED.* VALUES (
          @buildingNumber, @schoolName, @usageStatus, @affiliation, @buildingOwnership,
          @governorate, @regionalCenter, @educationalAdministration, @district, @neighborhood,
          @stage, @educationType
        )
      `);
    
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error('Error creating building:', err);
    res.status(500).json({ error: err.message });
  }
});

// Update building
router.put('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const building = req.body;
    
    const result = await pool.request()
      .input('id', sql.UniqueIdentifier, req.params.id)
      .input('buildingNumber', sql.NVarChar, building.buildingNumber)
      .input('schoolName', sql.NVarChar, building.schoolName)
      .input('usageStatus', sql.NVarChar, building.usageStatus)
      .input('affiliation', sql.NVarChar, building.affiliation)
      .input('buildingOwnership', sql.NVarChar, building.buildingOwnership)
      .input('governorate', sql.NVarChar, building.governorate)
      .input('stage', sql.NVarChar, building.stage)
      .query(`
        UPDATE Buildings SET
          BuildingNumber = @buildingNumber,
          SchoolName = @schoolName,
          UsageStatus = @usageStatus,
          Affiliation = @affiliation,
          BuildingOwnership = @buildingOwnership,
          Governorate = @governorate,
          Stage = @stage,
          UpdatedAt = GETDATE()
        OUTPUT INSERTED.*
        WHERE Id = @id
      `);
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Building not found' });
    }
    
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error updating building:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete building
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.UniqueIdentifier, req.params.id)
      .query('DELETE FROM Buildings WHERE Id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Building not found' });
    }
    
    res.json({ message: 'Building deleted successfully' });
  } catch (err) {
    console.error('Error deleting building:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get building basic data
router.get('/:buildingNumber/basic-data', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('buildingNumber', sql.NVarChar, req.params.buildingNumber)
      .query('SELECT * FROM BuildingBasicData WHERE BuildingNumber = @buildingNumber');
    
    res.json(result.recordset[0] || null);
  } catch (err) {
    console.error('Error fetching building basic data:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get building annexes
router.get('/:buildingId/annexes', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('buildingId', sql.UniqueIdentifier, req.params.buildingId)
      .query('SELECT * FROM BuildingAnnexes WHERE BuildingId = @buildingId');
    
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching building annexes:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get network costs for building
router.get('/:buildingId/network-costs', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('buildingId', sql.UniqueIdentifier, req.params.buildingId)
      .query('SELECT * FROM NetworkCosts WHERE BuildingId = @buildingId');
    
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching network costs:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add building basic data
router.post('/:buildingNumber/basic-data', async (req, res) => {
  try {
    const pool = await getPool();
    const data = req.body;
    
    const result = await pool.request()
      .input('buildingNumber', sql.NVarChar, req.params.buildingNumber)
      .input('schoolName', sql.NVarChar, data.schoolName)
      .input('buildingName', sql.NVarChar, data.buildingName)
      .input('landArea', sql.Decimal(18, 2), data.landArea)
      .input('builtArea', sql.Decimal(18, 2), data.builtArea)
      .input('floors', sql.Int, data.floors)
      .input('constructionYear', sql.Int, data.constructionYear)
      .input('lastMaintenanceYear', sql.Int, data.lastMaintenanceYear)
      .input('buildingCondition', sql.NVarChar, data.buildingCondition)
      .input('ownershipType', sql.NVarChar, data.ownershipType)
      .input('rentalStatus', sql.NVarChar, data.rentalStatus)
      .query(`
        INSERT INTO BuildingBasicData (
          BuildingNumber, SchoolName, BuildingName, LandArea, BuiltArea, Floors,
          ConstructionYear, LastMaintenanceYear, BuildingCondition, OwnershipType, RentalStatus
        ) OUTPUT INSERTED.* VALUES (
          @buildingNumber, @schoolName, @buildingName, @landArea, @builtArea, @floors,
          @constructionYear, @lastMaintenanceYear, @buildingCondition, @ownershipType, @rentalStatus
        )
      `);
    
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error('Error adding building basic data:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add building annex
router.post('/:buildingId/annexes', async (req, res) => {
  try {
    const pool = await getPool();
    const annex = req.body;
    
    const result = await pool.request()
      .input('buildingId', sql.UniqueIdentifier, req.params.buildingId)
      .input('annexType', sql.NVarChar, annex.annexType)
      .input('area', sql.Decimal(18, 2), annex.area)
      .input('constructionYear', sql.Int, annex.constructionYear)
      .input('condition', sql.NVarChar, annex.condition)
      .input('purpose', sql.NVarChar, annex.purpose)
      .query(`
        INSERT INTO BuildingAnnexes (BuildingId, AnnexType, Area, ConstructionYear, Condition, Purpose)
        OUTPUT INSERTED.*
        VALUES (@buildingId, @annexType, @area, @constructionYear, @condition, @purpose)
      `);
    
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error('Error adding building annex:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add network costs
router.post('/:buildingId/network-costs', async (req, res) => {
  try {
    const pool = await getPool();
    const cost = req.body;
    
    const result = await pool.request()
      .input('buildingId', sql.UniqueIdentifier, req.params.buildingId)
      .input('networkType', sql.NVarChar, cost.networkType)
      .input('installationCost', sql.Decimal(18, 2), cost.installationCost)
      .input('maintenanceCost', sql.Decimal(18, 2), cost.maintenanceCost)
      .input('installationDate', sql.Date, cost.installationDate)
      .input('provider', sql.NVarChar, cost.provider)
      .input('contractNumber', sql.NVarChar, cost.contractNumber)
      .query(`
        INSERT INTO NetworkCosts (
          BuildingId, NetworkType, InstallationCost, MaintenanceCost, 
          InstallationDate, Provider, ContractNumber
        ) OUTPUT INSERTED.* VALUES (
          @buildingId, @networkType, @installationCost, @maintenanceCost,
          @installationDate, @provider, @contractNumber
        )
      `);
    
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error('Error adding network costs:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
