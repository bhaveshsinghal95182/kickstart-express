#! /usr/bin/env node
import { Scaffolder } from "./core/scaffolder.js";
const scaffolder = new Scaffolder();
await scaffolder.run();
