import { BillingForm } from '../../models/billing-form.model';
import { SuccessResponse } from '../../models/success-response';
import { BaseDataService } from './base-data.service';

class BillingDataService extends BaseDataService {
    protected readonly controllerName = '';

    public getData(): Promise<BillingForm> {
        return this.get('billing_info')
            .then((response: {[key: string]: any}) => {
                if (response instanceof Error) {
                    throw response;
                }

                return new BillingForm(response);
            });
    }

    public saveData(data: {[key: string]: any}): Promise<SuccessResponse> {
        return this.post('save', data)
            .then((response: any) => {
                if (response instanceof Error) {
                    throw response;
                }

                return response;
            });
    }
}

export const billingDataService = new BillingDataService();
