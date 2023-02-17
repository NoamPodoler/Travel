import { createContext } from "react";
import { UserType } from "./interfaces";

export const NotificationsContext = createContext(null);
export const PopupTabContext = createContext(null);
export const MainCurrentContext = createContext(null);
export const ProfileIdContext = createContext<{ user: UserType }>(null);
