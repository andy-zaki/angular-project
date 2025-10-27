const express = require('express');
const router = express.Router();
const { sql, getPool } = require('../config/database');

// Get all rental buildings
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM RentalBuildings ORDER BY CreatedAt DESC');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching rental buildings:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get rental building by identification number
router.get('/by-id-number/:identificationNumber', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('identificationNumber', sql.NVarChar, req.params.identificationNumber)
      .query('SELECT * FROM RentalBuildings WHERE IdentificationNumber = @identificationNumber');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Rental building not found' });
    }
    
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error fetching rental building:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get rental building by ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.UniqueIdentifier, req.params.id)
      .query('SELECT * FROM RentalBuildings WHERE Id = @id');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Rental building not found' });
    }
    
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error fetching rental building:', err);
    res.status(500).json({ error: err.message });
  }
});

// Search rental buildings by criteria
router.post('/search', async (req, res) => {
  try {
    const pool = await getPool();
    const { status, substatus, buildingType } = req.body;
    
    let query = 'SELECT * FROM RentalBuildings WHERE 1=1';
    const request = pool.request();
    
    if (status) {
      query += ' AND Status = @status';
      request.input('status', sql.NVarChar, status);
    }
    if (substatus) {
      query += ' AND Substatus = @substatus';
      request.input('substatus', sql.NVarChar, substatus);
    }
    if (buildingType) {
      query += ' AND BuildingType = @buildingType';
      request.input('buildingType', sql.NVarChar, buildingType);
    }
    
    query += ' ORDER BY CreatedAt DESC';
    
    const result = await request.query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error searching rental buildings:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create new rental building
router.post('/', async (req, res) => {
  try {
    const pool = await getPool();
    const building = req.body;
    
    const result = await pool.request()
      .input('identificationNumber', sql.NVarChar, building.identificationNumber)
      .input('name', sql.NVarChar, building.name)
      .input('status', sql.NVarChar, building.status)
      .input('substatus', sql.NVarChar, building.substatus)
      .input('tenant', sql.NVarChar, building.tenant)
      .input('location', sql.NVarChar, building.location)
      .input('monthlyRent', sql.Decimal(18, 2), building.monthlyRent)
      .input('contractStartDate', sql.Date, building.contractStartDate)
      .input('contractEndDate', sql.Date, building.contractEndDate)
      .input('buildingType', sql.NVarChar, building.buildingType)
      .input('totalArea', sql.Decimal(18, 2), building.totalArea)
      .input('usableArea', sql.Decimal(18, 2), building.usableArea)
      .input('numberOfRooms', sql.Int, building.numberOfRooms)
      .input('numberOfFloors', sql.Int, building.numberOfFloors)
      .input('yearBuilt', sql.Int, building.yearBuilt)
      .query(`
        INSERT INTO RentalBuildings (
          IdentificationNumber, Name, Status, Substatus, Tenant, Location, MonthlyRent,
          ContractStartDate, ContractEndDate, BuildingType, TotalArea, UsableArea,
          NumberOfRooms, NumberOfFloors, YearBuilt
        ) OUTPUT INSERTED.* VALUES (
          @identificationNumber, @name, @status, @substatus, @tenant, @location, @monthlyRent,
          @contractStartDate, @contractEndDate, @buildingType, @totalArea, @usableArea,
          @numberOfRooms, @numberOfFloors, @yearBuilt
        )
      `);
    
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error('Error creating rental building:', err);
    res.status(500).json({ error: err.message });
  }
});

// Update rental building
router.put('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const building = req.body;
    
    const result = await pool.request()
      .input('id', sql.UniqueIdentifier, req.params.id)
      .input('name', sql.NVarChar, building.name)
      .input('status', sql.NVarChar, building.status)
      .input('substatus', sql.NVarChar, building.substatus)
      .input('tenant', sql.NVarChar, building.tenant)
      .input('monthlyRent', sql.Decimal(18, 2), building.monthlyRent)
      .query(`
        UPDATE RentalBuildings SET
          Name = @name,
          Status = @status,
          Substatus = @substatus,
          Tenant = @tenant,
          MonthlyRent = @monthlyRent,
          UpdatedAt = GETDATE()
        OUTPUT INSERTED.*
        WHERE Id = @id
      `);
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Rental building not found' });
    }
    
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error updating rental building:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete rental building
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.UniqueIdentifier, req.params.id)
      .query('DELETE FROM RentalBuildings WHERE Id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Rental building not found' });
    }
    
    res.json({ message: 'Rental building deleted successfully' });
  } catch (err) {
    console.error('Error deleting rental building:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get rental building location
router.get('/:buildingId/location', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('buildingId', sql.UniqueIdentifier, req.params.buildingId)
      .query('SELECT * FROM RentalBuildingLocations WHERE BuildingId = @buildingId');
    
    res.json(result.recordset[0] || null);
  } catch (err) {
    console.error('Error fetching rental building location:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get rental decisions for building
router.get('/:buildingId/decisions', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('buildingId', sql.UniqueIdentifier, req.params.buildingId)
      .query('SELECT * FROM RentalDecisions WHERE BuildingId = @buildingId ORDER BY DecisionDate DESC');
    
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching rental decisions:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get all rental status flags
router.get('/status-flags/all', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .query('SELECT * FROM RentalStatusFlags WHERE IsActive = 1 ORDER BY Category, Label');
    
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching rental status flags:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add rental building location
router.post('/:buildingId/location', async (req, res) => {
  try {
    const pool = await getPool();
    const location = req.body;
    
    const result = await pool.request()
      .input('buildingId', sql.UniqueIdentifier, req.params.buildingId)
      .input('governorate', sql.NVarChar, location.governorate)
      .input('city', sql.NVarChar, location.city)
      .input('district', sql.NVarChar, location.district)
      .input('neighborhood', sql.NVarChar, location.neighborhood)
      .input('street', sql.NVarChar, location.street)
      .input('buildingNumber', sql.NVarChar, location.buildingNumber)
      .input('postalCode', sql.NVarChar, location.postalCode)
      .input('latitude', sql.Decimal(10, 8), location.latitude)
      .input('longitude', sql.Decimal(11, 8), location.longitude)
      .query(`
        INSERT INTO RentalBuildingLocations (
          BuildingId, Governorate, City, District, Neighborhood, Street,
          BuildingNumber, PostalCode, Latitude, Longitude
        ) OUTPUT INSERTED.* VALUES (
          @buildingId, @governorate, @city, @district, @neighborhood, @street,
          @buildingNumber, @postalCode, @latitude, @longitude
        )
      `);
    
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error('Error adding rental building location:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
