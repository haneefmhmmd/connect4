let player1=prompt("Player 1,Enter Your Name! You will be red colour");
let player1Color='rgb(255, 25, 0)';
let player2=prompt("Player 2,Enter Your Name! You will be blue colour");
let player2Color='rgb(216, 240, 0)';

let table=$('table tr');

function reportWin(rowNum,colNum) {
    console.log("You won starting at this row,col");
    console.log(rowNum);
    console.log(colNum);
  }

function returnColor(rowIndex,colIndex)
{
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function changeColor(rowIndex,colIndex,color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function bottomRow(colIndex){
    var colorChecker;
    for (var row=5;row>-1;row--)  {
        colorChecker=returnColor(row,colIndex);
        if(colorChecker === 'rgb(0, 0, 0)'){
            return row;
        }
    }
}

function colourMatchChecker(one,two,three,four){
    return one==two && one==three && one==four && one!=undefined && one!='rgb(0, 0, 0)';
}

function horizontalWinCheck(){

    for(var row=0;row<6;row++){
        for(var col=0;col<4;col++){
            if(colourMatchChecker(returnColor(row,col) ,returnColor(row,col+1) ,returnColor(row,col+2) ,returnColor(row,col+3))){
                reportWin(row,col);
                return true;
            }
            else{
                continue;
            }
        }
    }

}

function verticalWinCheck(){
    for(var col=0;col<7;col++){
        for(var row=0;row<3;row++){
            if(colourMatchChecker(returnColor(row,col) ,returnColor(row+1,col) ,returnColor(row+2,col) ,returnColor(row+3,col))){
                reportWin(row,col);
                return true;
            }
            else{
                continue;
            }
        }
    }   
}

function diagonalWinCheck(){
    for(var row=0;row<6;row++){
        for(var col=0;col<7;col++){
            if(colourMatchChecker(returnColor(row,col) ,returnColor(row+1,col+1) ,returnColor(row+2,col+2) ,returnColor(row+3,col+3))){
                reportWin(row,col);
                return true;
            }
            else if(colourMatchChecker(returnColor(row,col) ,returnColor(row-1,col+1) ,returnColor(row-2,col+2) ,returnColor(row-3,col+3))){
                reportWin(row,col);
                return true;
            }
            else{
                continue;
            }
        }
    }
}
let currentName=player1
let currentPlayer=1;
let currentColor=player1Color;

$('.board button').on('click',function(){
    console.log("hi");
    var col=$(this).closest("td").index();
    console.log(col);

    var lastAvailRow=bottomRow(col);
    console.log(lastAvailRow);
    changeColor(lastAvailRow,col,currentColor);
    
    if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck())
    {
        $('h3').text( currentName+" has Won!");
        $('table').fadeOut(3000,function(){
            location.reload();
        });
        // $('h1').text("Refresh Page to play again");
    }
    else{
        currentPlayer = currentPlayer * -1 ;
    
        if (currentPlayer === 1) {
            currentName = player1;
            $('h3').text(currentName+" it is your turn, please pick a column to drop your blue chip.");
            currentColor = player1Color;
          }else {
            currentName = player2;
            $('h3').text(currentName+" it is your turn, please pick a column to drop your red chip.");
            currentColor = player2Color;
          }

    }

})