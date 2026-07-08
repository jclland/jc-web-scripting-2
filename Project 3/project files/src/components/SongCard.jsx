//gets reused for every song, just changes based on the props passed in
function SongCard({ art, title, artist, genre, rating }) {
  return (
    <div className="song-card">
      <h3>{title}</h3>
      <img src={art} className="song-art" alt={`${title} art`} />
      <p className="song-artist">by {artist}</p>
      <p className="song-genre">Genre: {genre}</p>
      <p className="song-rating">My rating: {rating}/10</p>
    </div>
  );
}

export default SongCard;
