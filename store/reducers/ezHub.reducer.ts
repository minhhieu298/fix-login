import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Model } from "flexlayout-react";

import { professionalConfigLogout } from "@/constants/dynamic-dashboard/constant";
import { EzHubState } from "@/interface/MyHub/interface";

import { EZHUB_PREFIX } from "../contants";

const initialState: EzHubState = {
  isLoading: false,
  isLoadingLayout: false,
  recentSearches: [],
  dataEzhub: null,
  detailWorkspace: {
    JsonModel: Model.fromJson(professionalConfigLogout).toJson(),
    Links: [
      {
        LinkId: [],
        Key: 1,
        Symbol: "FTS",
      },
      {
        LinkId: [],
        Key: 2,
        Symbol: "FPT",
      },
      {
        LinkId: [],
        Key: 3,
        Symbol: "SSI",
      },
      {
        LinkId: [],
        Key: 4,
        Symbol: "VPS",
      },
      {
        LinkId: [],
        Key: 5,
        Symbol: "TCB",
      },
      {
        LinkId: [],
        Key: 6,
        Symbol: "VIB",
      },
    ],
    Name: "EzHub",
    Thumbnail: 1,
  },
  error: {
    message: "",
  },
  selectedHub: null,
  renderedHubId: null,
  shouldSetDefault: false,
  isWorkspaceSelectedFromSearch: false,
};

// ezhubSlice
const ezhubSlice = createSlice({
  name: EZHUB_PREFIX,
  initialState,
  reducers: {
    setSelectedHub: (state, action) => {
      state.selectedHub = action.payload;
    },
    getWorkspaceAction: (state) => {
      state.isLoading = true;
      state.isLoadingLayout = true;
    },
    getWorkspaceSuccess: (state, action) => {
      state.isLoading = false;
      state.dataEzhub = action.payload;
      state.isLoadingLayout = false;
    },
    getWorkspaceError: (state, action) => {
      state.isLoading = false;
      state.isLoadingLayout = false;
      state.error = action.payload;
    },
    getWorkspaceDetailAction: (state, _action: PayloadAction<number>) => {
      state.isLoading = true;
    },
    getWorkspaceDetailSuccessAction: (state, action) => {
      state.isLoading = false;
      state.detailWorkspace = {
        ...action.payload,
        WorkSpaceID: action.payload.WorkSpaceID,
        JsonModel: JSON.parse(action.payload.JsonModel),
      };
    },
    getWorkspaceDetailErrorAction: (state, action) => {
      state.isLoading = false;
      state.isLoadingLayout = false;
      state.error = action.payload.message;
    },
    updateWorkspaceAction: (state, _action: PayloadAction<any>) => {
      state.isLoading = false;
    },
    updateWorkspaceSuccessAction: (state, action) => {
      state.detailWorkspace = {
        WorkSpaceID:
          action.payload.WorkSpaceID || state.detailWorkspace.WorkSpaceID,
        JsonModel:
          JSON.parse(action.payload.JsonModel) ||
          state.detailWorkspace.JsonModel,
        Links: action.payload.Links || state.detailWorkspace.Links,
        Name: action.payload.Name || state.detailWorkspace.Name,
        Thumbnail: action.payload.Thumbnail || state.detailWorkspace.Thumbnail,
      };
    },
    updateWorkspaceErrorAction: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    setModelAction: (state, action) => {
      state.detailWorkspace = {
        ...state.detailWorkspace,
        JsonModel: action.payload,
      };
    },
    setrenderedHubId: (state, action: PayloadAction<number | null>) => {
      state.renderedHubId = action.payload;
      state.isLoadingLayout = false;
    },
    setWorkspaceSelectedFromSearch: (state, action: PayloadAction<boolean>) => {
      state.isWorkspaceSelectedFromSearch = action.payload;
    },

    addEzhubAction: (state, _action: PayloadAction<any>) => {
      state.isLoading = true;
    },
    addEzhubSuccess: (state, action) => {
      state.isLoading = false;
      if (!state.dataEzhub || state.dataEzhub.List.length === 0) {
        state.dataEzhub = {
          ...state?.dataEzhub,
          List: [
            {
              Name: action.payload.Name,
              Thumbnail: action.payload.Thumbnail,
              WorkSpaceID: action.payload.WorkSpaceID,
            },
          ],
        };
        state.detailWorkspace = {
          ...action.payload,
          WorkSpaceID: action.payload.WorkSpaceID,
          JsonModel: JSON.parse(action.payload.JsonModel),
        };
        state.renderedHubId = action.payload.WorkSpaceID;

        // Set flag để saga có thể xử lý setDefaultEzhub
        state.shouldSetDefault = true;
      } else {
        state.detailWorkspace = {
          ...action.payload,
          WorkSpaceID: action.payload.WorkSpaceID,
          JsonModel: JSON.parse(action.payload.JsonModel),
        };
        state.renderedHubId = action.payload.WorkSpaceID;
        if (state.dataEzhub) {
          state.dataEzhub = {
            ...state.dataEzhub,
            List: [
              ...state.dataEzhub.List,
              {
                Name: action.payload.Name,
                Thumbnail: action.payload.Thumbnail,
                WorkSpaceID: action.payload.WorkSpaceID,
              },
            ],
          };
        }
      }
    },
    addEzhubError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSymbolAction: (state, action) => {
      state.detailWorkspace.Links[action.payload.key - 1].Symbol =
        action.payload.Symbol;
    },

    removeHub: (state, _action) => {
      state.isLoading = true;
    },
    deleteEzhubSuccess: (state, action) => {
      if (state.dataEzhub && Array.isArray(state.dataEzhub.List)) {
        state.dataEzhub.List = state.dataEzhub.List.filter(
          (hub) => hub.WorkSpaceID !== action.payload
        );
      }
      state.isLoading = false;
    },

    setDefaultEzhub: (state, _action) => {
      state.isLoading = true;
    },
    setDefaultEzhubStateSuccess: (state, action) => {
      if (state.dataEzhub) {
        state.dataEzhub = {
          ...state.dataEzhub,
          Default: action.payload,
        };
      }
      state.isLoading = false;
    },
    setDefaultEzhubStateError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetShouldSetDefault: (state) => {
      state.shouldSetDefault = false;
    },
    deleteEzhubError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setHubs: (state, action) => {
      if (state.dataEzhub && Array.isArray(state.dataEzhub.List)) {
        state.dataEzhub.List = action.payload;
      }
    },
    renameHub: (state, _action) => {
      state.isLoading = true;
    },
    renameEzhubSuccess: (state, _action) => {
      state.isLoading = false;
    },
    renameEzhubError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    duplicateHub: (state, _action) => {
      state.isLoading = true;
    },
    duplicateEzhubSuccess: (state, action) => {
      if (state.dataEzhub) {
        state.selectedHub = {
          Name: action.payload.Name,
          Thumbnail: action.payload.Thumbnail,
          WorkSpaceID: action.payload.WorkSpaceID,
        };
        state.dataEzhub = {
          ...state.dataEzhub,
          List: [
            ...state.dataEzhub.List,
            {
              Name: action.payload.Name,
              Thumbnail: action.payload.Thumbnail,
              WorkSpaceID: action.payload.WorkSpaceID,
            },
          ],
        };
      }
      state.isLoading = false;
    },
    duplicateEzhubError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getDetailDefaultEzhub: (state, _action) => {
      state.isLoading = true;
    },
    getDetailDefaultEzhubSuccess: (state, action) => {
      state.isLoading = false;
      state.detailWorkspace = {
        ...action.payload,
        JsonModel: JSON.parse(action.payload.JsonModel),
      };
    },
    getDetailDefaultEzhubError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setRecentSearches: (state, action) => {
      state.recentSearches = action.payload;
    },
  },
});

export const ezhubActions = ezhubSlice.actions;

export const ezhubReducer = ezhubSlice.reducer;
