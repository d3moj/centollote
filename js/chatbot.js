document.addEventListener('DOMContentLoaded', function () {
  // ===== MODAL CARTA DEL DÍA =====
  const dailyOverlay = document.getElementById('daily-overlay');
  const dailyClose = document.getElementById('daily-close');
  const dailyBtnMenu = document.getElementById('daily-btn-menu');

  function closeDailyModal() {
    if (dailyOverlay) dailyOverlay.classList.add('hidden');
  }

  if (dailyClose) dailyClose.addEventListener('click', closeDailyModal);
  if (dailyOverlay) {
    dailyOverlay.addEventListener('click', function (e) {
      if (e.target === dailyOverlay) closeDailyModal();
    });
  }
  if (dailyBtnMenu) {
    dailyBtnMenu.addEventListener('click', function () {
      window.location.href = 'pages/menu.html';
    });
  }

  // ===== CHATBOT (burbuja flotante) =====
  const chatBubble = document.getElementById('chat-bubble');
  const overlay = document.getElementById('chatbot-overlay');
  const closeBtn = document.getElementById('chatbot-close');
  const body = document.getElementById('chatbot-body');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const suggestions = document.querySelectorAll('.cb-suggestion');

  if (!overlay) return;

  if (chatBubble) {
    chatBubble.addEventListener('click', function () {
      overlay.classList.remove('hidden');
    });
  }

  // Base de conocimiento: 10 temas con palabras clave y respuesta
  const knowledge = [
    {
      keywords: ['horario', 'hora', 'abren', 'cierran', 'atencion', 'atención'],
      answer: 'Atendemos de Lunes a Viernes de 12:00 pm a 10:00 pm, y Sábados y Domingos de 11:00 am a 11:00 pm.'
    },
    {
      keywords: ['reserva', 'reservar', 'mesa', 'apartar'],
      answer: 'Puedes reservar tu mesa fácilmente desde la sección "Reservas" del menú. Recomendamos hacerlo con al menos 24 horas de anticipación.'
    },
    {
      keywords: ['ubicacion', 'ubicación', 'direccion', 'dirección', 'donde', 'dónde', 'queda'],
      answer: 'Estamos ubicados en Cl. 48 Sur #2 Este-27, Bogotá. Puedes ver el mapa completo en la sección "Ubicación".'
    },
    {
      keywords: ['menu', 'menú', 'platos', 'comida', 'que tienen', 'qué tienen'],
      answer: 'Tenemos 10 deliciosas opciones a base de centollo: desde cucharitas de mousse hasta spaghetti con carne de centollo. Revisa la sección "Menu" para ver todo el detalle.'
    },
    {
      keywords: ['precio', 'cuesta', 'vale', 'costo'],
      answer: 'Los precios varían según el plato. Te recomendamos visitar la sección "Menu" o contactarnos directamente para más detalles sobre precios actuales.'
    },
    {
      keywords: ['centollo', 'que es', 'qué es', 'animal', 'crustaceo', 'crustáceo'],
      answer: 'El Centollo (Maia squinado) es un crustáceo braquiuro de la familia Majidae, también conocido como Changurro o Cangrejo velludo. Vive en fondos rocosos o arenosos a más de 100m de profundidad.'
    },
    {
      keywords: ['contacto', 'telefono', 'teléfono', 'llamar', 'correo', 'email'],
      answer: 'Puedes contactarnos al Tel: (57) 316 690 0508 o al correo servicioalcliente@elcentollo.com.co. También tenemos un formulario en la sección "Contacto".'
    },
    {
      keywords: ['parqueadero', 'parking', 'carro', 'estacionar'],
      answer: 'Sí, contamos con parqueadero disponible en el edificio para nuestros clientes.'
    },
    {
      keywords: ['domicilio', 'envio', 'envío', 'a domicilio', 'llevar'],
      answer: 'Por el momento solo atendemos en nuestro local. Para más información sobre disponibilidad de domicilios, contáctanos directamente.'
    },
    {
      keywords: ['vegetariano', 'vegano', 'alergia', 'mariscos alergia'],
      answer: 'Todos nuestros platos están elaborados a base de mariscos y crustáceos. Si tienes alguna alergia o restricción alimentaria, por favor indícalo al hacer tu reserva.'
    }
  ];

  const greetings = ['hola', 'buenas', 'buenos dias', 'buenos días', 'buenas tardes', 'buenas noches', 'hey', 'hi'];
  const thanks = ['gracias', 'genial', 'perfecto', 'ok', 'vale'];

  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = 'cb-msg ' + sender;
    msg.textContent = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }

  function findAnswer(userText) {
    const text = userText.toLowerCase();

    if (greetings.some(g => text.includes(g))) {
      return '¡Hola! Bienvenido a El Centollo 🦀 ¿En qué puedo ayudarte? Puedes preguntarme sobre horarios, reservas, ubicación, menú y más.';
    }

    if (thanks.some(t => text.includes(t))) {
      return '¡Con gusto! Si tienes otra pregunta, aquí estoy.';
    }

    for (const item of knowledge) {
      if (item.keywords.some(k => text.includes(k))) {
        return item.answer;
      }
    }

    return 'No estoy seguro de cómo responder eso. Puedes preguntarme sobre: horarios, reservas, ubicación, menú, precios, qué es el centollo, contacto, parqueadero, domicilios o alergias.';
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    input.value = '';
    setTimeout(() => {
      addMessage(findAnswer(text), 'bot');
    }, 400);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') handleSend();
  });

  suggestions.forEach(btn => {
    btn.addEventListener('click', function () {
      input.value = btn.textContent;
      handleSend();
    });
  });

  closeBtn.addEventListener('click', function () {
    overlay.classList.add('hidden');
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) overlay.classList.add('hidden');
  });
});