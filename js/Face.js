(function(){

	function Face(color,name){

		this._name = name; 
		this._initialColor = color; 
		//variables used for debugging

		this.contents = [[color,color,color],[color,color,color],[color,color,color]];

	}


	Face.prototype.row = function(num,val){
			//row and col are variadic and can accept an assignment to the accessed contents
			//if no assignment, send null as val by convention

			if(val === null){
				return this.contents[num].slice();
				//maintains as pure function
				
			}else{
				var r = this.contents[num];
				this.contents[num] = val; 
				return r; 
			}
		};

	Face.prototype.col = function(num, val){
			if(val === null){
				return this.contents.map(function(row){
					return row[num];
				}); 
			}else{
				var r = this.col(num,null);

				this.contents.forEach(function(row,i){
					row[num] = val[i];  
				}); 
				return r; 
			}
		};

	Face.prototype.rotate = function(direction){
			var newContents = [];

			if(direction == 'clockwise'){
				for(var i = 0; i<this.contents.length;i++){
					newContents[i] = this.col(i,null).reverse();
					//rotation of a 2d matrix requires a reverse! 
				}
			}
			if(direction == 'counterClockwise'){
				for(var i = 0, j = 2; i<3; i++,j--){
					newContents[i] = this.col(j,null);
				}
			}

			this.contents = newContents;
			
		} 

	app.Face = Face; 

})()


	