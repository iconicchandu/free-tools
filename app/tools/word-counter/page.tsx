import WordCounterClient from "./client"

export const metadata = {
  title: "Word Counter – SaaS Tools",
  description: "Count words, characters, and sentences in real-time.",
}

export default function Page() {
  return <WordCounterClient />
}
