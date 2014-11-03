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
    this.wyswietlane = [];
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
    console.log(zakupmaly.dzien + " " + zakupmaly.co + " " + zakupmaly.poile);
    




};

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