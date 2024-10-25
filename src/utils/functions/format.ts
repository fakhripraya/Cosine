export const calculateRows = (
  content: string,
  averageChar: number
) => {
  const lineBreaks =
    (content.match(/\n/g) || []).length + 1;
  const avgCharsPerLine = averageChar; // Adjust this value based on your design
  const rows = Math.max(
    lineBreaks,
    Math.ceil(content.length / avgCharsPerLine)
  );
  return rows;
};
