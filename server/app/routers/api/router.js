const express = require("express");


const router = express.Router();


const { sayWelcome } = require("../../controllers/sayActions");


router.get("/", sayWelcome);

// ...

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const itemsRouter = require("./items/router");

router.use("/items", itemsRouter);

const programRouter = require("./programs/router");

router.use("/programs", programRouter);

const categoriesRouter = require("./categories/router");

router.use("/categories", categoriesRouter);
/* ************************************************************************* */

module.exports = router;
