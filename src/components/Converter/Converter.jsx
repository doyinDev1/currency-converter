/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Spinner } from 'react-bootstrap';
import { useAuthenticateFetch, useCurrencyValue, useDummyvalue } from '../../DataQueries/fetch';
import classes from './Converter.module.css';

function Converter() {
  const [destinationCurrency, setDestinationCurrency] = useState(' ');
  const [baseCurr, setBaseCurr] = useState('');
  const [destCurr, setDestCurr] = useState('');
  const [baseValue, setBaseValue] = useState(Number);
  // handling of authentication and fetched currency goes here
  const {
    status: allDataStatus,
    data: allData,
    isFetching: isFetchingData,
  } = useAuthenticateFetch();

  const {
    data: dummyvalue,
    isFetching: dummyFetching,
    status: dummyValueStatus,
  } = useDummyvalue(baseCurr, destCurr, baseValue)
  // handling of form inputs goes here
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {

    try {
      setBaseCurr(data.baseCurr);
      setDestCurr(data.destCurr);
      setBaseValue(data.baseValue);
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error as needed
    }
  };
// render the destination currency only if the value changes
  useEffect(() => {
    if (dummyvalue) {
      // shorten value to 2 decimal places
      setDestinationCurrency(`${dummyvalue?.conversionRate.toFixed(2)}`)
    }

  }, [dummyvalue])

  return (
    <div className={classes.converter}>
      <div className={classes.converter_container}>
        <h1 className={classes.container_header}>Converter</h1>
        <Form
          className={classes.container_form}
        >
          <div className={classes.container_form_field}>
            <label htmlFor="from">Base Currency</label>
            <Form.Select defaultValue={'EUR'} size="md" {...register('baseCurr', { required: true })}>
              <option disabled>EUR</option>
              {allData?.data.map((list, index) => (
                  <option key={index}>{list}</option>
              ))}

            </Form.Select>
          </div>
          <div className={classes.container_form_field}>
            <label htmlFor="from">Destination Currency </label>
            <Form.Select defaultValue={'EUR'} size="md" {...register('destCurr', { required: true })}>
              <option disabled>EUR</option>
              {allData?.data.map((list, index) => (
                  <option key={index}>{list}</option>
              ))}
            </Form.Select>
          </div>
          <div className={classes.container_form_field}>
            <label htmlFor="from">Base Value</label>
            <Form.Control
              type="number"
              placeholder="Base Input"
              size="md"
              min={0}
              {...register('baseValue', { required: true })}
            />
          </div>
          <div className={classes.container_form_field}>
            <label htmlFor="from">Destination Value </label>
            <Form.Control
              type="number"
              disabled
              value={destinationCurrency == 'NaN' ? '0' : destinationCurrency}
              size="md"
            />
          </div>
        </Form>
        <div className={classes.container_submit}>
          {
            dummyFetching === true ?
              <Button disabled variant="primary">Loading...</Button> :
              <Button onClick={handleSubmit(onSubmit)} variant="primary">CONVERT</Button>
          }
        </div>
      </div>
    </div>
  );
}

export default Converter;
