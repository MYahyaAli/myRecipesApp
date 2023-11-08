import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import NavBar from './NavBar'; // Update this path if your NavBar is in a different directory

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        setError('Error fetching recipe: ' + error.message);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (confirmDelete) {
      try {
        await axios.delete(`/recipes/${id}`);
        navigate('/');
      } catch (error) {
        setError('Error deleting recipe: ' + error.message);
      }
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar /> {/* NavBar component included at the top */}
      <div className="container mt-4">
        <h2>{recipe.name}</h2>
        <p>{recipe.ingredients}</p>
        <p>{recipe.description}</p>
        <div>
          <Link to={`/edit/${recipe._id}`} className="btn btn-primary mr-2">Edit</Link>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
