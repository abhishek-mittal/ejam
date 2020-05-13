import express from "express";

const router = express.Router();


// Users routes

import deployment from "@routes/deployment";

router.use(deployment);


export default router;