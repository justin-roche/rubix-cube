
(function(){

	app.cube = new app.Cube();
	app.viewer = new app.Viewer(); 
	

	function View(){
		viewInitialState(); 
		//addSlideListeners(); 
		addViewButtons();
		addListeners(); 
		var animate = false; 

		function addViewButtons(){

			$('button#front').on('click', function(){
				$('#cube').css('transform', 'rotateX(' + 0 + 'deg)');
				$('#cube').css('transform', 'rotateY(' + 0 + 'deg)');
			});
			$('button#left').on('click', function(){
				$('#cube').css('transform', 'rotateX(' + 0 + 'deg)');
				$('#cube').css('transform', 'rotateY(' + 90 + 'deg)');
			});
			$('button#back').on('click', function(){
				$('#cube').css('transform', 'rotateX(' + 0 + 'deg)');
				$('#cube').css('transform', 'rotateY(' + 180 + 'deg)');
			});
			$('button#right').on('click', function(){
				$('#cube').css('transform', 'rotateX(' + 0 + 'deg)');
				$('#cube').css('transform', 'rotateY(' + 270 + 'deg)');
			});
			$('button#down').on('click', function(){
				$('#cube').css('transform', 'rotateX(' + 90 + 'deg)');
				//$('#cube').css('transform', 'rotateY(' + 0 + 'deg)');
			});
			$('button#up').on('click', function(){
				$('#cube').css('transform', 'rotateX(' + 270 + 'deg)');
				//$('#cube').css('transform', 'rotateY(' + 0 + 'deg)');
			});
			

		}

		function viewInitialState(){
			app.viewer.fill(app.cube);

		}

		function addSlideListeners(){

			var xval = 360;
			var yval = 360;

			var xslider = new Slider('#xslide', {
				formatter: function(value) {
				return 'Current value: ' + value;
			}
			});

			var yslider = new Slider('#yslide', {
				formatter: function(value) {
				return 'Current value: ' + value;
			}
			});

			xslider.on('slide',function(xval){
				$('#cube').css('transform', 'rotateX(' + xval + 'deg)');
				
			});

			yslider.on('slide',function(yval){
				$('#cube').css('transform', 'rotateY(' + yval + 'deg)');

			});

			

		}

		function addListeners(){
			$('#rotate').on('click', function(e){
				var rotation = $('#rotation').val();
				app.cube.rotate(rotation);
				app.viewer.fill(app.cube);
			});
			$('#scramble').on('click', function(e){
				var rotations = [];
				for(var i = 0; i<5;i++){
					var names = app.faceNames.slice(0);
					names.splice(2,1);
					var randIndex = Math.floor(Math.random()*names.length);
					app.cube.rotate(names[randIndex]);
					rotations.push(names[randIndex]);
				}
				app.viewer.fill(app.cube);
				
			});
			$('#solve').on('click', function(e){
				
				//window.requestAnimationFrame(animateSolve);
				//can't work if blocked at all? 

				var solver = new app.Solver();

				var solution = solver.solve(app.cube);
				if(solution === null){solution = 'no solution found';}
				else{
					$('textarea#results').val(solution);
					animateSolution(solution);
				}

				function animateSolution(solution){
					solution = solution.split('');

					var interval = setInterval(nextRotation,3000);
					function nextRotation(){
						if(solution.length==0){
							window.clearInterval(interval);
						}else{
							var next = solution.shift();
							app.cube.rotate(next);
							app.viewer.fill(app.cube);
						}
					}
				}
				
				
			});
		}



	}

View();

})()

