const board = document.getElementById("board")

const pieces = [
"♜","♞","♝","♛","♚","♝","♞","♜",
"♟","♟","♟","♟","♟","♟","♟","♟",
"","","","","","","","",
"","","","","","","","",
"","","","","","","","",
"","","","","","","","",
"♙","♙","♙","♙","♙","♙","♙","♙",
"♖","♘","♗","♕","♔","♗","♘","♖"
]

let selected = null
let turn = "white"

function drawBoard(){

board.innerHTML=""

for(let i=0;i<64;i++){

const square=document.createElement("div")

square.classList.add("square")

const row=Math.floor(i/8)
const col=i%8

if((row+col)%2==0){
square.classList.add("white")
}else{
square.classList.add("black")
}

square.dataset.index=i
square.innerText=pieces[i]

square.addEventListener("click",handleMove)

board.appendChild(square)

}

}

function handleMove(e){

const index=e.target.dataset.index

if(selected===null){

selected=index
e.target.style.border="3px solid red"

}else{

pieces[index]=pieces[selected]
pieces[selected]=""

selected=null

drawBoard()

turn=turn==="white"?"black":"white"

document.getElementById("status").innerText=
turn.charAt(0).toUpperCase()+turn.slice(1)+"'s Turn"

}

}

drawBoard()
