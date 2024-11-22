import fs from "fs/promises";
import path from "path";
import ReactMarkdown from "react-markdown";

const components = {
  h1: ({ node, ...props }) => <h1 {...props} />,
  h2: ({ node, ...props }) => <h2 {...props} />,
  h3: ({ node, ...props }) => <h3 {...props} />,
  p: ({ node, ...props }) => <p {...props} />,
  ul: ({ node, ...props }) => <ul {...props} />,
  ol: ({ node, ...props }) => <ol {...props} />,
  li: ({ node, ...props }) => <li {...props} />,
  a: ({ node, ...props }) => <a {...props} />,
  blockquote: ({ node, ...props }) => <blockquote {...props} />,
  code: ({ node, inline, ...props }) =>
    inline ? (
      <code {...props} />
    ) : (
      <pre>
        <code {...props} />
      </pre>
    ),
};

export default async function Home() {
  const resumeContent = await fs.readFile(
    path.join(process.cwd(), "resume.md"),
    "utf8"
  );

  return (
    <div className="resume-content">
      <ReactMarkdown components={components}>{resumeContent}</ReactMarkdown>
    </div>
  );
}
