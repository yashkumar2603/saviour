'use client';
import dynamic from 'next/dynamic';
import { FILE } from '../../dashboard/_components/FileList';

const EditorComponent = dynamic(() => import('./Editor'), {
    ssr: false,
    loading: () => <div>Loading editor...</div>
});

function EditorContainer({ onSaveTrigger, fileId, fileData }: {
    onSaveTrigger: any,
    fileId: any,
    fileData: FILE
}) {
    return <EditorComponent onSaveTrigger={onSaveTrigger} fileId={fileId} fileData={fileData} />;
}

export default EditorContainer;
