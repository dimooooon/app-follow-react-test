import { AnyMxRecord } from "dns";
import { DropdownOption } from "../models/dropdown-option.model";

const defaultValueGetter = (item: any) => item.id;
const defaultTextGetter = (item: any) => item.name;

export class DropdownHelper {
  public static toOptions<T>(
    items: T[],
    valueGetter: (item: T) => string = defaultValueGetter,
    textGetter: (item: T) => string = defaultTextGetter,
  ): DropdownOption[] {
    if (!items) {
      return [];
    }

    return items.map(item => ({
      value: valueGetter(item),
      text: textGetter(item),
    }));
  }
}
