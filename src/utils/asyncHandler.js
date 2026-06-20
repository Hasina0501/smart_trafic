// on utilise ceci au lieu de faire des try, catch a chaque fois 
module.exports = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}
