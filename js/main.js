console.log('minesweeper')

const IMG_FLAG = `<img src="img/flag.png">`
const IMG_MINE = `<img src="img/mine.jpeg">`

const gLevel = {
    SIZE: 4,
    MINES: 2
}

const gGame = {
    isOn: false,
    revealedCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gInterval = null

var gBoard


function onInit() {
    gGame.isOn = true
    gGame.secsPassed = 0
    if (gInterval) {
        clearInterval(gInterval)
        gInterval = null
    }

    console.log('hi')
    gBoard = buildBoard(gLevel.SIZE)
    console.log(gBoard)

    var elTdMines = document.querySelector('#mines')
    elTdMines.innerText = gLevel.MINES

    var elTdTimer = document.querySelector('#timer')
    elTdTimer.innerText = 0


    renderBoard()


}

function buildBoard(size) {
    var board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i].push(createGameObject())
        }
    }
    board[1][3].isMine = true
    board[2][2].isMine = true



    return board
}

function createGameObject() {
    return { minesAroundCount: 4, isRevealed: false, isMine: false, isMarked: false }
}

function setMinesNegsCount() {

}

function renderBoard() {

    var elBody = document.querySelector('.body')
    var strHtml = ``

    for (var i = 0; i < gLevel.SIZE; i++) {
        strHtml += `<tr>`
        for (var j = 0; j < gLevel.SIZE; j++) {
            strHtml += `<td class="cell unrevealed" onclick="onCellClicked(this, event, ${i}, ${j})"> </td>`
        }
        strHtml += `</tr>`

    }
    elBody.innerHTML = strHtml
    console.log(elBody)

}

function setTimer() {

    gGame.secsPassed++
    console.log(gGame.secsPassed)
    var elTimer = document.querySelector('#timer')
    elTimer.innerText = gGame.secsPassed
}

function onCellClicked(elCell, ev, i, j) {
    if (!gGame.isOn) return

    if (!gInterval) {
        gInterval = setInterval(setTimer, 1000)

    }


    if (ev.ctrlKey) {
        markCell(elCell, i, j)
    }
    else {
        revealCell(elCell, i, j)
    }
}

function markCell(elCell, i, j) {
    elCell.innerHTML = IMG_FLAG
    console.log(elCell)
}

function revealCell(elCell, i, j) {

    gBoard[i][j].isRevealed = true
    gGame.revealedCount++
    elCell.classList.remove('unrevealed')
    elCell.classList.add('revealed')
    if (gBoard[i][j].isMine) {
        elCell.innerHTML = IMG_MINE
        clearInterval(gInterval)
        gInterval = null
        gGame.isOn = false
    }


}

function checkGameOver() {

}

function expandReveal(elCell, i, j) {

}