interface Smartphone {
    credito:number
    numeroChiamate:number;
}
// Creo la classe che creerà gli utenti dal json che mi creerò in futuro 
class UserSmartphone implements Smartphone {
     credito: number;
     numeroChiamate:number;

     utente:string;
     numeroCellulare:number;

     rubrica:Object[];
     private statoChiamata:boolean;

    constructor(utente:string, numeroCellulare:number, credito:number, numeroChiamate:number, rubrica:Object[]) {
        this.utente = utente;
        this.numeroCellulare = numeroCellulare;
        this.credito = credito;
        this.numeroChiamate = numeroChiamate;
        this.rubrica = rubrica;

        this.statoChiamata = false;
    }
    // METODI GET
    getUtente():string { return this.utente; }
    getNumeroCellulare():number { return this.numeroCellulare; }
    getRubrica():Object[] { return this.rubrica; }
    getCredito():number { return this.credito; }
    getNumeroChiamate():number { return this.numeroChiamate; }

    // L'UTENTE RICARICA IL SUO CREDITO
    ricarica(number:number) {
        if (this.credito < 0) {
            let debito = Math.abs(this.credito); 
            let creditoAggiornato = number + this.credito;
            console.log(creditoAggiornato);
            console.log(number.toFixed(2), this.credito.toFixed(2))
            console.log(`Sotratti dalla ricarica ${debito.toFixed(2)} euro, a causa di un credito negativo. Credito aggiornato: ${creditoAggiornato.toFixed(2)}`);
        }
        this.credito = this.credito + number;
    }

    // L'UTENTE EFFETTUA UNA CHIAMATA
    chiama() {
        if (this.credito >= 0.20 && this.statoChiamata === false) {
            this.statoChiamata = true;
            let seconds = 58;
            let minutes = 0;
            let costoAlMinuto = 0.20;

            let scattoAllaRisposta = 0.10;
            this.credito -= scattoAllaRisposta;
            console.log(`L'utente ${this.utente} ha iniziato una chiamata, addebbitati costi per scatto alla risposta pari a ${scattoAllaRisposta.toFixed(2)} euro, hai effettuato in totale ${this.numeroChiamate} chiamate`);

            this.numeroChiamate++

            let timer = setInterval(() => {
                if (seconds <= 59) {
                    seconds++;
                } else {
                    seconds = 0;
                    minutes++;
                    this.credito -= costoAlMinuto;
                    console.log("Addebitati " + costoAlMinuto.toFixed(2) + " euro, è passato 1 minuto")
                }

                if (this.credito <= 0) {
                clearInterval(timer);
                console.log("credito terminato!")
                this.statoChiamata = false;
                }

                if (this.statoChiamata == false && this.credito > 0) {
                    clearInterval(timer);
                    console.log(`Chiamata terminata dall'utente ${this.utente}! Addebbitati costi chiamata per un totale di: ${minutes * parseInt(scattoAllaRisposta.toFixed(2))} euro più ${scattoAllaRisposta.toFixed(2)} di scatto alla risposta`)
                }

                console.log(`${this.utente} , durata chiamata: ${minutes} ${seconds} credito: ${this.credito.toFixed(2)}`);
            }, 1000)
            
        } else {
            console.log(`Il tuo credito è di ${this.credito.toFixed(2)}, per cui non puoi effettuare chiamate. Ricarica subito`)
        }
    }

    // L'UTENTE TERMINA LA CHIAMATA
    terminaChiamata() {
        if (this.statoChiamata === true) {
            this.statoChiamata = false;
        }
    }


}

class Displayer {
    arr:UserSmartphone[];

    constructor(arr:UserSmartphone[]) {
        this.arr = arr;
    };

    wellcome(){
         let display = document.querySelector('#display');
            let divWelcome = document.createElement('div');
                divWelcome.className = 'wellcome';
            display.append(divWelcome);
        setTimeout(() => {
           divWelcome.innerHTML = '<h2>BENVENUTI</h2>';
        },1000)
        setTimeout(() => {
            divWelcome.innerHTML += '<h2>ESERCIZIO EPICODE VENERDI 8</h2>';
         },2000)

        setTimeout(() => {
            let buttonStart = document.createElement('button');
                buttonStart.className = 'buttonStart';
                buttonStart.innerHTML = 'LOGIN';
                divWelcome.append(buttonStart);
                buttonStart.addEventListener('click', () => {
                    divWelcome.style.backgroundColor = 'green';
                    divWelcome.innerHTML = '';
                    setTimeout(() => {
                        this.displayUsers();
                     },500)
                });
         },5000)

    }

    displayUsers(){
        let display = document.querySelector('#display');
        let menuDiv = document.createElement('div');
            menuDiv.id = 'menuDiv';

        let thisClass = this

        this.arr.forEach(function(user){
            thisClass.clearElement('#display');

            openMenu();
            

            function openMenu(){
                let div = document.createElement('div');
                    div.className = "sezioneUtente";

                let span = document.createElement('span');
                    span.className = "username";
                    span.innerText = user.utente;
        
                div.append(span)
                menuDiv.append(div)
                display.append(menuDiv);
                

                div.addEventListener('click', function () {
                    thisClass.clearElement('#display');
                    openModal();
                })
            }

            function openModal() {
                let modal = document.createElement('div');
                    modal.className = 'modal';
                
                let divTurnBack = document.createElement('div');
                    divTurnBack.className = 'modal-div-turnBack';
                let turnBack = document.createElement('button');
                    turnBack.className = 'modal-back';
                    turnBack.innerHTML = '<ion-icon name="home-outline"></ion-icon>';
                    turnBack.addEventListener('click', () => {
                        thisClass.clearElement('#display');
                        thisClass.displayUsers();
                    });


                let utente = document.createElement('div');
                    utente.className = 'utente-modal';
                    utente.innerHTML = `BENVENUTO ${user.utente}`;

                let numeroCellulare = document.createElement('div');
                    numeroCellulare.className = 'numeroCellulare-modal';
                    numeroCellulare.innerHTML = `Numero di telefono: ${user.numeroCellulare.toString()}`

                let credito = document.createElement('div');
                    credito.className = 'credito-modal';
                    credito.innerHTML = `Credito residuo: ${user.credito.toFixed(2)} €`;

                let form = document.createElement('form');
                let ricarica = document.createElement('label');
                    ricarica.innerHTML = "Inserisci importo";
                let ricaricaInput = document.createElement('input');
                    ricaricaInput.type = 'text';
                let buttonRicarica = document.createElement('button');
                    buttonRicarica.textContent = "Ricarica";
                
                form.append(ricarica, ricaricaInput, buttonRicarica);
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
                    let importo = parseInt(ricaricaInput.value);
                    
                    user.ricarica(importo);


                    credito.innerHTML = `Credito residuo: ${user.credito.toFixed(2)} €`;
                })



                let numeroChiamate = document.createElement('div');
                    numeroChiamate.className = 'credito-modal';
                    numeroChiamate.innerHTML = `Chiamate effettuate: ${user.numeroChiamate.toString()}`;

                let azioni = document.createElement('div');
                    azioni.className = 'azioni-modal';
                    let buttonChiama = document.createElement('button');
                        let timerConfirm = false;
                        buttonChiama.addEventListener('click', () => {
                            user.chiama();
                            credito.innerHTML = `Credito residuo: ${user.credito.toFixed(2)} €`;
                            numeroChiamate.innerHTML = `Chiamate effettuate: ${user.numeroChiamate.toString()}`;

                            if (timerConfirm == false) {
                                timerConfirm = true;
                                let timing = document.createElement('div');
                                let seconds = 0;
                                let minutes = 0;
                                let timer = setInterval(() => {
                                    if (seconds <= 59) {
                                        seconds++;
                                    } else {
                                        seconds = 0;
                                        minutes++;
                                    }                
                                    timing.textContent = `Durata: ${minutes} minuti ${seconds} secondi`
                                    credito.innerHTML = `Credito residuo: ${user.credito.toFixed(2)} €`;
                                    modal.append(timing);

                                    if (timerConfirm == false) {
                                        clearInterval(timer)
                                    }
                                }, 1000);

                            }
                            
                        });

                        buttonChiama.innerHTML = '<ion-icon name="call-outline"></ion-icon>';
                        buttonChiama.className = 'buttonChiama';

                    let buttonTermina = document.createElement('button');
                        buttonTermina.innerHTML = '<ion-icon name="call-outline"></ion-icon>';
                        buttonTermina.className = 'buttonTermina';

                        buttonTermina.addEventListener("click", () => {
                            user.terminaChiamata();
                            timerConfirm = false;
                        });


                divTurnBack.append(turnBack);
                azioni.append(buttonChiama, buttonTermina);
                modal.append(divTurnBack , utente, numeroCellulare, credito,form, azioni, numeroChiamate);
                display.append(modal);


            }
        });
        

        
    }

    clearElement(id:string){
        let element = document.querySelector(id);
            element.innerHTML = "";
            
    }
}

async function getUsers() {
    let res = await fetch("../Users.json").then(res => res.json());
    let arrOfUsers:UserSmartphone[] = [];
    
    res.forEach((e) => {
        let credito = parseInt(e.credito),
            numeroChiamate = parseInt(e.numeroChiamate);
        
        let userSmartphone = new UserSmartphone(e.utente, e.numeroCellulare, credito, numeroChiamate, e.rubrica);
        arrOfUsers.push(userSmartphone);

       
    })
    console.log(arrOfUsers);
    let el = new Displayer(arrOfUsers);
    el.wellcome();
    
}

getUsers()

