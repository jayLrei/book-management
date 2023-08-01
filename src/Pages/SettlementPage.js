import React, { useEffect, useState } from 'react';
import { fetchDistributors } from "../Services/Distributors/distributors_api";
import { fetchTransactionsByDistributorId } from "../Services/Transaction/transaction_api";
import { Select, Table } from 'antd';

const { Option } = Select;

function Settlement() {
  const [distributors, setDistributors] = useState([]);
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchDistributorsData = async () => {
      try {
        const data = await fetchDistributors();
        setDistributors(data);
      } catch (error) {
        console.error('거래처 목록을 불러오는 도중 오류 발생:', error);
      }
    };

    fetchDistributorsData();
  }, []);

  const handleDistributorChange = async (value) => {
    setSelectedDistributor(value);
    const selectedDistributorId = distributors.find((distributor) => distributor.name === value)?.id;
    console.log('Selected Distributor ID:', selectedDistributorId);

    // 선택한 거래처의 ID를 기반으로 거래 목록을 가져와서 transactions 상태로 설정
    try {
      const data = await fetchTransactionsByDistributorId(selectedDistributorId);
      setTransactions(data);
      console.log('거래 목록을 성공적으로 불러왔습니다!');
      console.log('Selected Distributor Transactions:', data); // 거래 목록을 콘솔에 출력
    } catch (error) {
      console.error('거래 목록을 불러오는 도중 오류 발생:', error);
      setTransactions([]); // 오류 발생 시 transactions 상태를 빈 배열로 설정
    }
  };


    const calculateTotalAmountForDistributor = (distributorId, startDate, endDate) => {
        const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.createDateTime);
        return (
            transaction.distributor.id === distributorId &&
            transactionDate >= startDate &&
            transactionDate <= endDate
        );
        });
    
        const totalAmount = filteredTransactions.reduce((acc, transaction) => {
        return acc + transaction.money;
        }, 0);
    
        return totalAmount;
    };

    useEffect(() => {
    if (selectedDistributor && startDate && endDate) {
        const distributorId = distributors.find((distributor) => distributor.name === selectedDistributor)?.id;
        const totalAmount = calculateTotalAmountForDistributor(distributorId, startDate, endDate);
        console.log('Total Amount:', totalAmount);
    }
    }, [selectedDistributor, startDate, endDate, transactions]);

  const transactionColumns = [
    {
        title: 'Transaction ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '거래 일시',
        dataIndex: 'createDateTime',
        key: 'createDateTime',
      },
      {
        title: '거래 내용',
        dataIndex: 'transactionNotes',
        key: 'transactionNotes',
      },
      {
        title: '거래 금액',
        dataIndex: 'money',
        key: 'money',
      },
  ];

  return (
    <div className='VIEW'>
      <h1>정산 페이지</h1>
      <h2>거래처 선택</h2>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="거래처를 선택하세요"
        optionFilterProp="children"
        onChange={handleDistributorChange}
        value={selectedDistributor}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {distributors.map((distributor) => (
          <Option key={distributor.id} value={distributor.name}>
            {distributor.name}
          </Option>
        ))}
      </Select>
      <h2>거래 목록</h2>
      {/* Table 컴포넌트로 거래 목록을 표시 */}
      <Table dataSource={transactions} columns={transactionColumns} rowKey="id" />
    </div>
  );
}

export default Settlement;
