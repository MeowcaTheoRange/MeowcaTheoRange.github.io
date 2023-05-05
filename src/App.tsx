import React from 'react';
import './App.css';
import Profile from './components/Profile';
import MediaBox from './components/MediaBox';
import DescriptionArea from './components/DescriptionArea';

function App() {
  return (<>
    <div className="mainContent">
      <div className="App">
        <Profile name="MeowcaTheoRange" pronunciationMap="miaʊkəθɪoʊreɪnʤ" pronunciationMapSimple="meow-cuh-thee-oh-raynj" />
        <hr />
        <div className='socialMedia'>
          <MediaBox icon='mastodon' link='https://karkatdyinginagluetrap.com/@trollcall' name='Mastodon' color='FFBBBB' />
          <MediaBox icon='github' link='https://github.com/MeowcaTheoRange' name='GitHub' color='FFBBBB' />
          <MediaBox icon='discord' iconPack='material' link='http://discord.trollcall.xyz/' name='TrollCall Discord' color='FFBBBB' />
          <MediaBox icon='homestuck' link='https://mspfa.com/user/?u=109014333296332953331' name='MSPFA' color='FFBBBB' />
        </div>
      </div>
      <div className="App alignLeft">
        <DescriptionArea>
          <h1>Hi! I'm <b>MeowcaTheoRange</b>.</h1>
          <p>I'm also professionally known as <i>Theo Range</i> sometimes, although that's not my actual name.</p>
          <p><i>(Want to know my actual name? Too bad. Explode.)</i></p>
          <h2>I develop things as a hobby.</h2>
          <p>You can see my projects scrolling by in the background, actually!</p>
          <p>Usually, I use JavaScript, but sometimes I also use Typescript if I'm feeling fancy, or Haxe if I'm feeling, y'know, <b>sane</b>.</p>
          <p>I'm currently experimenting with React and GTK right now in JavaScript affairs. I haven't made projects in Haxe for a while, but I would usually use <b>HaxeUI</b> or <b>HaxeFlixel</b>.</p>
          <h2>I also have a hard time picking what I want, sometimes.</h2>
          <p>This is my <b>third</b> portfolio page! Isn't that insane?</p>
          <p>blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah</p>
        </DescriptionArea>
      </div>
    </div>
  </>);
}

export default App;
