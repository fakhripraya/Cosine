interface FileWithMeta {
  name: string
  type: string
  size: number
  blob?: Blob
  base64?: string
  url?: string
}

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

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}