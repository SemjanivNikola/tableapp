<h1 align="center"><b>Table Book</b></h1>

<div align="center">

[![](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)
[![](https://img.shields.io/badge/Vuetifyjs-00C7B7?style=for-the-badge&logo=vuetify&logoColor=white)](https://www.vuetifyjs.com/)

</div>

Application available at: https://tableapp.vercel.app/

<br />

## :information_source: O aplikaciji

Aplikacija se temelji na mogućnosti unosa podataka u tablicu s obzirom na potrebe korisnika. Tablice predstavljaju pregled podataka. One su grupirane tako da se lakše snaći u velikim količinama podataka koji se mogu grupirati. Još jedna veća grpacija u kojoj se to sve nalazi se naziva *Workspace*. Ponovno se daje korisniku mogućnost prilagoditi si sve kako mu odgovara.

<br>

### Rad s podacima

Kod rada s podacima dostupne su opcije filtriranja prema određenim parametrima s više od jednog uvijeta na tablici. Isto tako, moguće je sortirati podatke po stupcima, prema sljedećim opcijama:
<ul>
    <li>A->Z, Z->A za tekstualne podatke</li> 
    <li>Prvi->Posljednji, Posljednji->Prvi za statusne podatke</li> 
    <li>1->9, 9->1 za numeričke podatke</li>
</ul>
Osim toga, korisnuku je pružena mogućnost skrivanja stupaca prema želji.

<br>

### Tipovi stupaca

Moguće je složiti tablicu sa sljedećim tipovima:
<ol>
    <li>Tekst u jednoj liniji (eng. <i>single line text</i>)</li>
    <li>Tekst u više linija (eng. <i>multiline text</i>)</li>
    <li>Broj (eng. <i>number</i>)</li>
    <li>Status - moguće je odabrati od nekoliko ponuđenih: <i>backlog</i>, <i>in progress</i>, <i>need review</i> i <i>done</i></li>
    <li><i>Checkbox</i></li>
    <li>Datum (eng. <i>date</i>)</li>
    <li>E-mail</li>
    <li>Kreirano - odabire se trenutni datum i vrijeme (eng. <i>created at</i>)</li>
    <li>Poveznica na drugu tablicu (eng. <i>link to other table</i>)</li>
</ol>

## :computer: Pokretanje projekta lokalno

Klonirati [projekt](https://github.com/SemjanivNikola/tableapp.git) s GitHub-a preko terminala:

> `git clone https://github.com/SemjanivNikola/tableapp.git`

Otvoriti direktorij u tekst editoru ([WebStorm](https://www.jetbrains.com/webstorm/), [VS Code](https://code.visualstudio.com/)):

Instalirati potrebne pakete korišteći [npm](https://www.npmjs.com/):
```
npm install
```
Pokrenuti projekt komandom:
```
npm run start
```

Ili korišteći [yarn](https://yarnpkg.com/):

```
$ yarn install
```

```
$ yarn run start
```
