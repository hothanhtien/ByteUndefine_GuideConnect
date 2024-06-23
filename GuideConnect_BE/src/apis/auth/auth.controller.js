
class AuthController {
    login = (req, res, next) => {
        res.send('hi');
    }
}

export default new AuthController();