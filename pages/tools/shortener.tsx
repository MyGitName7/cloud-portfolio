import { useState } from "react";

export default function Shortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShortUrl(""); // reset
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SHORT_API}shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      alert("Error shortening URL");
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h1 className="text-2xl font-bold mb-4">Serverless URL Shortener</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          required
        />
        <button type="submit" className="btn">Shorten</button>
      </form>
      {shortUrl && (
        <p className="mt-4">
          Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
