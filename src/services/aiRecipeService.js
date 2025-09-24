// Mock function for now - we'll add real AI later
export const generateRecipes = async (query) => {
  console.log("AI Search for:", query);
  
  // Temporary mock data
  return [
    {
      id: "ai-1",
      title: `AI Recipe for ${query}`,
      description: "Delicious AI-generated recipe",
      prepTime: "10 mins",
      cookTime: "20 mins",
      servings: 4,
      image: "https://via.placeholder.com/150"
    }
  ];
};