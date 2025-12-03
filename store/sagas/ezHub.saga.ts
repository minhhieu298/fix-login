import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import { ILogin, IResponseLogin } from "@/interface/interface";
import {
  Hub,
  IResponseAddEzhub,
  IResponseEzhub,
  UpdateWorkspacePayload,
} from "@/interface/MyHub/interface";
import {
  addEzhub,
  deleteEzhub,
  duplicateEzhub,
  getDetailWorkspaceApi,
  getWorkspace,
  renameEzhub,
  setDefaultEzhub,
  updateWorkspaceApi,
} from "@/services/ezhub";
import { goTo } from "@/services/navigationService";
import { ezhubActions } from "@/store/reducers/ezHub.reducer";
import { AuthAction } from "@/store/reducers/Login/login.reducer";

import { EZHUB_PREFIX } from "../contants";

export function* handleAuthRedirectSaga() {
  yield put(AuthAction.setUserInfo({} as ILogin));
  yield put(AuthAction.setUserInfo2FA({} as IResponseLogin));
  yield call(goTo, "?href=login");
  yield put(AuthAction.showForm(true));
}

function* getWorkspaceSaga(): Generator {
  try {
    const data: IResponseEzhub = yield call(getWorkspace);
    if (data.Code === 0) {
      yield put(ezhubActions.getWorkspaceSuccess(data.Data));
      const renderedHubId: number | null = yield select(
        (state: { ezhubReducer: { renderedHubId: number | null } }) =>
          state.ezhubReducer.renderedHubId
      );
      if (data.Data && !renderedHubId) {
        if (data.Data.Default) {
          const defaultEzhub = yield call(
            getDetailWorkspaceApi,
            data.Data.Default
          );
          if (defaultEzhub.Code === 0) {
            yield put(ezhubActions.setrenderedHubId(data.Data.Default));
            yield put(
              ezhubActions.getDetailDefaultEzhubSuccess(defaultEzhub.Data)
            );
          } else {
            yield put(
              ezhubActions.getDetailDefaultEzhubError(defaultEzhub.Message)
            );
          }
        } else if (data.Data.List.length > 0) {
          const response = yield call(
            getDetailWorkspaceApi,
            data.Data.List[0].WorkSpaceID
          );
          if (response.Code === 0) {
            yield put(
              ezhubActions.setrenderedHubId(data.Data.List[0].WorkSpaceID)
            );
            yield put(
              ezhubActions.getWorkspaceDetailSuccessAction(response.Data)
            );
          } else {
            yield put(
              ezhubActions.getWorkspaceDetailErrorAction(response.Message)
            );
          }
        }
      }
    } else {
      if (data.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
      yield put(ezhubActions.getWorkspaceError(data.Message));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(ezhubActions.getWorkspaceError(error.message));
    }
  }
}

function* addEzhubSaga(
  action: PayloadAction<UpdateWorkspacePayload>
): Generator {
  try {
    const data: IResponseAddEzhub = yield call(addEzhub, action.payload);
    if (data.Code === 0) {
      yield put(
        ezhubActions.addEzhubSuccess({
          ...action.payload,
          WorkSpaceID: data.Data?.WorkSpaceID,
        })
      );
      yield put(ezhubActions.setrenderedHubId(data.Data?.WorkSpaceID || null));
    } else {
      if (data.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
      yield put(ezhubActions.addEzhubError(data.Message));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(ezhubActions.addEzhubError(error.message));
    }
  }
}

function* duplicateEzhubSaga(action: PayloadAction<Hub>): Generator {
  try {
    const data: IResponseAddEzhub = yield call(
      duplicateEzhub,
      action.payload.WorkSpaceID
    );
    if (data.Code === 0) {
      yield put(
        ezhubActions.duplicateEzhubSuccess({
          WorkSpaceID: data.Data?.WorkSpaceID,
          Name: action.payload.Name,
          Thumbnail: action.payload.Thumbnail,
        })
      );
    } else {
      if (data.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
      yield put(ezhubActions.duplicateEzhubError(data.Message));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(ezhubActions.duplicateEzhubError(error.message));
    }
  }
}

function* deleteEzhubSaga(action: PayloadAction<string>): Generator {
  try {
    // Kiểm tra trước khi xóa xem hub có phải là default không
    const state: any = yield select((state) => state.ezhubReducer);
    const deletedHubId = parseInt(action.payload);
    const isDefaultHub = state.dataEzhub?.Default === deletedHubId;
    const remainingHubs =
      state.dataEzhub?.List?.filter(
        (hub: any) => hub.WorkSpaceID !== deletedHubId
      ) || [];

    const data: IResponseEzhub = yield call(deleteEzhub, action.payload);
    if (data.Code === 0) {
      yield put(ezhubActions.deleteEzhubSuccess(action.payload));

      // Nếu hub bị xóa là default và còn hub khác, chuyển default sang hub đầu tiên
      if (isDefaultHub && remainingHubs.length > 0) {
        const firstHub = remainingHubs[0];
        if (firstHub) {
          yield put(ezhubActions.setDefaultEzhub(firstHub.WorkSpaceID));
        }
      }
    } else {
      if (data.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
      yield put(ezhubActions.deleteEzhubError(data.Message));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(ezhubActions.deleteEzhubError(error.message));
    }
  }
}

function* setDefaultEzhubStateSaga(action: PayloadAction<string>): Generator {
  try {
    const data: IResponseEzhub = yield call(setDefaultEzhub, action.payload);
    if (data.Code === 0) {
      yield put(ezhubActions.setDefaultEzhubStateSuccess(action.payload));
    } else {
      if (data.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
      yield put(ezhubActions.setDefaultEzhubStateError(data.Message));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(ezhubActions.setDefaultEzhubStateError(error.message));
    }
  }
}

function* renameEzhubSaga(
  action: PayloadAction<{ id: string; newName: string }>
): Generator {
  try {
    const data: IResponseEzhub = yield call(
      renameEzhub,
      action.payload.id,
      action.payload.newName
    );
    if (data.Code === 0) {
      yield put(ezhubActions.renameEzhubSuccess(action.payload));
    } else {
      if (data.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
      yield put(ezhubActions.renameEzhubError(data.Message));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(ezhubActions.renameEzhubError(error.message));
    }
  }
}

function* getWorkspaceDetailSaga(action: any): SagaIterator {
  try {
    const response: any = yield call(getDetailWorkspaceApi, action.payload);
    if (response.Code === 0) {
      yield put(ezhubActions.getWorkspaceDetailSuccessAction(response.Data));
    } else {
      if (response.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(ezhubActions.getWorkspaceDetailErrorAction(error));
    }
  }
}

function* updateWorkspaceSaga(action: any): SagaIterator {
  try {
    const response: any = yield call(updateWorkspaceApi, action.payload);
    if (response.Code === 0) {
      yield put(ezhubActions.updateWorkspaceSuccessAction(action.payload));
    } else {
      if (response.Code === -123456) {
        yield call(handleAuthRedirectSaga);
        return;
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(ezhubActions.updateWorkspaceErrorAction(error));
    }
  }
}

// Saga để handle việc set default ezhub sau khi add thành công
export function* handleSetDefaultAfterAddSaga(): SagaIterator {
  try {
    const state: any = yield select((state) => state.ezhubReducer);

    if (state.shouldSetDefault && state.renderedHubId) {
      // Dispatch action setDefaultEzhub với WorkSpaceID hiện tại
      yield put(ezhubActions.setDefaultEzhub(state.renderedHubId));
      // Reset flag
      yield put(ezhubActions.resetShouldSetDefault());
    }
  } catch {
    // Handle error silently
  }
}

export default function* ezhubSaga() {
  yield takeLatest(`${EZHUB_PREFIX}/getWorkspaceAction`, getWorkspaceSaga);
  yield takeLatest(`${EZHUB_PREFIX}/addEzhubAction`, addEzhubSaga);
  yield takeLatest(`${EZHUB_PREFIX}/removeHub`, deleteEzhubSaga);
  yield takeLatest(`${EZHUB_PREFIX}/renameHub`, renameEzhubSaga);
  yield takeLatest(`${EZHUB_PREFIX}/duplicateHub`, duplicateEzhubSaga);
  yield takeLatest(`${EZHUB_PREFIX}/setDefaultEzhub`, setDefaultEzhubStateSaga);
  yield takeLatest(
    `${EZHUB_PREFIX}/getWorkspaceDetailAction`,
    getWorkspaceDetailSaga
  );
  yield takeLatest(
    `${EZHUB_PREFIX}/updateWorkspaceAction`,
    updateWorkspaceSaga
  );
  // Watch for addEzhubSuccess để check shouldSetDefault flag
  yield takeEvery(
    `${EZHUB_PREFIX}/addEzhubSuccess`,
    handleSetDefaultAfterAddSaga
  );
}
