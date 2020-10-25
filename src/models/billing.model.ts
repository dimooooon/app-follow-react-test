import { IBaseModel } from './base.model';

export class Billing implements IBaseModel {
    public readonly name: string;
    public readonly company: string;
    public readonly country: string;
    public readonly vatId: string;
    public readonly zipCode: string;
    public readonly city: string;
    public readonly address: string;
    public readonly state: string;

    constructor(item: any) {
        this.name = '';
        this.company = item.company || '';
        this.country = item.country || '';
        this.vatId = item.vat || '';
        this.zipCode = item.zip_code || '';
        this.city = item.city || '';
        this.address = item.address || '';
        this.state = item.state || '';
    }

    public toDto(): {[key: string]: any} {
        return {
            name: this.name || '',
            company: this.company || '',
            country: this.country || '',
            vat: this.vatId || '',
            zip_code: this.zipCode || '',
            city: this.city || '',
            address: this.address || '',
            state: this.state || '',
        };
    }
}
