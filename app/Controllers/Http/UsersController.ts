import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UsersController {
  public async index() {
    const users = await User.all();

    return users;
  }

  public async show({ request }: HttpContextContract) {
    const { id } = request.params();

    const user = await User.find(id);

    return user;
  }

  public async create({ request }: HttpContextContract) {
    const { name, email } = request.only(['name', 'email']);

    const user = await User.create({
      name,
      email,
    });

    return user;
  }

  public async update({ request }: HttpContextContract) {
    const { id } = request.params();
    const email = request.input('email');

    const user = await User.findOrFail(id);

    user.email = email;

    await user.save();
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params();

    const user = await User.findOrFail(id);

    await user.delete();

    return response.status(204);
  }
}
