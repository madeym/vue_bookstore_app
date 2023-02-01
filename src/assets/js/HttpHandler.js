import { SendNotification } from "./Helpers.js"

const HttpHandler = {
    async RequestGET(url, notification = false, auth = false) {
        const RequestOption = {
            method: 'GET',
        };

        if (auth == true) {
            RequestOption.headers = {
                Token: JSON.parse(localStorage.getItem('UserData')).Data.Token
            };
        }

        var returnData = {};
        const r = await fetch(url, RequestOption)
            .then((res) => res.text())
            .then((data) => {
                returnData = JSON.parse(data);

                if (notification == true) {
                    SendNotification(JSON.parse(data).Message, JSON.parse(data).Status)
                }
            });
        return returnData;
    },

    async RequestPUT(url, body) {
        const RequestOption = {
            method: 'PUT',
            headers: {
                'Token': JSON.parse(localStorage.getItem('UserData')).Data.Token
            },
            body: body
        };

        var returnData = {};
        const r = await fetch(url, RequestOption)
            .then((res) => res.text())
            .then((data) => {
                returnData = JSON.parse(data);
            });
        return returnData;
    },

    async RequestPOST(url, body, notification = false, auth = false) {
        const RequestOption = {
            method: 'POST',
            body: body
        };

        if (auth == true) {
            RequestOption.headers = {
                Token: JSON.parse(localStorage.getItem('UserData')).Data.Token
            };
        }

        var returnData = {};
        const r = await fetch(url, RequestOption)
            .then((res) => res.text())
            .then((data) => {
                returnData = JSON.parse(data);

                if (notification == true) {
                    SendNotification(JSON.parse(data).Message, JSON.parse(data).Status)
                }
            });
        return returnData;
    },
}

export default HttpHandler