import express from 'express'
const app = express();
const port = 3000;
import axios from 'axios';
import db from './tmp/rates.db.js';
//parse body for creating records
import md5 from 'md5';
//swagger UI
import customizedSwaggerUI from './swagger.js'; // or .json
import swaggerUi from 'swagger-ui-express';

import bodyParser from 'body-parser';
import fetch from 'node-fetch';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(customizedSwaggerUI));


app.post('/api', async (req, res) => {
    const response = await fetch('https://open.er-api.com/v6/latest');
    const currencies = await response.json();
    const updated_at = new Date(currencies.time_next_update_utc).getTime();
    const created_at = new Date(currencies.time_last_update_utc).getTime();
    var sql = `INSERT INTO currency (BASE_CODE, USD, EUR, GBP, CNY, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    var params = [currencies.base_code, currencies.rates.USD, currencies.rates.EUR, currencies.rates.GBP, currencies.rates.CNY,
        created_at, updated_at];
    let errors = []
    if (!params.length > 4) {
        errors.forEach((e) => {
            errors.push("No " + e + " is spefied!")
        })
    } else if (errors.length) {
        res.status(400).json({ error: errors.join(',') });
        return;
    } else {
        //create record
        db.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: currencies.result,
                id: this.lastID,
            });
        });
    }
});

app.get('/api', async (req, res) => {
    var sql = 'select * from currency';
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        const { id, BASE_CODE, USD, EUR, GBP, CNY, created_at } = rows[0]
        const date = new Date(created_at).toDateString()
        const time = new Date(created_at).toLocaleTimeString();
        res.json({
            message: 'success',
            data: { id, BASE_CODE, USD, EUR, GBP, CNY, time: date + "-" + time },
            data1: rows[0].created_at
        });
    });
});



app.get('/api/users', (req, res, next) => {
    var sql = 'select * from user';
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows,
        });
    });
});

app.get('/api/user/:id', (req, res, next) => {
    var sql = 'select * from user where id = ?';
    var params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row,
        });
    });
});

app.post('/api/users/', (req, res, next) => {
    var errors = [];
    if (!req.body.password) {
        errors.push('No password specified');
    }
    if (!req.body.email) {
        errors.push('No email specified');
    }
    if (errors.length) {
        res.status(400).json({ error: errors.join(',') });
        return;
    }
    var data = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password),
    };
    var sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
    var params = [data.name, data.email, data.password];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: data,
            id: this.lastID,
        });
    });
});

app.put('/api/user/:id', (req, res, next) => {
    var data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password ? md5(req.body.password) : null,
    };
    db.run(
        `UPDATE user set 
         name = COALESCE(?,name), 
         email = COALESCE(?,email), 
         password = COALESCE(?,password) 
         WHERE id = ?`,
        [data.name, data.email, data.password, req.params.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ error: res.message });
                return;
            }
            res.json({
                message: 'success',
                data: data,
                changes: this.changes,
            });
        }
    );
});

app.delete('/api/user/:id', (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ error: res.message });
                return;
            }
            res.json({ message: 'deleted', changes: this.changes });
        }
    );
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
