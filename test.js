/*
let blessed = require('blessed');

let screen = blessed.screen({
    smartCSR:true
});

screen.title = 'pipes';
*/

function weighted_random(distribution, count) {
    let table = [];

    for(i in distribution) {
	for(let j = 0; j < distribution[i]*count; ++j) {
	    table.push(i)
	}
    }

    return function() {
	return table[Math.floor(Math.random() * table.length)]
    }
}

function print_matrix(m) {
    m.forEach(function(row) {
	row.forEach(function(col) {
	    process.stdout.write(col + " ")
	})
	process.stdout.write("\n")
    })
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// find a better way to search 
function get_nonzero_position(matrix) {
    for(let i = 0; i < matrix.length; ++i) {
	for(let j = 0; j < matrix[0].length; ++j) {
	    if(matrix[i][j] == 0) {
		return [i, j];
	    }
	}
    }
    return [undefined, undefined]
}


// 0 = down
// 1 = up
// 2 = left
// 3 = right
// 4 = terminate 
function make_slice(matrix, id, random_function) {

    let initial_positon = get_nonzero_position(matrix);
    let direction = random_function();

    let x = initial_positon[0], y = initial_positon[1];
    matrix[x][y] = id;

    // Look into weighted random numbers 
    let iter = 0;
    /*
    console.log(direction)
    console.log(x + " " + y)

    console.log(direction != 4)
    console.log(matrix[x][y] == 0)
    console.log(iter != 0)
    console.log(direction != 4 && (matrix[x][y] == 0 && iter != 0))
    */

    while(direction != 4) {
	if(matrix[x][y] != 0 && iter != 0) {
	    if(direction == 0 && y != matrix.length-1) {
		y++;
	    } else if (direction == 1 && y != 0) {
		y--;
	    } else if (direction == 2 && x != matrix.length-1) {
		x++;
	    } else if (direction == 3 && x != 0) {
		x--;
	    }
	    matrix[x][y] = id;
	}
	++iter
	direction = getRandomInt(5);
    }


    return matrix;
}


x = 12 
y = 8
let map = Array.from(Array(y), () => { return Array(x).fill(0)})
let ctr = 1;

let random_function = weighted_random({0: 30, 1: 30, 2: 10, 3: 10, 4: 20}, 5)


/*
let counter = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}
while(ctr <= 5000) {
    let k = random_funciton();
    counter[k]++
    ++ctr;
    
}*/


while(get_nonzero_position(map)[0] != undefined) {
    map = make_slice(map, ctr, random_function)
    ++ctr;
}

console.log(map);
