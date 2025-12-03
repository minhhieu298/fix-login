import { TFunction } from "i18next";

export const defaultMenuIcon: string[] = [
  "banggia",
  "taisan",
  "datlenhcoso",
  "thitruong",
  "bieudo",
  "noptien",
  "thongtindichvu",
  "timkiemchuyenvien",
];

export const defaultMenuIconNotLogin = {
  sm: [
    "banggia",
    "taisan",
    "datlenhcoso",
    "bieudo",
    "thitruong",
    "noptien",
    "lienhe",
  ],
  md: [
    "banggia",
    "taisan",
    "datlenhcoso",
    "lienhe",
    "bieudo",
    "thitruong",
    "noptien",
  ],
  lg: [
    "banggia",
    "bieudo",
    "thitruong",
    "taisan",
    "datlenhcoso",
    "noptien",
    "lienhe",
  ],
};

export const iconPackMapper = (t: TFunction) => [
  {
    value: "pink",
    label: t("text_icon_modern"),
  },
  {
    value: "green",
    label: t("text_icon_monochrome"),
  },
  {
    value: "grey",
    label: t("text_icon_line"),
  },
];

export const renderNameTitle = (name: string) => {
  switch (name) {
    case "cashTransaction":
      return "report.text_money_transaction";
    case "report":
      return "report.text_title_asset_report";
    case "market":
      return "menu_trade_market";
    case "loan":
      return "menu_loan";
    case "advisorSelect":
      return "menu_advisor_select";
    case "custumerService":
      return "text_dich_vu_khach_hang";
    default:
      return name;
  }
};

export const allIcon = {
  market: [
    {
      id: "datlenhcoso",
      name: "menu_equity_order",
      path: "ic_bang_gia.svg",
      url: "/equity-order",
    },
    {
      id: "datlenhphaisinh",
      name: "menu_futures_order",
      path: "ic_bang_gia.svg",
      url: "/futures-order",
    },
    {
      id: "solenhcoso",
      name: "menu_equity_order_book",
      path: "ic_bang_gia.svg",
      url: "/equity-order-book",
    },
    {
      id: "solenhphaisinh",
      name: "menu_futures_order_book",
      path: "ic_bang_gia.svg",
      url: "/futures-order-book",
    },
    {
      id: "bieudo",
      name: "menu_chart",
      path: "ic_bang_gia.svg",
      url: "/chart",
    },
    {
      id: "banggia",
      name: "menu_price_board",
      path: "ic_bang_gia.svg",
      url: "/price-board",
    },
    {
      id: "thitruong",
      name: "menu_markets",
      path: "ic_bang_gia.svg",
      url: "/market",
    },
  ],
  report: [
    {
      id: "taisan",
      name: "menu_assets",
      path: "ic_tai_san.svg",
      url: "/assetReport",
    },
    {
      id: "saoketaikhoan",
      name: "menu_cash_statement",
      path: "ic_chuyen_tien_nn.svg",
      url: "/cashsettlement",
    },
    {
      id: "saokeck",
      name: "menu_securities_statement",
      path: "ic_chuyen_tien_daytrade.svg",
      url: "/stocksettlement",
    },
    {
      id: "biendongtaisanrong",
      name: "menu_net_asset_change",
      path: "ic_bc_bd_ts_rong.svg",
      url: "/detailnav",
    },
    {
      id: "lailodathuchien",
      name: "menu_realized_pl_report",
      path: "ic_bc_lai_lo.svg",
      url: "/reportprofitloss",
    },
    {
      id: "giaodichtheomack",
      name: "menu_stock_trans_report",
      path: "ic_bc_gd_ma_ck.svg",
      url: "/reporttransumary",
    },
    {
      id: "saokequyen",
      name: "menu_corp_actions_statement",
      path: "ic_chuyen_tien_daytrade.svg",
      url: "/stockdividensettlement",
    },
    {
      id: "tracuutinhtrangcw",
      name: "menu_warrant_status",
      path: "ic_chuyen_tien_daytrade.svg",
      url: "/reportcw",
    },
    {
      id: "giaodichtien",
      name: "report.text_money_transaction",
      path: "ic_gd_tien.svg",
      url: "/moneytransaction",
    },
  ],
  loan: [
    {
      id: "ungcotuc",
      name: "menu_dividend_advance",
      path: "ic_bang_gia.svg",
      url: "/dividend-advance",
    },
    {
      id: "lichsugdvay",
      name: "menu_loan_trans_history",
      path: "ic_bang_gia.svg",
      url: "/loan-trans-history",
    },
    {
      id: "camcock",
      name: "menu_mortgage_securities",
      path: "ic_bang_gia.svg",
      url: "/mortgage-securities",
    },
    {
      id: "tratien",
      name: "menu_margin_payment",
      path: "ic_bang_gia.svg",
      url: "/margin-payment",
    },
    {
      id: "giahan",
      name: "menu_margin_renewal",
      path: "ic_bang_gia.svg",
      url: "/margin-renewal",
    },
    {
      id: "tonghoptaikhoanvay",
      name: "menu_loan_summary",
      path: "ic_bang_gia.svg",
      url: "/loan-summary",
    },
    {
      id: "saokevay",
      name: "menu_loan_statement",
      path: "ic_bang_gia.svg",
      url: "/loan-statement",
    },
    {
      id: "hanmuc",
      name: "menu_limit",
      path: "ic_bang_gia.svg",
      url: "/limit",
    },
    {
      id: "kyquy",
      name: "menu_margin_t_plus",
      path: "ic_bang_gia.svg",
      url: "/margin-t-plus",
    },
    {
      id: "sucmua",
      name: "menu_buying_power",
      path: "ic_bang_gia.svg",
      url: "/buying-power",
    },
    {
      id: "tracuu",
      name: "menu_lookup",
      path: "ic_bang_gia.svg",
      url: "/lookup",
    },
  ],
  cashTransaction: [
    {
      id: "mauchuyentien",
      name: "menu_withdrawal_template",
      path: "ic_mau_chuyen_tien.svg",
      url: "/transfer-template",
    },
    {
      id: "chuyentiennganhang",
      name: "text_bank",
      path: "ic_chuyen_tien_nn.svg",
      url: "/transfer-order",
    },
    {
      id: "chuyentienphaisinh",
      name: "menu_futures_cash_transfer",
      path: "ic_chuyen_tien_phai_sinh.svg",
      url: "/transfer-orderps",
    },
    {
      id: "noptien",
      name: "menu_deposit",
      path: "ic_nop_tien.svg",
      url: "/transfer-qr",
    },
    {
      id: "lschuyentien",
      name: "menu_withdrawal_history",
      path: "ic_ls_chuyen_tien.svg",
      url: "/transfer-history",
    },
    {
      id: "invoice",
      name: "menu_invoice_search",
      path: "ic_chuyen_tien_nn.svg",
      url: "/invoice",
    },
    {
      id: "tracuuphi",
      name: "menu_fee_search",
      path: "ic_han_muc.svg",
      url: "/feeschedule",
    },
  ],
  advisorSelect: [
    {
      id: "gioithieudichvu",
      name: "menu_service_introduction_short",
      path: "ic_chuyen_tien_nn.svg",
      url: "/service-introduction",
    },
    {
      id: "chuyenviencuatoi",
      name: "menu_my_specialist",
      path: "ic_chuyen_tien_nn.svg",
      url: "/my-specialist",
    },
    {
      id: "timkiemchuyenvien",
      name: "menu_search_specialist",
      path: "ic_chuyen_tien_nn.svg",
      url: "/search-specialist",
    },
    {
      id: "baocaotuvan",
      name: "menu_consulting_report",
      path: "ic_chuyen_tien_nn.svg",
      url: "/consulting-report",
    },
    {
      id: "tailieutvdt",
      name: "menu_investment_advisory_doc",
      path: "ic_chuyen_tien_nn.svg",
      url: "/investment-advisory-doc",
    },
    {
      id: "kehoachdautu",
      name: "menu_investment_plan",
      path: "ic_chuyen_tien_nn.svg",
      url: "/investment-plan",
    },
  ],
  custumerService: [
    {
      id: "khuyenmai",
      name: "menu_promotions",
      path: "ic_ezsaving.svg",
      url: "/promotion",
    },
    {
      id: "thongtindichvu",
      name: "menu_service_information",
      path: "ic_nop_tien.svg",
      url: "/registration",
    },
    {
      id: "lichsuthaydoithongtin",
      name: "menu_change_history",
      path: "ic_chuyen_tien_nn.svg",
      url: "/history-change",
    },
    {
      id: "tienich",
      name: "menu_utilities",
      path: "ic_chuyen_tien_phai_sinh.svg",
      url: "/utility",
    },
    {
      id: "gopy",
      name: "menu_feedback",
      path: "ic_gop_y.svg",
      url: "/feedback",
    },
    {
      id: "lienhe",
      name: "menu_contact_fpts",
      path: "ic_gop_y.svg",
      url: "/contact",
    },
    {
      id: "tracuubieuphi",
      name: "menu_fee_schedule",
      path: "ic_ezsaving.svg",
      url: "/lookUpFeeSchedule",
    },
  ],
};

//Số cột cho các breakpoint
export const cols = {
  xxs: 8,
  xs: 8,
  sm: 8,
  md: 8,
  lg: 8,
  xl: 8,
};
