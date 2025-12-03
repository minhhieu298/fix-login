import { SagaIterator } from "redux-saga";
import { call, takeEvery } from "redux-saga/effects";

import {
  ProcessedPusherMessage,
  pusherActions,
} from "../reducers/pusher.reducers";

/**
 * Pusher Redux Saga
 *
 * Xử lý các message từ Pusher sau khi đã được lưu vào Redux store.
 * Có thể thêm logic business-specific dựa trên businessType (bt) ở đây.
 *
 * Workflow:
 * 1. Message nhận từ WebSocket → usePusher hook
 * 2. usePusher dispatch pusherActions.receiveMessage → Redux store
 * 3. Saga này bắt action receiveMessage và xử lý business logic
 * 4. Có thể dispatch thêm actions khác (margin, asset, order updates, etc.)
 *
 * Use cases:
 * - bt: "Internal|margin" → Update margin data
 * - bt: "Asset.01" → Update asset portfolio
 * - bt: "Order.01" → Update order status
 * - bt: "Balance.01" → Update account balance
 */

/**
 * Xử lý message từ Pusher
 * Hiện tại chỉ log và có thể thêm logic xử lý theo businessType
 */
function* handlePusherMessageSaga(
  action: ReturnType<typeof pusherActions.receiveMessage>
): SagaIterator {
  // Lấy message từ action payload
  const _message: ProcessedPusherMessage = action.payload;

  // Xử lý theo business type nếu cần
  // Messages đã được lưu vào Redux store và broadcast qua EventBus
  // Chỉ cần thêm logic xử lý đặc biệt ở đây nếu cần

  // Example: Xử lý margin updates
  // if (_message.businessType === "Internal|margin") {
  //   yield put({
  //     type: "MARGIN_UPDATE",
  //     payload: _message.data,
  //   });
  // }

  // Example: Xử lý asset updates
  // if (_message.businessType === "Asset.01") {
  //   yield put({
  //     type: "ASSET_UPDATE",
  //     payload: _message.data,
  //   });
  // }

  // Example: Check response status
  // if (_message.data.Code !== 0) {
  //   // Handle error response
  //   const errorMsg = _message.data.Message_VN || _message.data.Message_EN;
  //   yield put(showNotification({ type: "error", message: errorMsg }));
  // }

  // Tạm thời không làm gì - messages đã có trong store và EventBus
  // Khi cần xử lý business logic, uncomment các example trên

  // Empty async operation để satisfy generator requirement
  yield call(() => Promise.resolve());
}

/**
 * Root saga cho Pusher
 * Listen tất cả receiveMessage actions và xử lý
 */
export default function* pusherSaga(): SagaIterator {
  // Bắt mọi receiveMessage action để xử lý
  yield takeEvery(pusherActions.receiveMessage.type, handlePusherMessageSaga);
}
