import { ReactNode } from "react";
import { JsxElement } from "typescript";
import "./DescriptionArea.css";

function DescriptionArea({ children }: { children: ReactNode }) {
  return <div className="DescriptionArea">{children}</div>;
}

export default DescriptionArea;
