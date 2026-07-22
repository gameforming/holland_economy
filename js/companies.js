// ==========================================================
// HOLLAND ECONOMY
// companies.js
// DEEL 1
// ==========================================================


// =======================
// COMPANY SYSTEM
// =======================


const companySystem={

    selectedCompany:null,

    totalCompanies:0,

    totalIncome:0,

    updateSpeed:60000

};



// =======================
// COMPANY DATABASE
// =======================


const companies=[


{

id:"kaas_boerderij",

name:"Kleine Kaasboerderij",

category:"Voedsel",

size:"small",

cost:5000,

level:1,

maxLevel:20,

income:100,

upgradeCost:2500,

market:"kaas",

employees:0,

owned:false

},



{

id:"bloemen_kwekerij",

name:"Bloemen Kwekerij",

category:"Landbouw",

size:"small",

cost:7500,

level:1,

maxLevel:20,

income:150,

upgradeCost:3000,

market:"bloemen",

employees:0,

owned:false

},



{

id:"bakkerij",

name:"Nederlandse Bakkerij",

category:"Voedsel",

size:"small",

cost:10000,

level:1,

maxLevel:20,

income:200,

upgradeCost:4000,

market:"voedsel",

employees:0,

owned:false

},



{

id:"transportbedrijf",

name:"Transportbedrijf",

category:"Transport",

size:"small",

cost:15000,

level:1,

maxLevel:20,

income:300,

upgradeCost:6000,

market:"transport",

employees:0,

owned:false

},



{

id:"scheepswerf",

name:"Rotterdam Scheepswerf",

category:"Scheepvaart",

size:"large",

cost:250000,

level:1,

maxLevel:50,

income:5000,

upgradeCost:50000,

market:"schepen",

employees:10,

owned:false

},



{

id:"havenbedrijf",

name:"Rotterdam Havenbedrijf",

category:"Logistiek",

size:"large",

cost:500000,

level:1,

maxLevel:50,

income:10000,

upgradeCost:100000,

market:"haven",

employees:20,

owned:false

},



{

id:"techbedrijf",

name:"Nederland Techbedrijf",

category:"Technologie",

size:"large",

cost:1000000,

level:1,

maxLevel:100,

income:25000,

upgradeCost:250000,

market:"technologie",

employees:50,

owned:false

},



{

id:"bank",

name:"Nederlandse Bank",

category:"Financiën",

size:"large",

cost:5000000,

level:1,

maxLevel:100,

income:100000,

upgradeCost:1000000,

market:"financien",

employees:100,

owned:false

}



];



// =======================
// INITIALIZE COMPANIES
// =======================


function initializeCompanies(){



    buildCompanyList();



    console.log(

    "Companies loaded:",

    companies.length

    );



}



// =======================
// COMPANY LIST UI
// =======================


function buildCompanyList(){



    const container=

    document.getElementById(

    "companyList"

    );



    if(!container){

        return;

    }



    container.innerHTML="";



    companies.forEach(company=>{



        let button=

        document.createElement(

        "button"

        );



        button.innerHTML=



        company.name+

        "<br>€"+

        company.cost;



        button.onclick=function(){



            selectCompany(company);



        };



        container.appendChild(button);



    });



}



// =======================
// SELECT COMPANY
// =======================


function selectCompany(company){



    companySystem.selectedCompany=

    company;



    updateCompanyUI();



}



// =======================
// BUY COMPANY
// =======================


function buyCompany(company){



    if(company.owned){



        return;

    }



    if(removeMoney(company.cost)){



        company.owned=true;



        companySystem.totalCompanies++;



        game.companiesOwned++;



        addNews(

        company.name+

        " gekocht!"

        );



        updateCompanyUI();



    }



}



// =======================
// COMPANY UPGRADE
// =======================


function upgradeCompany(company){



    if(!company.owned){

        return;

    }



    if(company.level>=company.maxLevel){

        return;

    }



    let cost=

    company.upgradeCost*

    company.level;



    if(removeMoney(cost)){



        company.level++;



        company.income*=1.15;



        addNews(

        company.name+

        " geüpgraded naar level "+

        company.level

        );



    }



}



// =======================
// COMPANY UI
// =======================


function updateCompanyUI(){



    let company=

    companySystem.selectedCompany;



    if(!company){

        return;

    }



    let info=

    document.getElementById(

    "companyInfo"

    );



    if(info){



        info.innerHTML=



        company.name+

        "<br>Level: "+

        company.level+

        "<br>Inkomen: €"+

        Math.floor(company.income)+

        "/min";



    }



}



// ==========================================================
// EINDE DEEL 1
// ==========================================================
// ==========================================================
// HOLLAND ECONOMY
// companies.js
// DEEL 2
// ==========================================================


// =======================
// PASSIVE INCOME ENGINE
// =======================


function calculateCompanyIncome(){


    let total=0;



    companies.forEach(company=>{



        if(!company.owned){

            return;

        }



        let income=

        company.income;



        // level bonus

        income*=

        company.level;



        // employee bonus

        income*=

        (

        1+

        company.employees*

        0.01

        );



        // market connection

        income*=

        getMarketBonus(company);



        total+=income;



    });



    return total;


}




function getMarketBonus(company){



    let bonus=1;



    if(typeof markets==="undefined"){

        return bonus;

    }



    let market=

    markets.find(

    m=>m.id===company.market

    );



    if(!market){

        return bonus;

    }



    // hoge marktprijs = meer winst

    if(market.change>0){

        bonus+=0.10;

    }



    if(market.change<0){

        bonus-=0.10;

    }



    return bonus;



}



// =======================
// PASSIVE MONEY TICK
// =======================


function companyIncomeTick(){



    let income=

    calculateCompanyIncome();



    if(income<=0){

        return;

    }



    addMoney(

    income

    );



    stats.moneyEarnedPassive+=income;



    companySystem.totalIncome+=income;



    addNews(

    "Bedrijven verdienden €"+

    Math.floor(income)

    );



}



setInterval(

companyIncomeTick,

60000

);



// =======================
// EMPLOYEE SYSTEM
// =======================


const employeeTypes=[



{

name:"Werknemer",

cost:500,

bonus:0.05

},



{

name:"Manager",

cost:5000,

bonus:0.15

},



{

name:"Directeur",

cost:50000,

bonus:0.30

}



];




// =======================
// HIRE EMPLOYEE
// =======================


function hireCompanyEmployee(company,type){



    if(!company.owned){

        return;

    }



    let employee=

    employeeTypes.find(

    e=>e.name===type

    );



    if(!employee){

        return;

    }



    if(removeMoney(employee.cost)){



        company.employees++;



        if(!company.employeeBonus){

            company.employeeBonus=0;

        }



        company.employeeBonus+=

        employee.bonus;



        addNews(

        employee.name+

        " aangenomen bij "+

        company.name

        );



    }



}



// =======================
// COMPANY PRODUCTION
// =======================


function produceGoods(company){



    if(!company.owned){

        return 0;

    }



    let production=

    company.level*10;



    production*=

    (

    1+

    company.employees*

    0.02

    );



    return production;



}



// =======================
// STORAGE
// =======================


const companyStorage={};



function addProduction(company,amount){



    if(!companyStorage[company.id]){


        companyStorage[company.id]=0;


    }



    companyStorage[company.id]+=amount;



}



function sellProduction(company){



    let amount=

    companyStorage[company.id] || 0;



    if(amount<=0){

        return;

    }



    let price=

    amount*

    company.level;



    addMoney(price);



    companyStorage[company.id]=0;



}



// =======================
// PRODUCTION LOOP
// =======================


function productionTick(){



    companies.forEach(company=>{



        if(company.owned){



            let goods=

            produceGoods(company);



            addProduction(

            company,

            goods

            );



        }



    });



}



setInterval(

productionTick,

30000

);



// =======================
// COMPANY EVENTS
// =======================


const companyEvents=[


{

name:"Goede verkoop",

effect:1.25

},



{

name:"Machines kapot",

effect:0.75

},



{

name:"Nieuwe klant",

effect:1.50

},



{

name:"Personeelstekort",

effect:0.85

}



];





function companyEvent(){



    if(!chance(15)){

        return;

    }



    let company=

    companies[

    randomInt(

    0,

    companies.length-1

    )

    ];



    if(!company.owned){

        return;

    }



    let event=

    companyEvents[

    randomInt(

    0,

    companyEvents.length-1

    )

    ];



    company.income*=

    event.effect;



    addNews(

    company.name+

    ": "+

    event.name

    );



}



setInterval(

companyEvent,

60000

);



// =======================
// COMPANY VALUE
// =======================


function calculateCompanyValue(company){



    if(!company.owned){

        return 0;

    }



    return (

    company.income*

    120

    )

    *

    company.level;



}




function getTotalCompanyValue(){



    let value=0;



    companies.forEach(company=>{



        value+=

        calculateCompanyValue(company);



    });



    return value;



}



// =======================
// END DEEL 2
// =======================
// ==========================================================
// HOLLAND ECONOMY
// companies.js
// DEEL 3
// ==========================================================


// =======================
// COMPANY GROWTH SYSTEM
// =======================


const companyRanks=[

    "Startend bedrijf",

    "Klein bedrijf",

    "Middelgroot bedrijf",

    "Nationaal bedrijf",

    "Internationaal bedrijf",

    "Mega onderneming"

];



function getCompanyRank(company){



    if(company.level<5){

        return companyRanks[0];

    }


    if(company.level<15){

        return companyRanks[1];

    }


    if(company.level<30){

        return companyRanks[2];

    }


    if(company.level<60){

        return companyRanks[3];

    }


    if(company.level<90){

        return companyRanks[4];

    }



    return companyRanks[5];


}



// =======================
// COMPANY EXPANSION
// =======================


function expandCompany(company){



    if(!company.owned){

        return;

    }



    let cost=

    company.level*

    50000;



    if(removeMoney(cost)){



        company.level++;



        company.income*=1.25;



        company.maxLevel+=5;



        addNews(

        company.name+

        " is uitgebreid!"

        );



    }



}



// =======================
// SMALL TO LARGE COMPANY
// =======================


function checkCompanyGrowth(){



    companies.forEach(company=>{



        if(!company.owned){

            return;

        }



        if(company.level>=20 && company.size==="small"){



            company.size="large";



            company.income*=2;



            addNews(

            company.name+

            " is uitgegroeid tot een groot bedrijf!"

            );



        }



    });



}



setInterval(

checkCompanyGrowth,

60000

);



// =======================
// COMPANY SELLING
// =======================


function sellCompany(company){



    if(!company.owned){

        return;

    }



    let value=

    calculateCompanyValue(company);



    addMoney(value);



    company.owned=false;



    company.level=1;



    company.employees=0;



    addNews(

    company.name+

    " verkocht voor €"+

    Math.floor(value)

    );



}



// =======================
// COMPANY COMPETITION
// =======================


const competition={



    enabled:true,


    competitors:[]

};



// =======================
// CREATE COMPETITOR
// =======================


function createCompetitor(company){



    competition.competitors.push({



        name:

        company.name+

        " Concurrent",



        marketShare:

        randomInt(

        5,

        30

        ),



        strength:

        randomInt(

        1,

        10

        )



    });



}



companies.forEach(company=>{


    createCompetitor(company);


});



// =======================
// MARKET SHARE
// =======================


function calculateMarketShare(company){



    let base=

    company.level*2;



    let employees=

    company.employees;



    return clamp(

    base+

    employees,

    1,

    90

    );



}



// =======================
// COMPANY WAR
// =======================


function companyCompetitionTick(){



    if(!competition.enabled){

        return;

    }



    companies.forEach(company=>{



        if(!company.owned){

            return;

        }



        let chanceValue=

        randomInt(

        1,

        100

        );



        if(chanceValue<10){



            company.income*=0.9;



            addNews(

            company.name+

            " verliest klanten door concurrentie."

            );



        }



        if(chanceValue>90){



            company.income*=1.15;



            addNews(

            company.name+

            " wint marktaandeel!"

            );



        }



    });



}



setInterval(

companyCompetitionTick,

120000

);



// =======================
// COMPANY STOCK MARKET
// =======================


function listCompanyOnMarket(company){



    if(!company.owned){

        return;

    }



    if(company.public){

        return;

    }



    company.public=true;



    let stock={



        id:

        company.id+

        "_stock",



        name:

        company.name+

        " Aandeel",



        category:

        "Bedrijven",



        price:

        calculateCompanyValue(company)/1000,



        volatility:5,


        owned:0,


        history:[],



        company:

        company.id



    };



    markets.push(stock);



    addNews(

    company.name+

    " gaat naar de beurs!"

    );



}



// =======================
// STOCK VALUE UPDATE
// =======================


function updateCompanyStocks(){



    markets.forEach(market=>{



        if(!market.company){

            return;

        }



        let company=

        companies.find(

        c=>c.id===market.company

        );



        if(!company){

            return;

        }



        market.price=

        calculateCompanyValue(company)/1000;



    });



}



setInterval(

updateCompanyStocks,

60000

);



// =======================
// COMPANY STATISTICS
// =======================


function getCompanyStatistics(){



    let owned=

    companies.filter(

    c=>c.owned

    );



    return{


        owned:

        owned.length,


        value:

        getTotalCompanyValue(),


        income:

        calculateCompanyIncome(),


        employees:

        owned.reduce(

        (total,c)=>

        total+c.employees,

        0

        )


    };


}



// =======================
// END COMPANIES.JS
// =======================
