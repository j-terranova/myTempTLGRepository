

const findSquareInRow = (board, fillValue, fillCount, freeCount) => {
let selectSquare = {    x: "0",
                        y: "0"};
//console.log("SimpleTicTacToeMoves - findQuareInRow - fillValue = ", fillValue );
//console.log("SimpleTicTacToeMoves - findQuareInRow - fillCount = ", fillCount );
//console.log("SimpleTicTacToeMoves - findQuareInRow - freeCount = ", freeCount );
    for(let i=0; i<board.length; i++) {
        let actualFillCount = 0;
        let actualFreeCount = 0;
        for(let j=0; j<board[i].length; j++) {
            if (board[i][j] === fillValue)
            {
                actualFillCount = actualFillCount + 1;
            }
            if (board[i][j] === "0")
            {
                actualFreeCount = actualFreeCount + 1;
                selectSquare.x = i;
                selectSquare.y = j;
            }
        }
        //console.log("SimpleTicTacToeMoves - findQuareInRow - actualFillCount = ", actualFillCount );
        //console.log("SimpleTicTacToeMoves - findQuareInRow - actualFreeCount = ", actualFreeCount );
        if (actualFillCount === fillCount && actualFreeCount === freeCount)
        {
            //console.log("SimpleTicTacToeMoves - findQuareInRow - square selected, i = ", selectSquare.x, " j = ",selectSquare.y )
            return selectSquare;
        }
    }
    return null;
}

function getCol(matrix, col){
    let column = [];
    for(let k=0; k<matrix.length; k++){
       column.push(matrix[k][col]);
    }
    return column;
 }

const findSquareInColumn = (board, fillValue, fillCount, freeCount) => {
let selectSquare = {    x: "0",
                        y: "0"};
    for(let j=0; j<board.length; j++) {
        //let currentColumn = getCol(board,j)
        let actualFillCount = 0;
        let actualFreeCount = 0;
        //console.log("SimpleTicTacToeMoves - findQuareInColumn - column # = ", j );
        //console.log("SimpleTicTacToeMoves - findQuareInColumn - column data = ", currentColumn );
        for(let i=0; i<board[j].length; i++) {
            //console.log("SimpleTicTacToeMoves - findQuareInColumn - at poistion = " + i  + "  value = " + board[i][j]);
            if (board[i][j] == fillValue)
            {
                actualFillCount = actualFillCount + 1;
                //console.log("SimpleTicTacToeMoves - findQuareInColumn - match with fillValue = ", fillValue);
            }
            if (board[i][j] == "0")
            {
                actualFreeCount = actualFreeCount + 1;
                selectSquare.x = i;
                selectSquare.y = j;
                //console.log("SimpleTicTacToeMoves - findQuareInColumn - match with O ");
            }
        }
        if (actualFillCount === fillCount && actualFreeCount === freeCount)
        {
            //console.log("SimpleTicTacToeMoves - findQuareInColumn - square selected, i = ", selectSquare.x, " j = ", selectSquare.y )
            return selectSquare;
        }
        //console.log("SimpleTicTacToeMoves - findQuareInColumn - fillValue = ", fillValue );
        //console.log("SimpleTicTacToeMoves - findQuareInColumn - fillCount = ", fillCount );
        //console.log("SimpleTicTacToeMoves - findQuareInColumn - freeCount = ", freeCount );
        //console.log("SimpleTicTacToeMoves - findQuareInColumn - actualFillCount = ", actualFillCount );
        //console.log("SimpleTicTacToeMoves - findQuareInColumn - actualFreeCount = ", actualFreeCount );
    }

    return null;
}

const findSquareInDiagonal = (board, fillValue, fillCount, freeCount) => {
let selectSquare = {    x: "0",
                        y: "0"};
let actualFillCount = 0;
let actualFreeCount = 0;
let width = board.length;
    for(let i=0; i<width; i++) {

        if (board[i][i] === fillValue)
        {
            actualFillCount = actualFillCount + 1;
        }
        if (board[i][i] === "0")
        {
            actualFreeCount = actualFreeCount + 1;
            selectSquare.x = i;
            selectSquare.y = i;
        }
    }
    if (actualFillCount === fillCount && actualFreeCount === freeCount)
    {
        //console.log("SimpleTicTacToeMoves - findQuareInDiagonal - square selected, i = ", selectSquare.x, " j = ", selectSquare.y )
        return selectSquare;
    }
    return null;
}

const findSquareInAntiDiagonal = (board, fillValue, fillCount, freeCount) => {
let selectSquare = {    x: "0",
                        y: "0"};
let actualFillCount = 0;
let actualFreeCount = 0;
let width = board.length;
    for(let i=0; i<width; i++) {

        if (board[i][(width - 1) - i] === fillValue)
        {
            actualFillCount = actualFillCount + 1;
        }
        if (board[i][(width - 1) - i] === "0")
        {
            actualFreeCount = actualFreeCount + 1;
            selectSquare.x = i;
            selectSquare.y = (width - 1) - i;
        }
    }
    if (actualFillCount === fillCount && actualFreeCount === freeCount)
    {
        //console.log("SimpleTicTacToeMoves - findQuareInAntiDiagonal - square selected, i = ", selectSquare.x, " j = ", selectSquare.y )
        return selectSquare;
    }
    return null;
}

const findFirstFreeSquare = (board) => {
let selectSquare = {    x: "0",
                        y: "0"};
    for(let i=0; i<board.length; i++) {
        for(let j=0; j<board[i].length; j++) {
            if (board[i][j] === "0")
            {
                selectSquare.x = i;
                selectSquare.y = j;
                console.log("SimpleTicTacToeMoves - findFirstFreeSquare - square selected, i = ", selectSquare.x, " j = ", selectSquare.y )
                return selectSquare;
            }
        }
    }
    return null;
}

const findSquareForAutomatedMove = (board) => {
let selectSquare = {    x: "0",
                        y: "0"};
let width = board.length;
    for(let i=0; i<width; i++) {
        let fillCount = width-i-1;
        let freeCount = i+1;

        //console.log("SimpleTicTacToeMoves - findSquareForAutomatedMove - row/column = ", i )
        //console.log("--------------------------------------------------------" )

        // Check if Player 2 ("X"), automated player, is close to winning and if so, use that square
        selectSquare = findSquareInRow (board, "X", fillCount, freeCount)
        if (selectSquare != null) return selectSquare;
        selectSquare = findSquareInColumn (board, "X", fillCount, freeCount)
        if (selectSquare != null) return selectSquare ;      
        selectSquare = findSquareInDiagonal (board, "X", fillCount, freeCount)
        if (selectSquare != null) return selectSquare ;  
        selectSquare = findSquareInAntiDiagonal (board, "X", fillCount, freeCount)
        if (selectSquare != null) return selectSquare ; 

        // if Player 2 is not close to winning then place an "X" that will deter player 1 from winning.
        // Check if Player 1 ("O") is close to winning and if so, fill the square that will prevent a win
        selectSquare = findSquareInRow (board, "O", fillCount, freeCount)
        if (selectSquare != null) return selectSquare;
        selectSquare = findSquareInColumn (board, "O", fillCount, freeCount)
        if (selectSquare != null) return selectSquare ;      
        selectSquare = findSquareInDiagonal (board, "O", fillCount, freeCount)
        if (selectSquare != null) return selectSquare ;  
        selectSquare = findSquareInAntiDiagonal (board, "O", fillCount, freeCount)
        if (selectSquare != null) return selectSquare ;

    }
    console.log ("simpleTicTacToeMoves - findSquareForAutomatedMove - Looks like it might be a DRAW!")
    //selectSquare = findFirstFreeSquare(board);
    //return selectSquare;
    return null;
};

export default {
    findSquareForAutomatedMove,
  };