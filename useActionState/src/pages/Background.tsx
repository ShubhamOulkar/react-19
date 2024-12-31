import { Attribution } from "../components/Attribution";
import { Outlet } from "react-router";
import TopLine from "../assets/images/line-top.svg";
import BottomLine from "../assets/images/line-bottom.svg";
import Circle from "../assets/images/pattern-circle.svg";
import Lines from "../assets/images/pattern-lines.svg";

export default function Background() {
  return (
    <div className="background">
      <img src={TopLine} className="topline" />
      <img src={Lines} className="vericleline" />
      <img src={Circle} className="circle" />
      <img src={BottomLine} className="bottomline" />
      <Outlet />
      <Attribution />
    </div>
  );
}
