import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("userStore", () => {
    const user = ref(null);
   function setUser (userData){
        user.value = userData;
    };

    return {
        user,
        setUser
    };
});