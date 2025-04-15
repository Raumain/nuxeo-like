import { Elysia } from "elysia";
import documentRouter from "./documents/controller";

const app = new Elysia().use(documentRouter);

export default app;
