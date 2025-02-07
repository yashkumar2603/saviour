import React, { useEffect, useState } from 'react'
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { FILE } from '../../dashboard/_components/FileList';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

function Canvas({ onSaveTrigger, fileId, fileData, theme }: {
  onSaveTrigger: any,
  fileId: any,
  fileData: FILE,
  theme: 'light' | 'dark'
}) {
  const [whiteBoardData, setWhiteBoardData] = useState<any>();
  const updateWhiteboard = useMutation(api.files.updateWhiteboard);

  useEffect(() => {
    onSaveTrigger && saveWhiteboard();
  }, [onSaveTrigger])

  const saveWhiteboard = () => {
    updateWhiteboard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteBoardData)
    }).then(resp => console.log(resp))
  }

  return (
    <div style={{
      height: "calc(100vh - 60px)",
      width: "100%",
      position: "relative"
    }}>
      {fileData &&
        <Excalidraw
          theme={theme}
          initialData={{
            elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
            appState: {
              viewBackgroundColor: theme === "dark" ? "#121212" : "#ffffff",
              currentItemStrokeColor: theme === "dark" ? "#ffffff" : "#000000",
              gridSize: 20,
              //@ts-ignore
              showGrid: true
            }
          }}
          onChange={(excalidrawElements, appState, files) =>
            setWhiteBoardData(excalidrawElements)}
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: true
            }
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
            <MainMenu.DefaultItems.Export />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center>
          </WelcomeScreen>
        </Excalidraw>
      }
    </div>
  )
}


export default Canvas

