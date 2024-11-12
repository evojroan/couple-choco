import {useEffect, useState} from "react";
import axios from "axios"; // npm i axios
import {useNavigate} from "react-router-dom"; //   npm i react-router-dom

export default function Payment({
  backendurl,
  MerchantID,
  MerchantTradeNo,
  setPaymentInfo,
  Token,
  Language,
  ServerType,
  IsLoading,
  Version
}) {
  const navigate = useNavigate();

  const [paymentRendered, setPaymentRendered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [PayToken, setPayToken] = useState("");
  const [ThreeDURL, setThreeDURL] = useState("");
  const [UnionPayURL, setUnionPayURL] = useState("");
  const Timestamp = Math.floor(Date.now() / 1000);
  const Data = {
    PlatformID: "",
    MerchantID: MerchantID,
    PayToken: PayToken,
    MerchantTradeNo: MerchantTradeNo
  };

  const CreatePaymentPayload = {
    MerchantID: MerchantID,
    RqHeader: {Timestamp: Timestamp},
    Data: Data
  };

  const translations = {
    [ECPay.Language.zhTW]: {
      pageTitle: "請選擇付款方式",
      pay: "付款",
      paying: "付款中"
    },
    [ECPay.Language.enUS]: {
      pageTitle: "Please select payment method",
      pay: "Pay",
      paying: "Paying"
    }
  };

  useEffect(() => {
    if (!window.ECPayInitialized) {
      window.ECPay.initialize(ServerType, IsLoading, function (errMsg) {
        if (errMsg) {
          console.error(errMsg);
        } else {
          window.ECPay.createPayment(
            Token,
            Language,
            function (errMsg) {
              if (errMsg) {
                console.error(errMsg);
              } else {
                setPaymentRendered(true);
                window.ECPayInitialized = true; // 標記為已初始化
              }
            },
            Version
          );
        }
      });
    } else {
      // 如果已經初始化，直接呼叫 createPayment
      window.ECPay.createPayment(
        Token,
        Language,
        function (errMsg) {
          if (errMsg) {
            console.error(errMsg);
          } else {
            setPaymentRendered(true);
          }
        },
        Version
      );
    }
  }, [Token, Language, ServerType, IsLoading, Version]);

  //等待取得 Paytoken
  useEffect(() => {
    if (PayToken) {
      handleCreatePayment();
    }
  }, [PayToken]); //useCallback 尚待解決

  //等待取得 ThreeDURL
  useEffect(() => {
    if (ThreeDURL) {
      window.location.href = ThreeDURL.replace(/^"|"$/g, "");
    } else if (UnionPayURL) {
      window.location.href = UnionPayURL.replace(/^"|"$/g, "");
    }
  }, [ThreeDURL, UnionPayURL]);

  //取得 Paytoken 後，立即以 CreatePaymentPayload 呼叫後端
  async function handleCreatePayment() {
    try {
      const response = await axios.post(
        `${backendurl}/CreatePayment`,
        //"http://localhost:3000/CreatePayment",
        CreatePaymentPayload
      );
      if (response.data.ThreeDInfo.ThreeDURL) {
        setThreeDURL(response.data.ThreeDInfo.ThreeDURL);
      } else if (response.data.UnionPayInfo.UnionPayURL) {
        setUnionPayURL(response.data.UnionPayInfo.UnionPayURL);
      } else {
        setPaymentInfo(response.data);
        navigate("/PaymentInfoPage");
      }

      //CreatePayment 還要 3D 驗證。
    } catch (error) {
      console.error(error);
    }
  }

  //SDK 取得 Paytoken
  function handleGetPayToken() {
    ECPay.getPayToken(function (paymentInfo, errMsg) {
      if (errMsg) {
        console.error(errMsg);
        return;
      }
      setPayToken(paymentInfo.PayToken);
      setIsClicked(true);
    });
  }

  return (
    <div>
      <div className="flex flex-col items-top justify-center">
        <div
          id="ECPayPayment"
          className="">
         
        </div>
        {paymentRendered && (
          <div className="flex justify-center">
            {" "}
            <button
              className="w-fit m-10 text-center items-center gap-2 rounded-md py-2 px-8 text-sm/6 font-semibold text-amber-500 shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white transition ease-in-out delay-50 bg-orange-100 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 hover:text-white duration-300"
              onClick={handleGetPayToken}
              disabled={isClicked}>
              {isClicked
                ? translations[Language].paying
                : translations[Language].pay}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
