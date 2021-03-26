class Widget {
	constructor(symbol, interval, container) {
		this.symbol = symbol;		
		this.interval = interval;
		this.container = container;
		this.update();
	}
	
	update() {
		var sym = "COINBASE:"+this.symbol;
		new TradingView.widget(
			{
				"autosize": true,
				"symbol": sym,
				"interval": this.interval,
				"timezone": "Etc/UTC",
				"theme": "dark",
				"style": "1",
				"locale": "en",
				"enable_publishing": false,
				"save_image": false,
				"container_id": this.container
			}
		);
	}
	
	setSymbol(symbol) {
		this.symbol = symbol;
		this.update();
	}
	
	setInterval(interval) {
		this.interval = interval;
		this.update();
	}
}