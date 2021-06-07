import http from "../http-common";

const me = () => {
    return http.get("/v1/me");
};

const get = id => {
    return http.get(`/categoria/${id}`);
};

const getToken = data => {
    return http.post('/auth', data);
};

const remove = id => {
    return http.delete(`/categoria/${id}`);
};

export default {
    getToken,
    get,
    remove
};
