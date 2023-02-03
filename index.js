
let time= document.getElementById('time')
let ms=0;
let s=0;
let m=0;
let intervalId

function start(){
intervalId=setInterval(function(){
    
        ms++;
        
        if(ms===10){
            s++;
            ms=0;
        }
        if(s===60){
            m++;
            s=0;
        }
        time.innerHTML=`${m}:${s}:${ms}`
        },100


)

} 

const stopButton=document.getElementById('stop');
stopButton.addEventListener('click',()=> clearInterval(intervalId))
const startButton= document.getElementById('start')
startButton.addEventListener('click',start)
const resetButton= document.getElementById('reset')
resetButton.addEventListener('click',()=>{
    clearInterval(intervalId)
    time.innerHTML=`00:00:00`
    ms=0;
    s=0;
    m=0;
})