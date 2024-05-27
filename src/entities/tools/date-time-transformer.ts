import dayjs from "dayjs";
import { ValueTransformer } from "typeorm";

export class DateTimeTransformer implements ValueTransformer {
  to(entityValue: Date): Date {
    return entityValue;
  }

  from(databaseValue: Date): string {
    return dayjs(databaseValue).format("YYYY-MM-DD HH:mm:ss");
  }
}
