import { Elysia } from "elysia";
import documentMetadataRouter from "./documentMetadata/controller";
import documentTypesRouter from "./documentTypes/controller";
import documentVersionsRouter from "./documentVersions/controller";
import documentsRouter from "./documents/controller";
import filesRouter from "./files/controller";
import groupsRouter from "./groups/controller";
import permissionsRouter from "./permissions/controller";
import usersRouter from "./users/controller";
import workspacesRouter from "./workspaces/controller";
const app = new Elysia({ prefix: "/api" })
	.use(documentMetadataRouter)
	.use(documentTypesRouter)
	.use(documentVersionsRouter)
	.use(documentsRouter)
	.use(filesRouter)
	.use(groupsRouter)
	.use(permissionsRouter)
	.use(usersRouter)
	.use(workspacesRouter);
export default app;
