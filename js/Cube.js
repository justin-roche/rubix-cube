(function(){

	function Cube(){
		this.faces = {};
		this.setInitial();
	}

	Cube.prototype.setInitial = function(){

			for(var i = 0; i<6;i++){
				this.faces[app.faceNames[i]] = new app.Face(app.faceColors[i],app.faceNames[i]);
			}

		var persistBind = app.utils.persistBind; 

		this.rings = {F: 
			//the rings settings describe which intra-face rows/columns are associated with each other
			//rotation F affects both rows and columns, U and D affect rows, L and R affect columns
			//U-rotations are not used in algorithms, so we confine irregular rotation descriptions to this axis
			[persistBind(this.faces["U"],'row',2),
			persistBind(this.faces["R"], 'col',0),
			persistBind(this.faces['D'], 'row',0), 
			persistBind(this.faces['L'], 'col',2)],
			
		  U: 
		    //U and D affect only rows
		  	[persistBind(this.faces["L"],'row',0), 
		  	persistBind(this.faces['B'], 'row',0),
		  	persistBind(this.faces['R'], 'row',0),
		  	persistBind(this.faces['F'], 'row',0)],

		  D: 
		  	[persistBind(this.faces["L"],'row',2), 
		  	persistBind(this.faces['F'], 'row',2),
		  	persistBind(this.faces['R'], 'row',2),
		  	persistBind(this.faces['B'], 'row',2)],
		  R: 
		   [persistBind(this.faces["U"],'col',2), 
		  	persistBind(this.faces['B'], 'col',2),
		  	persistBind(this.faces['D'], 'col',2),
		  	persistBind(this.faces['F'], 'col',2)],
		  //L and R affect only columns
		  L: 
		   [persistBind(this.faces["U"],'col',0), 
		  	persistBind(this.faces['F'], 'col',0),
		  	persistBind(this.faces['D'], 'col',0),
		  	persistBind(this.faces['B'], 'col',0)],
		 };	
		};

	Cube.prototype.rotate = function(rotations){
		
		rotations = rotations.split('');

		for(var i = 0; i<rotations.length; i++){
			var rotation = rotations[i];

			if(rotation === rotation.toLowerCase()){
				direction = 'counterClockwise'; 
			}else{
				direction = 'clockwise'
			}
		
			rotation = rotation.toUpperCase();
			//clockwise and counterclockwise are always assigned to one of two states

			this.rotateRings(rotation,direction);
			this.faces[rotation].rotate(direction);
			//on any rotation there are two main jobs: rotate the face and rotate the
			//associated "ring" on the other faces
		}
	};

	Cube.prototype.rotateRings = function(face,direction){
		var ring = this.rings[face].slice(0);

		if(direction === "counterClockwise"){
			ring = ring.reverse(); 
		}
		
		ring.reduce(function(prevContents,accessorFn,index){
			
			if(prevContents.length == 0){
				prevContents = ring[3](null);
				//if this is the first access, copy the contents from the final ring accessor
			}

			prevContents = accessorFn(prevContents); 
			//get the current contents/update the current row/column
			return prevContents; 

		},[]);
	}

	Cube.prototype.isSolved = function(){
		var self = this; 

		var faces = Object.keys(this.faces).slice(0,-1).map(function(faceName){
			//slice because we only need to test 5 faces

			return self.faces[faceName];
		});

		return faces.every(function(face){
			return face.contents.every(function(row){
				return row.every(function(cell){
					return cell === face._initialColor; 
				});
			});
		});	
	};

	app.Cube = Cube; 

})()