import { Link } from "react-router-dom";

const Hobbies = () => {
  const hobbies = [
    {
      title: "Gaming",
      description:
        "My EA SPORTS FC season ranking is definitely more consistent than my sleep schedule. Friendlies? Find me @sxvven, just don't be that person who does a 30-second celebration dance for a tap-in goal",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-full h-full"
        >
          <rect
            x="2"
            y="6"
            width="20"
            height="12"
            rx="2"
            fill="url(#gamingGradient)"
            stroke="#2C2C2C"
            strokeWidth="1.5"
          />

          <path
            d="M6 12h4"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M8 10v4"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <circle
            cx="17"
            cy="10"
            r="1.2"
            fill="#FF4757"
            stroke="#FF2E43"
            strokeWidth="0.5"
          />

          <circle
            cx="15"
            cy="12"
            r="1.2"
            fill="#5352ED"
            stroke="#3E3DC8"
            strokeWidth="0.5"
          />
          <defs>
            <linearGradient
              id="gamingGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#2C2C2C" />
              <stop offset="100%" stopColor="#454545" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      title: "Music",
      description:
        "Self-proclaimed playlist architect. If we've shared more than two conversations, chances are I've already crafted you a playlist. Ask about my all-time favorite album and, I'll say NOTCW by Amir Obe. Curious about my sound? Check out some of my Spotify playlists",
      spotifyLink:
        "https://open.spotify.com/user/bxfo4j553dt8092g97nwpeskr?si=I8Lq34ooT7GfyoQVQIWq7A",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-full h-full"
        >
          <path
            d="M9 18V5l12-2v13"
            stroke="#8E44AD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          <circle
            cx="6"
            cy="18"
            r="3"
            fill="url(#musicGradient1)"
            stroke="#7D3C98"
            strokeWidth="1.5"
          />

          <circle
            cx="18"
            cy="16"
            r="3"
            fill="url(#musicGradient2)"
            stroke="#7D3C98"
            strokeWidth="1.5"
          />

          <path
            d="M 23,12 C 23,7 20,4 20,4"
            stroke="#9B59B6"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M 23,12 C 23,17 20,20 20,20"
            stroke="#9B59B6"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          {/* Gradients */}
          <defs>
            <linearGradient
              id="musicGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#9B59B6" />
              <stop offset="100%" stopColor="#8E44AD" />
            </linearGradient>
            <linearGradient
              id="musicGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#9B59B6" />
              <stop offset="100%" stopColor="#8E44AD" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    {
      title: "Reading",
      description:
        "Book enthusiast currently on an unplanned hiatus. Dan Brown remains my all-time favorite author. I miss reading about Robert Langdon's adventures, racing through museums and ancient churches, solving intricate puzzles. Planning a reunion with my books soon... right after I finish 'just one more' EA FC season.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-full h-full"
        >
          <path
            d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
            fill="url(#bookGradient1)"
            stroke="#2E86C1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
            fill="url(#bookGradient2)"
            stroke="#2471A3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M12 7v14"
            stroke="#2471A3"
            strokeWidth="1"
            strokeLinecap="round"
          />

          <path
            d="M5 8h3"
            stroke="#AED6F1"
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M5 11h3"
            stroke="#AED6F1"
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M16 8h3"
            stroke="#AED6F1"
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M16 11h3"
            stroke="#AED6F1"
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Gradients */}
          <defs>
            <linearGradient
              id="bookGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3498DB" />
              <stop offset="100%" stopColor="#2980B9" />
            </linearGradient>
            <linearGradient
              id="bookGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#2980B9" />
              <stop offset="100%" stopColor="#2471A3" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
  ];

  return (
    <div className="inconsolata absolute bg-primary-bg-color text-primary-text-color min-h-[100vh] w-full flex flex-col justify-start items-start overflow-hidden">
      <div className="relative h-full w-full overflow-hidden flex flex-col justify-start items-start p-[1rem] sm:px-[3rem]">
        {/* Back button */}
        <Link
          to="/"
          className="pt-[2rem] flex items-center font-mono text-sm mb-6 hover:text-gray-400 transition-colors group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <div className="py-[2rem] w-full">
          <h2 className="font-mono text-left font-[500] text-[25px] mb-4">
            Hobbies
          </h2>
          <p className="sans tracking-wide text-left font-[400] text-[15px] mt-1 max-w-[650px] mb-8">
            When I&apos;m not building web applications, you&apos;ll find me
            exploring these interests.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hobbies.map((hobby) => (
              <div
                key={hobby.title}
                className="bg-gradient-to-br from-[#1A1A1A] to-[#252525] p-6 rounded-lg"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 mr-3">{hobby.icon}</div>
                  <h3 className="font-mono text-lg">{hobby.title}</h3>
                </div>

                <p className="text-gray-300 text-sm tracking-wide">
                  {hobby.description}
                  {hobby.spotifyLink && (
                    <>
                      {" "}
                      <a
                        href={hobby.spotifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-3 font-mono text-sm py-2 px-3 bg-[#1DB954] hover:bg-[#1ED760] text-black font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#1db95466] hover:-translate-y-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          className="mr-2"
                          fill="#000000"
                        >
                          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                        </svg>
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
