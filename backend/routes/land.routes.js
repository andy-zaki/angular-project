const express = require('express');
const router = express.Router();
const { sql, getPool } = require('../config/database');

// Get all lands
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM Lands ORDER BY CreatedAt DESC');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching lands:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get land by reference number
router.get('/by-reference/:referenceNumber', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('referenceNumber', sql.NVarChar, req.params.referenceNumber)
      .query('SELECT * FROM Lands WHERE ReferenceNumber = @referenceNumber');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Land not found' });
    }
    
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error fetching land:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get land by ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.UniqueIdentifier, req.params.id)
      .query('SELECT * FROM Lands WHERE Id = @id');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Land not found' });
    }
    
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error fetching land:', err);
    res.status(500).json({ error: err.message });
  }
});

// Search lands by criteria
router.post('/search', async (req, res) => {
  try {
    const pool = await getPool();
    const { governorate, usageStatus, approvalStatus, phase } = req.body;
    
    let query = 'SELECT * FROM Lands WHERE 1=1';
    const request = pool.request();
    
    if (governorate) {
      query += ' AND Headquarters = @governorate';
      request.input('governorate', sql.NVarChar, governorate);
    }
    if (usageStatus) {
      query += ' AND UsageStatus = @usageStatus';
      request.input('usageStatus', sql.NVarChar, usageStatus);
    }
    if (approvalStatus) {
      query += ' AND ApprovalStatus = @approvalStatus';
      request.input('approvalStatus', sql.NVarChar, approvalStatus);
    }
    if (phase) {
      query += ' AND Phase = @phase';
      request.input('phase', sql.NVarChar, phase);
    }
    
    query += ' ORDER BY CreatedAt DESC';
    
    const result = await request.query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error searching lands:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create new land
router.post('/', async (req, res) => {
  try {
    const pool = await getPool();
    const land = req.body;
    
    const result = await pool.request()
      .input('referenceNumber', sql.NVarChar, land.referenceNumber)
      .input('usageStatus', sql.NVarChar, land.usageStatus)
      .input('headquarters', sql.NVarChar, land.headquarters)
      .input('approvalStatus', sql.NVarChar, land.approvalStatus)
      .input('identificationNumber', sql.NVarChar, land.identificationNumber)
      .input('centerDepartment', sql.NVarChar, land.centerDepartment)
      .input('totalArea', sql.Decimal(18, 2), land.totalArea)
      .input('phase', sql.NVarChar, land.phase)
      .input('approval', sql.NVarChar, land.approval)
      .input('housing', sql.NVarChar, land.housing)
      .input('committeePricing', sql.NVarChar, land.committeePricing)
      .input('purchasePrice', sql.NVarChar, land.purchasePrice)
      .input('saleNegotiations', sql.NVarChar, land.saleNegotiations)
      .input('landCode', sql.NVarChar, land.landCode)
      .input('village', sql.NVarChar, land.village)
      .input('currentOwner', sql.NVarChar, land.currentOwner)
      .input('originalOwner', sql.NVarChar, land.originalOwner)
      .input('model', sql.NVarChar, land.model)
      .input('documents', sql.NVarChar, land.documents)
      .input('planInfo', sql.NVarChar, land.plan)
      .input('branchNotification', sql.NVarChar, land.branchNotification)
      .input('realEstateStatus', sql.NVarChar, land.realEstateStatus)
      .query(`
        INSERT INTO Lands (
          ReferenceNumber, UsageStatus, Headquarters, ApprovalStatus, IdentificationNumber,
          CenterDepartment, TotalArea, Phase, Approval, Housing, CommitteePricing,
          PurchasePrice, SaleNegotiations, LandCode, Village, CurrentOwner, OriginalOwner,
          Model, Documents, PlanInfo, BranchNotification, RealEstateStatus
        ) OUTPUT INSERTED.* VALUES (
          @referenceNumber, @usageStatus, @headquarters, @approvalStatus, @identificationNumber,
          @centerDepartment, @totalArea, @phase, @approval, @housing, @committeePricing,
          @purchasePrice, @saleNegotiations, @landCode, @village, @currentOwner, @originalOwner,
          @model, @documents, @planInfo, @branchNotification, @realEstateStatus
        )
      `);
    
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error('Error creating land:', err);
    res.status(500).json({ error: err.message });
  }
});

// Update land
router.put('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const land = req.body;
    
    const result = await pool.request()
      .input('id', sql.UniqueIdentifier, req.params.id)
      .input('referenceNumber', sql.NVarChar, land.referenceNumber)
      .input('usageStatus', sql.NVarChar, land.usageStatus)
      .input('headquarters', sql.NVarChar, land.headquarters)
      .input('approvalStatus', sql.NVarChar, land.approvalStatus)
      .input('identificationNumber', sql.NVarChar, land.identificationNumber)
      .input('centerDepartment', sql.NVarChar, land.centerDepartment)
      .input('totalArea', sql.Decimal(18, 2), land.totalArea)
      .input('phase', sql.NVarChar, land.phase)
      .query(`
        UPDATE Lands SET
          ReferenceNumber = @referenceNumber,
          UsageStatus = @usageStatus,
          Headquarters = @headquarters,
          ApprovalStatus = @approvalStatus,
          IdentificationNumber = @identificationNumber,
          CenterDepartment = @centerDepartment,
          TotalArea = @totalArea,
          Phase = @phase,
          UpdatedAt = GETDATE()
        OUTPUT INSERTED.*
        WHERE Id = @id
      `);
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Land not found' });
    }
    
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error updating land:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete land
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.UniqueIdentifier, req.params.id)
      .query('DELETE FROM Lands WHERE Id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Land not found' });
    }
    
    res.json({ message: 'Land deleted successfully' });
  } catch (err) {
    console.error('Error deleting land:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get building locations for a land
router.get('/:landId/buildings', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('landId', sql.UniqueIdentifier, req.params.landId)
      .query('SELECT * FROM BuildingLocations WHERE LandId = @landId');
    
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching building locations:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get coordinates for a land
router.get('/:landId/coordinates', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('landId', sql.UniqueIdentifier, req.params.landId)
      .query('SELECT * FROM LandCoordinates WHERE LandId = @landId ORDER BY PointNumber');
    
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching land coordinates:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add coordinates to a land
router.post('/:landId/coordinates', async (req, res) => {
  try {
    const pool = await getPool();
    const { pointNumber, latitude, longitude, elevation } = req.body;
    
    const result = await pool.request()
      .input('landId', sql.UniqueIdentifier, req.params.landId)
      .input('pointNumber', sql.Int, pointNumber)
      .input('latitude', sql.Decimal(10, 8), latitude)
      .input('longitude', sql.Decimal(11, 8), longitude)
      .input('elevation', sql.Decimal(10, 2), elevation)
      .query(`
        INSERT INTO LandCoordinates (LandId, PointNumber, Latitude, Longitude, Elevation)
        OUTPUT INSERTED.*
        VALUES (@landId, @pointNumber, @latitude, @longitude, @elevation)
      `);
    
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error('Error adding land coordinates:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
