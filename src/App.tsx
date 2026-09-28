import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Expeditions from './pages/Expeditions';
import ExpeditionDetail from './pages/ExpeditionDetail';
import Publications from './pages/Publications';
import Datasets from './pages/Datasets';
import Media from './pages/Media';
import PolarMap from './pages/PolarMap';
import AskPolarVerse from './pages/AskPolarVerse';
import OutreachStudio from './pages/OutreachStudio';
import KnowledgeConnections from './pages/KnowledgeConnections';
import ResearcherProfile from './pages/ResearcherProfile';
import Admin from './pages/Admin';
import StoryMode from './pages/StoryMode';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expeditions" element={<Expeditions />} />
        <Route path="/expeditions/:id" element={<ExpeditionDetail />} />
        <Route path="/expeditions/:id/story" element={<StoryMode />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/datasets" element={<Datasets />} />
        <Route path="/media" element={<Media />} />
        <Route path="/map" element={<PolarMap />} />
        <Route path="/ask" element={<AskPolarVerse />} />
        <Route path="/outreach" element={<OutreachStudio />} />
        <Route path="/connections" element={<KnowledgeConnections />} />
        <Route path="/researchers/:id" element={<ResearcherProfile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
