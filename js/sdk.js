// new PMSdk({
// 	canvasid : "photo",
//  outid : "photo_out",
// 	imageid : "image",
// 	width : 596,
// 	height : 588
// }, {
// 	word : {
// 		data : "",
// 		size : 60,
// 		x : 45,
// 		y : 120
// 	}
// })

function PMSdk(options, config) {
	/*
	* canvasid imgid
	*/

	var common = {
		error : function(msg){
			console.error('Sdk Error:' + msg);
		}
	}
	var canvas = {},
		ctx = {},
		img;
	var _options = {};
	var _config = {};
	var self = this;

	var init = function(){
		//属性
		_options['canvasid'] = options['canvasid'];
		_options['height'] = options['height'];
		_options['width'] = options['width'];
		_options['imageid'] = options['imageid'];
		_options['outid'] = options['outid'];
		if(!_options['canvasid'] || !_options['width'] || !_options['height']
			|| !_options['imageid']){
			common.error('canvasid is empty in contructer.');
			return ;
		}
		img = document.getElementById(_options['imageid']);


		//元素配置
		_config = config;
		var _default = {
			data : "",
			size : 60,
			x : 10,
			y : 10
		}
		for(var i in _config){
			for(var k in _default){
				_config[i][k] == undefined ? _config[i][k] = _default[k] : _config[i][k] = _config[i][k];
			}
		}

		canvas = document.getElementById(_options['canvasid']);
		ctx = canvas.getContext('2d');

		bus.draw();
	}

	//bussiness
	var bus = {
		setImage : function(){
			ctx.drawImage(img, 0, 0, _options['width'], _options['height']);
		},
		draw : function(){
			this.setImage();
			for(var i in _config){
				console.log(_config[i])
				ctx.save();
				ctx.font = "bolder " + _config[i].size + "px 'SimSun'";
				ctx.fillText(_config[i].data, _config[i].x, _config[i].y);
				ctx.restore();
			}
			var image = canvas.toDataURL('image/png');
			document.getElementById(_options['outid']).setAttribute('src', image);
		},
		option : function(obj, opt, data){
			data = data || 2;
			_config[obj][opt] += data;
			this.draw();
		},
		setWord : function(obj, data){
			_config[obj]['data'] = data;
			this.draw();
		}
	}

	//entry
	init();

	//api : 
	this.bus = bus;
}