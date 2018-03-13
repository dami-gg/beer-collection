// @flow
import { NotificationManager } from "react-notifications";

import {
  SUCCESS,
  ERROR,
  WARNING,
  INFO
} from "../constants/notifications.constants";

export const showSuccessNotification = (title: string, message?: string): void =>
  showNotification(SUCCESS, title, message);

export const showErrorNotification = (title: string, message?: string): void =>
  showNotification(ERROR, title, message);

export const showWarningNotification = (title: string, message?: string): void =>
  showNotification(WARNING, title, message);

export const showInfoNotification = (title: string, message?: string): void =>
  showNotification(INFO, title, message);

/*
  HELPER METHODS
*/

const isValidNotificationType = (type: string): boolean =>
  [SUCCESS, ERROR, WARNING, INFO].includes(type);

const showNotification = (
  type: string = INFO,
  title: string = "",
  message?: string = ""
): void =>
  NotificationManager[isValidNotificationType(type) ? type : INFO](
    message,
    title,
    3000
  );
