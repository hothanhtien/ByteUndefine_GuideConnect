import auth from './authRouter';

const route = (app) => {
    app.use('/auth', auth)
}

export default route;