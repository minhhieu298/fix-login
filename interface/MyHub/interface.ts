import { IJsonModel } from "flexlayout-react";

import { IResponseData } from "@/interface/interface";
import { RecentSearchItem } from "@/utils/recentSearch";
export interface HubContextType {
  rename: (_id: number, _newName: string) => void;
  duplicate: (_id: number) => void;
  remove: (_id: number) => void;
}

export interface IDataEzhub {
  Code: number;
  Message: string;
  Default: number;
  List: {
    Name: string;
    WorkSpaceID: number;
    Thumbnail: number;
  }[];
}

export interface IAddDataEzhub {
  WorkSpaceID: number;
}
export type IResponseEzhub = IResponseData<IDataEzhub>;
export type IResponseAddEzhub = IResponseData<IAddDataEzhub>;

export interface WorkspaceLink {
  LinkId: string[];
  Key: number;
  Symbol: string;
}

export interface UpdateWorkspacePayload {
  WorkSpaceID?: number;
  JsonModel: IJsonModel;
  Links: WorkspaceLink[];
  Name: string;
  Thumbnail: number;
}

export interface Hub {
  WorkSpaceID: number;
  Name: string;
  Thumbnail: number;
}

export interface DataEzhub {
  List: Hub[];
  Default?: number;
}

export interface EzHubState {
  isLoading: boolean;
  isLoadingLayout: boolean;
  recentSearches: RecentSearchItem[];
  dataEzhub: DataEzhub | null;
  error: { message: string };
  selectedHub: Hub | null;
  detailWorkspace: UpdateWorkspacePayload;
  renderedHubId: number | null;
  shouldSetDefault?: boolean;
  isWorkspaceSelectedFromSearch?: boolean;
}
