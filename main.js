document.addEventListener('DOMContentLoaded', function(){
	cells = document.querySelectorAll('table.laberinto div');
	cells[0].setAttribute('style','background:yellow;');
	cells[188].setAttribute('style','background:yellow;');

	setHwalls(cells);
	setVwalls(cells);
	markNodes(cells);

	nodes = new Array();
	nodes = searchNodes(cells);
	var way = new Array(); 
	printNodes(nodes)

	if (BFS(nodes)) {
		way = wayBack(nodes);
	} else {
		document.querySelectorAll('body')[0].setAttribute('style','background:red;');
	}
	drawWay(way, cells);
},false);

function markNodes(cells) {
	var counter = 0;
	for (var i = 0; i < cells.length; i++) {
		if (cells[i].innerHTML == '') {
			cells[i].innerHTML = ' ' + counter + ' ';
			counter++;
		} else {
			cells[i].innerHTML = '';
		}
	}
}

function BFS(nodes) {
	// node buscado 188
	var L = new Array();
	// meter raiz a la lista L
	L.push(nodes[0]);

	nodes[0].state = 1;

	while (L.length > 0) {
		// sacar el primer nodo del elemento
		var node = L[0];
		// generar todos los hijos del nodo
		for (var i = 0; i < node.sons.length; i++) {
			if (nodes[node.sons[i]].state == 2) {
				nodes[node.sons[i]].father = node.name;
				return true;
			} else if (nodes[node.sons[i]].state == 0) {
				nodes[node.sons[i]].state = 1;
				nodes[node.sons[i]].father = node.name;
				L.push(nodes[node.sons[i]]);
			} 
		}
		L.splice(0,1);
	}
}


function wayBack(nodes) {
	var way = new Array();
	var node = new Object();

	for (var i = 0; i < nodes.length; i++) {
		if (nodes[i].state == 2) {
			node = nodes[i];
		}
	}

	while (true) {
		way.push(node.father);
		node = nodes[node.father];
		if (node.name == 0) {
			break;
		}
	}
	return way;
}

function drawWay(way, cells) {
	var blocks = new Array();
	for (var i = 0; i < cells.length; i++){
		for (var j = 0; j < way.length; j++) {
			if (parseInt(cells[i].innerHTML) == way[j]) {
				blocks.push(i);
			}
		}
	}
	for (var i = 0; i < blocks.length; i++) {
		cells[blocks[i]].setAttribute('style','background:yellow;');
	}
}

function searchNodes(cells) {
	var nodes = new Array();
	for (var i = 0; i < cells.length; i++) {
		if (cells[i].innerHTML != '') {
			var sons = new Array();

			var state = 0;

			try {
				if ((cells[i-1].innerHTML != '') && ((i) % 14 != 0)) {
					sons.push(parseInt(cells[i-1].innerHTML));
				} else {
					// console.log(cells[i]);
				}
			} catch (e) {
				// console.log(cells[i]);
			}
			try {
				if ((cells[i+1].innerHTML != '') && ((i+1) % 14 != 0)) {
					sons.push(parseInt(cells[i+1].innerHTML));
				} else {
					// console.log(cells[i]);
				}
			} catch (e) {
				// console.log(cells[i]);
			}
			try {
				if (cells[i+14].innerHTML != '') {
					sons.push(parseInt(cells[i+14].innerHTML));
				} else {
					// console.log(cells[i]);	
				}
			} catch (e) {
				// console.log(cells[i]);
			}

			try {
				if (cells[i-14].innerHTML != '') {
					sons.push(parseInt(cells[i-14].innerHTML));
				} else {
					// console.log(cells[i]);
				}
			} catch (e) {
				// console.log(cells[i]);
			}

			if (i == 188) {
				state = 2;
			}

			var node = new Object();
			node = {
				name: parseInt(cells[i].innerHTML),
				father: null,
				sons: sons,
				state: state
			}
			nodes.push(node);
		}
	}
	return nodes;
}

function printNodes(nodes) {
	for (var i = 0; i < nodes.length; i++) {
		console.log(nodes[i].name);
		console.log(nodes[i].father);
		console.log(nodes[i].sons);
		console.log(nodes[i].state);
		console.log('\n');
	}
}

function setHwalls(cells) {
	for (var i = 0; i < 10; i++) {

		var baseh = Math.floor(Math.random()*196);

		if (((baseh+2)%14 != 0 && (baseh+1)%14 != 0) && 
			(cells[baseh].innerHTML == '' && cells[baseh+1].innerHTML == '' && cells[baseh+2].innerHTML == '') && 
			(baseh != 0 && (baseh+1) != 0 && (baseh+2) != 0) && 
			(baseh != 188 && (baseh+1) != 188 && (baseh+2) != 188)) {

			cells[baseh].setAttribute('style','background:black;');
			cells[baseh + 1].setAttribute('style','background:black;');
			cells[baseh + 2].setAttribute('style','background:black;');

			cells[baseh].innerHTML = '|';
			cells[baseh + 1].innerHTML = '|';
			cells[baseh + 2].innerHTML = '|';
		} else {
			i--;
		}
	}
}

function setVwalls(cells) {
	for (var i = 0; i < 10; i++) {

		var basev = Math.floor(Math.random()*196);

		if ((basev + 14) >= 182) {
			i--;
		} else if (cells[basev].innerHTML == '' && cells[basev+14].innerHTML == '' && cells[basev+28].innerHTML == '' && 
			basev != 0 && (basev+14) != 0 && (basev+28) != 0 && 
			basev != 188 && (basev+14) != 188 && (basev+28) != 188) {
			
			cells[basev].setAttribute('style','background-color: black;');
			cells[basev + 14].setAttribute('style','background-color: black;');
			cells[basev + 28].setAttribute('style','background-color: black;');

			cells[basev].innerHTML = '-';
			cells[basev + 14].innerHTML = '-';
			cells[basev + 28].innerHTML = '-';
		} else {
			i--;
		}
	}
}