const error = (app) => {
  app.use((req, res) => {
    res.status(404).json({ msg: "This route does not exists!" });
  });
  app.use((err, req, res, next) => {
    console.error("Error", req, method, req.path, err);
    res.status(500).json({ msg: "Internal server error!" });
  });
};
export default error;
