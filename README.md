# Project Web IV 2017-2018 [Bontinck Lennert](mailto:lennert.bontinck.y9785@student.hogent.be) 2TINA

Dit is de GitHub repository voor mijn project carmeets.be dat ik realiseerde als opdracht voor WebApplicaties IV te HoGent.

## Inhoudsopgave

> - [Online versie van dit project](#online-versie-van-dit-project)
> - [Gebruikers](#gebruikers)
> - [Databank importeren](#databank-importeren)
> - [Project lokaal starten](#project-lokaal-starten)
> - [Databank exporteren](#databank-exporteren)
> - [Ondersteunde afbeeldingen voor meeting](#ondersteunde-afbeeldingen-voor-meeting)

## Online versie van dit project
<sub>Vergeten in de master zetten, stond wel in de heroku branch voor de deadline.</sub>

[De online versie van het project carmeets.be is hier te vinden](https://carmeets-frontend.herokuapp.com/home) of via onderstaande url:

> https://carmeets-frontend.herokuapp.com/home


## Gebruikers

U kan eenvoudig zelf een account aanmaken om de functionaliteit van de site te testen. De onderstaande accounts zijn onder ter beschikking gesteld op [de online versie](#online-versie-van-dit-project) en de [ter beschikking gestelde databank](#databank-importeren).

U kan aanmelden met het e-mailadres of de username.

Buiten de eenvoudig aan te maken standaard gebruikers is er één admin account voorzien. Met dit account kan u via de detail pagina van een meeting de meeting verwijderen, ookal bent u de eigenaar niet! Het wachtwoord van dit admin account is beschikbaar voor de [ter beschikking gestelde databank](#databank-importeren). Indien u het wachtwoord wenst voor de admin op de online site kan u terrecht op [Trello](#trello) toegankelijk voor [Lennert](mailto:lennert.bontinck.y9785@student.hogent.be) en [lector](mailto:Karine.Samyn@hogent.be) of een mail sturen naar [Lennert](mailto:lennert.bontinck.y9785@student.hogent.be).
> - Administrator - lokaal
>     - Gebruikersnaam: admin
>     - E-mailadres: admin@carmeets.be
>     - Wachtwoord (lokaal): administrator
>     - Online: [Op aanvraag](mailto:lennert.bontinck.y9785@student.hogent.be)
>     - Voorkeuren: toon alle soorten meetings
> - Standaard gebruiker 1 - lokaal
>     - Gebruikersnaam: web4
>     - E-mailadres: web4@carmeets.be
>     - Wachtwoord: gelukkiggeennetbeans
>     - Voorkeuren: show 4 van de categorieen

## Databank importeren

De initieele databank voorzien van [enkele gebruikers](#gebruikers) en meetings inladen doet u als volgt.

> - Zorg dat u niet aangemeld bent op de website
> - CMD (databank importeren)
>     - cd folder\naar\web4-20172018-2a-aalst-pikawika\Sample files\Sample DB
>     - mongorestore --db carmeetdb carmeetdb
> - File explorer (images die bij databank horen importeren)
>    - kopieer alle inhoud van de folder:
>         - folder\naar\web4-20172018-2a-aalst-pikawika\Sample files\Sample DB\uploads
>    - plak de gekopieerde inhoud naar de folder:
>        - folder\naar\web4-20172018-2a-aalst-pikawika\Site\carMeets\backend\public\images\uploads

U kan het [project nu starten zoals hieronder beschreven](#project-lokaal-starten)

## Project lokaal starten

> - terminal1:
>     - mongod
> - terminal 2:
>     - cd ./backend/
>     - npm install
>     - npm start
> - terminal 3:
>     - cd ./frontend/
>     - npm install
>     - npm start
> - Browser (Google Chrome aanbevolen):
>     - [localhost:4200](http://localhost:4200/)

## Databank exporteren

De huidige databank exporteren doet u zo:

> - CMD (databank exporteren)
>     - cd /folder/waar/je/db/wilt/opslaan
>     - mongodump --db carmeetdb
> - File explorer (images die bij databank horen exporteren)
>     - kopieer alle inhoud van de folder behalve .gitignore naar een backup folder naar keuze:
>         - web4-20172018-2a-aalst-pikawika\Site\carMeets\backend\public\images\uploads

## Ondersteunde afbeeldingen voor meeting

Via multer wordt de geslecteerde afbeelding voor een nieuwe meeting gecontroleerd op enkele parameters.

U kan enkele afbeeldingen die voldoen aan deze parameters onder [de map "Sample files/Sample images"](Sample%20files/Sample%20images) vinden.


* * *
© [Bontinck Lennert](https://www.lennertbontinck.com/) 2TINA 2017-2018
