import express from "express";
import {getUsers} from "../../controllers/getUsers.js";

export const router = express.Router();

router.get("/", getUsers);
