import React, { useState, useEffect } from 'react';
import { FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';

const BulkWithdrawal = ({ data, renderFunc, approveOrRejectWithdrawal }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [charges, setCharges] = useState('');
  const [loading, setLoading] = useState(false);

  // Filter users based on wallet address
  useEffect(() => {
    if (walletAddress.trim() === '') {
      setFilteredUsers([]);
      setTotalAmount(0);
      return;
    }

    const filtered = data.filter(item => 
      item.merchant && item.merchant.toLowerCase() === walletAddress.toLowerCase() && 
      item.status.toLowerCase() === 'pending'
    );
    
    setFilteredUsers(filtered);
    
    // Calculate total amount
    const total = filtered.reduce((sum, item) => sum + parseFloat(item.final_amount || 0), 0);
    setTotalAmount(total);
  }, [walletAddress, data]);

  const handleBulkApprove = async () => {
    if (filteredUsers.length === 0) {
      toast.error('No withdrawals to approve');
      return;
    }

    if (!charges || isNaN(charges) || parseFloat(charges) < 0) {
      toast.error('Please enter valid charges');
      return;
    }

    setLoading(true);
    
    try {
      const txnIds = filteredUsers.map(user => user.txn_id);
      
      // Replace with your actual API call when available
      const data = {
        txn_ids: txnIds,
        status: 'approved',
        charges: +charges
      };
      
      if (approveOrRejectWithdrawal) {
        await approveOrRejectWithdrawal(data);
        toast.success('Bulk Withdrawal Approved Successfully');
        renderFunc(prev => !prev);
        setWalletAddress('');
      } else {
        console.log('Bulk approval data:', data);
        toast.success('Bulk Withdrawal would be approved (API call placeholder)');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something Went Wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 mb-8 border border-gray-200 rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Bulk Withdrawal</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-grow">
          <label htmlFor="walletAddress" className="block mb-1 text-sm font-medium text-subTextColor">
            Wallet Address
          </label>
          <input
            type="text"
            id="walletAddress"
            className="bg-gray-50 border w-full border-gray-300 text-textColor text-md ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none rounded-md block p-2"
            placeholder="Enter wallet address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-1/4">
          <label htmlFor="charges" className="block mb-1 text-sm font-medium text-subTextColor">
            Charges (%)
          </label>
          <input
            type="number"
            id="charges"
            className="bg-gray-50 border w-full border-gray-300 text-textColor text-md ring-gray-300 focus:ring-2 focus:ring-primaryColor outline-none rounded-md block p-2"
            placeholder="Enter charges percentage"
            value={charges}
            onChange={(e) => setCharges(e.target.value)}
          />
        </div>
        
        <div className="self-end">
          <button
            className="bg-primaryColor text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleBulkApprove}
            disabled={loading || filteredUsers.length === 0}
          >
            {loading ? (
              <FiLoader className="animate-spin ease-in" />
            ) : (
              `Approve All (${filteredUsers.length})`
            )}
          </button>
        </div>
      </div>
      
      {filteredUsers.length > 0 && (
        <div>
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">Users with this wallet address: {filteredUsers.length}</h3>
            <h3 className="font-bold">Total Amount: ${totalAmount.toFixed(2)}</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3">TXN ID</th>
                  <th scope="col" className="px-4 py-3">User ID</th>
                  <th scope="col" className="px-4 py-3">Amount</th>
                  <th scope="col" className="px-4 py-3">Crypto Type</th>
                  <th scope="col" className="px-4 py-3">Final Amount</th>
                  <th scope="col" className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.txn_id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{user.txn_id}</td>
                    <td className="px-4 py-2">{user.user_id}</td>
                    <td className="px-4 py-2">${parseFloat(user.amount).toFixed(2)}</td>
                    <td className="px-4 py-2">{user.crypto_type}</td>
                    <td className="px-4 py-2">${parseFloat(user.final_amount).toFixed(2)}</td>
                    <td className="px-4 py-2">{new Date(user.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkWithdrawal;