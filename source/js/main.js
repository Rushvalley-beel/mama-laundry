const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);	
if (vw < 350) {
	document.getElementsByClassName('form-wrapper paid')[0].getElementsByTagName("label")[0].textContent = "Paid";
	document.getElementsByClassName('form-wrapper change')[0].getElementsByTagName("label")[0].textContent = "Change";
}

if (window.history.replaceState) {
	window.history.replaceState(null,null,window.location.href);
}

$(function(){
	var dp1 = $('#dp1').datepicker().data('datepicker');
	dp1.selectDate(new Date());
	var dp2 = $('#dp2').datepicker().data('datepicker');
	dp2.selectDate(new Date());
})
window.onresize = function() {
	var prods = document.getElementsByName("li-prodtype")[0].selectedIndex;	
	const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);	
	switch(prods) {
		case 0: //laundry
			//alert(vw);
			if (vw < 900) {
				document.getElementById('calendar').style.setProperty('display','block'); 				
			} else {				
				document.getElementById('calendar').style.setProperty('display','flex'); 
			}
	}
	if (vw < 350) {
		document.getElementsByClassName('form-wrapper paid')[0].getElementsByTagName("label")[0].textContent = "Paid";
		document.getElementsByClassName('form-wrapper change')[0].getElementsByTagName("label")[0].textContent = "Change";
	} else {
		document.getElementsByClassName('form-wrapper paid')[0].getElementsByTagName("label")[0].textContent = "Amount of Paid";
		document.getElementsByClassName('form-wrapper change')[0].getElementsByTagName("label")[0].textContent = "Amount of Change";	
	}
}

document.getElementById('prod-type').addEventListener('change', function(){
	var prods = document.getElementsByName("li-prodtype")[0].selectedIndex;	
	var tot_in = document.getElementsByName("in-amountpaid")[0];
	switch(prods) {
		case 0: //laundry
			const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
			if (vw < 900) {
				document.getElementById('calendar').style.setProperty('display','block'); 				
			} else {				
				document.getElementById('calendar').style.setProperty('display','flex'); 
			}
			//document.getElementById('menu-laundry').style.display = 'flex';
			document.getElementById('service-head').style.display = 'flex';
			document.getElementById('chem-head').style.display = 'none';
			document.getElementById('chem-head').getElementsByClassName("tooltiptext")[0].style.visibility = 'hidden';
			document.getElementById('stat-head').style.display = 'none';
			document.getElementById('stat-head').getElementsByClassName("tooltiptext")[0].style.visibility = 'hidden';
			var elem = document.getElementsByClassName("border menu");
			for (var i = 0; i < elem.length; i++) {
				elem[i].style.display = 'flex'
			};
			var elem2 = document.getElementsByClassName("menu-laundry-cls");
			for (var i = 0; i < elem2.length; i++) {
				elem2[i].style.display = 'flex'
			};
			var elem3 = document.getElementsByClassName("menu-chemical-cls");
			for (var i = 0; i < elem3.length; i++) {
				elem3[i].style.display = 'none'
			};
			var elem4 = document.getElementsByClassName("menu-stationery-cls");
			for (var i = 0; i < elem4.length; i++) {
				elem4[i].style.display = 'none'
			};
			document.getElementsByName("in-laundry-totalall")[0].style.display = 'flex';			
			document.getElementsByName("in-chemical-totalall")[0].style.display = 'none';
			document.getElementsByName("in-stationery-totalall")[0].style.display = 'none';
			calcChange(tot_in);
			break;
		case 1: //chemical
			document.getElementById('calendar').style.setProperty('display','none'); 
			//document.getElementById('menu-laundry').style.display = 'none';
			document.getElementById('service-head').style.display = 'none';
			document.getElementById('service-head').getElementsByClassName("tooltiptext")[0].style.visibility = 'hidden';
			document.getElementById('chem-head').style.display = 'flex';
			document.getElementById('stat-head').style.display = 'none';
			document.getElementById('stat-head').getElementsByClassName("tooltiptext")[0].style.visibility = 'hidden';			
			var elem = document.getElementsByClassName("border menu");
			for (var i = 0; i < elem.length; i++) {
				elem[i].style.display = 'flex'
			}
			var elem2 = document.getElementsByClassName("menu-laundry-cls");
			for (var i = 0; i < elem2.length; i++) {
				elem2[i].style.display = 'none'
			};
			var elem3 = document.getElementsByClassName("menu-chemical-cls");
			for (var i = 0; i < elem3.length; i++) {
				elem3[i].style.display = 'flex'
			};
			var elem4 = document.getElementsByClassName("menu-stationery-cls");
			for (var i = 0; i < elem4.length; i++) {
				elem4[i].style.display = 'none'
			};
			document.getElementsByName("in-laundry-totalall")[0].style.display = 'none';			
			document.getElementsByName("in-chemical-totalall")[0].style.display = 'flex';
			document.getElementsByName("in-stationery-totalall")[0].style.display = 'none';
			calcChange(tot_in);			
			break;
		case 2: //chemical
			document.getElementById('calendar').style.setProperty('display','none'); 
			//document.getElementById('menu-laundry').style.display = 'none';
			document.getElementById('service-head').style.display = 'none';
			document.getElementById('service-head').getElementsByClassName("tooltiptext")[0].style.visibility = 'hidden';
			document.getElementById('chem-head').style.display = 'none';
			document.getElementById('chem-head').getElementsByClassName("tooltiptext")[0].style.visibility = 'hidden';			
			document.getElementById('stat-head').style.display = 'flex';
			var elem = document.getElementsByClassName("border menu");
			for (var i = 0; i < elem.length; i++) {
				elem[i].style.display = 'flex'
			}
			var elem2 = document.getElementsByClassName("menu-laundry-cls");
			for (var i = 0; i < elem2.length; i++) {
				elem2[i].style.display = 'none'
			};
			var elem3 = document.getElementsByClassName("menu-chemical-cls");
			for (var i = 0; i < elem3.length; i++) {
				elem3[i].style.display = 'none'
			};
			var elem4 = document.getElementsByClassName("menu-stationery-cls");
			for (var i = 0; i < elem4.length; i++) {
				elem4[i].style.display = 'flex'
			};
			document.getElementsByName("in-laundry-totalall")[0].style.display = 'none';			
			document.getElementsByName("in-chemical-totalall")[0].style.display = 'none';
			document.getElementsByName("in-stationery-totalall")[0].style.display = 'flex';
			calcChange(tot_in);
			break;			
	}
})

function togglePayment(x) {
	validChecker();
	disableCommit();
	if (x.value == 1 ) {
		document.getElementById('last-nocash').style.display = 'flex';
	}
	else {
		document.getElementById('last-nocash').style.display = 'none';		
	}
	return x.value;
};

var checker = document.getElementById('check-verify');
var sendbtn = document.getElementById('commit');
sendbtn.disabled = true;
sendbtn.style.background = 'linear-gradient(to right, rgba(129,134,150,1), rgba(185,189,201,1))';
checker.onchange = function() {
	//alert(this.checked);
	if (this.checked) {
		var bool_check = validChecker();
		if (bool_check == 1) {
			vNotify.info({
				text:'Order ready to be placed!', 
				title:'',
				fadeInDuration: 200,
				fadeOutDuration: 1500,
				fadeInterval: 1500,
				visibleDuration: 5000, // auto close after 5 seconds
				postHoverVisibleDuration: 500,
				position: "topRight", // topLeft, bottomLeft, bottomRight, center
				sticky: false, // is sticky
				showClose: true // show close button
		  	});			
			sendbtn.disabled = false;
			sendbtn.style.background = 'linear-gradient(to right, rgba(85,128,233,1), rgba(132,206,235,1))';
		}
		else {
			vNotify.warning({
				text:'Please fill required inputs!', 
				title:'',
				fadeInDuration: 200,
				fadeOutDuration: 1500,
				fadeInterval: 1500,
				visibleDuration: 5000, // auto close after 5 seconds
				postHoverVisibleDuration: 500,
				position: "topRight", // topLeft, bottomLeft, bottomRight, center
				sticky: false, // is sticky
				showClose: true // show close button
		  	});						
			sendbtn.disabled = true;
			sendbtn.style.background = 'linear-gradient(to right, rgba(129,134,150,1), rgba(185,189,201,1))';			
		}
	}
	else {
		sendbtn.disabled = true;
		sendbtn.style.background = 'linear-gradient(to right, rgba(129,134,150,1), rgba(185,189,201,1))';
	}
};

var ctr_ldry = 0;
var ctr_chem = 0;
var ctr_stat = 0;

function disableCommit() {
	document.getElementById('check-verify').checked = false;
	document.getElementsByName('commit-order')[0].disabled = true;
	document.getElementsByName('commit-order')[0].style.background = 'linear-gradient(to right, rgba(129,134,150,1), rgba(185,189,201,1))';	
}

function validChecker() {
	var catch_prod = document.getElementsByName("li-prodtype")[0];
	var prod_val = 	catch_prod.options[catch_prod.selectedIndex].value;
	var in_cust = document.getElementsByName('in-custname')[0].value.length;
	var in_paid = document.getElementsByName('in-amountpaid')[0].value.length;
	var li_trxt1 = document.getElementsByName('li-laundry-trxtype')[1];
	var li_trxt2 = document.getElementsByName('li-laundry-trxtype')[0];	
	const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);		
	//alert(li_trxt1.value + ' -- ' + li_trxt2.value);
	switch(prod_val) {
		case "1":
			var check_in = document.getElementsByName('in-laundry-checkin')[0].value.length;
			var check_out = document.getElementsByName('in-laundry-checkout')[0].value.length;
			var bool_check = 0;			
			var item_state = 1;
			var totall = document.getElementsByName("in-laundry-totalall")[0].value;
			var totpaid = document.getElementsByName('in-amountpaid')[0].value;			
			totall = convMoney(totall);
			for (var j = 0; j <= ctr_ldry; j++) {
				try {
					var in_totaleach = document.getElementsByName('in-laundry-totaleach'+j)[0].value;
					if (String(in_totaleach) == '0') {
						item_state = 0;
					}
				} catch(err) {
					var dump = 0;
				}
			}
			//alert(li_trxt1.value + ' ' + li_trxt2.value);
			var trx_pass = 1;
			if (vw < 900) {
				if (li_trxt2.value == '1') {
					if (totpaid < totall) {
						trx_pass = 0;
					}
				}
			} else {
				if (li_trxt1.value == '1') {
					if (totpaid < totall) {
						trx_pass = 0;
					}
				}					
			}	
			if (in_cust > 4 && check_in > 5 && check_out > 5 && item_state == 1 && trx_pass == 1) { //checker goes on FROM HERE
				bool_check = 1;
			} else {
				disableCommit();
			}
			return bool_check;							
			break;
		case "2":
			var bool_check = 0;			
			var item_state = 1;
			var totall = document.getElementsByName("in-chemical-totalall")[0].value;
			var totpaid = document.getElementsByName('in-amountpaid')[0].value;			
			totall = convMoney(totall);			
			for (var j = 0; j <= ctr_chem; j++) {
				try {
					var in_totaleach = document.getElementsByName('in-chemical-totaleach'+j)[0].value;
					if (String(in_totaleach) == '0') {
						item_state = 0;
					}
				} catch(err) {
					var dump = 0;
				}
			}
			var trx_pass = 1;
			if (vw < 900) {
				if (li_trxt2.value == '1') {
					if (totpaid < totall) {
						trx_pass = 0;
					}
				}
			} else {
				if (li_trxt1.value == '1') {
					if (totpaid < totall) {
						trx_pass = 0;
					}
				}					
			}				
			if (in_cust > 4 && item_state == 1 && trx_pass == 1) { //checker goes on FROM HERE
				bool_check = 1;
			} else {
				disableCommit();
			}
			return bool_check;
			break;
		case"3":
			var bool_check = 0;			
			var item_state = 1;
			var totall = document.getElementsByName("in-stationery-totalall")[0].value;
			var totpaid = document.getElementsByName('in-amountpaid')[0].value;			
			totall = convMoney(totall);			
			for (var j = 0; j <= ctr_stat; j++) {
				try {
					var in_totaleach = document.getElementsByName('in-stationery-totaleach'+j)[0].value;
					if (String(in_totaleach) == '0') {
						item_state = 0;
					}
				} catch(err) {
					var dump = 0;
				}
			}
			var trx_pass = 1;
			if (vw < 900) {
				if (li_trxt2.value == '1') {
					if (totpaid < totall) {
						trx_pass = 0;
					}
				}
			} else {
				if (li_trxt1.value == '1') {
					if (totpaid < totall) {
						trx_pass = 0;
					}
				}					
			}				
			if (in_cust > 4 && item_state == 1 && trx_pass == 1) { //checker goes on FROM HERE
				bool_check = 1;
			} else {
				disableCommit();
			}
			return bool_check;		
			break;
	}
}

// perbaikin variabel dari sini | ldry, chem, stat
document.getElementsByName("ctr_ldry")[0].value = ctr_ldry;
document.getElementsByName("ctr_chem")[0].value = ctr_chem;
document.getElementsByName("ctr_stat")[0].value = ctr_stat;
var pass_idx_ldry = 0;
var pass_idx_chem = 0;
var pass_idx_stat = 0;

function addItem() {
	disableCommit();
	vNotify.success({
		text:'One item have been added!', 
		title:'',
		fadeInDuration: 200,
		fadeOutDuration: 1500,
		fadeInterval: 1500,
		visibleDuration: 5000, // auto close after 5 seconds
		postHoverVisibleDuration: 0,
		position: "topRight", // topLeft, bottomLeft, bottomRight, center
		sticky: false, // is sticky
		showClose: true // show close button
  	});	
	var prods = document.getElementsByName("li-prodtype")[0].selectedIndex;
	switch(prods) {
		case 0:
			var menuitem = document.getElementById("menu-laundry");
			var clone = menuitem.cloneNode(true);
			var name = menuitem.getAttribute(name) + (++ctr_ldry);
			clone.id = "menu-laundry";
			clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("select")[0].setAttribute("name","li-laundry-itemtype"+name);
			clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("button")[0].setAttribute("name","remove-ldry-item"+name);	
			clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("select")[0].setAttribute("id","item-ldry-type"+name);
			clone.getElementsByClassName("form-wrapper item two")[0].getElementsByTagName("select")[0].setAttribute("name","li-laundry-servicetype"+name);	
			clone.getElementsByClassName("form-wrapper item two")[0].getElementsByTagName("select")[0].setAttribute("id","service-ldry-type"+name);		
			clone.getElementsByClassName("form-wrapper item three")[0].getElementsByTagName("input")[0].setAttribute("name","in-laundry-qty"+name);
			clone.getElementsByClassName("form-wrapper item four")[0].getElementsByTagName("input")[0].setAttribute("name","in-laundry-totaleach"+name);
			clone.getElementsByClassName("form-wrapper item hidden one")[0].getElementsByTagName("input")[0].setAttribute("name","in-laundry-baseprice"+name);
			clone.getElementsByClassName("form-wrapper item hidden two")[0].getElementsByTagName("input")[0].setAttribute("name","in-laundry-qty-conv"+name);

			clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("select")[0].selectedIndex = 0;
			clone.getElementsByClassName("form-wrapper item two")[0].getElementsByTagName("select")[0].selectedIndex = 0;
			clone.getElementsByClassName("form-wrapper item three")[0].getElementsByTagName("input")[0].value = null;
			clone.getElementsByClassName("form-wrapper item four")[0].getElementsByTagName("input")[0].value = 0;	
			clone.getElementsByClassName("form-wrapper item hidden")[0].getElementsByTagName("input")[0].value = 0;	
			document.getElementById("list-menu-ldry").appendChild(clone);

			var catch_item = document.getElementById("item-ldry-type"+ctr_ldry);
			var catch_service = document.getElementById("service-ldry-type"+ctr_ldry);	
			var fin_service_len = catch_service.options.length;
			//alert("panjang service : " + fin_service_len);
			if (fin_service_len < 6) {
				var option4 = document.createElement("option");
				var option5 = document.createElement("option");		
				option4.text = "Dry Cleaning Rg";
				option4.value = "5"
				option5.text = "Dry Cleaning Ex";
				option5.value = "6"
				catch_service.add(option4);
				catch_service.add(option5);				
			}
			document.getElementsByName("ctr_ldry")[0].value = ctr_ldry;			
			break;
		case 1:
			var menuitem = document.getElementById("menu-chemical");
			var clone = menuitem.cloneNode(true);
			var name = menuitem.getAttribute(name) + (++ctr_chem);
			clone.id = "menu-chemical";
			clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("select")[0].setAttribute("name","li-chemical-liquidtype"+name);
			clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("button")[0].setAttribute("name","remove-chem-item"+name);
			clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("select")[0].setAttribute("id","liquid-chem-type"+name);
			clone.getElementsByClassName("form-wrapper item two")[0].getElementsByTagName("select")[0].setAttribute("name","li-chemical-itemtype"+name);
			clone.getElementsByClassName("form-wrapper item two")[0].getElementsByTagName("select")[0].setAttribute("id","item-chem-type"+name);
			clone.getElementsByClassName("form-wrapper item three")[0].getElementsByTagName("input")[0].setAttribute("name","in-chemical-qty"+name);
			clone.getElementsByClassName("form-wrapper item four")[0].getElementsByTagName("input")[0].setAttribute("name","in-chemical-totaleach"+name);
			clone.getElementsByClassName("form-wrapper item five")[0].getElementsByTagName("select")[0].setAttribute("name","li-chemical-jugtype"+name);
			clone.getElementsByClassName("form-wrapper item five")[0].getElementsByTagName("select")[0].setAttribute("id","jug-chem-type"+name);
			clone.getElementsByClassName("form-wrapper item hidden one")[0].getElementsByTagName("input")[0].setAttribute("name","in-chemical-baseprice"+name);
			clone.getElementsByClassName("form-wrapper item hidden two")[0].getElementsByTagName("input")[0].setAttribute("name","in-chemical-qty-conv"+name);
			clone.getElementsByClassName("form-wrapper item hidden three")[0].getElementsByTagName("input")[0].setAttribute("name","in-chemical-ceil"+name);
			clone.getElementsByClassName("form-wrapper item hidden four")[0].getElementsByTagName("input")[0].setAttribute("name","in-chemical-jugadd"+name);

			clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("select")[0].selectedIndex = 0;
			clone.getElementsByClassName("form-wrapper item two")[0].getElementsByTagName("select")[0].selectedIndex = 0;
			clone.getElementsByClassName("form-wrapper item three")[0].getElementsByTagName("input")[0].value = null;
			clone.getElementsByClassName("form-wrapper item four")[0].getElementsByTagName("input")[0].value = 0;
			clone.getElementsByClassName("form-wrapper item five")[0].getElementsByTagName("select")[0].selectedIndex = 0;
			clone.getElementsByClassName("form-wrapper item hidden")[0].getElementsByTagName("input")[0].value = 0;

			document.getElementById("list-menu-chem").appendChild(clone);
			var catch_item = document.getElementById("item-chem-type"+ctr_chem);
			var fin_item_len = catch_item.options.length;			
			var arr_item_text = ["Molto B","Ocean F","GGS","Snappy","Paris H","G Rose","Daily"];
			var arr_item_val = ["1","2","3","4","5","6","7"];	
			for (var i = 0; i < fin_item_len; i++) {
				catch_item.remove(0);			
			}		
			for (var i = 0; i < arr_item_text.length; i++) {
				var optionall = document.createElement("option");
				optionall.text = arr_item_text[i];
				optionall.value = arr_item_val[i];
				catch_item.add(optionall);
			}
			document.getElementsByName("ctr_chem")[0].value = ctr_chem;
			break;
		case 2:
			var menuitem = document.getElementById("menu-stationery");
			var clone = menuitem.cloneNode(true);
			var name = menuitem.getAttribute(name) + (++ctr_stat);
			clone.id = "menu-stationery";
			clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("select")[0].setAttribute("name","li-stationery-itemtype"+name);
			clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("button")[0].setAttribute("name","remove-stat-item"+name);
			clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("select")[0].setAttribute("id","item-stat-type"+name);
			clone.getElementsByClassName("form-wrapper item three")[0].getElementsByTagName("input")[0].setAttribute("name","in-stationery-qty"+name);
			clone.getElementsByClassName("form-wrapper item four")[0].getElementsByTagName("input")[0].setAttribute("name","in-stationery-totaleach"+name);
			clone.getElementsByClassName("form-wrapper item hidden one")[0].getElementsByTagName("input")[0].setAttribute("name","in-stationery-baseprice"+name);
			clone.getElementsByClassName("form-wrapper item hidden two")[0].getElementsByTagName("input")[0].setAttribute("name","in-stationery-qty-conv"+name);

			clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("select")[0].selectedIndex = 0;
			clone.getElementsByClassName("form-wrapper item three")[0].getElementsByTagName("input")[0].value = null;
			clone.getElementsByClassName("form-wrapper item four")[0].getElementsByTagName("input")[0].value = 0;
			clone.getElementsByClassName("form-wrapper item hidden")[0].getElementsByTagName("input")[0].value = 0;

			document.getElementById("list-menu-stat").appendChild(clone);
			document.getElementsByName("ctr_stat")[0].value = ctr_stat;						
			break;

	}
};

function convMoney(x) {
	var tonum = parseFloat(x.replace(/[^0-9-.]/g, ''));
	return tonum;
};

function removeItem(x) {
	disableCommit();
	vNotify.error({
		text:'One Item have been removed!', 
		title:'',
		fadeInDuration: 200,
		fadeOutDuration: 1500,
		fadeInterval: 1500,
		visibleDuration: 5000, // auto close after 5 seconds
		postHoverVisibleDuration: 500,
		position: "topRight", // topLeft, bottomLeft, bottomRight, center
		sticky: false, // is sticky
		showClose: true // show close button
  	});		
	var prods = document.getElementsByName("li-prodtype")[0].selectedIndex;
	switch(prods) {	
		case 0:
			var catch_pass = 0;
			var len_list = document.getElementById("list-menu-ldry").getElementsByTagName("li").length
			if ( len_list > 1 ) {
				var menuitem = document.getElementById("list-menu-ldry");
				for (var i = 0; i < len_list; i++) {
					(function(index){
						menuitem.children[i].onclick = function() {
							pass_idx = index;
							if ( pass_idx > 0 ) {
								menuitem.removeChild(menuitem.getElementsByTagName("li")[pass_idx]);
								catch_pass = i;
							}
						}
					})(i);
				}
			}
			// ambil number dari x.name kedalem catch_idx, masukin ke if j != catch_idx
			//alert(x.name);
			var get_num = x.name;	
			var catch_num = get_num.split("remove-ldry-item"); 
			var fin_num = catch_num[1];	
			//alert(fin_num);
			calcTotalAll(fin_num);
			paid_obj = document.getElementsByName("in-amountpaid")[0];
			calcChange(paid_obj);
			break;
		case 1:
			var catch_pass = 0;
			var len_list = document.getElementById("list-menu-chem").getElementsByTagName("li").length;
			if ( len_list > 1 ) {
				var menuitem = document.getElementById("list-menu-chem");
				for (var i = 0; i < len_list; i++) {
					(function(index){
						menuitem.children[i].onclick = function() {
							pass_idx = index;
							if ( pass_idx > 0 ) {
								menuitem.removeChild(menuitem.getElementsByTagName("li")[pass_idx]);
								catch_pass = i;
							}
						}
					})(i);
				}
			}
			var get_num = x.name;	
			var catch_num = get_num.split("remove-chem-item"); 
			var fin_num = catch_num[1];	
			//alert(fin_num);
			calcTotalAll(fin_num);
			paid_obj = document.getElementsByName("in-amountpaid")[0];
			calcChange(paid_obj);			
			break;
		case 2:
			var catch_pass = 0;
			var len_list = document.getElementById("list-menu-stat").getElementsByTagName("li").length;
			if ( len_list > 1 ) {
				var menuitem = document.getElementById("list-menu-stat");
				for (var i = 0; i < len_list; i++) {
					(function(index){
						menuitem.children[i].onclick = function() {
							pass_idx = index;
							if ( pass_idx > 0 ) {
								menuitem.removeChild(menuitem.getElementsByTagName("li")[pass_idx]);
								catch_pass = i;
							}
						}
					})(i);
				}
			}
			var get_num = x.name;	
			var catch_num = get_num.split("remove-stat-item"); 
			var fin_num = catch_num[1];	
			//alert(fin_num);
			calcTotalAll(fin_num);
			paid_obj = document.getElementsByName("in-amountpaid")[0];
			calcChange(paid_obj);			
			break;			
	}
};

function changeLqd(x) {
	disableCommit();
	var get_num = x.name;	
	var catch_num = get_num.split("li-chemical-liquidtype"); 
	var fin_num = catch_num[1];
	document.getElementsByName("in-chemical-qty"+fin_num)[0].value = null;
	document.getElementsByName("in-chemical-totaleach"+fin_num)[0].value = 0;
	var catch_item = document.getElementById("item-chem-type"+fin_num);
	var catch_liquid = document.getElementById("liquid-chem-type"+fin_num);
	var fin_liquid_val = catch_liquid.options[catch_liquid.selectedIndex].value;
	var fin_item_len = catch_item.options.length;
	var arr_item_text = ["Molto B","Ocean F","GGS","Snappy","Paris H","G Rose","Daily"];
	var arr_item_val = ["1","2","3","4","5","6","7"];	
	//alert(fin_liquid_val);
	if (fin_liquid_val == 4) {
		var option8 = document.createElement("option");
		option8.text = "Heavy D";
		option8.value = "8";
		for (var i = 0; i < fin_item_len; i++) {
			catch_item.remove(0);			
		}
		var option7 = document.createElement("option");
		option7.text = arr_item_text[6];
		option7.value = arr_item_val[6];
		catch_item.add(option7);
		catch_item.add(option8);		
	}
	else if (fin_liquid_val == 5) {
		for (var i = 0; i < fin_item_len; i++) {
			catch_item.remove(0);			
		}
		var option9 = document.createElement("option");
		option9.text = "Sour";
		option9.value = "9";
		catch_item.add(option9);		
	}
	else if (fin_liquid_val == 6) {
		for (var i = 0; i < fin_item_len; i++) {
			catch_item.remove(0);			
		}
		var option10 = document.createElement("option");
		var option11 = document.createElement("option");		
		option10.text = "Emulsifr";
		option10.value = "10";
		option11.text = "Oxpot";
		option11.value = "11";		
		catch_item.add(option10);
		catch_item.add(option11);		
	}
	else {
		for (var i = 0; i < fin_item_len; i++) {
			catch_item.remove(0);			
		}		
		for (var i = 0; i < arr_item_text.length; i++) {
			var optionall = document.createElement("option");
			optionall.text = arr_item_text[i];
			optionall.value = arr_item_val[i];
			catch_item.add(optionall);
		}
	}
	calcTotalAll(null);
	paid_obj = document.getElementsByName("in-amountpaid")[0];
	calcChange(paid_obj);	
}

function changeItem(x) {
	disableCommit();
	var get_num = x.name;	
	var catch_num = get_num.split("li-laundry-itemtype"); 
	var fin_num = catch_num[1];
	document.getElementsByName("in-laundry-qty"+fin_num)[0].value = null;
	document.getElementsByName("in-laundry-totaleach"+fin_num)[0].value = 0;	
	var catch_item = document.getElementById("item-ldry-type"+fin_num);
	var catch_service = document.getElementById("service-ldry-type"+fin_num);	
	var fin_item_val = catch_item.options[catch_item.selectedIndex].value;
	var fin_service_len = catch_service.options.length;
	//alert(fin_item_val)
	if (fin_item_val != 1 && fin_item_val != 11) {
		catch_service.remove(4);
		catch_service.remove(4);		
	} else {
		if (fin_service_len < 6) {
			var option4 = document.createElement("option");
			var option5 = document.createElement("option");		
			option4.text = "Dry Cleaning Rg";
			option4.value = "5"
			option5.text = "Dry Cleaning Ex";
			option5.value = "6"
			catch_service.add(option4);
			catch_service.add(option5);
		}
	}
	calcTotalAll(null);
	paid_obj = document.getElementsByName("in-amountpaid")[0];
	calcChange(paid_obj);		
}

function changeItem2(x) {
	disableCommit();
	var get_num = x.name;	
	var catch_num = get_num.split("li-chemical-itemtype"); 
	var fin_num = catch_num[1];
	document.getElementsByName("in-chemical-qty"+fin_num)[0].value = null;
	document.getElementsByName("in-chemical-totaleach"+fin_num)[0].value = 0;
	calcTotalAll(null);
	paid_obj = document.getElementsByName("in-amountpaid")[0];
	calcChange(paid_obj);	
}

function changeItem3(x) {
	var get_num = x.name;	
	var catch_num = get_num.split("li-stationery-itemtype"); 
	var fin_num = catch_num[1];
	document.getElementsByName("in-stationery-qty"+fin_num)[0].value = null;
	document.getElementsByName("in-stationery-totaleach"+fin_num)[0].value = 0;
	calcTotalAll(null);
	paid_obj = document.getElementsByName("in-amountpaid")[0];
	calcChange(paid_obj);	
}

function changeJug(x) {
	disableCommit();
	var get_num = x.name;	
	var catch_num = get_num.split("li-chemical-jugtype"); 
	var fin_num = catch_num[1];
	document.getElementsByName("in-chemical-qty"+fin_num)[0].value = null;
	document.getElementsByName("in-chemical-totaleach"+fin_num)[0].value = 0;
	calcTotalAll(null);
	paid_obj = document.getElementsByName("in-amountpaid")[0];
	calcChange(paid_obj);		
}

function changeSvc(x) {
	disableCommit();
	var get_num = x.name;	
	var catch_num = get_num.split("li-laundry-servicetype"); 
	var fin_num = catch_num[1];
	document.getElementsByName("in-laundry-qty"+fin_num)[0].value = null;
	document.getElementsByName("in-laundry-totaleach"+fin_num)[0].value = 0;
	calcTotalAll(null);
	paid_obj = document.getElementsByName("in-amountpaid")[0];
	calcChange(paid_obj);	
}

function calcSection(y,baseprice_item) {
	switch(y) {
		case "2":
			baseprice_item = parseFloat(baseprice_item * 1.625).toFixed(0);
			break;
		case "3":
			baseprice_item = parseFloat(baseprice_item / 1.230769230769231).toFixed(0);
			break;
		case "4":
			baseprice_item = parseFloat(baseprice_item / 1.230769230769231).toFixed(0); 
			baseprice_item = parseFloat(baseprice_item * 1.625).toFixed(0);			
			break;
		case "5":
			baseprice_item = 20000;
			break;
		case "6":
			baseprice_item = 20000;
			baseprice_item = parseFloat(baseprice_item * 1.625).toFixed(0);					
			break;
	}
	return baseprice_item;
}
function basePrice_ldry(fin_item_val,fin_service_val,baseprice_item) {
	switch(fin_item_val) {
		case "1":
			baseprice_item = 8000;
			break;
		case "2":
			baseprice_item = 10000;
			break;
		case "3":
			baseprice_item = 15000;
			break;
		case "4":
			baseprice_item = 15000;
			break;
		case "5":
			baseprice_item = 20000;
			break;
		case "6":
			baseprice_item = 20000;
			break;			
		case "7":
			baseprice_item = 25000;
			break;
		case "8":
			baseprice_item = 15000;
			break;
		case "9":
			baseprice_item = 30000;
			break;
		case "10":
			baseprice_item = 40000;
			break;			
		case "11":
			baseprice_item = 20000;
			break;			
		case "12":
			baseprice_item = 0;
			break;
		case "13":
			baseprice_item = 20000;
			break;				
		case "14":
			baseprice_item = 15000;
			break;									
	}
	baseprice_item = calcSection(fin_service_val,baseprice_item);	
	return baseprice_item;
}
function basePrice_chem(fin_liquid_val,baseprice_item) {
	switch(fin_liquid_val) {
		case "1":
			baseprice_item = 42000;
			break;
		case "2":
			baseprice_item = 22000;
			break;
		case "3":
			baseprice_item = 20000;
			break;
		case "4":
			baseprice_item = 15000;
			break;
		case "5":
			baseprice_item = 10000;
			break;
		case "6":
			baseprice_item = 20000;
			break;			
	}	
	return baseprice_item;
}
function basePrice_stat(fin_item_val,baseprice_item) {
	switch(fin_item_val) {
		case "1":
			baseprice_item = 1000;
			break;
		case "2":
			baseprice_item = 2000;
			break;
		case "3":
			baseprice_item = 3000;
			break;
		case "4":
			baseprice_item = 4000;
			break;
		case "5":
			baseprice_item = 5000;
			break;
		case "6":
			baseprice_item = 6000;
			break;			
	}
	return baseprice_item;
}
function basePrice_chem_jug_ceil(fin_jug_val,qty) {
	var get_ceil = 0;	
	switch(fin_jug_val) {
		case "2":
			get_ceil = qty / 1;
			get_ceil = Math.ceil(get_ceil);
			break;
		case "3":
			get_ceil = qty / 5;
			get_ceil = Math.ceil(get_ceil);		
	}
	return get_ceil;
}
function basePrice_chem_jug(fin_jug_val,qty) {
	var jug_add = 0;
	var get_ceil = 0;	
	switch(fin_jug_val) {
		case "1":
			jug_add = 0;
			break;
		case "2":
			get_ceil = basePrice_chem_jug_ceil(fin_jug_val,qty);
			jug_add = get_ceil * 7000;
			break;
		case "3":
			get_ceil = basePrice_chem_jug_ceil(fin_jug_val,qty);		
			jug_add = get_ceil * 8000;
			break;
	}
	return jug_add;
}

function calcItem(x) {
	var qty = x.value;	
	var get_num = x.name;
	var baseprice_item = 0;
	var prods = document.getElementsByName("li-prodtype")[0].selectedIndex;

	switch(prods) {
		case 0:
			var catch_num = get_num.split("in-laundry-qty"); 
			var fin_num = catch_num[1];
			var catch_item = document.getElementById("item-ldry-type"+fin_num);
			var fin_item_val = catch_item.options[catch_item.selectedIndex].value;
			var fin_item_txt = catch_item.options[catch_item.selectedIndex].text;
			var catch_service = document.getElementById("service-ldry-type"+fin_num);
			var fin_service_val = catch_service.options[catch_service.selectedIndex].value;
			var fin_service_txt = catch_service.options[catch_service.selectedIndex].text;

			baseprice_item = basePrice_ldry(fin_item_val,fin_service_val,baseprice_item);
			var totall = document.getElementsByName("in-laundry-totalall")[0].value;
			totall = convMoney(totall);
			if (fin_item_val == "1" && fin_service_val != "5" && fin_service_val != "6" || fin_item_val == "13" || fin_item_val == "14") {
				if (qty < 1.5 && qty > 0 && fin_item_val != "13" && fin_item_val != "14") {
					qty = 1.5;
				}
			} else {
				qty = Math.floor(qty);
			}

			var tot = qty * baseprice_item;
			tot = parseInt(tot);
			tot = tot.toLocaleString();
			document.forms["main-form"]["in-laundry-totaleach"+fin_num].value = tot;			
			break;
		case 1:
			var catch_num = get_num.split("in-chemical-qty"); 
			var fin_num = catch_num[1];
			var catch_item = document.getElementById("item-chem-type"+fin_num);
			var fin_item_val = catch_item.options[catch_item.selectedIndex].value;
			var fin_item_txt = catch_item.options[catch_item.selectedIndex].text;
			var catch_liquid = document.getElementById("liquid-chem-type"+fin_num);
			var fin_liquid_val = catch_liquid.options[catch_liquid.selectedIndex].value;
			var fin_liquid_txt = catch_liquid.options[catch_liquid.selectedIndex].text;
			var catch_jug = document.getElementById("jug-chem-type"+fin_num);
			var fin_jug_val = catch_jug.options[catch_jug.selectedIndex].value;

			baseprice_item = basePrice_chem(fin_liquid_val,baseprice_item);
			qty = Math.floor(qty);
			var jug_add = basePrice_chem_jug(fin_jug_val,qty);
			var tot = qty * baseprice_item + jug_add;

			tot = tot.toLocaleString();
			document.forms["main-form"]["in-chemical-totaleach"+fin_num].value = tot;			
			break;
		case 2:
			var catch_num = get_num.split("in-stationery-qty"); 
			var fin_num = catch_num[1];
			var catch_item = document.getElementById("item-stat-type"+fin_num);
			var fin_item_val = catch_item.options[catch_item.selectedIndex].value;
			var fin_item_txt = catch_item.options[catch_item.selectedIndex].text;

			baseprice_item = basePrice_stat(fin_item_val,baseprice_item);
			qty = Math.floor(qty);
			var tot = qty * baseprice_item;
			tot = tot.toLocaleString();
			document.forms["main-form"]["in-stationery-totaleach"+fin_num].value = tot;			
			break;
	}

	// buat looping, trycatch ?
	calcTotalAll(null);
	paid_obj = document.getElementsByName("in-amountpaid")[0];
	calcChange(paid_obj);
};

function calcTotalAll(y) {
	// x = totalall, y = fin_num
	var prods = document.getElementsByName("li-prodtype")[0].selectedIndex;
	//alert("index produk " + prods);
	switch(prods) {
		case 0: //laundry
			//alert("masuk")
			var x = 0;
			for (var j = 0; j <= ctr_ldry; j++) {
				try {
					var each_tot = document.forms["main-form"]["in-laundry-totaleach"+j].value;
					each_tot = convMoney(each_tot);
					if (each_tot != NaN && j != y) {
						x += parseInt(each_tot);
					}
					//alert(each_tot + " index " + j);
				} catch(err) {
					//alert("no index in " + j)
					var dump = 0;
				}
			}
			var str_x = x.toLocaleString();
			//alert(str_x);
			document.getElementsByName("in-laundry-totalall")[0].value = str_x;
			break;
		case 1: //chemical
			var x = 0;
			for (var j = 0; j <= ctr_chem; j++) {
				try {
					var each_tot = document.forms["main-form"]["in-chemical-totaleach"+j].value;
					each_tot = convMoney(each_tot);
					if (each_tot != NaN && j != y) {
						x += parseInt(each_tot);
					}
					//alert(each_tot + " index " + j);
				} catch(err) {
					//alert("no index in " + j)
					var dump = 0;
				}
			}
			var str_x = x.toLocaleString();
			document.getElementsByName("in-chemical-totalall")[0].value = str_x;
			break;
		case 2: //stationary & lemineral		
			var x = 0;
			for (var j = 0; j <= ctr_stat; j++) {
				try {
					var each_tot = document.forms["main-form"]["in-stationery-totaleach"+j].value;
					each_tot = convMoney(each_tot);
					if (each_tot != NaN && j != y) {
						x += parseInt(each_tot);
					}
					//alert(each_tot + " index " + j);
				} catch(err) {
					//alert("no index in " + j)
					var dump = 0;
				}
			}
			var str_x = x.toLocaleString();
			document.getElementsByName("in-stationery-totalall")[0].value = str_x;
			break;
	}
};

function calcChange(x) {
	var paid = x.value;
	var prods = document.getElementsByName("li-prodtype")[0].selectedIndex;	
	if (paid.length > 0) {
		switch(prods) {
			case 0:
				paid = convMoney(paid);
				var totalall = document.getElementsByName("in-laundry-totalall")[0].value;
				totalall = convMoney(totalall);
				var totchange = paid - totalall;
				//alert(totchange);
				if (totchange < 0 || totalall <= 0) {
					document.getElementsByName("in-amountchange")[0].value = 0;
				} else {
					totchange = totchange.toLocaleString();
					document.getElementsByName("in-amountchange")[0].value = totchange;
				}			
				break;
			case 1:
				paid = convMoney(paid);
				var totalall = document.getElementsByName("in-chemical-totalall")[0].value;
				totalall = convMoney(totalall);
				var totchange = paid - totalall;
				//alert(totchange);
				if (totchange < 0 || totalall <= 0) {
					document.getElementsByName("in-amountchange")[0].value = 0;
				} else {
					totchange = totchange.toLocaleString();
					document.getElementsByName("in-amountchange")[0].value = totchange;
				}
				break;
			case 2:
				paid = convMoney(paid);
				var totalall = document.getElementsByName("in-stationery-totalall")[0].value;
				totalall = convMoney(totalall);
				var totchange = paid - totalall;
				//alert(totchange);
				if (totchange < 0 || totalall <= 0) {
					document.getElementsByName("in-amountchange")[0].value = 0;
				} else {
					totchange = totchange.toLocaleString();
					document.getElementsByName("in-amountchange")[0].value = totchange;
				}
				break;				
		}
	} else {
		document.getElementsByName("in-amountchange")[0].value = 0;		
	}
}

function showTooltips(x) {
	var text = x.getElementsByClassName("tooltiptext")[0].style;
	if (text.visibility == "hidden") {
		text.visibility = "visible"
	} else {
		text.visibility = "hidden";
	}
}
function CreateGuid() {  
   function _p8(s) {  
      var p = (Math.random().toString(16)+"000000000").substr(2,8);  
      return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
   }  
   return _p8() + _p8(true) + _p8(true) + _p8();  
}

function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

function printForm(x) {

	var receiptWindow = window.open('','Reciept','height=auto,width=58,menubar=no,resizeable=no');
	var catch_prod = document.getElementsByName("li-prodtype")[0];
	const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);	
	if (vw < 900) {
		var catch_trx = document.getElementsByName("li-laundry-trxtype")[0];
	} else {
		var catch_trx = document.getElementsByName("li-laundry-trxtype")[1];
	}
	var get_trx = catch_trx.options[catch_trx.selectedIndex].value;
	alert(get_trx);
	var prod_name = catch_prod.options[catch_prod.selectedIndex].text.toUpperCase();
	var prod_val = 	catch_prod.options[catch_prod.selectedIndex].value;
	var get_name = document.getElementsByName("in-custname")[0].value.toUpperCase();
	var get_phone = document.getElementsByName("in-phonenum")[0].value;	
	var get_paid = document.getElementsByName("in-amountpaid")[0].value;
	get_paid = parseInt(get_paid).toLocaleString();
	var get_change = document.getElementsByName("in-amountchange")[0].value.toLocaleString();
	var datetime = new Date().toLocaleString();
	var code = ('0000'+CreateGuid()).slice(-7).toUpperCase();
	document.getElementsByName('invoice_ctr')[0].value = code;

	receiptWindow.document.write('<html><head>');
	receiptWindow.document.write('<link rel="stylesheet" href="css/reciept-style.css"');
	receiptWindow.document.write('</head><body><div class="container">');
	receiptWindow.document.write('<div id="logo" class="logo"><img src="images/mama-laundry-reciept.svg">&nbsp&nbsp</div>');
	receiptWindow.document.write('<h1 class="header">JL. SIAGA RAYA NO. 42C&nbsp&nbsp<br>PEJATEN BARAT, PS. MINGGU&nbsp&nbsp</h1>');
	receiptWindow.document.write('<h1>-------------------------------------<br></h1>');
	receiptWindow.document.write('<h1>NAME&nbsp&nbsp : '+get_name+'<br>PHONE&nbsp : '+get_phone+'<br>TIME&nbsp&nbsp : '+datetime+'<br>INVCE&nbsp : #'+code+'</h1>');
	receiptWindow.document.write('<h1>-------------------------------------<br></h1>');
	receiptWindow.document.write('<h1>PRODCT : '+prod_name);
	switch(prod_val) {
		case "1":
			var check_in = document.getElementsByName("in-laundry-checkin")[0].value.toUpperCase();
			var check_out = document.getElementsByName("in-laundry-checkout")[0].value.toUpperCase();
			var catch_totalall = document.getElementsByName("in-laundry-totalall")[0].value;
			receiptWindow.document.write('<br>FINISH : '+check_in+' -- '+check_out);
			receiptWindow.document.write('</h1><h1>-------------------------------------<br></h1>');
			var x = 0;
			for (var j = 0; j <= ctr_ldry; j++) {
				try {
					var baseprice_item = 0;
					var get_item = document.getElementsByName("li-laundry-itemtype"+j)[0];
					var get_srvc = document.getElementsByName("li-laundry-servicetype"+j)[0];				
					var item_name = get_item.options[get_item.selectedIndex].text.toUpperCase();
					var srvc_name = get_srvc.options[get_srvc.selectedIndex].text.toUpperCase();
					var item_val = get_item.options[get_item.selectedIndex].value;
					var srvc_val = get_srvc.options[get_srvc.selectedIndex].value;				
					baseprice_item = basePrice_ldry(item_val,srvc_val,baseprice_item);
					baseprice_item = parseInt(baseprice_item).toLocaleString();
					var tot_each = document.getElementsByName("in-laundry-totaleach"+j)[0].value.toLocaleString();
					var qty_each = document.getElementsByName("in-laundry-qty"+j)[0].value;

					document.getElementsByName('in-laundry-baseprice'+j)[0].value = baseprice_item;
					var qty_conv = qty_each+' ';
					var qty_conv = qty_conv.split('.').join(',');
					document.getElementsByName('in-laundry-qty-conv'+j)[0].value = qty_conv;

					++x;
					var ctr = ('0'+x).slice(-2);
					receiptWindow.document.write('<h1 class="detail">'+ctr+' | '+item_name+' ('+srvc_name+')<br>&nbsp&nbsp | '+qty_each+' x '+baseprice_item+'</h1><h1 class="detail toteach">: '+tot_each+'</h1>');
				} catch(err) {
					var dump = 0;
				}
			}
			receiptWindow.document.write('<h1>-------------------------------------<br></h1>');
			receiptWindow.document.write('<h1 class="footer">TOTAL&nbsp : Rp '+catch_totalall)
			if (get_trx == "1") {
				receiptWindow.document.write('<br>PAID&nbsp&nbsp : Rp '+get_paid+'<br>RETURN : Rp '+get_change)
				receiptWindow.document.write('</h1><h1  class="detail sign one">[&nbsp&nbsp&nbsp&nbspTTD&nbsp&nbsp&nbsp&nbsp]</h1>');			
			} else {
				receiptWindow.document.write('</h1><h1 class="detail sign two">[&nbsp&nbsp&nbsp&nbspTTD&nbsp&nbsp&nbsp&nbsp]</h1>');		
			}
			receiptWindow.document.write('<h1>-------------------------------------</h1>');
			break;
		case "2":
			var catch_totalall = document.getElementsByName("in-chemical-totalall")[0].value;
			receiptWindow.document.write('<h1>-------------------------------------<br></h1>');
			var x = 0;
			for (var j = 0; j <= ctr_chem; j++) {
				try {
					var baseprice_item = 0;
					var get_liquid = document.getElementsByName("li-chemical-liquidtype"+j)[0];
					var get_item = document.getElementsByName("li-chemical-itemtype"+j)[0];
					var get_jug = document.getElementsByName("li-chemical-jugtype"+j)[0];
					var liquid_name = get_liquid.options[get_liquid.selectedIndex].text.toUpperCase();
					var item_name = get_item.options[get_item.selectedIndex].text.toUpperCase();
					var jug_name = get_jug.options[get_jug.selectedIndex].text.toUpperCase();
					var fin_liquid_val = get_liquid.options[get_liquid.selectedIndex].value;
					var fin_jug_val = get_jug.options[get_jug.selectedIndex].value
					baseprice_item = basePrice_chem(fin_liquid_val,baseprice_item);
					baseprice_item = parseInt(baseprice_item).toLocaleString();
					var tot_each = document.getElementsByName("in-chemical-totaleach"+j)[0].value;
					var qty_each = document.getElementsByName("in-chemical-qty"+j)[0].value;
					qty_each = Math.floor(qty_each);
					var qty = qty_each;
					var jug_add = basePrice_chem_jug(fin_jug_val,qty).toLocaleString();
					var get_ceil = basePrice_chem_jug_ceil(fin_jug_val,qty);
					if (fin_jug_val != "1") {
						get_ceil = "+ "+get_ceil;
						jug_add = "+ "+jug_add;
					} else {
						jug_name = "";
						jug_add = "";
						get_ceil = "";			
					}					
					var qty_conv = qty_each+' ';
					var qty_conv = qty_conv.split('.').join(',');
					document.getElementsByName('in-chemical-qty-conv'+j)[0].value = qty_conv;
					++x;
					document.getElementsByName('in-chemical-ceil'+j)[0].value = get_ceil;
					document.getElementsByName('in-chemical-jugadd'+j)[0].value = jug_add;
					document.getElementsByName('in-chemical-baseprice'+j)[0].value = baseprice_item;
					var ctr = ('0'+x).slice(-2);
					receiptWindow.document.write('<h1 class="detail">'+ctr+' | '+item_name+' ('+liquid_name+') '+get_ceil+' '+jug_name+'<br>&nbsp&nbsp | '+qty_each+' x '+baseprice_item+'</h1><h1 class="detail jug"> '+jug_add+'</h1><span class="indent"><h1 class="detail toteach">: '+tot_each+'</h1></span>');
				} catch(err) {
					var dump = 0;
				}
			}
			receiptWindow.document.write('<h1>-------------------------------------<br></h1>');
			receiptWindow.document.write('<h1 class="footer">TOTAL&nbsp : Rp '+catch_totalall)
			if (get_trx == "1") {
				receiptWindow.document.write('<br>PAID&nbsp&nbsp : Rp '+get_paid+'<br>RETURN : Rp '+get_change)
				receiptWindow.document.write('</h1><h1  class="detail sign one">[&nbsp&nbsp&nbsp&nbspTTD&nbsp&nbsp&nbsp&nbsp]</h1>');			
			} else {
				receiptWindow.document.write('</h1><h1 class="detail sign two">[&nbsp&nbsp&nbsp&nbspTTD&nbsp&nbsp&nbsp&nbsp]</h1>');		
			}
			receiptWindow.document.write('<h1>-------------------------------------</h1>');
			break;
		case "3":
			var catch_totalall = document.getElementsByName("in-stationery-totalall")[0].value;
			receiptWindow.document.write('<h1>-------------------------------------<br></h1>');
			var x = 0;
			for (var j = 0; j <= ctr_stat; j++) {
				try {
					var baseprice_item = 0;
					var get_item = document.getElementsByName("li-stationery-itemtype"+j)[0];
					var item_name = get_item.options[get_item.selectedIndex].text.toUpperCase();
					var fin_item_val = get_item.options[get_item.selectedIndex].value;
					var qty_each = document.getElementsByName("in-stationery-qty"+j)[0].value;
					var tot_each = document.getElementsByName("in-stationery-totaleach"+j)[0].value;
					baseprice_item = basePrice_stat(fin_item_val,baseprice_item);
					++x;
					var qty_conv = qty_each+' ';
					var qty_conv = qty_conv.split('.').join(',');
					document.getElementsByName('in-stationery-qty-conv'+j)[0].value = qty_conv;
					document.getElementsByName('in-stationery-baseprice'+j)[0].value = baseprice_item;
					var ctr = ('0'+x).slice(-2);
					receiptWindow.document.write('<h1 class="detail">'+ctr+' | '+item_name+' <br>&nbsp&nbsp | '+qty_each+' x '+baseprice_item+'</h1><span class="indent"><h1 class="detail toteach">: '+tot_each+'</h1></span>');
				} catch(err) {
					var dump = 0;
				}
			}
			receiptWindow.document.write('<h1>-------------------------------------<br></h1>');
			receiptWindow.document.write('<h1 class="footer">TOTAL&nbsp : Rp '+catch_totalall)
			if (get_trx == "1") {
				receiptWindow.document.write('<br>PAID&nbsp&nbsp : Rp '+get_paid+'<br>RETURN : Rp '+get_change)
				receiptWindow.document.write('</h1><h1  class="detail sign one">[&nbsp&nbsp&nbsp&nbspTTD&nbsp&nbsp&nbsp&nbsp]</h1>');			
			} else {
				receiptWindow.document.write('</h1><h1 class="detail sign two">[&nbsp&nbsp&nbsp&nbspTTD&nbsp&nbsp&nbsp&nbsp]</h1>');		
			}
			receiptWindow.document.write('<h1>-------------------------------------</h1>');			
			break;
	}
	receiptWindow.document.write('<h1 class="header end">.: (づ｡◕‿‿◕｡)づ :.&nbsp<br><br>CONTACT INFO : 08212-533-7746&nbsp<br>mama-laundry.io/dashboard/&nbsp</h1>')
	receiptWindow.document.write('</div></body></html>');
	receiptWindow.document.close();
	receiptWindow.print();
}

/*
parseFloat(n / 1.230769230769231).toFixed(0)
--
express 				base = ( n * 1.625 )
setrika 				base = ( n / 1.230769230769231 )
satu set 				base = ( n + 5000 )
--
Pakaian + Cuci 			base =  8 000 
Sprei Kecil + Cuci 		base = 10 000	qty = Math.floor(qty)
Sprei Sedang + Cuci		base = 15 000 	qty = Math.floor(qty)
Sprei Besar + Cuci		base = 20 000 	qty = Math.floor(qty)
Bedcover Kecil + Cuci	base = 15 000 	qty = Math.floor(qty)
Bedcover Sedang + Cuci	base = 30 000 	qty = Math.floor(qty)
Bedcover Besar + Cuci 	base = 40 000 	qty = Math.floor(qty)
Jas/Jaket/Kebaya + Dry  base = 20 000 	qty = Math.floor(qty)
--
fin_item_val					fin_item_service
--								--	
1  Pakaian						1 Cuci Regular 
2  Seprei Kecil   3  + Set 		3 Setrika Regular
4  Seprei Sedang  5  + Set 		4 Setrika Express
6  Seprei Besar	  7  + Set 		5 Dry Cleaning
8  Bedcvr Kecil    
9  Bedcvr Sedang 
10 Bedcvr Besar 
11 Jas / Jaket / Kebaya
12 Peralatan Sholat
*/
