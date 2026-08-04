import Layout from "./components/Layout/Layout";
import Background from "./components/Background/Background";

function App() {
  return (
    <Layout>
      <Background />

      <div className="relative z-10 flex h-screen items-center justify-center">
        <h1 className="text-6xl font-bold text-pink-400">
          Forever Begins Today ❤️
        </h1>
      </div>
    </Layout>
  );
}

export default App;