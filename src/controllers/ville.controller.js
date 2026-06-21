const villeService = require("../services/ville.service")
const { sendSuccess, sendCreated, sendError } = require("../utils/response")

exports.create = async (req, res) => {
    try {
        const {nomVille} = req.body
        if (!nomVille) {
            return sendError(res,"Le champ nomVille est requis",400)
        }
        
        const ville = await villeService.createVille(req.body)
        return sendCreated(res, "Ville créée avec succès", ville)
    } catch (error) {
        return sendError(res, error.message, 400)
    }
}

exports.getAll = async (req, res) => {
    try {
        const villes = await villeService.getVilles()
        return sendSuccess(res, "Liste des villes", villes)
    } catch (error) {
        return sendError(res, error.message)
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params
        const ville = await villeService.getVilleById(Number(id))
        
        
        if (!ville) {
            return sendError(res, "Ville introuvable", 404)
        }
        
        return sendSuccess(res, "Ville récupérée", ville)
    } catch (error) {
        return sendError(res, error.message)
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params
        const ville = await villeService.updateVille(Number(id), req.body)
        return sendSuccess(res, "Ville mise à jour", ville)
    } catch (error) {
        return sendError(res, error.message, 400)
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        await villeService.deleteVille(Number(id))
        return sendSuccess(res, "Ville supprimée")
    } catch (error) {
        return sendError(res, error.message, 400)
    }
}