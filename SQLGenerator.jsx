import styles from './index.module.css';
import { useState } from 'react';
import sqlLogo from './assets/sql_logo.png';
import { useNavigate } from 'react-router-dom';

function SQLGenerator() {
  const navigate = useNavigate();
  const [queryDescription, setQueryDescription] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  }; // This closing brace was missing

  const generateQuery = async () => {
    const response = await fetch("http://localhost:3005/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ queryDescription })
    });

    const data = await response.json();
    return data.response;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const rawResponse = await generateQuery();
      const regex = /```sql\n([\s\S]*?)```([\s\S]*)/i;
      const match = rawResponse.match(regex);
      if (match) {
        setSqlQuery(match[1].trim());
        setExplanation(match[2]?.trim() || "Explanation not available.");
      } else {
        setSqlQuery("Query generation failed.");
        setExplanation("No valid explanation returned.");
      }
    } catch (err) {
      console.error("❌ Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlQuery);
    alert("Query copied to clipboard!");
  };

  return (
    <main className={styles.main}>
      <button onClick={handleLogout}>Logout</button>

      <img src={sqlLogo} alt="SQL Logo" className={styles.icon} />
      <h3>Generate SQL with AI</h3>
      <form onSubmit={onSubmit}>
        <textarea
          rows="6"
          placeholder='Describe your Query'
          onChange={(e) => setQueryDescription(e.target.value)}
          className={styles.textArea}
          value={queryDescription}
        />
        <input type='submit' value="Generate query" />
      </form>

      {loading && (
        <div className={styles.spinner}></div>
      )}

      {sqlQuery && (
        <div className={styles.outputBlock}>
          <div className={styles.queryBlock}>
            <div className={styles.queryHeader}>
              <strong>SQL Query</strong>
              <button onClick={copyToClipboard}>Copy</button>
            </div>
            <pre><code>{sqlQuery}</code></pre>
          </div>

          <div className={styles.descriptionBlock}>
            <strong>Explanation</strong>
            <p>{explanation}</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default SQLGenerator;