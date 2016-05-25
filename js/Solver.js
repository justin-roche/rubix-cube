(function(){
	
	function Solver(){
		var self= this; 

		this.inputCube = null;
		this.rotations = [
							 "U","u",
							 "F","f",
							 "R","r",
							 "L","l",
							 "D","d"]; 

		this.solve = function(cube){
			this.inputCube = cube; 
			result = search(cube);
			return result;
		}

		function search(inputCube){
				//started as breadth-first search because all can be solved in 22 moves
				var redundantTest = app.utils.redundantRotations;

				var sequenceGroups = [[],[],[],[],[],[],[],[],[]];
				//holds sequences based on entropy

				var cubeGroups = [[],[],[],[],[],[],[],[],[]];
				//holds matching cubes to avoid reinstantiation

				var startSequences = self.rotations.slice(0);
	
				var startCubes = self.rotations.map(function(){
					return copyCube(inputCube);
				}); 

				cubeGroups[8] = startCubes;
				sequenceGroups[8] = startSequences;
				//asigned highest entropic priority 
				
				var i = 0;
				while(true){
					for(var e = 8; e>-1; e--){
						//iterate through entropy groups

						if(sequenceGroups[e].length>0){
							//skip entropy groups that don't have members

							var cubeGroup = cubeGroups[e];
							var sequenceGroup = sequenceGroups[e];

							var sequence = sequenceGroup[0];
							//always shifted from first position

							var rotation = sequence[sequence.length-1];
							//entire sequences are stored for returning results, but we only apply the last char

							var sequenceCube = copyCube(cubeGroup[0]);
							//makeTestCube clones the existing cube
							//always shifted from first position
					 
								sequenceCube.rotate(rotation);
								var rotationCube = sequenceCube; 
								/*mutates sequence cube with one rotation; this will be associated with each child sequence
								cube.rotate(F)
								running through all permutations will rotate back to original position
								before it is referenced by the next sequence*/

								var result = rotationCube.isSolved();
								var negEnt = negEntropy(rotationCube);
								console.log('depth: '+ sequence.length + ' negEnt:' + negEnt);

								if(result === true){
									return sequence;
								}
								else{
									
									if(sequence.length === 22){}
									else{
										self.rotations.forEach(function(rotation){
										//add the next rotation branch-strings

										var lastInSequence = sequence[sequence.length-1];
										if(redundantTest(lastInSequence+rotation)){
											//don't add redundant sequences
										}
										else{
											sequenceGroups[negEnt].push(sequence + rotation);
											cubeGroups[negEnt].push(rotationCube)
										}
									});
									}
								}
								sequenceGroup.shift();
								cubeGroup.shift();
							}
						
						}
						i = i+1; 
						//counter for debugging
				}
		}

		function copyCube(cube){
			var testCube = new app.Cube();
			for(faceName in cube.faces){
				testCube.faces[faceName].row(0,cube.faces[faceName].row(0,null));
				testCube.faces[faceName].row(1,cube.faces[faceName].row(1,null));
				testCube.faces[faceName].row(2,cube.faces[faceName].row(2,null));
			}
			return testCube;
		}

		function negEntropy(cube){

			var front = cube.faces.F.contents; 
			var top = cube.faces.U.contents;
			var left = cube.faces.L.contents;
			var right = cube.faces.R.contents;
			var down = cube.faces.D.contents;

			var total = countColors(front) + countColors(top) + countColors(left)+countColors(right)+countColors(down);

			return Math.floor(total/5)-1;

			function countColors(contents){
				var colors = [];
				var counts = []; 

				for (var i = 0; i<3;i++){
					for(var j = 0; j<3; j++){
						var color = front[i][j];
						var index = colors.indexOf(color);
						if(index === -1){
							colors.push(color);
							counts.push(1);
						}
						else{
							counts[index] = counts[index]+1; 
						}
					}

				}

				counts.sort(function(a,b){
					return a < b; 
					//less than -> ascending order
				});

				return counts[0];
			}
			

		}
		
	}

	app.Solver = Solver; 


})()