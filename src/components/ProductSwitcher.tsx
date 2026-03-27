import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export const ProductSwitcher: React.FC = () => {
  const { currentProduct, accessibleProducts, switchProduct, logout } = useAuth();

  if (!currentProduct) return null;

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-100 border-b">
      <div className="text-sm font-medium text-gray-700">
        Current: <span className="font-bold uppercase">{currentProduct.productId}</span> ({currentProduct.role})
      </div>
      <div className="flex space-x-2">
        {accessibleProducts.map((p) => (
          <button
            key={p.productId}
            onClick={() => switchProduct(p.productId)}
            disabled={p.productId === currentProduct.productId || p.status !== 'approved'}
            className={`px-3 py-1 text-xs rounded-full transition duration-200 ${
              p.productId === currentProduct.productId
                ? 'bg-brand-primary text-white'
                : p.status === 'approved'
                ? 'bg-white border border-brand-primary text-brand-primary hover:bg-brand-primary/5'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {p.productId.toUpperCase()} {p.status !== 'approved' && '(Pending)'}
          </button>
        ))}
      </div>
      <div className="flex-grow"></div>
      <button 
        onClick={logout}
        className="text-sm text-red-600 hover:underline"
      >
        Logout
      </button>
    </div>
  );
};
