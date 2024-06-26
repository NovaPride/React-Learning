import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const CharactersPage = lazy(() => import("../../pages/CharactersPage"))
const ComicsPage = lazy(() => import("../../pages/ComicsPage"))
const SingleComicPage = lazy(() => import("../../pages/SingleComicPage"))
const SingleCharacterPage = lazy(() => import("../../pages/SingleCharacterPage"))
const Page404 = lazy(() => import("../../pages/404"))

const App = () => { 
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner/>}>
            <Routes>
              <Route path="/" element={<CharactersPage/>}/>
              <Route path="/comics" element={<ComicsPage/>}/>
              <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
              <Route path="/character/:characterId" element={<SingleCharacterPage/>}/>
              <Route path="*" element={<Page404/>}/>
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  )
}

export default App;

/* 
{
  {
    "/" : <CharacterPage/>,
    "/comics" : <ComicsPage/>,
  }[window.location.pathname]
} 
*/