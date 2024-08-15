const domain = 'http://trial-3z0vklo5m2147qrx.mlsender.net';
const token = 'mlsn.bda14c5961d600c6efa075fa05b1c67a4ee1b55aaa85ec92228aec762e7c3dca';
const admin = 'MS_Sytc25@trial-3z0vklo5m2147qrx.mlsender.net';
const clave = 'ZKcmIlZseQ88fdqH';
const servidor = 'http://smtp.mailersend.net';
const port = 587;
const conexionSeguridad = 'TLS';


const {MailerSend, EmailParams, Sender, Recipient} = require('mailersend');
const mailerSend = new MailerSend({
    apiKey: token
});


const enviarCorreo = async ( correoDestinatario, nombreDestinatario, titulo, contenido) => {
    try {
        const sentFrom = new Sender(admin, "Administrador");
        const recipients = [
            new Recipient(correoDestinatario, nombreDestinatario)
        ];
        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setSubject(titulo)
            .setText(contenido);
        await mailerSend.email.send(emailParams);
        return true;
    } catch (error) {
        console.error('Error enviando el correo', error);
        return false;
    }
};

const enviarContrasenaTemporal = async (correoDestinatario, nombreDestinatario, contrasenaTemporal) => {
    enviarCorreo(
        correoDestinatario,
        nombreDestinatario, 
        'Contraseña Temporal para jugar en Pokémon Fight', 
        'Su contraseña temporal es:' + contrasenaTemporal
    )
};

module.exports = {
    enviarContrasenaTemporal
}