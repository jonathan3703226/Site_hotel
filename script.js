/**
 * ESTRUTURA POO COMPLETA - HOTEL SAMAMBA
 */

class Acomodacao {
    constructor(chave, nome, preco, maxPax) {
        this.chave = chave;
        this.nome = nome;
        this.preco = preco;
        this.maxPax = maxPax;
    }
}

class GerenciadorAcessibilidade {
    constructor() {
        this.fontSizeAtual = 16;
        this.maxFontSize = 22;
        this.minFontSize = 12;
        this.isReading = false;
        this.init();
    }

    init() {
        const prefFonte = localStorage.getItem('hotel_font_size');
        if (prefFonte) {
            this.fontSizeAtual = parseInt(prefFonte, 10);
            this.aplicarTamanhoFonte();
        }

        if (localStorage.getItem('hotel_high_contrast') === 'true') {
            document.body.classList.add('high-contrast');
        }

        if (localStorage.getItem('hotel_highlight_links') === 'true') {
            document.body.classList.add('highlight-links');
        }

        document.getElementById('btn-increase-font')?.addEventListener('click', () => this.alterarFonte(1));
        document.getElementById('btn-decrease-font')?.addEventListener('click', () => this.alterarFonte(-1));
        document.getElementById('btn-reset-font')?.addEventListener('click', () => this.resetarFonte());
        document.getElementById('btn-toggle-contrast')?.addEventListener('click', () => this.toggleContraste());
        document.getElementById('btn-highlight-links')?.addEventListener('click', () => this.toggleHighlightLinks());
        document.getElementById('btn-read-text')?.addEventListener('click', () => this.toggleLeitorTela());
    }

    alterarFonte(delta) {
        let novoTamanho = this.fontSizeAtual + delta;
        if (novoTamanho >= this.minFontSize && novoTamanho <= this.maxFontSize) {
            this.fontSizeAtual = novoTamanho;
            this.aplicarTamanhoFonte();
            localStorage.setItem('hotel_font_size', this.fontSizeAtual);
        }
    }

    resetarFonte() {
        this.fontSizeAtual = 16;
        this.aplicarTamanhoFonte();
        localStorage.setItem('hotel_font_size', 16);
    }

    aplicarTamanhoFonte() {
        document.documentElement.style.fontSize = `${this.fontSizeAtual}px`;
    }

    toggleContraste() {
        document.body.classList.toggle('high-contrast');
        localStorage.setItem('hotel_high_contrast', document.body.classList.contains('high-contrast'));
    }

    toggleHighlightLinks() {
        document.body.classList.toggle('highlight-links');
        localStorage.setItem('hotel_highlight_links', document.body.classList.contains('highlight-links'));
    }

    toggleLeitorTela() {
        if (!('speechSynthesis' in window)) {
            alert('Seu navegador não suporta a função de leitura de texto.');
            return;
        }

        if (this.isReading) {
            window.speechSynthesis.cancel();
            this.isReading = false;
            if (window.app) window.app.showToast('Leitura pausada.');
            return;
        }

        const textoParaLer = document.querySelector('.hero-content h1')?.textContent + ". " + 
                             document.querySelector('.about-text p')?.textContent;

        const utterance = new SpeechSynthesisUtterance(textoParaLer);
        utterance.lang = app.traducao.currentLang === 'pt' ? 'pt-BR' : app.traducao.currentLang === 'es' ? 'es-ES' : 'en-US';
        
        utterance.onend = () => { this.isReading = false; };
        
        window.speechSynthesis.speak(utterance);
        this.isReading = true;
        if (window.app) window.app.showToast('Iniciando leitura da tela...');
    }
}

// Módulo de Tradução i18n
class GerenciadorTraducao {
    constructor() {
        this.currentLang = 'pt';
        this.dicionario = {
            pt: {
                nav_about: "O Hotel", nav_rooms: "Suítes", nav_services: "Serviços", nav_info: "Informações", nav_contact: "Fale Conosco",
                hero_title: "Sua estadia perfeita no DF", hero_desc: "Conforto, praticidade e o melhor custo-benefício para sua viagem de negócios ou lazer em Samambaia.", hero_btn: "Ver Suítes",
                about_sub: "Bem-vindo ao Hotel Samamba", about_title: "Conforto, praticidade e economia na sua hospedagem.", 
                about_p1: "Seja para uma viagem a trabalho, um compromisso na região ou alguns dias de descanso, o Hotel Samamba é a escolha ideal para quem busca conforto e praticidade em Samambaia, no Distrito Federal.",
                about_p2: "No Hotel Samamba, você encontra o equilíbrio entre conforto, praticidade e preço justo. Faça sua reserva e desfrute de uma estadia tranquila.",
                feat_coffee: "Café Incluso", feat_wifi: "Wi-Fi Grátis", feat_parking: "Estacionamento",
                rooms_sub: "Acomodações", rooms_title: "Nossas Suítes", rooms_desc: "Da cama ao banho – cada detalhe foi pensado para o seu conforto.",
                room_kid_policy: "<i class=\"fas fa-info-circle\"></i> Política de Crianças: 1 criança de até 7 anos tem gratuidade na reserva.",
                room_title_solteiro: "Suíte Solteiro", room_title_casal: "Suíte Casal", room_title_duplo: "Suíte Duplo", room_title_triplo: "Suíte Triplo", room_title_familia: "Suíte Família",
                desc_solteiro: "Ideal para quem viaja sozinho e procura conforto e praticidade em Samambaia.",
                desc_casal: "Perfeita para casais que desejam uma estadia confortável e prática no DF.",
                desc_duplo: "Combina conforto, funcionalidade e praticidade. Excelente opção para amigos ou colegas de trabalho.",
                desc_triplo: "Com espaço para até três pessoas, é uma ótima escolha para pequenas famílias ou amigos.",
                desc_familia: "Ambiente amplo e funcional. Ideal para quem busca praticidade e conforto para famílias.",
                per_night: "/ diária", btn_book: "Reservar Suíte",
                amen_max1: "Máx: 1 Pessoa", amen_max2: "Máx: 2 Pessoas", amen_max3: "Máx: 3 Pessoas",
                amen_bed_solteiro: "1 Cama de Solteiro", amen_bed_casal: "1 Cama de Casal", amen_bed_2solteiro: "2 Camas de Solteiro", amen_bed_triplo: "Camas Solteiro/Casal", amen_bed_familia: "1 Casal + 1 Solteiro",
                amen_features: "Ar-condicionado, Wi-Fi, Varanda",
                amenities_sub: "Estrutura", amenities_title: "Tudo Para Sua Comodidade",
                am_coffee_title: "Café da Manhã Regional", am_coffee_desc: "Buffet com itens quentes e frios, pães, tapioca recheada, cuscuz, omeletes e bolos caseiros.",
                am_park_title: "Estacionamento Gratuito", am_park_desc: "Vagas privativas e seguras no local para todos os hóspedes sem custo adicional.",
                am_wifi_title: "Internet de Alta Velocidade", am_wifi_desc: "Conexão Wi-Fi gratuita e de qualidade em todas as dependências do hotel.",
                am_rec_title: "Recepção 24 Horas", am_rec_desc: "Equipe sempre cordial e determinada a ajudar a qualquer hora do dia ou da noite.",
                info_sub: "Informações Úteis", info_title: "Tudo o Que Você Precisa Saber",
                pet_title: "Estadia para Pets", pet_desc: "Oferecemos hospedagem temporária para animais de estimação. Eles ficam em uma área reservada, cuidada por equipe treinada.",
                pet_opt1_b: "Até 3 diárias:", pet_opt1_s: "R$ 80,00 por animal, por diária.", pet_opt2_b: "A partir de 4 diárias:", pet_opt2_s: "Taxa única de R$ 250,00 por animal para toda a estadia.",
                pol_time_title: "Horários", pol_checkin_b: "Check-in:", pol_checkin_s: "A partir das 14h.", pol_checkout_b: "Check-out:", pol_checkout_s: "Até às 12h.",
                pol_kid_title: "Política para Crianças", pol_kid1_b: "1 criança de até 7 anos:", pol_kid1_s: "hospedagem gratuita.", 
                pol_kid2_b: "Acima de 7 anos ou mais de 1 criança:", pol_kid2_s: "consulte o hotel para condições.", 
                pol_pay_title: "Pagamento e Cancelamento", pol_pay1_b: "Parcelamento:", pol_pay1_s: "Em até 3x sem juros no cartão acima de R$ 500.", pol_pay2_b: "Cancelamento Grátis:", pol_pay2_s: "Até 28h úteis antes do check-in.",
                loc_title: "Nossa Localização", loc_desc: "Próximo a centros comerciais, paradas de metrô e vias principais do DF.",
                ft_desc: "Uma excelente opção de hospedagem em Samambaia, DF. CNPJ: 33.494.352/0001-08", ft_links: "Links Rápidos", ft_wpp: "Chamar no WhatsApp",
                ft_privacy: "Política de Privacidade (LGPD)", ft_terms: "Termos de Uso", ft_cookies: "Gerenciar Cookies",
                ft_copyright: "&copy; 2026 Hotel Samamba. Todos os direitos reservados. Conformidade LGPD & Acessibilidade W3C.",
                ck_banner_text: "Utilizamos cookies para melhorar sua experiência no site. Ao continuar navegando, você concorda com nossa",
                ck_btn_refuse: "Recusar opcionais", ck_btn_accept: "Aceitar todos",
                md_title: "Resumo da Pré-reserva", md_stay_details: "Detalhes da Estadia", md_checkin: "Check-in:", md_checkout: "Check-out:",
                md_total_nights: "Total de Diárias:", md_suite: "Suíte:", md_max_pax: "Ocupação máxima:", md_person: "pessoa(s)",
                md_daily_rate: "Valor da Diária:", md_pet_service: "Serviço de Pets", md_pet_ask: "Deseja incluir estadia na área para pet?",
                md_no: "Não", md_yes: "Sim", md_pet_limit: "É permitido levar apenas 1 pet por reserva.", md_subtotal_room: "Subtotal Acomodação:",
                md_pet_subtotal: "Serviço Pet (1 animal):", md_total_res: "Total da Reserva:", md_btn_confirm: "Confirmar Pré-reserva",
                md_contact_header: "Seus Dados para Confirmação", md_email_label: "E-mail para confirmação *", md_wpp_label: "WhatsApp / Telefone (Opcional)",
                md_hint_invalid: "* Por favor, preencha um e-mail válido para concluir a pré-reserva.", md_hint_valid: "✓ E-mail válido registrado!",
                md_success_title: "Solicitação Enviada!", md_success_desc: "Sua solicitação de pré-reserva foi registrada com sucesso! Nossa equipe enviará a confirmação e as instruções de pagamento para:", md_btn_back: "Voltar para o site",
                md_btn_close: "Compreendi e Fechar"
            },
            en: {
                nav_about: "Hotel", nav_rooms: "Suites", nav_services: "Services", nav_info: "Info", nav_contact: "Contact Us",
                hero_title: "Your perfect stay in DF", hero_desc: "Comfort, practicality and the best value for your trip in Samambaia.", hero_btn: "View Suites",
                about_sub: "Welcome to Hotel Samamba", about_title: "Comfort, practicality, and economy.", 
                about_p1: "Whether for a business trip, an appointment in the region, or a few days of rest, Hotel Samamba is the ideal choice.",
                about_p2: "At Hotel Samamba, you'll find the perfect balance between comfort, practicality, and a fair price.",
                feat_coffee: "Breakfast Included", feat_wifi: "Free Wi-Fi", feat_parking: "Parking",
                rooms_sub: "Accommodations", rooms_title: "Our Suites", rooms_desc: "From the bed to the bath – every detail was thought of for your comfort.",
                room_kid_policy: "<i class=\"fas fa-info-circle\"></i> Child Policy: 1 child up to 7 years old stays for free.",
                room_title_solteiro: "Single Suite", room_title_casal: "Couple Suite", room_title_duplo: "Double Suite", room_title_triplo: "Triple Suite", room_title_familia: "Family Suite",
                desc_solteiro: "Ideal for solo travelers looking for comfort and practicality.",
                desc_casal: "Perfect for couples wanting a comfortable and practical stay.",
                desc_duplo: "Combines comfort and functionality. Excellent option for friends or coworkers.",
                desc_triplo: "With space for up to three people, it's a great choice for small families or friends.",
                desc_familia: "Spacious environment. Ideal for those seeking practicality and comfort for families.",
                per_night: "/ night", btn_book: "Book Suite",
                amen_max1: "Max: 1 Person", amen_max2: "Max: 2 People", amen_max3: "Max: 3 People",
                amen_bed_solteiro: "1 Single Bed", amen_bed_casal: "1 Double Bed", amen_bed_2solteiro: "2 Single Beds", amen_bed_triplo: "Single/Double Beds", amen_bed_familia: "1 Double + 1 Single",
                amen_features: "Air Conditioning, Wi-Fi, Balcony",
                amenities_sub: "Facilities", amenities_title: "Everything For Your Comfort",
                am_coffee_title: "Regional Breakfast", am_coffee_desc: "Buffet with hot and cold items, breads, stuffed tapioca, couscous, and homemade cakes.",
                am_park_title: "Free Parking", am_park_desc: "Private and secure spaces on site for all guests at no extra cost.",
                am_wifi_title: "High Speed Internet", am_wifi_desc: "Free and high-quality Wi-Fi connection in all hotel facilities.",
                am_rec_title: "24-Hour Reception", am_rec_desc: "Friendly staff always ready to help at any time of day or night.",
                info_sub: "Useful Information", info_title: "Everything You Need To Know",
                pet_title: "Pet Stay", pet_desc: "We offer temporary lodging for pets in a reserved area with trained staff.",
                pet_opt1_b: "Up to 3 nights:", pet_opt1_s: "R$ 80.00 per pet, per night.", pet_opt2_b: "From 4 nights:", pet_opt2_s: "Single fee of R$ 250.00 per pet for the entire stay.",
                pol_time_title: "Schedules", pol_checkin_b: "Check-in:", pol_checkin_s: "From 2 PM.", pol_checkout_b: "Check-out:", pol_checkout_s: "Until 12 PM.",
                pol_kid_title: "Children Policy", pol_kid1_b: "1 child up to 7 years:", pol_kid1_s: "free stay.", 
                pol_kid2_b: "Over 7 years or more than 1 child:", pol_kid2_s: "contact hotel for conditions.", 
                pol_pay_title: "Payment and Cancellation", pol_pay1_b: "Installments:", pol_pay1_s: "Up to 3x interest-free for expenses over R$ 500.", pol_pay2_b: "Free Cancellation:", pol_pay2_s: "Up to 28h before check-in.",
                loc_title: "Our Location", loc_desc: "Close to commercial centers, subway stops, and main roads.",
                ft_desc: "An excellent lodging option in Samambaia, DF. CNPJ: 33.494.352/0001-08", ft_links: "Quick Links", ft_wpp: "Message on WhatsApp",
                ft_privacy: "Privacy Policy (GDPR)", ft_terms: "Terms of Use", ft_cookies: "Manage Cookies",
                ft_copyright: "&copy; 2026 Hotel Samamba. All rights reserved. GDPR Compliance & W3C Accessibility.",
                ck_banner_text: "We use cookies to improve your experience on our website. By continuing, you agree to our",
                ck_btn_refuse: "Decline optional", ck_btn_accept: "Accept all",
                md_title: "Pre-reservation Summary", md_stay_details: "Stay Details", md_checkin: "Check-in:", md_checkout: "Check-out:",
                md_total_nights: "Total Nights:", md_suite: "Suite:", md_max_pax: "Max Occupancy:", md_person: "person(s)",
                md_daily_rate: "Daily Rate:", md_pet_service: "Pet Service", md_pet_ask: "Would you like to include pet accommodation?",
                md_no: "No", md_yes: "Yes", md_pet_limit: "Only 1 pet is allowed per reservation.", md_subtotal_room: "Accommodation Subtotal:",
                md_pet_subtotal: "Pet Service (1 pet):", md_total_res: "Total Amount:", md_btn_confirm: "Confirm Pre-reservation",
                md_contact_header: "Your Information for Confirmation", md_email_label: "Email for confirmation *", md_wpp_label: "WhatsApp / Phone (Optional)",
                md_hint_invalid: "* Please fill in a valid email address to complete your pre-reservation.", md_hint_valid: "✓ Valid email registered!",
                md_success_title: "Request Sent!", md_success_desc: "Your pre-booking request was successfully registered! Our team will send confirmation and payment instructions to:", md_btn_back: "Back to website",
                md_btn_close: "Understood & Close"
            },
            es: {
                nav_about: "El Hotel", nav_rooms: "Suites", nav_services: "Servicios", nav_info: "Información", nav_contact: "Contáctenos",
                hero_title: "Tu estancia perfecta en el DF", hero_desc: "Confort, praticidad y la mejor relación calidad-precio.", hero_btn: "Ver Suites",
                about_sub: "Bienvenido al Hotel Samamba", about_title: "Confort, praticidad y economía.", 
                about_p1: "Ya sea para un viaje de negocios, un compromiso en la región o unos días de descanso, Hotel Samamba es la opción ideal.",
                about_p2: "En el Hotel Samamba, encontrarás el equilibrio perfecto entre confort, praticidad y precio justo.",
                feat_coffee: "Desayuno Incluido", feat_wifi: "Wi-Fi Gratis", feat_parking: "Estacionamiento",
                rooms_sub: "Alojamientos", rooms_title: "Nuestras Suites", rooms_desc: "De la cama al baño – cada detalle pensado para su confort.",
                room_kid_policy: "<i class=\"fas fa-info-circle\"></i> Política de Niños: 1 niño hasta 7 años se aloja gratis.",
                room_title_solteiro: "Suite Individual", room_title_casal: "Suite Pareja", room_title_duplo: "Suite Doble", room_title_triplo: "Suite Triple", room_title_familia: "Suite Familiar",
                desc_solteiro: "Ideal para viajeros solitarios. Ambiente acogedor y funcional.",
                desc_casal: "Perfecta para parejas que desean una estancia cómoda.",
                desc_duplo: "Combina confort y funcionalidad. Excelente opción para amigos o compañeros.",
                desc_triplo: "Con espacio para hasta tres personas, ideal para familias pequeñas o amigos.",
                desc_familia: "Ambiente amplio y funcional. Ideal para quienes buscan confort para familias.",
                per_night: "/ noche", btn_book: "Reservar Suite",
                amen_max1: "Máx: 1 Persona", amen_max2: "Máx: 2 Personas", amen_max3: "Máx: 3 Personas",
                amen_bed_solteiro: "1 Cama Individual", amen_bed_casal: "1 Cama Matrimonial", amen_bed_2solteiro: "2 Camas Individuales", amen_bed_triplo: "Camas Individuales/Matrimoniales", amen_bed_familia: "1 Matrimonial + 1 Individual",
                amen_features: "Aire Acondicionado, Wi-Fi, Balcón",
                amenities_sub: "Instalaciones", amenities_title: "Todo Para Su Comodidad",
                am_coffee_title: "Desayuno Regional", am_coffee_desc: "Buffet con opciones frías y calientes, tapioca, cuscús y pasteles caseros.",
                am_park_title: "Estacionamiento Gratis", am_park_desc: "Plazas privadas y seguras en el lugar sin costo adicional.",
                am_wifi_title: "Internet de Alta Velocidad", am_wifi_desc: "Conexión Wi-Fi gratuita en todas las instalaciones del hotel.",
                am_rec_title: "Recepción 24 Horas", am_rec_desc: "Personal amable y dispuesto a ayudar en cualquier momento.",
                info_sub: "Información Útil", info_title: "Todo Lo Que Necesitas Saber",
                pet_title: "Estancia para Mascotas", pet_desc: "Ofrecemos alojamiento temporal para mascotas en un área reservada.",
                pet_opt1_b: "Hasta 3 noches:", pet_opt1_s: "R$ 80,00 por mascota, por noche.", pet_opt2_b: "A partir de 4 noches:", pet_opt2_s: "Tarifa única de R$ 250,00 por mascota para toda la estancia.",
                pol_time_title: "Horarios", pol_checkin_b: "Check-in:", pol_checkin_s: "A partir de las 14h.", pol_checkout_b: "Hasta las 12h.",
                pol_kid_title: "Política de Niños", pol_kid1_b: "1 niño hasta 7 años:", pol_kid1_s: "estancia gratis.", 
                pol_kid2_b: "Más de 7 años o más de 1 niño:", pol_kid2_s: "consulte al hotel para condiciones.", 
                pol_pay_title: "Pago y Cancelación", pol_pay1_b: "Cuotas:", pol_pay1_s: "Hasta 3x sin interés para gastos sobre R$ 500.", pol_pay2_b: "Cancelación Gratis:", pol_pay2_s: "Hasta 28h antes del check-in.",
                loc_title: "Nuestra Ubicación", loc_desc: "Cerca de centros comerciales, metro y vías principales.",
                ft_desc: "Una excelente opción de alojamiento en Samambaia, DF. CNPJ: 33.494.352/0001-08", ft_links: "Enlaces Rápidos", ft_wpp: "Llamar en WhatsApp",
                ft_privacy: "Política de Privacidad (LGPD)", ft_terms: "Términos de Uso", ft_cookies: "Gestionar Cookies",
                ft_copyright: "&copy; 2026 Hotel Samamba. Todos los derechos reservados. Conformidad LGPD y Accesibilidad W3C.",
                ck_banner_text: "Utilizamos cookies para mejorar su experiencia en nuestro sitio. Al continuar navegando, usted acepta nuestra",
                ck_btn_refuse: "Rechazar opcionales", ck_btn_accept: "Aceptar todos",
                md_title: "Resumen de la Pre-reserva", md_stay_details: "Detalles de la Estancia", md_checkin: "Check-in:", md_checkout: "Check-out:",
                md_total_nights: "Noches Totales:", md_suite: "Suite:", md_max_pax: "Ocupación máxima:", md_person: "persona(s)",
                md_daily_rate: "Precio por Noche:", md_pet_service: "Servicio de Mascotas", md_pet_ask: "¿Desea incluir estancia en el área de mascotas?",
                md_no: "No", md_yes: "Sí", md_pet_limit: "Solo se permite 1 mascota por reserva.", md_subtotal_room: "Subtotal Alojamiento:",
                md_pet_subtotal: "Servicio Mascotas (1 mascota):", md_total_res: "Total Reserva:", md_btn_confirm: "Confirmar Pre-reserva",
                md_contact_header: "Sus Datos para Confirmación", md_email_label: "Correo electrónico para confirmación *", md_wpp_label: "WhatsApp / Teléfono (Opcional)",
                md_hint_invalid: "* Por favor, ingrese un correo válido para completar su pre-reserva.", md_hint_valid: "✓ ¡Correo válido registrado!",
                md_success_title: "¡Solicitud Enviada!", md_success_desc: "¡Su solicitud de pre-reserva ha sido registrada con éxito! Nuestro equipo enviará la confirmación e instrucciones a:", md_btn_back: "Volver al sitio",
                md_btn_close: "Comprendido y Cerrar"
            }
        };
        this.init();
    }

    init() {
        const langSalvo = localStorage.getItem('hotel_lang');
        if (langSalvo && this.dicionario[langSalvo]) {
            this.currentLang = langSalvo;
        }
        this.applyTranslations();
    }

    changeLanguage(lang) {
        if(!this.dicionario[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('hotel_lang', lang);
        this.applyTranslations();

        if (window.app && window.app.reserva && !document.getElementById('modal-overlay').classList.contains('hidden')) {
            window.app.reserva.renderModal();
        }
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.dicionario[this.currentLang][key]) {
                el.innerHTML = this.dicionario[this.currentLang][key];
            }
        });
    }
}

class GerenciadorCookies {
    constructor() {
        this.chaveStorage = 'hotel_samamba_cookie_prefs';
        this.banner = null;
        this.init();
    }

    init() {
        this.banner = document.getElementById('cookie-banner');
        document.getElementById('btn-aceitar-cookies')?.addEventListener('click', () => this.salvarEFechar('aceitos'));
        document.getElementById('btn-rejeitar-cookies')?.addEventListener('click', () => this.salvarEFechar('recusados'));

        if (!localStorage.getItem(this.chaveStorage)) {
            this.banner.style.display = 'block';
        }
    }

    salvarEFechar(opcao) {
        localStorage.setItem(this.chaveStorage, opcao);
        this.banner.style.display = 'none';
        const lang = window.app ? window.app.traducao.currentLang : 'pt';
        const msg = opcao === 'aceitos' 
            ? (lang === 'en' ? 'Cookies accepted!' : lang === 'es' ? '¡Cookies aceptadas!' : 'Cookies aceitos com sucesso!')
            : (lang === 'en' ? 'Only essential cookies active.' : lang === 'es' ? 'Solo cookies esenciales activas.' : 'Apenas cookies essenciais ativos.');
        if (window.app) window.app.showToast(msg);
    }
}

// Gerenciador de Modais com Tradução Dinâmica e Instantânea
class GerenciadorModal {
    constructor() {
        this.overlay = document.getElementById('modal-overlay');
        this.content = document.getElementById('modal-content');
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.overlay.classList.contains('hidden')) {
                this.fechar();
            }
        });

        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.fechar();
        });
    }

    abrir(htmlContent) {
        this.content.innerHTML = htmlContent;
        this.overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    fechar() {
        this.overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    abrirModalGenerico(tipo) {
        const lang = (window.app && window.app.traducao) ? window.app.traducao.currentLang : (localStorage.getItem('hotel_lang') || 'pt');
        const txt = (window.app && window.app.traducao) ? window.app.traducao.dicionario[lang] : {};

        // Define o texto exato do botão de fechar para cada idioma
        const btnTextoFechar = lang === 'en' ? 'Understood & Close' : lang === 'es' ? 'Comprendido y Cerrar' : 'Compreendi e Fechar';

        let titulo = '';
        let corpo = '';

        if (tipo === 'privacidade') {
            titulo = txt.ft_privacy || 'Política de Privacidade (LGPD)';
            corpo = lang === 'en' ? `
                <div class="generic-modal-body">
                    <p><strong>Hotel Samamba</strong> (CNPJ: 33.494.352/0001-08) values your privacy and ensures compliance with General Data Protection Regulation standards.</p>
                    <h3>1. Data Collection & Purpose</h3>
                    <p>We collect personal information (Name, Email, Phone/WhatsApp) strictly to verify room availability, send pre-booking vouchers, and communicate payment terms.</p>
                    <h3>2. Data Retention & Security</h3>
                    <p>Your personal data is never sold, shared, or transferred to third parties for marketing purposes. Data is safely stored for administrative compliance.</p>
                    <h3>3. Guest Rights</h3>
                    <p>Under privacy laws, guests have the right to request access, correction, or permanent deletion of their personal data from our records at any time by emailing <em>contato@hotelsamamba.com.br</em>.</p>
                </div>
            ` : lang === 'es' ? `
                <div class="generic-modal-body">
                    <p>El <strong>Hotel Samamba</strong> (CNPJ: 33.494.352/0001-08) garantiza el cumplimiento de las normativas de protección de datos personales.</p>
                    <h3>1. Recopilación de Datos</h3>
                    <p>Recopilamos nombre, correo electrónico y teléfono/WhatsApp exclusivamente para verificar la disponibilidad de suites, emitir vales de pre-reserva e instruir los pagos.</p>
                    <h3>2. Almacenamiento y Seguridad</h3>
                    <p>Sus datos personales no se comparten con terceros para fines comerciales y se conservan de forma segura bajo estándares de encriptación.</p>
                    <h3>3. Derechos del Usuario</h3>
                    <p>Puede solicitar el acceso, corrección o eliminación completa de sus datos enviando un correo a <em>contato@hotelsamamba.com.br</em>.</p>
                </div>
            ` : `
                <div class="generic-modal-body">
                    <p>O <strong>Hotel Samamba</strong> (CNPJ: 33.494.352/0001-08) valoriza a sua privacidade e garante a conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).</p>
                    <h3>1. Coleta e Finalidade dos Dados</h3>
                    <p>Coletamos informações pessoais como nome, e-mail e telefone/WhatsApp com a finalidade exclusiva de processar solicitações de pré-reserva, confirmar disponibilidade de acomodações e fornecer suporte durante a hospedagem.</p>
                    <h3>2. Armazenamento e Compartilhamento</h3>
                    <p>Seus dados pessoais são armazenados em ambiente seguro e <strong>jamais serão comercializados ou compartilhados com terceiros</strong> para fins publicitários ou promocionais sem o seu consentimento prévio.</p>
                    <h3>3. Seus Direitos como Titular</h3>
                    <p>Você pode solicitar a qualquer momento a confirmação da existência de tratamento, correção de dados incompletos ou a exclusão definitiva das suas informações de nossos registros mediante contato direto pelo e-mail <em>contato@hotelsamamba.com.br</em>.</p>
                </div>
            `;
        } else if (tipo === 'termos') {
            titulo = txt.ft_terms || 'Termos de Uso';
            corpo = lang === 'en' ? `
                <div class="generic-modal-body">
                    <p>Welcome to <strong>Hotel Samamba</strong>. By utilizing our online reservation system, you agree to the following operational terms:</p>
                    <h3>1. Pre-Booking Nature</h3>
                    <p>All bookings requested through this website operate as <strong>Pre-Reservations</strong>. Reservation confirmation is contingent upon physical availability and reception validation.</p>
                    <h3>2. Check-in & Check-out Rules</h3>
                    <p>Check-in starts at 14:00 (2:00 PM). Check-out must be completed by 12:00 (12:00 PM noon). Extensions are subject to suite availability and extra hourly charges.</p>
                    <h3>3. Cancellation Policy</h3>
                    <p>Free cancellation is guaranteed up to 28 business hours prior to check-in. Cancellations made after this period are non-refundable.</p>
                </div>
            ` : lang === 'es' ? `
                <div class="generic-modal-body">
                    <p>Bienvenido al <strong>Hotel Samamba</strong>. Al utilizar nuestro sistema de reservas en línea, acepta los siguientes términos de servicio:</p>
                    <h3>1. Carácter de Pre-Reserva</h3>
                    <p>Las solicitudes realizadas en el sitio actúan como <strong>Pre-Reservas</strong>. La confirmación final depende de la disponibilidad física de las suites.</p>
                    <h3>2. Horarios de Check-in y Check-out</h3>
                    <p>Check-in a partir de las 14:00h. Check-out hasta las 12:00h. Extensiones sujetas a disponibilidad y tarifas adicionales.</p>
                    <h3>3. Cancelación</h3>
                    <p>Cancelación gratuita hasta 28 horas hábiles antes del check-in. Cancelaciones posteriores perderán el pago de garantía.</p>
                </div>
            ` : `
                <div class="generic-modal-body">
                    <p>Bem-vindo ao <strong>Hotel Samamba</strong>. Ao utilizar nosso site e sistema de pré-reserva, você concorda com os seguintes termos e condições:</p>
                    <h3>1. Modelo de Solicitação de Pré-Reserva</h3>
                    <p>Todas as reservas solicitadas através desta plataforma funcionam como <strong>Solicitações de Pré-Reserva</strong>. A reserva definitiva fica sujeita à confirmação de disponibilidade da recepção e ao pagamento da garantia.</p>
                    <h3>2. Horários e Regras da Hospedagem</h3>
                    <p>O <em>Check-in</em> é realizado a partir das 14h e o <em>Check-out</em> deve ser efetuado até às 12h. O atraso no check-out poderá acarretar cobrança de diária adicional.</p>
                    <h3>3. Política de Cancelamento e Alterações</h3>
                    <p>O cancelamento sem custos é garantido para solicitações realizadas com até 28 horas úteis de antecedência em relação ao horário de check-in.</p>
                </div>
            `;
        } else if (tipo === 'cookies') {
            titulo = txt.ft_cookies || 'Gerenciar Cookies';
            corpo = lang === 'en' ? `
                <div class="generic-modal-body">
                    <p>We use cookies and similar technologies to store website preferences, personalize your browsing, and secure form submissions.</p>
                    <h3>1. Essential Cookies (Mandatory)</h3>
                    <p>Necessary for core functionalities like multi-language switching, font scaling accessibility, and secure modal processing.</p>
                    <h3>2. Analytical & Functional Cookies (Optional)</h3>
                    <p>Help us analyze traffic trends and measure page loading speed to deliver a superior digital experience.</p>
                    <div style="margin-top:20px; display:flex; gap:10px;">
                        <button type="button" class="btn-cookie-secundario" style="flex:1;" onclick="app.cookies.salvarEFechar('recusados'); app.modal.fechar();">Decline Optional</button>
                        <button type="button" class="btn-cookie-primario" style="flex:1;" onclick="app.cookies.salvarEFechar('aceitos'); app.modal.fechar();">Accept All</button>
                    </div>
                </div>
            ` : lang === 'es' ? `
                <div class="generic-modal-body">
                    <p>Utilizamos cookies para garantizar la seguridad de su navegación y personalizar la experiencia en nuestro portal.</p>
                    <h3>1. Cookies Esenciales (Obligatorias)</h3>
                    <p>Indispensables para guardar configuraciones de accesibilidad, idioma del sitio y estado de la reserva.</p>
                    <h3>2. Cookies Funcionales (Opcionales)</h3>
                    <p>Permiten analizar el uso de las suites y optimizar el rendimiento de la página web.</p>
                    <div style="margin-top:20px; display:flex; gap:10px;">
                        <button type="button" class="btn-cookie-secundario" style="flex:1;" onclick="app.cookies.salvarEFechar('recusados'); app.modal.fechar();">Rechazar Opcionales</button>
                        <button type="button" class="btn-cookie-primario" style="flex:1;" onclick="app.cookies.salvarEFechar('aceitos'); app.modal.fechar();">Aceptar Todos</button>
                    </div>
                </div>
            ` : `
                <div class="generic-modal-body">
                    <p>Utilizamos cookies para garantir a navegação segura, personalizar sua experiência e salvar preferências do usuário.</p>
                    <h3>1. Cookies Estritamente Necessários (Obrigatórios)</h3>
                    <p>Fundamentais para guardar as escolhas de acessibilidade (tamanho da fonte/contraste), troca dinâmica de idiomas e persistência do formulário de reserva.</p>
                    <h3>2. Cookies Analíticos e de Desempenho (Opcionais)</h3>
                    <p>Permitem mensurar o tráfego do site, otimizar o tempo de carregamento e oferecer um serviço cada vez mais eficiente.</p>
                    <div style="margin-top:20px; display:flex; gap:10px;">
                        <button type="button" class="btn-cookie-secundario" style="flex:1;" onclick="app.cookies.salvarEFechar('recusados'); app.modal.fechar();">Recusar Opcionais</button>
                        <button type="button" class="btn-cookie-primario" style="flex:1;" onclick="app.cookies.salvarEFechar('aceitos'); app.modal.fechar();">Aceitar Todos</button>
                    </div>
                </div>
            `;
        }

        const html = `
            <div class="modal-header">
                <h2>${titulo}</h2>
                <button type="button" class="close-modal" onclick="app.modal.fechar()" aria-label="Fechar">×</button>
            </div>
            ${corpo}
            ${tipo !== 'cookies' ? `<button type="button" class="btn-checkout-final" style="margin-top:20px;" onclick="app.modal.fechar()">${btnTextoFechar}</button>` : ''}
        `;
        this.abrir(html);
    }
}

class GerenciadorReserva {
    constructor(traducaoService, modalService) {
        this.traducao = traducaoService;
        this.modal = modalService;
        this.suites = {
            'solteiro': new Acomodacao('solteiro', 'Suíte Solteiro', 129, 1),
            'casal': new Acomodacao('casal', 'Suíte Casal', 179, 2),
            'duplo': new Acomodacao('duplo', 'Suíte Duplo', 199, 2),
            'triplo': new Acomodacao('triplo', 'Suíte Triplo', 259, 3),
            'familia': new Acomodacao('familia', 'Suíte Família', 279, 3)
        };
        this.modalState = { suiteKey: null, incluiPet: 'nao', checkin: '', checkout: '', email: '', whatsapp: '' };
    }

    iniciarReserva(suiteKey) {
        this.modalState.suiteKey = suiteKey;
        this.modalState.incluiPet = 'nao';
        this.modalState.email = '';
        this.modalState.whatsapp = '';

        if (!this.modalState.checkin) {
            const timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
            const hoje = new Date(Date.now() - timezoneOffset);
            const amanha = new Date(hoje);
            amanha.setDate(amanha.getDate() + 1);
            
            this.modalState.checkin = hoje.toISOString().split('T')[0];
            this.modalState.checkout = amanha.toISOString().split('T')[0];
        }

        this.renderModal();
    }

    atualizarDatas() {
        const ci = document.getElementById('modal-checkin').value;
        let co = document.getElementById('modal-checkout').value;
        
        if (ci && co) {
            if (co <= ci) {
                const ciDate = new Date(ci);
                ciDate.setDate(ciDate.getDate() + 1);
                co = ciDate.toISOString().split('T')[0];
            }
            this.modalState.checkin = ci;
            this.modalState.checkout = co;
            this.renderModal();
        }
    }

    atualizarPet(valor) {
        this.modalState.incluiPet = valor;
        this.renderModal();
    }

    validarContato() {
        const emailInput = document.getElementById('modal-email');
        const hint = document.getElementById('contact-hint');
        const txt = this.traducao.dicionario[this.traducao.currentLang];

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);

        if (emailValido) {
            emailInput.style.borderColor = '#10B981';
            emailInput.style.backgroundColor = '#F0FDF4';
            hint.textContent = txt.md_hint_valid || '✓ E-mail válido registrado!';
            hint.style.color = '#10B981';
            return true;
        } else {
            emailInput.style.borderColor = '#EF4444';
            emailInput.style.backgroundColor = '#FEF2F2';
            hint.textContent = txt.md_hint_invalid || '* Por favor, preencha um e-mail válido para concluir a pré-reserva.';
            hint.style.color = '#EF4444';
            return false;
        }
    }

    processarCliqueConfirmacao() {
        const emailInput = document.getElementById('modal-email');
        const isValido = this.validarContato();

        if (isValido) {
            this.finalizarReserva();
        } else {
            emailInput?.focus();
            const hint = document.getElementById('contact-hint');
            if (hint) {
                hint.style.fontSize = '0.9rem';
                hint.style.fontWeight = '700';
                setTimeout(() => { hint.style.fontSize = '0.83rem'; }, 2000);
            }
        }
    }

    renderModal() {
        const txt = this.traducao.dicionario[this.traducao.currentLang];
        const dias = Math.ceil((new Date(this.modalState.checkout) - new Date(this.modalState.checkin)) / (1000 * 60 * 60 * 24)) || 1;
        const suite = this.suites[this.modalState.suiteKey];
        const valorAcomodacao = dias * suite.preco;
        let valorPets = (this.modalState.incluiPet === 'sim') ? ((dias <= 3) ? (80 * dias) : 250) : 0;
        const valorTotal = valorAcomodacao + valorPets;
        const minCheckin = (new Date()).toISOString().split('T')[0];
        const suiteNomeTraduzido = txt[`room_title_${this.modalState.suiteKey}`] || suite.nome;
        const formatBRL = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

        const modalHTML = `
            <div class="modal-header">
                <h2>${txt.md_title}</h2>
                <button type="button" class="close-modal" onclick="app.modal.fechar()" aria-label="Fechar">×</button>
            </div>
            
            <div class="modal-body-grid">
                <div class="modal-step">
                    <h3>${txt.md_stay_details}</h3>
                    <div class="modal-dates">
                        <div class="input-group-modal">
                            <label for="modal-checkin">${txt.md_checkin}</label>
                            <input type="date" id="modal-checkin" value="${this.modalState.checkin}" min="${minCheckin}" onchange="app.reserva.atualizarDatas()">
                        </div>
                        <div class="input-group-modal">
                            <label for="modal-checkout">${txt.md_checkout}</label>
                            <input type="date" id="modal-checkout" value="${this.modalState.checkout}" onchange="app.reserva.atualizarDatas()">
                        </div>
                    </div>
                    <p><strong>${txt.md_total_nights}</strong> ${dias}</p>
                    <hr>
                    <p><strong>${txt.md_suite}</strong> ${suiteNomeTraduzido}</p>
                    <p><strong>${txt.md_daily_rate}</strong> ${formatBRL(suite.preco)}</p>
                </div>
                
                <div class="modal-step pet-selection-box">
                    <h3>${txt.md_pet_service}</h3>
                    <p>${txt.md_pet_ask}</p>
                    <div class="radio-group" style="margin-bottom: 10px;">
                        <label><input type="radio" name="pet_opt" value="nao" ${this.modalState.incluiPet === 'nao' ? 'checked' : ''} onchange="app.reserva.atualizarPet('nao')"> ${txt.md_no}</label>
                        <label><input type="radio" name="pet_opt" value="sim" ${this.modalState.incluiPet === 'sim' ? 'checked' : ''} onchange="app.reserva.atualizarPet('sim')"> ${txt.md_yes}</label>
                    </div>
                    ${this.modalState.incluiPet === 'sim' ? `
                        <div style="font-size: 0.8rem; color: var(--accent); background: rgba(245, 158, 11, 0.1); padding: 8px 10px; border-radius: 6px; border-left: 3px solid var(--accent);">
                            <i class="fas fa-paw"></i> ${txt.md_pet_limit}
                        </div>
                    ` : ''}
                </div>
            </div>

            <div class="modal-step" style="margin-bottom: 20px;">
                <h3><i class="fas fa-address-card" style="color:var(--primary);"></i> ${txt.md_contact_header}</h3>
                
                <div class="input-group-modal" style="margin-bottom: 12px;">
                    <label for="modal-email">${txt.md_email_label}</label>
                    <input type="email" id="modal-email" placeholder="seuemail@exemplo.com" oninput="app.reserva.validarContato()">
                </div>

                <div class="input-group-modal">
                    <label for="modal-whatsapp">${txt.md_wpp_label}</label>
                    <input type="tel" id="modal-whatsapp" placeholder="(61) 99999-9999 ou nº internacional">
                </div>
                <div id="contact-hint" class="field-hint" style="font-size:0.83rem; color:var(--text-muted); margin-top:6px; transition: all 0.3s;">
                    * Por favor, preencha um e-mail válido para concluir a pré-reserva.
                </div>
            </div>

            <div class="summary-box">
                <div class="summary-row">
                    <span>${txt.md_subtotal_room}</span>
                    <span>${formatBRL(valorAcomodacao)}</span>
                </div>
                ${this.modalState.incluiPet === 'sim' ? `
                    <div class="summary-row">
                        <span>${txt.md_pet_subtotal}</span>
                        <span>${formatBRL(valorPets)}</span>
                    </div>
                ` : ''}
                
                <div class="summary-row final-total">
                    <span>${txt.md_total_res}</span>
                    <span id="final-total">${formatBRL(valorTotal)}</span>
                </div>
            </div>
            
            <button type="button" id="btn-confirmar-reserva" class="btn-checkout-final" onclick="app.reserva.processarCliqueConfirmacao()">
                ${txt.md_btn_confirm}
            </button>
        `;

        this.modal.abrir(modalHTML);
    }

    finalizarReserva() {
        const txt = this.traducao.dicionario[this.traducao.currentLang];
        const emailDigitado = document.getElementById('modal-email')?.value || 'seu e-mail cadastrado';
        const wppDigitado = document.getElementById('modal-whatsapp')?.value;

        const successHTML = `
            <div class="success-screen">
                <div class="success-icon" style="background: #0284C7;">
                    <i class="fas fa-check-circle" aria-hidden="true"></i>
                </div>
                <h2>${txt.md_success_title}</h2>
                <p>${txt.md_success_desc}</p>
                
                <div style="background: #F0FDF4; border: 2px solid #10B981; padding: 14px; border-radius: 12px; margin-bottom: 20px; font-weight: 600; color: #047857; font-size: 1rem; text-align: left;">
                    <div style="margin-bottom: 4px;"><i class="fas fa-envelope" style="margin-right: 8px;"></i> <strong>E-mail:</strong> ${emailDigitado}</div>
                    ${wppDigitado ? `<div><i class="fab fa-whatsapp" style="margin-right: 8px; color: #25D366;"></i> <strong>WhatsApp:</strong> ${wppDigitado}</div>` : ''}
                </div>

                <button type="button" class="btn-checkout-final" onclick="app.modal.fechar()">
                    ${txt.md_btn_back}
                </button>
            </div>
        `;
        this.modal.abrir(successHTML);
    }
}

class HotelApp {
    constructor() {
        this.acessibilidade = new GerenciadorAcessibilidade();
        this.traducao = new GerenciadorTraducao();
        this.cookies = new GerenciadorCookies();
        this.modal = new GerenciadorModal();
        this.reserva = new GerenciadorReserva(this.traducao, this.modal);
        this.heroIndex = 0;
        this.heroTimer = null;
        this.carouselsPos = { solteiro: 0, casal: 0, duplo: 0, triplo: 0, familia: 0 };
    }

    init() {
        this.setupScrollListener();
        this.setupMobileMenu();
        this.setupIntersectionObserver();
        this.startHeroTimer();
        this.setupTouchCarousels();
    }

    setupScrollListener() {
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        });
    }

    setupMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        mobileMenu?.addEventListener('click', () => { navLinks.classList.toggle('active'); });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => { navLinks.classList.remove('active'); });
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    }

    showHeroSlide(index) {
        const slides = document.querySelectorAll('.hero-carousel .slide');
        const dots = document.querySelectorAll('.carousel-indicators .dot');
        if (!slides.length) return;
        
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        if (index >= slides.length) this.heroIndex = 0;
        else if (index < 0) this.heroIndex = slides.length - 1;
        else this.heroIndex = index;
        
        slides[this.heroIndex].classList.add('active');
        dots[this.heroIndex].classList.add('active');
    }

    nextHeroSlide() {
        this.showHeroSlide(this.heroIndex + 1);
    }

    startHeroTimer() {
        clearInterval(this.heroTimer);
        this.heroTimer = setInterval(() => this.nextHeroSlide(), 5000);
    }

    moveHeroSlide(n) {
        this.showHeroSlide(this.heroIndex + n);
        this.startHeroTimer();
    }

    currentHeroSlide(n) {
        this.showHeroSlide(n);
        this.startHeroTimer();
    }

    moveRoomCarousel(suite, dir) {
        const track = document.querySelector(`#carousel-${suite} .room-carousel-track`);
        if(!track) return;
        const slides = track.querySelectorAll('.room-slide');
        if(slides.length === 0) return;
        
        this.carouselsPos[suite] = (this.carouselsPos[suite] || 0) + dir;
        if (this.carouselsPos[suite] < 0) this.carouselsPos[suite] = slides.length - 1;
        if (this.carouselsPos[suite] >= slides.length) this.carouselsPos[suite] = 0;
        
        track.style.transform = `translateX(-${this.carouselsPos[suite] * 100}%)`;
    }

    setupTouchCarousels() {
        document.querySelectorAll('.room-carousel').forEach(carousel => {
            let startX = 0;
            carousel.addEventListener('touchstart', e => { startX = e.changedTouches[0].screenX; }, {passive: true});
            carousel.addEventListener('touchend', e => {
                let endX = e.changedTouches[0].screenX;
                let suite = carousel.id.replace('carousel-', '');
                if (startX - endX > 30) this.moveRoomCarousel(suite, 1);
                else if (endX - startX > 30) this.moveRoomCarousel(suite, -1);
            });
        });
    }

    showToast(msg) {
        const toast = document.getElementById('toast');
        if(!toast) return;
        toast.textContent = msg;
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3500);
    }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new HotelApp();
    app.init();
});

// Funções globais de atalho para garantir que os links do HTML sempre funcionem
function moveHeroSlide(n) { app.moveHeroSlide(n); }
function currentHeroSlide(n) { app.currentHeroSlide(n); }
function moveRoomCarousel(suite, dir) { app.moveRoomCarousel(suite, dir); }
function abrirModalGenerico(tipo) { app.modal.abrirModalGenerico(tipo); }