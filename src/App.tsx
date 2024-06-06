import './App.css'
import CommentsContainer from './Components/CommentContainer.tsx'
import { CommentContextProvider } from './context.tsx'

function App() {

  return (
    <>      
      <CommentContextProvider>
        <CommentsContainer/>
      </CommentContextProvider>
    </>
  )
}

export default App
