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
            if (window.app) window.app.showToast('leitura pausada.');
            return;
        }

        const secoes = document.querySelectorAll('section[id], footer');
        let textos = [];

        secoes.forEach(secao => {
            const textoLimpo = secao.innerText
                .replace(/[\u276E\u276F×]/g, '')
                .replace(/\s+/g, ' ')
                .trim();
            
            if (textoLimpo) {
                textos.push(textoLimpo);
            }
        });

        const textoParaLer = textos.join('. ');
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(textoParaLer);
        utterance.lang = app.traducao.currentLang === 'pt' ? 'pt-BR' : app.traducao.currentLang === 'es' ? 'es-ES' : 'en-US';
        utterance.rate = 1.05;
        
        utterance.onend = () => { this.isReading = false; };
        utterance.onerror = () => { this.isReading = false; };
        
        window.speechSynthesis.speak(utterance);
        this.isReading = true;
        if (window.app) window.app.showToast('Iniciando leitura completa da página...');
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
                // Checkout Completo
                md_title: "Checkout & Pagamento Online", md_stay_details: "Detalhes da Estadia", md_checkin: "Check-in:", md_checkout: "Check-out:",
                md_total_nights: "Total de Diárias:", md_suite: "Suíte:", md_daily_rate: "Valor da Diária:",
                md_pet_service: "Serviço de Pets", md_pet_ask: "Deseja incluir estadia na área para pet?",
                md_no: "Não", md_yes: "Sim", md_pet_limit: "É permitido levar apenas 1 pet por reserva.",
                md_guest_header: "Dados do Hóspede (Check-in Digital)", md_name_label: "Nome Completo *", md_name_ph: "Nome do titular da reserva",
                md_email_label: "E-mail para Voucher *", md_email_ph: "seuemail@exemplo.com",
                md_pay_header: "Forma de Pagamento", md_pay_card: "Cartão (até 10x)", md_pay_pix: "PIX", md_pay_boleto: "Boleto",
                md_card_num: "Número do Cartão *", md_card_holder: "Nome Impresso no Cartão *", md_card_exp: "Validade *", md_card_cvv: "CVV *", md_card_inst: "Opções de Parcelamento",
                md_no_interest: "sem juros", md_with_interest: "com juros (1,99% a.m.)",
                md_pix_title: "QR Code PIX Instantâneo", md_pix_desc: "Escaneie o QR Code abaixo com o app do seu banco ou copie o código. A confirmação na recepção é imediata.",
                md_pix_copy: "Copiar Código PIX", md_pix_copied: "Código PIX copiado para a área de transferência!",
                md_bol_title: "Boleto Bancário Registrado", md_bol_benef: "Beneficiário: HOTEL SAMAMBA LTDA • CNPJ: 33.494.352/0001-08",
                md_bol_due: "Vencimento:", md_bol_copy: "Copiar Linha Digitável", md_bol_copied: "Linha digitável do boleto copiada!",
                md_bol_note: "Sua suíte fica pré-bloqueada por 48h aguardando a compensação bancária.",
                md_subtotal_room: "Subtotal Acomodação:", md_pet_subtotal: "Serviço Pet (1 animal):", md_interest_row: "Encargos de Parcelamento:", md_total_res: "Total Final:",
                md_btn_pay_card: "Confirmar Pagamento no Cartão", md_btn_pay_pix: "Já fiz o PIX • Confirmar Reserva", md_btn_pay_bol: "Gerar Boleto e Reservar",
                md_processing: "Sincronizando reserva com o sistema da recepção...",
                md_err_fields: "* Por favor, preencha corretamente seu nome, e-mail válido e os dados do pagamento.",
                md_success_title_paid: "Pagamento Aprovado & Reserva Confirmada!",
                md_success_title_bol: "Boleto Gerado & Suíte Pré-Reservada!",
                md_success_desc_paid: "Sua reserva já foi integrada automaticamente ao sistema da recepção do Hotel Samamba. O comprovante e o voucher de check-in foram enviados para o seu e-mail.",
                md_success_desc_bol: "O boleto foi registrado e enviado para o seu e-mail. Assim que o banco confirmar o pagamento, o check-in será liberado automaticamente na recepção.",
                md_voucher_code: "Código da Reserva:", md_voucher_protocol: "Protocolo Recepção:",
                md_status_paid: "Status: PAGO • Confirmado na Recepção", md_status_bol: "Status: AGUARDANDO COMPENSAÇÃO BANCÁRIA",
                md_btn_back: "Concluir e Voltar ao Site", md_btn_close: "Compreendi e Fechar"
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
                // Checkout
                md_title: "Online Checkout & Payment", md_stay_details: "Stay Details", md_checkin: "Check-in:", md_checkout: "Check-out:",
                md_total_nights: "Total Nights:", md_suite: "Suite:", md_daily_rate: "Daily Rate:",
                md_pet_service: "Pet Service", md_pet_ask: "Would you like to include pet accommodation?",
                md_no: "No", md_yes: "Yes", md_pet_limit: "Only 1 pet is allowed per reservation.",
                md_guest_header: "Guest Details (Digital Check-in)", md_name_label: "Full Name *", md_name_ph: "Reservation holder name",
                md_email_label: "Email for Voucher *", md_email_ph: "youremail@example.com",
                md_pay_header: "Payment Method", md_pay_card: "Card (up to 10x)", md_pay_pix: "PIX", md_pay_boleto: "Bank Slip",
                md_card_num: "Card Number *", md_card_holder: "Cardholder Name *", md_card_exp: "Expiry *", md_card_cvv: "CVV *", md_card_inst: "Installments",
                md_no_interest: "interest-free", md_with_interest: "with interest (1.99%/mo)",
                md_pix_title: "Instant PIX QR Code", md_pix_desc: "Scan the QR Code with your banking app or copy the code. Front desk confirmation is immediate.",
                md_pix_copy: "Copy PIX Code", md_pix_copied: "PIX code copied to clipboard!",
                md_bol_title: "Registered Bank Slip (Boleto)", md_bol_benef: "Payee: HOTEL SAMAMBA LTDA • CNPJ: 33.494.352/0001-08",
                md_bol_due: "Due Date:", md_bol_copy: "Copy Barcode Number", md_bol_copied: "Barcode number copied!",
                md_bol_note: "Your suite is held for 48 hours awaiting bank clearance.",
                md_subtotal_room: "Accommodation Subtotal:", md_pet_subtotal: "Pet Service (1 pet):", md_interest_row: "Installment Interest:", md_total_res: "Final Total:",
                md_btn_pay_card: "Confirm Card Payment", md_btn_pay_pix: "I've Paid via PIX • Confirm Booking", md_btn_pay_bol: "Generate Slip & Book",
                md_processing: "Syncing reservation with front desk system...",
                md_err_fields: "* Please fill in your full name, valid email, and payment details.",
                md_success_title_paid: "Payment Approved & Booking Confirmed!",
                md_success_title_bol: "Bank Slip Generated & Suite Reserved!",
                md_success_desc_paid: "Your booking has been automatically synced with Hotel Samamba's front desk. Your digital voucher was sent to your email.",
                md_success_desc_bol: "Your bank slip was registered and emailed. Once cleared, check-in is automatically unlocked at the front desk.",
                md_voucher_code: "Booking Code:", md_voucher_protocol: "Front Desk Protocol:",
                md_status_paid: "Status: PAID • Confirmed at Front Desk", md_status_bol: "Status: AWAITING BANK CLEARANCE",
                md_btn_back: "Finish & Back to Website", md_btn_close: "Understood & Close"
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
                // Checkout
                md_title: "Checkout y Pago Online", md_stay_details: "Detalles de la Estancia", md_checkin: "Check-in:", md_checkout: "Check-out:",
                md_total_nights: "Noches Totales:", md_suite: "Suite:", md_daily_rate: "Precio por Noche:",
                md_pet_service: "Servicio de Mascotas", md_pet_ask: "¿Desea incluir estancia en el área de mascotas?",
                md_no: "No", md_yes: "Sí", md_pet_limit: "Solo se permite 1 mascota por reserva.",
                md_guest_header: "Datos del Huésped (Check-in Digital)", md_name_label: "Nombre Completo *", md_name_ph: "Nombre del titular de la reserva",
                md_email_label: "Correo para Voucher *", md_email_ph: "sucorreo@ejemplo.com",
                md_pay_header: "Método de Pago", md_pay_card: "Tarjeta (hasta 10x)", md_pay_pix: "PIX", md_pay_boleto: "Boleto",
                md_card_num: "Número de Tarjeta *", md_card_holder: "Nombre en la Tarjeta *", md_card_exp: "Vencimiento *", md_card_cvv: "CVV *", md_card_inst: "Opciones de Cuotas",
                md_no_interest: "sin interés", md_with_interest: "con interés (1,99% mensual)",
                md_pix_title: "Código QR PIX Instantáneo", md_pix_desc: "Escanee el código QR con su banco o copie el código. La confirmación en recepción es inmediata.",
                md_pix_copy: "Copiar Código PIX", md_pix_copied: "¡Código PIX copiado!",
                md_bol_title: "Boleto Bancario Registrado", md_bol_benef: "Beneficiario: HOTEL SAMAMBA LTDA • CNPJ: 33.494.352/0001-08",
                md_bol_due: "Vencimiento:", md_bol_copy: "Copiar Línea Digitable", md_bol_copied: "¡Línea digitable copiada!",
                md_bol_note: "Su suite queda pre-bloqueada por 48h esperando la compensación bancaria.",
                md_subtotal_room: "Subtotal Alojamiento:", md_pet_subtotal: "Servicio Mascotas (1 mascota):", md_interest_row: "Intereses de Cuotas:", md_total_res: "Total Final:",
                md_btn_pay_card: "Confirmar Pago con Tarjeta", md_btn_pay_pix: "Ya pagué con PIX • Confirmar", md_btn_pay_bol: "Generar Boleto y Reservar",
                md_processing: "Sincronizando reserva con recepción...",
                md_err_fields: "* Complete su nombre, correo válido y datos de pago.",
                md_success_title_paid: "¡Pago Aprobado y Reserva Confirmada!",
                md_success_title_bol: "¡Boleto Generado y Suite Pre-Reservada!",
                md_success_desc_paid: "Su reserva ya fue integrada automáticamente al sistema de recepción del Hotel Samamba. El voucher digital fue enviado a su correo.",
                md_success_desc_bol: "El boleto fue registrado y enviado a su correo. En cuanto el banco confirme el pago, el check-in se liberará en recepción.",
                md_voucher_code: "Código de Reserva:", md_voucher_protocol: "Protocolo Recepción:",
                md_status_paid: "Estado: PAGADO • Confirmado en Recepción", md_status_bol: "Estado: ESPERANDO COMPENSACIÓN BANCARIA",
                md_btn_back: "Concluir y Volver al Sitio", md_btn_close: "Comprendido y Cerrar"
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
        const btnTextoFechar = txt.md_btn_close || 'Compreendi e Fechar';

        let titulo = '';
        let corpo = '';

        if (tipo === 'privacidade') {
            titulo = txt.ft_privacy || 'Política de Privacidade (LGPD)';
            corpo = lang === 'en' ? `
                <div class="generic-modal-body">
                    <p><strong>Hotel Samamba</strong> (CNPJ: 33.494.352/0001-08) values your privacy and ensures compliance with General Data Protection Regulation standards.</p>
                    <h3>1. Data Collection & Purpose</h3>
                    <p>We collect personal information (Name, Email) and encrypted payment tokens strictly to confirm room bookings and integrate check-in data with our front desk.</p>
                    <h3>2. Data Retention & Security</h3>
                    <p>Your personal and payment data are processed securely and never sold or transferred to third parties.</p>
                    <h3>3. Guest Rights</h3>
                    <p>Guests may request access, correction, or deletion of their data at any time via <em>contato@hotelsamamba.com.br</em>.</p>
                </div>
            ` : lang === 'es' ? `
                <div class="generic-modal-body">
                    <p>El <strong>Hotel Samamba</strong> (CNPJ: 33.494.352/0001-08) garantiza el cumplimiento de las normativas de protección de datos personales.</p>
                    <h3>1. Recopilación de Datos</h3>
                    <p>Recopilamos nombre, correo electrónico y datos de pago cifrados exclusivamente para confirmar reservas e integrar el check-in con nuestra recepción.</p>
                    <h3>2. Almacenamiento y Seguridad</h3>
                    <p>Sus datos personales no se comparten con terceros para fines comerciales y se conservan bajo estándares de seguridad.</p>
                    <h3>3. Derechos del Usuario</h3>
                    <p>Puede solicitar el acceso, corrección o eliminación de sus datos enviando un correo a <em>contato@hotelsamamba.com.br</em>.</p>
                </div>
            ` : `
                <div class="generic-modal-body">
                    <p>O <strong>Hotel Samamba</strong> (CNPJ: 33.494.352/0001-08) valoriza a sua privacidade e garante a conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).</p>
                    <h3>1. Coleta e Finalidade dos Dados</h3>
                    <p>Coletamos nome completo, e-mail e dados criptografados de pagamento com a finalidade exclusiva de confirmar sua reserva diretamente no sistema da recepção e emitir seu voucher digital.</p>
                    <h3>2. Armazenamento e Segurança</h3>
                    <p>Seus dados são processados em ambiente seguro e <strong>jamais serão comercializados ou compartilhados com terceiros</strong>.</p>
                    <h3>3. Seus Direitos como Titular</h3>
                    <p>Você pode solicitar acesso, correção ou exclusão definitiva das suas informações mediante contato pelo e-mail <em>contato@hotelsamamba.com.br</em>.</p>
                </div>
            `;
        } else if (tipo === 'termos') {
            titulo = txt.ft_terms || 'Termos de Uso';
            corpo = lang === 'en' ? `
                <div class="generic-modal-body">
                    <p>Welcome to <strong>Hotel Samamba</strong>. By utilizing our online booking and payment system, you agree to the following terms:</p>
                    <h3>1. Instant Booking Confirmation</h3>
                    <p>Reservations paid via Credit Card or PIX are automatically confirmed and synced with our front desk system.</p>
                    <h3>2. Check-in & Check-out Rules</h3>
                    <p>Check-in starts at 14:00 (2:00 PM). Check-out must be completed by 12:00 (12:00 PM noon).</p>
                    <h3>3. Cancellation Policy</h3>
                    <p>Free cancellation with full refund is guaranteed up to 28 business hours prior to check-in.</p>
                </div>
            ` : lang === 'es' ? `
                <div class="generic-modal-body">
                    <p>Bienvenido al <strong>Hotel Samamba</strong>. Al utilizar nuestro sistema de reservas y pago en línea, acepta los siguientes términos:</p>
                    <h3>1. Reserva Directa</h3>
                    <p>Las reservas pagadas con Tarjeta de Crédito o PIX se confirman automáticamente en el sistema de nuestra recepción.</p>
                    <h3>2. Horarios de Check-in y Check-out</h3>
                    <p>Check-in a partir de las 14:00h. Check-out hasta las 12:00h.</p>
                    <h3>3. Cancelación</h3>
                    <p>Cancelación gratuita con reembolso total hasta 28 horas hábiles antes del check-in.</p>
                </div>
            ` : `
                <div class="generic-modal-body">
                    <p>Bem-vindo ao <strong>Hotel Samamba</strong>. Ao utilizar nosso sistema de reserva e pagamento online, você concorda com os seguintes termos:</p>
                    <h3>1. Reserva Direta Integrada</h3>
                    <p>As reservas concluídas com pagamento via Cartão de Crédito ou PIX são confirmadas automaticamente e sincronizadas em tempo real com a recepção do hotel.</p>
                    <h3>2. Horários da Hospedagem</h3>
                    <p>O <em>Check-in</em> é realizado a partir das 14h e o <em>Check-out</em> deve ser efetuado até às 12h.</p>
                    <h3>3. Política de Cancelamento</h3>
                    <p>O cancelamento gratuito com estorno integral é garantido para solicitações realizadas com até 28 horas úteis de antecedência do check-in.</p>
                </div>
            `;
        } else if (tipo === 'cookies') {
            titulo = txt.ft_cookies || 'Gerenciar Cookies';
            corpo = lang === 'en' ? `
                <div class="generic-modal-body">
                    <p>We use cookies to store website preferences and secure checkout sessions.</p>
                    <h3>1. Essential Cookies (Mandatory)</h3>
                    <p>Necessary for multi-language switching, accessibility settings, and booking checkout.</p>
                    <h3>2. Analytical Cookies (Optional)</h3>
                    <p>Help us measure page performance.</p>
                    <div style="margin-top:20px; display:flex; gap:10px;">
                        <button type="button" class="btn-cookie-secundario" style="flex:1;" onclick="app.cookies.salvarEFechar('recusados'); app.modal.fechar();">Decline Optional</button>
                        <button type="button" class="btn-cookie-primario" style="flex:1;" onclick="app.cookies.salvarEFechar('aceitos'); app.modal.fechar();">Accept All</button>
                    </div>
                </div>
            ` : lang === 'es' ? `
                <div class="generic-modal-body">
                    <p>Utilizamos cookies para garantizar la seguridad de su navegación y personalizar su experiencia.</p>
                    <h3>1. Cookies Esenciales (Obligatorias)</h3>
                    <p>Indispensables para accesibilidad, idioma y flujo de reserva.</p>
                    <h3>2. Cookies Funcionales (Opcionales)</h3>
                    <p>Permiten optimizar el rendimiento del sitio.</p>
                    <div style="margin-top:20px; display:flex; gap:10px;">
                        <button type="button" class="btn-cookie-secundario" style="flex:1;" onclick="app.cookies.salvarEFechar('recusados'); app.modal.fechar();">Rechazar Opcionales</button>
                        <button type="button" class="btn-cookie-primario" style="flex:1;" onclick="app.cookies.salvarEFechar('aceitos'); app.modal.fechar();">Aceptar Todos</button>
                    </div>
                </div>
            ` : `
                <div class="generic-modal-body">
                    <p>Utilizamos cookies para garantir a navegação segura e salvar suas preferências.</p>
                    <h3>1. Cookies Estritamente Necessários (Obrigatórios)</h3>
                    <p>Fundamentais para acessibilidade, idioma e processamento do checkout.</p>
                    <h3>2. Cookies Analíticos (Opcionais)</h3>
                    <p>Permitem otimizar o desempenho da página.</p>
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
        this.modalState = {
            suiteKey: null,
            incluiPet: 'nao',
            checkin: '',
            checkout: '',
            nome: '',
            email: '',
            metodoPagamento: 'cartao', // 'cartao', 'pix', 'boleto'
            cartaoNumero: '',
            cartaoTitular: '',
            cartaoValidade: '',
            cartaoCvv: '',
            parcelas: 1,
            seedFicticia: 12345
        };
    }

    iniciarReserva(suiteKey) {
        this.modalState.suiteKey = suiteKey;
        this.modalState.incluiPet = 'nao';
        this.modalState.metodoPagamento = 'cartao';
        this.modalState.parcelas = 1;
        this.modalState.seedFicticia = Math.floor(10000 + Math.random() * 89999);

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

    salvarEstadoInputs() {
        const nomeEl = document.getElementById('modal-nome');
        const emailEl = document.getElementById('modal-email');
        const cardNumEl = document.getElementById('card-number');
        const cardHolderEl = document.getElementById('card-holder');
        const cardExpEl = document.getElementById('card-expiry');
        const cardCvvEl = document.getElementById('card-cvv');
        const parcelasEl = document.getElementById('card-installments');

        if (nomeEl) this.modalState.nome = nomeEl.value;
        if (emailEl) this.modalState.email = emailEl.value;
        if (cardNumEl) this.modalState.cartaoNumero = cardNumEl.value;
        if (cardHolderEl) this.modalState.cartaoTitular = cardHolderEl.value;
        if (cardExpEl) this.modalState.cartaoValidade = cardExpEl.value;
        if (cardCvvEl) this.modalState.cartaoCvv = cardCvvEl.value;
        if (parcelasEl) this.modalState.parcelas = parseInt(parcelasEl.value, 10) || 1;
    }

    atualizarDatas() {
        this.salvarEstadoInputs();
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
        this.salvarEstadoInputs();
        this.modalState.incluiPet = valor;
        this.renderModal();
    }

    selecionarMetodoPagamento(metodo) {
        this.salvarEstadoInputs();
        this.modalState.metodoPagamento = metodo;
        if (metodo !== 'cartao') this.modalState.parcelas = 1;
        this.renderModal();
    }

    alterarParcelas(qtd) {
        this.salvarEstadoInputs();
        this.modalState.parcelas = parseInt(qtd, 10) || 1;
        this.renderModal();
    }

    mascaraCartao(input) {
        let v = input.value.replace(/\D/g, '').substring(0, 16);
        v = v.replace(/(\d{4})(?=\d)/g, '$1 ');
        input.value = v;
        this.modalState.cartaoNumero = v;
    }

    mascaraValidade(input) {
        let v = input.value.replace(/\D/g, '').substring(0, 4);
        if (v.length >= 3) {
            v = v.substring(0, 2) + '/' + v.substring(2);
        }
        input.value = v;
        this.modalState.cartaoValidade = v;
    }

    copiarTexto(texto, msgSucesso) {
        navigator.clipboard?.writeText(texto);
        if (window.app) window.app.showToast(msgSucesso);
    }

    // Gera um QR Code SVG vetorial determinístico e visualmente autêntico
    gerarSvgQrCode(seed) {
        const size = 21;
        let rects = '';
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                // Padrões de canto (Finder Patterns)
                const topLeft = r < 7 && c < 7;
                const topRight = r < 7 && c >= size - 7;
                const bottomLeft = r >= size - 7 && c < 7;

                let fill = false;
                if (topLeft || topRight || bottomLeft) {
                    const lr = topLeft || topRight ? r : r - (size - 7);
                    const lc = topLeft || bottomLeft ? c : c - (size - 7);
                    if (lr === 0 || lr === 6 || lc === 0 || lc === 6 || (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4)) {
                        fill = true;
                    }
                } else {
                    // Matriz pseudo-aleatória baseada na seed da reserva
                    const hash = Math.sin(seed * 13 + r * 31 + c * 17) * 10000;
                    fill = (hash - Math.floor(hash)) > 0.48;
                }

                if (fill) {
                    rects += `<rect x="${c * 5 + 5}" y="${r * 5 + 5}" width="5" height="5" fill="#0F172A"/>`;
                }
            }
        }
        return `<svg viewBox="0 0 115 115" width="115" height="115" xmlns="http://www.w3.org/2000/svg" style="background:#fff; border-radius:8px; border:1px solid #CBD5E1; flex-shrink:0;">${rects}</svg>`;
    }

    // Gera um código de barras SVG realista para o boleto fictício
    gerarSvgCodigoBarras(seed) {
        let bars = '';
        let x = 4;
        for (let i = 0; i < 58; i++) {
            const hash = Math.sin(seed + i * 19) * 10000;
            const w = (hash - Math.floor(hash)) > 0.55 ? 3 : 1.5;
            if (i % 2 === 0) {
                bars += `<rect x="${x}" y="2" width="${w}" height="38" fill="#0F172A"/>`;
            }
            x += w + 1.5;
        }
        return `<svg viewBox="0 0 ${x + 4} 42" width="100%" height="42" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style="background:#fff; padding:4px; border-radius:4px; border:1px solid #CBD5E1;">${bars}</svg>`;
    }

    calcularValores(dias, suite) {
        const valorAcomodacao = dias * suite.preco;
        const valorPets = (this.modalState.incluiPet === 'sim') ? ((dias <= 3) ? (80 * dias) : 250) : 0;
        const subtotal = valorAcomodacao + valorPets;

        let totalComJuros = subtotal;
        let juros = 0;

        // Até 3x sem juros; de 4x a 10x aplica 1.99% a.m.
        if (this.modalState.metodoPagamento === 'cartao' && this.modalState.parcelas > 3) {
            const taxa = 0.0199;
            totalComJuros = subtotal * Math.pow(1 + taxa, this.modalState.parcelas);
            juros = totalComJuros - subtotal;
        }

        return { valorAcomodacao, valorPets, subtotal, juros, totalComJuros };
    }

    validarFormulario() {
        this.salvarEstadoInputs();
        const nomeValido = this.modalState.nome.trim().length >= 3;
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.modalState.email.trim());

        let pagamentoValido = true;
        if (this.modalState.metodoPagamento === 'cartao') {
            const numLimpo = this.modalState.cartaoNumero.replace(/\s/g, '');
            const titularValido = this.modalState.cartaoTitular.trim().length >= 3;
            const valValida = /^\d{2}\/\d{2}$/.test(this.modalState.cartaoValidade);
            const cvvValido = /^\d{3,4}$/.test(this.modalState.cartaoCvv);
            pagamentoValido = numLimpo.length >= 13 && titularValido && valValida && cvvValido;
        }

        const erroBox = document.getElementById('checkout-error-msg');
        if (!nomeValido || !emailValido || !pagamentoValido) {
            if (erroBox) erroBox.style.display = 'block';
            return false;
        }

        if (erroBox) erroBox.style.display = 'none';
        return true;
    }

    processarPagamento() {
        if (!this.validarFormulario()) return;

        const txt = this.traducao.dicionario[this.traducao.currentLang];
        const btn = document.getElementById('btn-confirmar-reserva');
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${txt.md_processing}`;
        }

        setTimeout(() => {
            this.finalizarReserva();
        }, 1400);
    }

    renderModal() {
        const txt = this.traducao.dicionario[this.traducao.currentLang];
        const dias = Math.ceil((new Date(this.modalState.checkout) - new Date(this.modalState.checkin)) / (1000 * 60 * 60 * 24)) || 1;
        const suite = this.suites[this.modalState.suiteKey];
        const calc = this.calcularValores(dias, suite);
        const minCheckin = (new Date()).toISOString().split('T')[0];
        const suiteNomeTraduzido = txt[`room_title_${this.modalState.suiteKey}`] || suite.nome;
        const formatBRL = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

        // Gera opções de 1x até 10x
        let opcoesParcelasHTML = '';
        for (let p = 1; p <= 10; p++) {
            if (p <= 3) {
                const valorParc = calc.subtotal / p;
                opcoesParcelasHTML += `<option value="${p}" ${this.modalState.parcelas === p ? 'selected' : ''}>${p}x de ${formatBRL(valorParc)} ${txt.md_no_interest}</option>`;
            } else {
                const totalP = calc.subtotal * Math.pow(1.0199, p);
                const valorParc = totalP / p;
                opcoesParcelasHTML += `<option value="${p}" ${this.modalState.parcelas === p ? 'selected' : ''}>${p}x de ${formatBRL(valorParc)} ${txt.md_with_interest}</option>`;
            }
        }

        // Dados fictícios de PIX e Boleto
        const codigoPixSimulado = `00020126580014BR.GOV.BCB.PIX013633494352000108-HOTELSAMAMBA5204000053039865406${calc.subtotal.toFixed(2)}5802BR5913HOTEL SAMAMBA6008BRASILIA62070503${this.modalState.seedFicticia}6304E2B1`;
        const centavosBoleto = Math.round(calc.subtotal * 100).toString().padStart(10, '0');
        const linhaDigitavelBoleto = `00190.00009 03349.435201 00108.${this.modalState.seedFicticia}8 1 9985${centavosBoleto}`;
        const dataVencimento = new Date(Date.now() + 2 * 86400000).toLocaleDateString('pt-BR');

        const btnLabel = this.modalState.metodoPagamento === 'cartao'
            ? txt.md_btn_pay_card
            : this.modalState.metodoPagamento === 'pix'
                ? txt.md_btn_pay_pix
                : txt.md_btn_pay_bol;

        const modalHTML = `
            <div class="modal-header">
                <h2>${txt.md_title}</h2>
                <button type="button" class="close-modal" onclick="app.modal.fechar()" aria-label="Fechar">×</button>
            </div>
            
            <!-- 1. DETALHES DA ESTADIA E SERVIÇO DE PETS -->
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

            <!-- 2. SUBTOTAL E TOTAL FINAL -->
            <div class="summary-box" style="margin-bottom: 20px;">
                <div class="summary-row">
                    <span>${txt.md_subtotal_room}</span>
                    <span>${formatBRL(calc.valorAcomodacao)}</span>
                </div>
                ${this.modalState.incluiPet === 'sim' ? `
                    <div class="summary-row">
                        <span>${txt.md_pet_subtotal}</span>
                        <span>${formatBRL(calc.valorPets)}</span>
                    </div>
                ` : ''}
                ${calc.juros > 0 ? `
                    <div class="summary-row" style="color: var(--text-muted); font-size: 0.88rem;">
                        <span>${txt.md_interest_row} (${this.modalState.parcelas}x)</span>
                        <span>+ ${formatBRL(calc.juros)}</span>
                    </div>
                ` : ''}
                
                <div class="summary-row final-total">
                    <span>${txt.md_total_res}</span>
                    <span id="final-total">${formatBRL(calc.totalComJuros)}</span>
                </div>
            </div>

            <!-- 3. FORMA DE PAGAMENTO (CARTÃO 10X / PIX / BOLETO) -->
            <div class="modal-step" style="margin-bottom: 20px;">
                <h3><i class="fas fa-lock" style="color:var(--primary);"></i> ${txt.md_pay_header}</h3>
                
                <div class="payment-tabs">
                    <button type="button" class="pay-tab ${this.modalState.metodoPagamento === 'cartao' ? 'active' : ''}" onclick="app.reserva.selecionarMetodoPagamento('cartao')">
                        <i class="fas fa-credit-card"></i> ${txt.md_pay_card}
                    </button>
                    <button type="button" class="pay-tab ${this.modalState.metodoPagamento === 'pix' ? 'active' : ''}" onclick="app.reserva.selecionarMetodoPagamento('pix')">
                        <i class="fas fa-qrcode"></i> ${txt.md_pay_pix}
                    </button>
                    <button type="button" class="pay-tab ${this.modalState.metodoPagamento === 'boleto' ? 'active' : ''}" onclick="app.reserva.selecionarMetodoPagamento('boleto')">
                        <i class="fas fa-barcode"></i> ${txt.md_pay_boleto}
                    </button>
                </div>

                ${this.modalState.metodoPagamento === 'cartao' ? `
                    <div class="payment-panel">
                        <div class="modal-dates" style="margin-bottom: 10px;">
                            <div class="input-group-modal">
                                <label for="card-number">${txt.md_card_num}</label>
                                <input type="text" id="card-number" value="${this.modalState.cartaoNumero}" placeholder="0000 0000 0000 0000" maxlength="19" oninput="app.reserva.mascaraCartao(this)">
                            </div>
                            <div class="input-group-modal">
                                <label for="card-holder">${txt.md_card_holder}</label>
                                <input type="text" id="card-holder" value="${this.modalState.cartaoTitular}" placeholder="COMO NO CARTÃO" style="text-transform: uppercase;">
                            </div>
                        </div>
                        <div class="modal-dates" style="margin-bottom: 10px;">
                            <div class="input-group-modal">
                                <label for="card-expiry">${txt.md_card_exp}</label>
                                <input type="text" id="card-expiry" value="${this.modalState.cartaoValidade}" placeholder="MM/AA" maxlength="5" oninput="app.reserva.mascaraValidade(this)">
                            </div>
                            <div class="input-group-modal">
                                <label for="card-cvv">${txt.md_card_cvv}</label>
                                <input type="text" id="card-cvv" value="${this.modalState.cartaoCvv}" placeholder="123" maxlength="4" oninput="this.value = this.value.replace(/\\D/g, '')">
                            </div>
                        </div>
                        <div class="input-group-modal">
                            <label for="card-installments">${txt.md_card_inst}</label>
                            <select id="card-installments" class="select-modal" onchange="app.reserva.alterarParcelas(this.value)">
                                ${opcoesParcelasHTML}
                            </select>
                        </div>
                    </div>
                ` : this.modalState.metodoPagamento === 'pix' ? `
                    <div class="payment-panel">
                        <div class="pix-box">
                            ${this.gerarSvgQrCode(this.modalState.seedFicticia)}
                            <div style="flex: 1; min-width: 0;">
                                <strong>${txt.md_pix_title}</strong>
                                <p style="margin: 4px 0 8px; font-size: 0.84rem; color: var(--text-muted);">${txt.md_pix_desc}</p>
                                <div class="fake-code-box">${codigoPixSimulado}</div>
                                <button type="button" class="btn-copy-pix" onclick="app.reserva.copiarTexto('${codigoPixSimulado}', '${txt.md_pix_copied}')">
                                    <i class="fas fa-copy"></i> ${txt.md_pix_copy}
                                </button>
                            </div>
                        </div>
                    </div>
                ` : `
                    <div class="payment-panel">
                        <div class="boleto-box">
                            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:6px;">
                                <strong><i class="fas fa-university"></i> ${txt.md_bol_title}</strong>
                                <span style="font-size:0.8rem; font-weight:700; color:var(--primary);">${txt.md_bol_due} ${dataVencimento}</span>
                            </div>
                            <p style="font-size:0.78rem; color:var(--text-muted); margin-bottom:8px;">${txt.md_bol_benef}</p>
                            ${this.gerarSvgCodigoBarras(this.modalState.seedFicticia)}
                            <div class="fake-code-box" style="margin-top:8px; text-align:center; font-weight:700;">${linhaDigitavelBoleto}</div>
                            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-top:8px;">
                                <button type="button" class="btn-copy-pix" onclick="app.reserva.copiarTexto('${linhaDigitavelBoleto}', '${txt.md_bol_copied}')">
                                    <i class="fas fa-copy"></i> ${txt.md_bol_copy}
                                </button>
                                <small style="color:var(--text-muted);">${txt.md_bol_note}</small>
                            </div>
                        </div>
                    </div>
                `}
            </div>

            <!-- 4. DADOS DO HÓSPEDE (CHECK-IN DIGITAL) -->
            <div class="modal-step" style="margin-bottom: 15px;">
                <h3><i class="fas fa-user-check" style="color:var(--primary);"></i> ${txt.md_guest_header}</h3>
                <div class="modal-dates" style="margin-bottom: 0;">
                    <div class="input-group-modal">
                        <label for="modal-nome">${txt.md_name_label}</label>
                        <input type="text" id="modal-nome" value="${this.modalState.nome}" placeholder="${txt.md_name_ph}">
                    </div>
                    <div class="input-group-modal">
                        <label for="modal-email">${txt.md_email_label}</label>
                        <input type="email" id="modal-email" value="${this.modalState.email}" placeholder="${txt.md_email_ph}">
                    </div>
                </div>
            </div>

            <div id="checkout-error-msg" style="display:none; color:#EF4444; background:#FEF2F2; border:1px solid #FCA5A5; padding:10px 14px; border-radius:10px; font-size:0.85rem; font-weight:600; margin-bottom:15px;">
                ${txt.md_err_fields}
            </div>
            
            <button type="button" id="btn-confirmar-reserva" class="btn-checkout-final" onclick="app.reserva.processarPagamento()">
                <i class="fas fa-shield-alt"></i> ${btnLabel}
            </button>
        `;

        this.modal.abrir(modalHTML);
    }

    finalizarReserva() {
        const txt = this.traducao.dicionario[this.traducao.currentLang];
        const dias = Math.ceil((new Date(this.modalState.checkout) - new Date(this.modalState.checkin)) / (1000 * 60 * 60 * 24)) || 1;
        const suite = this.suites[this.modalState.suiteKey];
        const calc = this.calcularValores(dias, suite);
        const formatBRL = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

        const codigoReserva = `#SMB-${this.modalState.seedFicticia}`;
        const protocoloRecepcao = `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const suiteNomeTraduzido = txt[`room_title_${this.modalState.suiteKey}`] || suite.nome;
        const isBoleto = this.modalState.metodoPagamento === 'boleto';

        const metodoLabel = isBoleto
            ? `${txt.md_pay_boleto} (${formatBRL(calc.totalComJuros)})`
            : this.modalState.metodoPagamento === 'pix'
                ? `${txt.md_pay_pix} (${formatBRL(calc.totalComJuros)})`
                : `${txt.md_pay_card} - ${this.modalState.parcelas}x de ${formatBRL(calc.totalComJuros / this.modalState.parcelas)}`;

        const successHTML = `
            <div class="success-screen">
                <div class="success-icon" style="background: ${isBoleto ? '#F59E0B' : '#10B981'};">
                    <i class="fas ${isBoleto ? 'fa-file-invoice-dollar' : 'fa-check-circle'}" aria-hidden="true"></i>
                </div>
                <h2>${isBoleto ? txt.md_success_title_bol : txt.md_success_title_paid}</h2>
                <p>${isBoleto ? txt.md_success_desc_bol : txt.md_success_desc_paid}</p>
                
                <div class="voucher-box ${isBoleto ? 'voucher-pending' : ''}">
                    <div class="voucher-badge" style="background: ${isBoleto ? '#D97706' : '#10B981'};">
                        <i class="fas ${isBoleto ? 'fa-clock' : 'fa-sync-alt'}"></i> ${isBoleto ? txt.md_status_bol : txt.md_status_paid}
                    </div>
                    <p><strong>${txt.md_voucher_code}</strong> <span style="font-family: monospace; font-size: 1.05rem;">${codigoReserva}</span></p>
                    <p><strong>${txt.md_voucher_protocol}</strong> <span style="font-family: monospace;">${protocoloRecepcao}</span></p>
                    <hr style="border:none; border-top:1px dashed currentColor; opacity:0.3; margin:8px 0;">
                    <p><strong>Hóspede:</strong> ${this.modalState.nome} (${this.modalState.email})</p>
                    <p><strong>${txt.md_suite}</strong> ${suiteNomeTraduzido} (${this.modalState.checkin} → ${this.modalState.checkout})</p>
                    <p><strong>${txt.md_pay_header}:</strong> ${metodoLabel}</p>
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

function moveHeroSlide(n) { app.moveHeroSlide(n); }
function currentHeroSlide(n) { app.currentHeroSlide(n); }
function moveRoomCarousel(suite, dir) { app.moveRoomCarousel(suite, dir); }
function abrirModalGenerico(tipo) { app.modal.abrirModalGenerico(tipo); }