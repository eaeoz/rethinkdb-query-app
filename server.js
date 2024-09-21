require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const r = require('rethinkdb');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const XLSX = require('xlsx');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to RethinkDB
const rethinkdbHost = process.env.RETHINKDB_HOST || 'localhost'; // Use environment variable
r.connect({ host: rethinkdbHost, port: 28015, db: 'test' }, (err, connection) => {
    if (err) throw err;
    conn = connection;
    console.log('Connected to RethinkDB');
});


// Read queries from the queries.txt file
const queries = {};
const queryLines = fs.readFileSync('queries.txt', 'utf-8').split('\n').map(line => line.trim()).filter(line => line);

for (let i = 0; i < queryLines.length; i += 2) {
    const queryName = queryLines[i];
    const queryString = queryLines[i + 1];

    // Ensure both query name and query string exist
    if (queryString !== undefined) {
        queries[queryName] = queryString;
    }
}

// Home route
app.get('/', (req, res) => {
    res.render('index', { queries: Object.keys(queries) });
});

// Query route
app.post('/run-query', (req, res) => {
    const queryType = req.body.queryType;
    let queryString;

    if (queryType === 'list') {
        const selectedQuery = req.body.query;
        queryString = queries[selectedQuery];
    } else {
        queryString = req.body.manualQuery;
    }

    if (queryString) {
        // Evaluate the query string to get a RethinkDB query object
        const query = eval(queryString);

        // Execute the query
        query.run(conn, (err, cursor) => {
            if (err) return res.status(500).send(err.message);
            cursor.toArray((err, data) => {
                if (err) return res.status(500).send(err.message);
                res.render('results', { data });
            });
        });
    } else {
        return res.status(400).send('Invalid query selected.');
    }
});


app.get('/download-excel', (req, res) => {
    const data = JSON.parse(req.query.data);
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Query Results");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    res.setHeader('Content-Disposition', 'attachment; filename=query_results.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(excelBuffer);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
