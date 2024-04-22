import * as httpRequest from '~/utils/httpRequest';

export const callApi = async () => {
    try {
        const response = await httpRequest.get('/Categories', {
            params: {},
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};
