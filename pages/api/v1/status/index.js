function status(request, response) {
  response.status(200).json({ mensagem: "uma mensagem para a Duda" });
}

export default status;
