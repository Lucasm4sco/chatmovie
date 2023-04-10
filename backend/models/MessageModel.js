import { Schema, model } from 'mongoose';

/* array criptografado de uma mensagem
message = {
  id_user: quem enviou,
  content: a mensagem,
  date: objeto de horas enviado,
  visualized: booleano pra indicar se a ultima mensagem foi vista
}
*/

const MessageModel = new Schema(
    {
        messages: [String], // messagens criptografas
        members: [String], // ids do usuários participantes
        key: String // criptografia
    },
    {
        timestamps: true
    }
);

const Message = model('message', MessageModel)

export default Message;