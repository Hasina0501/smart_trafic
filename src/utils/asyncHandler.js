<<<<<<< HEAD
// on utilise ceci au lieu de faire des try, catch a chaque fois 
module.exports = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}
=======
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };
};

module.exports = asyncHandler;
>>>>>>> cc86a7539ca34cf102da27cf62457d893cecccb4
