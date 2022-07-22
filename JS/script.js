var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Creo la classe che creerà gli utenti dal json che mi creerò in futuro
var UserSmartphone = /** @class */ (function () {
    function UserSmartphone(utente, numeroCellulare, credito, numeroChiamate, rubrica) {
        this.utente = utente;
        this.numeroCellulare = numeroCellulare;
        this.credito = credito;
        this.numeroChiamate = numeroChiamate;
        this.rubrica = rubrica;
        this.statoChiamata = false;
    }
    // METODI GET
    UserSmartphone.prototype.getUtente = function () { return this.utente; };
    UserSmartphone.prototype.getNumeroCellulare = function () { return this.numeroCellulare; };
    UserSmartphone.prototype.getRubrica = function () { return this.rubrica; };
    UserSmartphone.prototype.getCredito = function () { return this.credito; };
    UserSmartphone.prototype.getNumeroChiamate = function () { return this.numeroChiamate; };
    // L'UTENTE RICARICA IL SUO CREDITO
    UserSmartphone.prototype.ricarica = function (number) {
        if (this.credito < 0) {
            var debito = Math.abs(this.credito);
            var creditoAggiornato = number + parseInt(this.credito.toFixed(2));
            console.log("Sotratti dalla ricarica ".concat(debito.toFixed(2), " euro, a causa di un credito negativo. Credito aggiornato: ").concat(creditoAggiornato.toFixed(2)));
        }
        this.credito = this.credito + number;
        console.log(typeof this.credito, typeof number);
    };
    // L'UTENTE EFFETTUA UNA CHIAMATA
    UserSmartphone.prototype.chiama = function () {
        var _this = this;
        if (this.credito >= 0.20 && this.statoChiamata === false) {
            this.statoChiamata = true;
            var seconds_1 = 58;
            var minutes_1 = 0;
            var costoAlMinuto_1 = 0.20;
            var scattoAllaRisposta_1 = 0.10;
            this.credito -= scattoAllaRisposta_1;
            console.log("L'utente ".concat(this.utente, " ha iniziato una chiamata, addebbitati costi per scatto alla risposta pari a ").concat(scattoAllaRisposta_1.toFixed(2), " euro, hai effettuato in totale ").concat(this.numeroChiamate, " chiamate"));
            this.numeroChiamate++;
            var timer_1 = setInterval(function () {
                if (seconds_1 <= 59) {
                    seconds_1++;
                }
                else {
                    seconds_1 = 0;
                    minutes_1++;
                    _this.credito -= costoAlMinuto_1;
                    console.log("Addebitati " + costoAlMinuto_1.toFixed(2) + " euro, è passato 1 minuto");
                }
                if (_this.credito <= 0) {
                    clearInterval(timer_1);
                    console.log("credito terminato!");
                    _this.statoChiamata = false;
                }
                if (_this.statoChiamata == false && _this.credito > 0) {
                    clearInterval(timer_1);
                    console.log("Chiamata terminata dall'utente! Addebbitati costi chiamata per un totale di: ".concat(minutes_1 * parseInt(scattoAllaRisposta_1.toFixed(2)), " euro pi\u00F9 ").concat(scattoAllaRisposta_1.toFixed(2), " di scatto alla risposta"));
                }
                console.log("durata chiamata: " + minutes_1 + " " + seconds_1 + " credito: " + _this.credito.toFixed(2));
            }, 1000);
        }
        else {
            console.log("Il tuo credito \u00E8 di ".concat(this.credito.toFixed(2), ", per cui non puoi effettuare chiamate. Ricarica subito"));
        }
    };
    // L'UTENTE TERMINA LA CHIAMATA
    UserSmartphone.prototype.terminaChiamata = function () {
        if (this.statoChiamata === true) {
            this.statoChiamata = false;
        }
    };
    return UserSmartphone;
}());
var Displayer = /** @class */ (function () {
    function Displayer(arr) {
        this.arr = arr;
    }
    ;
    Displayer.prototype.displayUsers = function () {
        var display = document.querySelector('#display');
        var menuDiv = document.createElement('div');
        menuDiv.id = 'menuDiv';
        console.log(display);
        this.arr.forEach(function (user) {
            openMenu();
            function openMenu() {
                var div = document.createElement('div');
                div.className = "sezioneUtente";
                var span = document.createElement('span');
                span.className = "username";
                span.innerText = user.utente;
                div.append(span);
                menuDiv.append(div);
                display.append(menuDiv);
                div.addEventListener('click', function () {
                    clearMenuDiv();
                    openModal();
                });
            }
            function clearMenuDiv() {
                var display = document.querySelector('#display');
                var menuDiv = document.querySelector('#menuDiv');
                display.removeChild(menuDiv);
            }
            function openModal() {
                var modal = document.createElement('div');
                modal.className = 'modal';
                var utente = document.createElement('div');
                utente.className = 'utente-modal';
                utente.innerHTML = "BENVENUTO ".concat(user.utente);
                var numeroCellulare = document.createElement('div');
                numeroCellulare.className = 'numeroCellulare-modal';
                numeroCellulare.innerHTML = "Numero di telefono: ".concat(user.numeroCellulare.toString());
                var credito = document.createElement('div');
                credito.className = 'credito-modal';
                credito.innerHTML = "Credito residuo: ".concat(user.credito.toString(), " \u20AC");
                var form = document.createElement('form');
                var ricarica = document.createElement('label');
                ricarica.innerHTML = "ricarica ora";
                var ricaricaInput = document.createElement('input');
                ricaricaInput.type = 'text';
                var buttonRicarica = document.createElement('button');
                buttonRicarica.textContent = "Ricarica";
                form.append(ricarica, ricaricaInput, buttonRicarica);
                form.addEventListener('submit', function (event) {
                    event.preventDefault();
                    var importo = parseInt(ricaricaInput.value);
                    user.ricarica(importo);
                    console.log(typeof importo, typeof user.credito);
                    credito.innerHTML = "Credito residuo: ".concat(user.credito.toString(), " \u20AC");
                });
                var numeroChiamate = document.createElement('div');
                numeroChiamate.className = 'credito-modal';
                numeroChiamate.innerHTML = "Chiamate effettuate: ".concat(user.numeroChiamate.toString());
                var azioni = document.createElement('div');
                azioni.className = 'azioni-modal';
                var buttonChiama = document.createElement('button');
                var timerConfirm = false;
                buttonChiama.addEventListener('click', function () {
                    user.chiama();
                    credito.innerHTML = "Credito residuo: ".concat(user.credito.toFixed(2), " \u20AC");
                    numeroChiamate.innerHTML = "Chiamate effettuate: ".concat(user.numeroChiamate.toString());
                    if (timerConfirm == false) {
                        timerConfirm = true;
                        var timing_1 = document.createElement('div');
                        var seconds_2 = 0;
                        var minutes_2 = 0;
                        var timer_2 = setInterval(function () {
                            if (seconds_2 <= 59) {
                                seconds_2++;
                            }
                            else {
                                seconds_2 = 0;
                                minutes_2++;
                            }
                            timing_1.textContent = "Durata: ".concat(minutes_2, " minuti ").concat(seconds_2, " secondi");
                            modal.append(timing_1);
                            if (timerConfirm == false) {
                                clearInterval(timer_2);
                            }
                        }, 1000);
                    }
                });
                buttonChiama.textContent = "INIZIA CHIAMATA";
                var buttonTermina = document.createElement('button');
                buttonTermina.textContent = "TERMINA CHIAMATA";
                buttonTermina.addEventListener("click", function () {
                    user.terminaChiamata();
                    timerConfirm = false;
                });
                azioni.append(buttonChiama, buttonTermina);
                modal.append(utente, numeroCellulare, credito, form, azioni, numeroChiamate);
                display.append(modal);
            }
        });
    };
    return Displayer;
}());
function getUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var res, arrOfUsers, el;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("../Users.json").then(function (res) { return res.json(); })];
                case 1:
                    res = _a.sent();
                    arrOfUsers = [];
                    res.forEach(function (e) {
                        var credito = parseInt(e.credito);
                        var userSmartphone = new UserSmartphone(e.utente, e.numeroCellulare, credito, e.numeroChiamate, e.rubrica);
                        arrOfUsers.push(userSmartphone);
                    });
                    console.log(arrOfUsers);
                    el = new Displayer(arrOfUsers);
                    el.displayUsers();
                    return [2 /*return*/];
            }
        });
    });
}
getUsers();
