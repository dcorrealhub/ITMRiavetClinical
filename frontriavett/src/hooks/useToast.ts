import { useState, useCallback } from 'react';
import { ToastMessage } from '../types/common';

let toastId = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (type: ToastMessage['type'], message: string, duration: number = 3000) => {
      const id = `toast-${toastId++}`;
      const newToast: ToastMessage = { id, type, message };

      setToasts((prev) => [...prev, newToast]);

      // Auto remove after duration
      setTimeout(() => {
        removeToast(id);
      }, duration);

      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback(
    (message: string, duration?: number) => {
      return addToast('success', message, duration);
    },
    [addToast]
  );

  const error = useCallback(
    (message: string, duration?: number) => {
      return addToast('error', message, duration);
    },
    [addToast]
  );

  const info = useCallback(
    (message: string, duration?: number) => {
      return addToast('info', message, duration);
    },
    [addToast]
  );

  const warning = useCallback(
    (message: string, duration?: number) => {
      return addToast('warning', message, duration);
    },
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  };
};
