import type { Recipe, RecipesResponse } from "../types/recipe";

const BASE_URL = "https://dummyjson.com/recipes";

export const recipesApi = {
  getAll: async (limit = 30, skip = 0): Promise<RecipesResponse> => {
    const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
    return response.json();
  },

  getById: async (id: number): Promise<Recipe> => {
    const response = await fetch(`${BASE_URL}/${id}`);
    return response.json();
  },

  search: async (query: string): Promise<RecipesResponse> => {
    const response = await fetch(`${BASE_URL}/search?q=${query}`);
    return response.json();
  },
};
