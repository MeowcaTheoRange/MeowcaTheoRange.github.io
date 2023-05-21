import "./App.css";
import Profile from "./components/Profile";
import MediaBox from "./components/MediaBox";
import DescriptionArea from "./components/DescriptionArea";
import { useState } from "react";
import FunFactRandom from "./components/FunFactRandom";
import QuaverPlayer from "./components/QuaverPlayer";
import QuaverScores from "./components/QuaverScores";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isFull, setIsFull] = useState(false);
  return (
    <>
      <div
        className="mainContent"
        style={{
          left: isOpen ? "0" : "-960px",
          width: isFull ? "100vw" : "",
        }}
      >
        <div className="effectButtons">
          <button
            className="hideButton"
            onClick={() => {
              setIsOpen(!isOpen);
              setIsFull(false);
            }}
          >
            {isOpen ? "<<" : ">>"}
          </button>
          <button
            className="hideButton fullButton"
            onClick={() => {
              setIsFull(!isFull);
              setIsOpen(true);
            }}
          >
            {isFull ? "|<" : "<>"}
          </button>
        </div>
        <div className="App" id="main">
          <Profile
            name="MeowcaTheoRange"
            pronunciationMap="miaʊkəθɪoʊreɪnʤ"
            pronunciationMapSimple="meow-cuh-thee-oh-raynj"
            pronouns="he/him"
            birthday="Aug 7 (Minor)"
          />
          <hr />
          <div className="centej">
            <MediaBox
              icon="mastodon"
              link="https://karkatdyinginagluetrap.com/@trollcall"
              name="Mastodon"
              color="ffddbb"
            />
            <MediaBox
              icon="art-book"
              link="https://mastodon.art/@trollcall"
              name="Mastodon (Art)"
              color="ffddbb"
            />
            <MediaBox
              icon="github"
              link="https://github.com/MeowcaTheoRange"
              name="GitHub"
              color="ffddbb"
            />
            <MediaBox
              icon="discord"
              iconPack="sf-black-filled"
              link="http://discord.trollcall.xyz/"
              name="TrollCall Discord"
              color="ffddbb"
            />
            <MediaBox
              icon="homestuck"
              iconPack="small"
              link="https://mspfa.com/user/?u=109014333296332953331"
              name="MSPFA"
              color="ffddbb"
            />
          </div>
        </div>
        <div className="App alignLeft">
          <FunFactRandom
            funFacts={[
              "I'm technically ambidextrous! I hold pens with my left hand, yet I use pointing devices with my right hand.",
              "I use Fedora Linux.",
              "Spoiler alert: I like *Homestuck*.",
              "I recommend the artists *bill wurtz*, *GRiZ*, *Jantsen*, *Galantis*, and *Two Door Cinema Club* in that uncertain order.",
              "My profile picture is Traobi Dunbat. It was drawn by [Dio Dan](https://barmecidebiohazard.tumblr.com/)!",
              "I'm moirails ♦️ with Madisongs.",
              "This website is made in React, using **create-react-app** and Typescript.",
              "I am deathly scared of *Fergalicious*.",
              "I own a full-color copy of *House of Leaves*!",
              "Blarg.",
              "According to the *Hiveswap* *Extended Zodiac*, I am a *Lepio*. That's Leo, *Prospit*, and *Light*.",
              "This website is inspired by the work of [FlaringK](https://flaringk.github.io/). Check out their [CSS textboxes](https://mspfa.com/?s=41577), they're pretty cool!",
              "Not to brag or anything, but I'm quite good at rhythm games.",
              "This fun fact typing animation was inspired by the [Bletchley Park Google easter egg](https://www.google.com/search?q=bletchley+park).",
            ]}
          />
        </div>
        <div className="App alignLeft">
          <DescriptionArea>{`# Don't interact if
- You are racist, homophobic, any of the ["basic DNI criteria"](https://dni-criteria.carrd.co/) or whatevs (I FUCKING HATE CARRD)
- You are overly sexual, ALL of the time.
- You try to create small talk in DMs, unless we're friends.
- You are a series of precarious setups made to work together in a strained environment (e.g. a heavy box on a small desk or a bodged application/tool put into production)`}</DescriptionArea>
        </div>
        <div className="App alignLeft">
          <DescriptionArea>
            {`# Hi! I'm **MeowcaTheoRange**.
I'm also professionally known as *Theo Range* sometimes, although that's not my actual name.
 
*(Want to know my actual name? Too bad. Explode.)*
## I develop things as a hobby.
You can see my projects scrolling by in the background, actually!

Usually, I use JavaScript, but sometimes I also use Typescript if I'm feeling fancy, or Haxe if I'm feeling, y'know, **sane**.

I'm currently experimenting with React and GTK right now in JavaScript affairs. 

My opinion on React is that it's pretty great, and it helps me integate HTML with JS effectively, especially with JSX. This portfolio website is made with React.

I haven't made projects in Haxe for a while, but I would usually use **HaxeUI** or **HaxeFlixel**.

I'm quite good at adapting to new environments, like when I moved TrollCallNext from a local MongoDB instance to Firebase, and I had to adapt all of the code. That wasn't too hard, because I could use the **firebase** and **yup** packages for database management and schema validation respectively.

## Indecision may or may not be my problem. 

This is my **third** portfolio page! Isn't that insane?

I use Linux, and I'm currently using **Fedora Linux** right now, although that could change. I still have my old install of Ubuntu sitting somewhere on my computer.

## I'm not great at expressing myself, while being great at expressing myself.

I have **ADHD**, which makes it kind of hard to focus on my tasks sometimes, but occasionally, I pull through like a race horse if the circumstances are right!

I am also very social! You can find me on [Discord](#main) or [Mastodon](#main), and I'll usually be happy to talk to you if it's something we're both interested in.

- ##### My [moirail ♦️](https://mspaintadventures.fandom.com/wiki/Moirallegience) [Madisongs](https://madisongs.carrd.co/) (she/her) and I are like clockwork, working in step almost perfectly.

I met Madisongs in the YouTube comment section of some Rush E remix song. I forgot which, but it was Rush E. Then I joined her Discord server.

- ##### I've worked with [RaminDetergent](https://twitter.com/ramindetergent) (she/they) on quite a bit of lore, although we aren't yet sure where to put it. There's a lot.

I met RaminDetergent on Twitter. I forgot specifically where from.

- ##### [redact](https://karkatdyinginagluetrap.com/@redact) (she/they/it) is super fucking cool because she runs [karkatdyinginagluetrap.com](https://karkatdyinginagluetrap.com), a Mastodon instance that I use as my personal instance.

I met Redact on Twitter, through Exceptional Minge's stupidity. We both corrected him, I commented under her post, and then we kinda just clicked. Boom fucking epic.

- ##### [blanknam3d](https://linktr.ee/blanknam3d) (he/him) pissed on my carpet.

I met him on Twitter. That's all. The origins of Catboy Musical are unknown.`}
          </DescriptionArea>
        </div>
        <div className="App">
          <QuaverPlayer id="108492" />
          <DescriptionArea>{`I play a bit of *Quaver*. It's a fun pastime. It also helps me calibrate my reflexes! I think. Here are my scores.`}</DescriptionArea>
          <hr />
          <QuaverScores id="108492" />
        </div>
      </div>
    </>
  );
}

export default App;
