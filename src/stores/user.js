import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserDataStore = defineStore({
    id: 'UserData',
    state: () => ({
        UserData: localStorage.getItem('UserData')
    }),
    actions: {
        Login(data) {
            this.UserData = data;
            localStorage.setItem('UserData', data);
        },
    }
});