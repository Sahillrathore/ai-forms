export default function safeParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
