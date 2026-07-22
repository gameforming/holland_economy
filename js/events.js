// ==========================================================
// HOLLAND ECONOMY
// events.js
// DEEL 1
// ==========================================================


// =======================
// EVENT SYSTEM
// =======================


const eventSystem={


    activeEvents:[],


    history:[],


    interval:300000, // 5 minuten


    enabled:true


};



// =======================
// EVENT DATABASE
// =======================


const events=[


// =======================
// VOEDSEL EVENTS
// =======================


{

id:"kaas_export",

name:"Nederlandse kaas export groeit",

description:"Meer vraag naar Nederlandse kaas wereldwijd.",

category:"kaas",

marketEffect:15,

companyEffect:20,

duration:10

},



{

id:"melk_tekort",

name:"Melk tekort",

description:"Kaasproductie wordt duurder.",

category:"kaas",

marketEffect:-20,

companyEffect:-15,

duration:8

},



{

id:"bloemen_festival",

name:"Groot bloemenfestival",

description:"Meer vraag naar bloemen.",

category:"bloemen",

marketEffect:25,

companyEffect:20,

duration:12

},



{

id:"slechte_oogst",

name:"Slechte oogst",

description:"Landbouw krijgt problemen.",

category:"landbouw",

marketEffect:-15,

companyEffect:-20,

duration:10

},



// =======================
// HAVEN EVENTS
// =======================


{

id:"rotterdam_haven_drukt",

name:"Rotterdam haven groeit",

description:"Meer schepen komen naar Nederland.",

category:"haven",

marketEffect:20,

companyEffect:25,

duration:15

},



{

id:"haven_staking",

name:"Havenstaking Rotterdam",

description:"Scheepvaart ligt gedeeltelijk stil.",

category:"haven",

marketEffect:-30,

companyEffect:-25,

duration:10

},



// =======================
// ECONOMIE EVENTS
// =======================


{

id:"economische_groei",

name:"Economische groei",

description:"Nederlandse economie groeit.",

category:"all",

marketEffect:10,

companyEffect:15,

duration:15

},



{

id:"recessie",

name:"Economische recessie",

description:"Consumenten geven minder uit.",

category:"all",

marketEffect:-15,

companyEffect:-20,

duration:20

},



{

id:"inflatie",

name:"Hoge inflatie",

description:"Prijzen stijgen overal.",

category:"all",

marketEffect:5,

companyEffect:-10,

duration:15

},



// =======================
// BEDRIJVEN
// =======================


{

id:"belastingverlaging",

name:"Belastingverlaging bedrijven",

description:"Bedrijven maken meer winst.",

category:"bedrijven",

marketEffect:10,

companyEffect:25,

duration:15

},



{

id:"nieuwe_regels",

name:"Nieuwe regels",

description:"Bedrijven krijgen extra kosten.",

category:"bedrijven",

marketEffect:-10,

companyEffect:-20,

duration:15

},



// =======================
// TECHNOLOGIE
// =======================


{

id:"ai_boom",

name:"AI technologie boom",

description:"Technologie bedrijven groeien.",

category:"technologie",

marketEffect:35,

companyEffect:40,

duration:20

},



{

id:"cyberaanval",

name:"Grote cyberaanval",

description:"Technologie sector krijgt schade.",

category:"technologie",

marketEffect:-25,

companyEffect:-30,

duration:10

}



];



// =======================
// START EVENT ENGINE
// =======================


function initializeEvents(){


    console.log(

    "Events geladen:",

    events.length

    );


}



// =======================
// RANDOM EVENT SELECTOR
// =======================


function chooseRandomEvent(){



    let randomIndex=

    randomInt(

    0,

    events.length-1

    );



    return events[randomIndex];


}



// =======================
// START EVENT
// =======================


function startEvent(){



    if(!eventSystem.enabled){

        return;

    }



    let event=

    chooseRandomEvent();



    let active={



        ...event,


        remaining:

        event.duration



    };



    eventSystem.activeEvents.push(

    active

    );



    eventSystem.history.unshift(

    event

    );



    applyEventEffect(event);



    addNews(

    "EVENT: "+

    event.name

    );



}



// =======================
// APPLY EVENT EFFECT
// =======================


function applyEventEffect(event){



    if(event.category==="all"){



        markets.forEach(market=>{



            market.price*=

            (

            1+

            event.marketEffect/100

            );



        });



    }



    else{



        markets.forEach(market=>{



            if(

            market.category===

            event.category

            ){



                market.price*=

                (

                1+

                event.marketEffect/100

                );



            }



        });



    }



    companies.forEach(company=>{



        if(

        company.category===

        event.category

        || event.category==="all"

        ){



            company.income*=

            (

            1+

            event.companyEffect/100

            );



        }



    });



}



// =======================
// EVENT TIMER
// =======================


function eventTick(){



    eventSystem.activeEvents.forEach(event=>{



        event.remaining--;



    });



    for(

    let i=

    eventSystem.activeEvents.length-1;

    i>=0;

    i--

    ){



        if(

        eventSystem.activeEvents[i].remaining<=0

        ){



            eventSystem.activeEvents.splice(

            i,

            1

            );



        }



    }



}



setInterval(

eventTick,

60000

);



// =======================
// RANDOM EVENT EVERY 5 MIN
// =======================


setInterval(

startEvent,

eventSystem.interval

);



// =======================
// END DEEL 1
// =======================
// ==========================================================
// HOLLAND ECONOMY
// events.js
// DEEL 2
// ==========================================================


// =======================
// GROTE WERELD EVENTS
// =======================


const globalEvents=[



{

id:"energie_crisis",

name:"Energiecrisis",

description:
"Gas en elektriciteit worden duurder. Industrie krijgt problemen.",

effects:[

{

category:"energie",

market:-35,

company:-30

},

{

category:"industrie",

market:-20,

company:-25

}

],

duration:20,

chance:8

},



{

id:"olieprijs_stijging",

name:"Olieprijs stijgt sterk",

description:
"Transportkosten gaan omhoog.",

effects:[

{

category:"transport",

market:-20,

company:-15

},

{

category:"haven",

market:10,

company:10

}

],

duration:15,

chance:10

},



{

id:"wereldhandel_groei",

name:"Wereldhandel groeit",

description:
"Meer export en import.",

effects:[

{

category:"handel",

market:25,

company:30

},

{

category:"haven",

market:20,

company:25

}

],

duration:20,

chance:10

},



{

id:"oorlog",

name:"Internationale crisis",

description:
"Onzekerheid op de wereldmarkt.",

effects:[

{

category:"all",

market:-20,

company:-15

},

{

category:"defensie",

market:40,

company:50

}

],

duration:25,

chance:3

},



{

id:"pandemie",

name:"Nieuwe gezondheidscrisis",

description:
"Winkels sluiten gedeeltelijk.",

effects:[

{

category:"horeca",

market:-40,

company:-50

},

{

category:"technologie",

market:25,

company:35

},

{

category:"transport",

market:-20,

company:-20

}

],

duration:30,

chance:2

},



{

id:"toerisme_boom",

name:"Toerisme record",

description:
"Veel bezoekers komen naar Nederland.",

effects:[

{

category:"horeca",

market:35,

company:40

},

{

category:"transport",

market:20,

company:20

}

],

duration:15,

chance:10

}



];



// =======================
// MEGA EVENT DATABASE
// =======================


const megaEvents=[



{

id:"nederland_economisch_wonder",

name:"🇳🇱 Nederlands economisch wonder",

description:
"Een enorme periode van groei.",

marketEffect:50,

companyEffect:60,

duration:40,

chance:1

},



{

id:"grote_crash",

name:"📉 Grote financiële crash",

description:
"Alle markten dalen zwaar.",

marketEffect:-50,

companyEffect:-40,

duration:40,

chance:1

}



];



// =======================
// APPLY GLOBAL EVENT
// =======================


function applyGlobalEvent(event){



    event.effects.forEach(effect=>{



        markets.forEach(market=>{



            if(

            effect.category==="all"

            ||

            market.category===effect.category

            ){



                market.price*=

                (

                1+

                effect.market/

                100

                );



                market.history.push(

                market.price

                );



            }



        });



        companies.forEach(company=>{



            if(

            company.category===effect.category

            ){



                company.income*=

                (

                1+

                effect.company/

                100

                );



            }



        });



    });



    addNews(

    "WERELD EVENT: "+

    event.name

    );



}



// =======================
// SELECT GLOBAL EVENT
// =======================


function chooseGlobalEvent(){



    let possible=



    globalEvents.filter(event=>{



        return chance(

        event.chance

        );



    });



    if(possible.length===0){

        return null;

    }



    return possible[

    randomInt(

    0,

    possible.length-1

    )

    ];



}



// =======================
// START GLOBAL EVENT
// =======================


function startGlobalEvent(){



    let event=

    chooseGlobalEvent();



    if(!event){

        return;

    }



    eventSystem.activeEvents.push({



        ...event,


        remaining:event.duration



    });



    applyGlobalEvent(event);



}



// =======================
// MEGA EVENTS
// =======================


function startMegaEvent(){



    let event=

    megaEvents[

    randomInt(

    0,

    megaEvents.length-1

    )

    ];



    if(!chance(event.chance)){

        return;

    }



    markets.forEach(market=>{



        market.price*=

        (

        1+

        event.marketEffect/

        100

        );



    });



    companies.forEach(company=>{



        company.income*=

        (

        1+

        event.companyEffect/

        100

        );



    });



    addNews(

    "MEGA EVENT: "+

    event.name

    );



}



// =======================
// EVENT CHOICES
// =======================


const playerChoices=[];



function createEventChoice(event){



    playerChoices.push({



        event:event,


        choices:[



        {

        name:"Investeren",

        effect:10

        },



        {

        name:"Afwachten",

        effect:0

        },



        {

        name:"Verkopen",

        effect:-10

        }



        ]



    });



}



// =======================
// EVENT LOOP
// =======================


setInterval(

startGlobalEvent,

600000

);



setInterval(

startMegaEvent,

900000

);



// =======================
// EVENT STATISTICS
// =======================


function getEventStats(){



    return{


        active:

        eventSystem.activeEvents.length,


        total:

        eventSystem.history.length,


        last:

        eventSystem.history[0]



    };



}



// =======================
// END DEEL 2
// =======================
// ==========================================================
// HOLLAND ECONOMY
// events.js
// DEEL 3
// ==========================================================


// =======================
// NIEUWSKRANT SYSTEEM
// =======================


const newsSystem={


    articles:[],


    maxArticles:100


};



function addNewsArticle(title,text,type="normal"){



    let article={



        title:title,


        text:text,


        type:type,


        time:new Date().toLocaleTimeString()



    };



    newsSystem.articles.unshift(article);



    if(

    newsSystem.articles.length>

    newsSystem.maxArticles

    ){



        newsSystem.articles.pop();



    }



}





function getNews(){



    return newsSystem.articles;



}



// =======================
// MARKT SPECIFIEKE EVENTS
// =======================


const marketEvents=[



{

name:"Kaas export record",

market:"kaas",

effect:30,

company:25,

text:
"De Nederlandse kaasexport breekt records."

},



{

name:"Kaasprijzen dalen",

market:"kaas",

effect:-20,

company:-15,

text:
"Overproductie zorgt voor lagere kaasprijzen."

},



{

name:"Bloemen wereldwijd populair",

market:"bloemen",

effect:35,

company:30,

text:
"Nederlandse bloemen worden wereldwijd gekocht."

},



{

name:"Tulpenziekte",

market:"bloemen",

effect:-40,

company:-30,

text:
"Een ziekte beschadigt de tulpenproductie."

},



{

name:"Rotterdam haven record",

market:"haven",

effect:25,

company:35,

text:
"De Rotterdamse haven verwerkt meer goederen dan ooit."

},



{

name:"Scheepvaart vertraging",

market:"schepen",

effect:-25,

company:-20,

text:
"Problemen zorgen voor vertraging op zee."

},



{

name:"Toerisme Nederland groeit",

market:"horeca",

effect:30,

company:35,

text:
"Meer toeristen bezoeken Nederland."

}



];



// =======================
// APPLY MARKET EVENT
// =======================


function startMarketEvent(){



    let event=

    marketEvents[

    randomInt(

    0,

    marketEvents.length-1

    )

    ];



    let market=

    markets.find(

    m=>m.id===event.market

    );



    if(!market){

        return;

    }



    market.price*=

    (

    1+

    event.effect/

    100

    );



    market.history.push(

    market.price

    );



    companies.forEach(company=>{



        if(

        company.market===event.market

        ){



            company.income*=

            (

            1+

            event.company/

            100

            );



        }



    });



    addNewsArticle(



        event.name,


        event.text,


        "markt"



    );



}





setInterval(

startMarketEvent,

300000

);



// =======================
// SEIZOEN EVENTS
// =======================


const seasons=[



{

name:"Koningsdag",

market:"horeca",

effect:25

},



{

name:"Kerstperiode",

market:"winkels",

effect:40

},



{

name:"Zomer vakantie",

market:"toerisme",

effect:30

},



{

name:"Winter energie",

market:"energie",

effect:-20

}



];





function seasonalEvent(){



    let month=

    new Date().getMonth();



    let event=null;



    if(month===11){

        event=seasons[1];

    }



    if(month===6){

        event=seasons[2];

    }



    if(!event){

        return;

    }



    markets.forEach(market=>{



        if(

        market.category===event.market

        ){



            market.price*=

            (

            1+

            event.effect/

            100

            );



        }



    });



    addNewsArticle(

    event.name,

    "Seizoenseffect actief.",

    "seizoen"

    );



}



setInterval(

seasonalEvent,

3600000

);



// =======================
// POLITIEKE EVENTS
// =======================


const politicsEvents=[



{

name:"Nieuwe belastingregels",

company:-20,

market:-10

},



{

name:"Bedrijven krijgen steun",

company:25,

market:15

},



{

name:"Handelsverdrag gesloten",

company:30,

market:20

},



{

name:"Import beperkingen",

company:-15,

market:-20

}



];





function politicalEvent(){



    if(!chance(10)){

        return;

    }



    let event=

    politicsEvents[

    randomInt(

    0,

    politicsEvents.length-1

    )

    ];



    companies.forEach(company=>{



        company.income*=

        (

        1+

        event.company/

        100

        );



    });



    markets.forEach(market=>{



        market.price*=

        (

        1+

        event.market/

        100

        );



    });



    addNewsArticle(

    event.name,

    "Politiek nieuws beïnvloedt de economie.",

    "politiek"

    );



}



setInterval(

politicalEvent,

600000

);



// =======================
// PLAYER EVENT RESPONSE
// =======================


function respondToEvent(choice){



    if(choice==="invest"){



        addMoney(-1000);



        addNewsArticle(

        "Investering gedaan",

        "Je gokt op economisch herstel.",

        "speler"

        );



    }



    if(choice==="sell"){



        addNewsArticle(

        "Voorzichtig gespeeld",

        "Je verkoopt je risico's.",

        "speler"

        );



    }



    if(choice==="wait"){



        addNewsArticle(

        "Afgewacht",

        "Je neemt geen actie.",

        "speler"

        );



    }



}



// =======================
// END EVENTS.JS
// =======================
