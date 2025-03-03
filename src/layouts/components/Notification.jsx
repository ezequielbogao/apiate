import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Error from "./icons/notification/Error";
import Success from "@icons/notification/Success";
import Warning from "@icons/notification/Warning";
import Info from "@icons/notification/Info";
import { removeNotification } from "@slices/notificationSlice"; // Asegúrate de ajustar la ruta correcta

const Notification = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(
        (state) => state.notification.notifications
    );

    useEffect(() => {
        notifications.forEach((notif) => {
            const toastConfig = {
                icon: false,
                theme: "colored",
                position: "top-center",
            };

            switch (notif.type) {
                case "success":
                    toast.success(
                        <div className="flex items-center space-x-3 p-0">
                            <Success />
                            <span className="text-left text-sm">
                                {notif.message}
                            </span>
                        </div>,
                        toastConfig
                    );
                    break;
                case "error":
                    toast.error(
                        <div className="flex items-center space-x-3 p-0">
                            <Error />
                            <span className="text-left text-sm">
                                {notif.message}
                            </span>
                        </div>,
                        toastConfig
                    );
                    break;
                case "warning":
                    toast.warning(
                        <div className="flex items-center space-x-3 p-0">
                            <Warning />
                            <span className="text-left text-sm">
                                {notif.message}
                            </span>
                        </div>,
                        toastConfig
                    );
                    break;
                case "info":
                    toast.info(
                        <div className="flex items-center space-x-3 p-0">
                            <Info />
                            <span className="text-left text-sm">
                                {notif.message}
                            </span>
                        </div>,
                        toastConfig
                    );
                    break;
                default:
                    break;
            }

            dispatch(removeNotification(notif.id));
        });
    }, [notifications, dispatch]);
};

export default Notification;
