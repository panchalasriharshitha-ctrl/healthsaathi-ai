import { useState } from "react";
import "./App.css";

const initialMedicines = [
  { id: 1, name: "Vitamin D", dose: "As prescribed", time: "9:00 AM", done: false },
  { id: 2, name: "Daily medicine", dose: "As prescribed", time: "8:00 PM", done: false },
];

const appointments = [
  { doctor: "Dr. Priya Sharma", type: "General Physician", date: "Oct 14, 2026", time: "10:30 AM" },
  { doctor: "Dr. Rahul Verma", type: "Dental Checkup", date: "Oct 18, 2026", time: "3:00 PM" },
];

function App() {
  const [page, setPage] = useState("Dashboard");
  const [medicines, setMedicines] = useState(initialMedicines);
  const [chat, setChat] = useState([
    { role: "bot", text: "Hi! I'm your HealthSaathi assistant. I can help you organize your health information. What would you like help with?" },
  ]);
  const [message, setMessage] = useState("");
  const [report, setReport] = useState("");
  const [newMedicine, setNewMedicine] = useState("");
  const [toast, setToast] = useState("");

  const navItems = [
    ["Dashboard", "▦"],
    ["Health Reports", "▤"],
    ["Medicines", "✚"],
    ["Appointments", "▣"],
    ["Health Assistant", "✧"],
  ];

  function notify(text) {
    setToast(text);
    setTimeout(() => setToast(""), 2500);
  }

  function sendMessage(e) {
    e.preventDefault();
    if (!message.trim()) return;
    const question = message.trim();
    setChat((old) => [
      ...old,
      { role: "user", text: question },
      {
        role: "bot",
        text: "I can help you organize your health questions and explain general health information. I can't diagnose conditions or prescribe treatment. For personal medical advice, please consult a qualified healthcare professional.",
      },
    ]);
    setMessage("");
  }

  function addMedicine(e) {
    e.preventDefault();
    if (!newMedicine.trim()) return;
    setMedicines((old) => [
      ...old,
      {
        id: Date.now(),
        name: newMedicine.trim(),
        dose: "Add prescribed dose",
        time: "Set reminder",
        done: false,
      },
    ]);
    setNewMedicine("");
    notify("Medicine added to your list!");
  }

  function toggleMedicine(id) {
    setMedicines((old) =>
      old.map((m) => (m.id === id ? { ...m, done: !m.done } : m))
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">✚</div>
          <div>
            <h2>HealthSaathi</h2>
            <span>YOUR HEALTH COMPANION</span>
          </div>
        </div>

        <p className="menu-label">MENU</p>
        <nav>
          {navItems.map(([name, icon]) => (
            <button
              key={name}
              className={`nav-item ${page === name ? "active" : ""}`}
              onClick={() => setPage(name)}
            >
              <span className="nav-icon">{icon}</span>
              {name}
              {name === "Health Assistant" && <span className="new-tag">AI</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="help-card">
            <span className="help-icon">♡</span>
            <strong>Your health matters</strong>
            <p>Small steps today, a healthier tomorrow.</p>
          </div>
          <div className="profile">
            <div className="avatar">H</div>
            <div><strong>Health User</strong><span>Personal account</span></div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">YOUR PERSONAL HEALTH SPACE</p>
            <h1>{page === "Dashboard" ? "Good day! 👋" : page}</h1>
          </div>
          <div className="topbar-right">
            <span className="secure-label">♧ Secure health space</span>
            <div className="avatar top-avatar">H</div>
          </div>
        </header>

        {toast && <div className="toast">{toast}</div>}

        {page === "Dashboard" && (
          <>
            <section className="welcome-banner">
              <div className="welcome-copy">
                <span className="banner-tag">✦ YOUR WELLNESS JOURNEY</span>
                <h2>Better health starts<br />with understanding.</h2>
                <p>Keep your health information organized, stay on top of your routine, and feel more prepared for your next doctor visit.</p>
                <button className="primary-button" onClick={() => setPage("Health Reports")}>
                  Explore health reports <span>→</span>
                </button>
              </div>
              <div className="wellness-art" aria-hidden="true">
                <div className="art-circle circle-one"></div>
                <div className="art-circle circle-two"></div>
                <div className="heart">♡</div>
                <div className="art-cross">✚</div>
                <div className="art-spark">✦</div>
              </div>
            </section>

            <div className="section-heading">
              <div><h2>Your health overview</h2><p>A quick look at your personal health organizer.</p></div>
              <span className="today-pill">● Demo data</span>
            </div>

            <section className="stats-grid">
              <div className="stat-card">
                <div className="stat-top"><span className="stat-icon purple">▤</span><span className="stat-caption">ORGANIZED</span></div>
                <h3>03</h3><p>Health reports</p><span className="stat-foot">Sample records</span>
              </div>
              <div className="stat-card">
                <div className="stat-top"><span className="stat-icon green">✚</span><span className="stat-caption">YOUR ROUTINE</span></div>
                <h3>{medicines.filter((m) => !m.done).length.toString().padStart(2, "0")}</h3><p>Pending reminders</p><span className="stat-foot">Mark medicines as done</span>
              </div>
              <div className="stat-card">
                <div className="stat-top"><span className="stat-icon orange">▣</span><span className="stat-caption">UPCOMING</span></div>
                <h3>{appointments.length.toString().padStart(2, "0")}</h3><p>Appointments</p><span className="stat-foot">Sample schedule</span>
              </div>
              <div className="stat-card">
                <div className="stat-top"><span className="stat-icon blue">♡</span><span className="stat-caption">WELLNESS</span></div>
                <h3>01</h3><p>Health profile</p><span className="stat-foot">Your information hub</span>
              </div>
            </section>

            <section className="dashboard-columns">
              <div className="panel">
                <div className="panel-heading"><div><h2>Medicine reminders</h2><p>Keep track of your daily routine.</p></div><button className="text-button" onClick={() => setPage("Medicines")}>View all →</button></div>
                {medicines.slice(0, 3).map((m) => (
                  <div className="medicine-row" key={m.id}>
                    <div className="medicine-symbol">✚</div>
                    <div className="medicine-info"><strong>{m.name}</strong><span>{m.dose} · {m.time}</span></div>
                    <button className={`check-button ${m.done ? "checked" : ""}`} onClick={() => toggleMedicine(m.id)}>{m.done ? "✓ Done" : "Mark done"}</button>
                  </div>
                ))}
                <button className="outline-button full-button" onClick={() => setPage("Medicines")}>+ Manage medicines</button>
              </div>

              <div className="panel">
                <div className="panel-heading"><div><h2>Upcoming appointments</h2><p>Stay prepared for your visits.</p></div><button className="text-button" onClick={() => setPage("Appointments")}>View all →</button></div>
                {appointments.map((a) => (
                  <div className="appointment-row" key={a.doctor}>
                    <div className="calendar-icon"><span>{a.date.split(" ")[0].slice(0, 3).toUpperCase()}</span><strong>{a.date.split(" ")[1].replace(",", "")}</strong></div>
                    <div className="medicine-info"><strong>{a.doctor}</strong><span>{a.type}</span><span>{a.time}</span></div>
                  </div>
                ))}
              </div>
            </section>

            <section className="assistant-banner">
              <div className="assistant-symbol">✧</div>
              <div><h3>Have a health question?</h3><p>Get help organizing questions for your next healthcare visit.</p></div>
              <button className="primary-button" onClick={() => setPage("Health Assistant")}>Talk to assistant →</button>
            </section>
          </>
        )}

        {page === "Health Reports" && (
          <section className="panel page-panel">
            <div className="page-intro"><div className="large-icon purple">▤</div><div><h2>Medical report explainer</h2><p>Explore sample report information and prepare questions for your clinician.</p></div></div>
            <div className="notice">ⓘ This is a demo using sample values, not your personal medical results. Lab ranges can vary by laboratory and individual circumstances.</div>
            <h3 className="subheading">Sample report overview</h3>
            <div className="report-table">
              <div className="report-row report-head"><span>Test</span><span>Sample value</span><span>What it means</span></div>
              <div className="report-row"><strong>Hemoglobin</strong><span>Sample: 13.5 g/dL</span><span>A protein that carries oxygen in blood.</span></div>
              <div className="report-row"><strong>Vitamin D</strong><span>Sample: 28 ng/mL</span><span>Supports bone health; interpretation depends on context.</span></div>
              <div className="report-row"><strong>Blood glucose</strong><span>Sample: 92 mg/dL</span><span>Blood sugar result; fasting status matters.</span></div>
            </div>
            <label className="field-label" htmlFor="report">Questions about a report</label>
            <textarea id="report" className="text-area" value={report} onChange={(e) => setReport(e.target.value)} placeholder="Type a test name or question you want to discuss with your doctor..." />
            <button className="primary-button" onClick={() => notify(report.trim() ? "Question saved for your clinician discussion." : "Please type a question first.")}>Save question</button>
            <p className="disclaimer">This demo does not diagnose conditions or replace a qualified healthcare professional.</p>
          </section>
        )}

        {page === "Medicines" && (
          <section className="panel page-panel">
            <div className="page-intro"><div className="large-icon green">✚</div><div><h2>Medicine organizer</h2><p>Keep a simple list of medicines and reminders provided by your healthcare professional.</p></div></div>
            <form className="add-form" onSubmit={addMedicine}><input value={newMedicine} onChange={(e) => setNewMedicine(e.target.value)} placeholder="Enter medicine name" aria-label="Medicine name" /><button className="primary-button">+ Add medicine</button></form>
            {medicines.map((m) => <div className="medicine-row large-row" key={m.id}><div className="medicine-symbol">✚</div><div className="medicine-info"><strong>{m.name}</strong><span>{m.dose} · {m.time}</span></div><button className={`check-button ${m.done ? "checked" : ""}`} onClick={() => toggleMedicine(m.id)}>{m.done ? "✓ Done" : "Mark done"}</button></div>)}
            <div className="notice">Please follow the dose and schedule prescribed by your clinician. This demo does not send real notifications.</div>
          </section>
        )}

        {page === "Appointments" && (
          <section className="panel page-panel">
            <div className="page-intro"><div className="large-icon orange">▣</div><div><h2>Appointment tracker</h2><p>Sample appointments to help you plan your healthcare visits.</p></div></div>
            {appointments.map((a) => <div className="appointment-card" key={a.doctor}><div className="calendar-icon"><span>{a.date.split(" ")[0].slice(0, 3).toUpperCase()}</span><strong>{a.date.split(" ")[1].replace(",", "")}</strong></div><div className="medicine-info"><strong>{a.doctor}</strong><span>{a.type}</span><span>{a.time}</span></div><span className="status-pill">Scheduled · Demo</span></div>)}
            <div className="notice">These are sample records only. Confirm real appointments directly with your clinic.</div>
          </section>
        )}

        {page === "Health Assistant" && (
          <section className="panel chat-panel">
            <div className="page-intro"><div className="large-icon blue">✧</div><div><h2>HealthSaathi assistant</h2><p>A demo chat for general health information and visit preparation.</p></div></div>
            <div className="chat-messages">
              {chat.map((c, i) => <div className={`chat-bubble ${c.role}`} key={i}><span>{c.role === "bot" ? "✧ HealthSaathi" : "You"}</span><p>{c.text}</p></div>)}
            </div>
            <form className="chat-form" onSubmit={sendMessage}><input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask a general health question..." aria-label="Chat message" /><button className="primary-button">Send ↑</button></form>
            <p className="disclaimer">For emergencies, contact local emergency services. This demo cannot diagnose or prescribe treatment.</p>
          </section>
        )}

        <footer className="footer"><span>✚ HealthSaathi AI</span><span>Built for HackXlerate 2026 · Prototype demo</span></footer>
      </main>
    </div>
  );
}

export default App;