import { AppConfig } from "./src/app";
import express from "express";

const server = new AppConfig(express);

server.run();
