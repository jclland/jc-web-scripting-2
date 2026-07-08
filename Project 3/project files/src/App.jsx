import Header from "./components/Header.jsx";
import NavBar from "./components/NavBar.jsx";
import SongList from "./components/SongList.jsx";
import InfoSection from "./components/InfoSection.jsx";
import Footer from "./components/Footer.jsx";

//main app, just puts all the components together in order
function App() {
  return (
    <div id="top">
      <Header />
      <NavBar />
      <main>
        <SongList />
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
