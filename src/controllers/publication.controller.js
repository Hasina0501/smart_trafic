const publicationService = require("../services/publication.service");

exports.createPublication = async (req, res) => {
  const publication =
    await publicationService.createPublication(req.body);

  res.status(201).json({
    success: true,
    data: publication
  });
};

exports.getPublications = async (req, res) => {
  const publications =
    await publicationService.getPublications();

  res.json({
    success: true,
    data: publications
  });
};

exports.updatePublication = async (req, res) => {
  const publication =
    await publicationService.updatePublication(
      parseInt(req.params.id),
      req.body
    );

  res.json({
    success: true,
    data: publication
  });
};

exports.deletePublication = async (req, res) => {
  await publicationService.deletePublication(
    parseInt(req.params.id)
  );

  res.json({
    success: true
  });
};