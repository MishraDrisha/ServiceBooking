const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create Express app 
const app = express();
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Parker@123',
    database: 'ServiceBookingDB',
});

//Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});

// Create a new service (POST)
app.post('services', (req, res) => {
    const { service_name, price } = req.body;
    const sql = `INSERT INTO services (service_name, price) VALUES (?, ?)`;

    db.query(sql, [service_name, price], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, service_name, price
});
    });
});

// Get all services (GET)
app.get('/serviecs', (req, res) => {
    const sql = `SELECT * FROM services`;
    db.query(sql, (err, result) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

//Update a service (PUT)
app.put('/services/:id', (req, res) => {
    const { id } = req.params;
    const { service_name, price } = req.body;
    const sql = `UPDATE services SET service_name = ?, price = ? WHERE id = ?`;

    db.query(sql, [service_name, price, id], (err, result) =>
{
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Service updated successfully' });
    });
});

// Delete a service (DELETE)
app.delete('/services/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM services WHERE id = ?`;
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Service deleted successfully' });
    });
});

//Create a new appointment ()POST)
app.post('/appointments', (req, res) => {
    const { user_id, service_id, appointment_date } = req.body;
req.body; 
    const sql = `INSERT INTO appointments (user, service_id, appointment_date) VALUES (?, ?, ?)`;
    
    db.query(sql, [user_id, service_id, appointment_date], (err, result) => {
        if (err) return res.status(500).json({ error: err.message }); 
        res.json({ id: result.insertId, user_id, service_id, appointment_date});
    });
}); 

//Get app appointments (GET)
app.get('/appointments', (req, res) => {
    const sql =  
    `SELECT users.name, services.services_name, appointments.appointment_date FROM appointments JOIN users ON appointments.user_id = user.id JOIN services ON appointments.serviecs_id = services.id`;

    db.query(sql, (err, results) => {
        if (err) return res.status(500),json({ error: err.message }); 
        res.json(results);
    });
}); 

//Update an appointment (GET) 
app.put('appointments/:id', (req, res) => {
    const { id }  = req.params;
    const { appointment_date } = req.body;
    const sql = `UPDATE appointments SET appointment-date = ? WHERE id = ?`;

    db.query(sql, [appointment_date, id], (err, result) => {
        if(err) return res.status(500).json({errror: err.message});
        res.json({ message: 'Appointment update successfully'
        });
    });
});

//Delete an appointment (DELETE)
app.delete('//appointments/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM appointments WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message}); 
        res.json({ message: 'Appointment deleted successfully'
});
    });
});

//Start server 
const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
