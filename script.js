document.addEventListener('DOMContentLoaded', () => {
    const botaoAbrirCarta = document.getElementById('abrir-carta');
    const telaInicio = document.getElementById('inicio');
    const telaCarta = document.getElementById('carta');
    const musica = document.getElementById('musica-fundo');
    const muteButton = document.getElementById('mute-button');
    const botaoVoltar = document.getElementById('voltar-inicio');
    const botaoVerVideo = document.getElementById('ver-video');
    const telaVideo = document.getElementById('tela-video');
    const videoPlayer = document.getElementById('meu-video');
    const botaoFecharVideo = document.getElementById('fechar-video');

    if (botaoVerVideo && telaVideo && videoPlayer && botaoFecharVideo) {
        
        // Evento para ABRIR o vídeo
        botaoVerVideo.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o link de pular a página
            telaVideo.classList.remove('hidden');
            musica.pause(); // Pausa a música de fundo para dar foco ao vídeo
            videoPlayer.play().catch(e => console.log("Usuário precisa interagir para o vídeo começar."));
        });

        // Evento para FECHAR o vídeo
        botaoFecharVideo.addEventListener('click', () => {
            telaVideo.classList.add('hidden');
            videoPlayer.pause();
            videoPlayer.currentTime = 0; // Reseta o vídeo para o início
        });
    }

    // --- LÓGICA DO BOTÃO DE VOLTAR PARA O INÍCIO ---
    botaoVoltar.addEventListener('click', () => {
        // 1. Inicia a animação de saída da carta
        telaCarta.classList.remove('fade-in');

        // 2. Para e reseta a música para o início
        if (musica) {
            musica.pause();
            musica.currentTime = 0;
        }
        
        // 4. Aguarda a animação de saída da carta terminar
        setTimeout(() => {
            // 5. Esconde a carta e reexibe a tela inicial
            telaCarta.classList.add('hidden');
            telaInicio.classList.remove('hidden');

            // 6. Inicia a animação de entrada da tela inicial
            setTimeout(() => {
                telaInicio.classList.remove('fade-out');
            }, 50);

        }, 800); // Tempo para a animação de saída da carta
    });

    // --- LÓGICA DO BOTÃO DE MUDO ---
    muteButton.addEventListener('click', () => {
        // Alterna a propriedade 'muted' do áudio (true/false)
        musica.muted = !musica.muted;

        // Adiciona ou remove a classe '.muted' do botão para trocar o ícone via CSS
        muteButton.classList.toggle('muted');
    });

    // Função para disparar o confete
    function dispararConfete() {
        // Dispara confete do lado esquerdo para cima
        confetti({
            particleCount: 70,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        // Dispara confete do lado direito para cima
        confetti({
            particleCount: 70,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });
    }

    botaoAbrirCarta.addEventListener('click', () => {
        // 1. Adiciona a classe para a animação de saída da tela inicial
        telaInicio.classList.add('fade-out');

        // Opcional: Tenta tocar a música. Navegadores modernos podem bloquear autoplay sem interação.
        // A interação de clique já conta, então deve funcionar.
        if (musica) {
            musica.play().catch(e => console.log("Erro ao tocar música:", e));
        }

        // 2. Espera a animação de saída terminar para trocar as telas
        setTimeout(() => {
            // Esconde a tela de início
            telaInicio.classList.add('hidden');

            // Mostra a tela da carta e adiciona a classe para a animação de entrada
            telaCarta.classList.remove('hidden');
            
            // Usar um pequeno timeout aqui garante que o navegador renderize o 'display' 
            // antes de iniciar a transição de opacidade.
            setTimeout(() => {
                telaCarta.classList.add('fade-in');
                dispararConfete(); // Dispara o confete quando a carta aparece
            }, 50); // Um pequeno delay, suficiente para a renderização
            
        }, 800); // 800ms, o mesmo tempo da transição 'opacity' da tela de início no CSS
    });
});