$(function(){
	var dp1 = $('#dp1').datepicker().data('datepicker');
	dp1.selectDate(new Date());
	var dp2 = $('#dp2').datepicker().data('datepicker');
	dp2.selectDate(new Date());
})

document.getElementById('prod-type').addEventListener('change', function(){
	var prods = document.getElementsByName("li-prodtype")[0].selectedIndex;	
	var tot_in = document.getElementsByName("in-amountpaid")[0];
	switch(prods) {
		case 0: //laundry
			document.getElementById('calendar').style.display = 'flex'; 
			//document.getElementById('menu-laundry').style.display = 'flex';
			document.getElementById('service-head').style.display = 'flex';
			document.getElementById('chem-head').style.display = 'none';
			document.getElementById('chem-head').getElementsByClassName("tooltiptext")[0].style.visibility = 'hidden';
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
			document.getElementsByName("in-laundry-totalall")[0].style.display = 'flex';			
			document.getElementsByName("in-chemical-totalall")[0].style.display = 'none';
			document.getElementsByName("in-stationary-totalall")[0].style.display = 'none';
			calcChange(tot_in);
			break;
		case 1: //chemical
			document.getElementById('calendar').style.display = 'none';
			//document.getElementById('menu-laundry').style.display = 'none';
			document.getElementById('service-head').style.display = 'none';
			document.getElementById('service-head').getElementsByClassName("tooltiptext")[0].style.visibility = 'hidden';			
			document.getElementById('chem-head').style.display = 'flex';			
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
			document.getElementsByName("in-laundry-totalall")[0].style.display = 'none';			
			document.getElementsByName("in-chemical-totalall")[0].style.display = 'flex';
			document.getElementsByName("in-stationary-totalall")[0].style.display = 'none';
			calcChange(tot_in);			
			break;
	}
})

document.getElementById('payment-type').addEventListener('change', function(){
	if (this.value == 1 ) {
		document.getElementById('last-nocash').style.display = 'flex';
	}
	else {
		document.getElementById('last-nocash').style.display = 'none';		
	}
});

var checker = document.getElementById('check-verify');
var sendbtn = document.getElementById('commit');
sendbtn.disabled = true;
sendbtn.style.background = 'linear-gradient(to right, rgba(129,134,150,1), rgba(185,189,201,1))';
checker.onchange = function() {
	if (this.checked) {
		sendbtn.disabled = false;
		sendbtn.style.background = 'linear-gradient(to right, rgba(85,128,233,1), rgba(132,206,235,1))';
	}
	else {
		sendbtn.disabled = true;
		sendbtn.style.background = 'linear-gradient(to right, rgba(129,134,150,1), rgba(185,189,201,1))';
	}
};

// perbaikin variabel dari sini | ldry, chem, stat
var ctr_ldry = 0;
var ctr_chem = 0;
var ctr_stat = 0;
var pass_idx_ldry = 0;
var pass_idx_chem = 0;
var pass_idx_stat = 0;

function addItem() {
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

			clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("select")[0].selectedIndex = 0;
			clone.getElementsByClassName("form-wrapper item two")[0].getElementsByTagName("select")[0].selectedIndex = 0;
			clone.getElementsByClassName("form-wrapper item three")[0].getElementsByTagName("input")[0].value = null;
			clone.getElementsByClassName("form-wrapper item four")[0].getElementsByTagName("input")[0].value = 0;	

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

			clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("select")[0].selectedIndex = 0;
			clone.getElementsByClassName("form-wrapper item two")[0].getElementsByTagName("select")[0].selectedIndex = 0;
			clone.getElementsByClassName("form-wrapper item three")[0].getElementsByTagName("input")[0].value = null;
			clone.getElementsByClassName("form-wrapper item four")[0].getElementsByTagName("input")[0].value = 0;
			clone.getElementsByClassName("form-wrapper item five")[0].getElementsByTagName("select")[0].selectedIndex = 0;

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
			break;
	}
};

function convMoney(x) {
	var tonum = parseFloat(x.replace(/[^0-9-.]/g, ''));
	return tonum;
};

function removeItem(x) {
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
	}
};

function changeLqd(x) {
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
	var get_num = x.name;	
	var catch_num = get_num.split("li-chemical-itemtype"); 
	var fin_num = catch_num[1];
	document.getElementsByName("in-chemical-qty"+fin_num)[0].value = null;
	document.getElementsByName("in-chemical-totaleach"+fin_num)[0].value = 0;
	calcTotalAll(null);
	paid_obj = document.getElementsByName("in-amountpaid")[0];
	calcChange(paid_obj);	
}

function changeJug(x) {
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
	var get_num = x.name;	
	var catch_num = get_num.split("li-laundry-servicetype"); 
	var fin_num = catch_num[1];
	document.getElementsByName("in-laundry-qty"+fin_num)[0].value = null;
	document.getElementsByName("in-laundry-totaleach"+fin_num)[0].value = 0;
	calcTotalAll(null);
	paid_obj = document.getElementsByName("in-amountpaid")[0];
	calcChange(paid_obj);	
}

function calcItem(x) {
	var qty = x.value;	
	var get_num = x.name;
	var baseprice_item = 0;
	var prods = document.getElementsByName("li-prodtype")[0].selectedIndex;

	function calcSection(y) {
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
					baseprice_item = 10000;
					break;				
				case "14":
					baseprice_item = 15000;
					break;									
			}
			calcSection(fin_service_val);			
			if (fin_item_val == "1" && fin_service_val != "5" && fin_service_val != "6" || fin_item_val == "13" || fin_item_val == "14") {
				if (qty < 3 && qty > 0 && fin_item_val != "13" && fin_item_val != "14") {
					qty = 3;
				}
			} else {
				qty = Math.floor(qty);
			}

			var tot = qty * baseprice_item;
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

			qty = Math.floor(qty);
			var jug_add = 0;
			var get_ceil = 0;
			switch(fin_jug_val) {
				case "1":
					jug_add = 0;
					break;
				case "2":
					get_ceil = qty / 1;
					get_ceil = Math.ceil(get_ceil);
					jug_add = get_ceil * 7000;
					break;
				case "3":
					get_ceil = qty / 5;
					get_ceil = Math.ceil(get_ceil);
					jug_add = get_ceil * 8000;
					break;
			}

			var tot = qty * baseprice_item + jug_add;

			tot = tot.toLocaleString();
			document.forms["main-form"]["in-chemical-totaleach"+fin_num].value = tot;			
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
			var dump = 0;
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
				var totalall = document.getElementsByName("in-stationary-totalall")[0].value;
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
