import { useState, useContext, useCallback, createContext, Children } from 'react';
import { CheckCircleIcon, WarningCircleIcon, XIcon } from '@phosphor-icons/react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast harus digunakan di dalam ToastProvider');
  }
  return context;
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();

    setToasts((prev) => [...prev, {id, message, type}]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3000);
  }, [])

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}

      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 min-w-75 p-4 rounded-xl shadow-lg shadow-black/5 transform transition-all duration-300 animate-slide-in-left pointer-events-auto border-l-4 bg-white
              ${toast.type === 'success' ? 'border-green-500' : 'border-red-500'}
            `}
          >
            <div className={`shrink-0 ${toast.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {toast.type === 'success' ? (
                <CheckCircleIcon size={28} weight="fill" />
              ) : (
                <WarningCircleIcon size={28} weight="fill" />
              )}
            </div>

            {/* Toast Message */}
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800">
                {toast.type === 'success' ? 'Berhasil' : 'Terjadi Kesalahan'}
              </p>
              <p className="text-sm text-gray-500">{toast.message}</p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XIcon size={18} weight="bold" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}