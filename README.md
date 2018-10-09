# portfolio
React, Redux, Express, MongoDB, Redis, Data Caching, Unit Testing, Integration Testing

@REACT + REDUX
- Este un simplu blog care contine boards, postari si comentarii. Pe viitor vreau sa implementez imagini pentru postari si comentarii, similar cu image boards unde userii isi vor urca propriile imagini precum reddit, lainchan, arisuchan, etc. Imaginile vreau sa le stochez intr-un datastore precum Amazon S3, deoarece este mult mai ieftin si mult mai scalabil decat sa le stochez local pe VPS sau intr-o baza de date. 

- Exista probleme de scalabilitate, anume faptul ca stochez toate comentariile in MongoDb, intr-un singur document pentru postul respectiv si marimea maxima permisa pentru acesta este de 4MB. Va trebui sa separ comentariile intr-un array de subdocumente.

- Am folosit CreateReactApp, care mi-a generat proiectul si mi-a rezolvat si problema de CORS care sa ii permita la frontend sa comunice cu backend. Porturi diferite. Problema care poate sa apara pentru Google OAuth callback link.

- Aplicatia suporta local authentication si Google OAuth.

- Pentru AJAX requests am folosit Axios, deoarece este usor sa il folosesc impreuna cu Redux-Thunk middleware si in cazul in care vreau sa fac SSR, Axios permite sa ii folosesc diferite instantieri, ca sa pot sa separ SSR de client rendering.

- Pentru forms am folosit ReduxForm deoarece imi este mai usor sa validez campurile si sa folosesc direct Redux Store pentru a accesa datele din forms.

@Unit testing - deoarece am folosit o aplicatie de React care se va conecta la un API endpoint si Redux, au aparut diferite probleme:

- Deoarece am multe componente de tip container care sunt conectate la Redux, a trebuit sa separ Redux Store-ul de Index Component si sa il pun in Root component care va primi ca arguments componenta careia vreau sa ii dau embed pentru a avea acces la Redux Store si mai primeste un alt argument pentru default state pentru Redux Store.

- Pentru React Unit Testing am folosit Jest + Enzyme (pentru a monta componentele mai usor).

- Pentru stub ajax requests facute cu Axios, am folosit Moxios dar deoarece acesta nu suporta complet async requests, a trebuit sa improvizez sa pun metodele de Moxios intr-un Promise. Am mai folosit si Redux-Mock-Store care sa imi ofere un fake Redux Store, caruia i-am spus sa foloseasca Redux-Thunk ca sa pot dat manual dispatch Action pentru ActionCreators pe care vreau sa ii testez.

- Pentru a rezolva problemele de ReactRouter, atunci cand montez individual fiecare componenta, am folosit MemoryRouter care face wrapping componentei montate si ofera o valoare predefinita pentru route-ul curent din History, care este folosit de ActionCreators.

- Partea de securitate la aplicatia de React este verificata dupa ghidul OWASP si nu exista probleme de XSS deoarece este un feature al React-ului sa fie rezistent impotriva acestora. Anume React va inlocui automat anumite caractere speciale cu echivalentul UNICODE al acestora. Dar exista vulnerabilitati precum accesarea datelor dintr-un DB, unde acestea sunt luate ca atare sau folosirea de anchor tags de tip javascript. ideea este ca majoritatea problemelor vor veni de pe backend si fiind o aplicatie in browser-ul adversarului, este posibil ca aceasta sa fie hackuita, chiar daca React foloseste um Virtual DOM separat de cel al browserului.
- DDOS si anti-spam au fost implementate din backend.

======================

@NODE + EXPRESS + REDIS

- Pentru API Server am folosit Node + Express, ca baza de date am folosit MongoDB impreuna cu Mongoose si MLab. Am mai folosit o instanta locala de Redis pentru a face data caching si pentru a memora si limita numarul de requests facute de fiecare IP in parte.

- Deoarece NodeJS are anumite vulnerabilitati care trebuiesc acoperite de module 3rd party, am folosit Helmet pentru a rezolva probleme precum lipsa de secure headers, prevenirea la clickjacking, ascunderea in header a tag-ului X-Powered-By, noSniff, XSS-filter, etc.

- Sunt mai multe features de securitate pe care pot sa le acopar, dar vor functiona doar dupa ce dau deploy la server, precum limitarea transmiterii la cookies doar prin HTTPS si in general folosirea de HTTPS deoarece daca as face acest lucru local, ar trebui sa folosesc un self-signed certificate.

- Ca middleware am mai folosit body-parser care permite citirea datelor din post request, carora le verific typeof-ul inainte sa le prelucrez si acestea vor trece mai intai prin content-filter pentru a fi sterilizate.

- Am ales sa fac autentificarea prin CookieSession impreuna cu Passport Strategies de Local si GoogleOauth.

- Ideea este sa tin pe un singur server API-ul si build-ul de React. Atunci cand se face un request pe orice alt route decat cele predefinite pentru API Server, Serverul va raspunde cu build-ul de React ca sa incarce aplicatia pentru client.

- Am implementat un RateLimiter care se foloseste de Redis ca sa memoreze numarul de request-uri si route-ul pentru fiecare, pentru a putea a proteja serverul de spam sau de bots. Fiecare route o sa aiba reguli diferite. Acest feature este folosit de o instanta diferita de Redis fata de Data Caching.

- Fiecare post request are continutul verificat si JSON-ul trimis va contine doar datele minime necesare pentru client app.

- Autentificarea este de doua feluri: email+password sau Google Oauth. Parolele a fost encriptate cu BCrypt inainte sa fie stocate in DB. Am ales BCrypt in loc de SHA, deoarece BCrypt suporta direct stretch functions, adica encriptarea repetata pe baza unui numar de iteratii din salt + current password hash si mai ales datorita faptului ca BCrypt sa bazeaza pe Blowfish block cipher care este foarte costisitor ca resurse, acest lucru facand dificil cracking-ul hashurilor chiar si de crackerele care se folosesc de VRAM. Ideea de baza este ca BCrypt este incet si consuma multe resurse. Lucru care poate fi folosit ocazional pentru procese precum autentificarea userilor.

- Data Caching este facut folosind un server local de Redis si implementarea a fost facuta prin monkey-patching peste Mongoose si Redis api. Mai exact, am modificat in Redis Api, prototipul lui hget ca sa il oblig sa returneze un promise in loc de callback. Modificarile in Mongoose, au fost facute in prototipul clasei Query mai exact peste metoda exec(), pe care o oblig sa verifice mai intai daca exista deja date in Redis, pentru query-ul care este invocat. Daca NU, o sa invoc metoda clasica de exec() din Mongoose, dar o sa memorez JSON-ul returnat de MongoDB in Redis si apoi trimite rezultatele catre client. Daca DA, va verifica daca query-ul exista deja in DataStore si apoi va returna valoarea direct din Redis, fara sa mai faca request-ul catre MongoDB.
Functioneaza si cu Arrays, adica cu multiple records.
De fiecare data cand se face o postare noua, va fi curatat cache-ul din Redis. Cache-ul din Redis va fi separat pentru fiecare Board in parte.

- Unit Testing-ul pentru NodeJS, a fost facut cu Mocha + Chai + Sinon + SuperTest. Unde am luat fiecare route in parte si am verificat ce date returneaza si cum reactioneaza la diferite requests. Inclusiv routes pentru autentificare si cum sunt trimisi cookies. Au mai fost testate si routes pentru postarea de posturi si comments.

- Integration Testing a fost realizat cu Jest + Puppeteer, unde am verificat toate features ale aplicatiei intr-o instanta automatizata de Chromium. A trebuit sa imi creez manual cookies pentru sesiune si semnatura, pentru a evita autentificarea la fiecare test. Pentru a face testarea mai usoara, mi-am creat propriile metode custom pentru metodele de puppeteer (all-in-one prin Proxy de JavaScript), login(), get, post si getContentsOf(). Adica o sa am tot ce am nevoie intr-un obiect bazat pe Page din Puppeteer.

Continous Integration
- Se va folosi de unit tests si/sau de integration testing pentru a automatiza deploy-ul aplicatiei pe hosting server. In cazul meu am folosit TravisCI impreuna cu Heroku, deoarece sunt gratuite si usor de implementat. O tehnica similara poate fi folosita si pentru continous delivery.

======================

TO DO:

1. Optimizare Backend
- Este o idee sa folosesc clustering pentru a rula simultan mai multe instante pentru API Server, pe o singura masina, numarul la instante va depinde de numarul de core-uri(thread-uri) logice ale procesorului, acestea fiind x2 daca procesorul suporta hyperthreading. Ca aplicatie, pot folosi PM2 care imi va face acest lucru automat, unde o sa am un fel de load-balancer local pe masina, care se va uita la health-ul diferitelor instante ale serverului si isi va da seama daca este nevoie sa porneasca noi instante sau sa le reporneasca pe cele cu probleme. Testarile le fac cu Apache Benchmark, valabil pe Linux/MacOS.

- O alternativa la clustering, ar fi sa folosesc worker-threads pentru NodeJS, ca sa scot din anumite procese din Event Loop si sa le bag manual in ThreadPool-ul din Libuv.
Ideea de baza pentru webworker threads este ca voi crea o interfata intre EventLoop si un nou obiect special, obiect care va fi instantiat in alt thread decat EventLoop-ul. Tot ce se va transmite intre acestea, va fi stringified, decei imi voi pierde contextul de executie. Deci este bine sa tratez webworkers ca pe un alt program separat de la care astept sa imi returneze ceva.
Pot folosi modulul 'webworker-threads', dar conceptul este oarecum ceva nou si clustering este folosit mai des.

- Pe langa solutia locala de clustering / webworkers, va mai trebui sa folosesc un load-balancer despre care inca invat. Multa lume recomanda configurarea unui server de nginx sau chiar folosirea directa la IPTABLES.

- Atunci cand vine vorba de scalabilitatea serverului, mai sunt importante si alte servicii precum storage-ul si costul acestuia. Daca am un volum mare de date impreuna cu multi useri, este posibil sa am nevoie sa folosesc un server de DataStore in loc sa stochez totul pe HDD-ul unui VPS. Probleme similare pot sa apara si daca imi stochez date precum imagini, direct in baza de date. Un avantaj foarte mare este pretul foarte mic pentru stocarea datelor si viteza de download a datelor. Un exemplu de astfel de serviciu este Amazon S3, mai ales cand vine vorba de image-caching. Deoarece pentru ca un user sa isi uploadeze ceva, API Serverul meu va primi un PRESIGNED URL pe care il va trimite userului ca sa isi faca upload direct pe DataStore, dar pentru un file specific cu un anumit nume si un anumit format prestabilit. Eu voi stoca doar url-ul in baza de date. O posibila problema care poate sa apara, este configurarea proasta a politicilor din Bucket-ului din AWS sau o vulnerabilitate in API Server, care vor permite adversarilor sa stocheze ce date vor si acest lucru poate fi riscant din punct de vedere al pretului sau chiar legal. La fel este important ca atunci cand lucrez cu formate media, sa le standardizez folosing servicii precum TinyPNG.

2. Server-side Rendering pentru  React + NodeJS

- SSR se refera la faptul ca vreau ca aplicatia de pe frontend sa fie incarcata instant cu o parte din datele necesare, ca userul sa vada o parte randata din pagina in primele secunde. Acest lucru inseamna mai exact ca va trebui sa ii trimit clientului ca response prima data, HTML-ul aplicatiei de React care a fost prerandata pe server si peste acel HTML, voi arunca bundle-ul de JS care este trimis ulterior catre Browser. Pe langa HTML-ul trimis, atunci cand trimit JS-ul, voi trimite inclusiv datele din Redux Store-ul folosit de SSR. Acest lucreu va permite site-ului sa se incarce partial astfel incat userul sa poata vedea un content din primele secunde.

- Ideea de baza este sa trec aplicatia de Express prin Babel/Webpack si sa ii fac transpiling in ES5 ca sa se poata intelege cu aplicatia de React. Va mai trebui sa folosesc si modulul 'babel-polyfill' ca sa il faca pe Babel sa inteleaga conceptul de async / await. Pe langa acest lucru, va mai trebui sa scriu modulele din Node, in forma de ES6, ca sa poata fi intelese de Babel.

- O problema care poate sa apara atunci cand fac server-side rendering, poate fi felul in care sunt tratate url-urile de redirect de la anumite servicii. In cazul meu, daca vreau sa ma folosesc de autentificarea Google OAuth pentru a preranda html-ul pe care vreau sa-l trimit prima data, va trebui sa implementez un Proxy care sa faca redirect direct catre serverul meu de API. Acest lucru trebuie sa se intample deoarece prerandarea paginii nu se va face in Browser ca in mod normal.

- Tot secretul tine de faptul ca o sa am doua instantieri ale lui Redux care la randul lor vor contine fiecare o instanta separata de Axios. Una pentru url-uri interne si una pentru cele externe. La fel ma voi folosi si de React Router, anume pentru routing-ul clasic de React, voi folosi BrowserRouter si pentru SSR voi folosi StaticRouter.
