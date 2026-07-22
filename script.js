let money = 1000;

let progress = 0;

let working = false;

function updateMoney(){

    document.getElementById("moneyAmount").innerText = money;

}

function showTab(tab){

    let tabs = document.getElementsByClassName("tab");

    for(let i=0;i<tabs.length;i++){

        tabs[i].style.display="none";

    }

    document.getElementById(tab).style.display="block";

}

function startJob(name){

    working = true;

    progress = 0;

    document.getElementById("jobTitle").innerText = name;

    document.getElementById("progress").value = progress;

}

function workClick(){

    if(!working){

        return;

    }

    progress++;

    document.getElementById("progress").value = progress;

    if(progress>=20){

        working=false;

        money+=60;

        updateMoney();

        alert("Werk voltooid! +€60");

    }

}

updateMoney();
