const express = require('express');
const sth = require('../db/db.js');
const fetchData = sth.fetchData;
const addData = sth.addData;
const delData = sth.delData;
const router = express.Router();

router.get("/", (request, response) => {
    response.send("Hello World. See `/help.txt` for details. (https://lkt-back-end.herokuapp.com/first_app/help.txt)");
});

router.use(express.static(path.join(__dirname,'public')));

router.get("/all", (request, response) => {
    (async () => {
        let words = await fetchData();
        console.log("Fetched");
        response.send(words);
    })();
});

router.get("/add/:name/:id?", (request, response) => {
    const data = request.params;
    const name = data.name;
    const id = Number(data.id);

    addData({ word: name, id: isNaN(id) ? 0 : id });
    response.send({ msg: "Added successfully" });
});

router.get("/del/:name", (request, response) => {
    const data = request.params;
    const name = data.name;
    delData({ word: name });
    response.send({ msg: "Deleted successfully" });
});

router.get("/delid/:id", (request, response) => {
    const data = request.params;
    const id = data.id;
    delData({ id: id });
    response.send({ msg: "Deleted successfully" });
});

module.exports = router;
