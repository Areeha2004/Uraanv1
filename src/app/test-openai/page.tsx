"use client";

import { useState } from "react";

export default function TestOpenAIPage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data.result);
      setError("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      setResult("");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Test OpenAI</h2>
      <textarea
        className="w-full border rounded p-2 mt-4"
        rows={5}
        placeholder="Enter your prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Result:</h3>
          <p className="whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
}
