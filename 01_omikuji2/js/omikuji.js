"use strict";
let n="";
let nBefore="";

window.addEventListener("DOMContentLoaded",
    function(){
        $("header").textillate({
            loop: false, 
            minDisplayTime:2000,
            initialDelay: 2000,
            autoStart: true, 
            in: { 
            effect: "fadeInLeftBig", 
            delayScale: 1.5,
            delay: 50, 
            sync: false, 
            shuffle: true 
            }
            
        });
        
        $(function(){
            ScrollReveal().reveal("#btn1", { duration: 9000 });
            });
            
            setTimeout(
            function(){
                let popMessage="板を引いてみて！";
                window.alert(popMessage);
            },
            "5000"
        )    
        
    },false
);

let soundEndflag="0";

const btn1=document.getElementById("btn1");
const omikujiText=document.getElementById("omikujiText");

btn1.addEventListener("click",
    function() {

        if(soundEndflag==="1"){
            soundControl("end","");
        }


        omikujiText.style.transition="1s";
        let resultText=["Flagship","Stratos","Aviator","Frontier","Hovercraft"];
        let resultColor=["#deb887","#f0f8ff","#dc143c","#4e454a","#4682b4"];
        let resultFontSize=["58px","55px","50px","45px","40px"];
        let resultMaxSpeed=[15,12,9,6,3];
        let resultMaxSize=[40,30,20,15,15];
        let resultSound=["sound/omikuji_sound1.mp3","sound/omikuji_sound1.mp3","sound/omikuji_sound2.mp3","sound/omikuji_sound2.mp3","sound/omikuji_sound2.mp3"];


        // let n=Math.floor(Math.random()*resultText.length);
        while(n==nBefore){
            n=Math.floor(Math.random()*resultText.length);
        }
        nBefore=n;

        omikujiText.textContent=resultText[n];
        omikujiText.style.color=resultColor[n];
        omikujiText.style.fontSize=resultFontSize[n];

        w_sound=resultSound[n];
        soundControl("start",w_sound);
        soundEndflag="1";


        $(document).snowfall("clear");
            $(document).ready(function(){
            $(document).snowfall({
            maxSpeed:resultMaxSpeed[n], 
            minSpeed:3, 
            maxSize:resultMaxSize[n], 
            minSize:5, 
            image:'./img/snowflakes.png'
        });
});
    }, false
);

let w_sound
let music
function soundControl(status,w_sound){
    if(status==="start"){
        music=new Audio(w_sound);
        music.currentTime=0;
        music.play();
    }else if(status==="end"){
        music.pause();
        music.currentTime=0;
    }
}