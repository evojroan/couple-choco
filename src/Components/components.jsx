import {Button, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import {useState} from "react";
import {IoLogoMedium} from "react-icons/io5";
import {FaGithub} from "react-icons/fa";

import {Link, Outlet} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Autoplay} from "swiper/modules";
import "swiper/css/bundle";

const MiddlecardsImg = {
  0: {imgsrc: "/Images/middle0.png", desc: "兩個人的甜蜜時刻"},
  1: {imgsrc: "/Images/middle1.png", desc: "也能一人獨享"},
  2: {imgsrc: "/Images/middle2.png", desc: "精緻典雅"},
  3: {imgsrc: "/Images/middle3.png", desc: "舌尖上的藝術品"},
  4: {imgsrc: "/Images/middle4.png", desc: "來自環境友善農場"},
  5: {imgsrc: "/Images/middle5.png", desc: "公平貿易認證"},
  6: {imgsrc: "/Images/middle6.png", desc: "搭配熱咖啡別有風味"},
  7: {imgsrc: "/Images/middle7.png", desc: "打造別緻時刻"}
};

const MiddleSwiperImg = {
  0: {imgsrc: "/Images/swiper0.png", desc: ""},
  1: {imgsrc: "/Images/swiper1.png", desc: ""},
  2: {imgsrc: "/Images/swiper2.png", desc: ""}
};

export default function Layout() {
  return (
    <>
      <Header />
      <div className="mt-20">
        <Outlet />
      </div>
    </>
  );
}

export function HeaderButton({text, onClick}) {
  return (
    <Button
      className="w-[20vw] mx-10 text-center items-center gap-2 rounded-md py-2 px-8 text-sm/6 font-semibold text-amber-500 shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white transition ease-in-out delay-50 bg-orange-100 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 hover:text-white duration-300"
      onClick={onClick}>
      {text}
    </Button>
  );
}

export function HeaderAboutButton({text}) {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <HeaderButton
        text={text}
        onClick={open}
      />

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-100 focus:outline-none"
        onClose={close}>
        <div className="fixed inset-0 z-50  shadow-lg ">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/75 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium ">
                關於我
              </DialogTitle>
              <div className="mt-2 text-sm/6 flex">
                <div className="left m-1  w-3/2">
                  <div className="m-2"> Roan，前端工程師</div>
                  <div className="m-2">
                    HTML/CSS/TailwindCSS/JavaScript/ReactJS
                  </div>
                  <div className="m-2 ">
                    <a
                      href="https://medium.com/@roan6903"
                      target="_blank"
                      rel="noopener noreferrer">
                      <div className="flex">
                        <IoLogoMedium />

                        <u className="m-1">Medium</u>
                      </div>
                    </a>
                    <a
                      href="https://github.com/evojroan"
                      target="_blank"
                      rel="noopener noreferrer">
                      <div className="flex">
                        <FaGithub />

                        <u className="m-1">GitHub</u>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="right w-1/3 m-1 flex items-center justify-center">
                  <img
                    className="  shadow-lg shadow-black rounded-lg"
                    src="/Images/avatar.png"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-orange-100 py-1.5 px-3 text-sm/6 font-semibold text-amber-500 shadow-inner shadow-white/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-orange-500"
                  onClick={close}>
                  關閉
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export function Header() {
  return (
    <>
      <header>
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="h-20 flex items-center  bg-white">
            <img
              src="/Images/logo.png"
              className="left-5 h-full"
            />
            <div className="w-full flex items-center justify-center">
              <Link to="/">
                <HeaderButton text="首頁" />
              </Link>
              <Link to="/Input">
                <HeaderButton text="購買" />
              </Link>
              <HeaderAboutButton text="關於我" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export function MiddlecardsGrid() {
  function MiddlecardEach({imgsrc1, desc1, imgsrc2, desc2}) {
    return (
      <div className="group hover:-translate-y-2 transition-all duration-300 relative  w-full ">
        <div className="Lowercard  flex flex-col absolute justify-center items-center opacity-0 group-hover:opacity-100 duration-300">
          <img
            className="rounded-2xl w-full h-auto object-cover"
            src={imgsrc2}
            alt={desc2}
          />
          <p>{desc2}</p>
        </div>
        <div className="Uppercard flex flex-col justify-center items-center group-hover:opacity-0 transition-all duration-300">
          <img
            className="rounded-2xl w-full h-auto object-cover"
            src={imgsrc1}
            alt={desc1}
          />
          <p>{desc1}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-4 relative">
      <MiddlecardEach
        imgsrc1={MiddlecardsImg[0].imgsrc}
        desc1={MiddlecardsImg[0].desc}
        imgsrc2={MiddlecardsImg[1].imgsrc}
        desc2={MiddlecardsImg[1].desc}
      />
      <MiddlecardEach
        imgsrc1={MiddlecardsImg[2].imgsrc}
        desc1={MiddlecardsImg[2].desc}
        imgsrc2={MiddlecardsImg[3].imgsrc}
        desc2={MiddlecardsImg[3].desc}
      />
      <MiddlecardEach
        imgsrc1={MiddlecardsImg[4].imgsrc}
        desc1={MiddlecardsImg[4].desc}
        imgsrc2={MiddlecardsImg[5].imgsrc}
        desc2={MiddlecardsImg[5].desc}
      />
      <MiddlecardEach
        imgsrc1={MiddlecardsImg[6].imgsrc}
        desc1={MiddlecardsImg[6].desc}
        imgsrc2={MiddlecardsImg[7].imgsrc}
        desc2={MiddlecardsImg[7].desc}
      />
    </div>
  );
}

export function MiddleSwiper() {
  return (
    <div className="m-10">
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false
        }}
        pagination={{
          dynamicBullets: true
        }}
        modules={[Pagination, Autoplay]}>
        <SwiperSlide>
          <div className="firstSlide flex m-10">
            <div className="w-1/2  flex flex-col justify-center p-10 ">
              <p className="text-xl m-4  ">
                一對 Couple 享受甜蜜的當下，能做什麼？
              </p>
              <p className="text-xl  m-4">一起享用 Couple Choco！</p>
              <p className="text-xl  m-4">
                用舌尖寫下浪漫的情書。不只是克力，更是對彼此的承諾。
              </p>
              <p className="text-xl  m-4">
                口味變化豐富，正如同多采多姿的愛情。
              </p>
            </div>

            <div className="w-1/2">
              <img
                src={MiddleSwiperImg[0].imgsrc}
                className="rounded-lg"
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="secondSlide flex m-10 ">
            <div className="w-1/2 ">
              <img
                src={MiddleSwiperImg[1].imgsrc}
                className="rounded-lg"
              />
            </div>

            <div className="w-1/2  flex flex-col justify-center p-10 ">
              <p className="text-xl  m-4">
                每顆巧克力都是近乎完美的藝術品， 匠人之手的細膩雕琢。
              </p>
              <p className="text-xl  m-4">
                暗香浮動間，可可豆的醇厚在溫度中綻放， 如場優雅的味蕾探戈。
                金色包裹下的絲滑內餡， 是大師傾注靈魂的心血結晶。
              </p>
              <p className="text-xl  m-4">
                完美，不僅是外表的光澤， 更是內在的靈魂。 讓每一顆巧克力，
                都成為您品味人生的最佳伴侶。
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="thirdSlide flex m-10">
            <div className="w-1/2  flex flex-col justify-center p-10">
              <p className="text-xl  m-4">
                除了專注近乎完美的品質，我們也在乎友善對待環境與農民。
              </p>
              <p className="text-xl  m-4">
                來自農民友善的有機農場，您將大大改善農民的生活。
              </p>
              <p className="text-xl  m-4">
                嚴格遵循公平貿易認證標準，每一顆都是友善的巧克力。
              </p>
            </div>

            <div className="w-1/2">
              <img
                src={MiddleSwiperImg[2].imgsrc}
                className="rounded-lg"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
