import { useState } from "react";
import "./App.css";
import AddNew from "./components/AddNew";
import Blog from "./components/Blog";
import ClockWidget from "./components/ClockWidget";
import DescriptionArea from "./components/DescriptionArea";
import Events from "./components/Events";
import FunFactRandom from "./components/FunFactRandom";
import Gallery from "./components/Gallery";
import LastFmPlayer from "./components/LastFmPlayer";
import LastFmScores from "./components/LastFmScores";
import MediaBox from "./components/MediaBox";
import Profile from "./components/Profile";
import QuaverPlayer from "./components/QuaverPlayer";
import QuaverScores from "./components/QuaverScores";
import TrollCallProfile from "./components/TrollCallProfile";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isFull, setIsFull] = useState(false);
  var mainColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--fg-color")
    .replace("#", "");
  return (
    <>
      <AddNew />
      <div
        className={`mainContent ${isOpen ? "open" : ""} ${
          isFull ? "full" : ""
        }`}
      >
        <div className="effectButtons">
          <button
            className="hideButton nohover"
            onClick={() => {
              setIsOpen(!isOpen);
              setIsFull(false);
            }}
          >
            {isOpen ? "chevron_left" : "chevron_right"}
          </button>
          <button
            className="hideButton upButton nohover"
            onClick={() => {
              var mainEle = document.querySelector(
                ".mainContent"
              ) as HTMLElement;
              mainEle.scroll({ top: 0, behavior: "smooth" });
            }}
          >
            arrow_upward
          </button>
          <button
            className="hideButton fullButton nohover"
            onClick={() => {
              setIsFull(!isFull);
              setIsOpen(true);
            }}
          >
            {isFull ? "fullscreen_exit" : "fullscreen"}
          </button>
        </div>
        <div className="App" id="main">
          <Profile
            name="MeowcaTheoRange"
            pronunciationMap="miaʊkəθɪoʊreɪnʤ"
            pronunciationMapSimple="meow-cuh-thee-oh-raynj"
            pronouns="he/any"
            birthday="Aug 7"
            age="Minor"
          />
          <ClockWidget />
          <div className="centej">
            <MediaBox
              icon="mastodon"
              link="https://karkatdyinginagluetrap.com/@trollcall"
              name="Mastodon"
              color={mainColor}
            />
            <MediaBox
              icon="matrix-logo"
              iconPack="material"
              link="https://matrix.to/#/@trollcall:thelbutton.com"
              name="Matrix"
              color={mainColor}
            />
            <MediaBox
              icon="github"
              link="https://github.com/MeowcaTheoRange"
              name="GitHub"
              color={mainColor}
            />
            <MediaBox
              icon="discord"
              iconPack="sf-black-filled"
              link="http://discord.trollcall.xyz/"
              name="TrollCall Discord"
              color={mainColor}
            />
            <MediaBox
              icon="homestuck"
              iconPack="small"
              link="https://mspfa.com/user/?u=109014333296332953331"
              name="MSPFA"
              color={mainColor}
            />
            <MediaBox
              icon="ko-fi"
              iconPack="ios"
              link="https://ko-fi.com/meowcatheorange/commissions"
              name="Ko-Fi"
              color={mainColor}
            />
          </div>
          <DescriptionArea>{`# Hey, what's up?
I'm also known as *Theo Range* sometimes in place of a real name, but it should be noted that *Theo* is not my real name.

I like programming (sometimes), drawing art, designing characters, shaping the internet, and obsessing over open-source project specifications.`}</DescriptionArea>
        </div>
        <div className="App alignLeft bad">
          <DescriptionArea>{`# Please do not interact if
- You are racist, homophobic, etc. You know... the bad stuff where you hate people for **who they are**.
- You try to create small talk in DMs, **unless we are friends.**
- You believe in an extreme political/social divide. (a.k.a, "when you interact with someone, you HAVE TO agree/disagree with them 100% on everything!")`}</DescriptionArea>
        </div>
        <div className="App alignLeft">
          <FunFactRandom
            funFacts={[
              "I'm technically ambidextrous! I hold pens with my left hand, yet I use pointing devices with my right hand.",
              "I use Nobara Linux.",
              "I have [very good opinions](https://www.youtube.com/watch?v=OF_5EKNX0Eg) on NVIDIA.",
              "I recommend the artists *Tokyo Machine*, *Virtual Riot*, *GRiZ*, *Jantsen*, *bill wurtz*, and *Galantis* in that uncertain order.",
              "My profile picture is *Tesset Fuema*.",
              "I'm moirails ♦️ with Madisongs.",
              "This website is made in React, using **create-react-app** and Typescript.",
              "I am deathly scared of *Fergalicious*.",
              "This website is inspired by the work of [FlaringK](https://flaringk.github.io/). Check out their [CSS textboxes](https://mspfa.com/?s=41577), they're pretty cool!",
              "Not to brag or anything, but I'm quite good at rhythm games.",
              "This fun fact typing animation was inspired by the [Bletchley Park Google easter egg](https://www.google.com/search?q=bletchley+park).",
            ]}
          />
        </div>
        <div className="App alignLeft">
          <DescriptionArea>{`# Blog
A place where I can talk about stuff.`}</DescriptionArea>
          <Blog url="https://api.abtmtr.link/api/blog/" />
        </div>
        <div className="App alignLeft">
          <DescriptionArea>{`# Events
Events I am going to in the near future. Most are usually in-person.`}</DescriptionArea>
          <Events url="https://api.abtmtr.link/api/events/" />
        </div>
        <div className="App alignLeft">
          <DescriptionArea>{`# Who do I look up to?
My beliefs are gathered from a few different sources. Personally, I support the **Right To Repair** movement, I support **trans rights**, and I also support the **freedom of software usage**.

I'm building a world where some of the main characters believe in **anarcho-communism**, although this is not to say I completely support the social movement myself. I'm interested in it!

Anyway, the people I look up to have indeed founded *some of* these beliefs in my head. Some primary examples I can give are:
## Louis Rossmann [![Rossmann Repair Group](/assets/external/rrg.png)](https://rossmanngroup.com/)
I learned about Louis Rossmann through the initial [CBC report](https://youtu.be/o2_SZ4tfLns) on Apple overcharging users for simple repair. 

To make a long story short, I found some of his videos where he speaks as a mentor, and I took that advice to heart. He's a cool guy.
## Mastodon and the Fediverse [![Join Mastodon](/assets/external/mstdn.svg)](https://joinmastodon.org/)
The Fediverse is a vast place filled with different servers, each hosting a plethora of people. These servers wok together with an protocol called ActivityPub to federate into one large, decentralized social network.

Mastodon is an example of one piece of software for a server, although there are others! But that's besides the point. The Fediverse has put a set of values in my mind to make sure my own site, TrollCall, is as respectable as possible. **No ads, no trackers, not even a single cookie popup or "join our newsletter" prompt.**

Just simple troll sharing. How do I profit from this? **Donations and generous supporters, of course!** I have none right now, but nonetheless, I have ideas in the future to make TrollCall a great network like the Fediverse - decentralized, trolls are shared between servers, maybe everyone has their own TrollCall server? Ooh, idea! I'll be right back.

OK, but seriously. Mastodon and the Fediverse has been a huge influence in how I design TrollCall, and how I should make websites that respect the user.`}</DescriptionArea>
        </div>
        <div className="App alignLeft">
          <DescriptionArea>{`# Art Gallery
A quick overview of some of the things I've drawn. It's not all of them, but it's the ones I'm most proud of.

Want to see commission art? Head over to my [Ko-fi](https://ko-fi.com/meowcatheorange/) to see them, or even buy some!`}</DescriptionArea>
        </div>
        <Gallery
          url="https://api.abtmtr.link/api/gallery/"
          image_url="https://cdn.abtmtr.link/"
        />
        <div className="App alignLeft">
          <DescriptionArea>
            {`## I develop things as a hobby.
You can see my projects scrolling by in the background, actually!

Usually, I use JavaScript, but sometimes I also use Typescript if I'm feeling fancy, or Haxe if I'm feeling, y'know, **sane**.

I'm currently experimenting with React and GTK right now in JavaScript affairs. 

My opinion on React is that it's pretty great, and it helps me integate HTML with JS effectively, especially with JSX. This portfolio website is made with React.

I haven't made projects in Haxe for a while, but I would usually use **HaxeUI** or **HaxeFlixel**.

I'm quite good at adapting to new environments, like when I started using Next.js to develop TrollCallNext. Keep in mind that I did end up recreating it all over again because I wasn't happy with the finished product, but I must say that paid off well. I'm a bit of a perfectionist.

## Indecision may or may not be my problem. 

This is my **third** portfolio page! Isn't that insane?

I use Linux, and I'm currently using **Nobara Linux** right now, although that could change. I still have my old install of Ubuntu sitting somewhere on my computer.

What can I say? I like changing stuff, especially when an exodus of cool new ideas brew in my head as I laugh sinisterly, rubbing my hands together.

My website **TrollCall** is currently on revision version 3.5, entitled **TrollCallNotAgain** internally.

Revision 3 was created and then shelved before release, and it was called **TrollCall Next**. Technically, TrollCall 3.5 is also **TrollCall Next**, but revision 3 is *actually* called **TrollCall Next**.

And even then, I am still working on Revision 4!

My point is, I like making stuff over and over and over and over and — once again — over again. It's fun! Sometimes. Occasionally. When I get the time to do so.

## I'm not great at expressing myself, while being great at expressing myself.

I have **ADHD**, which makes it kind of hard to focus on my tasks sometimes, but occasionally, I pull through like a race horse if the circumstances are right!

I am also very social! You can find me on [Discord](#main) or [Mastodon](#main), and I'll usually be happy to talk to you if it's something we're both interested in.

- ##### My [moirail ♦️](https://mspaintadventures.fandom.com/wiki/Moirallegience) [Madisongs](https://madisongs.carrd.co/) (she/her) and I are like clockwork, working in step almost perfectly.

I met Madisongs in the YouTube comment section of some Rush E remix song. I forgot which, but it was Rush E. Then I joined her Discord server.

- ##### I've worked with [RaminDetergent](https://nitter.it/RaminDetergent) (she/they/he) on quite a bit of lore, although we aren't yet sure where to put it. There's a lot.

I met RaminDetergent on Twitter. I forgot specifically where from.

- ##### [hollandLop](https://ko-fi.com/sakurabfields) A.K.A. *sakurabunnyfields* (it/troll/freak) is a good colleague of mine, and it is [RaminDetergent](https://nitter.it/ramindetergent)'s [moirail ♦️](https://mspaintadventures.fandom.com/wiki/Moirallegience)!

It is planned to be the main question builder for TrollCall. Basically, if you're confused on how to design your fantroll, it is there to help. Not directly; it's just the ones making the questions, hopefully better (and less obtuse) than Hussie ever would.

It is also planning to make the entire website pink.

- ##### [redact](https://karkatdyinginagluetrap.com/@redact) (she/they/it) is super fucking cool because she runs [karkatdyinginagluetrap.com](https://karkatdyinginagluetrap.com), a Mastodon instance that I use as my personal instance.

I met Redact on Twitter, through Exceptional Minge's stupidity. We both corrected him, I commented under her post, and then we kinda just clicked. Boom fucking epic.

- ##### [blanknam3d](https://linktr.ee/blanknam3d) (it's pronounced "blank named") pissed on my carpet.

I met him on Twitter. That's all. The origins of Catboy Musical are unknown.`}
          </DescriptionArea>
        </div>
        <div className="App">
          <TrollCallProfile name="meowcatheorange" />
          <DescriptionArea>{`I don't think I ever told anyone I'm the owner of TrollCall on this site. Here's my TrollCall profile to prove it!`}</DescriptionArea>
        </div>
        <div className="App">
          <LastFmPlayer
            user="MeowcaTheoRange"
            api_key="8f9b0255cc55a19f82d37c22600aff1a"
          />
          <DescriptionArea>{`I listen to music on YouTube Music. Technically, this data is gathered from Last.fm, but I don't use it for anything except YouTube Music.

...Maybe some local tracks.`}</DescriptionArea>
          <hr />
          <LastFmScores
            user="MeowcaTheoRange"
            api_key="8f9b0255cc55a19f82d37c22600aff1a"
          />
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
