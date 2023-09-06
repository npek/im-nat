import { DocSentence } from "./hooks/useWiki";

export function processSentence(sentence: DocSentence): JSX.Element {
  let processedText: JSX.Element[] = [];
  let currentText = sentence.text;

  sentence.links.forEach((link) => {
    const linkIndex = currentText.indexOf(link.text);
    if (linkIndex !== -1) {
      // Add text before the link
      processedText.push(
        <span key={processedText.length}>
          {currentText.substring(0, linkIndex)}
        </span>
      );

      // Add the link
      const href =
        link.type === "internal"
          ? `/playground/wikipedia/${link.page}`
          : link.site;
      processedText.push(
        <a
          className="underline italic glitch"
          key={processedText.length}
          href={href}
          target={link.type === "internal" ? "_self" : "_blank"}
          rel="noopener noreferrer"
          data-text={link.text}
        >
          {link.text}
        </a>
      );

      currentText = currentText.substring(linkIndex + link.text.length);
    }
  });

  // Add any remaining text
  processedText.push(<span key={processedText.length}>{currentText}</span>);

  return <>{processedText}</>;
}
