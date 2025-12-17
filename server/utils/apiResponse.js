const ApiResponse = (res, { statusCode = 200,
  message = "Success",
  data = null, })=>{
  const response = {
    success: true,
    message,
  };

  if (data !== null) response.data = data;

  return res.status(statusCode).json(response);
}

export default ApiResponse;