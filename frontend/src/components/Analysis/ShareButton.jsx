import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copyLink}
      className="px-4 py-2 bg-green-500 text-white rounded-xl"
    >
      {copied ? "Copied!" : "Copy Share Link"}
    </button>
  );
}