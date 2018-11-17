# Digitaler Tresor

Projektseminar: Digitaler Tresor

Get the project running:
	1  	Valet (Mac) / Homestead (Windows) setup
		Composer and PHP install

	2   navigate to folder:
		cd digitaler-tresor

	3   copy .env file:
		cp .env.example .env

	4   resolve Composer dependencies:
		composer install

	5   generate Application key:
		php artisan key:generate

	6   execute migrate command:
		php artisan migrate

	Then you should see under http://digitaler-tresor.test our project.

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
		
	Then you should see under http://digitaler-tresor.test our project.

Git Guidelines:

	1. Get familiar with the feature branch workflow (https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)

	2. Use meaningful, english names for branches (not patch-1)

	3. Use lowerCamelCase for branches and add your initials at the end of the branch. If you work together on one branch, you may add multiple initials.
		Example: loginFeatureJB; loginFeatureJBHB

	4. Please do not destroy the Repository! 


Clean Code Guidelines:

	1. Less code is always better

	Reduce the amount of code in one place. Remove unused variables. Keep it simple.

	2. Extract methods

	It's always better read one method containing 20 lines calling 10 different methods than a method containing 400 lines unnamed logic and twisted commentary. Comments should not be required at all. Functions must only do what the name suggests and nothing else. Limit the amount of arguments/parameters. One or two arguments is the ideal case. Ideally methods should either contain only ’logic’ or only ’execution’.

	3. Good naming

	It's worth to spend some time to find proper name for a class, method, variable we are creating. It will save our colleagues a lot of time. Don't use abbreviations, names should be simple and self-explaining. For example, “usersAction” is an unclear method name – to know what it means, you have to look inside a method body. Use simple, consistent, pronounceable, searchable names. 

	4. Don’t Repeat Yourself

	Do your absolute best to avoid duplicate code. Duplicate code is bad because it means that there's more than one place to alter something if you need to change some logic.

	5. For further, more technical issues read:

	Javascript: https://github.com/ryanmcdermott/clean-code-javascript
	PHP: https://github.com/jupeter/clean-code-php