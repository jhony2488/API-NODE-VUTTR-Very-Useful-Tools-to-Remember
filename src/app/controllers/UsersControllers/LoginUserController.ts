import jwtlogin from 'jsonwebtoken'
import { UsersServices } from '../../services/UsersServices'

interface CRUDUser {
  login(req, res): void
}

class UsersController implements CRUDUser {
  async login(req, res) {
    const { email, password } = req.body
    const userService = new UsersServices()
    // #swagger.tags = ['Users']
    // #swagger.description = 'Endpoint para realização do login de um usuário.'
    /*    #swagger.parameters['body'] = {
                in: 'body',
                description: "Dado necessario para se realizar o login de um usuário",
                required: true,
                schema: { $ref: "#/definitions/LoginUser" }
        } */

    /* #swagger.responses[401] = {
               schema: { $ref: "#/definitions/ErrorTokenInvalid" },
               description: 'Quando  o token de authenticação não for valido ou quando o token de authenticação não for encontrado'
        } */

    try {
      /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/LoginUserResponse" },
               description: 'Realiza o login de um usuário retornando os dados neccessarios para isto'
        } */
      const user = await userService.login(email, password)
      /* #swagger.responses[406] = {
               schema: { $ref: "#/definitions/Error406" },
               description: 'Quando o cliente fornecer uma senha ou um email incorreto'
        } */
      if (user == 'Incorrect Password' || user == 'User Not Found') {
        return res.status(406).json({ message: user })
      }
      const token = await jwtlogin.sign(
        {
          id: user.id,
          uuid: user.uuid,
        },
        process.env.APP_SECRET
      )
      return res.header('auth-token', token).json({
        data: { id: user.id, uuid: user.uuid },
      })
    } catch (err) {
      /* #swagger.responses[400] = {
               schema: { $ref: "#/definitions/Error400" },
               description: 'Quando houver um erro na requisição'
        } */
      return res.status(400).json({ message: err.message })
    }
  }
}

module.exports = new UsersController()
