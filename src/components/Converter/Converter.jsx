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
import { useAuthenticateFetch, useCurrencyValue } from '../../DataQueries/fetch';
import classes from './Converter.module.css';

function Converter() {
  const [destinationCurrency, setDestinationCurrency] = useState('');
  const [baseCurr, setBaseCurr] = useState('');
  const [destCurr, setDestCurr] = useState('');
  const [baseValue, setBaseValue] = useState(Number);
  // handling of authentication and fetched currency goes here
  const {
    status: allDataStatus,
    data: allData,
    isFetching: isFetchingData,
  } = useAuthenticateFetch();
 

  // handling of form inputs goes here
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data, 'da');
    // console.log(errors, 'err');
    setBaseCurr(data.baseCurr);
    setDestCurr(data.destCurr);
    setBaseValue(data.baseValue);
    console.log(baseCurr, destCurr, baseValue, 'valuesssss')
  };
  const {
    status: finalCurrencyValueStatus, data: finalCurrencyValue, isFetching: fetchingCurrencyValue,
  } = useCurrencyValue(baseCurr, destCurr, baseValue);
  console.log(finalCurrencyValueStatus, finalCurrencyValue, fetchingCurrencyValue, 'finallllllllll')
  // useEffect(()=> {
    

  // },[])

  return (
    <div className={classes.converter}>
      <div className={classes.converter_container}>
        <h1 className={classes.container_header}>Converter</h1>
        {/* {console.log(allData?.data?.base, 'hmmm')} */}
        <Form
          className={classes.container_form}
        >
          <div className={classes.container_form_field}>
            <label htmlFor="from">Base Currency</label>
            <Form.Select defaultValue={'EUR'} size="md" {...register('baseCurr', { required: true })}>
              <option disabled>EUR</option>
              {allData?.data.map((list, index) => (
                <>
                  <option>{list}</option>
                </>
              ))}

            </Form.Select>
          </div>
          <div className={classes.container_form_field}>
            <label htmlFor="from">Destination Currency </label>
            <Form.Select size="md" {...register('destCurr', { required: true })}>
              <option disabled>Select Currency</option>
              {allData?.data.map((list, index) => (
                <>
                  <option>{list}</option>
                </>
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
              value={destinationCurrency}
              size="md"
            />
          </div>
        </Form>
        <div className={classes.container_submit}>
          <Button onClick={handleSubmit(onSubmit)} variant="primary">CONVERT</Button>
        </div>
      </div>
    </div>
  );
}

export default Converter;
