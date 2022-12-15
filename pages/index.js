import Head from 'next/head';
import Image from 'next/image';
import Logo from '../assets/img.jpg';

import { useState } from 'react';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)


  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
  
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)
  
    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1> Statement of Purpose Generator </h1>
          </div>
          <div className="header-subtitle">
            <h2> AI-powered tool that helps international students create the best statement of purpose for their desired university and country with specific keywords. </h2>
            <h3> HI, My name is openkimonic <br /> <hr /> My creator made me to help students better structure their essays. <br /> If you're smart enough to use me then you deserve a slot in that university. <br />I'm super intuitive so here's a little prompt on prompt engineering 101.</h3>
            <h3> A prompt is a description in natural language that acts as an input for AI generators</h3>
            <h4> Please write your prompt in this format.</h4>
            <p>Title: What do you want to talk about ?<br /> University: name of institution <br /> Course of Study: What you're applying for ?<br /> any other keyword or keyphrase you want featured.</p>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
          placeholder="start typing here" 
          className="prompt-box"
          value={userInput}
          onChange={onUserChangedText} />
        <div className="prompt-buttons">
        <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
          <div className="generate">
          {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
        </div></a>
        </div>
        {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/ras_kimonic"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={Logo} alt="logo" />
            <p>built by Kimonic</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
