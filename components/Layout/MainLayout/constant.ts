import { TFunction } from "i18next";

/**
 * @description function render tiêu đề của trang trên header
 * @param t
 * @param routerPath
 * @returns
 */
export const handleShowTitlePage = (t: TFunction, routerPath: string) => {
  switch (routerPath) {
    case "/":
      return t("homepage");
    // nghiệp vụ AggregateData
    case "/assetReport":
      return t("title_assets");
    case "/stockdetails":
      return t("text_title_so_du_ck_chi_tiet");
    case "/moneytransaction":
      return t("report.text_money_transaction");
    case "/cashsettlement":
      return t("report.text_cash_settlement");
    case "/detailnav":
      return t("text_title_NAV");
    case "/reportprofitloss":
      return t("bcts_lai_lo");
    case "/reporttransumary":
      return t("report.text_report_transumary");
    case "/reportcw":
      return t("report.text_report_cw");
    case "/feeschedule":
      return t("report.feeScheduleRP_title");
    case "/lookUpFeeSchedule":
      return t("customer.text_fee_schedule");
    // nghiệp vụ Customer
    case "/registration":
      return t("customer.text_thong_tin_dich_vu");
    case "/utility":
      return t("customer.text_utility");
    case "/history-change":
      return t("text_title_lich_su_thay_doi");
    case "/promotion":
      return t("customer.text_khuyen_mai");
    case "/promotion/[slug]":
      return t("customer.text_chi_tiet_khuyen_mai");
    case "/account-info":
      return t("text_infomation");
    case "/contact":
      return "Liên hệ";
    case "/feedback":
      return "Lịch sử góp ý";
    // Nghiệp vụ Cashtran
    case "/invoice":
      return "Tra cứu hóa đơn VAT";
    case "/template-history":
      return "Lịch sử mẫu chuyển tiền";
    case "/transfer-order":
      return "Chuyển tiền ngân hàng";
    case "/transfer-orderps":
      return "Chuyển tiền phái sinh";
    case "/transfer-qr":
      return "Nộp tiền";
    case "/transfer-history":
      return "Lịch sử chuyển tiền";
    case "/transfer-template":
      return "Mẫu chuyển tiền";
    // Nghiệp vụ Loans
    // Nghiệp vụ Market
    default:
      return "";
  }
};
