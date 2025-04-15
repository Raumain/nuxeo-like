import { Elysia } from "elysia";
import router from "./routes";

const app = new Elysia()
	.get("/", () => "Hello Elysia")
	.use(router)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

app.handle(new Request("http://localhost:3000/document")).then(console.log);