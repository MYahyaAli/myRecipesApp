import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import RecipeForm from './comp/RecipeForm';
import RecipeList from './comp/RecipeList';
import RecipeDetail from './comp/RecipeDetails';
import NavBar from './comp/NavBar';

function App() {
  return (
    <Router>
      <NavBar/>
      <div>
        {/* Other components like Navbar can go here */}
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/add" element={<RecipeForm />} />
          <Route path="/edit/:id" element={<RecipeForm />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
