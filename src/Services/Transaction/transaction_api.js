const TRANSACTIONS_URL = "http://localhost:8080/transactions"; // API 서버의 기본 URL

// 거래 목록을 조회하는 API
export const fetchTransactionsByDistributorId = async (distributorId) => {
  try {
    const response = await fetch(`${TRANSACTIONS_URL}/${distributorId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching transactions:", error);
    return [];
  }
};

// 거래처 이름을 조회하는 API
export const fetchDistributorNameById = async (distributorId) => {
    try {
    const response = await fetch(`${TRANSACTIONS_URL}/${distributorId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.name; // API에서 받아온 거래처 이름 반환
    } catch (error) {
      console.error("Error while fetching distributor name:", error);
      return "";
    }
  };

// 거래를 저장하는 API
export const saveTransaction = async (distributorId, transactionData) => {
    try {
      const response = await fetch(`${TRANSACTIONS_URL}/${distributorId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data; // API에서 받아온 저장된 거래 데이터 반환
    } catch (error) {
      console.error("Error while saving transaction:", error);
      return null;
    }
  };

//거래처별 매출
  export const fetchRevenueTransactions = async () => {
    try {
      const response = await fetch(`${TRANSACTIONS_URL}/revenue`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data; // Return the revenue transactions data
    } catch (error) {
      console.error("Error while fetching revenue transactions:", error);
      return [];
    }
  };

  
// 거래에 해당하는 주문 목록을 조회하는 API
export const fetchOrdersByTransaction = async (transactionId) => {
  try {
    const response = await fetch(`${TRANSACTIONS_URL}/transaction/${transactionId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // API에서 받아온 주문 목록 반환
  } catch (error) {
    console.error("Error while fetching orders:", error);
    return [];
  }
};