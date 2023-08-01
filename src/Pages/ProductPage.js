import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBooks } from "../Services/Books/book_api";
import { fetchDistributors } from "../Services/Distributors/distributors_api";
import { Table, Button, Input } from "antd";

function Product() {
  const [books, setBooks] = useState([]);
  const [distributors, setDistributors] = useState([]); // 물류업체 
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDistributors, setFilteredDistributors] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await fetchBooks();
        setBooks(bookData);
        console.log("Book 목록:", bookData);

        const distributorData = await fetchDistributors(); // Distributor 목록 가져오기
        setDistributors(distributorData);
        console.log("Distributor 목록:", distributorData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter distributors based on search query
    const filtered =
      searchQuery === ""
        ? distributors // Show all distributors when no search query
        : distributors.filter((distributor) =>
            distributor.name.includes(searchQuery)
          );
    setFilteredDistributors(filtered);
  }, [searchQuery, distributors]);
  
  // Function to handle distributor search
  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const columns = [
    {
      title: "거래처명",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Link to={`/product/${record.id}`}>
            <Button type="primary">거래</Button>
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="VIEW">
        <h1>출고 등록</h1>
        <Input.Search
          placeholder="거래처명 검색"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 200, marginBottom: 16 }}
        />
        <Table
          dataSource={filteredDistributors.map((distributor) => ({
            ...distributor,
            key: distributor.id,
          }))}
          columns={columns}
        />      </div>
    </>
  );
}

export default Product;