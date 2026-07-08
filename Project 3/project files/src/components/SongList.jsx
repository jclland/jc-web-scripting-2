import SongCard from "./SongCard.jsx";

//holds all the song cards, reusing the SongCard component a bunch of times
function SongList() {
  return (
    <section id="recs" className="song-list">
      <h2>Songs I Recommend Right Now</h2>
      <div className="card-grid">
        <SongCard
          title="tv off"
          art="gnx.jpg"
          artist="Kendrick Lamar"
          genre="Rap"
          rating="9"
        />
        <SongCard
          title="Weird Fishes / Arpeggi"
          art="inrainbows.jpg"
          artist="Radiohead"
          genre="Alt Rock"
          rating="10"
        />
        <SongCard
          title="TV Guide"
          art="vincestaples.jpg"
          artist="Vince Staples"
          genre="Rap/Rock"
          rating="8"
        />
        <SongCard
          title="Knife Prty"
          art="whitepony.jpg"
          artist="Deftones"
          genre="Alt Metal"
          rating="9"
        />
        <SongCard
          title="Walkin"
          art="walkin.png"
          artist="Denzel Curry"
          genre="Rap"
          rating="8"
        />
        <SongCard
          title="Murder Was The Case"
          art="snoop.jpg"
          artist="Snoop Dogg"
          genre="Rap"
          rating="10"
        />
        <SongCard
          title="War"
          art="war.jpg"
          artist="System Of A Down"
          genre="Nu Metal"
          rating="9"
        />
        <SongCard
          title="Song For The Dead"
          art="sftd.png"
          artist="Queens of the Stone Age"
          genre="Hard Rock"
          rating="9"
        />
      </div>
    </section>
  );
}

export default SongList;
