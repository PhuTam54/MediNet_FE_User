import * as httpRequest from '~/utils/httpRequest';

export const paymentPaypal = async (paymentData) => {
    try {
        const response = await httpRequest.post(`/Payments/PayPal`, {
            ...paymentData,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const paymentVnPay = async (paymentData) => {
    try {
        const response = await httpRequest.post(`/Payments/VnPay`, {
            ...paymentData,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const paymentMomo = async (paymentData) => {
    try {
        const response = await httpRequest.post(`/Payments/Momo`, {
            ...paymentData,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};