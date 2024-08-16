const domain = 'http://trial-3z0vklo5m2147qrx.mlsender.net';
const token = 'mlsn.c2c6bb6fa28001b5f856a4e2a47476d3cd443ec70daab1ec24a7b7a5ca8f3f9c';
const admin = 'MS_JIWVJW@trial-x2p034737z9gzdrn.mlsender.net';
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