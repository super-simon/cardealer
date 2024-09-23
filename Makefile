hello:
	echo "Hello!"

reset:
	npm run schema:drop
	npm run migration:run
	npm run seed