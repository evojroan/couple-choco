import Barcode from "react-barcode"; //npm i react-barcode
import {useNavigate} from "react-router-dom"; //   npm install react-router-dom

let bankname;

export default function PaymentInfoPage({PaymentInfo}) {
  const navigate = useNavigate();

  switch (PaymentInfo.ATMInfo.BankCode) {
    case "":
      bankname = "非 ATM 匯款";
      break;
    case "004":
      bankname = "台灣銀行";
      break;
    case "005":
      bankname = "土地銀行";
      break;
    case "007":
      bankname = "第一銀行";
      break;
    case "013":
      bankname = "國泰世華銀行";
      break;
    case "118":
      bankname = "板信銀行";
      break;
    case "814":
      bankname = "大眾銀行";
      break;
    case "822":
      bankname = "中國信託銀行";
      break;
    default:
      "讀取中";
  }
  const payMethod = PaymentInfo.OrderInfo.PaymentType;
  const paymentObj = {
    ATM: {
      PaymentType: "ATM",
      PaymentName: "ATM 櫃員機",
      BankName: `付款銀行：${bankname}`,
      BankCode: `銀行代碼：${PaymentInfo.ATMInfo.BankCode}`,
      vAccount: `繳費帳號：${PaymentInfo.ATMInfo.vAccount}`,
      ExpireDate: `繳費期限：${PaymentInfo.ATMInfo.ExpireDate} 23:59:59`
    },
    CVS: {
      PaymentType: "CVS",
      PaymentName: "超商代碼",
      CVSName: "付款超市：7-11、全家、萊爾富、OK 皆可",
      CVSCode: "繳費分店：任何分店皆可繳費",
      PaymentNo: `繳費代碼：${PaymentInfo.CVSInfo.PaymentNo}`,
      ExpireDate: `繳費期限：${PaymentInfo.CVSInfo.ExpireDate}`
    },
    BARCODE: {
      PaymentType: "BARCODE",
      PaymentName: "超商條碼",
      CVSName: "付款超市：7-11、全家、萊爾富、OK 皆可",
      CVSCode: "繳費分店：任何分店皆可繳費",
      PaymentNo: {
        第一段條碼: PaymentInfo.BarcodeInfo.Barcode1,
        第二段條碼: PaymentInfo.BarcodeInfo.Barcode2,
        第三段條碼: PaymentInfo.BarcodeInfo.Barcode3
      },
      ExpireDate: `繳費期限：${PaymentInfo.BarcodeInfo.ExpireDate}`
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white from-75% to-[#f4e4bc] border-2">
      <div className="m-12 ">
        <h1
          className="text-3xl font-bold"
          data-aos="fade-down"
          data-aos-once="true">
          謝謝您！以下是訂單與匯款資料：
        </h1>
        <p className="m-2">
          {" "}
          訂單編號 ：{PaymentInfo.OrderInfo.MerchantTradeNo}
        </p>
        <p className="m-2"> 付款方式 ：{paymentObj[payMethod].PaymentName}</p>
        <p className="m-2">
          {payMethod === "ATM"
            ? paymentObj[payMethod].BankName
            : payMethod === "CVS"
            ? paymentObj[payMethod].CVSName
            : payMethod === "BARCODE"
            ? paymentObj[payMethod].CVSName
            : ""}
        </p>
        <p className="m-2">
          {payMethod === "ATM"
            ? paymentObj[payMethod].BankCode
            : payMethod === "CVS"
            ? paymentObj[payMethod].CVSCode
            : payMethod === "BARCODE"
            ? paymentObj[payMethod].CVSCode
            : ""}
        </p>
        <p className="m-2">
          {payMethod === "ATM" ? (
            paymentObj[payMethod].vAccount
          ) : payMethod === "CVS" ? (
            paymentObj[payMethod].PaymentNo
          ) : payMethod === "BARCODE" ? (
            <div className="flex">
              <Barcode value={paymentObj[payMethod].PaymentNo.第一段條碼} />
              <Barcode value={paymentObj[payMethod].PaymentNo.第二段條碼} />
              <Barcode value={paymentObj[payMethod].PaymentNo.第三段條碼} />
            </div>
          ) : (
            ""
          )}
        </p>
        <p className="m-2">
          {payMethod === "ATM"
            ? paymentObj[payMethod].ExpireDate
            : payMethod === "CVS"
            ? paymentObj[payMethod].ExpireDate
            : payMethod === "BARCODE"
            ? paymentObj[payMethod].ExpireDate
            : ""}
        </p>

        <br />

        <br />
        <button
          className=" text-center items-center gap-2 rounded-md py-2 px-8 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white transition ease-in-out delay-50 bg-orange-400 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 hover:text-white duration-300"
          onClick={() => {
            navigate("/");
          }}>
          返回首頁
        </button>
      </div>
    </div>
  );
}
