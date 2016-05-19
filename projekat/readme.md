# projekat

Aplikacija je jednostavan REST back end i AngularJS klijent 

## API
* za unosenje admina u bazu ovo otkucati u terminalu
curl http://127.0.0.1:8080/api/users/signup -H "content-type: application/json" -d "{\"name\":\"admin\", \"password\":\"admin\",\"role\":\"admin\"}"
* za unosenje obicnog korisnika
curl http://127.0.0.1:8080/api/users/signup -H "content-type: application/json" -d "{\"name\":\"user\", \"password\":\"user\"}"





## Pokretanje aplikacije

1. pokrenuti `npm install` (pre prvog pokretanja aplikacije)
2. ako nemate instaliran bower na kompu onda ovo `npm install -g bower` 
3. `bower install` pre prvog pokretanja aplikacije kao i tacka 1 
4. pokrenuti MongoDB: `mongod --dbpath <putanja do db foldera>`
5. pokretati primere pomoću `node app.js`
