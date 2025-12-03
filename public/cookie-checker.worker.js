// Web Worker để kiểm tra cookie thay đổi
let savedCookie = ""; // Biến tạm lưu cookie

// Lắng nghe message từ main thread
self.addEventListener("message", (event) => {
  const { type, cookie } = event.data;

  if (type === "INIT") {
    // Khởi tạo: lưu cookie ban đầu (có thể rỗng)
    savedCookie = cookie || "";
    self.postMessage({ type: "INIT_SUCCESS", savedCookie });
  } else if (type === "CHECK_COOKIE") {
    // Kiểm tra cookie hiện tại với cookie đã lưu
    const currentCookie = cookie || "";

    // Nếu cookie khác nhau và cả hai đều không rỗng
    if (
      savedCookie !== "" &&
      currentCookie !== "" &&
      savedCookie !== currentCookie
    ) {
      // Cookie đã thay đổi, yêu cầu reload
      self.postMessage({
        type: "COOKIE_CHANGED",
        oldCookie: savedCookie,
        newCookie: currentCookie,
      });
      // Cập nhật cookie mới
      savedCookie = currentCookie;
    } else if (savedCookie === "" && currentCookie !== "") {
      // Lần đầu tiên có cookie (sau khi login), lưu vào biến tạm
      savedCookie = currentCookie;
      self.postMessage({ type: "COOKIE_SAVED", cookie: currentCookie });
    }
  } else if (type === "UPDATE_COOKIE") {
    // Cập nhật cookie thủ công (sau khi login)
    savedCookie = cookie || "";
    self.postMessage({ type: "COOKIE_UPDATED", cookie: savedCookie });
  }
});
