Get the project running
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
    
    Getestet habe ich das nur unter OS X mit Valet, Windows und Linux User dürften ein klein wenig anders vorgehen müssen


Get the project running (Alternative):
	1  	Setup a databse of your choice
		Composer and PHP install

	2   navigate to folder:
		cd digitaler-tresor

	3   copy .env file:
		cp .env.example .env
		
	5	edit .env file and insert your database connection

	6   resolve Composer dependencies:
		composer install

	7   generate Application key:
		php artisan key:generate

	8   execute migrate command:
		php artisan migrate
		
	9	execute serve command:
		php artisan serve

    10  execute jwt command:
        php artisan jwt:secret
		
	Then you should see under http://digitaler-tresor.test our project.