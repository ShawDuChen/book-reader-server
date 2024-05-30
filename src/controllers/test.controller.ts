// src/controllers/UserController.ts
import { JsonController, Get, Param } from "routing-controllers";

@JsonController("/test")
export class TestController {
  @Get("/")
  getAll() {
    return [{ id: 1, name: "John Doe" }];
  }

  @Get("/:id")
  getOne(@Param("id") id: number) {
    return { id, name: `User ${id}` };
  }
}
