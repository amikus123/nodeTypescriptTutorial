import {
  createProdcutSchema,
  deleteProdcutSchema,
  getProdcutSchema,
  updaeProdcutSchema,
} from "./schema/product.schema";
import { createSessionSchema } from "./schema/session.schma";
import { createUserSchema } from "./schema/user.schema";
import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import {
  createSessionHandler,
  deleteSessionHandler,
  getUserSessionsHanlder,
} from "./controller/session.controller";
import { requireUser } from "./middleware/requireUser";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controller/product.controlletr";

export default function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => {
    return res.sendStatus(200);
  });
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHanlder);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.post(
    "/api/products",
    [requireUser, validateResource(createProdcutSchema)],
    createProductHandler
  );
  app.get(
    "/api/products/:productId",
    [requireUser, validateResource(getProdcutSchema)],
    getProductHandler
  );
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updaeProdcutSchema)],
    updateProductHandler
  );
  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProdcutSchema)],
    deleteProductHandler
  );
}
