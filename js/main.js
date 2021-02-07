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
	clone.setAttribute("name",name);
	document.getElementById("list-menu").appendChild(clone);
	document.getElementById("menu-laundry" + name).addEventListener("oninput",calcItem);
	// add event listener di setiap in-laundry-qty0 dengan format [""] [""]
	// nama in-laundry-qty[x] increment
};


function removeItem() {
	var len_list = document.getElementById("list-menu").getElementsByTagName("li").length
	if ( len_list > 1 ) {
		var menuitem = document.getElementById("list-menu");
		for (var i = 0; i < len_list; i++) {
			(function(index){
				menuitem.children[i].onclick = function() {
					pass_idx = index;
					if ( pass_idx > 0 ) {
						menuitem.removeChild(menuitem.getElementsByTagName("li")[pass_idx]);
					}
				}
			})(i);
		}
	}
};

function calcItem() {
	var qty = document.forms["main-form"]["in-laundry-qty"].value;
	if (qty < 2.5 && qty > 0) {
		var qty = 2.5;
	}
	var tot = qty * 8000;
	var tot = tot.toLocaleString();
	document.forms["main-form"]["in-laundry-totaleach"].value = tot;
};

function checkInputFocus() {
	let input_form = document.getElementById('menu-laundry');
	if (document.hasFocus()) {
		ctr_tmp = input_form.name
	}
};