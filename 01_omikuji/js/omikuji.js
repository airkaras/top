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

const btn1=document.getElementById("btn1");
btn1.addEventListener("click",
    function() {
        // let n=Math.floor(Math.random()*4);

        // switch(n){
        //     case 0:
        //         btn1.textContent="Flagship";
        //         btn1.style.color="#deb887";
        //         btn1.style.fontSize="40px";
        //         break;
        //     case 1:
        //         btn1.textContent="Stratos";
        //         btn1.style.color="#f0f8ff";
        //         btn1.style.fontSize="60px";
        //         break;
        //     case 2:
        //         btn1.textContent="Hovercraft";
        //         btn1.style.color="#4682b4";
        //         btn1.style.fontSize="30px";
        //         break;
        //     case 3:
        //         btn1.textContent="Aviator";
        //         btn1.style.color="#dc143c";
        //         btn1.style.fontSize="20px";
        //         break;         
        // }
        console.log("burtonもいい");
        btn1.style.transition="1s";
        let resultText=["Flagship","Stratos","Aviator","Frontier","Hovercraft"];
        let resultColor=["#deb887","#f0f8ff","#dc143c","#4e454a","#4682b4"];
        let resultFontSize=["58px","55px","50px","45px","40px"];
        let resultMaxSpeed=[15,12,9,6,3];
        let resultMaxSize=[40,30,20,15,15];

        // let n=Math.floor(Math.random()*resultText.length);
        while(n==nBefore){
            n=Math.floor(Math.random()*resultText.length);
        }
        nBefore=n;

        btn1.textContent=resultText[n];
        btn1.style.color=resultColor[n];
        btn1.style.fontSize=resultFontSize[n];

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
