const BOOK_URL = 'http://localhost:8080/books';

// '/books'로 api GET(조회) 요청하기
export const fetchBooks = async () => {
  try {
    const response = await fetch(`${BOOK_URL}`);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw new Error('API 요청에 실패했습니다.');
  }
};

// '/books/book'로 api POST(저장) 요청하기
export const addBook = async (book) => {
  try {
    const response = await fetch(`${BOOK_URL}/book`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      throw new Error("도서 등록에 실패했습니다.");
    }
  } catch (error) {
    throw new Error("API 요청에 실패했습니다....");
  }
};

// '/books/{id}'로 api PUT(수정) 요청하기
export const updateBook = async (id, book) => {
  try {
    const response = await fetch(`${BOOK_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      throw new Error("도서 수정에 실패했습니다.");
    }
  } catch (error) {
    throw new Error("API 요청에 실패했습니다.");
  }
};

// '/books/{id}'로 api delete(삭제) 요청하기
export const deleteBook = async (id) => {
  try {
    const response = await fetch(`${BOOK_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("도서 삭제에 실패했습니다.");
    }
  } catch (error) {
    throw new Error("API 요청에 실패했습니다.");
  }
};

// 책 발주내역 저장 API
export const saveBookOrder = async (bookId, orderData) => {
  try {
    const response = await fetch(`${BOOK_URL}/order/${bookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // API에서 받아온 저장된 책 발주내역 데이터 반환
  } catch (error) {
    console.error("Error while saving book order:", error);
    return null;
  }
};

export const fetchBookOrders = async () => {
  try {
    const response = await fetch(`${BOOK_URL}/order`); // Make an API call to retrieve book orders
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // Return the book order data received from the API
  } catch (error) {
    console.error("Error while fetching book orders:", error);
    return []; // Return an empty array if there's an error or no data
  }
};