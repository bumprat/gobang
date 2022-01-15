log('代码已经加载')
let currentPlayer
let boardSize
let gameStarted 
let winCond 
function addCell(id){
    let board = document.querySelector('.board')
    let cell = document.createElement('div')
    cell.className = 'cell'
    cell.id = id
    cell.onclick = function(){
        if(gameStarted === true){
            if(cell.innerHTML===''){
                cell.innerHTML = currentPlayer
                log(currentPlayer + ' choose cell ' + id)
                checkBoard()
                changePlayer()
            }else{
                log('Cell:' + id + ' is occupied')
            }
        }
    }
    board.append(cell)
}

function changePlayer(){
    let player1 = document.querySelector('.player1')
    let player2 = document.querySelector('.player2')
    if(currentPlayer==='⚪'){
        currentPlayer='⚫'
        player1.style.backgroundColor = 'darkgray'
        player2.style.backgroundColor = 'lime'
    }else if(currentPlayer==='⚫'){
        currentPlayer='⚪'
        player2.style.backgroundColor = 'darkgray'
        player1.style.backgroundColor = 'lime'
    }
}

function checkBoard(){
    let numOfWin = winCond
    for(let row=0; row<boardSize; row++){
        for(let column=0; column<boardSize; column++){
            let cellId = 'c-' + row + '-' +column;
            if(document.getElementById(cellId).innerHTML!==''){
                //horizontal
                let result = true
                let cells = []
                cells.push(document.getElementById(cellId))
                for(let j=1; j<numOfWin; j++){
                    let anthorCellId = 'c-' + row + '-' + (column+j)
                    if(document.getElementById(anthorCellId)===null){
                        result = false
                        break
                    }
                    cells.push(document.getElementById(anthorCellId))
                    let equality = document.getElementById(cellId).innerHTML
                        === document.getElementById(anthorCellId).innerHTML
                    if(!equality){
                        result = false
                        break
                    }
                }
                if(result === true){
                    win(cells)
                    return
                }
                //vertical
                result = true
                cells = []
                cells.push(document.getElementById(cellId))
                for(let j=1; j<numOfWin; j++){
                    let anthorCellId = 'c-' + (row+j) + '-' + column
                    if(document.getElementById(anthorCellId)===null){
                        result = false
                        break
                    }
                    cells.push(document.getElementById(anthorCellId))
                    let equality = document.getElementById(cellId).innerHTML
                        === document.getElementById(anthorCellId).innerHTML
                    if(!equality){
                        result = false
                        break
                    }
                }
                if(result === true){
                    win(cells)
                    return
                }
                //diagonal1
                result = true
                cells = []
                cells.push(document.getElementById(cellId))
                for(let j=1; j<numOfWin; j++){
                    let anthorCellId = 'c-' + (row+j) + '-' + (column+j)
                    if(document.getElementById(anthorCellId)===null){
                        result = false
                        break
                    }
                    cells.push(document.getElementById(anthorCellId))
                    let equality = document.getElementById(cellId).innerHTML
                        === document.getElementById(anthorCellId).innerHTML
                    if(!equality){
                        result = false
                        break
                    }
                }
                if(result === true){
                    win(cells)
                    return
                }
                //diagonal2
                result = true
                cells = []
                cells.push(document.getElementById(cellId))
                for(let j=1; j<numOfWin; j++){
                    let anthorCellId = 'c-' + (row+j) + '-' + (column-j)
                    if(document.getElementById(anthorCellId)===null){
                        result = false
                        break
                    }
                    cells.push(document.getElementById(anthorCellId))
                    let equality = document.getElementById(cellId).innerHTML
                        === document.getElementById(anthorCellId).innerHTML
                    if(!equality){
                        result = false
                        break
                    }
                }
                if(result === true){
                    win(cells)
                    return
                }
            }
        }
    }
}

function win(cells){
    cells.forEach(function(cell){
        cell.style.backgroundColor = 'lime'
    })
    log(currentPlayer + ' Wins')
    gameStarted = false
}

function createBoard(){
    let board = document.querySelector('.board')
    board.innerHTML = ''
    for(let row=0; row<boardSize; row++){
        for(let column=0; column<boardSize; column++){
            let id = 'c-' + row + '-' +column;
            addCell(id)
        }
    }
    board.style.minWidth = boardSize * 25 + 'px'
    board.style.width = boardSize * 25 + 'px'
    flushLog()
    log('Board created!')
    gameStarted = true
    currentPlayer = '⚫'
    changePlayer()
}


function start(){
    boardSize = parseInt(document.querySelector('#boardSize').value)
    winCond = parseInt(document.querySelector('#winCond').value)
    createBoard()
}
document.querySelector('#start').onclick = start
start()

function log(text){
    let log = document.querySelector('.log')
    let output = document.querySelector('.output')
    let div = document.createElement('div')
    div.innerHTML = text
    log.append(div)
    output.scrollTop = output.scrollHeight;
}

function flushLog(){
    let output = document.querySelector('.log')
    output.innerHTML = ''
}