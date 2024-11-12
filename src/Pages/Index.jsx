//import Header from "../Components/components";
import {Link} from "react-router-dom";

import {Button} from "@headlessui/react";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

import {MiddlecardsGrid, MiddleSwiper} from "../Components/components";
// Import Swiper styles

export default function Index() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-white from-60% to-[#f4e4bc] ">
      <div className="Welcome relative">
        <img
          src="/Images/welcome.png"
          className=" w-full h-auto"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50 ">
          <p className="m-2 text-4xl font-bold">Couple Choco</p>
          <p className="m-2 text-2xl">最適合 Couple 的巧克力</p>
          <Link to="/Input">
           
            <Button className="mx-2 text-center items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white transition ease-in-out  delay-50 bg-orange-400  hover:scale-150 hover:bg-orange-500 duration-300">
              立即享受
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center m-4">
        <h1
          className="text-4xl font-bold"
          data-aos="fade-down"
          data-aos-once="true">
          一顆巧克力，兩人的甜蜜
        </h1>
      </div>
      <div
        className="MiddlecardsGrid px-6"
        data-aos="fade-up"
        data-aos-once="true">
        <MiddlecardsGrid />
      </div>
      <div
        className="relative w-2/3 px-12 py-12 text-left m-1 
          bg-gradient-to-r from-[#f4e4bc] to-[#9b8752] 
          rounded-lg shadow-lg
          before:absolute 
          before:top-4
          before:bottom-4
          before:left-4
          before:right-4
          before:border-t-4
          before:border-b-4
          before:[border-style:solid]
          before:[border-color:#5D2000]
          before:rounded-lg
          before:after:content-['']
          before:[clip-path:polygon(0_0,50%_0,50%_100%,100%_100%)]
          before:opacity-0
          before:transition-opacity
          before:duration-300
          hover:before:opacity-100
          after:absolute 
          after:top-4
          after:bottom-4
          after:left-4
          after:right-4
          after:border-l-4
          after:border-r-4
          after:[border-style:solid]
          after:[border-color:#5D2000]
          after:rounded-lg
          after:[clip-path:polygon(0_0,0_50%,100%_50%,100%_100%)]
          after:opacity-0
          after:transition-opacity
          after:duration-300
          hover:after:opacity-100"
        // data-aos="fade-right"
        // data-aos-once="false"
      >
        <h2 className="text-3xl font-bold mb-8">
          傳承百年工藝，為愛譜寫甜蜜篇章
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Couple Choco
          始於對完美松露巧克力的追求，我們深信一顆巧克力能譜寫一段動人的愛情故事。每一顆松露巧克力都經過匠人細心調配，從選料到包裝，只為在最重要的時刻，為您傳遞最真摯的心意。
        </p>
        <p className="text-lg leading-relaxed mb-6">
          我們嚴選來自世界各地的頂級可可豆，透過獨特的研磨工藝，讓可可脂在唇齒間綻放，層層包裹的松露外衣，則是以傳統手工技法一次次堆疊而成。當那層薄如蟬翼的可可粉輕輕化開，便是愛情最甜美的瞬間。
        </p>
        <p className="text-lg leading-relaxed">
          堅持使用天然原料，不添加人工香料與防腐劑，每一款口味都經過無數次的調整與品評。從經典72%醇黑到玫瑰覆盆子，從香檳松露到抹茶生巧，我們為每一對戀人打造專屬的味蕾記憶。
        </p>
        <div className="flex justify-center m-4 ">
          <Link to="/Input">
            <Button className=" text-center items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white transition ease-in-out  delay-50 bg-orange-400  hover:scale-150 hover:bg-orange-500 duration-300">
              立即享受
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full">
        <MiddleSwiper />
      </div>
    </div>
  );
}
