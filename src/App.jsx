import { Excalidraw } from "@excalidraw/excalidraw";  
import { useEffect, useRef,useState } from "react";
import {FloatButton} from "antd";
import {CaretRightOutlined, FileAddFilled,PauseOutlined,UploadOutlined} from "@ant-design/icons"
import "./index.css"
import FloatButtonGroup from "antd/es/float-button/FloatButtonGroup";

export default function App() {
  

  const [apiMeta,setapiMeta] = useState(null);
  const [api,setapi] = useState();
  const [start,setstart] = useState(false);

  const data = useRef([]);
  const dataMeta = useRef([]);



  function pointerUp(){
    const elements = api.getSceneElements();
    if(start){
      data.current.push(elements[elements.length-1]);
    }
    
    apiMeta.updateScene({elements:elements});
    console.log(elements)
    

  }
  function pointerUpMeta(){
    const elements = apiMeta.getSceneElements();
    if(start){
      dataMeta.current.push(elements[elements.length-1]);
    }
    
    api.updateScene({elements:elements});
    console.log(elements)
  }


  function handleSave(){
    const page = JSON.stringify(api.getSceneElements());
    localStorage.setItem("page",page);
    
  }
  function handleLoad(){
    const page = JSON.parse(localStorage.getItem("page"));
    api.updateScene({elements:page});
    apiMeta.updateScene({elements:page});
  }

  function handleStart(){

    if(start){
      console.log("main window:")
      console.log(JSON.stringify(data.current));
      console.log("meta window:")
      console.log(JSON.stringify(dataMeta.current));
      console.log("all the elements")
      console.log(JSON.stringify(api.getSceneElements()))
      data.current = [];
      dataMeta.current = []
      return setstart(false);
    }
    setstart(true)

  }



  return (  
    <>
      <div className="con">

        <div className="page">
          <Excalidraw
              zenModeEnabled={false}
              aiEnabled={false}
              viewModeEnabled={false}
              objectsSnapModeEnabled={false}
              UIOptions={{
                  tools: {
                      viewMode: false,
                      image: false,
                      hand: false,
                      selection: false,
                      rectangle: false,
                      diamond: false,
                      ellipse: false,
                      arrow: false,
                      line: false,
                      freedraw: false,
                      text: false,
                      eraser: false,
                      laser: false,
                  },
                  canvasActions: {
                      export: false,
                      loadScene: false,
                      saveToActiveFile: false,
                      clearCanvas: false,
                      toggleTheme: false,
                  },
              }}
              renderToolbar={({ setActiveTool }) => (
                  <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => setActiveTool({ type: "selection" })}>
                          MousePointer
                      </button>
                      <button onClick={() => setActiveTool({ type: "freedraw" })}>
                          Pencil
                      </button>
                      <button onClick={() => setActiveTool({ type: "eraser" })}>
                          Eraser
                      </button>
                  </div>
              )}

              renderSidebar={() => null}
              renderFooter={() => null}
              renderTopRightUI={() => null}
              gridModeEnabled excalidrawAPI={(Api)=>setapi(Api)} onPointerUp={pointerUp} />
        </div>
        
        <div className="pageMeta"> 
          <Excalidraw
              zenModeEnabled={false}
              aiEnabled={false}
              viewModeEnabled={false}
              objectsSnapModeEnabled={false}
              UIOptions={{
                  tools: {
                      viewMode: false,
                      image: false,
                      hand: false,
                      selection: false,
                      rectangle: false,
                      diamond: false,
                      ellipse: false,
                      arrow: false,
                      line: false,
                      freedraw: false,
                      text: false,
                      eraser: false,
                      laser: false,
                  },
                  canvasActions: {
                      export: false,
                      loadScene: false,
                      saveToActiveFile: false,
                      clearCanvas: false,
                      toggleTheme: false,
                  },
              }}
              excalidrawAPI={(Api)=>setapiMeta(Api)} onPointerUp={pointerUpMeta}/>
          <div className="overlay" />
        </div>

        
        
      </div>
      <FloatButtonGroup className="fab" trigger="click" shape="square">
          <FloatButton icon={<UploadOutlined/>} shape="square" tooltip="load" description="load" onClick={handleLoad}></FloatButton>
          <FloatButton icon={<FileAddFilled/>} shape="square" tooltip="save" description="save" onClick={handleSave}></FloatButton>
      </FloatButtonGroup>
      <FloatButton shape="square" className="fab2" icon={start?<PauseOutlined />:<CaretRightOutlined/>} tooltip="meta" description="meta" onClick={handleStart}></FloatButton>
    </>  
  );  
}
