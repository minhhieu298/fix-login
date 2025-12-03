export interface ICommentsType {
  ATYPENAME: string;
  ATYPENAME_EN: string;
  ATYPEORD: number;
}

export interface ICommentsTypeTableResponse {
  Table: ICommentsType[];
}
export interface ISendCommentInput {
  CmtType: number;
  CmtThead: string;
  CmtTdesc: string;
}

export interface ISendCommentOutput {
  Data: {
    ErrorCode: number;
    ErrorMess: string;
  };
}
