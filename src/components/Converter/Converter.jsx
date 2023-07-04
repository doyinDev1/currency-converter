/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuthenticateFetch, useDummyvalue } from '../../DataQueries/fetch';
import classes from './Converter.module.css';

// validation for form goes here

// const validationSchema = yup.object().shape({
//   baseValue: yup.required("Required"),
// });

function Converter() {
  const [destinationCurrency, setDestinationCurrency] = useState('');
  const [baseCurr, setBaseCurr] = useState('');
  const [destCurr, setDestCurr] = useState('');
  const [baseValue, setBaseValue] = useState(Number);
  const [numberErr, setNumberErr] = useState(false);

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
  console.log(errors, 'form errors')

  // render the destination currency only if the value changes
  useEffect(() => {
    if (dummyvalue) {
      // shorten value to 2 decimal places
      setDestinationCurrency(`${dummyvalue?.conversionRate?.toFixed(2)}`)
    }
  }, [dummyvalue])

  return (
    <section id="converter">
      <div className={classes.converter}>
        <div className={classes.converter_container}>
          <h1 className={classes.container_header}>Converter</h1>
          <Form
            className={classes.container_form}
          >
            <div className={classes.container_form_field}>
              <label htmlFor="from">Base Currency</label>
              <Form.Select defaultValue={'EUR'} size="md" {...register('baseCurr', {
                required: true,
                message: "error for base message"
              })}>
                <option disabled>EUR</option>
                {allData?.data?.map((list, index) => (
                  <option key={index}>{list}</option>
                ))}
              </Form.Select>
            </div>
            <div className={classes.container_form_field}>
              <label htmlFor="from">Destination Currency </label>
              <Form.Select defaultValue={'EUR'} size="md" {...register('destCurr', { required: true })}>
                <option disabled>EUR</option>
                {allData?.data?.map((list, index) => (
                  <option key={index}>{list}</option>
                ))}
              </Form.Select>
            </div>
            <div className={classes.container_form_field}>
              <>
                <label htmlFor="from">Base Value</label>
                <Form.Control
                  name='baseValue'
                  type="number"
                  placeholder="Base Input"
                  size="md"
                  min={0}
                  // max={12}
                  {...register('baseValue',
                   {
                    maxLength: {
                      value: 10,
                      message: "must be less than 11 digits"
                    },
                  },
                  )}
                />
              </>
              {errors.baseValue && <h6 className={classes.span}>{errors.baseValue.message}</h6>}
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
    </section>
  );
}

export default Converter;
