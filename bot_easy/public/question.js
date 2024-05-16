function getResponseFromQuestions(inputText) {
    const userInput = inputText.toLowerCase();

    const socialMediaLinks = `
        <div class="card">
            <div class="card-content">
                <h2>Conecte-se conosco!</h2>
                <a href="https://www.instagram.com/infodevbrasil/" class="btn btn-primary" target="_blank">Canal Instagram</a>
                <a href="https://www.facebook.com/infoservicesbrasil" class="btn btn-primary" target="_blank">Fan page do Facebook</a>
                <a href="https://linktr.ee/InfododevBrasil" class="btn btn-primary" target="_blank">Linktree</a>
                <a href="https://sites.google.com/view/infodevbrasil/home" class="btn btn-primary" target="_blank">Site infodevbrasil</a>
            </div>
        </div>
    `;

    const mediaNews = `
        <div class="card">
            <div class="card-content">
                <h2>As melhores notícias!</h2>
                <a href="https://bandnewstv.uol.com.br/" class="btn btn-primary" target="_blank">Band news</a>
                <a href="https://www.cnnbrasil.com.br/ao-vivo/" class="btn btn-primary" target="_blank">CNN</a>
            </div>
        </div>
    `;

    const produtos = `
        <div class="card">
            <div class="card-content">
                <h2>Nossos Produtos</h2>
                <a href="https://linktr.ee/InfododevBrasil" class="btn btn-primary" target="_blank">Linktree</a>
                <a href="https://sites.google.com/view/infodevbrasil/home" class="btn btn-primary" target="_blank">Site infodevbrasil</a><br>
                <img src="/assets/zapmax2.png" alt="Banner" class="img-fluid mt-3" style="width: 150px; height: auto;"/>
                <img src="/assets/bing-ads-successo.jpg" alt="Banner" class="img-fluid mt-3" style="width: 150px; height: auto;"/>
                <img src="/assets/Formula-Negocio-Online.jpg" alt="Banner" class="img-fluid mt-3" style="width: 150px; height: auto;"/>
                
                </div>
        </div>
    `;

    const commonQuestions = [
        { question: "bom dia", answer: "Meu nome é Groot!; Brincadeira!. Bom dia! Como posso ser útil?" },
        { question: "quero ver seus produtos", answer: produtos },
        { question: "mídias", answer: socialMediaLinks },
        { question: "notícias", answer: mediaNews }
    ];

    for (const pair of commonQuestions) {
        if (userInput.includes(pair.question)) {
            const div = document.createElement('div');
            div.innerHTML = pair.answer;
            document.getElementById("chat-area").appendChild(div);
            return null;
        }
    }

    const errorMessage = "Desculpe, não entendi sua pergunta. Por favor, tente novamente.";
    const errorDiv = document.createElement('div');
    errorDiv.textContent = errorMessage;
    document.getElementById("chat-area").appendChild(errorDiv);
    return null;
}
