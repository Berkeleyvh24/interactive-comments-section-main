import './App.css';
import CommentList from './Components/CommentList.tsx';
import DeleteModal from './Components/DeleteModal.tsx';
import { CommentContextProvider } from './context.tsx';

function App() {
  return (
    <>      
      <CommentContextProvider>
        <CommentList/>
        <DeleteModal/>
      </CommentContextProvider>
    </>
  )
}

export default App
