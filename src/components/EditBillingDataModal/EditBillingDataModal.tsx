import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

import BillingDataForm from '../BillingDataForm/BillingDataForm';

import { BillingForm } from '../../models/billing-form.model';

interface IEditBillingDataModalProps {
    billingForm: BillingForm;
    visible: boolean;
    onChange: (billingForm: BillingForm) => void;
    onClose: () => void;
    onSave: () => void;
}

function EditBillingDataModal(props: IEditBillingDataModalProps) {
    if (!props.visible) {
        return null;
    }

    return (
        <Modal open={props.visible} onClose={props.onClose} size="tiny" closeIcon>
            <Modal.Header>Billing Details</Modal.Header>
            <Modal.Content>
                <BillingDataForm billingForm={props.billingForm} onChange={props.onChange} />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={props.onSave} positive>Save</Button>
            </Modal.Actions>
        </Modal>
    );
}

export default EditBillingDataModal;
