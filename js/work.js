// ==========================================================
// HOLLAND ECONOMY
// work.js
// DEEL 1
// ==========================================================


// =======================
// WORK SYSTEM
// =======================

const workSystem={

    currentJob:null,

    progress:0,

    clicks:0,

    maxProgress:100,

    working:false,

    multiplier:1

};


// =======================
// JOB DATABASE
// =======================

const jobs=[


{
    id:"supermarkt_vakkenvuller",
    name:"Vakkenvuller",
    category:"Winkel",
    difficulty:1,
    salary:50,
    xp:10,
    clicksNeeded:20,
    unlocked:true
},


{
    id:"bezorger",
    name:"Bezorger",
    category:"Transport",
    difficulty:2,
    salary:120,
    xp:25,
    clicksNeeded:35,
    unlocked:true
},


{
    id:"kaasverkoper",
    name:"Kaas Verkoper",
    category:"Markt",
    difficulty:2,
    salary:150,
    xp:30,
    clicksNeeded:40,
    unlocked:true
},


{
    id:"bloemenhandelaar",
    name:"Bloemenhandelaar",
    category:"Markt",
    difficulty:3,
    salary:250,
    xp:50,
    clicksNeeded:60,
    unlocked:false
},


{
    id:"havenwerker",
    name:"Rotterdam Havenwerker",
    category:"Scheepvaart",
    difficulty:4,
    salary:400,
    xp:80,
    clicksNeeded:80,
    unlocked:false
},


{
    id:"software_developer",
    name:"Software Developer",
    category:"Technologie",
    difficulty:5,
    salary:700,
    xp:120,
    clicksNeeded:100,
    unlocked:false
},


{
    id:"bankier",
    name:"Bankier",
    category:"Financiën",
    difficulty:6,
    salary:1200,
    xp:200,
    clicksNeeded:130,
    unlocked:false
},


{
    id:"ceo",
    name:"CEO",
    category:"Bedrijf",
    difficulty:10,
    salary:5000,
    xp:500,
    clicksNeeded:200,
    unlocked:false
}


];



// =======================
// INIT WORK
// =======================


function initializeWork(){

    buildJobList();

    selectJob(jobs[0]);

}



// =======================
// BUILD JOB LIST
// =======================


function buildJobList(){


    const container=

    document.getElementById(

    "jobList"

    );


    if(!container){

        return;

    }



    container.innerHTML="";



    jobs.forEach(job=>{


        let button=

        document.createElement(

        "button"

        );



        button.innerHTML=


        job.name+

        "<br>€"+

        job.salary;



        button.onclick=function(){


            selectJob(job);


        };



        if(job.unlocked===false){

            button.disabled=true;

            button.innerHTML+=

            "<br>🔒";

        }



        container.appendChild(button);



    });



}



// =======================
// SELECT JOB
// =======================


function selectJob(job){



    if(!job.unlocked){

        return;

    }



    workSystem.currentJob=job;



    const name=

    document.getElementById(

    "currentJob"

    );



    if(name){

        name.textContent=

        job.name;

    }



    workSystem.progress=0;



    updateWorkUI();



}



// =======================
// WORK CLICK
// =======================


function doWorkClick(){



    let job=

    workSystem.currentJob;



    if(!job){

        return;

    }



    workSystem.clicks++;


    workSystem.progress++;



    addXP(

    Math.floor(

    job.xp/

    job.clicksNeeded

    )

    );



    updateWorkUI();



    if(workSystem.progress>=job.clicksNeeded){



        finishWork();



    }



}



// =======================
// FINISH JOB
// =======================


function finishWork(){



    let job=

    workSystem.currentJob;



    let money=

    job.salary*

    workSystem.multiplier;



    addMoney(

    money

    );



    game.jobsCompleted++;



    stats.moneyEarnedJobs+=money;



    addXP(

    job.xp

    );



    addNews(

    job.name+

    " afgerond! +€"+

    money

    );



    workSystem.progress=0;



    updateWorkUI();



}



// =======================
// WORK UI
// =======================


function updateWorkUI(){



    let job=

    workSystem.currentJob;



    if(!job){

        return;

    }



    let progress=

    document.getElementById(

    "workProgress"

    );



    if(progress){



        progress.textContent=

        workSystem.progress+

        "/"+

        job.clicksNeeded;



    }



}



// =======================
// WORK BUTTON
// =======================


document.addEventListener(

"DOMContentLoaded",

function(){


    let button=

    document.getElementById(

    "workButton"

    );



    if(button){


        button.onclick=function(){


            doWorkClick();


        };


    }


});


// ==========================================================
// EINDE DEEL 1
// ==========================================================
// ==========================================================
// HOLLAND ECONOMY
// work.js
// DEEL 2
// ==========================================================


// =======================
// CAREER SYSTEM
// =======================


const career={

    level:1,

    xp:0,

    xpNeeded:100,

    title:"Beginner"

};



const careerTitles=[

    "Beginner",

    "Werknemer",

    "Professional",

    "Expert",

    "Manager",

    "Directeur",

    "Topondernemer",

    "CEO"

];



// =======================
// CAREER XP
// =======================


function addCareerXP(amount){



    career.xp+=amount;



    while(

        career.xp>=career.xpNeeded

    ){


        career.xp-=career.xpNeeded;


        career.level++;


        career.xpNeeded=

        Math.floor(

        career.xpNeeded*1.4

        );



        updateCareerTitle();



    }



}



function updateCareerTitle(){



    let index=

    Math.min(

        career.level-1,

        careerTitles.length-1

    );



    career.title=

    careerTitles[index];



    addNews(

    "Nieuwe carrière rang: "+

    career.title

    );



    unlockJobs();



}



// =======================
// JOB UNLOCKS
// =======================


function unlockJobs(){



    jobs.forEach(job=>{



        if(

        career.level>=

        job.difficulty

        ){



            if(!job.unlocked){



                job.unlocked=true;



                addNews(

                "Nieuwe baan beschikbaar: "+

                job.name

                );



            }



        }



    });



    buildJobList();



}



// =======================
// WORK BONUS
// =======================


const workUpgrades=[


{

id:"sneller_werken",

name:"Sneller werken",

level:0,

max:10,

cost:500,

bonus:0.05

},


{

id:"ervaring",

name:"Meer ervaring",

level:0,

max:10,

cost:1000,

bonus:0.10

},


{

id:"gereedschap",

name:"Beter gereedschap",

level:0,

max:10,

cost:2500,

bonus:0.15

}


];



// =======================
// BUY WORK UPGRADE
// =======================


function buyWorkUpgrade(id){



    let upgrade=

    workUpgrades.find(

    u=>u.id===id

    );



    if(!upgrade){

        return;

    }



    if(upgrade.level>=upgrade.max){

        return;

    }



    let price=

    upgrade.cost*

    (

    upgrade.level+1

    );



    if(removeMoney(price)){



        upgrade.level++;



        workSystem.multiplier+=

        upgrade.bonus;



        addNews(

        upgrade.name+

        " verbeterd!"

        );



    }



}



// =======================
// WORK FATIGUE
// =======================


const fatigue={

    value:0,

    max:100

};



function increaseFatigue(){



    fatigue.value+=2;



    if(fatigue.value>fatigue.max){

        fatigue.value=fatigue.max;

    }



}



function recoverFatigue(){



    fatigue.value-=5;



    if(fatigue.value<0){

        fatigue.value=0;

    }



}



setInterval(

recoverFatigue,

60000

);



// =======================
// FATIGUE EFFECT
// =======================


function getWorkEfficiency(){



    let efficiency=1;



    if(fatigue.value>50){



        efficiency-=0.25;



    }



    if(fatigue.value>80){



        efficiency-=0.50;



    }



    return efficiency;



}



// =======================
// IMPROVED WORK CLICK
// =======================


function advancedWorkClick(){



    let job=

    workSystem.currentJob;



    if(!job){

        return;

    }



    increaseFatigue();



    let efficiency=

    getWorkEfficiency();



    workSystem.progress+=

    efficiency;



    workSystem.clicks++;



    addCareerXP(2);



    if(

    workSystem.progress>=

    job.clicksNeeded

    ){



        finishWork();



    }



    updateWorkUI();



}



// =======================
// WORK CONTRACTS
// =======================


const workContracts=[];



function generateWorkContract(){



    let job=

    jobs[

    randomInt(

    0,

    jobs.length-1

    )

    ];



    workContracts.push({



        job:job.id,


        amount:randomInt(

        3,

        10

        ),


        reward:randomInt(

        1000,

        5000

        )



    });



}



setInterval(

generateWorkContract,

120000

);



// =======================
// COMPLETE CONTRACT
// =======================


function completeWorkContract(index){



    let contract=

    workContracts[index];



    if(!contract){

        return;

    }



    addMoney(

    contract.reward

    );



    addXP(100);



    workContracts.splice(

    index,

    1

    );



    addNews(

    "Werkcontract voltooid!"

    );



}



// =======================
// EMPLOYEES
// =======================


const employees=[];



function hireEmployee(type){



    let employee={



        name:randomName(),


        job:type,


        income:randomInt(

        10,

        100

        ),


        salary:randomInt(

        100,

        500

        )



    };



    if(removeMoney(employee.salary)){



        employees.push(employee);



        addNews(

        employee.name+

        " aangenomen."

        );



    }



}



// =======================
// EMPLOYEE INCOME
// =======================


function employeeTick(){



    let income=0;



    employees.forEach(employee=>{



        income+=employee.income;



    });



    if(income>0){



        addMoney(income);



        stats.moneyEarnedPassive+=income;



    }



}



setInterval(

employeeTick,

60000

);



// =======================
// END DEEL 2
// =======================
// ==========================================================
// HOLLAND ECONOMY
// work.js
// DEEL 3
// GEEN OPLEIDINGEN/SCHOLEN
// ==========================================================


// =======================
// EXTRA NEDERLANDSE BANEN
// =======================


jobs.push(


{
id:"boer",
name:"Boer",
category:"Landbouw",
difficulty:2,
salary:200,
xp:40,
clicksNeeded:50,
unlocked:false
},


{
id:"tuinder",
name:"Tuinder",
category:"Landbouw",
difficulty:3,
salary:300,
xp:60,
clicksNeeded:60,
unlocked:false
},


{
id:"visser",
name:"Visser",
category:"Visserij",
difficulty:3,
salary:350,
xp:70,
clicksNeeded:70,
unlocked:false
},


{
id:"vrachtwagenchauffeur",
name:"Vrachtwagenchauffeur",
category:"Transport",
difficulty:4,
salary:600,
xp:100,
clicksNeeded:90,
unlocked:false
},


{
id:"treinmachinist",
name:"Treinmachinist",
category:"Transport",
difficulty:5,
salary:900,
xp:150,
clicksNeeded:120,
unlocked:false
},


{
id:"piloot",
name:"Piloot",
category:"Transport",
difficulty:8,
salary:3000,
xp:400,
clicksNeeded:250,
unlocked:false
},


{
id:"kok",
name:"Kok",
category:"Horeca",
difficulty:2,
salary:180,
xp:35,
clicksNeeded:40,
unlocked:false
},


{
id:"restaurant_eigenaar",
name:"Restaurant eigenaar",
category:"Horeca",
difficulty:6,
salary:2000,
xp:300,
clicksNeeded:180,
unlocked:false
},


{
id:"bouwvakker",
name:"Bouwvakker",
category:"Bouw",
difficulty:3,
salary:450,
xp:80,
clicksNeeded:70,
unlocked:false
},


{
id:"architect",
name:"Architect",
category:"Bouw",
difficulty:7,
salary:2500,
xp:350,
clicksNeeded:200,
unlocked:false
},


{
id:"monteur",
name:"Automonteur",
category:"Techniek",
difficulty:3,
salary:500,
xp:90,
clicksNeeded:80,
unlocked:false
},


{
id:"ingenieur",
name:"Ingenieur",
category:"Techniek",
difficulty:7,
salary:2800,
xp:400,
clicksNeeded:220,
unlocked:false
},


{
id:"handelaar",
name:"Internationale Handelaar",
category:"Handel",
difficulty:6,
salary:2200,
xp:300,
clicksNeeded:180,
unlocked:false
},


{
id:"vastgoedmakelaar",
name:"Vastgoedmakelaar",
category:"Vastgoed",
difficulty:6,
salary:2500,
xp:350,
clicksNeeded:190,
unlocked:false
},


{
id:"investeerder",
name:"Professioneel Investeerder",
category:"Financiën",
difficulty:8,
salary:5000,
xp:600,
clicksNeeded:300,
unlocked:false
}


);



// =======================
// PROMOTIE SYSTEEM
// =======================


const promotions=[];



function checkPromotion(){



    jobs.forEach(job=>{



        if(

        game.jobsCompleted>=

        job.difficulty*20

        ){



            if(!promotions.includes(job.id)){



                promotions.push(job.id);



                addNews(

                "Promotie mogelijk: "+

                job.name

                );



            }



        }



    });



}



setInterval(

checkPromotion,

10000

);



// =======================
// SALARIS ONDERHANDELEN
// =======================


function negotiateSalary(){



    let job=

    workSystem.currentJob;



    if(!job){

        return;

    }



    let chanceValue=

    randomInt(

    1,

    100

    );



    if(chanceValue>60){



        job.salary*=1.10;



        addNews(

        "Salarisverhoging gekregen!"

        );



    }

    else{



        addNews(

        "Salarisonderhandeling mislukt."

        );



    }



}



// =======================
// TIJDELIJKE BANEN
// =======================


const temporaryJobs=[



{

name:"Festival medewerker",

salary:800,

duration:10

},


{

name:"Zomer bezorger",

salary:1200,

duration:15

},


{

name:"Kerstdienst",

salary:2000,

duration:20

}


];



function createTemporaryJob(){



    let job=

    temporaryJobs[

    randomInt(

    0,

    temporaryJobs.length-1

    )

    ];



    addNews(

    "Tijdelijke baan beschikbaar: "+

    job.name

    );



    return job;



}



// =======================
// WORK EVENTS
// =======================


const workEvents=[



{

name:"Drukke werkdag",

bonus:25

},


{

name:"Rustige dag",

bonus:-10

},


{

name:"Overuren",

bonus:50

},


{

name:"Nieuwe klant",

bonus:30

}



];



function randomWorkEvent(){



    if(!chance(20)){

        return;

    }



    let event=

    workEvents[

    randomInt(

    0,

    workEvents.length-1

    )

    ];



    workSystem.multiplier+=

    event.bonus/100;



    addNews(

    "Werk event: "+

    event.name

    );



}



setInterval(

randomWorkEvent,

60000

);



// =======================
// CAREER STATISTICS
// =======================


function getWorkStatistics(){



    return{


        totalJobs:

        game.jobsCompleted,


        money:

        stats.moneyEarnedJobs,


        rank:

        career.title,


        fatigue:

        fatigue.value,


        employees:

        employees.length



    };


}



// =======================
// END DEEL 3
// =======================
// ==========================================================
// HOLLAND ECONOMY
// work.js
// DEEL 4
// ==========================================================


// =======================
// WORK COMBO SYSTEM
// =======================


const workCombo={

    amount:0,

    max:100,

    multiplier:1,

    lastClick:0

};



function updateCombo(){



    let now=Date.now();



    if(

    now-workCombo.lastClick

    <3000

    ){



        workCombo.amount++;



    }

    else{



        workCombo.amount=0;



    }



    workCombo.lastClick=now;



    if(workCombo.amount>workCombo.max){

        workCombo.amount=

        workCombo.max;

    }



    workCombo.multiplier=

    1+

    (

    workCombo.amount/

    100

    );



}



// =======================
// COMBO WORK CLICK
// =======================


function comboWorkClick(){



    updateCombo();



    let job=

    workSystem.currentJob;



    if(!job){

        return;

    }



    let power=

    workCombo.multiplier*

    getWorkEfficiency();



    workSystem.progress+=power;



    workSystem.clicks++;



    addCareerXP(2);



    if(

    workSystem.progress>=

    job.clicksNeeded

    ){



        finishWork();



    }



    updateWorkUI();



}



// =======================
// DAILY WORK TASKS
// =======================


const dailyWorkTasks=[];



function generateDailyTasks(){



    dailyWorkTasks.length=0;



    dailyWorkTasks.push(



    {

    name:"Werk 10 keer",

    goal:10,

    progress:0,

    reward:500

    },


    {

    name:"Verdien €5000",

    goal:5000,

    progress:0,

    reward:1000

    },


    {

    name:"Gebruik 100 clicks",

    goal:100,

    progress:0,

    reward:750

    }



    );



}



generateDailyTasks();



// =======================
// UPDATE TASKS
// =======================


function updateDailyTasks(){



    dailyWorkTasks.forEach(task=>{



        if(task.name==="Werk 10 keer"){



            task.progress=

            game.jobsCompleted;



        }



        if(task.name==="Verdien €5000"){



            task.progress=

            stats.moneyEarnedJobs;



        }



        if(task.name==="Gebruik 100 clicks"){



            task.progress=

            workSystem.clicks;



        }



        if(task.progress>=task.goal){



            addMoney(

            task.reward

            );



            addNews(

            "Werk opdracht voltooid!"

            );



            task.progress=0;



        }



    });



}



setInterval(

updateDailyTasks,

5000

);



// =======================
// AUTOMATIC WORKERS 2.0
// =======================


function upgradeEmployee(index){



    let employee=

    employees[index];



    if(!employee){

        return;

    }



    let cost=

    employee.salary*

    5;



    if(removeMoney(cost)){



        employee.income*=1.25;



        addNews(

        employee.name+

        " werkt efficiënter."

        );



    }



}



// =======================
// EMPLOYEE EXPERIENCE
// =======================


employees.forEach(employee=>{


    employee.level=1;


});



function employeeExperience(){



    employees.forEach(employee=>{



        if(!employee.level){

            employee.level=1;

        }



        employee.xp=

        (employee.xp||0)+1;



        if(

        employee.xp>=

        employee.level*100

        ){



            employee.level++;



            employee.income*=1.10;



            employee.xp=0;



        }



    });



}



setInterval(

employeeExperience,

60000

);



// =======================
// WORK COMPANY CONNECTION
// =======================


function companyEmployeeBonus(company){



    if(!company){

        return 1;

    }



    let bonus=

    1;



    if(company.level>=5){



        bonus+=0.25;



    }



    if(company.level>=10){



        bonus+=0.50;



    }



    return bonus;



}



// =======================
// WORK TAB UI
// =======================


function updateWorkTab(){



    let job=

    workSystem.currentJob;



    if(!job){

        return;

    }



    let elements={



        job:"currentJob",


        salary:"jobSalary",


        progress:"workProgress",


        combo:"workCombo",


        fatigue:"fatigue"



    };



    if(document.getElementById(elements.salary)){



        document.getElementById(

        elements.salary

        ).textContent=

        "€"+job.salary;



    }



    if(document.getElementById(elements.combo)){



        document.getElementById(

        elements.combo

        ).textContent=

        "x"+

        workCombo.multiplier.toFixed(2);



    }



    if(document.getElementById(elements.fatigue)){



        document.getElementById(

        elements.fatigue

        ).textContent=

        fatigue.value+"%";



    }



}



// =======================
// WORK LOOP
// =======================


setInterval(

updateWorkTab,

1000

);



// =======================
// RESET WORK DAY
// =======================


function resetWorkDay(){



    workSystem.clicks=0;


    workCombo.amount=0;


    workCombo.multiplier=1;


    generateDailyTasks();



    addNews(

    "Nieuwe werkdag begonnen."

    );



}



// =======================
// END WORK.JS
// =======================
