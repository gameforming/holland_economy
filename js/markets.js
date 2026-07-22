// ==========================================================
// HOLLAND ECONOMY
// market.js
// DEEL 1
// ==========================================================

// =======================
// MARKET ENGINE
// =======================

const marketSystem = {

    selectedMarket:null,

    historyLength:100,

    updateSpeed:5000,

    tradingEnabled:true,

    totalVolume:0,

    marketTrend:0,

    lastUpdate:Date.now()

};


// =======================
// MARKET INITIALIZATION
// =======================

function initializeMarket(){

    markets.forEach(market=>{

        if(!market.history){

            market.history=[];

        }

        if(market.history.length===0){

            market.history.push(market.price);

        }

        if(!market.volume){

            market.volume=randomInt(100,10000);

        }

        if(!market.change){

            market.change=0;

        }

        if(!market.open){

            market.open=market.price;

        }

        if(!market.high){

            market.high=market.price;

        }

        if(!market.low){

            market.low=market.price;

        }

    });


    buildMarketList();

    selectMarket(markets[0]);

}


// =======================
// BUILD MARKET LIST
// =======================

function buildMarketList(){

    const container=document.getElementById("marketList");

    if(!container){

        return;

    }


    container.innerHTML="";


    markets.forEach(market=>{


        let button=document.createElement("button");


        button.className="marketButton";


        button.innerHTML=

        market.name+
        "<br>€"+
        market.price.toFixed(2);


        button.onclick=function(){

            selectMarket(market);

        };


        container.appendChild(button);


    });


}



// =======================
// SELECT MARKET
// =======================

function selectMarket(market){


    marketSystem.selectedMarket=market;


    document.getElementById("selectedMarket").textContent=

    market.name;


    document.getElementById("marketPrice").textContent=

    market.price.toFixed(2);


    document.getElementById("marketOwned").textContent=

    market.owned;


    updateMarketChange();


    drawChart();


}



// =======================
// MARKET PRICE UPDATE
// =======================


function updateMarketPrices(){


    markets.forEach(market=>{


        let oldPrice=market.price;



        // random movement

        let movement=random(

            -market.volatility,

            market.volatility

        );


        // trend influence

        movement+=market.trend || 0;



        // economy influence

        if(typeof economy!=="undefined"){


            if(economy.boom){

                movement+=0.5;

            }


            if(economy.recession){

                movement-=0.5;

            }


        }



        let percent=

        movement/100;



        market.price+=

        market.price*percent;



        // minimum price

        if(market.price<0.1){

            market.price=0.1;

        }



        market.change=

        ((market.price-oldPrice)/oldPrice)*100;



        market.high=Math.max(

            market.high,

            market.price

        );


        market.low=Math.min(

            market.low,

            market.price

        );



        market.history.push(

            market.price

        );



        if(market.history.length>

        marketSystem.historyLength){

            market.history.shift();

        }



    });



    updateMarketButtons();



    if(marketSystem.selectedMarket){

        selectMarket(

            marketSystem.selectedMarket

        );

    }


}



// =======================
// UPDATE BUTTON PRICES
// =======================


function updateMarketButtons(){


    let buttons=document.querySelectorAll(

        ".marketButton"

    );


    buttons.forEach((button,index)=>{


        let market=markets[index];


        button.innerHTML=

        market.name+

        "<br>€"+

        market.price.toFixed(2);



    });


}



// =======================
// CHANGE DISPLAY
// =======================


function updateMarketChange(){


    let market=

    marketSystem.selectedMarket;


    if(!market){

        return;

    }


    let change=

    market.change || 0;



    document.getElementById(

        "marketChange"

    ).textContent=

    change.toFixed(2)+"%";


}



// =======================
// BUY MARKET
// =======================


function buyMarket(amount=1){


    let market=

    marketSystem.selectedMarket;



    if(!market){

        return;

    }



    let cost=

    market.price*amount;



    if(removeMoney(cost)){



        market.owned+=amount;



        game.marketTrades++;

        game.totalInvested+=cost;



        addNews(

        amount+

        "x "+

        market.name+

        " gekocht"

        );



        calculateNetWorth();



    }


}



// =======================
// SELL MARKET
// =======================


function sellMarket(amount=1){


    let market=

    marketSystem.selectedMarket;



    if(!market){

        return;

    }



    if(market.owned<amount){

        return;

    }



    let income=

    market.price*amount;



    market.owned-=amount;



    addMoney(income);



    game.marketTrades++;



    addNews(

    amount+

    "x "+

    market.name+

    " verkocht"

    );



    calculateNetWorth();


}



// =======================
// BUTTON EVENTS
// =======================


document.addEventListener(

"DOMContentLoaded",

function(){



let buy=document.getElementById(

"buyButton"

);



let sell=document.getElementById(

"sellButton"

);



if(buy){

    buy.onclick=function(){

        buyMarket(1);

    };

}



if(sell){

    sell.onclick=function(){

        sellMarket(1);

    };

}



}

);
// ==========================================================
// HOLLAND ECONOMY
// market.js
// DEEL 2
// ==========================================================


// =======================
// GRAPH / CHART ENGINE
// =======================

function drawChart(){

    const canvas=document.getElementById("marketChart");

    if(!canvas){

        return;

    }


    const ctx=canvas.getContext("2d");


    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );


    const market=

    marketSystem.selectedMarket;


    if(!market){

        return;

    }


    let data=

    market.history;


    if(data.length<2){

        return;

    }



    let max=Math.max(...data);

    let min=Math.min(...data);


    let range=max-min;


    if(range===0){

        range=1;

    }



    let width=

    canvas.width/(data.length-1);



    ctx.beginPath();



    data.forEach((price,index)=>{


        let x=index*width;


        let y=

        canvas.height-

        ((price-min)/range)*

        canvas.height;



        if(index===0){

            ctx.moveTo(x,y);

        }

        else{

            ctx.lineTo(x,y);

        }



    });



    ctx.stroke();



    drawChartInfo();



}



// =======================
// CHART INFO
// =======================

function drawChartInfo(){


    const market=

    marketSystem.selectedMarket;


    if(!market){

        return;

    }


    let canvas=

    document.getElementById(

        "marketChart"

    );


    let ctx=

    canvas.getContext("2d");



    ctx.fillText(

        "Open: €"+market.open.toFixed(2),

        10,

        20

    );


    ctx.fillText(

        "High: €"+market.high.toFixed(2),

        10,

        40

    );


    ctx.fillText(

        "Low: €"+market.low.toFixed(2),

        10,

        60

    );


}



// =======================
// MARKET TRENDS
// =======================


function calculateMarketTrend(market){


    if(market.history.length<10){

        return 0;

    }


    let recent=

    market.history.slice(-10);


    let old=

    recent[0];


    let current=

    recent[recent.length-1];



    let difference=

    ((current-old)/old)*100;



    if(difference>2){

        return 1;

    }


    if(difference<-2){

        return -1;

    }


    return 0;


}



function updateTrends(){


    markets.forEach(market=>{


        market.trend=

        calculateMarketTrend(market);


    });


}



setInterval(

updateTrends,

30000

);



// =======================
// PORTFOLIO
// =======================


function getPortfolioValue(){


    let total=0;


    markets.forEach(market=>{


        total+=

        market.owned*

        market.price;


    });


    return total;


}



function getPortfolioProfit(){


    let profit=0;


    markets.forEach(market=>{


        if(market.averageBuy){


            profit+=

            (

            market.price-

            market.averageBuy

            )

            *

            market.owned;


        }


    });


    return profit;


}



// =======================
// ADVANCED BUY SYSTEM
// =======================


function buyShares(market,amount){


    if(!market){

        return;

    }


    let cost=

    market.price*

    amount;



    if(game.money<cost){

        return;

    }



    let oldAmount=

    market.owned;



    let oldAverage=

    market.averageBuy || 0;



    removeMoney(cost);



    market.owned+=amount;



    market.averageBuy=

    (

    (

    oldAverage*

    oldAmount

    )

    +

    cost

    )

    /

    market.owned;



    game.marketTrades++;



}



// =======================
// ADVANCED SELL SYSTEM
// =======================


function sellShares(market,amount){


    if(!market){

        return;

    }


    if(market.owned<amount){

        return;

    }



    let income=

    market.price*

    amount;



    market.owned-=amount;


    addMoney(income);



    game.marketTrades++;



    if(market.owned===0){

        market.averageBuy=0;

    }



}



// =======================
// MARKET NEWS EFFECT
// =======================


function affectMarket(id,percentage,message){



    let market=

    markets.find(

        m=>m.id===id

    );



    if(!market){

        return;

    }



    market.price*=

    (1+percentage/100);



    market.history.push(

        market.price

    );



    addNews(message);



}



// =======================
// SECTOR EFFECT
// =======================


function affectSector(category,percentage){



    markets.forEach(market=>{


        if(market.category===category){


            market.price*=

            (1+percentage/100);



        }


    });



}



// =======================
// MARKET OPEN/CLOSE
// =======================


function marketDay(){


    let open=

    chance(95);



    if(open){


        marketSystem.tradingEnabled=true;


    }

    else{


        marketSystem.tradingEnabled=false;


    }


}



setInterval(

marketDay,

60000

);



// =======================
// MARKET AI
// =======================


const marketAI={


    investors:100,


    fear:20,


    greed:20


};



function updateMarketAI(){


    marketAI.fear+=random(-5,5);

    marketAI.greed+=random(-5,5);



    marketAI.fear=

    clamp(

    marketAI.fear,

    0,

    100

    );


    marketAI.greed=

    clamp(

    marketAI.greed,

    0,

    100

    );



    if(marketAI.greed>80){


        markets.forEach(m=>{


            m.price*=1.001;


        });


    }



    if(marketAI.fear>80){


        markets.forEach(m=>{


            m.price*=0.999;


        });


    }



}



setInterval(

updateMarketAI,

10000

);



// =======================
// END DEEL 2
// =======================
// ==========================================================
// HOLLAND ECONOMY
// market.js
// DEEL 3
// ==========================================================


// =======================
// TRADING HISTORY
// =======================

const tradingHistory=[];


function addTradeHistory(type,market,amount,value){


    tradingHistory.unshift({

        type:type,

        market:market.name,

        amount:amount,

        value:value,

        date:new Date()

    });



    if(tradingHistory.length>200){

        tradingHistory.pop();

    }


}



// =======================
// IMPROVED BUY
// =======================


function executeBuy(market,amount){


    if(!market){

        return false;

    }



    let price=

    market.price*amount;



    if(game.money<price){

        addNews("Niet genoeg geld.");

        return false;

    }



    removeMoney(price);



    let oldShares=

    market.owned;



    let oldAverage=

    market.averageBuy || 0;



    market.owned+=amount;



    market.averageBuy=

    (

        oldAverage*oldShares

        +

        price

    )

    /

    market.owned;



    addTradeHistory(

        "BUY",

        market,

        amount,

        price

    );



    game.marketTrades++;



    return true;


}



// =======================
// IMPROVED SELL
// =======================


function executeSell(market,amount){



    if(!market){

        return false;

    }



    if(market.owned<amount){

        return false;

    }



    let value=

    market.price*amount;



    market.owned-=amount;



    addMoney(value);



    addTradeHistory(

        "SELL",

        market,

        amount,

        value

    );



    game.marketTrades++;



    return true;


}



// =======================
// DIVIDENDS
// =======================


const dividends={

    enabled:true,

    payoutDay:7

};



function payDividends(){



    if(!dividends.enabled){

        return;

    }



    markets.forEach(market=>{



        if(market.dividend){



            let amount=

            market.owned*

            market.dividend;



            addMoney(amount);



            addNews(

            market.name+

            " dividend: €"+

            Math.floor(amount)

            );



        }



    });



}



setInterval(

payDividends,

300000

);



// =======================
// BULL / BEAR MARKET
// =======================


const marketCycle={


    state:"normal",


    strength:0


};



function startBullMarket(){


    marketCycle.state="bull";


    marketCycle.strength=randomInt(

        5,

        20

    );



    addNews(

    "📈 Nederlandse economie groeit sterk!"

    );


}



function startBearMarket(){


    marketCycle.state="bear";


    marketCycle.strength=randomInt(

        5,

        20

    );



    addNews(

    "📉 Markt daalt door onzekerheid."

    );


}



function applyMarketCycle(){



    if(marketCycle.state==="bull"){



        markets.forEach(m=>{


            m.price*=

            1+

            marketCycle.strength/1000;


        });



    }



    if(marketCycle.state==="bear"){



        markets.forEach(m=>{


            m.price*=

            1-

            marketCycle.strength/1000;


        });



    }


}



setInterval(

applyMarketCycle,

10000

);



// random cycle


setInterval(function(){



    if(chance(10)){



        if(chance(50)){


            startBullMarket();


        }

        else{


            startBearMarket();


        }



    }



},60000);



// =======================
// MARKET CRASHES
// =======================


function marketCrash(){



    markets.forEach(market=>{



        let drop=

        randomInt(

        10,

        40

        );



        market.price*=

        (1-drop/100);



    });



    addNews(

    "🚨 Grote marktcrash!"

    );


}



function marketBoom(){



    markets.forEach(market=>{



        let rise=

        randomInt(

        10,

        35

        );



        market.price*=

        (1+rise/100);



    });



    addNews(

    "🚀 Economische explosieve groei!"

    );


}



// =======================
// RANDOM MARKET EVENTS
// =======================


setInterval(function(){



    let chanceEvent=

    randomInt(

    1,

    100

    );



    if(chanceEvent===1){



        marketCrash();



    }



    if(chanceEvent===2){



        marketBoom();



    }



},30000);



// =======================
// TECHNICAL ANALYSIS
// =======================


function movingAverage(market,period){



    if(market.history.length<period){

        return market.price;

    }



    let values=

    market.history.slice(

    -period

    );



    return average(values);



}



function marketSignal(market){



    let short=

    movingAverage(

    market,

    5

    );



    let long=

    movingAverage(

    market,

    20

    );



    if(short>long){

        return "BUY";

    }



    if(short<long){

        return "SELL";

    }



    return "HOLD";


}



// =======================
// MARKET RANKING
// =======================


function getTopMarkets(){



    return markets

    .slice()

    .sort(

        (a,b)=>

        b.price-a.price

    )

    .slice(

        0,

        10

    );


}



function getWorstMarkets(){



    return markets

    .slice()

    .sort(

        (a,b)=>

        a.price-b.price

    )

    .slice(

        0,

        10

    );


}



// =======================
// END DEEL 3
// =======================
// ==========================================================
// HOLLAND ECONOMY
// market.js
// DEEL 4
// ==========================================================


// =======================
// LIMIT ORDERS
// =======================

const orders=[];


function createLimitOrder(type,market,amount,targetPrice){


    orders.push({

        type:type,

        market:market.id,

        amount:amount,

        targetPrice:targetPrice,

        created:Date.now()

    });


    addNews(

    "Nieuwe limit order geplaatst."

    );


}



function processOrders(){


    for(let i=orders.length-1;i>=0;i--){


        let order=orders[i];


        let market=

        markets.find(

        m=>m.id===order.market

        );



        if(!market){

            orders.splice(i,1);

            continue;

        }



        if(order.type==="buy"){



            if(market.price<=order.targetPrice){



                executeBuy(

                market,

                order.amount

                );



                orders.splice(i,1);


            }


        }



        if(order.type==="sell"){



            if(market.price>=order.targetPrice){



                executeSell(

                market,

                order.amount

                );



                orders.splice(i,1);


            }


        }


    }


}



setInterval(

processOrders,

2000

);



// =======================
// STOP LOSS
// =======================


const stopLoss=[];



function addStopLoss(market,amount,price){



    stopLoss.push({


        market:market.id,


        amount:amount,


        price:price


    });



}



function checkStopLoss(){



    stopLoss.forEach((order)=>{


        let market=

        markets.find(

        m=>m.id===order.market

        );



        if(!market){

            return;

        }



        if(market.price<=order.price){



            executeSell(

            market,

            order.amount

            );



            addNews(

            "Stop loss uitgevoerd: "+

            market.name

            );


        }



    });



}



setInterval(

checkStopLoss,

3000

);



// =======================
// TAKE PROFIT
// =======================


const takeProfit=[];



function addTakeProfit(market,amount,price){



    takeProfit.push({


        market:market.id,


        amount:amount,


        price:price


    });



}



function checkTakeProfit(){



    takeProfit.forEach(order=>{


        let market=

        markets.find(

        m=>m.id===order.market

        );



        if(!market){

            return;

        }



        if(market.price>=order.price){



            executeSell(

            market,

            order.amount

            );



            addNews(

            "Winst genomen op "+

            market.name

            );


        }



    });



}



setInterval(

checkTakeProfit,

3000

);



// =======================
// CANDLE DATA
// =======================


function createCandle(market){


    let history=

    market.history;



    if(history.length<2){

        return null;

    }



    let previous=

    history[history.length-2];


    let current=

    history[history.length-1];



    return{


        open:previous,


        close:current,


        high:Math.max(

            previous,

            current

        ),


        low:Math.min(

            previous,

            current

        ),


        time:Date.now()


    };


}



function getCandles(market,count=50){


    let candles=[];


    let history=

    market.history.slice(-count);



    for(let i=1;i<history.length;i++){



        candles.push({


            open:history[i-1],


            close:history[i],


            high:Math.max(

            history[i-1],

            history[i]

            ),


            low:Math.min(

            history[i-1],

            history[i]

            )


        });



    }



    return candles;


}



// =======================
// VOLATILITY ENGINE
// =======================


function calculateVolatility(market){



    if(market.history.length<10){

        return 0;

    }



    let changes=[];



    for(let i=1;i<market.history.length;i++){



        let change=

        (

        market.history[i]-

        market.history[i-1]

        )

        /

        market.history[i-1]

        *

        100;



        changes.push(change);



    }



    return Math.abs(

    average(changes)

    );



}



function updateVolatility(){



    markets.forEach(market=>{


        market.realVolatility=

        calculateVolatility(market);



    });



}



setInterval(

updateVolatility,

30000

);



// =======================
// SECTOR INDEXES
// =======================


function getSectorValue(category){



    let total=0;

    let count=0;



    markets.forEach(market=>{


        if(market.category===category){



            total+=market.price;

            count++;



        }



    });



    if(count===0){

        return 0;

    }



    return total/count;


}



// =======================
// MARKET SENTIMENT
// =======================


const sentiment={


    value:50,


    text:"Neutraal"


};



function updateSentiment(){



    let rising=0;


    let falling=0;



    markets.forEach(market=>{



        if(market.change>0){

            rising++;

        }



        if(market.change<0){

            falling++;

        }



    });



    sentiment.value=

    50+

    (

    rising-falling

    )

    *

    2;



    sentiment.value=

    clamp(

    sentiment.value,

    0,

    100

    );



    if(sentiment.value>70){



        sentiment.text="Optimistisch";


    }

    else if(sentiment.value<30){



        sentiment.text="Angstig";


    }

    else{


        sentiment.text="Neutraal";


    }



}



setInterval(

updateSentiment,

10000

);



// =======================
// END DEEL 4
// =======================
// ==========================================================
// HOLLAND ECONOMY
// market.js
// DEEL 5
// ==========================================================


// =======================
// MARKET EVENT SYSTEM
// =======================

const marketEffects=[];



function createMarketEffect(data){


    marketEffects.push({


        id:data.id,


        name:data.name,


        target:data.target,


        category:data.category || null,


        impact:data.impact,


        duration:data.duration,


        remaining:data.duration



    });



    applyMarketEffect(

    marketEffects[marketEffects.length-1]

    );


}



function applyMarketEffect(effect){



    markets.forEach(market=>{



        let affected=false;



        if(effect.target===market.id){

            affected=true;

        }



        if(effect.category &&

        market.category===effect.category){

            affected=true;

        }



        if(affected){



            market.price*=

            (

            1+

            effect.impact/100

            );



            market.history.push(

            market.price

            );



        }



    });



}



function updateMarketEffects(){



    for(let i=marketEffects.length-1;i>=0;i--){



        marketEffects[i].remaining--;



        if(marketEffects[i].remaining<=0){



            marketEffects.splice(i,1);



        }



    }



}



setInterval(

updateMarketEffects,

60000

);



// =======================
// MARKET NEWS CONNECTION
// =======================


function newsImpact(news){



    if(!news){

        return;

    }



    if(news.market){



        affectMarket(

            news.market,

            news.effect,

            news.text

        );


    }



    if(news.category){



        affectSector(

            news.category,

            news.effect

        );


    }



}



// =======================
// EXTERNAL TRADE
// =======================


const internationalTrade={


    countries:[

        "Duitsland",

        "België",

        "Frankrijk",

        "Verenigd Koninkrijk",

        "China",

        "Amerika"

    ],


    imports:0,


    exports:0


};





function tradeUpdate(){



    let country=

    internationalTrade.countries[

    randomInt(

    0,

    internationalTrade.countries.length-1

    )

    ];



    let amount=

    randomInt(

    1000,

    100000

    );



    if(chance(50)){



        internationalTrade.exports+=amount;



        addNews(

        "Nederland exporteert €"+

        amount+

        " naar "+

        country

        );



    }

    else{



        internationalTrade.imports+=amount;



        addNews(

        "Nederland importeert €"+

        amount+

        " uit "+

        country

        );



    }



}



setInterval(

tradeUpdate,

120000

);



// =======================
// STOCK SPLITS
// =======================


function stockSplit(market,ratio){



    if(!market){

        return;

    }



    market.price/=ratio;


    market.owned*=ratio;



    addNews(

    market.name+

    " heeft een "+

    ratio+

    ":1 split gekregen."

    );



}



// =======================
// MARKET IPO
// =======================


function createIPO(company){



    let market={



        id:company.id+"_stock",


        name:company.name+" Aandeel",


        category:"Aandelen",


        price:randomInt(

        10,

        100

        ),


        volatility:5,


        owned:0,


        history:[]


    };



    markets.push(market);



    addNews(

    company.name+

    " gaat naar de beurs!"

    );



}



// =======================
// PORTFOLIO DATA
// =======================


function getPortfolio(){



    let portfolio=[];



    markets.forEach(market=>{



        if(market.owned>0){



            portfolio.push({



                name:market.name,


                amount:market.owned,


                value:

                market.price*

                market.owned,


                profit:

                (

                market.price-

                market.averageBuy

                )

                *

                market.owned



            });



        }



    });



    return portfolio;



}



// =======================
// PORTFOLIO SORTING
// =======================


function sortPortfolioByValue(){



    return getPortfolio()

    .sort(

    (a,b)=>

    b.value-a.value

    );



}



function sortPortfolioByProfit(){



    return getPortfolio()

    .sort(

    (a,b)=>

    b.profit-a.profit

    );



}



// =======================
// MARKET WATCHLIST
// =======================


const watchlist=[];



function addToWatchlist(market){



    if(!watchlist.includes(market.id)){



        watchlist.push(market.id);



    }



}



function removeFromWatchlist(market){



    let index=

    watchlist.indexOf(

    market.id

    );



    if(index!==-1){



        watchlist.splice(

        index,

        1

        );



    }



}



function getWatchlist(){



    return markets.filter(

    market=>

    watchlist.includes(

    market.id

    )

    );



}



// =======================
// MARKET RESET
// =======================


function resetMarkets(){



    markets.forEach(market=>{



        market.price=

        market.history[0] || market.price;



        market.owned=0;



        market.history=[

            market.price

        ];



    });



    addNews(

    "Markten gereset."

    );



}



// =======================
// END DEEL 5
// =======================
// ==========================================================
// HOLLAND ECONOMY
// market.js
// DEEL 6
// ==========================================================


// =======================
// MARKET INDEX (AEX STYLE)
// =======================

const hollandIndex={

    name:"Holland Economy Index",

    value:1000,

    history:[1000]

};



function calculateMarketIndex(){


    let total=0;

    let count=0;



    markets.forEach(market=>{


        total+=market.change || 0;


        count++;


    });



    if(count===0){

        return;

    }



    let averageChange=

    total/count;



    hollandIndex.value*=

    (

    1+

    averageChange/100

    );



    hollandIndex.history.push(

    hollandIndex.value

    );



    if(hollandIndex.history.length>200){

        hollandIndex.history.shift();

    }


}



setInterval(

calculateMarketIndex,

5000

);



// =======================
// MARKET RISK
// =======================


function calculateRisk(market){



    let volatility=

    market.realVolatility || 0;



    let risk="Laag";



    if(volatility>3){

        risk="Gemiddeld";

    }



    if(volatility>7){

        risk="Hoog";

    }



    if(volatility>12){

        risk="Extreem";

    }



    return risk;



}



// =======================
// MARKET DETAILS
// =======================


function getMarketDetails(market){



    return{


        name:market.name,


        price:market.price,


        change:market.change,


        owned:market.owned || 0,


        risk:calculateRisk(market),


        trend:market.trend || 0,


        averageBuy:market.averageBuy || 0,


        profit:

        (

        market.price-

        (market.averageBuy || 0)

        )

        *

        (market.owned || 0)



    };



}



// =======================
// SHORT SELLING
// =======================


const shorts=[];



function openShort(market,amount){



    if(!market){

        return;

    }



    shorts.push({



        market:market.id,


        amount:amount,


        startPrice:market.price



    });



    addNews(

    "Short positie geopend op "+

    market.name

    );



}



function closeShort(index){



    let position=

    shorts[index];



    if(!position){

        return;

    }



    let market=

    markets.find(

    m=>m.id===position.market

    );



    let profit=

    (

    position.startPrice-

    market.price

    )

    *

    position.amount;



    addMoney(profit);



    shorts.splice(

    index,

    1

    );



}



// =======================
// AI TRADERS
// =======================


const traders=[];



function createTrader(){


    traders.push({



        name:randomName(),


        strategy:[

            "trend",

            "random",

            "value",

            "risk"

        ]

        [

        randomInt(

        0,

        3

        )

        ],


        money:randomInt(

        5000,

        50000

        )



    });



}



for(let i=0;i<50;i++){


    createTrader();


}



function traderTick(){



    traders.forEach(trader=>{



        let market=

        markets[

        randomInt(

        0,

        markets.length-1

        )

        ];



        if(trader.strategy==="trend"){



            if(market.trend>0){



                trader.money-=market.price;



            }



        }



        if(trader.strategy==="random"){



            chance(50);



        }



    });



}



setInterval(

traderTick,

10000

);



// =======================
// MARKET SIMULATION
// =======================


function simulateMarket(){



    markets.forEach(market=>{



        let force=0;



        if(economy.boom){

            force+=0.3;

        }



        if(economy.recession){

            force-=0.3;

        }



        if(sentiment.value>70){

            force+=0.2;

        }



        if(sentiment.value<30){

            force-=0.2;

        }



        market.price*=

        (

        1+

        random(

        -0.01,

        0.01

        )

        +

        force/100

        );



        if(market.price<0.1){

            market.price=0.1;

        }



    });



}



setInterval(

simulateMarket,

15000

);



// =======================
// MARKET EXPORT DATA
// =======================


function exportMarketData(){



    return JSON.stringify(



        markets.map(market=>({



            id:market.id,


            price:market.price,


            owned:market.owned,


            history:market.history



        }))



    );



}



// =======================
// MARKET IMPORT DATA
// =======================


function importMarketData(data){



    let saved=

    JSON.parse(data);



    saved.forEach(savedMarket=>{



        let market=

        markets.find(

        m=>m.id===savedMarket.id

        );



        if(market){



            market.price=

            savedMarket.price;



            market.owned=

            savedMarket.owned;



            market.history=

            savedMarket.history;



        }



    });



}



// =======================
// MARKET LOADED
// =======================


function marketReady(){


    console.log(

    "Market system ready"

    );


}



// =======================
// END MARKET.JS
// =======================



// =======================
// MARKET TIMER
// =======================


setInterval(

updateMarketPrices,

marketSystem.updateSpeed

);


// ==========================================================
// EINDE DEEL 1
// ==========================================================
