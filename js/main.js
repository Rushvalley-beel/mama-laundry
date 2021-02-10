$(function(){
	var dp1 = $('#dp1').datepicker().data('datepicker');
	dp1.selectDate(new Date());
	var dp2 = $('#dp2').datepicker().data('datepicker');
	dp2.selectDate(new Date());
})

document.getElementById('prod-type').addEventListener('change', function(){
	if (this.value == 1 ) {
		console.log("ctr");
		document.getElementById('calendar').style.display = 'flex'; 
		document.getElementById('menu-laundry').style.display = 'flex';
		document.getElementById('service-head').style.display = 'flex';
		var elem = document.getElementsByClassName("border menu");
		for (var i = 0; i < elem.length; i++) {
			elem[i].style.display = 'flex'
		};
	}
	else {
		document.getElementById('calendar').style.display = 'none';
		document.getElementById('menu-laundry').style.display = 'none';
		document.getElementById('service-head').style.display = 'none';	
		var elem = document.getElementsByClassName("border menu");
		for (var i = 0; i < elem.length; i++) {
			elem[i].style.display = 'none'
		}
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

var ctr = 0;
var pass_idx = 0;
var ctr_tmp = ctr;

function addItem() {
	var menuitem = document.getElementById("menu-laundry");
	var clone = menuitem.cloneNode(true);
	var name = menuitem.getAttribute(name) + (++ctr);
	clone.id = "menu-laundry";
	clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("select")[0].setAttribute("name","li-laundry-itemtype"+name);
	clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("button")[0].setAttribute("name","remove-item"+name);	
	clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("select")[0].setAttribute("id","itemtype"+name);
	clone.getElementsByClassName("form-wrapper item two")[0].getElementsByTagName("select")[0].setAttribute("name","li-laundry-servicetype"+name);	
	clone.getElementsByClassName("form-wrapper item two")[0].getElementsByTagName("select")[0].setAttribute("id","servicetype"+name);		
	clone.getElementsByClassName("form-wrapper item three")[0].getElementsByTagName("input")[0].setAttribute("name","in-laundry-qty"+name);
	clone.getElementsByClassName("form-wrapper item four")[0].getElementsByTagName("input")[0].setAttribute("name","in-laundry-totaleach"+name);

	clone.getElementsByClassName("form-wrapper item one")[0].getElementsByTagName("select")[0].selectedIndex = 0;
	clone.getElementsByClassName("form-wrapper item two")[0].getElementsByTagName("select")[0].selectedIndex = 0;
	clone.getElementsByClassName("form-wrapper item three")[0].getElementsByTagName("input")[0].value = null;
	clone.getElementsByClassName("form-wrapper item four")[0].getElementsByTagName("input")[0].value = 0;	

	document.getElementById("list-menu").appendChild(clone);

	var catch_item = document.getElementById("itemtype"+ctr);
	var catch_service = document.getElementById("servicetype"+ctr);	
	var fin_service_len = catch_service.options.length;
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

	// add event listener di setiap in-laundry-qty0 dengan format [""] [""]
	// nama in-laundry-qty[x] increment
};


function removeItem(x) {
	var catch_pass = 0;
	var len_list = document.getElementById("list-menu").getElementsByTagName("li").length
	if ( len_list > 1 ) {
		var menuitem = document.getElementById("list-menu");
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
	alert(x.name);
	var get_num = x.name;	
	var catch_num = get_num.split("remove-item"); 
	var fin_num = catch_num[1];	
	alert(fin_num);
	calcTotalAll(fin_num);
};

function changeItem(x) {
	var get_num = x.name;	
	var catch_num = get_num.split("li-laundry-itemtype"); 
	var fin_num = catch_num[1];
	document.getElementsByName("in-laundry-qty"+fin_num)[0].value = null;
	document.getElementsByName("in-laundry-totaleach"+fin_num)[0].value = 0;	
	var catch_item = document.getElementById("itemtype"+fin_num);
	var catch_service = document.getElementById("servicetype"+fin_num);	
	var fin_item_val = catch_item.options[catch_item.selectedIndex].value;
	if (fin_item_val != 1 && fin_item_val != 11) {
		catch_service.remove(4);
		catch_service.remove(4);		
	} else {
		var option4 = document.createElement("option");
		var option5 = document.createElement("option");		
		option4.text = "Dry Cleaning Rg";
		option4.value = "5"
		option5.text = "Dry Cleaning Ex";
		option5.value = "6"
		catch_service.add(option4);
		catch_service.add(option5);
	}
	calcTotalAll(null);
}

function changeSvc(x) {
	var get_num = x.name;	
	var catch_num = get_num.split("li-laundry-servicetype"); 
	var fin_num = catch_num[1];
	document.getElementsByName("in-laundry-qty"+fin_num)[0].value = null;
	document.getElementsByName("in-laundry-totaleach"+fin_num)[0].value = 0;
	calcTotalAll(null);
}

function calcItem(x) {
	var qty = x.value;	
	var get_num = x.name;
	var catch_num = get_num.split("in-laundry-qty"); 
	var fin_num = catch_num[1];
	var catch_item = document.getElementById("itemtype"+fin_num);
	var fin_item_val = catch_item.options[catch_item.selectedIndex].value;
	var fin_item_txt = catch_item.options[catch_item.selectedIndex].text;
	var catch_service = document.getElementById("servicetype"+fin_num);
	var fin_service_val = catch_service.options[catch_service.selectedIndex].value;
	var fin_service_txt = catch_service.options[catch_service.selectedIndex].text;
	var baseprice_item = 0;

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
	}

	calcSection(fin_service_val);
	alert(" item : " + fin_item_val + ", service : " + fin_service_val + ", price : " + baseprice_item);

	if (fin_item_val == "1" && fin_service_val != "5" && fin_service_val != "6") {
		if (qty < 3 && qty > 0) {
			qty = 3;
		}
	} else {
		qty = Math.floor(qty);
	}

	var tot = qty * baseprice_item;
	//var tot = tot.toLocaleString();
	document.forms["main-form"]["in-laundry-totaleach"+fin_num].value = tot;

	// buat looping, trycatch ?
	calcTotalAll(null);

};

function calcTotalAll(y) {
	// x = totalall, y = fin_num
	var x = 0;
	for (var j = 0; j <= ctr; j++) {
		try {
			var each_tot = document.forms["main-form"]["in-laundry-totaleach"+j].value
			if (each_tot != NaN && j != y) {
				x += parseInt(each_tot);
			}
			alert(each_tot + " index " + j);
		} catch(err) {
			alert("no index in " + j)
		}
	}
	document.getElementsByName("in-laundry-totalall")[0].value = x;
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
