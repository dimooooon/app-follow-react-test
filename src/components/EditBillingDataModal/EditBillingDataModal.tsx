import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';

import BillingDataForm from '../BillingDataForm/BillingDataForm';

import { BillingForm } from '../../models/billing-form.model';
import { FormValidationProvider } from '../FormValidationProvider/FormValidationProvider';

interface IEditBillingDataModalProps {
    billingForm: BillingForm;
    visible: boolean;
    onChange: (billingForm: BillingForm) => void;
    onClose: () => void;
    onSave: () => void;
}

function EditBillingDataModal(props: IEditBillingDataModalProps) {
    const [isValid, setValid] = useState(false);
    const [isErrorsVisible, setErrorsVisible] = useState(false);

    function onSave(): void {
        setErrorsVisible(true);

        if (!isValid) {
            return;
        }

        props.onSave();
    }

    function onValidChange(isValid: boolean): void {
        setValid(isValid);
        setErrorsVisible(false);
    }

    if (!props.visible) {
        return null;
    }

    return (
        <Modal open={props.visible} onClose={props.onClose} size="tiny" closeIcon>
            <Modal.Header>Billing Details</Modal.Header>
            <Modal.Content>
                <FormValidationProvider>
                    <BillingDataForm billingForm={props.billingForm} onChange={props.onChange} onValidChange={onValidChange} showErrors={isErrorsVisible} />
                </FormValidationProvider>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={onSave} positive>Save</Button>
            </Modal.Actions>
        </Modal>
    );
}

export default EditBillingDataModal;
