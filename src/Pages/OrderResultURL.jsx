import {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom"; //   npm install react-router-dom

export default function OrderResultURL({backendurl, Language}) {
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const MerchantTradeNo = searchParams.get("MerchantTradeNo");
  const [OrderResult, setOrderResult] = useState(null);
  const translations = {
    [ECPay.Language.zhTW]: {
      loading: "載入中...",
      result: "付款結果",
      merchanttradeno: "廠商訂單編號",
      paymentdate: "付款時間",
      tradeamount: "交易金額",
      traderesult: "交易結果",
      tradesuccess: "交易成功",
      tradefail: "交易未成功，請聯絡客服",
      back2index: "返回首頁"
    },
    [ECPay.Language.enUS]: {
      loading: "Loading",
      result: "Payment Result",
      merchanttradeno: "MerchantTradeNo",
      paymentdate: "Payment Time",
      tradeamount: "Trade Amount",
      traderesult: "Trade Result",
      tradesuccess: "Trade Successful",
      tradefail: "Trade Fails. Please contact customer service",
      back2index: "Back to Index"
    }
  };

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        // 向後端 API 請求付款結果
        const response = await axios.get(
          `${backendurl}/api/getOrderResult?MerchantTradeNo=${MerchantTradeNo}`
        );
        setOrderResult(response.data);
      } catch (error) {
        console.error("Error fetching payment result:", error);
      }
    };

    if (MerchantTradeNo) {
      console.log("MerchantTradeNo=", MerchantTradeNo);
      fetchPaymentResult();
    }
  }, [MerchantTradeNo]);

  if (!OrderResult) return <div>{translations[Language].loading}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white from-60% to-[#f4e4bc] border-2">
      <div className="m-12">
        <h1
          className="text-3xl font-bold"
          data-aos="fade-down"
          data-aos-once="true">
          {translations[Language].result}
        </h1>
        <p className="m-2">
          {translations[Language].merchanttradeno}：{" "}
          {OrderResult.OrderInfo.MerchantTradeNo}
        </p>
        <p className="m-2">
          {translations[Language].paymentdate}：{" "}
          {OrderResult.OrderInfo.PaymentDate}
        </p>
        <p className="m-2">
          {translations[Language].tradeamount}：{" "}
          {OrderResult.OrderInfo.TradeAmt}
        </p>
        <p className="m-2">
          {translations[Language].traderesult}：
          {OrderResult.RtnCode == 1
            ? translations[Language].tradesuccess
            : translations[Language].tradefail}
        </p>
        <button
          className="text-center items-center gap-2 rounded-md py-2 px-8 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white transition ease-in-out delay-50 bg-orange-400 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 hover:text-white duration-300"
          onClick={() => {
            navigate("/");
          }}>
          {translations[Language].back2index}
        </button>
      </div>
    </div>
  );
}
