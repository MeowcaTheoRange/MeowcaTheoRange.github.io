import "./App.css";
import Profile from "./components/Profile";
import MediaBox from "./components/MediaBox";
import DescriptionArea from "./components/DescriptionArea";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div
        className="mainContent"
        style={{
          left: isOpen ? "0" : "max(-100%, -960px)",
        }}
      >
        <button className="hideButton" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "<<" : ">>"}
        </button>
        <div className="App" id="main">
          <Profile
            name="MeowcaTheoRange"
            pronunciationMap="miaʊkəθɪoʊreɪnʤ"
            pronunciationMapSimple="meow-cuh-thee-oh-raynj"
            pronouns="he/him"
            birthday="Aug 7 (Minor)"
          />
          <div className="centej"></div>
          <hr />
          <div className="centej">
            <MediaBox
              icon="mastodon"
              link="https://karkatdyinginagluetrap.com/@trollcall"
              name="Mastodon"
              color="FFBBBB"
            />
            <MediaBox
              icon="art-book"
              link="https://mastodon.art/@trollcall"
              name="Mastodon (Art)"
              color="FFBBBB"
            />
            <MediaBox
              icon="github"
              link="https://github.com/MeowcaTheoRange"
              name="GitHub"
              color="FFBBBB"
            />
            <MediaBox
              icon="discord"
              iconPack="sf-black-filled"
              link="http://discord.trollcall.xyz/"
              name="TrollCall Discord"
              color="FFBBBB"
            />
            <MediaBox
              icon="homestuck"
              iconPack="small"
              link="https://mspfa.com/user/?u=109014333296332953331"
              name="MSPFA"
              color="FFBBBB"
            />
          </div>
        </div>
        <div className="App alignLeft">
          <DescriptionArea>{`# DO NOT INTERACT IF:
- You use slurs you can't reclaim
- You ure overly sexual, ALL of the time.
- You try to create small talk in DMs, unless we're friends (but still, PLEASE only DM me for A REASON!)
- You are Microsoft, Google, or any other large company. **/s**
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

## Indecision may or may not be my problem. 

This is my **third** portfolio page! Isn't that insane?

I use Linux, and I'm currently using **Fedora Linux** right now, although that could change. I still have my old install of Ubuntu sitting somewhere on my computer.

## I'm not great at expressing myself, while being great at expressing myself.

I have **ADHD**, which makes it kind of hard to focus on my tasks sometimes, but occasionally, I pull through like a race horse if the circumstances are right!

I am also very social! You can find me on [Discord](#main) or [Mastodon](#main), and I'll usually be happy to talk to you if I'm not busy.

- ##### My moirail ♦️ [Madison Madisongs](https://madisongs.carrd.co/) (she/her) and I are like clockwork, working in step almost perfectly.

I met Madison Madisongs in the YouTube comment section of some Rush E remix song. I forgot which, but it was Rush E. Then I joined her Discord server.

- ##### I've worked with [RaminDetergent](https://twitter.com/ramindetergent) (she/they) on quite a bit of lore, although we aren't yet sure where to put it. There's a lot.

I met RaminDetergent on Twitter. I forgot specifically where from.

- ##### [redact](https://karkatdyinginagluetrap.com/@redact) (she/they/it) is super fucking cool because she runs [karkatdyinginagluetrap.com](https://karkatdyinginagluetrap.com), a Mastodon instance that I use as my personal instance.

I met Redact on Twitter, through Exceptional Minge's stupidity. We both corrected him, I commented under her post, and then we kinda just clicked. Boom fucking epic.

- ##### [blanknam3d](https://linktr.ee/blanknam3d) (he/him) pissed on my carpet.

I met him on Twitter. That's all. The origins of Catboy Musical are unknown.`}
          </DescriptionArea>
        </div>
      </div>
    </>
  );
}

export default App;
