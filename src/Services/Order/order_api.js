const ORDERS_URL = "http://localhost:8080/orders"; // API 서버의 기본 URL

// 주문 목록을 조회하는 API
export const fetchOrders = async () => {
  try {
    const response = await fetch(ORDERS_URL);
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

//주문 저장하는 api
export async function saveOrder(transactionId, orderData) {
  try {
    const response = await fetch(`${ORDERS_URL}/${transactionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      const errorData = await response.json(); // 오류 응답 데이터를 파싱
      console.error("Error response data:", errorData); // 오류 응답 데이터 출력
      throw new Error("Failed to save order.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// 거래처 이름으로 주문 목록을 조회하는 API
export const fetchOrdersByDistributor = async (distributorName) => {
  try {
    const response = await fetch(`${ORDERS_URL}?distributor=${encodeURIComponent(distributorName)}`);
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