import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBaseUrl = process.env.REACT_APP_API_URL || '';

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/recipes`);
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError('Failed to fetch recipes.');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [apiBaseUrl]);

  if (loading) {
    return <div>Loading recipes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (recipes.length === 0) {
    return <div>No recipes to display.</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Recipes</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {recipes.map((recipe) => (
          <div className="col" key={recipe._id}>
            <div className="card h-100">
              {/* <img src={recipe.imageUrl || 'placeholder-image-url.jpg'} className="card-img-top" alt={recipe.name} /> */}
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">{recipe.description}</p>
              </div>
              <div className="card-footer">
                <Link to={`/recipe/${recipe._id}`} className="btn btn-primary">
                  View Recipe
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;