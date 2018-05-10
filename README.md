# Project Web IV 2017-2018 [Bontinck Lennert](mailto:lennert.bontinck.y9785@student.hogent.be) 2TINA

Dit is de GitHub repository voor mijn project carmeets.be dat ik realiseerde als opdracht voor WebApplicaties IV te HoGent.

## Inhoudsopgave

> - [Online versie van dit project](#online-versie-van-dit-project)
> - [Gebruikers](#gebruikers)
> - [Trello](#trello)
> - [Databank importeren](#databank-importeren)
> - [Project lokaal starten](#project-lokaal-starten)
> - [Databank exporteren](#databank-exporteren)
> - [Ondersteunde afbeeldingen voor meeting](#ondersteunde-afbeeldingen-voor-meeting)

## Online versie van dit project

[De online versie van het project carmeets.be is hier te vinden]() of via onderstaande url:

> Coming soon


## Gebruikers

U kan eenvoudig zelf een account aanmaken om de functionaliteit van de site te testen. De onderstaande standaard accounts zijn onder andere ter beschikking gesteld op [de online versie](#online-versie-van-dit-project). Alle initiele gebruikers staan vermeld op [Trello](#trello) toegankelijk voor [Lennert](mailto:lennert.bontinck.y9785@student.hogent.be) en [lector](mailto:Karine.Samyn@hogent.be)
> - STANDAARD GEBRUIKER 1
>     - Gebruikersnaam: web4
>     - Wachtwoord: gelukkiggeennetbeans
>     - Voorkeuren: toon alle soorten meetings



## Trello
Meer informatie over het project is te vinden op [Trello](https://trello.com/web4opdracht):
- Branches:
    - [Hier vindt u uitleg over wat er in elke branch gebeurt is](https://trello.com/b/w6b3P4nx/1-branches) (public)
- Users:
    - [Hier vindt u alle gebruikers die initieel aangemaakt werden](https://trello.com/b/scDIM7Ob/2-users) ([Lennert](mailto:lennert.bontinck.y9785@student.hogent.be) en [lector](mailto:Karine.Samyn@hogent.be))

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
>        - folder\naar\web4-20172018-2a-aalst-pikawika\Site\carMeets\frontend\src\images\uploads

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
>         - web4-20172018-2a-aalst-pikawika\Site\carMeets\frontend\src\images\uploads

## Ondersteunde afbeeldingen voor meeting

Via multer wordt de geslecteerde afbeelding voor een nieuwe meeting gecontroleerd op enkele parameters.

U kan enkele afbeeldingen die voldoen aan deze parameters onder [de map "Sample files/Sample images"](Sample%20files/Sample%20images) vinden.


* * *
© [Bontinck Lennert](https://www.lennertbontinck.com/) 2TINA 2017-2018
