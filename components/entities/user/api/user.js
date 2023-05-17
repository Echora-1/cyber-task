import {BASE_HEADERS, BASE_URL} from "@/shared/config/apiConfig/apiConfig";

const USER__ENDPOINTS = {
    info: {method: 'get', url: `${BASE_URL}User`,},
    register: {method: 'post', url: `${BASE_URL}User/Register`,},
    login: {method: 'post', url: `${BASE_URL}User/Login`},
}

export const user = {
    info(token) {
        return useFetch(USER__ENDPOINTS.info.url, {
            method: USER__ENDPOINTS.info.method,
            headers: {Authorization: `${BASE_HEADERS.Authorization} Bearer ${token}`},
            client: true
        })
    },
    register(data) {
        return useFetch(USER__ENDPOINTS.register.url, {
            method: USER__ENDPOINTS.register.method,
            body: data,
            headers: BASE_HEADERS
        })
    },
    login(data) {
        return useFetch(USER__ENDPOINTS.login.url, {
            method: USER__ENDPOINTS.login.method,
            body: data,
            headers: BASE_HEADERS
        })
    },

}
