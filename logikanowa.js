Notka.prototype.constructor = Notka;
Przypominacz.prototype.constructor = Przypominacz;
Kolor.prototype.constructor = Kolor;


//var memor = new Przypominacz();
//var x = setInterval(memor.updateall,2000); //tworzenie nowej instancji przypominacza i ustawienie funckcji do updatu

function Notka(priorytet, prioryt, czaskreacji, czasdeadlinu, tytul, tresc, idnad, posx, posy, kolor, waga, datalancuch,user) {
    this.waga = waga; //waga, najwazniejsze okreslenie waznosci notki
    this.prioryt = prioryt; // 0,1 ale chyba dam 0,01 green, 0,5 yellow i 1 red, po to aby w kolko nie robic sprawdzania czy red czy green, trzeba sie zastanowic czy wogole potrzebne
    this.priorytet = priorytet; //red,green,yellow
    this.czaskreacji = czaskreacji;
    this.czasdeadlinu = czasdeadlinu;
    var nowyid;
    //this.czaspoodjeciu=czaspoodjeciu;// ile do deadlinu
    this.tytul = tytul;
    this.tresc = tresc;
    this.idnad = idnad;
    this.posx = posx;
    this.posy = posy;
    this.kolor = kolor;
    this.datalancuch=datalancuch;
    this.user = user;
    //this.deadline=deadline;
    //this.tel=tel;
    //this.email=email;
}

function Przypominacz() {
    this.notatki = new Array();
    this.thisuser ={};
    this.notatkisort = new Array();
}

function Kolor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}


Przypominacz.prototype.addMemo = function (priorytet) {
    var wagatemp;
    var kolortemp;
    var tytul = document.getElementById("tit").value;
    document.getElementById("tit").value = '';
    var tresc = document.getElementById("tre").value;
    var datadeadline = document.getElementById('data').value;
    var data = new Date();
    var czaskreacji = data.getTime() / 1000;
    var czasdeadlinu;
    var prioryt;
    var kolor = new Kolor();
    var datadead = new Date();
    var datalancuch;
    var thisusera = this.thisuser.iduser;
    console.log(thisusera);
    if (datadeadline === '') {
        if (priorytet == 'green') {
            czasdeadlinu = czaskreacji + 14400;
            prioryt = 0.01;
        }
        if (priorytet == 'orange') {
            czasdeadlinu = czaskreacji + 3600;
            prioryt = 0.49;
        }
        if (priorytet == 'red') {
            czasdeadlinu = czaskreacji + 1200;
            prioryt = 1
        }
    } else {

        var sd = datadeadline.substring(0, 2);
        datadead.setDate(datadeadline.substring(0, 2));
        var md = datadeadline.substring(3, 5);
        datadead.setMonth(datadeadline.substring(3, 5) - 1);
        datalancuch = "T = "+sd + '-' + md + "-" + datadead.getFullYear() +" "+datadead.getHours()+"::"+datadead.getMinutes();
        czasdeadlinu = datadead.getTime() / 1000;
        if (priorytet == 'green') {
            prioryt = 0.01;
        }
        if (priorytet == 'orange') {
            prioryt = 0.49;
        }
        if (priorytet == 'red') {
            prioryt = 1;
        }

    }
    var czaspoodjeciu = czasdeadlinu - czaskreacji;
    var waga = prioryt * 0.3 + ((-1 * (czaspoodjeciu / czaspoodjeciu) + 1) * 0.7);


    if (waga <= 0.5) {
        wagatemp = waga / 0.5;
        kolortemp = Math.floor(wagatemp * 255);
        kolor.r = kolortemp;
        kolor.g = 255;
        kolor.b = 0;
        kolor.a = 1;
    } else {
        wagatemp = (waga - 0.5) / 0.5;
        kolortemp = Math.floor(wagatemp * 255);
        kolor.r = 255;
        kolor.g = 255 - kolortemp;
        kolor.b = 0;
        kolor.a = 1;
    }

    var idpos = this.notatki.length;
    var idnad = Date.now();//tu kurwa zle, moga si epokryc idnady
    
    var posx = (idpos % 6) * 250;
    var posy = Math.floor(idpos / 6) * 180;
    var notkatempor = new Notka(priorytet, prioryt, czaskreacji, czasdeadlinu, tytul, tresc, idnad, posx, posy, kolor, waga, datalancuch,thisusera);
    this.notatki.push(notkatempor);
    this.wyswietlMemo(notkatempor);
    savememo(notkatempor);
};

Przypominacz.prototype.updateall = function () {
    for (var x = 0; x < this.notatki.length; x++) {
        this.notatki[x].calculatecol();

    }
    this.calculateidy();

};

Przypominacz.prototype.changepos = function () {
    for (var counter = 0; counter < this.notatki.length; counter++) {
        this.notatki[counter].posx = (this.notatki[counter].nowyid % 6) * 250;
        this.notatki[counter].posy = Math.floor(this.notatki[counter].nowyid / 6) * 180;
        var elem = document.getElementById(this.notatki[counter].idnad);
        elem.style.left = this.notatki[counter].posx + "px";
        elem.style.top = this.notatki[counter].posy + "px";
    }

};

Przypominacz.prototype.calculateidy = function () {
    var counter = 0;
    var cos = new Object();
    for (var x = 0; x < this.notatki.length; x++) {
        if (!cos.hasOwnProperty([this.notatki[x].waga])) {
            cos[this.notatki[x].waga] = 0;
        } else {
            cos[this.notatki[x].waga] = cos[this.notatki[x].waga] + 1;
        }

        for (var y = 0; y < this.notatki.length; y++) {
            if (x == y) {
                continue;
            }

            if (this.notatki[x].waga < this.notatki[y].waga) {
                counter = counter + 1;
            }
        }

        this.notatki[x].nowyid = counter + cos[this.notatki[x].waga];

        counter = 0;
    }


};


// to jest chwilowy hack
Przypominacz.prototype.wyswietlMemo = function (notka) {
    var elem = document.createElement("div");
    elem.setAttribute("class", "dupaclass");
    elem.setAttribute("id", notka.idnad);
    var xpose = notka.posx + "px";
    var ypose = notka.posy + "px";
    elem.style.left = xpose;
    elem.style.top = ypose;
    elem.style.backgroundColor = 'rgba(' + notka.kolor.r + ',' + notka.kolor.g + ',' + notka.kolor.b + ',' + notka.kolor.a + ')';
    var parelem = document.getElementById('glowny');
    parelem.appendChild(elem);
    var parag = document.createElement("p");
    parag.setAttribute("class", "parag");
    parag.setAttribute("id", elem.id + "c");
    parag.innerHTML = notka.tytul;
    parag.addEventListener('click', memor.killmemo, false);
    elem.appendChild(parag);
    var paragtim = document.createElement("p");
    paragtim.setAttribute("class", "paragtime");
    paragtim.setAttribute("id", elem.id + "c");
    paragtim.innerHTML = notka.datalancuch;
    paragtim.addEventListener('click', memor.killmemo, false);
    elem.appendChild(paragtim);
};

Notka.prototype.calculatecol = function () {
    var wagatemp;
    var kolortemp;
    var czasteraz = new Date();
    var teraz = czasteraz.getTime() / 1000;
    var czasdowagi = this.czasdeadlinu - teraz;
    this.waga = this.prioryt * 0.3 + (-1 * (czasdowagi / (this.czasdeadlinu - this.czaskreacji)) + 1) * 0.7;
    if (this.waga >= 1) {
        this.waga = 1;
    }

    if (this.waga <= 0.5) {
        wagatemp = this.waga / 0.5;
        kolortemp = Math.floor(wagatemp * 255);
        this.kolor.r = kolortemp;
        this.kolor.g = 255;
        this.kolor.b = 0;
    } else {
        wagatemp = (this.waga - 0.5) / 0.5;
        kolortemp = Math.floor(wagatemp * 255);
        this.kolor.r = 255;
        this.kolor.g = 255 - kolortemp;
        this.kolor.b = 0;
    }
    var eleme = document.getElementById(this.idnad);
    eleme.style.backgroundColor = 'rgba(' + this.kolor.r + ',' + this.kolor.g + ',' + this.kolor.b + ',' + this.kolor.a + ')';
};





Przypominacz.prototype.killmemo = function (e) {
    var id = document.getElementById(e.target.id);
    var idp = document.getElementById(id.parentNode.getAttribute('id'));
    removememo(idp.id);
    idp.parentNode.removeChild(idp);
    for (var counter = 0; counter < memor.notatki.length; counter++) {
        if (memor.notatki[counter].idnad == idp.id) {
            memor.notatki.splice(counter, 1);
            break
        }
    }
    memor.updateall();
    memor.changepos();
};


Przypominacz.prototype.populate = function () {
    for (var keys = 0; keys < this.notatki.length; keys++) {
        this.wyswietlMemo(this.notatki[keys])
    }
};



function zapiszpobierz(metoda, urlm, obiekt) {
    var pozadanie = new XMLHttpRequest();


    if (metoda === "GET") {
        pozadanie.open(metoda, urlm, false);
        pozadanie.send(null);
        obiekt = JSON.parse(pozadanie.responseText);
        return obiekt;
    }
    if (metoda === "POST") {
        pozadanie.open(metoda, urlm, true);
        pozadanie.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        pozadanie.send(JSON.stringify(obiekt));
    }
}

function removememo(id) {
    var pozadanie = new XMLHttpRequest();
    pozadanie.open("GET", "./kasuj?id=" + id, true);
    pozadanie.send(null);

}

function savememo(notka) {
    zapiszpobierz("POST", "./zapisz", notka);

}