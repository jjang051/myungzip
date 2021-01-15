const cubeArray = [{
        tx: 0,
        ty: 0
    },
    {
        tx: 0,
        ty: -180
    },
    {
        tx: 0,
        ty: -90
    },
    {
        tx: 0,
        ty: 90
    },
    {
        tx: -90,
        ty: 0
    },
    {
        tx: 90,
        ty: 0
    }
];

const cube =
    `
<div class="cubeBox">
    <div class="cube">
        <div class="face front"></div>
        <div class="face back"></div>
        <div class="face right"></div>
        <div class="face left"></div>
        <div class="face top"></div>
        <div class="face bottom"></div>
    </div>
</div>  
`;
const txtArray = [
    "i like nimble nimble",
    "i am little slow",
    "but, try steadily",
];
const faceArray = ["front", "back", "right", "left", "top", "bottom"];
let total;
let num = 0;
let old = 0;
let oldRan = 0;
let txtArrayTotal = txtArray.length;
function writeTxt(_ran,_idx) {
    for(let i=0;i<total;i++) {
        if(_ran===0){
            $(".cubeBox").eq(i).find(".front").text(txtArray[_idx].charAt(i));
        } else if(_ran===1) {
            $(".cubeBox").eq(i).find(".back").text(txtArray[_idx].charAt(i));
        } else if(_ran===2) {
            $(".cubeBox").eq(i).find(".right").text(txtArray[_idx].charAt(i));
        } else if(_ran===3) {
            $(".cubeBox").eq(i).find(".left").text(txtArray[_idx].charAt(i));
        } else if(_ran===4) {
            $(".cubeBox").eq(i).find(".top").text(txtArray[_idx].charAt(i));
        } else if(_ran===5) {
            $(".cubeBox").eq(i).find(".bottom").text(txtArray[_idx].charAt(i));
        }
        if(txtArray[_idx].charAt(i)===" "){
            gsap.set($("#main .cubeBox").eq(i),{
                opacity:0,
            });
        }
    }
}

function first() {
    total=30;
    for (i = 0; i < total; i++) {
        $("#main .mainBox").append(cube);
    }
    
    for (i = 0; i < txtArrayTotal; i++) {
        if(i===0){
            $(".nav ul").append('<li class="on"></li>');
        } else {
            $(".nav ul").append('<li></li>');
        }
    }
    setTimeout(writeTxt,0,0,0);
}
$("body").on("click", ".nav li", function () {
    let idx = $(this).index();
    if(idx!==old) {
        let ran = Math.floor(Math.random()*6);
        if(ran===oldRan){
            ran = (ran+1)%cubeArray.length;
        } 
        console.log(oldRan,"====",ran);
        let tx = cubeArray[ran].tx;
        let ty = cubeArray[ran].ty;
        let total = txtArray[idx].length;
        //let tempArray = gsap.utils.shuffle(faceArray);
        showCube(total);
        isOn(idx);
        writeTxt(ran,idx);
        gsap.to("#main .cube", {
            rotateX: tx,
            rotateY: ty,
            z: -40,
            ease: "back",
            duration: 1,
            stagger:{
                amount:0.5,
                //grid:"auto",
                from:"random"
                //ease:"power4"
            }
        });
        oldRan = ran;
        old=idx;
    }
});

function isOn(_idx) {
    $(".nav li").eq(_idx).addClass("on");
    $(".nav li").eq(_idx).siblings().removeClass("on");
}

function showCube(_total) {
    $("#main .cubeBox").hide();
    for (let i = 0; i < _total; i++) {
        $("#main .cubeBox").eq(i).show();
        gsap.set($("#main .cubeBox").eq(i),{
            opacity:1
        })
    }
    gsap.set($("#main .mainBox"),{
        width:_total*81
    })
};
first();
showCube(txtArray[0].length);


