import { Fragment } from "react";

/** "*강조*" → <em>, "\n" → <br /> 로 바꿔 보여줍니다. */
export default function Rich({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {line.split("*").map((part, j) => (j % 2 ? <em key={j}>{part}</em> : <Fragment key={j}>{part}</Fragment>))}
          {i < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}
