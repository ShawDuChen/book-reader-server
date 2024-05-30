import { Response } from "express";
import CrudService, { CrudServiceProps } from "@/services/base/crud.service";
import { HttpError } from "routing-controllers";

export default class BaseHelper<T> {
  async export(
    service: CrudService<CrudServiceProps>,
    res: Response,
    body: Partial<T>,
  ) {
    try {
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      );
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="output.xlsx"',
      );
      const workbook = await service.export(body);
      await workbook.xlsx.write(res);
      return res;
    } catch (error) {
      throw new HttpError(500, error as string);
    }
  }
}
