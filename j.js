function strChange(num) {
	var s = num.toString();
	return (s.substr(0,3) + "\n" + s.substr(3,3) + "\n" + s.substr(6,3)).replace("9", "_");
}

function Node(data, parent) {
	this.data = data;
	this.parent = parent;
	this.children = [];
	this.id = node_id++;
}

function pos9(num) {
	return num.toString().indexOf("9") + 1;
}

function swa(th, em, ne) {

	var st = th.toString();

	var go = st.substr(0, em - 1) + st.charAt(ne - 1).toString() + st.substr(em);

	return parseInt(go.substr(0, ne - 1) + "9" + go.substr(ne));

}

function possible(to) {

	var resu = [];

	var em = pos9(to);

	var up = em - 3;
	up = ((0 < up) && (up < 10)) ? up : 0;
	if (up) {resu.push(swa(to, em, up));}

	var down = em + 3;
	down = ((0 < down) && (down < 10)) ? down : 0;
	if (down) {resu.push(swa(to, em, down));}

	var left = (em % 3 != 1) ? (em - 1) : 0;
	if (left) {resu.push(swa(to, em, left));}

	var right = (em % 3 != 0) ? (em + 1) : 0;
	if (right) {resu.push(swa(to, em, right));}

	return resu;

}

function shuf(a) {
	for (var i = (a.length - 1); i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var te = a[i];
		a[i] = a[j];
		a[j] = te;
	}
	return a;
}

function gen(sc) {

	if (sc == 0) { return gen(1); }

	var cur = 123456789;
	for (var i = 0; i < sc; i++) {
		cur = shuf(possible(cur))[0];
	}

	if (cur == 123456789) { return gen(sc); }

	return cur;

}

var root;
var node_id;

function sorther(po, width) {

	var points = [];
	for (var i = 0; i < po.length; i++) {
		var poi = 0;
		for (var j = 0; j < 9; j++) {
			if ((po[i]).toString().charAt(j) == j.toString()) {
				poi++;
			}
		}
		points.push(poi.toString() + "_" + po[i].toString());
	}
	points.sort();

	var go = [];
	for (var i = 0; i < width; i++) {
		if (points.length > 0) {
			go.push(parseInt(points.shift().split("_")[1]));
		}
	}

	return go;

}

function solve1(puz, width, cut, herfirst) {

	var found = false;

	node_id = 0;
	root = new Node(puz, null);

	var visited = [];

	var queue = [];
	queue.push(root);
	var cur = queue.shift();
	while(!found && cur && ((cut == 0) || (node_id < cut))) {

		var possi = [];

		if (herfirst) {
			var possi0 = sorther(possible(cur.data), width);
			for (var i = 0; i < possi0.length; i++) { if (visited.indexOf(possi0[i]) == -1) { possi.push(possi0[i]); }}
		} else {
			var possi0 = possible(cur.data);
			for (var i = 0; i < possi0.length; i++) { if (visited.indexOf(possi0[i]) == -1) { possi.push(possi0[i]); }}
			possi = sorther(possi, width);
		}

		for (var i = 0; i < possi.length; i++) {
			var nod = new Node(possi[i], cur);
			cur.children.push(nod);
			queue.push(nod);
			visited.push(possi[i]);
			if (possi[i] == 123456789) { found = true; }
		}
		cur = queue.shift();

	}

	return found;

}

function solve2(puz, width, cut, herfirst) {

	var found = false;

	node_id = 0;
	root = puz

	var visited = [];

	var queue = [];
	queue.push(root);
	var cur = queue.shift();
	while(!found && cur && ((cut == 0) || (node_id < cut))) {

		var possi = [];

		if (herfirst) {
			var possi0 = sorther(possible(cur), width);
			for (var i = 0; i < possi0.length; i++) { if (visited.indexOf(possi0[i]) == -1) { possi.push(possi0[i]); }}
		} else {
			var possi0 = possible(cur);
			for (var i = 0; i < possi0.length; i++) { if (visited.indexOf(possi0[i]) == -1) { possi.push(possi0[i]); }}
			possi = sorther(possi, width);
		}

		for (var i = 0; i < possi.length; i++) {
			node_id++;
			queue.push(possi[i]);
			visited.push(possi[i]);
			if (possi[i] == 123456789) { found = true; }
		}
		cur = queue.shift();

	}

	return found;

}

module.exports.sol = function(p, w, c, h) {

	return solve2(p, w, c, h) ? node_id : 0;

}

module.exports.ge = function(s) {

	return gen(s);

}
