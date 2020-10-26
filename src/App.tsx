import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';

import logo from './logo.svg';
import './App.css';

import { billingDataService } from './services/data-services/billing-data.service';
import EditBillingDataModal from './components/EditBillingDataModal/EditBillingDataModal';
import { BillingForm } from './models/billing-form.model';
import { messageService } from './services/message.service';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';

function App() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [billingForm, setBillingForm] = useState({} as BillingForm);

  function loadData(): void {
    setloading(true);

    billingDataService.getData()
        .then((data: BillingForm) => {
            setloading(false);
            setBillingForm(data);
            setModalVisible(true);
        });
  }

  function onChange(billingForm: BillingForm): void {
    setBillingForm(billingForm);
  }

  function onClose(): void {
    setModalVisible(false);
  }

  function onSave(): void {
    setloading(true);

    billingDataService.saveData(BillingForm.toDto(billingForm))
      .then((response) => {
        if (response instanceof Error) {
          return;
        }

        setloading(false);
        setModalVisible(false);
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
      <EditBillingDataModal
        billingForm={billingForm}
        visible={isModalVisible}
        onClose={onClose}
        onSave={onSave}
        onChange={onChange} />
      <LoadingIndicator isVisible={loading}/>
    </div>
  );
}

export default App;
