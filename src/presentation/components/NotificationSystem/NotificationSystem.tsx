/**
 * Notification System Component
 * Sistema de notificações usando Redux
 */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { 
  selectNotifications, 
  removeNotification,
  Notification
} from '../../../store/slices/uiSlice';
import './NotificationSystem.css';

const NotificationSystem: React.FC = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);

  const handleCloseNotification = (id: number): void => {
    dispatch(removeNotification(id));
  };

  React.useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    notifications.forEach((notification: Notification) => {
      if (notification.autoHide && notification.duration) {
        const timer = setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, notification.duration);

        timers.push(timer);
      }
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [notifications, dispatch]);

  if (notifications.length === 0) return null;

  return (
    <div className="notification-system">
      {notifications.map((notification: Notification) => (
        <div 
          key={notification.id}
          className={`notification notification-${notification.type}`}
        >
          <div className="notification-content">
            {notification.title && (
              <div className="notification-title">{notification.title}</div>
            )}
            <div className="notification-message">{notification.message}</div>
          </div>
          <button 
            className="notification-close"
            onClick={() => handleCloseNotification(notification.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;