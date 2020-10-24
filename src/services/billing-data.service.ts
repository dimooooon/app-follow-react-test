import { BillingForm } from '../models/billing-form.model';
import { Billing } from '../models/billing.model';
import { BaseDataService } from './base-data.service';

class BillingDataService extends BaseDataService {
    protected readonly controllerName = '';

    public getData(): Promise<BillingForm> {
        return this.get('billing_info')
            .then((response: {[key: string]: any}) => {
                return new BillingForm(response);
            });
    }

    public saveData(data: {[key: string]: any}): Promise<void> {
        return this.put('save', data).then((response: {[key: string]: any}) => {
            debugger;
        });
    }
}

export const billingDataService = new BillingDataService();
