Zakup.prototype.constructor = Zakup;
Budzet.prototype.constructor = Budzet;

function Zakup(co,poile){
    var datan = new Date();
    this.dzien = datan.getDate();
    this.dzient = datan.getDay();
    this.godzina = datan.getHours();
    this.minuta = datan.getMinutes();
    this.sekunda = datan.getSeconds();
    this.miesiac = datan.getMonth();
    this.rok = datan.getFullYear();
    this.co = co;
    this.poile = poile;
    this.id = datan.getTime();
    
}

function Budzet(){
var budzetdoc;
    var budzetdzis;
    var budzetweek;
    var budzetmonth;
    this.wyswietlane = new Array();
    this.sortyjakies = [];
}

    
    
Budzet.prototype.dodajzakup = function (){
var elemco = document.getElementById("co").value;
var elempoile = document.getElementById("poile").value;
    console.log(elemco + "" + elempoile);
     var eleme = document.getElementById('formularz');
  eleme.style.zIndex = "-3";
  eleme.style.top = "-1200px";
    var zakupmaly = new Zakup(elemco,elempoile);
    budzet.wyswietlane.push(zakupmaly);
    var elemdodawany = document.createElement('div');
    elemdodawany.classList.add('dupsko');
    elemdodawany.setAttribute('id',zakupmaly.id);
    var parelem = document.getElementById('tenglowny');
    var paradodawany = document.createElement('p');
    paradodawany.classList.add('pklas');
    paradodawany.innerHTML = elemco + " " + elempoile;
    var kolkodod = document.createElement('div');
    kolkodod.classList.add('plusnew');
    var pluspoz = document.createElement('div');
    pluspoz.classList.add('poziom');
    var pluspion = document.createElement('div');
    pluspion.classList.add('pion');
    kolkodod.appendChild(pluspion);
    kolkodod.appendChild(pluspoz);
    elemdodawany.appendChild(paradodawany);
    elemdodawany.appendChild(kolkodod);
    parelem.appendChild(elemdodawany);
    
    
    
    




};

//Przypominacz.prototype.wyswietlMemo = function (notka) {
//    var elem = document.createElement("div");
//    elem.setAttribute("class", "dupaclass");
//    elem.setAttribute("id", notka.idnad);
//    var xpose = notka.posx + "px";
//    var ypose = notka.posy + "px";
//    elem.style.left = xpose;
//    elem.style.top = ypose;
//    elem.style.backgroundColor = 'rgba(' + notka.kolor.r + ',' + notka.kolor.g + ',' + notka.kolor.b + ',' + notka.kolor.a + ')';
//    var parelem = document.getElementById('glowny');
//    parelem.appendChild(elem);
//    var parag = document.createElement("p");
//    parag.setAttribute("class", "parag");
//    parag.setAttribute("id", elem.id + "c");
//    parag.innerHTML = notka.tytul;
//    parag.addEventListener('click', memor.killmemo, false);
//    elem.appendChild(parag);
//    var paragtim = document.createElement("p");
//    paragtim.setAttribute("class", "paragtime");
//    paragtim.setAttribute("id", elem.id + "c");
//    paragtim.innerHTML = notka.datalancuch;
//    paragtim.addEventListener('click', memor.killmemo, false);
//    elem.appendChild(paragtim);
//};


function dupa(nowy){
  var elem=document.getElementById('kolko1');
  var elemd=document.getElementById('kolko');
   elem.classList.remove('koloclass1');
   elemd.classList.remove('koloclassa');
 elem.offsetWidth = elem.offsetWidth;
 elemd.offsetWidth = elemd.offsetWidth;
  elem.classList.add('koloclass1');
  elemd.classList.add('koloclassa');
  var eleme = document.getElementById('formularz');
  eleme.style.zIndex = "3";
  eleme.style.top = "200px";
    if(nowy==1)
    {   console.log("nowy z dupy="+nowy)
       }
    else
    {console.log("dopisz to wkońcu")}
}