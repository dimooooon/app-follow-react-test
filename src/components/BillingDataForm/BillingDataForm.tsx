import React from 'react';
import { Form } from 'semantic-ui-react';
import { FormHelper } from '../../helpers/form.helper';

import { BillingForm } from '../../models/billing-form.model';

interface IBillingDataFormProps {
    billingForm: BillingForm;
    onChange: (billing: BillingForm) => void;
}

function BillingDataForm(props: IBillingDataFormProps) {
    function onChange(propName: string, value: string | null): void {
        props.onChange({
            ...props.billingForm,
            billing: {
                ...props.billingForm.billing,
                [propName]: value,
            }
        } as BillingForm);
    }

    const { billingForm } = props;
    const { billing } = billingForm;

    if (!billing) {
        return null;
    }

    return (
        <Form className='billing-data-form'>
            <Form.Field>
                <Form.Input
                    label='Name'
                    value={billing.name}
                    placeholder='e.g. John Smith'
                    onChange={FormHelper.getOnInputChangeHandler('name', onChange)} />
            </Form.Field>
            <Form.Field>
                <Form.Input
                    label='Company'
                    placeholder='e.g. AppFollow'
                    value={billing.company}
                    onChange={FormHelper.getOnInputChangeHandler('company', onChange)} />
            </Form.Field>
            <Form.Group widths='equal'>
                <Form.Select
                    label='Country'
                    value={billing.country}
                    options={billingForm.countries}
                    placeholder='Select country'
                    onChange={FormHelper.getOnSelectChangeHandler('country', onChange)} />
                <Form.Select
                    label='State'
                    value={billing.state}
                    options={billingForm.statesMap[billing.country]}
                    placeholder='Select state'
                    onChange={FormHelper.getOnSelectChangeHandler('state', onChange)} />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input
                    label='City'
                    value={billing.city}
                    placeholder='e.g. Helsinki'
                    onChange={FormHelper.getOnInputChangeHandler('city', onChange)} />
                <Form.Input
                    label='VAT ID'
                    value={billing.vat}
                    placeholder='e.g. 125 458 78' // TODO change placeholder
                    onChange={FormHelper.getOnInputChangeHandler('vat', onChange)} />
            </Form.Group>
            <Form.Field>
                <Form.Input
                    label='ZIP Code'
                    value={billing.zipCode}
                    onChange={FormHelper.getOnInputChangeHandler('zipCode', onChange)} />
            </Form.Field>
            <Form.Field>
                <Form.TextArea
                    label='Address'
                    value={billing.address}
                    rows='3'
                    onChange={FormHelper.getOnTextAreaChangeHandler('address', onChange)} />
            </Form.Field>
        </Form>
    );
}

export default BillingDataForm;
