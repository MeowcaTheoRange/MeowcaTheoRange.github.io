import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./DescriptionArea.css";

function DescriptionArea({ children }: { children: string }) {
  return (
    <div className="DescriptionArea">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{children}</ReactMarkdown>
    </div>
  );
}

export default DescriptionArea;
