import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Select } from "antd";
import { saveOrder } from "../Services/Order/order_api.js";
import { fetchBooks } from "../Services/Books/book_api.js";

const { Option } = Select;

function OrderPage() {
  const { transactionId, distributorId } = useParams();
  const [bookId, setBookId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplyRate, setSupplyRate] = useState("");
  const [books, setBooks] = useState([]);

  const fetchBooksData = async () => {
    try {
      const booksData = await fetchBooks();
      setBooks(booksData);
      console.log(booksData);
    } catch (error) {
      console.error("책 목록을 불러오는 도중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchBooksData();
  }, []);

  const handleSaveOrder = async () => {
    try {
      // 데이터 유효성 검사 등 필요한 처리를 수행하고 orderData를 구성합니다.
      const orderData = [{
        bookId,
        quantity: parseInt(quantity),
        supplyRate: parseFloat(supplyRate),
      }];

      console.log(orderData);

      // saveOrder 함수를 사용하여 주문을 서버에 등록합니다.
      const newOrder = await saveOrder(transactionId, orderData);
      console.log("새로 생성된 주문:", newOrder);

      // 등록 후에 필요한 처리를 수행합니다. (예: 상태 업데이트, 리다이렉션 등)
    } catch (error) {
      console.error("주문을 저장하는 도중 오류 발생:", error);
    }
  };

  return (
    <div className="VIEW">
      <h1>주문 페이지</h1>
      <p>거래처 ID: {distributorId}</p>
      <p>거래 ID: {transactionId}</p>

      <Select
        showSearch
        value={bookId}
        onChange={setBookId}
        placeholder="책을 선택하세요"
        style={{ width: "100%", marginBottom: 16 }}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {books.map((book) => (
          <Option key={book.id} value={book.id}>
            {book.name}
          </Option>
        ))}
      </Select>

      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="수량"
        style={{ marginBottom: 16 }}
      />

      <input
        type="number"
        value={supplyRate}
        onChange={(e) => setSupplyRate(e.target.value)}
        placeholder="공급률"
        style={{ marginBottom: 16 }}
      />

      <Button type="primary" onClick={handleSaveOrder}>
        주문 저장
      </Button>
    </div>
  );
}

export default OrderPage;
