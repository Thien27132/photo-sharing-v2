/**
 * fetchModel - Fetch a model from the web server.
 * * @param {string} url - The URL to fetch (e.g., "/user/list")
 * @returns {Promise} - A promise that resolves with an object containing the data.
 */
function fetchModel(url) {
  return new Promise((resolve, reject) => {
    // Sử dụng hàm fetch mặc định của trình duyệt để gọi API
    fetch(url)
      .then((response) => {
        // Kiểm tra nếu response không thành công (Status != 2xx)
        if (!response.ok) {
          // Đọc thông báo lỗi từ server gửi về (nếu có)
          return response.text().then((errorText) => {
            reject({
              status: response.status,
              statusText: response.statusText,
              message: errorText || "Có lỗi xảy ra khi gọi API",
            });
          });
        }
        // Nếu thành công, chuyển đổi body từ JSON sang Javascript Object
        return response.json();
      })
      .then((data) => {
        // Trả về đúng cấu trúc { data: ... } như yêu cầu của Lab
        resolve({ data: data });
      })
      .catch((error) => {
        // Xử lý lỗi kết nối mạng hoặc server không phản hồi
        reject({
          status: 500,
          message: error.message || "Network Error",
        });
      });
  });
}

export default fetchModel;