import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        const message = err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
        setError('Error fetching recipe: ' + message);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (confirmDelete) {
      try {
        await axios.delete(`/api/recipes/${id}`);
        navigate('/');
      } catch (err) {
        const message = err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
        setError('Error deleting recipe: ' + message);
      }
    }
  };

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          Recipe Details
        </div>
        <div className="card-body">
          <h5 className="card-title">{recipe.name}</h5>
          <p className="card-text"><strong>Ingredients:</strong> {recipe.ingredients}</p>
          <p className="card-text"><strong>Description:</strong> {recipe.description}</p>
          <div className="d-flex justify-content-center">
            <Link to={`/edit/${recipe._id}`} className="btn btn-primary mr-2" style={{ margin: '5px' }}>Edit</Link>
            <button onClick={handleDelete} className="btn btn-danger" style={{ margin: '5px' }}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
