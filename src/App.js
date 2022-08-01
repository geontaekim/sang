import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';



function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Header(props) {
  return <header>
    <h1> <a href="/" onClick={function (event) {
      event.preventDefault();  // 클릭해도 리로드가 이루어지지않게한다.
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>

}
function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;    //form태그 안의 value들고오는 식 = event.target.name.value
      const body = event.target.body.value;       //form태그 안의 value들고오는 식 = event.target.name.value
      props.onCreate(title, body);

    }}>
      <p><input type='text' name="title" placeholder='title' /></p>
      <p><textarea name='body' placeholder='body'></textarea></p>
      <p><input type='submit' value="create"></input></p>

    </form>
  </article>
}

function Nav(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={(event) => {
        event.preventDefault();
        let id = Number(event.target.id);
        props.onChangeMode(id); 
        // target = 이벤트를 유발시킨태그를 가르킴
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Update(props) {
  const [title,setTitle]=useState(props.title);
  const [body,setBody]=useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;    //form태그 안의 value들고오는 식 = event.target.name.value
      const body = event.target.body.value;       //form태그 안의 value들고오는 식 = event.target.name.value
      props.onUpdate(title, body);

    }}  >
      <p><input type='text' name="title" placeholder='title' value={title} onChange={event=>{
        console.log('event?',event.target.value);
        setTitle(event.target.value);
      }} /></p>
      <p><textarea name='body' placeholder='body' value={body} onChange={event=>{
        console.log('body?',event.target.value);
        setBody(event.target.value);

      }}></textarea></p>
      <p><input type='submit' value="update"></input></p>
  
    </form>
  </article>

}

function App() {

  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is...' },
    { id: 2, title: 'css', body: 'css is...' },
    { id: 3, title: 'js', body: 'js is...' }
  ])
  let content = null;
  let contextControl = null;
  console.log('mode?', mode)
  if (mode === 'WELCOME') {
    content = <Article title="welcome" body="hello, 웰컴이유~"></Article> 
  } else if (mode === 'READ') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    console.log('tile?', title)
    console.log('body?', body)                  
    content = <Article title={title} body={body}></Article>
    contextControl = <><li><a href={"/update/" + id} onClick={event => {
      event.preventDefault();
      setMode('UPDATE');
    }}>update</a></li>
    <li><input type='button' value='Delete' onClick={()=>{
      const newTopics=[];
      for(let i=0; i<topics.length; i++){
        if(topics[i].id!==id){
          newTopics.push(topics[i]);
        }
      }
      setTopics(newTopics);
      setMode('WELCOME');
    }} /></li>
    </>  //복수의태그를 포함하는 태그 ->  '<>' 빈태그
  } else if (mode === 'CREATE') {
    
    content = <Create onCreate={(_title, _body) => {
      const newTopic = { id: nextId, title: _title, body: _body }
      const copyTopics = [...topics]
      copyTopics.push(newTopic);
      setTopics(copyTopics);
      setMode('READ');
      setNextId(nextId + 1);
      console.log('nextId?', nextId);
    }}></Create>
  } else if (mode === 'UPDATE') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(_title,_body)=>{
      console.log(_title,_body);
      const updatedTopic={id:id,title:_title , body:_body};  //id값은 READ에서 이미 생성됨
      const copyTopics=[...topics]
      for(let i =0; i<copyTopics.length; i++){
        if(copyTopics[i].id===id){
            copyTopics[i]=updatedTopic;
            break;
        }
      }
      setTopics(copyTopics);
      setMode('READ');

    }}></Update>
  }
  return (
    <div>
      <Header title="react" onChangeMode={() => {
        setMode("WELCOME");
        alert("WELCOME");
      }}>
      </Header>

      <Nav topics={topics} onChangeMode={(_id) => {
        setMode("READ");
        setId(_id);
      }}></Nav>
      {content}
      <ul>
        <li><a href='/create' onClick={event => {
          event.preventDefault();
          setMode('CREATE');
        }}>create</a></li>
        {contextControl}   
      </ul>

    </div>
  );
}

export default App;
