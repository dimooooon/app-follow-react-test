import React, { useState } from 'react';
import { Button } from 'semantic-ui-react'

import logo from './logo.svg';
import './App.css';

import { billingDataService } from './services/data-services/billing-data.service';
import EditBillingDataModal from './components/EditBillingDataModal/EditBillingDataModal';
import { BillingForm } from './models/billing-form.model';
import { messageService } from './services/message.service';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [billingForm, setBillingForm] = useState({} as BillingForm);

  function loadData(): void {
    billingDataService.getData()
        .then((data: BillingForm) => {
            setBillingForm(data);
            setIsModalVisible(true);
        });
  }

  function onChange(billingForm: BillingForm): void {
    setBillingForm(billingForm);
  }

  function onClose(): void {
    setIsModalVisible(false);
  }

  function onSave(): void {
    billingDataService.saveData(billingForm.toDto())
      .then((response) => {
        if (response instanceof Error) {
          return;
        }

        setIsModalVisible(false);
        messageService.success('Billing data successfully saved');
      })
  }

  return (
    <div className='app-root'>
      <header className='app-header'>
        <img src={logo} className='app-logo' alt='logo' />
      </header>
      <main className='app-content'>
        <Button primary onClick={loadData}>Fill Data</Button>
      </main>
      <EditBillingDataModal billingForm={billingForm} visible={isModalVisible} onClose={onClose} onSave={onSave} onChange={onChange} />
    </div>
  );
}

export default App;
