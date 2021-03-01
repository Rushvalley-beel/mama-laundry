#!javascript

// Import Modules
const fs = require('fs');
const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Load Sub-Directory
app.use(express.static('source'));
app.use('/bash', express.static(__dirname + 'source/bash'));
app.use('/css', express.static(__dirname + 'source/css'));
app.use('/js', express.static(__dirname + 'source/js'));

app.use(express.static('asset'));
app.use('/images', express.static(__dirname + 'asset/images'));
app.use('/fonts', express.static(__dirname + 'asset/fonts'));
app.use('/vendor', express.static(__dirname + 'asset/vendor'));

app.use(express.static('database'));

// Set Page
app.set('views','./page');
app.set('view engine','ejs');

app.get('',(req,res) => {
	res.render('index');
})

// Create Listener : 8080
app.listen(port, () => console.log('[SERVER]: Listening on port ' + port + ' ...'));