const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express();

app.use(cors());
const port = process.env.PORT || 8080;

app.listen(
    port, 
    () => {console.log('Serveur démaré sur le port : ' + port);}
);

const bddConnection = mysql.createConnection(
    {host: "192.168.65.219", //ip du server mariadb
    database : "TD3", //Nom de la base dans phpmyadmin
    user: "site1", //user privilège dans phpmyadmin
    password : "site1" //mdp privilège dans phpmyadmin
    }
);

bddConnection.connect (
    function(err) { if (err) throw err; console.log("Sacha Dume est connecté a la base !"); }
);

app.get (
    '/Route1',
    (req,res) => {

        bddConnection.query("SELECT * FROM Medecin", (err, results) => {
            if (err) {
                return res.status(500).send ({error :err.message });
            }
        //Renvoie automatiquement en JSON
        res.json(results);
        });
    }
)