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
const mysql = require('mysql');
const exp = require('./server.js');

// Connect MySQL
// -----------------------------------------
const db = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'irsyadndu1ABC',
	database : 'mama_laundry'
});

db.connect((err,) => {
	if(err) {throw err;}
	console.log("[nodemon] mysql is running ...");
});

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
app.use('/notifyjs', express.static(__dirname + 'asset/notifyjs'));

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

app.post('/', (req,res) => {
	var timestamp = moment().format('L') + ', ' + ('0'+moment().format('LTS')).slice(-11); 
	var datestamp = moment().format('L');
	datestamp = datestamp.split('/').join('-');
	timestamp = timestamp.split('/').join('-');
	var datestamp_border = datestamp;
	const prod_arr = {'1':'Laundry & Dry Cleaning','2':'Super Chemical Laundry','3':'Stationery & LeMineral'};	
	const item_ldry_arr = {'1':'Pakaian','2':'Sprei S','3':'Sprei S Full-set','4':'Sprei M','5':'Sprei M Full-set','6':'Sprei XL','7':'Sprei XL Full-set','8':'Bedcover S','9':'Bedcover M','10':'Bedcover XL','11':'Jas / Kebaya','12':'Invent. Mushola','13':'Hordeng','14':'Vitrase'};
	const srvc_ldry_arr = {'1':'Cuci Reg','2':'Cuci Exp','3':'Setrika Reg','4':'Setrika Exp','5':'Dry Clean Reg','6':'Dry Clean Exp'};
	const item_chem_arr = {'1':'Parfum','2':'Pelicin','3':'Pelembut','4':'Deterjen','5':'Pemutih','6':'Pemb. Noda'};
	const liqd_chem_arr = {'1':'Molto B','2':'Ocean F','3':'GGS','4':'Snappy','5':'Paris H','6':'G Rose','7':'Daily','8':'Heavy D','9':'Sour','10':'Emulsifr','11':'Oxpot'};
	const jugg_chem_arr = {'1':'','2':'Jug 1L','3':'Jug 5L'}
	const item_stat_arr = {'1':'Buku Tulis Campus','2':'Pensil Warna Faber-Castelle','3':'Cat Warna Acrylic','4':'Perangko Rp 6.000','5':'Karton / Kertas Kado Roll','6':'Kanvas 40 x 60 cm'};

	var cust_name = req.body["in-custname"].toUpperCase();
	var prefix_name = cust_name;
	prefix_name = prefix_name.split(' ').join('.');	
	while (prefix_name.length < 15) {
		prefix_name += '_';
	}
	var cust_phone = req.body["in-phonenum"];
	var prod_val = req.body["li-prodtype"];
	var prod_alias = "";
	switch(prod_val) {
		case '1':
			prod_alias = 'LDRY';
			break;
		case '2':
			prod_alias = 'CHEM';
			break;
		case '3':
			prod_alias = 'STAT';
			break;
	}
	datestamp += ' ' + prod_alias;

	var prod_name = prod_arr[prod_val].toUpperCase();
	//global.order_no = bash_exec.exec('cat database/counter_ldry', { silent: true});
	//var curdate = bash_exec.exec('date +'"%d_%b_%Y"', { silent: true});
	var order_no = req.body["invoice_ctr"];
	console.log('');
	console.log('['+prefix_name+' '+datestamp+'] invoice   : #' + order_no);
	console.log('['+prefix_name+' '+datestamp+'] timestamp : ' + timestamp);
	console.log('['+prefix_name+' '+datestamp+'] customer  : ' + cust_name);
	console.log('['+prefix_name+' '+datestamp+'] phone     : ' + cust_phone);
	console.log('['+prefix_name+' '+datestamp+'] --------  : --------');			
	console.log('['+prefix_name+' '+datestamp+'] product   : ' + prod_name);

	switch(prod_val) {
		case '1':
			var check_in = req.body["in-laundry-checkin"].toUpperCase();
			var check_out = req.body["in-laundry-checkout"].toUpperCase();
			var countr_item = req.body["ctr_ldry"];
			var x = 0;
			console.log('['+prefix_name+' '+datestamp+'] deadline  : ' + check_in + ' -- ' + check_out);
			console.log('['+prefix_name+' '+datestamp+'] --------  : --------');
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
					console.log('['+prefix_name+' '+datestamp+'] -- ' + ctr + ' --  : ' + item_name + ' (' + srvc_name + ') | ' + qty_val + 'x ' + baseprice + '  >>  ' + toteach_val);
				} catch(err) {var dump = 0;}
			}
			var totall_val = req.body['in-laundry-totalall'];
			console.log('['+prefix_name+' '+datestamp+'] --------  : --------');
			console.log('['+prefix_name+' '+datestamp+'] total     : Rp ' + totall_val);				
			break;
		case '2':
			var countr_item = req.body["ctr_chem"];
			var x = 0;
			console.log('['+prefix_name+' '+datestamp+'] --------  : --------');
			for (var j = 0; j <= countr_item; j++) {
				try {
					var baseprice = req.body['in-chemical-baseprice'+j];
					var qty_val = req.body['in-chemical-qty-conv'+j];
					var toteach_val = req.body['in-chemical-totaleach'+j];
					var item_val = req.body['li-chemical-itemtype'+j];
					var liquid_val = req.body['li-chemical-liquidtype'+j];
					var jug_val = req.body['li-chemical-jugtype'+j];
					var ceil_val = req.body['in-chemical-ceil'+j];
					var jugadd_val = req.body['in-chemical-jugadd'+j];
					var item_name = liqd_chem_arr[item_val].toUpperCase();
					var liquid_name = item_chem_arr[liquid_val].toUpperCase();
					var jug_name = jugg_chem_arr[jug_val].toUpperCase();
					++x;
					var ctr = ('0'+x).slice(-2);			
					console.log('['+prefix_name+' '+datestamp+'] -- ' + ctr + ' --  : ' + item_name + ' (' + liquid_name +') ' + ceil_val + ' ' + jug_name + ' | ' + qty_val + 'x ' + baseprice + ' ' + jugadd_val + ' >> ' + toteach_val);
				} catch(err) {var dump = 0;}
			}
			var totall_val = req.body['in-chemical-totalall'];
			console.log('['+prefix_name+' '+datestamp+'] --------  : --------');
			console.log('['+prefix_name+' '+datestamp+'] total     : Rp ' + totall_val);							
			break;
		case '3':
			var countr_item = req.body["ctr_stat"];
			var x = 0;
			console.log('['+prefix_name+' '+datestamp+'] --------  : --------');
			for (var j = 0; j <= countr_item; j++) {
				try {
					var baseprice = req.body['in-stationery-baseprice'+j];
					var qty_val = req.body['in-stationery-qty-conv'+j];
					var toteach_val = req.body['in-stationery-totaleach'+j];
					var item_val = req.body['li-stationery-itemtype'+j];
					var item_name = item_stat_arr[item_val].toUpperCase();
					++x;
					var ctr = ('0'+x).slice(-2);								
					console.log('['+prefix_name+' '+datestamp+'] -- ' + ctr + ' --  : ' + item_name + ' | ' + qty_val + 'x ' + baseprice + ' >> ' + toteach_val)
				} catch(err) {var dump = 0;}
			}
			var totall_val = req.body['in-stationery-totalall'];
			console.log('['+prefix_name+' '+datestamp+'] --------  : --------');
			console.log('['+prefix_name+' '+datestamp+'] total     : Rp ' + totall_val);					
			break;
	}
	var paid_val = req.body['in-amountpaid'];
	paid_val = parseInt(paid_val).toLocaleString();
	var stat_payment = 'SUCCESS';
	if (paid_val == '0') {
		stat_payment = 'PENDING';
	}
	var change_val = req.body['in-amountchange'];
	console.log('['+prefix_name+' '+datestamp+'] paid      : Rp ' + paid_val);
	console.log('['+prefix_name+' '+datestamp+'] change    : Rp ' + change_val);
	console.log('['+prefix_name+' '+datestamp+'] --------  : --------');	
	console.log('['+prefix_name+' '+datestamp+'] status    : ' + stat_payment);
	console.log('[............... '+datestamp_border+' ....] ==================================================');				
	console.log('');

	let sql = "SELECT * FROM CUST WHERE NAME = '"+cust_name+"';";
	db.query(sql,(err, result) => {
		console.log(result);
		if (result[0] == null) {
			let sql = "INSERT INTO CUST (HASH, NAME, PHONE) VALUES ('C"+order_no+"','"+cust_name+"','"+cust_phone+"');";
			db.query(sql,(err, result) => {
				console.log(result);
			});
		}
		sql = "SELECT HASH FROM CUST WHERE NAME = '"+cust_name+"';";
		db.query(sql,(err, result) => {
			var hash = order_no;		
			var hash_u = result[0].HASH;
			var prod = prod_name;			
			if (prod == "LAUNDRY & DRY CLEANING") {
				var check_in = req.body["in-laundry-checkin"].toUpperCase();
				var check_out = req.body["in-laundry-checkout"].toUpperCase();
			} else {
				var check_in = req.body["in-laundry-checkin"].toUpperCase();
				var check_out = check_in;
			}
			var total = totall_val.replace(',','');
			var paid = paid_val.replace(',','');
			var change = change_val.replace(',','');
			var status = stat_payment;
			sql = "INSERT INTO TRX VALUES ('T"+hash+"','"+hash_u+"',CURRENT_TIMESTAMP(),STR_TO_DATE('"+check_in+"','%d-%m-%Y'),STR_TO_DATE('"+check_out+"','%d-%m-%Y'),'"+prod+"','"+total+".00','"+paid+".00','"+change+".00','"+status+"');";
			db.query(sql,(err,result) => {
				console.log(result);
			});
			switch(prod) {
				case "LAUNDRY & DRY CLEANING":
					var countr_item = req.body["ctr_ldry"];
					for (var j = 0; j <= countr_item; j++) {
						try {
							var hash_t = hash;
							var no_item = j+1;
							var baseprice = req.body['in-laundry-baseprice'+j].replace(',','');					
							var qty_val = req.body['in-laundry-qty-conv'+j].replace(',','.');
							var toteach_val = req.body['in-laundry-totaleach'+j].replace(',','');
							var item_val = req.body['li-laundry-itemtype'+j];
							var srvc_val = req.body['li-laundry-servicetype'+j];
							var item_name = item_ldry_arr[item_val].toUpperCase();
							var srvc_name = srvc_ldry_arr[srvc_val].toUpperCase();
							sql = "INSERT INTO SUB_TRX_LDRY VALUES ('"+no_item+"','T"+hash_t+"','"+item_name+"','"+srvc_name+"','"+baseprice+".00','"+qty_val+"','"+toteach_val+".00');";
							db.query(sql,(err,result) => {
								console.log(err);
								console.log(result);
							});
						} catch(err) {var dump = 0;}
					}
					break;
				case "SUPER CHEMICAL LAUNDRY":
					var countr_item = req.body["ctr_chem"];
					for (var j = 0; j <= countr_item; j++) {
						try {
							var hash_t = hash;
							var no_item = j+1;
							var baseprice = req.body['in-chemical-baseprice'+j].replace(',','');
							var qty_val = req.body['in-chemical-qty-conv'+j].replace(' ','').replace(',','.');
							var toteach_val = req.body['in-chemical-totaleach'+j].replace(',','');
							var item_val = req.body['li-chemical-itemtype'+j];
							var liquid_val = req.body['li-chemical-liquidtype'+j];
							var jug_val = req.body['li-chemical-jugtype'+j];
							var ceil_val = req.body['in-chemical-ceil'+j].replace('+ ','');
							var jugadd_val = req.body['in-chemical-jugadd'+j].replace('+ ','').replace(',','');
							var item_name = liqd_chem_arr[item_val].toUpperCase();
							var liquid_name = item_chem_arr[liquid_val].toUpperCase();
							var jug_name = jugg_chem_arr[jug_val].toUpperCase();
							if (jug_name == "") {jug_name = "BOTTLE";}
							if (jugadd_val == "") {jugadd_val = 0;}
							sql = "INSERT INTO SUB_TRX_CHEM VALUES ('"+no_item+"','T"+hash_t+"','"+liquid_name+"','"+item_name+"','"+baseprice+".00','"+qty_val+".00','"+jug_name+"','"+jugadd_val+".00','"+ceil_val+".00','"+toteach_val+".00');";
							db.query(sql,(err,result) => {
								console.log(err);
								console.log(result);
							});							
						} catch(err) {var dump = 0;}
					}						
					break;
				case "STATIONERY & LEMINERAL":
					var countr_item = req.body["ctr_stat"];
					for (var j = 0; j <= countr_item; j++) {
						try {
							var hash_t = hash;
							var no_item = j+1;							
							var baseprice = req.body['in-stationery-baseprice'+j].replace(',','');
							var qty_val = req.body['in-stationery-qty-conv'+j].replace(',','');
							var toteach_val = req.body['in-stationery-totaleach'+j].replace(',','');
							var item_val = req.body['li-stationery-itemtype'+j];
							var item_name = item_stat_arr[item_val].toUpperCase();
							sql = "INSERT INTO SUB_TRX_STAT VALUES ('"+no_item+"','T"+hash_t+"','"+item_name+"','"+baseprice+".00','"+qty_val+"','"+toteach_val+".00');";
							db.query(sql,(err,result) => {
								console.log(err);
								console.log(result);
							});							
						} catch(err) {var dump = 0;}
					}
					break;
			}
		});		
	});



	res.render('index');
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
