import * as httpRequest from '~/utils/httpRequest';

export const getSeatReservation = async (room_Id, show_id) => {
    try {
        const response = await httpRequest.get(`/Seats/reservation?roomId=${room_Id}&showId=${show_id}`);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const createSeatReservation = async (seatReservationData, seatId, showId) => {
    try {
        const response = await httpRequest.post(`/SeatReservations?seatId=${seatId}&showId=${showId}`, {
            ...seatReservationData,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updateSeatReservation = async (seatReservationData, seatReservationId) => {
    try {
        const response = await httpRequest.put(`/SeatReservations/id?id=${seatReservationId}`, {
            ...seatReservationData,
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};