const displayP =document.getElementById('display');
let firstCard = 14
let secondCard = 7

let sum = firstCard + secondCard
if(sum<=20){
    displayP.innerText="Do you want to draw a new card? 🙂"
}
else if(sum===21){
    displayP.innerText="Wohoo! You've got Blackjack! 😎"
}
else{
    displayP.innerText="You're out of the game! 😭"
}