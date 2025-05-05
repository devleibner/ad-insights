import AnomaliesTable from './components/AnomaliesTable';
import SummaryPanel from './components/SummaryPanel';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="w-full max-w-6xl xl:ml-[20%]">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-center text-blue-900 drop-shadow-lg tracking-tight">
            Ad Insights Explorer Lite
          </h1>
          <p className="text-center text-gray-600 mt-2 text-lg">
            Analyze ad content, uncover anomalies, and gain insights for safer
            ad campaigns.
          </p>
        </header>
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <AnomaliesTable />
          </section>
          <section>
            <SummaryPanel />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
