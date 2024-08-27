rm -R -f ./migrations &&
pipenv run init &&
dropdb -h localhost -U postgres neighbor || true &&
createdb -h localhost -U postgres neighbor || true &&
psql -h localhost neighbor -U postgres -c 'CREATE EXTENSION unaccent;' || true &&
pipenv run migrate &&
pipenv run upgrade
