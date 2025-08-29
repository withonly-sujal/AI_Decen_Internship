import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, FileText, Save } from "lucide-react";

export default function NotesGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [savedCid, setSavedCid] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const generateNotes = async () => {
    if (!file) return;
    setLoading(true);
    setSummary("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/summarize", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Summarization failed");

      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      console.error(err);
      alert("Error generating notes.");
    } finally {
      setLoading(false);
    }
  };

    const saveToIPFS = async () => {
        if (!summary) return;
        setLoading(true);
        setSavedCid("");
    
        try {
        const res = await fetch("/api/ipfs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: summary }),
        });
    
        if (!res.ok) throw new Error("IPFS save failed");
    
        const data = await res.json();
        setSavedCid(data.ipfsHash);
        } catch (err) {
        console.error(err);
        alert("Error saving to IPFS.");
        } finally {
        setLoading(false);
        }
    };

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <Card className="w-full max-w-xl p-6 shadow-lg rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">AI + Decentralized Study Notes Generator</h2>
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileUpload}
          className="mb-4"
        />
        <Button
          onClick={generateNotes}
          disabled={!file || loading}
          className="w-full flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <FileText size={18} />}
          Generate Notes
        </Button>
      </Card>

      {summary && (
        <Card className="w-full max-w-xl p-6 shadow-lg rounded-2xl">
          <h3 className="text-lg font-semibold mb-2">Generated Notes</h3>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-3 rounded-lg">
              {summary}
            </pre>
            <Button
              onClick={saveToIPFS}
              disabled={loading}
              className="mt-4 flex items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Save size={18} />}
              Save to IPFS
            </Button>
            {savedCid && (
              <p className="mt-2 text-sm text-green-600">
                ✅ Saved to IPFS! CID: <code>{savedCid}</code>
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

