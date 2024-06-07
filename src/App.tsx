import './App.css'
import CommentList from './Components/CommentList.tsx'
import { CommentContextProvider } from './context.tsx'

function App() {
  return (
    <>      
      <CommentContextProvider>
        <CommentList/>
      </CommentContextProvider>
    </>
  )
}

export default App
