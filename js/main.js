$("body").niceScroll({
    cursorcolor:"#fff",
    cursorwidth:"4px",
    cursorborder:"none"
});


const gnbTL = gsap.timeline({
    paused: true
});
gnbTL.to("#gnb", {
        top: 0,
        duration: 1,
        ease: "power4",
    })
    .from("#gnb li", {
        opacity: 0,
        x: 500,
        ease: "power4",
        duration: 1,
        stagger: {
            each: 0.05
        },
        onReverseComplete: () => {
            $("#header").removeClass("on");
        }
    })
    .from("#gnb .copyright", {
        opacity: 0,
        ease: "power4",
        duration: 1,
    }, "-=0.5")


$(".btnAll").on("click", function () {
    $("#header").toggleClass("on");
    if ($("#header").hasClass("on")) {
        gnbTL.timeScale(1);
        gnbTL.play();
    } else {
        gnbTL.timeScale(1.8);
        gnbTL.reverse();

    }
});

function typed() {
    const typed = new Typed(".slogan .mask", {
        strings: [
            "i am little <strong>slow</strong>",
            "but,try <strong>steadily</strong>",
            "my name is <strong>kim myoung zip</strong>",
            "keep an <strong>eyes on me.</strong>"
        ],
        startDelay: 1000,
        typeSpeed: 50,
        backSpeed: 10,
        backDelay: 3000,
        loop: true,
    });
}


/////
function init() {
    // const myRoutes = [
    //     {
    //         path: "index.html",
    //         name: "index"
    //     }, 
    //     {
    //         path: "profile.html",
    //         name: "profile"
    //     },
    //     {
    //         path: "works.html",
    //         name: "works"
    //     }
    // ];

    
    // barba.use(barbaRouter, {
    //     routes: myRoutes
    // });

    function beforeChange() {
        return
    }

    function endChange() {
        return gnbTL.timeScale(1.5).reverse();
    }

    barba.hooks.before(() => {

    });
    barba.hooks.after(() => {
        
    });

    barba.hooks.enter(() => {
        window.scrollTo(0, 0);
    });
    barba.hooks.once((data) => {
        
        
    });
    function changeGnbBg(_item,_className=""){
        gsap.delayedCall(2,function(){
            $(_item).parents("body").find("#gnb").removeClass().addClass(_className);
        });
    }

    barba.init({
        debug:true,
        requestError: (trigger, action, url, response) => {
            if(response.status === 404) {
                barba.go("index.html");
                return false;
            }
        },
        views: [
            {
                namespace: "index",
                beforeLeave: function(data) {
                    
                },
                afterEnter:function(data){
                    changeGnbBg(data.next.container);
                    typed();
                }
            },
            {
                namespace: "profile",
                beforeLeave: function(data) {
                    
                },
                afterEnter:function(data){
                    changeGnbBg(data.next.container,"profile");
                }
            },
            {
                namespace: "works",
                beforeLeave: function(data) {
                    
                },
                afterEnter:function(data){
                    changeGnbBg(data.next.container,"works");
                }

            },
            {
                namespace: "contact",
                beforeLeave: function(data) {
                    
                },
                afterEnter:function(data){
                    changeGnbBg(data.next.container,"contact");
                }

            },
            
        ],
        transitions: [
            {
                name:"default",
                async leave() {
                    await beforeChange();
                },
                enter(data) {
                    Splitting();
                    const tl = gsap.timeline();
                    const inner = data.next.container.querySelector(".inner");
                    const chars = data.next.container.querySelectorAll("h2 .char");
                    tl.from(inner,{
                        opacity:0,
                        delay:2,
                        duration:2
                    })
                    
                    .from(chars,{
                        opacity:0,
                        duration:1,
                        x:100,
                        ease:"power4",
                        stagger: {
                            each:0.05
                        }
                    },"-=1");
                    endChange();
                }
            },
            /*
            {
                name: "index",
                to: {
                    namespace:["index"]
                },
                once(data) {
                    
                },
                async leave() {
                    await beforeChange();
                },
                enter() {
                    endChange();
                }
            },
            {
                name: "profile",
                to: {
                    namespace:["profile"]
                },
                once(data) {
                    
                },
                async leave() {
                    await beforeChange();
                },
                enter(data) {
                    
                    endChange();
                }
            },
            {
                name: "works",
                to: {
                    namespace:["works"]
                },
                once(data) {
                    
                },
                async leave() {
                    await beforeChange();
                },
                enter(data) {
                    console.log("to the works");
                    endChange();
                }
            },
            {
                name: "contact",
                to: {
                    namespace:["contact"]
                },
                once(data) {
                    
                },
                async leave() {
                    await beforeChange();
                },
                enter(data) {
                    console.log("to the contact");
                    endChange();
                }
            },
            */
        ]
        // transitions: [{
        //     async leave() {
        //         await beforeChange();
        //     },
        //     enter() {
        //         endChange();
        //     }
        // }]
    })
}

init();