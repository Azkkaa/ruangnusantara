import React, { useState } from 'react';
import { CaretDown, CaretUp, Receipt, CalendarBlank, User, Phone, Notepad } from '@phosphor-icons/react';
import { formatCurrency, formatDate, getStatusColor } from '../utils/helper'

const OrderItemCard = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden mb-4 transition-all duration-300">
      {/* Header Card */}
      <div 
        className={`p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${isOpen ? 'bg-orange-50/30' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800 text-lg">Order #{order.id}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarBlank size={16} />
            <span>{formatDate(order.created_at)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Total Pembayaran</p>
            <p className="font-bold text-orange-600">{formatCurrency(order.total_price)}</p>
          </div>
          {isOpen ? <CaretUp size={20} weight="bold" /> : <CaretDown size={20} weight="bold" />}
        </div>
      </div>

      {/* Dropdown Detail (Order Items) */}
      {isOpen && (
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 animate-fadeIn">
          {/* Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-3 bg-white rounded-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <User size={20} className="text-orange-500" />
              <div>
                <p className="text-xs text-gray-400 uppercase">Customer</p>
                <p className="text-sm font-medium">{order.customer_name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-orange-500" />
              <div>
                <p className="text-xs text-gray-400 uppercase">Telepon</p>
                <p className="text-sm font-medium">{order.phone}</p>
              </div>
            </div>
            {order.notes && (
              <div className="flex items-start gap-3 col-span-full">
                <Notepad size={20} className="text-orange-500" />
                <div>
                  <p className="text-xs text-gray-400 uppercase">Catatan</p>
                  <p className="text-sm italic text-gray-600">"{order.notes}"</p>
                </div>
              </div>
            )}
          </div>

          {/* List Items */}
          <div className="space-y-3">
            <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <Receipt size={18} /> Ringkasan Pesanan
            </p>
            {order.order_item.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{item.menu.name}</span>
                  <span className="text-xs text-gray-500">
                    {formatCurrency(item.price)} x {item.quantity}
                  </span>
                </div>
                <span className="font-semibold text-gray-700">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-dashed border-gray-300 sm:hidden">
            <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span className="text-orange-600">{formatCurrency(order.total_price)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItemCard;