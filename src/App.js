import logo from './logo.svg';
import './App.css';
import React , {useState} from 'react';



function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Header(props) {
  return <header>
    <h1> <a href="/" onClick={function(event){
      event.preventDefault();  // 클릭해도 리로드가 이루어지지않게한다.
      props.onChangeMode();
    }}>{props.title }</a></h1>
  </header>

}

function Nav(props) {
  const lis=[]
  for(let i=0; i<props.topics.length; i++)
      {
        let t=props.topics[i];
        lis.push(<li key={t.id}>
            <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
                event.preventDefault();
                let id = Number(event.target.id);
                props.onChangeMode(id); 
                // target = 이벤트를 유발시킨 태그를 가르킴
              }}>{t.title}</a>
              </li>)
      }
    return <nav>
      <ol>
        {lis}
      </ol> 
    </nav>
  }

function App() {

  // const _mode = useState('welcome');
  // const mode = _mode[0];     //상태 즉 'welcome'
  // const setMode = _mode[1];   //모드의값을바꿀수있음 (function이 들어있음)
  const [mode , setMode] = useState('WELCOME');
  const [id , setId] = useState(null);

  
  const topics = [ {id:1,title:'html',body:'html is...'},
  {id:2,title:'css',body:'css is...'},
  {id:3,title:'js',body:'js is...'}
  ]
  let content=null;
  console.log('mode?',mode)
  if(mode==='WELCOME'){
    content= <Article title="welcome" body="hello, 웰컴이유~"></Article>
  }else if(mode==='READ'){
    let title,body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id===id){
        title = topics[i].title;
        body=topics[i].body;
      }
    }
    console.log('tile?',title)
    console.log('body?',body)
    content= <Article title={title} body={body}></Article>
  }else{
    content= <Article title="기본값" body="hello, 기본이요~"></Article>
  }
  return (
    <div>
      <Header title="react" onChangeMode={()=>{
        setMode("WELCOME");
      }}>
      </Header>

      <Nav topics={topics} onChangeMode={(_id)=>{
         setMode("READ");
         setId(_id);
      }}></Nav>
      {content}
    </div>
  );
}

export default App;
