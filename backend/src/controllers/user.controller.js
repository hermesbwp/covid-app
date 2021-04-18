const UserModel = require('../models/user.model');

class User {
    async index(req, res) {
        const users = await UserModel.find();
        res.send({ users })
    }

    async store(req, res) {
        const body = req.body;
        const user = await UserModel.create(body);

        res.send(user);
    }

    async getOne(req, res) {
        const { id } = req.params;
        try {
            const user = await UserModel.findById(id);
            res.send({ user });
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }

    async remove(req, res) {
        const { id } = req.params;
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                return res.send({ message: "User don't exists" });
            }
            await user.remove();
            res.send({ message: "User removed" });
        } catch (e) {
            console.log(e.message);
            res.status(400).json({ message: "An unexpected error happend" });
        }
    }

    async update(req, res) {
        const { body, params: { id } } = req;
        const user = await UserModel.findByIdAndUpdate(id, body, { new: true });
        res.send({ user });
    }
}

module.exports = new User()