const incidentService = require("../services/incident.service")
const { sendSuccess, sendCreated, sendError } = require("../utils/response")

exports.create = async (req, res) => {
    try {
        const { type, ville, description, latitude, longitude } = req.body
        // if multipart/form-data with file, multer provides req.file
        let imageUrl = req.body.imageUrl
        if (req.file && req.file.filename) {
            imageUrl = '/uploads/' + req.file.filename
        }

        if (!latitude || !longitude) {
            return sendError(res, "veuillez activer votre localisation", 400)
        }
        if (!type || !ville || !description) {
            return sendError(res, "veuillez remplir tout les champs", 400)
        }
        
        // keep same fields as your version, but include computed imageUrl
        const payload = Object.assign({}, req.body, { imageUrl })

        const incident = await incidentService.createIncident(payload)
        return sendCreated(res, "Incident créé avec succès", incident)
    } catch (error) {
        return sendError(res, error.message, 400)
    }
}

exports.getAll = async (req, res) => {
    try {
        const incidents = await incidentService.getIncidents()
        return sendSuccess(res, "Liste des incidents", incidents)
    } catch (error) {
        return sendError(res, error.message)
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params
        const incident = await incidentService.getIncidentById(Number(id))
        
        if (!incident) {
            return sendError(res, "Incident introuvable", 404)
        }
        
        return sendSuccess(res, "Incident récupéré", incident)
    } catch (error) {
        return sendError(res, error.message)
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params
        const incident = await incidentService.updateIncident(Number(id), req.body)
        return sendSuccess(res, "Incident mis à jour", incident)
    } catch (error) {
        return sendError(res, error.message, 400)
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        await incidentService.deleteIncident(Number(id))
        return sendSuccess(res, "Incident supprimé")
    } catch (error) {
        return sendError(res, error.message, 400)
    }
}
