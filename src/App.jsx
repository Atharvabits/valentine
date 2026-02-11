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

function LoveLetter() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-4 z-10">
      {!opened ? (
        <div className="flex flex-col items-center gap-6 animate-fadeIn">
          <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" className="h-[150px]" />
          <div className="text-3xl md:text-5xl font-bold text-rose-600">
            Yayyy!!!
          </div>
          <p className="text-lg md:text-xl text-zinc-700">
            I wrote something for you...
          </p>
          <div
            className="envelope-container cursor-pointer"
            onClick={() => setOpened(true)}
          >
            <div className="envelope">
              <div className="envelope-flap"></div>
              <div className="envelope-body"></div>
              <div className="envelope-letter-peek">💌</div>
            </div>
            <p className="text-rose-500 font-bold mt-4 animate-bounce text-lg">
              Tap to open the letter
            </p>
          </div>
        </div>
      ) : (
        <div className="letter-open animate-fadeIn max-w-lg mx-4 md:mx-auto">
          <div className="letter-paper bg-amber-50 rounded-xl shadow-2xl p-6 md:p-10 border-2 border-rose-200 relative overflow-hidden">
            <div className="absolute top-3 right-4 text-3xl opacity-30">💕</div>
            <div className="absolute bottom-3 left-4 text-3xl opacity-30">🌹</div>
            <p className="text-rose-400 text-sm mb-3 italic">To my dearest...</p>
            <h2 className="text-2xl md:text-3xl font-bold text-rose-600 mb-4">
              Dear Ashmita,
            </h2>
            <div className="text-zinc-700 text-base md:text-lg leading-relaxed space-y-3 letter-text">
              <p>
                From the very first moment I saw you, something inside me just knew — you were special. Your smile lights up even my darkest days, and your laugh is my favourite sound in the entire world.
              </p>
              <p>
                Every second I spend with you feels like magic. You make everything better just by being you. I don't need grand gestures or fancy words — all I need is you, right here, by my side.
              </p>
              <p>
                You are my today, my tomorrow, and every day after that. I promise to love you, cherish you, and always make you feel like the most special person in this world — because you are.
              </p>
              <p className="font-bold text-rose-500 text-lg md:text-xl pt-2">
                Forever & always yours,
                <br />
                — Atharva 💗
              </p>
            </div>
          </div>

          {/* Photo Collage */}
          <div className="mt-10 mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-rose-500 text-center mb-6">
              Our Moments Together 💕
            </h3>
            <div className="collage-grid">
              <div className="collage-item collage-item-1">
                <img src="/photo1.png" alt="Us" />
              </div>
              <div className="collage-item collage-item-2">
                <img src="/photo2.png" alt="Us" />
              </div>
              <div className="collage-item collage-item-3">
                <img src="/photo3.png" alt="Us" />
              </div>
              <div className="collage-item collage-item-4">
                <img src="/photo4.png" alt="Us" />
              </div>
            </div>
            <p className="text-center text-rose-400 mt-6 text-lg italic">
              Every moment with you is my favourite memory 🤍
            </p>
          </div>
        </div>
      )}
    </div>
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
        <div className={`flex flex-col items-center justify-center pt-4 selection:bg-rose-600 selection:text-white text-zinc-900 ${yesPressed ? 'min-h-screen overflow-y-auto py-10' : 'overflow-hidden h-screen -mt-16'}`}>
          {yesPressed ? (
            <>
              <Balloons />
              <LoveLetter />
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

