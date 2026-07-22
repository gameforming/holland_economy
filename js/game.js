// ==========================================================
// HOLLAND ECONOMY
// game.js
// ==========================================================

// =======================
// GAME
// =======================

const game = {

    version: "0.0.1",

    money: 1000,

    bank: 0,

    debt: 0,

    netWorth: 1000,

    passiveIncome: 0,

    level: 1,

    xp: 0,

    xpNeeded: 100,

    playTime: 0,

    currentJob: null,

    currentMarket: null,

    currentCompany: null,

    currentEvent: null,

    jobsCompleted: 0,

    marketTrades: 0,

    companiesOwned: 0,

    eventsSeen: 0,

    totalEarned: 0,

    totalSpent: 0,

    totalInvested: 0,

    highestWorth: 1000,

    ownedCompanies: [],

    news: [],

    achievements: [],

    settings:{

        autosave:true,

        music:true,

        sound:true

    }

};

// =======================
// MONEY
// =======================

function addMoney(amount){

    amount=Math.floor(amount);

    game.money+=amount;

    game.totalEarned+=amount;

    updateMoney();

}

function removeMoney(amount){

    amount=Math.floor(amount);

    if(game.money<amount){

        return false;

    }

    game.money-=amount;

    game.totalSpent+=amount;

    updateMoney();

    return true;

}

function updateMoney(){

    document.getElementById("money").textContent=Math.floor(game.money);

    document.getElementById("dashboardMoney").textContent=Math.floor(game.money);

}

// =======================
// XP
// =======================

function addXP(amount){

    game.xp+=amount;

    while(game.xp>=game.xpNeeded){

        game.xp-=game.xpNeeded;

        levelUp();

    }

    updateXP();

}

function levelUp(){

    game.level++;

    game.xpNeeded=Math.floor(game.xpNeeded*1.35);

    addNews("Level "+game.level+" bereikt!");

}

function updateXP(){

    document.getElementById("xp").textContent=game.xp;

    document.getElementById("nextLevelXP").textContent=game.xpNeeded;

    document.getElementById("playerLevel").textContent=game.level;

}

// =======================
// NEWS
// =======================

function addNews(text){

    game.news.unshift({

        text:text,

        date:new Date()

    });

    if(game.news.length>100){

        game.news.pop();

    }

    refreshNews();

}

function refreshNews(){

    let latest=document.getElementById("latestNews");

    let news=document.getElementById("newsList");

    latest.innerHTML="";

    news.innerHTML="";

    for(let i=0;i<Math.min(5,game.news.length);i++){

        let p=document.createElement("p");

        p.textContent=game.news[i].text;

        latest.appendChild(p);

    }

    game.news.forEach(n=>{

        let p=document.createElement("p");

        p.textContent=n.text;

        news.appendChild(p);

    });

}

// =======================
// NET WORTH
// =======================

function calculateNetWorth(){

    let worth=game.money;

    markets.forEach(m=>{

        worth+=m.price*m.owned;

    });

    game.ownedCompanies.forEach(c=>{

        worth+=c.value;

    });

    game.netWorth=Math.floor(worth);

    if(game.netWorth>game.highestWorth){

        game.highestWorth=game.netWorth;

    }

    document.getElementById("netWorth").textContent=game.netWorth;

    document.getElementById("dashboardWorth").textContent=game.netWorth;

}

// =======================
// PASSIVE
// =======================

function calculatePassiveIncome(){

    let income=0;

    game.ownedCompanies.forEach(company=>{

        income+=company.income;

    });

    game.passiveIncome=income;

    document.getElementById("passiveIncome").textContent=Math.floor(income);

    document.getElementById("dashboardPassive").textContent=Math.floor(income);

}

// =======================
// COMPANY
// =======================

function addCompany(company){

    game.ownedCompanies.push({

        id:company.id,

        name:company.name,

        income:company.income,

        value:company.price,

        level:1

    });

    game.companiesOwned++;

    calculatePassiveIncome();

}

function companyLevelUp(company){

    company.level++;

    company.income=Math.floor(company.income*1.15);

    company.value=Math.floor(company.value*1.25);

    calculatePassiveIncome();

}

// =======================
// STATISTICS
// =======================

function updateStatistics(){

    document.getElementById("companyCount").textContent=game.companiesOwned;

    document.getElementById("jobsCompleted").textContent=game.jobsCompleted;

    document.getElementById("marketTrades").textContent=game.marketTrades;

    document.getElementById("eventsSeen").textContent=game.eventsSeen;

    document.getElementById("totalEarned").textContent=Math.floor(game.totalEarned);

    document.getElementById("totalInvested").textContent=Math.floor(game.totalInvested);

    document.getElementById("highestWorth").textContent=Math.floor(game.highestWorth);

}

// =======================
// FORMAT
// =======================

function formatMoney(number){

    return "€"+Math.floor(number).toLocaleString("nl-NL");

}

function random(min,max){

    return Math.random()*(max-min)+min;

}

function randomInt(min,max){

    return Math.floor(random(min,max+1));

}

function chance(percent){

    return Math.random()*100<percent;

}

// =======================
// TIMERS
// =======================

setInterval(function(){

    game.playTime++;

},1000);

setInterval(function(){

    calculateNetWorth();

},1000);

setInterval(function(){

    calculatePassiveIncome();

},1000);

setInterval(function(){

    updateStatistics();

},1000);

setInterval(function(){

    addMoney(game.passiveIncome);

},60000);

setInterval(function(){

    if(game.settings.autosave){

        saveGame();

    }

},30000);

// =======================
// GAME LOOP
// =======================

function gameLoop(){

    calculateNetWorth();

    updateMoney();

    updateXP();

    updateStatistics();

    requestAnimationFrame(gameLoop);

}

// =======================
// START
// =======================

function startGame(){

    updateMoney();

    updateXP();

    calculateNetWorth();

    calculatePassiveIncome();

    updateStatistics();

    addNews("Welkom bij Holland Economy!");

    if(typeof buildMarketList==="function"){

        buildMarketList();

    }

    if(typeof buildJobList==="function"){

        buildJobList();

    }

    if(typeof buildCompanyList==="function"){

        buildCompanyList();

    }

    requestAnimationFrame(gameLoop);

}

window.onload=function(){

    startGame();

};
// ==========================================================
// game.js
// DEEL 2
// PLAK DIT DIRECT ONDER DEEL 1
// ==========================================================

// =======================
// PLAYER
// =======================

const player = {

    investments:{},

    inventory:{},

    unlockedMarkets:[],

    unlockedJobs:[],

    unlockedCompanies:[]

};

// =======================
// TIME
// =======================

const world={

    second:0,

    minute:0,

    hour:8,

    day:1,

    month:1,

    year:2026

};

function updateClock(){

    world.second++;

    if(world.second>=60){

        world.second=0;

        world.minute++;

    }

    if(world.minute>=60){

        world.minute=0;

        world.hour++;

    }

    if(world.hour>=24){

        world.hour=0;

        world.day++;

    }

    if(world.day>30){

        world.day=1;

        world.month++;

    }

    if(world.month>12){

        world.month=1;

        world.year++;

    }

}

setInterval(updateClock,1000);

// =======================
// BANK
// =======================

function deposit(amount){

    amount=Math.floor(amount);

    if(game.money<amount){

        return;

    }

    game.money-=amount;

    game.bank+=amount;

    updateMoney();

}

function withdraw(amount){

    amount=Math.floor(amount);

    if(game.bank<amount){

        return;

    }

    game.bank-=amount;

    game.money+=amount;

    updateMoney();

}

function addInterest(){

    game.bank*=1.0005;

}

setInterval(addInterest,10000);

// =======================
// TAX
// =======================

function collectTaxes(){

    if(game.money<10000){

        return;

    }

    let tax=Math.floor(game.money*0.01);

    game.money-=tax;

    addNews("Belasting betaald: €"+tax);

    updateMoney();

}

setInterval(collectTaxes,300000);

// =======================
// ACHIEVEMENTS
// =======================

function unlockAchievement(name){

    if(game.achievements.includes(name)){

        return;

    }

    game.achievements.push(name);

    addNews("Achievement: "+name);

}

function achievementCheck(){

    if(game.money>=10000){

        unlockAchievement("10K");

    }

    if(game.money>=100000){

        unlockAchievement("100K");

    }

    if(game.money>=1000000){

        unlockAchievement("Miljonair");

    }

    if(game.jobsCompleted>=100){

        unlockAchievement("Hard Worker");

    }

    if(game.companiesOwned>=10){

        unlockAchievement("Ondernemer");

    }

    if(game.marketTrades>=100){

        unlockAchievement("Trader");

    }

}

setInterval(achievementCheck,5000);

// =======================
// UTILITIES
// =======================

function clamp(value,min,max){

    return Math.max(min,Math.min(max,value));

}

function average(array){

    if(array.length===0){

        return 0;

    }

    let total=0;

    array.forEach(v=>{

        total+=v;

    });

    return total/array.length;

}

function sum(array){

    let total=0;

    array.forEach(v=>{

        total+=v;

    });

    return total;

}

function round2(value){

    return Math.round(value*100)/100;

}

// =======================
// RANDOM NAMES
// =======================

const dutchNames=[

"Jan",

"Piet",

"Klaas",

"Lisa",

"Emma",

"Noah",

"Lucas",

"Daan",

"Milan",

"Finn",

"Sven",

"Jesse",

"Tim",

"Mark",

"Bram",

"Eva",

"Julia",

"Sarah",

"Sophie",

"Laura"

];

function randomName(){

    return dutchNames[randomInt(0,dutchNames.length-1)];

}

// =======================
// GAME SPEED
// =======================

let gameSpeed=1;

function setGameSpeed(speed){

    gameSpeed=speed;

}

function getGameSpeed(){

    return gameSpeed;

}

// =======================
// DEBUG
// =======================

function giveMoney(){

    addMoney(100000);

}

function giveXP(){

    addXP(1000);

}

function resetMoney(){

    game.money=1000;

    updateMoney();

}

function maxLevel(){

    game.level=100;

    game.xp=0;

    game.xpNeeded=999999;

    updateXP();

}

// =======================
// LOG
// =======================

function log(text){

    console.log("[Holland Economy] "+text);

}

// =======================
// STARTUP
// =======================

log("Loading player...");
log("Loading economy...");
log("Loading jobs...");
log("Loading markets...");
log("Loading companies...");
log("Loading events...");
log("Game loaded.");

addNews("Nederlandse economie gestart.");
// ==========================================================
// game.js
// DEEL 3
// PLAK DIT DIRECT ONDER DEEL 2
// ==========================================================

// =======================
// ECONOMY
// =======================

const economy={

    inflation:1,

    confidence:50,

    growth:0,

    unemployment:5,

    stability:100,

    season:"Lente",

    recession:false,

    boom:false

};

// =======================
// SEASONS
// =======================

function updateSeason(){

    switch(world.month){

        case 12:
        case 1:
        case 2:
            economy.season="Winter";
        break;

        case 3:
        case 4:
        case 5:
            economy.season="Lente";
        break;

        case 6:
        case 7:
        case 8:
            economy.season="Zomer";
        break;

        default:
            economy.season="Herfst";

    }

}

// =======================
// ECONOMY UPDATE
// =======================

function economyTick(){

    economy.inflation+=random(-0.02,0.02);

    economy.confidence+=random(-2,2);

    economy.growth+=random(-0.05,0.05);

    economy.unemployment+=random(-0.1,0.1);

    economy.confidence=clamp(economy.confidence,0,100);

    economy.unemployment=clamp(economy.unemployment,1,25);

    updateSeason();

}

setInterval(economyTick,30000);

// =======================
// BOOM / RECESSION
// =======================

function economyState(){

    if(economy.confidence>80){

        economy.boom=true;

        economy.recession=false;

    }

    else if(economy.confidence<20){

        economy.boom=false;

        economy.recession=true;

    }

    else{

        economy.boom=false;

        economy.recession=false;

    }

}

setInterval(economyState,5000);

// =======================
// DAILY TICK
// =======================

function dailyTick(){

    addNews("Nieuwe handelsdag begonnen.");

}

setInterval(dailyTick,300000);

// =======================
// WEEKLY TICK
// =======================

function weeklyTick(){

    if(world.day%7!==0){

        return;

    }

    addNews("Weekoverzicht gepubliceerd.");

}

setInterval(weeklyTick,60000);

// =======================
// MONTHLY TICK
// =======================

function monthlyTick(){

    if(world.day!==1){

        return;

    }

    addNews("Nieuwe maand gestart.");

}

setInterval(monthlyTick,60000);

// =======================
// NPC INVESTORS
// =======================

const npcInvestors=[];

function createNPC(name){

    npcInvestors.push({

        name:name,

        money:randomInt(10000,100000),

        risk:random(0,1),

        portfolio:{}

    });

}

for(let i=0;i<25;i++){

    createNPC(randomName());

}

// =======================
// NPC AI
// =======================

function npcTick(){

    npcInvestors.forEach(npc=>{

        if(chance(35)){

            const market=markets[randomInt(0,markets.length-1)];

            let amount=randomInt(1,20);

            npc.money-=amount*market.price;

        }

    });

}

setInterval(npcTick,4000);

// =======================
// NOTIFICATIONS
// =======================

function notify(text){

    console.log(text);

    addNews(text);

}

// =======================
// RANK
// =======================

function playerRank(){

    if(game.netWorth<10000) return "Starter";

    if(game.netWorth<50000) return "Handelaar";

    if(game.netWorth<250000) return "Investeerder";

    if(game.netWorth<1000000) return "Ondernemer";

    if(game.netWorth<10000000) return "Miljonair";

    if(game.netWorth<100000000) return "Tycoon";

    return "Economische Legende";

}

// =======================
// SAVE PREP
// =======================

function exportGame(){

    return{

        game:game,

        player:player,

        economy:economy,

        world:world

    };

}

function importGame(data){

    Object.assign(game,data.game);

    Object.assign(player,data.player);

    Object.assign(economy,data.economy);

    Object.assign(world,data.world);

}

// =======================
// GAME INFO
// =======================

function printStats(){

    console.log("==========");

    console.log("Money:",game.money);

    console.log("NetWorth:",game.netWorth);

    console.log("Level:",game.level);

    console.log("Rank:",playerRank());

    console.log("Companies:",game.companiesOwned);

    console.log("Trades:",game.marketTrades);

    console.log("==========");

}

// =======================
// SHORTCUTS
// =======================

window.addEventListener("keydown",function(e){

    switch(e.key){

        case "F1":

            giveMoney();

        break;

        case "F2":

            giveXP();

        break;

        case "F3":

            printStats();

        break;

    }

});

// =======================
// END PART 3
// =======================
// ==========================================================
// game.js
// DEEL 4
// PLAK DIT DIRECT ONDER DEEL 3
// ==========================================================

// =======================
// PLAYER MULTIPLIERS
// =======================

const multipliers={

    work:1,

    passive:1,

    market:1,

    xp:1,

    company:1

};

function resetMultipliers(){

    multipliers.work=1;
    multipliers.passive=1;
    multipliers.market=1;
    multipliers.xp=1;
    multipliers.company=1;

}

function updateMultipliers(){

    if(game.level>=5){

        multipliers.work=1.10;

    }

    if(game.level>=10){

        multipliers.work=1.25;

        multipliers.xp=1.20;

    }

    if(game.level>=20){

        multipliers.passive=1.15;

    }

    if(game.level>=30){

        multipliers.market=1.20;

    }

    if(game.level>=50){

        multipliers.company=1.50;

    }

}

// =======================
// DAILY REWARD
// =======================

let lastDaily=0;

function claimDailyReward(){

    let now=Date.now();

    if(now-lastDaily<86400000){

        return false;

    }

    lastDaily=now;

    let reward=500*game.level;

    addMoney(reward);

    addXP(100);

    notify("Dagelijkse beloning: €"+reward);

    return true;

}

// =======================
// MISSIONS
// =======================

const missions=[];

function addMission(name,goal,reward){

    missions.push({

        name:name,

        goal:goal,

        progress:0,

        reward:reward,

        complete:false

    });

}

addMission("Verdien €5000",5000,500);

addMission("Doe 25 trades",25,750);

addMission("Koop 3 bedrijven",3,1500);

function updateMissions(){

    missions.forEach(m=>{

        if(m.complete){

            return;

        }

        switch(m.name){

            case "Verdien €5000":

                m.progress=game.totalEarned;
            break;

            case "Doe 25 trades":

                m.progress=game.marketTrades;
            break;

            case "Koop 3 bedrijven":

                m.progress=game.companiesOwned;
            break;

        }

        if(m.progress>=m.goal){

            m.complete=true;

            addMoney(m.reward);

            notify("Missie voltooid: "+m.name);

        }

    });

}

setInterval(updateMissions,3000);

// =======================
// CONTRACTS
// =======================

const contracts=[];

function generateContract(){

    const market=markets[randomInt(0,markets.length-1)];

    contracts.push({

        market:market.id,

        amount:randomInt(50,500),

        reward:randomInt(1000,5000),

        timer:300

    });

}

setInterval(generateContract,180000);

function updateContracts(){

    contracts.forEach(c=>{

        c.timer--;

    });

    for(let i=contracts.length-1;i>=0;i--){

        if(contracts[i].timer<=0){

            contracts.splice(i,1);

        }

    }

}

setInterval(updateContracts,1000);

// =======================
// PLAYER STATS
// =======================

const stats={

    clicks:0,

    moneyEarnedJobs:0,

    moneyEarnedPassive:0,

    moneyEarnedMarket:0,

    companiesBought:0,

    marketsUnlocked:0,

    highestMoney:1000,

    longestSession:0

};

function updateStats(){

    if(game.money>stats.highestMoney){

        stats.highestMoney=game.money;

    }

    stats.longestSession=game.playTime;

}

// =======================
// PRESTIGE
// =======================

const prestige={

    level:0,

    bonus:1

};

function canPrestige(){

    return game.netWorth>=100000000;

}

function prestigeGame(){

    if(!canPrestige()){

        return;

    }

    prestige.level++;

    prestige.bonus+=0.25;

    location.reload();

}

// =======================
// PLAYER BONUSES
// =======================

function calculateBonus(){

    let bonus=1;

    bonus*=prestige.bonus;

    bonus*=multipliers.work;

    return bonus;

}

// =======================
// AUTOSYSTEMS
// =======================

setInterval(updateMultipliers,5000);

setInterval(updateStats,1000);

// =======================
// FPS
// =======================

let fps=0;

let frames=0;

setInterval(function(){

    fps=frames;

    frames=0;

},1000);

function frame(){

    frames++;

    requestAnimationFrame(frame);

}

frame();

// =======================
// VERSION CHECK
// =======================

console.log("===================================");

console.log("HOLLAND ECONOMY");

console.log("Version:",game.version);

console.log("Game Engine Loaded");

console.log("===================================");

// =======================
// INITIALIZE MODULES
// =======================

function initializeModules(){

    if(typeof loadGame==="function"){

        loadGame();

    }

    if(typeof initializeMarket==="function"){

        initializeMarket();

    }

    if(typeof initializeWork==="function"){

        initializeWork();

    }

    if(typeof initializeCompanies==="function"){

        initializeCompanies();

    }

    if(typeof initializeEvents==="function"){

        initializeEvents();

    }

}

initializeModules();

// =======================
// MASTER UPDATE
// =======================

function masterUpdate(){

    calculateNetWorth();

    calculatePassiveIncome();

    updateMoney();

    updateXP();

    updateStatistics();

    achievementCheck();

    updateStats();

    updateMultipliers();

}

setInterval(masterUpdate,1000);

// =======================
// END GAME.JS
// =======================
