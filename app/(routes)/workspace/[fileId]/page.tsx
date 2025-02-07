"use client"
import React, { useEffect, useState } from 'react'
import { useResizable } from 'react-resizable-layout'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import EditorContainer from '../_components/EditorContainer'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { FILE } from '../../dashboard/_components/FileList'
import Canvas from '../_components/Canvas'

function Workspace({ params }: any) {
  const [triggerSave, setTriggerSave] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const convex = useConvex()
  const [fileData, setFileData] = useState<FILE | any>()

  const { position, separatorProps } = useResizable({
    axis: 'x',
    initial: window.innerWidth * 0.5,
    min: 300,
    max: window.innerWidth * 0.8
  })

  useEffect(() => {
    params.fileId && getFileData()
  }, [])

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, { _id: params.fileId })
    setFileData(result)
  }

  return (
    <div className={`flex flex-col h-screen ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}>
      <WorkspaceHeader
        onSave={() => setTriggerSave(!triggerSave)}
        theme={theme}
        setTheme={setTheme}
      />

      <div className="flex flex-1 relative">
        <div style={{ width: position }} className="h-full">
          <EditorContainer
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
          />
        </div>

        <div
          {...separatorProps}
          className="w-1 cursor-col-resize bg-gray-200 hover:bg-gray-300 active:bg-gray-400 transition-colors"
        />

        <div className="flex-1 h-full border-l">
          <Canvas
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
            theme={theme}
          />
        </div>
      </div>
    </div>
  )
}

export default Workspace
