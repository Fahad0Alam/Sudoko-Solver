
var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j];
			}

			else
				arr[i][j].innerText = '';
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.newboard.grids[0].value;
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sudoku-api.vercel.app/api/dosuku')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};

function SudokuSolver(board, i, j, n) {
    // base case
    if (i == n)
    {
        FillBoard(board);
        return true;
    }

    // check if you are in  the board or not
    if (j == n)
    {
        return SudokuSolver(board, i + 1, 0, n);
    }

    // check if the cell is alreadyt filled
    if (board[i][j] != 0)
    {
        return SudokuSolver(board, i, j+1, n);
    }

    // filling the board with appropriate number
    for (let num = 1; num <= 9; num++)
    {
        // Check if num canbe filled
        if (isValid(board, i, j, num, n))
        {
            board[i][j] = num;
            let subAns = SudokuSolver(board, i, j + 1, n);
            if (subAns)
            {
                return true;
            }
            // Backtrackng if doesnt fit
            board[i][j] = 0;
        }
    }
    return false;

}


function isValid(board, i, j, num, n)
{

    // check row col
    for ( a = 0; a < n; a++)
    {
        if ((board[i][a] == num) || (board[a][j] == num))
        {
            return false;
        }
    }

    // subMatrix check
     rn = Math.sqrt(n);
     si = i - i % rn;
     sj = j - j % rn;

    for ( a = si; a < si + rn; a++)
    {
        for ( b = sj; b < sj + rn; b++)
        {
            if (board[a][b] == num)
            {
                return false;
            }
        }
    }

    return true;
}