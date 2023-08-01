import React, { useState, useEffect } from "react";
import { fetchBooks, addBook, deleteBook, updateBook } from "../Services/Books/book_api";
import { Table, Button, Modal, Form, Input } from "antd";

function Book() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    isbn: "",
    level: "",
    name: "",
    price: "",
    stock: "",
  });

  const [editBookModalVisible, setEditBookModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

   // Handlers for editing book
   const showEditBookModal = () => {
    setEditBookModalVisible(true);
  };

  const handleEditBook = (book) => {
    setNewBook(book);
    showEditBookModal();
  };

  const handleAddBook = async () => {
    try {
      await addBook(newBook);
      const updatedBooks = await fetchBooks();
      setBooks(updatedBooks);
      setNewBook({isbn: "", level : "", name: "", price: "", stock: "" });
      console.log("도서 등록 성공");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEditBook = () => {
    setEditBookModalVisible(false);
    setNewBook({isbn: "", level : "", name: "", price: "", stock: "" });
  };

  const handleSaveEditBook = async () => {
    try {
      // Call the API to update the book
      await updateBook(newBook.id, newBook);
  
      // Refresh the book list
      const updatedBooks = await fetchBooks();
      setBooks(updatedBooks);
  
      // Reset the form and close the modal
      setNewBook({ isbn: "", level : "", name: "", price: "", stock: "" });
      setEditBookModalVisible(false);
  
      console.log("도서 수정 성공");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
  
      // Refresh the book list
      const updatedBooks = await fetchBooks();
      setBooks(updatedBooks);
  
      console.log("도서 삭제 성공");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await fetchBooks();
        setBooks(bookData);
        console.table(bookData);
        console.log("모든 책 조회 성공");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Isbn", dataIndex: "isbn", key: "isbn" },
    { title: "Level", dataIndex: "level", key: "level" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    {
      title: "Actions",
      key: "actions",
      render: (_, book) => (
        <>
          <Button type="primary" onClick={() => handleEditBook(book)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteBook(book.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="VIEW">
        <h1>교재 목록</h1>
        <Input.Search
          placeholder="검색"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Table dataSource={books} columns={columns} rowKey="id"/>
        <Modal
          open={editBookModalVisible}
          title="Edit Book"
          onCancel={handleCancelEditBook}
          onOk={handleSaveEditBook}
        >
          <Form>
            <Form.Item label="Isbn">
              <Input
                value={newBook.isbn}
                onChange={(e) =>
                  setNewBook({ ...newBook, isbn: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Level">
              <Input
                value={newBook.level}
                onChange={(e) =>
                  setNewBook({ ...newBook, level: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Name">
              <Input
                value={newBook.name}
                onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Price">
              <Input
                value={newBook.price}
                onChange={(e) =>
                  setNewBook({ ...newBook, price: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Stock">
              <Input
                value={newBook.stock}
                onChange={(e) =>
                  setNewBook({ ...newBook, stock: e.target.value })
                }
              />
            </Form.Item>
          </Form>
        </Modal>

        <Button type="primary" onClick={() => setEditBookModalVisible(true)}>
          Add Book
        </Button>
      </div>
    </>
  );
}

export default Book;