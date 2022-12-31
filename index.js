const displayP =document.getElementById('display');
let firstCard = 12
let secondCard = 7
let hasBlackJack=false
let isAlive=true
let sum = firstCard + secondCard
let message=""
let messageEl= document.getElementById('message-el')
let cardEl=document.getElementById('card-el')
let sumEl=document.querySelector('#sum-el')
let cards=[firstCard,secondCard] //array - ordered list of items 

function startGame(){
    renderGame()
}

function renderGame() {
	sumEl.textContent='Sum: '+ sum;
cardEl.textContent='Cards:'+ cards[0] + " & " + cards[1]
	if(sum<=20){
	    message="Do you want to draw a new card? 🙂"
	}
	else if(sum===21){
	    message="Wohoo! You've got Blackjack! 😎"
	    hasBlackJack=true
	}
	else{
	    message="You're out of the game! 😭"
	    isAlive=false
	}
    messageEl.textContent=message
}
function newCard() {
    let card=6;
    sum+=card;
    renderGame()
    
}
// CASH OUT