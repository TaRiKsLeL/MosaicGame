var collss = 10;
var rowwss = 10;

var field_mas = [];


for (var i = 0; i < rowwss; i++) {
	field_mas[i] = [];
	for (var j = 0; j < collss; j++) {
		field_mas[i][j] = 0;
	}
}

var rez;
var results = document.getElementById('results');
var field = document.getElementById('field');

var gen_row;
var gen_cols = "";

draw_table();

field.addEventListener('click', function (e) {
	var target = e.target;

	if (target.tagName === 'TD') {

		if (field_mas[target.id[0]][target.classList[0]] == 1) {
			field_mas[target.id[0]][target.classList[0]] = 0;
		} else {
			field_mas[target.id[0]][target.classList[0]] = 1;
		}
		draw_table();
	}

}, false);

function draw_table() {
	var ryad = [];
	ryad.length = 0;
	var num_ryad = 0;

	field.innerHTML = "";
	for (var i = 0; i < rowwss; i++) {
		gen_row = document.createElement('tr');
		gen_row.className = "getn-tr";
		gen_cols = "";

		ryad[num_ryad] = 0;

		for (var j = 0; j < collss; j++) {
			gen_cols += "<td id = '" + i + "' class = '" + j;
			if (field_mas[i][j]) {} else {
				gen_cols += " empty";
			}
			gen_cols += "'>" + "</td>";

			if (field_mas[i][j] == 1) {
				ryad[num_ryad]++;
			} else {
				if (field_mas[i][j - 1] == 1) {
					num_ryad++;
					ryad[num_ryad] = 0;
				}
			}
		} /*j end*/
		if (ryad[num_ryad] != 0) {
			num_ryad++;
		}

		gen_row.innerHTML = gen_cols;
		field.appendChild(gen_row);
	}

	if (ryad[ryad.length - 1] == 0) {
		ryad.length--;
	}

	rez = 'Маємо ' + ryad.length + ' рядів: <br>';
	for (var k = 0; k < ryad.length; k++) {
		rez += 1 + k + '. ' + ryad[k] + '<br>';
	}

	results.innerHTML = '';
	results.innerHTML = rez;
}