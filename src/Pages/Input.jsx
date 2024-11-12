import {useState} from "react";
import "../App.css";
import axios from "axios"; // npm i axios
import {useNavigate} from "react-router-dom"; //   npm install react-router-dom
import {} from "../Components/components";

export default function Input({
  backendurl,
  setToken,
  MerchantID,
  getCurrentTime,
  setMerchantTradeNo,
  Language,

}) {
  const navigate = useNavigate();
  const Timestamp = Math.floor(Date.now() / 1000);
  const MerchantMemberID = "member3002607";

  const [Unit, setUnit] = useState(1);
  const [TotalAmount, setTotalAmount] = useState(100);
  const [Name, setName] = useState("測試帳號三");
  const [Phone, setPhone] = useState("0912345678");
  const [Email, setEmail] = useState("3002607@test.com");
  const [RememberCard, setRememberCard] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const price = 100;
  const PaymentUIType = 2;
  const ChoosePaymentList = 0;
  const ReturnURL = `${backendurl}/ReturnURL`;
  const OrderResultURL = `${backendurl}/OrderResultURL`;
  const latestMerchantTradeNo = `emb${getCurrentTime().string}`;
  const MerchantTradeDate = `${getCurrentTime().time}`;

  const TradeDesc = "站內付 2.0 範例";
  const ItemName = "測試商品";
  const CreditInstallment = "3,6,12,18,24";
  const ExpireDate = 3;
  const StoreExpireDate_CVS = 10080;
  const StoreExpireDate_BARCODE = 7;
  const Data = {
    MerchantID: MerchantID,
    RememberCard: RememberCard,
    PaymentUIType: PaymentUIType,
    ChoosePaymentList: ChoosePaymentList,
    OrderInfo: {
      MerchantTradeDate: MerchantTradeDate,
      MerchantTradeNo: latestMerchantTradeNo,
      TotalAmount: TotalAmount,
      TradeDesc: TradeDesc,
      ItemName: ItemName,
      ReturnURL: ReturnURL
    },
    CardInfo: {
      OrderResultURL: OrderResultURL,
      CreditInstallment: CreditInstallment
    },
    UnionPayInfo: {OrderResultURL: OrderResultURL},
    ATMInfo: {
      ExpireDate: ExpireDate
    },
    CVSInfo: {
      StoreExpireDate: StoreExpireDate_CVS
    },
    BARCODEInfo: {
      StoreExpireDate: StoreExpireDate_BARCODE
    },
    ConsumerInfo: {
      MerchantMemberID: MerchantMemberID,
      Name: Name,
      Phone: Phone,
      Email: Email
    }
  };
  const GetTokenByTradePayload = {
    MerchantID: MerchantID,
    RqHeader: {Timestamp: Timestamp},
    Data: Data
  };

  const translations = {
    [ECPay.Language.zhTW]: {
      purchaseAmount: "請輸入購買數量",
      price: "價格",
      priceunit: " 元/份",
      totalAmount: "總額",
      ntd: " ",
      purchaseInfo: "請輸入購買資訊",
      name: "姓名",
      phone: "電話",
      email: "電子郵件",
      rememberCard: "是否記憶信用卡卡號",
      yes: "是",
      no: "否",
      submit: "送出",
      submitting: "送出中"
    },
    [ECPay.Language.enUS]: {
      purchaseAmount: "Purchase Amount",
      price: "Price",
      priceunit: " NTD/Piece",
      totalAmount: "Total Amount ",
      ntd: " NTD",
      purchaseInfo: "Purchase Information",
      name: "Name",
      phone: "Phone",
      email: "Email",
      rememberCard: "Remember Credit Card Number",
      yes: "Yes",
      no: "No",
      submit: "Submit",
      submitting: "Submitting"
    }
  };

  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  async function handleSubmit() {
    if (!validateEmail(Email)) {
      setIsValidEmail(false);
      return;
    }
    setMerchantTradeNo(latestMerchantTradeNo);
    setIsClicked(true);
    try {
      const response = await axios.post(
        "https://ecpay-embedded-checkout-backend.vercel.app/GetTokenbyTrade",
        //"http://localhost:3000/GetTokenbyTrade",
        GetTokenByTradePayload
      );

      setToken(response.data);
      navigate("/payment");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="paramsInput flex items-top justify-center p-10">
        <div className="m-2   h-auto">
          <div className="w-full purchase-info ">
            <h2 className="font-black text-2xl">
              {translations[Language].purchaseAmount}
            </h2>
            <p className="m-2">
              {translations[Language].price}：{price}
              {translations[Language].priceunit}
            </p>
            <p className="m-2">
              <input
                className="block p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 "
                value={Unit}
                id="Unit"
                type="number"
                min="1"
                max="100"
                onChange={e => {
                  const newUnit = Math.min(
                    100,
                    Math.max(1, parseInt(e.target.value) || 1)
                  );
                  setUnit(newUnit);
                  setTotalAmount(newUnit * price);
                }}
              />
            </p>
            <p className="m-2">
              {" "}
              {translations[Language].totalAmount}：{TotalAmount}
              {translations[Language].ntd}
            </p>
          </div>
          <div className="w-full purchase-info">
            <h2 className="font-black text-2xl">
              {translations[Language].purchaseInfo}
            </h2>
            <p className="m-2">
              <label className="m-2">{translations[Language].name}</label>
              <input
                className="p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                id="Name"
                type="text"
                maxLength="50"
                onChange={e => setName(e.target.value)}
                value={Name}
              />
            </p>
            <p className="m-2">
              <label className="m-2">{translations[Language].phone}</label>
              <input
                className=" p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                id="Phone"
                type="tel"
                maxLength="60"
                onChange={e => {
                  const inputValue = e.target.value.replace(/\D/g, "");
                  setPhone(inputValue);
                }}
                value={Phone}
              />
            </p>
            <p className="m-2">
              <label className="m-2">{translations[Language].email}</label>

              <input
                className={`p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  isValidEmail ? "ring-gray-300" : "ring-red-500"
                } placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
                id="Email"
                aria-invalid={!isValidEmail}
                aria-describedby="email-error"
                type="email"
                maxLength="30"
                onChange={e => {
                  setEmail(e.target.value);
                  setIsValidEmail(validateEmail(e.target.value));
                }}
                value={Email}
              />
              {!isValidEmail && (
                <p
                  className="text-red-500 text-sm mt-1"
                  id="email-error">
                  請輸入有效的電子郵件地址
                </p>
              )}
            </p>

            <div>{translations[Language].rememberCard}</div>
            <form>
              <label className="hover_radio">
                <input
                  className="border border-[#737373] rounded-lg p-1"
                  type="radio"
                  name="RememberCard"
                  value="1"
                  checked={RememberCard === 1}
                  onChange={() => setRememberCard(1)}
                />
                {translations[Language].yes}
              </label>
              <label className="hover_radio">
                <input
                  className="border border-[#737373] rounded-lg p-1"
                  type="radio"
                  name="RememberCard"
                  value="0"
                  checked={RememberCard === 0}
                  onChange={() => setRememberCard(0)}
                />
                {translations[Language].no}
              </label>
            </form>
          </div>
          <div className="w-full purchase-info">
            {" "}
            <button
              className="w-fit m-10 text-center items-center gap-2 rounded-md py-2 px-8 text-sm/6 font-semibold text-amber-500 shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white transition ease-in-out delay-50 bg-orange-100 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 hover:text-white duration-300"
              onClick={handleSubmit}
              disabled={isClicked}>
              {isClicked
                ? translations[Language].submitting
                : translations[Language].submit}
            </button>
          </div>
        </div>
        <div className="m-2   w-1/3">
          <img
            className=" w-full shadow-lg shadow-black rounded-lg"
            src="/Images/inputimg.png"
          />
        </div>
      </div>
    </>
  );
}
