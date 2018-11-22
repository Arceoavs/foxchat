Wenn ihr Valet (Mac) / Homestead (Windows) eingerichtet habt, dann holt ihr euch das Projekt im Git an dem wir arbeiten wie folgt:

1. Ordner aussuchen, in dem ihr arbeiten wollt und Command ausführen:
valet park

2. GIT Projekt ziehen:
git clone https://wiwi-gitlab.uni-muenster.de/a_arzv01/digitaler-tresor.git

3. in den Ordner navigieren
cd digitaler-tresor

4. .env Datei kopieren:
cp .env.example .env

5. Composer dependencies auflösen
composer install

6. Application key generieren
php artisan key:generate

7. Migrate Befehl ausführen
php artisan migrate

Dann solltet ihr im Browser unter http://digitaler-tresor.test unser Projekt öffnen können.

8. NPM Dependencies auflösen:
in den Ordner navigieren und npm install aufrufen

9. Laravel Mix einrichten (Damit Bootstrap und Vue usw. mit dabei sind)
npm run dev 

10. php artisan jwt:secret 

11. npm run watch 

12. php artisan serve

Getestet habe ich das nur unter OS X mit Valet, Windows und Linux User dürften ein klein wenig anders vorgehen müssen