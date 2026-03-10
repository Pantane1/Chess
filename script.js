var board = null
var game = new Chess()

function onDragStart(source, piece) {

if (game.game_over()) return false

if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
(game.turn() === 'b' && piece.search(/^w/) !== -1)) {
return false
}

}

function onDrop(source, target) {

var move = game.move({
from: source,
to: target,
promotion: 'q'
})

if (move === null) return 'snapback'

window.setTimeout(makeAIMove, 300)

updateStatus()

}

function makeAIMove() {

var moves = game.moves()

if (moves.length === 0) return

var randomMove = moves[Math.floor(Math.random() * moves.length)]

game.move(randomMove)

board.position(game.fen())

updateStatus()

}

function updateStatus() {

var status = ''

var moveColor = 'White'

if (game.turn() === 'b') {
moveColor = 'Black'
}

if (game.in_checkmate()) {

status = 'Game over, ' + moveColor + ' is in checkmate.'

}

else if (game.in_draw()) {

status = 'Game over, draw.'

}

else {

status = moveColor + ' to move'

if (game.in_check()) {
status += ' (check)'
}

}

document.getElementById('status').innerHTML = status

}

var config = {
draggable: true,
position: 'start',
onDragStart: onDragStart,
onDrop: onDrop
}

board = Chessboard('board', config)

updateStatus()

document.getElementById("restart").addEventListener("click", function(){

game.reset()

board.start()

updateStatus()

})
