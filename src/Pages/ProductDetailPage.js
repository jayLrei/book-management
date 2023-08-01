import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTransactionsByDistributorId, fetchDistributorNameById, saveTransaction } from "../Services/Transaction/transaction_api.js";
import { Table,Button, DatePicker, Input, Select } from "antd";
import { fetchOrders, saveOrder } from "../Services/Order/order_api.js";
import { fetchBooks } from "../Services/Books/book_api.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const { Option } = Select;

function ProductDetailPage() {
  const { distributorId, transactionId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [createDateTime, setCreateDateTime] = useState(null);
  const [money, setMoney] = useState(0);
  const [transactionNotes, setTransactionNotes] = useState("");
  const [transactionType, setTransactionType] = useState("release");
  const [distributorName, setDistributorName] = useState("");
  const [orders, setOrders] = useState([]);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [newTransactionId, setNewTransactionId] = useState(null);


  const fetchBooksData = async () => {
    try {
      const booksData = await fetchBooks();
      setBooks(booksData);
      console.log(booksData);
    } catch (error) {
      console.error("Error while fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooksData();
  }, []);
  
  useEffect(() => {
    // API를 호출하여 해당 distributorId의 거래 목록을 가져옴
    const fetchTransactions = async () => {
      try {
        const data = await fetchTransactionsByDistributorId(distributorId);
        setTransactions(data);
        console.log(data);

        // 거래처 이름 가져오기
        const name = await fetchDistributorNameById(distributorId);
        // console.log(name);
        setDistributorName(name);
      } catch (error) {
        console.error("Error while fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [distributorId]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);
        console.log(ordersData);
        console.log("order complete :", ordersData);
      } catch (error) {
        console.error("Error while fetching orders:", error);
      }
    };

    fetchOrdersData();
  }, [distributorId]);

  // Function to handle saving the transaction

  const handleSaveTransaction = async () => {
    const transactionData = {
      createDateTime: createDateTime ? createDateTime.toISOString() : null,
      money,
      transactionNotes,
      transactionType,
    };
  
    try {
      // Save the transaction and get the newly created transaction's ID
      const newTransaction = await saveTransaction(distributorId, transactionData);
      const createdTransactionId = newTransaction.id;
      setNewTransactionId(createdTransactionId);
  
      // Refresh the transactions list
      const updatedTransactions = await fetchTransactionsByDistributorId(distributorId);
      setTransactions(updatedTransactions);
  
      // Clear the input fields
      setCreateDateTime(null);
      setMoney(0);
      setTransactionNotes("");
      setTransactionType("release");
  
      // Redirect to the new transaction's URL
      navigate(`/product/${distributorId}/${createdTransactionId}`);
    } catch (error) {
      console.error("Error while saving transaction:", error);
    }
  };

  return (
    <div className="VIEW">
      <h1>거래처 상세 정보</h1>
      <p>거래처 ID: {distributorId}</p>

      {/* Input fields for creating a new transaction */}
      <DatePicker
        value={createDateTime}
        onChange={setCreateDateTime}
        showTime
        style={{ marginBottom: 16 }}
      />
      <Input
        type="number"
        value={money}
        onChange={(e) => setMoney(e.target.value)}
        placeholder="거래 금액"
        style={{ marginBottom: 16 }}
      />
      <Input
        value={transactionNotes}
        onChange={(e) => setTransactionNotes(e.target.value)}
        placeholder="메모"
        style={{ marginBottom: 16 }}
      />
      <Select
        value={transactionType}
        onChange={setTransactionType}
        style={{ width: 200, marginBottom: 16 }}
      >
        <Option value="release">출고</Option>
        <Option value="deposit">입금</Option>
        <Option value="return">반품</Option>
      </Select>

      
        <Link to={`/product/${distributorId}/${newTransactionId}`}>
          <Button type="primary" onClick={handleSaveTransaction}>
            거래 등록
          </Button>
        </Link>
      

      {/* transactions 배열을 사용하여 거래 목록을 표시하는 코드 추가 */}
      <h2>거래 목록</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.createDateTime} - {transaction.money}원 - {transaction.transactionNotes} - {transaction.transactionType}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductDetailPage;
