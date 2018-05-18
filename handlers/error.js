// generic middleware to show a nice standard response for erros
function errorHandler(error, request, response, next){
  return response.status(error.status || 500).json({
    error: {
      message: error.message || "Oops! Something went wrong."
    }
  });
}

module.exports = errorHandler;
