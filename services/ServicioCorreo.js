const domain = 'http://trial-3z0vklo5m2147qrx.mlsender.net';
const token = 'mlsn.fd27196e26b86c551df5308c40aa49bdf78abb26d5863bd454d008850992369c';
const admin = 'MS_Ws3iCT@trial-pxkjn41q76plz781.mlsender.net';
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

const enviarOTP = async (correoDestinatario, nombreDestinatario, otp) => {
    enviarCorreo(
        correoDestinatario,
        nombreDestinatario, 
        'Código de verificación para jugar en Pokémon Fight', 
        'Su código de verificación es:' + otp
    )
};


module.exports = {
    enviarContrasenaTemporal,
    enviarOTP
}