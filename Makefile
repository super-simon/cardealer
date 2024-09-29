hello:
	echo "Hello!"

reset:
	npm run schema:drop
	npm run migration:run
	npm run seed

e2e-all:
	npx cypress run

e2e-models:
	npx cypress run --spec cypress/e2e/api/006-brands-and-models.cy.js

e2e-adverts:
	npx cypress run --spec cypress/e2e/api/007-adverts.cy.js