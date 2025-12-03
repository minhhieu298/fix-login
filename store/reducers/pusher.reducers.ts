import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Pusher Redux State Management
 *
 * Manages:
 * - Connection status
 * - Message history (limited to 100 most recent messages)
 * - Error state
 */

export interface ProcessedPusherMessage {
  requestId: string;
  businessType: string;
  data: {
    RID?: string;
    RId?: string;
    FormId?: string;
    RowId?: string;
    Code?: number;
    Message_VN?: string;
    Message_EN?: string;
    [key: string]: any;
  };
  timestamp: number;
}

export interface PusherState {
  isConnected: boolean;
  messages: ProcessedPusherMessage[];
  error: string | null;
  arrPusher: string[];
}

const initialState: PusherState = {
  isConnected: false,
  messages: [],
  error: null,
  arrPusher: [],
};

const pusherSlice = createSlice({
  name: "PUSHER",
  initialState,
  reducers: {
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    receiveMessage: (state, action: PayloadAction<ProcessedPusherMessage>) => {
      state.messages.unshift(action.payload);

      // Keep only 100 most recent messages
      const MAX_MESSAGES = 100;
      if (state.messages.length > MAX_MESSAGES) {
        state.messages = state.messages.slice(0, MAX_MESSAGES);
      }

      state.error = null;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    addRIDPusher: (state, action: PayloadAction<string>) => {
      state.arrPusher.push(action.payload);
    },

    deleteRIDPusher: (state, action: PayloadAction<string>) => {
      state.arrPusher = state.arrPusher.filter(
        (item) => item !== action.payload
      );
    },

    clearMessages: (state) => {
      state.messages = [];
    },

    clearError: (state) => {
      state.error = null;
    },

    resetPusherState: (state) => {
      state.isConnected = false;
      state.messages = [];
      state.error = null;
    },
  },
});

export const pusherActions = pusherSlice.actions;
export const pusherReducer = pusherSlice.reducer;
