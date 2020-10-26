export class Billing {
    public readonly name: string;
    public readonly company: string;
    public readonly country: string;
    public readonly vatId: string;
    public readonly zipCode: string;
    public readonly city: string;
    public readonly address: string;
    public readonly state: string;

    constructor(item: any) {
        this.name = item.name || '';
        this.company = item.company || '';
        this.country = item.country || '';
        this.vatId = item.vat || '';
        this.zipCode = item.zip_code || '';
        this.city = item.city || '';
        this.address = item.address || '';
        this.state = item.state || '';
    }

    public static toDto(item: Billing): {[key: string]: any} {
        return {
            name: item.name || '',
            company: item.company || '',
            country: item.country || '',
            vat: item.vatId || '',
            zip_code: item.zipCode || '',
            city: item.city || '',
            address: item.address || '',
            state: item.state || '',
        };
    }
}
