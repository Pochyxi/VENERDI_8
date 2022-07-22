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
            let creditoAggiornato = number + parseInt(this.credito.toFixed(2))
            console.log(`Sotratti dalla ricarica ${debito.toFixed(2)} euro, a causa di un credito negativo. Credito aggiornato: ${creditoAggiornato.toFixed(2)}`);
        }

        this.credito = this.credito + number;
        console.log(typeof this.credito, typeof number);
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
                    console.log(`Chiamata terminata dall'utente! Addebbitati costi chiamata per un totale di: ${minutes * parseInt(scattoAllaRisposta.toFixed(2))} euro più ${scattoAllaRisposta.toFixed(2)} di scatto alla risposta`)
                }

                console.log("durata chiamata: " + minutes + " " + seconds + " credito: " + this.credito.toFixed(2));
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

    displayUsers(){
        let display = document.querySelector('#display');
        let menuDiv = document.createElement('div');
            menuDiv.id = 'menuDiv';
        console.log(display);

        this.arr.forEach(function(user){
            
            openMenu();


            function openMenu(){
                let div = document.createElement('div');
                div.className = "sezioneUtente"

                let span = document.createElement('span');
                    span.className = "username";
                    span.innerText = user.utente;

                div.append(span)
                menuDiv.append(div)
                display.append(menuDiv);
                

                div.addEventListener('click', function () {
                    clearMenuDiv(); 
                    openModal();
            })
            }
            function clearMenuDiv() {
            let display = document.querySelector ('#display');
            let menuDiv = document.querySelector('#menuDiv');
            display.removeChild(menuDiv);

            
            }
            function openModal() {
                let modal = document.createElement('div');
                    modal.className = 'modal';

                let utente = document.createElement('div');
                    utente.className = 'utente-modal';
                    utente.innerHTML = `BENVENUTO ${user.utente}`;

                let numeroCellulare = document.createElement('div');
                    numeroCellulare.className = 'numeroCellulare-modal';
                    numeroCellulare.innerHTML = `Numero di telefono: ${user.numeroCellulare.toString()}`

                let credito = document.createElement('div');
                    credito.className = 'credito-modal';
                    credito.innerHTML = `Credito residuo: ${user.credito.toString()} €`;

                let form = document.createElement('form');
                let ricarica = document.createElement('label');
                    ricarica.innerHTML = "ricarica ora";
                let ricaricaInput = document.createElement('input');
                    ricaricaInput.type = 'text';
                let buttonRicarica = document.createElement('button');
                    buttonRicarica.textContent = "Ricarica";
                
                form.append(ricarica, ricaricaInput, buttonRicarica);
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
                    let importo = parseInt(ricaricaInput.value);
                    
                    user.ricarica(importo)

                    console.log(typeof importo, typeof user.credito);

                    credito.innerHTML = `Credito residuo: ${user.credito.toString()} €`;
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
                                    modal.append(timing);

                                    if (timerConfirm == false) {
                                        clearInterval(timer)
                                    }
                                }, 1000);

                            }
                            
                        });

                        buttonChiama.textContent = "INIZIA CHIAMATA";

                    let buttonTermina = document.createElement('button');
                        buttonTermina.textContent = "TERMINA CHIAMATA";

                        buttonTermina.addEventListener("click", () => {
                            user.terminaChiamata();
                            timerConfirm = false;
                        });
                
                azioni.append(buttonChiama, buttonTermina);
                modal.append(utente, numeroCellulare, credito,form, azioni, numeroChiamate);
                display.append(modal);


            }
        });
        

        
    }
}

async function getUsers() {
    let res = await fetch("../Users.json").then(res => res.json());
    let arrOfUsers:UserSmartphone[] = [];
    
    res.forEach((e) => {
        let credito = parseInt(e.credito);
        let userSmartphone = new UserSmartphone(e.utente, e.numeroCellulare, credito, e.numeroChiamate, e.rubrica);
        arrOfUsers.push(userSmartphone);

       
    })
    console.log(arrOfUsers);
    let el = new Displayer(arrOfUsers);
    el.displayUsers();
    
}

getUsers()

