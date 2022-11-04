import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Stepper, Step, StepLabel } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import Shipping from './Shipping';
import { shades } from '../../theme';
import Peyment from './Peyment';

const initialValues = {
    billingAddress: {
        firstName: '',
        lastName: '',
        country: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipCode: '',
    },
    shippingAddress: {
        isSameAddress: true,
        firstName: '',
        lastName: '',
        country: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipCode: '',
    },
    email: '',
    phoneNumber: '',
};

const chekcoutSchema = [
    yup.object().shape({
        billingAddress: yup.object().shape({
            firstName: yup.string().required('required'),
            lastName: yup.string().required('required'),
            country: yup.string().required('required'),
            street1: yup.string().required('required'),
            street2: yup.string(),
            city: yup.string().required('required'),
            state: yup.string().required('required'),
            zipCode: yup.string().required('required'),
        }),
        shippingAddress: yup.object().shape({
            isSameAddress: yup.boolean(),
            firstName: yup.string().when('isSameAddress', {
                is: false,
                then: yup.string().required('required'),
            }),
            lastName: yup.string().when('isSameAddress', {
                is: false,
                then: yup.string().required('required'),
            }),
            country: yup.string().when('isSameAddress', {
                is: false,
                then: yup.string().required('required'),
            }),
            street1: yup.string().when('isSameAddress', {
                is: false,
                then: yup.string().required('required'),
            }),
            street2: yup.string(),
            city: yup.string().when('isSameAddress', {
                is: false,
                then: yup.string().required('required'),
            }),
            state: yup.string().when('isSameAddress', {
                is: false,
                then: yup.string().required('required'),
            }),
            zipCode: yup.string().when('isSameAddress', {
                is: false,
                then: yup.string().required('required'),
            }),
        }),
    }),
    yup.object().shape({
        email: yup.string().required('required'),
        phoneNumber: yup.string().required('required'),
    }),
];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { cart } = useSelector((state) => state.cart);
    const isFirstStep = activeStep === 0;
    const isSecondStep = activeStep === 1;

    const handleFormSubmit = async (values, actions) => {
        setActiveStep(activeStep + 1);

        // copies the billing address onto shipping address
        if (isFirstStep && values.shippingAddress.isSameAddress) {
            actions.setFieldValue('shippingAddress', {
                ...values.billingAddress,
                isSameAddress: true,
            });
        }
        if (isSecondStep) {
            makePayment(values);
        }
        actions.setTouched({});
    };

    async function makePayment(values) {}

    return (
        <Box width={'80%'} m='100px auto'>
            <Stepper
                activeStep={activeStep}
                sx={{
                    m: '20px 0',
                }}
            >
                <Step>
                    <StepLabel>Billing</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Peyment</StepLabel>
                </Step>
            </Stepper>
            <Box>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={chekcoutSchema[activeStep]}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            {isFirstStep && (
                                <Shipping
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                            )}
                            {isSecondStep && (
                                <Peyment
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                            )}
                            <Box
                                display={'flex'}
                                justifyContent='space-between'
                                gap='50px'
                            >
                                {isSecondStep && (
                                    <Button
                                        fullWidth
                                        color='primary'
                                        variant='contained'
                                        sx={{
                                            backgroundColor:
                                                shades.primary[200],
                                            boxShadow: 'none',
                                            color: 'white',
                                            border: 0,
                                            padding: '15px 40px',
                                        }}
                                        onClick={() =>
                                            setActiveStep(activeStep - 1)
                                        }
                                    >
                                        Back
                                    </Button>
                                )}
                                <Button
                                    fullWidth
                                    type='submit'
                                    color='primary'
                                    variant='contained'
                                    sx={{
                                        backgroundColor: shades.primary[400],
                                        boxShadow: 'none',
                                        color: 'white',
                                        border: 0,
                                        padding: '15px 40px',
                                    }}
                                    onClick={() =>
                                        setActiveStep(activeStep - 1)
                                    }
                                >
                                    {isFirstStep ? 'Next' : 'Place Order'}
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default Checkout;
