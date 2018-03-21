var Canvas = {
	canvas : {},
	ctx : {},
	init : function(){
		this.canvas = document.getElementById('photo');
		this.ctx = this.canvas.getContext('2d');
	},
	getCanvas : function(){
		return this.canvas;
	},
	getCtx : function(){
		return this.ctx;
	}
}

var bus = {
	config : {
		word : {
			data : "",
			size : 60,
			x : 45,
			y : 120
		},
		title : {
			data : "",
			size : 60,
			x : 70,
			y : 550
		}
	},
	setImage : function(){
		var ctx = Canvas.getCtx();
		var img = document.getElementById('image');
		ctx.drawImage(img, 0, 0, 596, 588);
	},
	setTitle : function(data){
		var ctx = Canvas.getCtx();
		var config = this.config;
		config.title.data = data;
	},
	setWord : function(data){
		var ctx = Canvas.getCtx();
		var config = this.config;
		config.word.data = data;
	},
	draw : function(){
		this.setImage();
		var ctx = Canvas.getCtx();
		var config = this.config;
		ctx.fillStyle = "#666";
		ctx.save();
		ctx.font = "bolder " + config.word.size + "px 'SimSun'";
		ctx.fillText(config.word.data, config.word.x, config.word.y);
		ctx.restore();
		ctx.font = "bolder " +  config.title.size + "px 'SimSun'";
		ctx.fillText(config.title.data, config.title.x, config.title.y);
		var canvas = Canvas.getCanvas();
		var image = canvas.toDataURL('image/png');
		document.getElementById('photo_out').setAttribute('src', image);
	},
	move : function(obj, option){
		var config = this.config;
		if(option == "left" || option == "right"){
			option == "left" ? config[obj].x -= 2 : config[obj].x += 2;
		} else if(option == "up" || option == "down"){
			option == "up" ? config[obj].y -= 2 : config[obj].y += 2;
		} else if (option == "smaller" || option == "bigger"){
			console.log(option)
			option == "smaller" ? config[obj].size -= 2 : config[obj].size += 2;
		}

		this.draw();
	}
}

var events = {
	init : function(){
		var word_data = document.getElementById('word_data');
		var title_data = document.getElementById('title_data');
		var buttons = document.getElementsByTagName('button');
		for(var i=0;i<buttons.length;i++) {
			buttons[i].addEventListener('click', function(e){
				var option = e.srcElement.attributes.option.value;
				var obj = e.srcElement.attributes.obj.value;

				bus.move(obj, option)
			})
		}
		bus.setWord(word_data.value);
		bus.setTitle(title_data.value);
		word_data.addEventListener('input', function(e){
			bus.setWord(word_data.value);
			bus.draw();
		})

		title_data.addEventListener('input', function(e){
			bus.setTitle(title_data.value);
			bus.draw();
		})
	}
}

window.onload = function(){
	Canvas.init();
	bus.setImage();
	events.init();
	bus.draw();
}