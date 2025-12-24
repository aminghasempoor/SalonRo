import toast from "react-hot-toast";
import { AxiosResponse } from "axios";

type ToastType = "pending" | "error" | "warning" | "success";
type TranslationFunction = (key: string) => string;

interface ToastHandlers {
    pushToastList: (type: ToastType, id: string) => void;
    dismissToastList: (types: ToastType[]) => void;
    clearToken: () => void;
}

interface RequestOptions {
    auth?: boolean;
    data?: Record<string, string> | FormData;
    requestOptions?: {
        headers?: Record<string, string>;
        signal?: AbortSignal;
        [key: string]: any;
    };
    notification?: boolean;
    pending?: boolean;
    success?: {
        notification: {
            show: boolean;
        };
    };
    failed?: {
        notification: {
            show: boolean;
        };
    };
}

interface ToastPromiseOptions {
    t: TranslationFunction;
    handlers: ToastHandlers;
    options: RequestOptions;
}

export const Notifications = (promise: Promise<AxiosResponse>, { t, handlers, options }: ToastPromiseOptions) => {
    const { pushToastList, dismissToastList, clearToken } = handlers;

    const showNotification = options.notification ?? true;
    const showPending = options.pending ?? true;
    const showSuccess = options.success?.notification?.show ?? true;
    const showFailed = options.failed?.notification?.show ?? true;

    if (!showNotification) return promise;

    return toast.promise(
        promise,
        {
            loading: showPending ? t("Notifications.pending") : "",
            success: (response: AxiosResponse) => {
                if (showSuccess) {
                    dismissToastList(["pending", "warning", "error", "success"]);
                    pushToastList("success", String(response.status));
                }
                return t("Notifications.success");
            },
            error: (error: any) => {
                if (showFailed) {
                    dismissToastList(["pending", "warning", "error", "success"]);
                }

                if (!showFailed) return t("Notifications.error");

                let message = t("Notifications.error");

                if (error.response) {
                    const status = error.response.status;
                    const responseData = error.response.data;

                    // build default message with status code
                    message = `${status} - ${t("Notifications.error")}`;

                    if (status >= 500 && status <= 599) {
                        pushToastList("warning", String(status));
                    } else if (status >= 400 && status <= 499) {
                        switch (status) {
                            case 401:
                                clearToken();
                                pushToastList("error", String(status));
                                break;
                            case 422:
                                // append validation messages
                                if (responseData?.message) {
                                    if (Array.isArray(responseData.message)) {
                                        message = responseData.message.join(", ");
                                    } else {
                                        message = responseData.message;
                                    }
                                }
                                if (responseData?.errors) {
                                    const errs: string[] = [];
                                    Object.keys(responseData.errors).forEach((key) => {
                                        const msg = responseData.errors[key]?.[0];
                                        if (msg) errs.push(msg);
                                    });
                                    if (errs.length) {
                                        message = errs.join(", ");
                                    }
                                }
                                break;
                            case 429:
                                message = `${status} - Too many requests`;
                                pushToastList("error", String(status));
                                break;
                            default:
                                pushToastList("error", String(status));
                                break;
                        }
                    } else {
                        pushToastList("error", t("Notifications.error"));
                    }
                } else if (error.request) {
                    message = t("Notifications.error") + " (No response)";
                    pushToastList("error", message);
                } else {
                    message = t("Notifications.error") + " (Request failed)";
                    pushToastList("error", message);
                }

                return message;
            },
        },
        {
            position: "top-center",
            duration: 4000,
        }
    );
};
