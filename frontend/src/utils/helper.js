export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const getStatusColor = (status) => {
  const colors = {
    'pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'process': 'bg-blue-100 text-blue-800 border-blue-300',
    'completed': 'bg-green-100 text-green-800 border-green-300'
  };
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};