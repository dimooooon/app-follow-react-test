import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { FormHelper } from '../../helpers/form.helper';
import { TValidationFunction, ValidationHelper } from '../../helpers/validation.helper';

import { BillingForm } from '../../models/billing-form.model';

import './BillingDataForm.css';

interface IBillingDataFormProps {
    billingForm: BillingForm;
    onChange: (billing: BillingForm) => void;
}

function BillingDataForm(props: IBillingDataFormProps) {
    const [errors, setErrors] = useState({} as {[key: string]: any});
    const [isEUCountrySelected, setIsEUCountrySelected] = useState(false);

    function onChange(propName: string, value: string | null): void {
        props.onChange({
            ...props.billingForm,
            billing: {
                ...props.billingForm.billing,
                [propName]: value,
            }
        } as BillingForm);
    }

    function validate(fieldName: string, value: string, validators: TValidationFunction[]) {
        setErrors(prev => {
            return {
                ...prev,
                [fieldName]: ValidationHelper.validate(value, validators),
            };
        });
    }

    const { billingForm } = props;
    const { billing } = billingForm;

    useEffect(() => {
        validate('name', billing.name, [ValidationHelper.requiredValidator, ValidationHelper.nameValidator]);
    }, [billing.name]);

    useEffect(() => {
        validate('company', billing.company, [ValidationHelper.requiredValidator, ValidationHelper.minLengthValidator(3)]);
    }, [billing.company]);

    useEffect(() => {
        validate('city', billing.city, [ValidationHelper.requiredValidator]);
    }, [billing.city]);

    useEffect(() => {
        validate('vatId', billing.vatId, [ValidationHelper.requiredValidator, ValidationHelper.vatValidator]);
    }, [billing.country, billing.vatId]);

    useEffect(() => {
        validate('state', billing.state, [ValidationHelper.requiredValidator]);
    }, [billing.state]);

    useEffect(() => {
        validate('zipCode', billing.zipCode, [ValidationHelper.requiredValidator, ValidationHelper.minLengthValidator(3)]);
    }, [billing.zipCode]);

    useEffect(() => {
        validate('address', billing.address, [ValidationHelper.requiredValidator, ValidationHelper.minLengthValidator(7)]);
    }, [billing.address]);

    useEffect(() => { 
        setIsEUCountrySelected(!ValidationHelper.validate(billing.country, [ValidationHelper.euCountryValidator]));
     }, [billing.country]);

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
                    error={errors.name ? { content: errors.name } : null}
                    onChange={FormHelper.getOnInputChangeHandler('name', onChange)} />
            </Form.Field>
            <Form.Field>
                <Form.Input
                    label='Company'
                    value={billing.company}
                    placeholder='e.g. AppFollow'
                    error={errors.company ? { content: errors.company } : null}
                    onChange={FormHelper.getOnInputChangeHandler('company', onChange)} />
            </Form.Field>
            <Form.Group widths='equal'>
                <Form.Select
                    label='Country'
                    value={billing.country}
                    options={billingForm.countries}
                    placeholder='Select country'
                    error={errors.country ? { content: errors.country } : null}
                    onChange={FormHelper.getOnSelectChangeHandler('country', onChange)} />
                <Form.Select
                    label='State'
                    value={billing.state}
                    options={billingForm.statesMap[billing.country]}
                    placeholder='Select state'
                    error={errors.state ? { content: errors.state } : null}
                    onChange={FormHelper.getOnSelectChangeHandler('state', onChange)} />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input
                    label='City'
                    value={billing.city}
                    placeholder='e.g. Helsinki'
                    error={errors.city ? { content: errors.city } : null}
                    onChange={FormHelper.getOnInputChangeHandler('city', onChange)} />
                { isEUCountrySelected && (
                <Form.Input
                    label='VAT ID'
                    value={billing.vatId}
                    placeholder='e.g. FI99999999'
                    error={errors.vatId ? { content: errors.vatId } : null}
                    onChange={FormHelper.getOnInputChangeHandler('vatId', onChange)} />
                )}
            </Form.Group>
            <Form.Field>
                <Form.Input
                    label='ZIP Code'
                    value={billing.zipCode}
                    placeholder='e.g. 410012'
                    error={errors.zipCode ? { content: errors.zipCode } : null}
                    onChange={FormHelper.getOnInputChangeHandler('zipCode', onChange)} />
            </Form.Field>
            <Form.Field>
                <Form.TextArea
                    label='Address'
                    value={billing.address}
                    rows='3'
                    placeholder='e.g. 2540 Iroquois Ave.'
                    error={errors.address ? { content: errors.address } : null}
                    onChange={FormHelper.getOnTextAreaChangeHandler('address', onChange)} />
            </Form.Field>
        </Form>
    );
}

export default BillingDataForm;
