import {
  IDataEzhub,
  UpdateWorkspacePayload,
} from "@/interface/MyHub/interface";
import { callApi } from "@/libs/http/http-common";
export const getWorkspace = async () => {
  return callApi({
    url: "/sg/api/gateway/v1/account/work_space_list",
    method: "GET",
  });
};

export const addEzhub = async (data: UpdateWorkspacePayload) => {
  return callApi({
    url: "/sg/api/gateway/v1/account/work_space",
    method: "POST",
    data,
  });
};

export const duplicateEzhub = async (id: number) => {
  return callApi({
    url: `/sg/api/gateway/v1/account/work_space_duplicate`,
    method: "POST",
    data: {
      WorkSpaceID: id,
    },
  });
};

export const deleteEzhub = async (workSpaceID: string) => {
  return callApi({
    url: `/sg/api/gateway/v1/account/work_space`,
    method: "DELETE",
    data: { WorkSpaceID: workSpaceID },
  });
};
export const updateEzhub = async (data: IDataEzhub) => {
  return callApi({
    url: `/sg/api/gateway/v1/account/work_space`,
    method: "PUT",
    data,
  });
};
export const setDefaultEzhub = async (workSpaceID: string) => {
  return callApi({
    url: `/sg/api/gateway/v1/account/work_space_default`,
    method: "PUT",
    data: { WorkSpaceID: workSpaceID },
  });
};
export const renameEzhub = async (workSpaceID: string, newName: string) => {
  return callApi({
    url: `/sg/api/gateway/v1/account/work_space`,
    method: "PUT",
    data: { WorkSpaceID: workSpaceID, Name: newName },
  });
};

export const getDetailWorkspaceApi = async (workspaceId: number) => {
  return callApi({
    url: `/sg/api/gateway/v1/account/work_space_detail?workspaceid=${workspaceId}`,
    method: "GET",
  });
};

export const updateWorkspaceApi = async (data: UpdateWorkspacePayload) => {
  return callApi({
    url: "/sg/api/gateway/v1/account/work_space",
    method: "PUT",
    data,
  });
};
