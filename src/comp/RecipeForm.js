import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    description: '',
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id from the URL if present

  useEffect(() => {
    // If there is an ID, we are in edit mode and need to fetch the recipe
    if (id) {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get(`/recipes/${id}`);
          setFormData(response.data); // Set form data with fetched recipe data
        } catch (error) {
          console.error('Error fetching recipe: ', error);
        }
      };

      fetchRecipe();
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (id) {
        await axios.put(`/recipes/${id}`, formData);
      } else {
        await axios.post('/recipes', formData);
      }
      navigate('/'); // Redirect to the home page after form submission
    } catch (error) {
      console.error('Error submitting form: ', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>{id ? 'Edit Recipe' : 'Add Recipe'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">Ingredients:</label>
          <textarea
            className="form-control"
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Update Recipe' : 'Add Recipe'}
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
