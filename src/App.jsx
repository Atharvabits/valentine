import { useState, useEffect, useRef } from "react";

const balloonEmojis = ["🎈", "❤️", "💕", "🩷", "💗", "🫶", "🎀", "💖", "🩵", "🎉"];

function Balloons() {
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    const totalBalloons = 25;
    const newBalloons = [];
    for (let i = 0; i < totalBalloons; i++) {
      newBalloons.push({
        id: i,
        left: Math.random() * 95 + "%",
        emoji: balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)],
        delay: Math.random() * 3 + "s",
        duration: 4 + Math.random() * 4 + "s",
        size: 2 + Math.random() * 2 + "rem",
      });
    }
    setBalloons(newBalloons);

    // Keep spawning new waves
    const interval = setInterval(() => {
      const wave = [];
      for (let i = 0; i < 10; i++) {
        wave.push({
          id: Date.now() + i,
          left: Math.random() * 95 + "%",
          emoji: balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)],
          delay: Math.random() * 2 + "s",
          duration: 4 + Math.random() * 4 + "s",
          size: 2 + Math.random() * 2 + "rem",
        });
      }
      setBalloons((prev) => [...prev.slice(-30), ...wave]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon"
          style={{
            left: b.left,
            animationDelay: b.delay,
            animationDuration: b.duration,
            fontSize: b.size,
          }}
        >
          {b.emoji}
        </div>
      ))}
    </>
  );
}

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [entered, setEntered] = useState(false);
  const audioRef = useRef(null);
  const yesButtonSize = noCount * 20 + 16;

  const handleEnter = () => {
    setEntered(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Is that your final answer?",
      "You're breaking my heart ;(",
      "Plsss? :( You're breaking my heart",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <>
      <audio ref={audioRef} src="/bargad.webm" loop preload="auto" />

      {!entered ? (
        <div
          className="h-screen flex flex-col items-center justify-center cursor-pointer selection:bg-rose-600 selection:text-white text-zinc-900"
          onClick={handleEnter}
        >
          <div className="animate-pulse text-6xl mb-6">💌</div>
          <h1 className="text-3xl md:text-5xl font-bold text-rose-500 mb-4 text-center">
            You have a special message
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 animate-bounce">
            Tap anywhere to open
          </p>
        </div>
      ) : (
        <div className="overflow-hidden flex flex-col items-center justify-center pt-4 h-screen -mt-16 selection:bg-rose-600 selection:text-white text-zinc-900">
          {yesPressed ? (
            <>
              <Balloons />
              <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" />
              <div className="text-4xl md:text-6xl font-bold my-4">
                Ok Yayyyyy!!!
              </div>
            </>
          ) : (
            <>
              <div
                className="fixed float-bounce -z-10 text-2xl md:text-4xl font-bold text-rose-500 drop-shadow-lg opacity-60"
              >
                Forever Yours
              </div>
              <div
                className="fixed float-bounce2 -z-10 text-2xl md:text-4xl font-bold text-rose-500 drop-shadow-lg opacity-60"
              >
                You & Me Always
              </div>
              <img
                className="h-[230px] rounded-lg shadow-lg"
                src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.webp"
              />
              <h1 className="text-4xl md:text-6xl my-4 text-center">
                Ashmita, Will you be my Valentine?
              </h1>
              <div className="flex flex-wrap justify-center gap-2 items-center">
                <button
                  className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mr-4`}
                  style={{ fontSize: yesButtonSize }}
                  onClick={() => setYesPressed(true)}
                >
                  Yes
                </button>
                <button
                  onClick={handleNoClick}
                  className=" bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-bold py-2 px-4"
                >
                  {noCount === 0 ? "No" : getNoButtonText()}
                </button>
              </div>
            </>
          )}
          <Footer />
        </div>
      )}
    </>
  );
}
const Footer = () => {
  return (
    <a
      
    >
      
    </a>
  );
};

