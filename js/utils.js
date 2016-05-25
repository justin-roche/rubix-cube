(function(){
	
	var utils = {


		redundantRotations: function(str){
				var last = str[0];
				var appended = str[1];

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
			},

		persistBind: function(obj,method,earlyArg){
			//allow partial application later in rotateRings while binding to context early
			
			return function(lateArg){
				return obj[method](earlyArg,lateArg);
			}
		},		

	}

	app.utils = utils; 


})()