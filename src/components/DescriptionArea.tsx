import { ReactNode } from "react";
import { JsxElement } from "typescript";
import ReactMarkdown from "react-markdown";
import "./DescriptionArea.css";

function DescriptionArea({ children }: { children: string }) {
  return (
    <div className="DescriptionArea">
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}

export default DescriptionArea;
