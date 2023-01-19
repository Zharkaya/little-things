const APP = document.getElementById("app");

const app =  {
    card: ['<i class="fa-solid fa-hippo"></i>',
           '<i class="fa-solid fa-spider"></i>',
           '<i class="fa-solid fa-meteor"></i>',
           '<i class="fa-solid fa-snowflake"></i>',
           '<i class="fa-solid fa-frog"></i>',
           '<i class="fa-solid fa-bolt-lightning"></i>'],

    header: function () {
        let template = `<div class="header">
        <div id="count">Moves: 0</div>
        <div class="title">Memory Game</div>
        <div id="winner"></div>
    </div>`
        APP.insertAdjacentHTML("afterbegin", template)
    },

    field: function () {
        let template = `<div class="field"></div>`
        APP.insertAdjacentHTML("beforeend", template);
    },

    cards: function() {
        let field = document.querySelector(".field");
        let out = [];
        this.card.forEach(c=> {
            out.push(c);
            out.push(c);
        })        
        out = this.shuffle(out);
        for (let i = 0; i < out.length; i++) {
            field.insertAdjacentHTML("afterbegin", `<div class="cart">${out[i]}</div>`);
        }
       
    },

    opencard: function() {
        let cards = document.querySelectorAll(".cart");            
        let checkcatrd = [];
        let count =0;
        let win = 0;
        console.log(cards.length/2);
        cards.forEach(card => {
            card.addEventListener("click", ()=>{                
                card.classList.add("cart-active");   
                if(!card.classList.contains("open")){
                    checkcatrd.push(card); 
                }                                           
                if(checkcatrd.length>=2) {                   
                    if(this.chek(checkcatrd))  
                        win++;
                    
                    if(win >= (cards.length/2))
                        this.winner();
                    
                    checkcatrd = [];
                    count++;
                    document.getElementById("count").innerHTML = `count ${count}`;
                }                           
            })                
        });        
        
    },

    chek: function(arr) {       
        if(arr[0].outerHTML == arr[1].outerHTML){   
            arr.forEach(a => {
                a.classList.add("open");
            });         
            return true           
        }
        else{            
            setTimeout(()=> {
                arr.forEach(a => {
                    a.classList.remove("cart-active");
                });
            }, 800)  
            return false;            
        }
    },

    shuffle: function(arr) {        
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    winner: function() {
        template = `<p>You won!</p><button id="start">Again</button>`
        document.getElementById("winner").innerHTML = template;
        this.start();
    },

    start: function() {
        document.getElementById("start").addEventListener("click", ()=>{
            APP.innerHTML = "";
            this.init();
        })
    },
    
    init: function () {
        this.header();
        this.field();
        this.cards();
        this.opencard();       
    }
}

app.init();