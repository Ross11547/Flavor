const http = import.meta.env.BACKEND;
import { toastError } from "../utils/toasts";
import axios from "axios";
import { useState } from "react";

export const useRequest = (endpoint, { method = "POST", onSuccess } = {}) => {
    const [current, setCurrent] = useState(null);

    const sendRequest = async (dto) => {
        setCurrent(dto || null);

        try {
            let response;
            switch (method) {
                case "POST":
                    response = await axios.post(http + endpoint, dto);
                    break;
                case "PUT":
                    response = await axios.put(http + endpoint, dto);
                    break;
                case "PATCH":
                    response = await axios.patch(http + endpoint, dto);
                    break;
                case "GET":
                    response = await axios.get(http + endpoint + (dto ? String(dto) : ""));
                    break;
                case "DELETE":
                    response = await axios.delete(http + endpoint + (dto ? String(dto) : ""));
                    break;
                default:
                    throw new Error(`Unsupported method: ${method}`);
            }
            setCurrent(null);
            if (response.status !== 200) return toastError(response.data.message);
            if (onSuccess) onSuccess(response.data);
        } catch (error) {
            setCurrent(null);
            if (!error.response) return console.error(error);
            const { statusText } = error.response;
            if (statusText) {
                toastError(statusText);
            }
        }
    };

    const send = (param) => {
        sendRequest(param);
    };

    return {
        send,
        loading: current !== null,
        current,
    };
};
