const express = require('express');
const router = express.Router();
const { sql, getPool } = require('../config/database');

// Get all displacement records
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .query('SELECT * FROM DisplacementRecords ORDER BY CreatedAt DESC');
    
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching displacement records:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get displacement by reference number
router.get('/by-reference/:referenceNumber', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('referenceNumber', sql.NVarChar, req.params.referenceNumber)
      .query('SELECT * FROM DisplacementRecords WHERE ReferenceNumber = @referenceNumber');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Displacement record not found' });
    }
    
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error fetching displacement record:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get displacement by ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.UniqueIdentifier, req.params.id)
      .query('SELECT * FROM DisplacementRecords WHERE Id = @id');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Displacement record not found' });
    }
    
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error fetching displacement record:', err);
    res.status(500).json({ error: err.message });
  }
});

// Search displacements by criteria
router.post('/search', async (req, res) => {
  try {
    const pool = await getPool();
    const { buildingCode, displacementType, status } = req.body;
    
    let query = 'SELECT * FROM DisplacementRecords WHERE 1=1';
    const request = pool.request();
    
    if (buildingCode) {
      query += ' AND BuildingCode = @buildingCode';
      request.input('buildingCode', sql.NVarChar, buildingCode);
    }
    if (displacementType) {
      query += ' AND DisplacementType = @displacementType';
      request.input('displacementType', sql.NVarChar, displacementType);
    }
    if (status) {
      query += ' AND Status = @status';
      request.input('status', sql.NVarChar, status);
    }
    
    query += ' ORDER BY CreatedAt DESC';
    
    const result = await request.query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error searching displacement records:', err);
    res.status(500).json({ error: err.message });
  }
});

// Create displacement record
router.post('/', async (req, res) => {
  try {
    const pool = await getPool();
    const data = req.body;
    
    const result = await pool.request()
      .input('referenceNumber', sql.NVarChar, data.referenceNumber)
      .input('buildingCode', sql.NVarChar, data.buildingCode)
      .input('displacementType', sql.NVarChar, data.displacementType)
      .input('status', sql.NVarChar, data.status)
      .input('requestDate', sql.Date, data.requestDate)
      .input('approvalDate', sql.Date, data.approvalDate)
      .input('completionDate', sql.Date, data.completionDate)
      .input('reason', sql.NVarChar, data.reason)
      .input('notes', sql.NVarChar, data.notes)
      .query(`
        INSERT INTO DisplacementRecords (
          ReferenceNumber, BuildingCode, DisplacementType, Status, RequestDate,
          ApprovalDate, CompletionDate, Reason, Notes
        ) OUTPUT INSERTED.* VALUES (
          @referenceNumber, @buildingCode, @displacementType, @status, @requestDate,
          @approvalDate, @completionDate, @reason, @notes
        )
      `);
    
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error('Error creating displacement record:', err);
    res.status(500).json({ error: err.message });
  }
});

// Update displacement record
router.put('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const data = req.body;
    
    const result = await pool.request()
      .input('id', sql.UniqueIdentifier, req.params.id)
      .input('status', sql.NVarChar, data.status)
      .input('approvalDate', sql.Date, data.approvalDate)
      .input('completionDate', sql.Date, data.completionDate)
      .input('notes', sql.NVarChar, data.notes)
      .query(`
        UPDATE DisplacementRecords SET
          Status = @status,
          ApprovalDate = @approvalDate,
          CompletionDate = @completionDate,
          Notes = @notes,
          UpdatedAt = GETDATE()
        OUTPUT INSERTED.*
        WHERE Id = @id
      `);
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Displacement record not found' });
    }
    
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error updating displacement record:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete displacement record
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.UniqueIdentifier, req.params.id)
      .query('DELETE FROM DisplacementRecords WHERE Id = @id');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Displacement record not found' });
    }
    
    res.json({ message: 'Displacement record deleted successfully' });
  } catch (err) {
    console.error('Error deleting displacement record:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get compensation records for displacement
router.get('/:displacementId/compensation', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('displacementId', sql.UniqueIdentifier, req.params.displacementId)
      .query('SELECT * FROM DisplacementCompensation WHERE DisplacementId = @displacementId ORDER BY PaymentDate DESC');
    
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching compensation records:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get council approvals for displacement
router.get('/:displacementId/council-approvals', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('displacementId', sql.UniqueIdentifier, req.params.displacementId)
      .query('SELECT * FROM CouncilApprovals WHERE DisplacementId = @displacementId ORDER BY ApprovalDate DESC');
    
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching council approvals:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add compensation record
router.post('/:displacementId/compensation', async (req, res) => {
  try {
    const pool = await getPool();
    const data = req.body;
    
    const result = await pool.request()
      .input('displacementId', sql.UniqueIdentifier, req.params.displacementId)
      .input('compensationType', sql.NVarChar, data.compensationType)
      .input('amount', sql.Decimal(18, 2), data.amount)
      .input('paymentDate', sql.Date, data.paymentDate)
      .input('paymentStatus', sql.NVarChar, data.paymentStatus)
      .input('paymentMethod', sql.NVarChar, data.paymentMethod)
      .input('notes', sql.NVarChar, data.notes)
      .query(`
        INSERT INTO DisplacementCompensation (
          DisplacementId, CompensationType, Amount, PaymentDate, PaymentStatus, PaymentMethod, Notes
        ) OUTPUT INSERTED.* VALUES (
          @displacementId, @compensationType, @amount, @paymentDate, @paymentStatus, @paymentMethod, @notes
        )
      `);
    
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error('Error adding compensation record:', err);
    res.status(500).json({ error: err.message });
  }
});

// Add council approval
router.post('/:displacementId/council-approvals', async (req, res) => {
  try {
    const pool = await getPool();
    const data = req.body;
    
    const result = await pool.request()
      .input('displacementId', sql.UniqueIdentifier, req.params.displacementId)
      .input('councilName', sql.NVarChar, data.councilName)
      .input('approvalNumber', sql.NVarChar, data.approvalNumber)
      .input('approvalDate', sql.Date, data.approvalDate)
      .input('approvalStatus', sql.NVarChar, data.approvalStatus)
      .input('decisionDetails', sql.NVarChar, data.decisionDetails)
      .query(`
        INSERT INTO CouncilApprovals (
          DisplacementId, CouncilName, ApprovalNumber, ApprovalDate, ApprovalStatus, DecisionDetails
        ) OUTPUT INSERTED.* VALUES (
          @displacementId, @councilName, @approvalNumber, @approvalDate, @approvalStatus, @decisionDetails
        )
      `);
    
    res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error('Error adding council approval:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
