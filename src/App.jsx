import { useState } from "react";
import { RingLoader } from "react-spinners";
import "./App.css";

function App() {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleGetAdvice() {
    setLoading(true);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdvice(data.slip);
    } catch (e) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Get Your Advice For The Day</h1>
        <button className="fetch-button" onClick={handleGetAdvice} disabled={loading}>
          {loading ? "Please wait..." : "Get Your Wise Advice for the Day"}
        </button>
      </div>

      <div className="result">
        {loading && <RingLoader
          color="skyblue"
          size={100} />}
        {advice && <p className = "advice">"{advice.advice}"</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;
