import {instance} from "~/shared/config/apiConfig/apiConfig";

export const user = {
    info(token) {
        return instance.get(`User`, {
            headers: {"Authorization": `Basic YmFzaWM6NldUeDdsVjNIR1AzNzRna245c2w= Bearer ${token}`}
        })
    },
    register(data) {
        return instance.post(`User/Register`, data)
    },
    login(data) {
        return instance.post(`User/Login`, data,)
    },

}
