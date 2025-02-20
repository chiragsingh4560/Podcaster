import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../store/player";

const PodcastCard = ({ items }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate(); // Initialize navigate

  const handlePlay = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
      return;
    }

    dispatch(playerActions.setDiv());
    dispatch(playerActions.changeImage(items.frontImage));
    dispatch(playerActions.changeSong(items.audioFile));
  };

  return (
    <div className="border p-4 rounded flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300">
      <Link to={`/description/${items._id}`}>
        <div>
          <img
            src={items.frontImage}
            className="rounded size-[42vh] object-cover"
            alt="Podcast Thumbnail"
          />
        </div>
        <div className="mt-2 text-xl font-bold">{items.title.slice(0, 20)}</div>
        <div className="mt-2 leading-5 text-slate-500">
          {items.description.slice(0, 50)}
        </div>
        <div className="mt-2 bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center">
          {items.category.categoryName}
        </div>
      </Link>

      <button
        onClick={handlePlay}
        className="bg-green-900 text-white px-4 py-2 mt-2 flex items-center justify-center hover:bg-green-700 transition-all duration-300 w-full rounded-full"
      >
        Play Now
      </button>
    </div>
  );
};

export default PodcastCard;
