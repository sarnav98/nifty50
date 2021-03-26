var intv = new Cookie("interval");
var sym0 = new Cookie("symbol_0");
var sym1 = new Cookie("symbol_1");
var sym2 = new Cookie("symbol_2");
var sym3 = new Cookie("symbol_3");
var sym4 = new Cookie("symbol_4");
var sym5 = new Cookie("symbol_5");
var sym6 = new Cookie("symbol_6");
var sym7 = new Cookie("symbol_7");
var sym8 = new Cookie("symbol_8");
var cookies = [sym0, sym1, sym2, sym3, sym4, sym5, sym6, sym7, sym8];

var interval = intv.get() || 15;
var s0 = sym0.get() || "BTCUSD";
var s1 = sym1.get() || "ETHUSD";
var s2 = sym2.get() || "XTZUSD";
var s3 = sym3.get() || "LRCUSD";
var s4 = sym4.get() || "BNTUSD";
var s5 = sym5.get() || "GRTUSD";
var s6 = sym6.get() || "DNTUSDC";
var s7 = sym7.get() || "CVCUSDC";
var s8 = sym8.get() || "BATUSDC";

var a = new Widget(s0, interval, "tradingview_0");
var b = new Widget(s1, interval, "tradingview_1");
var c = new Widget(s2, interval, "tradingview_2");
var d = new Widget(s3, interval, "tradingview_3");
var e = new Widget(s4, interval, "tradingview_4");
var f = new Widget(s5, interval, "tradingview_5");
var g = new Widget(s6, interval, "tradingview_6");
var h = new Widget(s7, interval, "tradingview_7");
var i = new Widget(s8, interval, "tradingview_8");
var widgets = [a, b, c, d, e, f, g, h, i];

function setSymbol(i, symbol) {
	widgets[i].setSymbol(symbol);
	cookies[i].set(symbol);
}

function setTimeInterval(x) {
	event.preventDefault();
	
	a.setInterval(x);
	b.setInterval(x);
	c.setInterval(x);
	d.setInterval(x);
    e.setInterval(x);
    f.setInterval(x);
    g.setInterval(x);
    h.setInterval(x);
    i.setInterval(x);
	
	intv.set(x);
}

function loadProducts() {
	//Fetch products from REST api and sort in groups
	var products = {"USD":[], "USDC":[], "BTC":[]};
	var xhttp = new XMLHttpRequest();
	var res = null;
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200)
			res = JSON.parse(this.responseText);
	};
	xhttp.open("GET", "https://api.pro.coinbase.com/products", false);
	xhttp.send();
	
	for(var i = 0; i < res.length; i++) {
		var parts = res[i]["display_name"].split("/");
		if(parts[1] != "EUR" && parts[1] != "GBP"){
			if(products[parts[1]] == null)
				products[parts[1]] = [parts[0]+"-"+parts[1]];
			else
				products[parts[1]].push(parts[0]+"-"+parts[1]);
		}
	}
	
	//Generate url from product list for loading left widget
	var url = 'https://s.tradingview.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22dateRange%22%3A%221d%22%2C%22showChart%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22largeChartUrl%22%3A%22%22%2C%22isTransparent%22%3Afalse%2C%22plotLineColorGrowing%22%3A%22rgba(25%2C%20118%2C%20210%2C%201)%22%2C%22plotLineColorFalling%22%3A%22rgba(25%2C%20118%2C%20210%2C%201)%22%2C%22gridLineColor%22%3A%22rgba(42%2C%2046%2C%2057%2C%201)%22%2C%22scaleFontColor%22%3A%22rgba(120%2C%20123%2C%20134%2C%201)%22%2C%22belowLineFillColorGrowing%22%3A%22rgba(33%2C%20150%2C%20243%2C%200.12)%22%2C%22belowLineFillColorFalling%22%3A%22rgba(33%2C%20150%2C%20243%2C%200.12)%22%2C%22symbolActiveColor%22%3A%22rgba(33%2C%20150%2C%20243%2C%200.12)%22%2C%22tabs%22%3A%5B';
	
	var j = 0;
	for(var k in products) {
		products[k].sort();
		if(j > 0){
			url += '%2C';
		}
		url += '%7B%22title%22%3A%22'+k+'%22%2C%22symbols%22%3A%5B';
		for(var i = 0; i < products[k].length; i++) {
			var product = products[k][i];
			url += '%7B%22s%22%3A%22COINBASE%3A'+product.replace("-","")+'%22%7D';
			if(i < products[k].length - 1){
				url += '%2C';
			} else {
				url += '%5D%7D';
			}
		}
		j += 1;
	}
	url += '%5D%2C%22utm_source%22%3A%22%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22market-overview%22%7D';
	
	//Load product list as html for dropdown boxes
	//var html = '<option value="" selected="selected" disabled hidden>SELECT: </option>';
    var html = '';
	for(var k in products) {
		products[k].sort();
		for(var i = 0; i < products[k].length; i++) {
			var product = products[k][i];
			html += '\n<option value="'+product.replace("-","")+'">'+product+'</option>';
		}
		html += '\n<option disabled>---------</option>';
	}
	return html;
}

html = loadProducts();
function loadDropbox(id) {
	var x = document.getElementById(id);
    var line0 = '<option value="" selected="selected" disabled hidden>Chart '+id.split("_")[1]+'</option>';
    
	x.innerHTML = line0+html;
	x.onchange = function() {
		setSymbol(Number(id.split("_")[1])-1, x.value);
	}
}

loadDropbox("dropbox_1");
loadDropbox("dropbox_2");
loadDropbox("dropbox_3");
loadDropbox("dropbox_4");
loadDropbox("dropbox_5");
loadDropbox("dropbox_6");
loadDropbox("dropbox_7");
loadDropbox("dropbox_8");
loadDropbox("dropbox_9");




