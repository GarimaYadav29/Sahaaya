const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();
const path = require('path');





// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));






// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'garimasdatabase@123',
    database: 'sahaaya_db'
});







// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});





// Welcome route
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});





// Signup_don route
app.get('/signup_don', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup_don.html'));
});

app.post('/signup_don', async (req, res) => {
    console.log('Incoming request body:', req.body);
    const { name, email_id, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    console.log('Received signup data of donor:', { name, email_id, password });

    const query = 'INSERT INTO donors (name, email_id, password) VALUES (?, ?, ?)';
    connection.query(query, [name, email_id, hashedPassword], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ message: 'Donor already exists, login instead.' });
        }
        res.json({ message: 'Donor registered successfully! You can now login.' });
    });
});

// Login_don route
app.get('/login_don', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login_don.html'));
});

app.post('/login_don', (req, res) => {
    const { name, password } = req.body;
    console.log('Incoming login data:', req.body);
    const query = 'SELECT * FROM donors WHERE name = ?';

    connection.query(query, [name], async (err, results) => {
        if (err) {
            console.log(err);
            return res.send('Server Error');
        }

        if (results.length === 0) {
            return res.json({ message: 'Donor not found' });
        }

        const donors = results[0];
        const isPasswordValid = await bcrypt.compare(password, donors.password);

        if (!isPasswordValid) {
            return res.json({ message: 'Incorrect password' });
        }
        console.log('Donor logged in successfully');
        res.json({ redirect: '/donor' });
    });
});

app.get('/donor', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'donor.html'));
});






// Signup_rec route
app.get('/signup_rec', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup_rec.html'));
});

app.post('/signup_rec', async (req, res) => {
    console.log('Incoming request body:', req.body);
    const { name, email_id, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);

    console.log('Received signup data of recipient:', { name, email_id, password });

    const query = 'INSERT INTO recipients (name, email_id, password) VALUES (?, ?, ?)';
    connection.query(query, [name, email_id, hashedPassword], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ message: 'Recipient already exists, login instead.' });
        }
        res.json({ message: 'Recipient registered successfully! You can now login.' });
    });
});

// Login_rec route
app.get('/login_rec', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login_rec.html'));
});

app.post('/login_rec', (req, res) => {
    const { name, password } = req.body;
    console.log('Incoming login data:', req.body);
    const query = 'SELECT * FROM recipients WHERE name = ?';

    connection.query(query, [name], async (err, results) => {
        if (err) {
            console.log(err);
            return res.send('Server Error');
        }

        if (results.length === 0) {
            return res.json({ message: 'Recipient not found' });
        }

        const recipients = results[0];
        const isPasswordValid = await bcrypt.compare(password, recipients.password);

        if (!isPasswordValid) {
            return res.json({ message: 'Incorrect password' });
        }
        console.log('Recipient logged in successfully');
        res.json({ redirect: '/recipient' });
    });
});

app.get('/recipient', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'recipient.html'));
});








// GET route for food donation page
app.get('/donate_food', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'donate_food.html'));
});

// POST route for food donation
app.post('/donate_food', (req, res) => {
    const {
        food_item_name,
        quantity,
        item_type,
        donor_name,
        street_address,
        city,
        state,
        pincode,
        phone_number
    } = req.body;

    const food_donationsQuery = "INSERT INTO food_donations(food_item_name, quantity, item_type, donor_name, street_address, city, state, pincode, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(food_donationsQuery, [
        food_item_name,
        quantity,
        item_type,
        donor_name,
        street_address,
        city,
        state,
        pincode,
        phone_number
    ], (err, result) => {
        if (err) {
            console.error("Error occurred while saving donation details:", err);
            return res.json({ message: 'Error saving donor details' });
        }

        console.log("Food donation details saved successfully!", result);
        res.json({ message: 'Food donation details saved successfully!', redirect: 'food_requests' });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'food_request.html'));
});

// GET route for fetching all food donation details
app.get('/food_donations', (req, res) => {
    const { state, city, pincode } = req.query;

    let query = "SELECT * FROM food_donations WHERE 1=1";
    const params = [];

    if (state) {
        query += " AND state = ?";
        params.push(state);
    }
    if (city) {
        query += " AND city = ?";
        params.push(city);
    }
    if (pincode) {
        query += " AND pincode = ?";
        params.push(pincode);
    }

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error("Error fetching food donations:", err);
            return res.status(500).json({ message: 'Error fetching food donations' });
        }
        res.json(results);
    });
});

app.post('/accept_request', (req, res) => {
    const { 
        receiver_name, 
        receiver_phone, 
        receiver_address, 
        receiver_city, 
        receiver_state, 
        receiver_pincode 
    } = req.body;

    console.log("Received data:", req.body);

    // Insert recipient details into the 'food_don_receiver' table
    const insertReceiverQuery = `
        INSERT INTO food_don_receiver (receiver_name, receiver_phone, receiver_address, receiver_city, receiver_state, receiver_pincode )
        VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(insertReceiverQuery, [
        receiver_name, 
        receiver_phone, 
        receiver_address, 
        receiver_city, 
        receiver_state, 
        receiver_pincode 
    ], (err, result) => {
        if (err) {
            console.error("Error saving recipient details:", err);
            return res.status(500).json({ message: 'Error saving recipient details', error: err });
        }
            res.json({ message: 'Request accepted successfully!' });
    });
});

// GET route to fetch recipient details from food_don_receiver table
app.get('/accepted_requests', (req, res) => {
    const fetchAcceptedRequestsQuery = "SELECT * FROM food_don_receiver";

    connection.query(fetchAcceptedRequestsQuery, (err, results) => {
        if (err) {
            console.error("Error fetching accepted requests:", err);
            return res.status(500).json({ message: 'Error fetching accepted requests' });
        }
        res.json(results);
    });
});







// GET route for book donation page
app.get('/donate_books', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'donate_books.html'));
});

// POST route for book donation
app.post('/donate_books', (req, res) => {
    const {
        book_name,
        genre,
        author,
        quantity,
        book_condition,
        age_group,
        donor_name,
        address,
        city,
        state,
        pincode,
        phone_number
    } = req.body;

    const book_donationsQuery = "INSERT INTO book_donations(book_name, genre,author,quantity,book_condition,age_group,donor_name,address,city,state,pincode,phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)";

    connection.query(book_donationsQuery, [
        book_name,
        genre,
        author,
        quantity,
        book_condition,
        age_group,
        donor_name,
        address,
        city,
        state,
        pincode,
        phone_number
    ], (err, result) => {
        if (err) {
            console.error("Error occurred while saving donation details:", err);
            return res.json({ message: 'Error saving donor details' });
        }

        console.log("book donation details saved successfully!", result);
        res.json({ message: 'book donation details saved successfully!', redirect: 'books_requests' });
    });
});

// GET route for fetching all book donation details
app.get('/book_donations', (req, res) => {
    const { state, city, pincode } = req.query;

    let query = "SELECT * FROM book_donations WHERE 1=1";
    const params = [];

    if (state) {
        query += " AND state = ?";
        params.push(state);
    }
    if (city) {
        query += " AND city = ?";
        params.push(city);
    }
    if (pincode) {
        query += " AND pincode = ?";
        params.push(pincode);
    }

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error("Error fetching food donations:", err);
            return res.status(500).json({ message: 'Error fetching food donations' });
        }
        res.json(results);  // Send filtered results based on the query parameters
    });
});

app.post('/accept_book_request', (req, res) => {
    const { 
        receiver_name, 
        receiver_phone, 
        receiver_address, 
        receiver_city, 
        receiver_state, 
        receiver_pincode 
    } = req.body;

    // Log received data for debugging
    console.log("Received data:", req.body);

    // Insert recipient details into the 'book_don_receiver' table
    const insertbookReceiverQuery = `
        INSERT INTO book_don_receiver (receiver_name, receiver_phone, receiver_address, receiver_city, receiver_state, receiver_pincode )
        VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(insertbookReceiverQuery, [
        receiver_name, 
        receiver_phone, 
        receiver_address, 
        receiver_city, 
        receiver_state, 
        receiver_pincode 
    ], (err, result) => {
        if (err) {
            console.error("Error saving recipient details:", err);
            return res.status(500).json({ message: 'Error saving recipient details', error: err });
        }
            res.json({ message: 'Request accepted successfully!' });
    });
});


// GET route to fetch recipient details from food_don_receiver table
app.get('/accepted_book_requests', (req, res) => {
    const fetchAcceptedbookRequestsQuery = "SELECT * FROM book_don_receiver";

    connection.query(fetchAcceptedbookRequestsQuery, (err, results) => {
        if (err) {
            console.error("Error fetching accepted book requests:", err);
            return res.status(500).json({ message: 'Error fetching accepted book requests' });
        }
        res.json(results);  // Send the results as JSON
    });
});















// GET route for cloth donation page
app.get('/donate_clothes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'donate_clothes.html'));
});

// POST route for food donation
app.post('/donate_clothes', (req, res) => {
    const {
        cloth_name,
        quantity,
        target_group,
        season,
        cloth_condition,
        size,
        donor_name,
        address,
        city,
        state,
        pincode,
        phone
    } = req.body;

    const cloth_donationsQuery = "INSERT INTO cloth_donations(cloth_name,quantity,target_group,season,cloth_condition,size,donor_name,address,city,state,pincode,phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)";

    connection.query(cloth_donationsQuery, [
        cloth_name,
        quantity,
        target_group,
        season,
        cloth_condition,
        size,
        donor_name,
        address,
        city,
        state,
        pincode,
        phone
    ], (err, result) => {
        if (err) {
            console.error("Error occurred while saving donation details:", err);
            return res.json({ message: 'Error saving donor details' });
        }

        console.log("clothes donation details saved successfully!", result);
        res.json({ message: 'clothes donation details saved successfully!', redirect: 'clothes_requests' });
    });
});

// GET route for fetching all cloth donation details
app.get('/cloth_donations', (req, res) => {
    const { state, city, pincode } = req.query;

    let query = "SELECT * FROM cloth_donations WHERE 1=1";
    const params = [];

    if (state) {
        query += " AND state = ?";
        params.push(state);
    }
    if (city) {
        query += " AND city = ?";
        params.push(city);
    }
    if (pincode) {
        query += " AND pincode = ?";
        params.push(pincode);
    }

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error("Error fetching cloth donations:", err);
            return res.status(500).json({ message: 'Error fetching cloth donations' });
        }
        res.json(results);  // Send filtered results based on the query parameters
    });
});

app.post('/accept_cloth_request', (req, res) => {
    const { 
        receiver_name, 
        receiver_phone, 
        receiver_address, 
        receiver_city, 
        receiver_state, 
        receiver_pincode 
    } = req.body;

    // Log received data for debugging
    console.log("Received data:", req.body);

    // Insert recipient details into the 'cloth_don_receiver' table
    const insertclothReceiverQuery = `
        INSERT INTO cloth_don_receiver (receiver_name, receiver_phone, receiver_address, receiver_city, receiver_state, receiver_pincode )
        VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(insertclothReceiverQuery, [
        receiver_name, 
        receiver_phone, 
        receiver_address, 
        receiver_city, 
        receiver_state, 
        receiver_pincode 
    ], (err, result) => {
        if (err) {
            console.error("Error saving cloth recipient details:", err);
            return res.status(500).json({ message: 'Error saving cloth recipient details', error: err });
        }
            res.json({ message: 'Request accepted successfully!' });
    });
});

// GET route to fetch recipient details from cloth_don_receiver table
app.get('/accepted_cloth_requests', (req, res) => {
    const fetchAcceptedclothRequestsQuery = "SELECT * FROM cloth_don_receiver";

    connection.query(fetchAcceptedclothRequestsQuery, (err, results) => {
        if (err) {
            console.error("Error fetching accepted cloth requests:", err);
            return res.status(500).json({ message: 'Error fetching accepted cloth requests' });
        }
        res.json(results);  // Send the results as JSON
    });
});





// Start the server
app.listen(5502, () => {
    console.log('Server running on localhost:5502');
});