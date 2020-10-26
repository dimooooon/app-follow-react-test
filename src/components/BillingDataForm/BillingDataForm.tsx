import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { FormHelper } from '../../helpers/form.helper';
import { ValidationHelper } from '../../helpers/validation.helper';

import { BillingForm } from '../../models/billing-form.model';
import { useFormValidation } from '../FormValidationProvider/FormValidationProvider';

import './BillingDataForm.css';

interface IBillingDataFormProps {
    billingForm: BillingForm;
    showErrors: boolean;
    onChange: (billing: BillingForm) => void;
    onValidChange: (isValid: boolean) => void;
}

function BillingDataForm(props: IBillingDataFormProps) {
    const [isEUCountrySelected, setEUCountrySelected] = useState(false);
    const [isStateDisabled, setStateDisabled] = useState(false);
    const { validate, hasErrors, clearFieldError, showAllErrors, errors } = useFormValidation();

    function onChange(propName: string, value: string | null): void {
        props.onChange({
            ...props.billingForm,
            billing: {
                ...props.billingForm.billing,
                [propName]: value,
            },
        } as BillingForm);
        clearFieldError(propName);
    }

    const { billingForm } = props;
    const { billing } = billingForm;

    //#region Validation rules

    useEffect(() => {
        validate('name', billing.name, [ValidationHelper.requiredValidator, ValidationHelper.nameValidator]);
    }, [billing.name, validate]);

    useEffect(() => {
        validate('company', billing.company, [ValidationHelper.requiredValidator, ValidationHelper.minLengthValidator(3)]);
    }, [billing.company, validate]);

    useEffect(() => {
        validate('country', billing.country, [ValidationHelper.requiredValidator]);
    }, [billing.country, validate]);

    useEffect(() => {
        const states = billingForm.statesMap[billing.country];
        const validators = states && states.length ? [ValidationHelper.requiredValidator] : [];
        setStateDisabled(!states.length)
        validate('state', billing.state, validators);
    }, [billing.country, billing.state, billingForm.statesMap, validate]);

    useEffect(() => {
        const validators = isEUCountrySelected ? [ValidationHelper.requiredValidator, ValidationHelper.vatValidator] : [];
        validate('vatId', billing.vatId, validators);
    }, [billing.vatId, isEUCountrySelected, validate]);

    useEffect(() => {
        validate('zipCode', billing.zipCode, [ValidationHelper.requiredValidator, ValidationHelper.minLengthValidator(3)]);
    }, [billing.zipCode, validate]);

    useEffect(() => {
        validate('address', billing.address, [ValidationHelper.requiredValidator, ValidationHelper.minLengthValidator(7)]);
    }, [billing.address, validate]);

    //#endregion

    useEffect(() => { 
        setEUCountrySelected(!ValidationHelper.validate(billing.country, [ValidationHelper.euCountryValidator]));
     }, [billing.country]);

    useEffect(() => { 
        props.onValidChange(!hasErrors());
    }, [ hasErrors, props]);

    useEffect(() => {
        if (props.showErrors) {
            showAllErrors();
        }
    }, [props.showErrors, showAllErrors]);

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
                    error={errors.name && errors.name.isVisible ? { content: errors.name.message } : null}
                    onChange={FormHelper.getOnInputChangeHandler('name', onChange)} />
            </Form.Field>
            <Form.Field>
                <Form.Input
                    label='Company'
                    value={billing.company}
                    placeholder='e.g. AppFollow'
                    error={errors.company && errors.company.isVisible ? { content: errors.company.message } : null}
                    onChange={FormHelper.getOnInputChangeHandler('company', onChange)} />
            </Form.Field>
            <Form.Group widths='equal'>
                <Form.Select
                    label='Country'
                    value={billing.country}
                    options={billingForm.countries}
                    placeholder='Select country'
                    error={errors.country && errors.country.isVisible ? { content: errors.country.message } : null}
                    onChange={FormHelper.getOnSelectChangeHandler('country', onChange)} />
                <Form.Select
                    label='State'
                    value={billing.state}
                    options={billingForm.statesMap[billing.country]}
                    placeholder='Select state'
                    disabled={isStateDisabled}
                    error={errors.state && errors.state.isVisible ? { content: errors.state.message } : null}
                    onChange={FormHelper.getOnSelectChangeHandler('state', onChange)} />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input
                    label='City'
                    value={billing.city}
                    placeholder='e.g. Helsinki'
                    error={errors.city && errors.city.isVisible ? { content: errors.city.message } : null}
                    onChange={FormHelper.getOnInputChangeHandler('city', onChange)} />
                { isEUCountrySelected && (
                <Form.Input
                    label='VAT ID'
                    value={billing.vatId}
                    placeholder='e.g. FI99999999'
                    error={errors.vatId && errors.vatId.isVisible ? { content: errors.vatId.message } : null}
                    onChange={FormHelper.getOnInputChangeHandler('vatId', onChange)} />
                )}
            </Form.Group>
            <Form.Field>
                <Form.Input
                    label='ZIP Code'
                    value={billing.zipCode}
                    placeholder='e.g. 410012'
                    error={errors.zipCode && errors.zipCode.isVisible ? { content: errors.zipCode.message } : null}
                    onChange={FormHelper.getOnInputChangeHandler('zipCode', onChange)} />
            </Form.Field>
            <Form.Field>
                <Form.TextArea
                    label='Address'
                    value={billing.address}
                    rows='3'
                    placeholder='e.g. 2540 Iroquois Ave.'
                    error={errors.address && errors.address.isVisible ? { content: errors.address.message } : null}
                    onChange={FormHelper.getOnTextAreaChangeHandler('address', onChange)} />
            </Form.Field>
    </Form>
    );
}

export default BillingDataForm;
