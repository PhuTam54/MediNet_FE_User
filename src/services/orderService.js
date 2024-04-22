import * as httpRequest from '~/utils/httpRequest';

export const createOrder = async (orderData, userId, showId) => {
    try {
        const response = await httpRequest.post(`/Orders?userId=${userId}&showId=${showId}`, {
            ...orderData,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updateOrder = async (orderData, orderId) => {
    try {
        const response = await httpRequest.put(`/Orders/id?id=${orderId}`, {
            ...orderData,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getOrder = async (orderCode) => {
    try {
        const response = await httpRequest.get(`/Orders/OrderCode?orderCode=${orderCode}`);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const createOrderTicket = async (orderTicketData, orderId, seatId) => {
    try {
        const response = await httpRequest.post(`/OrderTicket?orderId=${orderId}&seatId=${seatId}`, {
            ...orderTicketData,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const createOrderFood = async (orderFoodData, orderId, foodId) => {
    try {
        const response = await httpRequest.post(`/OrderFood?orderId=${orderId}&foodId=${foodId}`, {
            ...orderFoodData,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
