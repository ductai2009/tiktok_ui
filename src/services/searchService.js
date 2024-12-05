import request from '~/utils/httpRequest';

const search = async (q, type = 'less') => {
    try {
        const result = await request.get('users/search', {
            params: {
                q,
                type,
            },
        });
        return result.data;
    } catch (error) {
        console.error('Error call api search:', error);
    }
};

export default search;
