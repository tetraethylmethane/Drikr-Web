import { Fragment } from 'react';

/**
 * Renders `**bold**` inside a translated string.
 *
 * Emphasis has to live in the copy, not in the markup: which words carry the
 * weight of a sentence changes completely between English, Hindi and Tamil, and
 * a component that bolds "the second phrase" would land on the wrong words in
 * two languages out of three. Marking it inline lets each translation decide
 * for itself.
 *
 * Deliberately not a markdown parser — one delimiter, no nesting, no links. A
 * dependency to render bold text would be a poor trade.
 */
export function rich(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    // Odd indices are the captured groups, i.e. whatever sat between the stars.
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-primary">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
