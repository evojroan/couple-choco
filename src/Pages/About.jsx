import {Link, Outlet} from "react-router-dom";

export default function About() {
  return (
    <>
      <div className="p-4">
        以 Modal 顯示，Medium 要有圖示
        <p>
          網頁作者：Roan
          <br />
          <Link
            to="https://medium.com/@roan6903"
            target="_blank">
            Medium
          </Link>
          <br />
          <Link
            to="https://github.com/evojroan"
            target="_blank">
            GitHub
          </Link>
          <br />
          <br />
        </p>
      </div>
    </>
  );
}
