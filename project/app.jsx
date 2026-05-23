const { useState: useStateA } = React;

function App() {
  const [page, setPage] = useStateA("home");

  const go = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    if (page === "home") return <HomePage go={go} />;
    if (page === "services") return <ServicesPage go={go} />;
    if (page === "realisations") return <RealisationsPage go={go} />;
    if (page === "contact") return <ContactPage />;
    if (SERVICE_KEYS.includes(page)) return <ServicePage slug={page} go={go} />;
    return <HomePage go={go} />;
  };

  return (
    <div
      className="min-h-screen bg-[#F7F4ED] text-[#0A0A0A] antialiased"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <Header go={go} current={page} />
      <main key={page} className="animate-fadeIn">
        {renderPage()}
      </main>
      <Footer go={go} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
