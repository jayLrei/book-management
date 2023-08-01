import React from "react";

function BookRegistrationForm({ newBook, handleInputChange, handleAddBook }) {
  return (
    <div className="book-regist">
      <input
        type="text"
        name="isbn"
        value={newBook.isbn}
        onChange={handleInputChange}
        placeholder="ISBN"
      />
      <input
        type="text"
        name="name"
        value={newBook.name}
        onChange={handleInputChange}
        placeholder="도서명"
      />
      <input
        type="number"
        name="price"
        value={newBook.price}
        onChange={handleInputChange}
        placeholder="가격"
      />
      <input
        type="number"
        name="stock"
        value={newBook.stock}
        onChange={handleInputChange}
        placeholder="재고"
      />
      <button onClick={handleAddBook}>도서 등록</button>
    </div>
  );
}

export default BookRegistrationForm;
