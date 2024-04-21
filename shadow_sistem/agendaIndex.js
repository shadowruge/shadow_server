const schedule = require('node-schedule');
const nodemailer = require('nodemailer');

// Função para agendar um post
function schedulePost(platform, content, date) {
    console.log(`Agendando post para ${platform} em ${date}: ${content}`);
    // Lógica para agendar o post na plataforma desejada
}

// Função para enviar notificação
function scheduleNotification(date, message) {
    console.log(`Agendando notificação para ${date}: ${message}`);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'seuemail@gmail.com',
            pass: 'suasenha'
        }
    });
    
    const mailOptions = {
        from: 'seuemail@gmail.com',
        to: 'seuemail@gmail.com',
        subject: 'Lembrete de Postagem',
        text: message
    };
    
    const job = schedule.scheduleJob(date, function(){
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
    });
}

// Exemplo de uso
schedulePost('Instagram', 'Conteúdo do post no Instagram', new Date('2024-04-20 12:00:00'));
schedulePost('Facebook', 'Conteúdo do post no Facebook', new Date('2024-04-21 10:00:00'));

scheduleNotification(new Date('2024-04-20 11:00:00'), 'Lembre-se de fazer o post no Instagram hoje!');
