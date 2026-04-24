import { useState } from 'react';
import api from '@utils/api';
import { formatCurrency, formatDate, getStatusColor } from '@utils/helper'
import { useToast } from '@context/ToastContext';
import { SpinnerGapIcon } from '@phosphor-icons/react';

const OrderCard = ({ order, updateNumStatus }) => {
  const [status, setStatus] = useState(order.status)
  const [disabled, setDisabled] = useState(false)
  const { showToast } = useToast()

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setDisabled(true)
      const res = await api.patch(`http://localhost:8000/api/admin/orders/${id}/status`, {
        status: newStatus
      })

      if (res.data.success) {
        setStatus(res.data.order.status)
        updateNumStatus()
        showToast('Menu item status successfully updated!')
      }
    } catch (err) {
      console.error("Failed to update statu:", err?.response);
      showToast('Gagal untuk update status!!', 'failed')
    } finally {
      setDisabled(false)
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Order # {order.id}</h3>
          <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(status)}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="border-t border-b border-gray-200 py-3 my-3">
        <p className="font-semibold text-gray-700">Customer: {order.customer_name}</p>
        <p className="text-gray-600">Phone: {order.phone}</p>
        {order.notes && <p className="text-gray-600 italic mt-1">Notes: {order.notes}</p>}
      </div>

      <div className="space-y-2 mb-4">
        <p className="font-semibold text-gray-700">Items:</p>
        {order.order_item.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-700">
              {item.menu.name} x{item.quantity}
            </span>
            <span className="text-gray-900 font-medium">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-xl font-bold text-orange-600">{formatCurrency(order.total_price)}</p>
        </div>
        {status !== 'completed' && (
          <button
            onClick={() => {
              handleUpdateStatus(order.id, status === 'process' ? 'completed' : 'process')
            }}
            disabled={disabled}
            className="bg-orange-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 disabled:bg-gray-700 disabled:cursor-not-allowed flex gap-1"
          >
            {disabled ? <SpinnerGapIcon size={23} weight='bold' className='animate-spin'/> : ''}
            <span>{disabled ? 'Process' : 'Update Status'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
