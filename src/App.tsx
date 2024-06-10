import CommentList from './Components/CommentList.tsx';
import DeleteModal from './Components/DeleteModal.tsx';
import { CommentContextProvider } from './context.tsx';
import './app.css'

function App() {
  return (
    <>      
      <CommentContextProvider>
        <div className="app-container">
        <CommentList/>
        <DeleteModal/>
        </div>
      </CommentContextProvider>
    </>
  )
}

export default App
