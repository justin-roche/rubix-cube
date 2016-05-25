var expect = chai.expect;

describe("Rubix Cube", function(){

	var clockwiseRotations = ['F','U','D','R','L'];
	var counterclockwiseRotations = ['f','u','d','r','l'];
	var allRotations = clockwiseRotations.concat(counterclockwiseRotations);

	function randomString(length){
		var str = '';
		var char = null;
		while(str.length < length){
			var last = str.length > 0? str[str.length-1]: '';
			
			str = str.concat(randomElement());

			while(invalid(str)){
				str = str.slice(0,str.length-1).concat(randomElement());
			}

			function invalid(str){
				var appended = str[str.length-1];

				if(last.toUpperCase()===appended.toUpperCase()){
					//same character test

					if( (last === last.toUpperCase()) && (appended === appended.toLowerCase()) ){
						//opposite case test
						return true;
					}
					if( (last === last.toLowerCase()) && (appended === appended.toUpperCase()) ){
						//opposite case test
						return true;
					}
				}
				
				return false; 
			}
		}



		function randomElement(){
			var index = Math.floor(Math.random()*allRotations.length);
			return allRotations[index];
		}
		return str;
	}

	function oppositeRotationSequence(str){

		var opposite = str.split('').reverse();
		opposite = opposite.map(function(char){
			if(char === char.toUpperCase()){
				return char.toLowerCase();
			}else{
				return char.toUpperCase();
			}
		});
		opposite = opposite.join('');
		return opposite;
	}


	describe("Rotate",function(){

		describe("unscramble",function(){

			it("unscrambles single rotations", function(){
				clockwiseRotations.forEach(function(v){
					var cube = new app.Cube();	
					cube.rotate(v);
					cube.rotate(v.toLowerCase());
					expect(cube.isSolved()).to.equal(true);	
				});
			});

			it("unscrambles double rotations", function(){

				var rotations = [];
				for (var i = 0; i<100; i++){
					rotations.push(randomString(2));
				}
				rotations.forEach(function(v){
					var cube = new app.Cube();	
					cube.rotate(v);
					cube.rotate(oppositeRotationSequence(v));
					expect(cube.isSolved()).to.equal(true);	
				});
			});

			it("unscrambles ten-digit rotations", function(){

				var rotations = [];
				for (var i = 0; i<100; i++){
					var sequence = randomString(10);
					rotations.push(sequence);
				}
				rotations.forEach(function(v){
					var cube = new app.Cube();	
					cube.rotate(v);
					cube.rotate(oppositeRotationSequence(v));
					expect(cube.isSolved()).to.equal(true);	
				});
			});

			it("unscrambles 50-digit rotations", function(){

				var rotations = [];
				for (var i = 0; i<100; i++){
					var sequence = randomString(50);
					rotations.push(sequence);
				}
				rotations.forEach(function(v){
					var cube = new app.Cube();	
					cube.rotate(v);
					cube.rotate(oppositeRotationSequence(v));
					expect(cube.isSolved()).to.equal(true);	
				});
			});

		});




	});

	describe("Solver",function(){

		it("solves single rotations", function(){
			allRotations.forEach(function(v){
				var cube = new app.Cube();	
				cube.rotate(v);

				var solver = new app.Solver(); 
				var result = solver.solve(cube)

				var expected = oppositeRotationSequence(v);
				expect(result).to.equal(expected);	
				});
		});

		

		it("solves duplicate rotations",function(){
			var rotation = 'dd';
			var cube = new app.Cube();	

			cube.rotate(rotation);

			var solver = new app.Solver(); 
			var result = solver.solve(cube)

			var expected = oppositeRotationSequence(rotation);
			expect(result).to.equal(expected);	

		});

		it("solves opposite rotations",function(){
			var rotation = 'lR';
			var cube = new app.Cube();	

			cube.rotate(rotation);

			var solver = new app.Solver(); 
			var result = solver.solve(cube)

			var expected = oppositeRotationSequence(rotation);
			expect(result).to.equal(expected);	

		});

		it("solves triple rotations", function(){

			var rotations = ['lru'];

			rotations.forEach(function(v){
				var cube = new app.Cube();
				var expected = oppositeRotationSequence(v);
		
				cube.rotate(v);

				var solver = new app.Solver(); 
				var result = solver.solve(cube)

				expect(result).to.equal(expected);	
			});
		});

		it.skip('solves five-digit rotations',function(){

			var rotation = 'uFFdrL';
			var expected  = oppositeRotationSequence(rotation);

			var cube = new app.Cube();
		
			cube.rotate(rotation);

			var solver = new app.Solver(); 
			var result = solver.solve(cube)

			expect(result).to.equal(expected);	

		})

		it.skip("solves randomly generated double rotations", function(){
			//fails for cases where there are multiple solutions 
			//non intersecting faces: (RL -> LR)
			//double rotations (rr -> RR)
			
			var rotations = [];
				for (var i = 0; i<100; i++){
					var sequence = randomString(2)
					rotations.push(sequence);
				}

			rotations.forEach(function(v){
				var cube = new app.Cube();
				var expected = oppositeRotationSequence(v);
		
				if(expected == 'Lr' || expected == 'uu' || expected == 'll'){
					debugger;
				}
				cube.rotate(v);

				var solver = new app.Solver(); 
				var result = solver.solve(cube)

				expect(result).to.equal(expected);	
			});
		});



	});

});