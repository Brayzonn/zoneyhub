import {
  GamingIcon,
  MusicIcon,
  ReadingIcon,
  SpotifyIcon,
  BackArrowIcon,
} from "../components/Icons";

const Hobbies = () => {
  const hobbies = [
    {
      title: "Gaming",
      description:
        "My EA SPORTS FC season ranking is definitely more consistent than my sleep schedule. Friendlies? Find me @sxvven, just don't be that person who does a 30-second celebration dance for a tap-in goal",
      icon: <GamingIcon />,
    },
    {
      title: "Music",
      description:
        "Self-proclaimed playlist architect. If we've shared more than two conversations, chances are I've already crafted you a playlist. Ask about my all-time favorite album and, I'll say NOTCW by Amir Obe. Curious about my sound? Check out some of my Spotify playlists",
      spotifyLink:
        "https://open.spotify.com/user/bxfo4j553dt8092g97nwpeskr?si=I8Lq34ooT7GfyoQVQIWq7A",
      icon: <MusicIcon />,
    },
    {
      title: "Reading",
      description:
        "Book enthusiast currently on an unplanned hiatus. Dan Brown remains my all-time favorite author. I miss reading about Robert Langdon's adventures, racing through museums and ancient churches, solving intricate puzzles. Planning a reunion with my books soon... right after I finish 'just one more' EA FC season.",
      icon: <ReadingIcon />,
    },
  ];

  return (
    <div className="bg-primary-bg-color py-[3rem] text-white min-h-screen w-full flex flex-col justify-start items-start overflow-hidden font-mono">
      <div className="relative h-full w-full overflow-hidden flex flex-col justify-start items-start p-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="pt-8 flex items-center font-mono text-sm mb-6 hover:text-gray-400 transition-colors group"
        >
          <BackArrowIcon />
          Back to Home
        </button>

        <div className="py-8 w-full pb-16">
          <h2 className="font-mono text-left font-medium text-2xl mb-4">
            Hobbies
          </h2>
          <p className="text-gray-300 tracking-wide text-left font-normal text-base mt-1 max-w-2xl mb-8">
            When I&apos;m not building web applications, you&apos;ll find me
            exploring these interests.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
            {hobbies.map((hobby) => (
              <div
                key={hobby.title}
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 mr-3 flex-shrink-0">
                    {hobby.icon}
                  </div>
                  <h3 className="font-mono text-lg font-medium">
                    {hobby.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-sm tracking-wide leading-relaxed">
                  {hobby.description}
                  {hobby.spotifyLink && (
                    <>
                      {" "}
                      <a
                        href={hobby.spotifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-4 font-mono text-sm py-2 px-3 bg-green-500 hover:bg-green-400 text-black font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-1"
                      >
                        <SpotifyIcon />
                        Listen on Spotify
                      </a>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hobbies;
