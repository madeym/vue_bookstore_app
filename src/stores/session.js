import { defineStore } from "pinia";
import { ref } from "vue";

export const useSessionStore = defineStore({
    id: 'Session',
    state: () => ({
        Message: localStorage.getItem('SessionMessage')
    }),
    actions: {
        ShowMessage() {
            var msg = localStorage.getItem('SessionMessage');
            localStorage.removeItem('SessionMessage');
            return msg;
        },
        SetMessage(data) {
            this.Message = data;
            localStorage.setItem('SessionMessage', data);
        },
    }
});