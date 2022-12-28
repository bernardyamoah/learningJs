var score=0;
let message= "People were recorded"
let peopleNumber=document.getElementById("people")
var count= document.getElementById('count')
const increment_btn= document.getElementById('increament-btn');

increment_btn.addEventListener('click',()=>{
    score ++;
    count.innerText=score;
    console.log(count);
})
 function decreament() {
    score--;
    count.innerText=score;
    console.log(count);
 }
 function save() {
    peopleNumber.innerText= score + ' ' + message
    // console.log(peopleNumber + ' ' + message);
}
