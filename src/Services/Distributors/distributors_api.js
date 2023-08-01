const DISTRIBUTOR_URL = 'http://localhost:8080/distributors';

// '/distributors'로 api GET(조회) 요청하기
export const fetchDistributors = async () => {
  try {
    const response = await fetch(`${DISTRIBUTOR_URL}`);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw new Error('API 요청에 실패했습니다.');
  }
};

// 거래처 ID에 해당하는 거래처 정보를 조회하는 API
export const fetchDistributorById = async (distributorId) => {
  try {
    const response = await fetch(`${DISTRIBUTOR_URL}/distributor/${distributorId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // API에서 받아온 거래처 정보 반환
  } catch (error) {
    console.error("Error while fetching distributor by ID:", error);
    return null;
  }
};