
(function(){

	function Viewer(){
		//fills in the cube divs

		$('#cube div').each(function(index){
			var div = $(this);
			div.attr('id',app.faceNames[index]);

			var table = $('<table>');
			

			//these two transforms allow the coordinate systems of the faces to be normalized along x and y axes
			//eg. a rotation of the right face affects only column 3 of all affected faces

			if(app.faceNames[index]=="D"){
				table.attr('style','transform: rotateX(180deg) rotateY(180deg);')
			}
			if(app.faceNames[index]=="B"){
				table.attr('style','transform: rotateX(0deg) rotateY(180deg);')
			}


			table.attr('width','100%');
			table.attr('height','100%');

			for(var i = 0; i<3;i++){
				var row = $('<tr>');
				for(var j = 0; j<3; j++){
					var el = $('<td>');
					el.addClass('cubeFace');
					row.append(el);
				}
				table.append(row);
			}

			div.append(table);
		});

		this.fill = function(cube){

			for(prop in cube.faces){
				var face = prop; 
				var contents = cube.faces[face].contents;
				var tableRows = $('#'+prop+' tr');

				for(var i = 0; i<tableRows.length;i++){
					var tableCells = $(tableRows[i]).find('td');

					for(var j=0;j<tableCells.length;j++){
						var color = contents[i][j];
						$(tableCells[j]).css('background-color',color);
						//$(tableCells[j]).html(String(i).concat(j));
						//adds indexes for debugging
					}
				}

			}

		}


	}

	app.Viewer = Viewer; 


})()

