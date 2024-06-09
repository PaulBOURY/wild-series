const tables = require("../../database/tables");

// Some data to make the trick
const categories = [
    {
      id: 1,
      name: "Science-Fiction",
    },
    {
      id: 2,
      name: "Comédie",
    },
  ];
  
  // Declare the actions
  const browse = async (req, res) => {
    const categoriesFromDB = await tables.category.readAll();
    res.json(categoriesFromDB);
    };
  
  const read = (req, res) => {
    const parsedId = parseInt(req.params.id, 10);
    const category = categories.find((p) => p.id === parsedId);
  
    if (category != null) {
      res.json(category);
    } else {
      res.sendStatus(404);
    }
  };
  
  
  // Export them to import them somewhere else
  
  
  module.exports = { browse, read };