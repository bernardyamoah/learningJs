var score=0;

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
let countStr = score + " - "
peopleNumber.textContent += countStr
}
