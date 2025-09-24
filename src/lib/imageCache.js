const cache = new Map();

export const getFoodSearchTerm = (name = "") => {
  const lcName = name.toLowerCase();
  if (lcName.includes("pasta")) return "pasta";
  if (lcName.includes("pizza")) return "pizza";
  // Add more mappings as needed
  return "food";
};

export const getCachedImage = (recipe) => {
  const providers = [
    `https://www.themealdb.com/images/ingredients/${
      recipe.name.split(" ")[0]
    }.png`,
    `https://www.themealdb.com/images/media/meals/${recipe.name.replace(
      /\s/g,
      ""
    )}.jpg`,
    `https://source.unsplash.com/featured/600x400/?${recipe.name},food`,
  ];

  return providers[Math.abs(recipe.name.length % providers.length)];
};
