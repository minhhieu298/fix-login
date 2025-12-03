export interface IAccountInfo {
  address: string;
  avatar: string;
  checkEkyc: number;
  dateIssue: string;
  dob: string;
  domestic: number;
  domesticText: string;
  emPowerPerson: string | null;
  email: string | null;
  eppDateIssue: string | null;
  eppIdentifyNumber: string | null;
  eppPlaceIssue: string | null;
  flagAddress: "Approved" | "Pending" | "Reading" | "Rejected";
  flagDateIssue: "Approved" | "Pending" | "Reading" | "Rejected";
  flagEmPowerPerson: "Approved" | "Pending" | "Reading" | "Rejected";
  flagEmail: "Approved" | "Pending" | "Reading" | "Rejected";
  flagEppDateIssue: "Approved" | "Pending" | "Reading" | "Rejected";
  flagEppIdentifyNumber: "Approved" | "Pending" | "Reading" | "Rejected";
  flagEppPlaceIssue: "Approved" | "Pending" | "Reading" | "Rejected";
  flagIdentifyNumber: "Approved" | "Pending" | "Reading" | "Rejected";
  flagMobile: "Approved" | "Pending" | "Reading" | "Rejected";
  flagPlaceIssue: "Approved" | "Pending" | "Reading" | "Rejected";
  flagProvince: "Approved" | "Pending" | "Reading" | "Rejected";
  flagTel: "Approved" | "Pending" | "Reading" | "Rejected";
  identifyNumber: string;
  mobile: string;
  name: string;
  placeIssue: string;
  province: number;
  provincetext: string;
  sex: number;
  sexText: string;
  specialName: string;
  tblId: number;
  tel: string;
  typeAcc: number;
  typeOrg: number;
}

export type IInitialStateAccount = {
  isLoading: boolean;
  accountInfo: IAccountInfo | null;
  error: {
    message: string;
  };
  isNameSuccess: boolean;
  isAvatarSuccess: boolean;
};
