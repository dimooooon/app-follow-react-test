import { DropdownHelper } from '../helpers/dropdown.helper';
import { Billing } from './billing.model';
import { DropdownOption } from './dropdown-option.model';

export class BillingForm {
    public readonly billing: Billing;
    public readonly countries: DropdownOption[];
    public readonly statesMap: {[key: string]: DropdownOption[] } = {};

    constructor(item: any) {
        this.billing = new Billing(item.data);
        this.countries = DropdownHelper.toOptions(
            item.countries.map((countryItem: any) => countryItem.country as string),
            (option: string) => option,
            (option: string) => option,
        );

        item.countries.forEach((countryItem: any) => {
            if (countryItem.country) {
                this.statesMap[countryItem.country] = DropdownHelper.toOptions(
                    countryItem.states || [],
                    (option: string) => option,
                    (option: string) => option,
                );
            }
        });
    }

    public static toDto(item: BillingForm): {[key: string]: any} {
        return Billing.toDto(item.billing);
    }
}