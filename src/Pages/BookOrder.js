import React, { useEffect, useState } from 'react';
import { fetchBooks,fetchBookOrders, saveBookOrder } from "../Services/Books/book_api";
import { Select, Input, Table, Button, Space } from 'antd';

const { Option } = Select;

function BookOrder() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [orderList, setOrderList] = useState([]); // 책 발주 내역을 저장할 상태 추가
  const [orderData, setOrderData] = useState({
    backupCd: "",
    cd: "",
    commentaryCover: "",
    commentaryInterior: "",
    mainCover: "",
    mainInterior: "",
    printing: "",
    qr: "",
    quantity: 0,
  });

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const bookData = await fetchBooks();
        setBooks(bookData);
        console.log(bookData);
      } catch (error) {
        console.error('책 목록을 불러오는 도중 오류 발생:', error);
      }
    };

    const fetchOrders = async () => {
        try {
          const orders = await fetchBookOrders(); // API 호출로 책 발주 내역 데이터를 가져옴
          setOrderList(orders);
          // console.log(orderList);
          // console.log(orderList[1].book.name)
        } catch (error) {
          console.error('책 발주 내역을 불러오는 도중 오류 발생:', error);
        }
      };

    fetchBooksData();
    fetchOrders();
  }, []);

  const handleBookSelect = (value) => {
    setSelectedBook(value);
  };

  const handleOrderDataChange = (field, value) => {
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [field]: value,
    }));
  };

  const handleSaveOrder = async () => {
    if (!selectedBook || orderData.quantity <= 0) {
      console.error('올바르지 않은 입력값입니다.');
      return;
    }

    const formattedOrderData = {
      ...orderData,
      quantity: Number(orderData.quantity),
    };

    try {
      const savedOrderData = await saveBookOrder(selectedBook, formattedOrderData);
      console.log('저장된 책 발주 내역 데이터:', savedOrderData);
    } catch (error) {
      console.error('책 발주 내역 저장 중 오류 발생:', error);
    }
  };
  
  const columns = [
    {
      title: '책 제목', 
      dataIndex: 'id', 
      key: 'id', 
      render: (text, record) => record.book.name, 
    },
    {
      title: '백업 CD',
      dataIndex: 'backupCd',
      key: 'backupCd',
    },
    {
      title: 'CD',
      dataIndex: 'cd',
      key: 'cd',
    },
    {
      title: '코멘터리 커버',
      dataIndex: 'commentaryCover',
      key: 'commentaryCover',
    },
    {
        title: '코멘터리 인테리어',
        dataIndex: 'commentaryInterior',
        key: 'commentaryInterior',
      },
      {
        title: '메인 커버',
        dataIndex: 'mainCover',
        key: 'mainCover',
      },
      {
        title: '메인 인테리어',
        dataIndex: 'mainInterior',
        key: 'mainInterior',
      },
      {
        title: '프린팅',
        dataIndex: 'printing',
        key: 'printing',
      },
      {
        title: 'qr',
        dataIndex: 'qr',
        key: 'qr',
      },
    {
      title: '발주 수량',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ];

  return (
    <div className="VIEW">
      <h1>발주관리</h1>
      <Select style={{ width: 200 , marginBottom : '16px' }} onChange={handleBookSelect}>
        {books.map((book) => (
          <Option key={book.id} value={book.id}>
            {book.title}
          </Option>
        ))}
      </Select>
      <Input
        placeholder="백업 CD"
        value={orderData.backupCd}
        onChange={(e) => handleOrderDataChange('backupCd', e.target.value)}
        style={{marginBottom : '16px'}}
      />
      <Input
        placeholder="CD"
        value={orderData.cd}
        onChange={(e) => handleOrderDataChange('cd', e.target.value)}
        style={{marginBottom : '16px'}}
      />
      <Input
        placeholder="코멘터리 커버"
        value={orderData.commentaryCover}
        onChange={(e) => handleOrderDataChange('commentaryCover', e.target.value)}
        style={{marginBottom : '16px'}}
      />
      <Input
        placeholder="코멘터리 인테리어"
        value={orderData.commentaryInterior}
        onChange={(e) => handleOrderDataChange('commentaryInterior', e.target.value)}
        style={{marginBottom : '16px'}}
      />
      <Input
        placeholder="메인 커버"
        value={orderData.mainCover}
        onChange={(e) => handleOrderDataChange('mainCover', e.target.value)}
        style={{marginBottom : '16px'}}
      />
      <Input
        placeholder="메인 인테리어"
        value={orderData.mainInterior}
        onChange={(e) => handleOrderDataChange('mainInterior', e.target.value)}
        style={{marginBottom : '16px'}}
      />
      <Input
        placeholder="프린팅"
        value={orderData.printing}
        onChange={(e) => handleOrderDataChange('printing', e.target.value)}
        style={{marginBottom : '16px'}}
      />                         
      <Input
        type="number"
        placeholder="발주 수량"
        min={1}
        value={orderData.quantity}
        onChange={(e) => handleOrderDataChange('quantity', e.target.value)}
        style={{marginBottom : '16px'}}
      />
      <Space>
        <Button type="primary" onClick={handleSaveOrder} style={{marginRight : '16px'}}>저장</Button>
        <Button>취소</Button>
      </Space>

      {/* 테이블로 책 발주 내역을 표시합니다. */}
      <Table dataSource={orderList} columns={columns} style={{marginTop : '16px'}}/>
    </div>
  );
}

export default BookOrder;
