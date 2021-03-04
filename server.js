#!javascript

// Import Modules & Dependencies
//------------------------------------------
const fs = require('fs');
const http = require('http');
const express = require('express');
const path = require('path');
const bash_exec = require('shelljs');
const app = express();
const route = require('route');
const moment = require('moment');
const exp = require('./server.js')

// Load Sub-Directory
//------------------------------------------
app.use(express.static('source'));
app.use('/bash', express.static(__dirname + 'source/bash'));
app.use('/css', express.static(__dirname + 'source/css'));
app.use('/js', express.static(__dirname + 'source/js'));

app.use(express.static('asset'));
app.use('/images', express.static(__dirname + 'asset/images'));
app.use('/fonts', express.static(__dirname + 'asset/fonts'));
app.use('/vendor', express.static(__dirname + 'asset/vendor'));

app.use(express.static('database'));
app.use(express.static('node_modules'));

// Set Page
//------------------------------------------
app.set('views','./page');
app.set('view engine','ejs');
app.use(express.urlencoded({extended: false}));

app.get('/',(req,res) => {
	res.render('index');
});

app.get('/login', (req,res) => {
	res.render('login');
});

app.get('/register', (req,res) => {
	res.render('register');
});

app.get('/test', (req,res) => {
	res.render('test')
})

app.post('/login', (req,res) => {

});

app.post('/register', (req,res) => {
	const timestamp = moment().format('l') + ', ' + moment().format('LTS');
	const prod_arr = {'1':'Laundry & Dry Cleaning','2':'Super Chemical Laundry','3':'Stationery & Le Mineral'};	
	const item_ldry_arr = {'1':'Pakaian','2':'Sprei S','3':'Sprei S Full-set','4':'Sprei M','5':'Sprei M Full-set','6':'Sprei XL','7':'Sprei XL Full-set','8':'Bedcover S','9':'Bedcover M','10':'Bedcover XL','11':'Jas / Kebaya','12':'Invent. Mushola','13':'Hordeng','14':'Vitrase'};
	const srvc_ldry_arr = {'1':'Cuci Reg','2':'Cuci Exp','3':'Setrika Reg','4':'Setrika Exp','5':'Dry Clean Reg','6':'Dry Clean Exp'};

	var cust_name = req.body["in-custname"].toUpperCase();
	var cust_phone = req.body["in-phonenum"];
	var prod_val = req.body["li-prodtype"];
	var prod_name = prod_arr[prod_val].toUpperCase();
	global.order_no = bash_exec.exec('cat database/counter_ldry', { silent: true});
	order_no = order_no.split('\n');
	order_no = ('0000'+order_no[0]).slice(-5);
	shared_order = {value: order_no};
	console.log(shared_order.value)
	console.log('');
	console.log('[transct] order no. : #' + order_no);
	console.log('[transct] timestamp : ' + timestamp);
	console.log('[transct] customer  : ' + cust_name);
	console.log('[transct] phone     : ' + cust_phone);
	console.log('[transct] --------  : --------');			
	console.log('[transct] product   : ' + prod_name);
	switch(prod_val) {
		case '1':
			var check_in = req.body["in-laundry-checkin"].toUpperCase();
			var check_out = req.body["in-laundry-checkout"].toUpperCase();
			var countr_item = req.body["ctr_ldry"];
			var x = 0;
			console.log('[transct] deadline  : ' + check_in + ' -- ' + check_out);
			console.log('[transct] --------  : --------');
			for (var j = 0; j <= countr_item; j++) {
				try {
					var baseprice = req.body['in-laundry-baseprice'+j];					
					var qty_val = req.body['in-laundry-qty-conv'+j];
					var toteach_val = req.body['in-laundry-totaleach'+j];					
					var item_val = req.body['li-laundry-itemtype'+j];
					var srvc_val = req.body['li-laundry-servicetype'+j];
					var item_name = item_ldry_arr[item_val].toUpperCase();
					var srvc_name = srvc_ldry_arr[srvc_val].toUpperCase();
					++x;
					var ctr = ('0'+x).slice(-2);			
					console.log('[transct] -- ' + ctr + ' --  : ' + item_name + ' (' + srvc_name + ') | ' + qty_val + 'x ' + baseprice + '  >>  ' + toteach_val);
				} catch(err) {var dump = 0;}
			}
			var totall_val = req.body['in-laundry-totalall'];
			console.log('[transct] --------  : --------');
			console.log('[transct] total     : Rp ' + totall_val);				
			break
	}
	var paid_val = req.body['in-amountpaid'];
	paid_val = parseInt(paid_val).toLocaleString();
	var change_val = req.body['in-amountchange'];
	console.log('[transct] paid      : Rp ' + paid_val);
	console.log('[transct] change    : Rp ' + change_val);
	console.log('');
});

/*app.post('/home', (req,res) => {
	console.log('[SERVER]: Order have been placed');
	res.redirect('../');
})*/

// Create Listener : 8080
//------------------------------------------
const port = 8080;
app.listen(port, () => console.log('[nodemon] listening on port ' + port + ' ...'));

// Scripting Counter
//------------------------------------------
