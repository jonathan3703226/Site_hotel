// Dados das Suítes Base
const SUITES = {
    'solteiro': { nome: 'Suíte Solteiro', preco: 129, maxPax: 1 },
    'casal': { nome: 'Suíte Casal', preco: 179, maxPax: 2 },
    'duplo': { nome: 'Suíte Duplo', preco: 199, maxPax: 2 },
    'triplo': { nome: 'Suíte Triplo', preco: 259, maxPax: 3 },
    'familia': { nome: 'Suíte Família', preco: 279, maxPax: 3 }
};

// Dicionário de Idiomas Expandido
const i18n = {
    pt: {
        nav_home: "Início", nav_about: "O Hotel", nav_rooms: "Suítes", nav_services: "Serviços", nav_info: "Informações", nav_contact: "Fale Conosco",
        hero_title: "Sua estadia perfeita no DF", hero_desc: "Conforto, praticidade e o melhor custo-benefício para sua viagem de negócios ou lazer em Samambaia.", hero_btn: "Ver Suítes",
        btn_search: "Buscar Suítes",
        about_sub: "Bem-vindo ao Hotel Samamba", about_title: "Conforto, praticidade e economia na sua hospedagem.", 
        about_p1: "Seja para uma viagem a trabalho, um compromisso na região ou alguns dias de descanso, o Hotel Samamba é a escolha ideal para quem busca conforto e praticidade em Samambaia, no Distrito Federal. Nossas suítes oferecem um ambiente funcional e acolhedor, com as comodidades essenciais para você descansar e aproveitar sua estadia. Tudo isso com preços acessíveis e uma localização conveniente para facilitar sua routine.",
        about_p2: "No Hotel Samamba, você encontra o equilíbrio entre conforto, praticidade e preço justo. Faça sua reserva e desfrute de uma estadia tranquila em Samambaia.",
        feat_coffee: "Café Incluso", feat_wifi: "Wi-Fi Grátis", feat_parking: "Estacionamento",
        rooms_sub: "Acomodações", rooms_title: "Nossas Suítes", rooms_desc: "Da cama ao banho – cada detalhe foi pensado para o seu conforto.",
        room_kid_policy: "<i class=\"fas fa-info-circle\"></i> Política de Crianças: 1 criança de até 7 anos tem gratuidade na reserva.",
        room_title_solteiro: "Suíte Solteiro", room_title_casal: "Suíte Casal", room_title_duplo: "Suíte Duplo", room_title_triplo: "Suíte Triplo", room_title_familia: "Suíte Família",
        desc_solteiro: "Ideal para quem viaja sozinho e procura conforto e praticidade em Samambaia. Ambiente acolhedor e funcional.",
        desc_casal: "Perfeita para casais que desejam uma estadia confortável e prática no DF. Comodidade e tranquilidade.",
        desc_duplo: "Combina conforto, funcionalidade e praticidade. Excelente opção para amigos ou colegas de trabalho.",
        desc_triplo: "Com espaço para até três pessoas, é uma ótima escolha para pequenas famílias, amigos ou colegas de trabalho.",
        desc_familia: "Ambiente amplo e funcional. Ideal para quem busca praticidade e conforto para pequenas famílias.",
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
        pet_title: "Estadia para Pets", pet_desc: "Oferecemos hospedagem temporária para animais de estimação. Eles ficam em uma área reservada, cuidada por equipe treinada. Ideal para quem precisa viajar e não tem com quem deixá-los. (Serviço opcional no ato da reserva).",
        pet_opt1_b: "Até 3 diárias:", pet_opt1_s: "R$ 80,00 por animal, por diária.", pet_opt2_b: "A partir de 4 diárias:", pet_opt2_s: "Taxa única de R$ 250,00 por animal para toda a estadia.",
        pol_time_title: "Horários", pol_checkin_b: "Check-in:", pol_checkin_s: "A partir das 14h.", pol_checkout_b: "Check-out:", pol_checkout_s: "Até às 12h.",
        pol_kid_title: "Política para Crianças", pol_kid1_b: "1 criança de até 7 anos:", pol_kid1_s: "não conta na ocupação máxima da suíte e tem hospedagem gratuita.", 
        pol_kid2_b: "Acima de 7 anos ou mais de 1 criança:", pol_kid2_s: "consulte o hotel para verificar as condições e possíveis cobranças.", 
        pol_kid3: "Menores de 18 anos: devem estar acompanhados pelos pais ou apresentar a autorização exigida para a hospedagem.",
        pol_pay_title: "Pagamento e Cancelamento", pol_pay1_b: "Parcelamento:", pol_pay1_s: "Em até 3x sem juros (Visa/Mastercard) para despesas acima de R$ 500.", pol_pay2_b: "Cancelamento Grátis:", pol_pay2_s: "Até 28 horas úteis antes do check-in.",
        loc_title: "Nossa Localização", loc_desc: "Próximo a centros comerciais, paradas de metrô e com fácil acesso às vias principais do DF.",
        ft_desc: "Uma excelente opção de hospedagem em Samambaia, DF, com suítes aconchegantes e amplas. CNPJ: 33.494.352/0001-08", ft_links: "Links Rápidos", ft_wpp: "Chamar no WhatsApp",
        // Modal & Checkout
        md_title: "Resumo da Reserva", md_stay_details: "Detalhes da Estadia", md_checkin: "Check-in:", md_checkout: "Check-out:",
        md_total_nights: "Total de Diárias:", md_suite: "Suíte:", md_max_pax: "Ocupação máxima:", md_person: "pessoa(s)",
        md_daily_rate: "Valor da Diária:", md_pet_service: "Serviço de Pets", md_pet_ask: "Deseja incluir estadia na área para pet?",
        md_no: "Não", md_yes: "Sim", md_pet_limit: "É permitido levar apenas 1 pet por reserva.", md_subtotal_room: "Subtotal Acomodação:",
        md_pet_subtotal: "Serviço Pet (1 animal):", md_total_res: "Total da Reserva:", md_btn_confirm: "Confirmar Reserva",
        md_success_title: "Reserva Solicitada!", md_success_desc: "Seus dados foram processados com sucesso. Nossa equipe confirmará os dados em breve via e-mail e WhatsApp.", md_btn_back: "Voltar para o site"
    },
    en: {
        nav_home: "Home", nav_about: "Hotel", nav_rooms: "Suites", nav_services: "Services", nav_info: "Info", nav_contact: "Contact Us",
        hero_title: "Your perfect stay in DF", hero_desc: "Comfort, practicality and the best value for your trip in Samambaia.", hero_btn: "View Suites",
        btn_search: "Search Suites",
        about_sub: "Welcome to Hotel Samamba", about_title: "Comfort, practicality, and economy.", 
        about_p1: "Whether for a business trip, an appointment in the region, or a few days of rest, Hotel Samamba is the ideal choice for those seeking comfort and practicality in Samambaia, Federal District.",
        about_p2: "At Hotel Samamba, you'll find the perfect balance between comfort, practicality, and a fair price.",
        feat_coffee: "Breakfast Included", feat_wifi: "Free Wi-Fi", feat_parking: "Parking",
        rooms_sub: "Accommodations", rooms_title: "Our Suites", rooms_desc: "From the bed to the bath – every detail was thought of for your comfort.",
        room_kid_policy: "<i class=\"fas fa-info-circle\"></i> Child Policy: 1 child up to 7 years old stays for free.",
        room_title_solteiro: "Single Suite", room_title_casal: "Couple Suite", room_title_duplo: "Double Suite", room_title_triplo: "Triple Suite", room_title_familia: "Family Suite",
        desc_solteiro: "Ideal for solo travelers looking for comfort and practicality. Cozy and functional environment.",
        desc_casal: "Perfect for couples wanting a comfortable and practical stay. Convenience and tranquility.",
        desc_duplo: "Combines comfort and functionality. Excellent option for friends or coworkers.",
        desc_triplo: "With space for up to three people, it's a great choice for small families or friends.",
        desc_familia: "Spacious environment. Ideal for those seeking practicality and comfort for small families.",
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
        pet_title: "Pet Stay", pet_desc: "We offer temporary lodging for pets in a reserved area with trained staff. (Optional service upon reservation).",
        pet_opt1_b: "Up to 3 nights:", pet_opt1_s: "R$ 80.00 per pet, per night.", pet_opt2_b: "From 4 nights:", pet_opt2_s: "Single fee of R$ 250.00 per pet for the entire stay.",
        pol_time_title: "Schedules", pol_checkin_b: "Check-in:", pol_checkin_s: "From 2 PM.", pol_checkout_b: "Check-out:", pol_checkout_s: "Until 12 PM.",
        pol_kid_title: "Children Policy", pol_kid1_b: "1 child up to 7 years:", pol_kid1_s: "does not count towards maximum occupancy and stays for free.", 
        pol_kid2_b: "Over 7 years or more than 1 child:", pol_kid2_s: "contact the hotel to check conditions and possible charges.", 
        pol_kid3: "Minors under 18: must be accompanied by parents or present required authorization.",
        pol_pay_title: "Payment and Cancellation", pol_pay1_b: "Installments:", pol_pay1_s: "Up to 3x interest-free (Visa/Mastercard) for expenses over R$ 500.", pol_pay2_b: "Free Cancellation:", pol_pay2_s: "Up to 28 business hours before check-in.",
        loc_title: "Our Location", loc_desc: "Close to commercial centers, subway stops, and easy access to main roads.",
        ft_desc: "An excellent lodging option in Samambaia, DF, with cozy and spacious suites. CNPJ: 33.494.352/0001-08", ft_links: "Quick Links", ft_wpp: "Message on WhatsApp",
        // Modal & Checkout
        md_title: "Reservation Summary", md_stay_details: "Stay Details", md_checkin: "Check-in:", md_checkout: "Check-out:",
        md_total_nights: "Total Nights:", md_suite: "Suite:", md_max_pax: "Max Occupancy:", md_person: "person(s)",
        md_daily_rate: "Daily Rate:", md_pet_service: "Pet Service", md_pet_ask: "Would you like to include pet accommodation?",
        md_no: "No", md_yes: "Yes", md_pet_limit: "Only 1 pet is allowed per reservation.", md_subtotal_room: "Accommodation Subtotal:",
        md_pet_subtotal: "Pet Service (1 pet):", md_total_res: "Total Amount:", md_btn_confirm: "Confirm Reservation",
        md_success_title: "Reservation Requested!", md_success_desc: "Your data has been successfully processed. Our team will confirm your details shortly via email and WhatsApp.", md_btn_back: "Back to website"
    },
    es: {
        nav_home: "Inicio", nav_about: "El Hotel", nav_rooms: "Suites", nav_services: "Servicios", nav_info: "Información", nav_contact: "Contáctenos",
        hero_title: "Tu estancia perfecta en el DF", hero_desc: "Confort, practicidad y la mejor relación calidad-precio.", hero_btn: "Ver Suites",
        btn_search: "Buscar Suites",
        about_sub: "Bienvenido al Hotel Samamba", about_title: "Confort, practicidad y economía.", 
        about_p1: "Ya sea para un viaje de negocios, un compromiso en la región o unos días de descanso, el Hotel Samamba es la opción ideal para quienes buscan comodidad y practicidad en Samambaia.",
        about_p2: "En el Hotel Samamba, encontrarás el equilibrio perfecto entre confort, practicidad y precio justo.",
        feat_coffee: "Desayuno Incluido", feat_wifi: "Wi-Fi Gratis", feat_parking: "Estacionamiento",
        rooms_sub: "Alojamientos", rooms_title: "Nuestras Suites", rooms_desc: "De la cama al baño – cada detalle pensado para su confort.",
        room_kid_policy: "<i class=\"fas fa-info-circle\"></i> Política de Niños: 1 niño hasta 7 años se aloja gratis.",
        room_title_solteiro: "Suite Individual", room_title_casal: "Suite Pareja", room_title_duplo: "Suite Doble", room_title_triplo: "Suite Triple", room_title_familia: "Suite Familiar",
        desc_solteiro: "Ideal para viajeros solitarios. Ambiente acogedor y funcional.",
        desc_casal: "Perfecta para parejas que desean una estancia cómoda. Tranquilidad y confort.",
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
        pet_title: "Estancia para Mascotas", pet_desc: "Ofrecemos alojamiento temporal para mascotas en un área reservada. (Servicio opcional en la reserva).",
        pet_opt1_b: "Hasta 3 noches:", pet_opt1_s: "R$ 80,00 por mascota, por noche.", pet_opt2_b: "A partir de 4 noches:", pet_opt2_s: "Tarifa única de R$ 250,00 por mascota para toda la estancia.",
        pol_time_title: "Horarios", pol_checkin_b: "Check-in:", pol_checkin_s: "A partir de las 14h.", pol_checkout_b: "Check-out:", pol_checkout_s: "Hasta las 12h.",
        pol_kid_title: "Política de Niños", pol_kid1_b: "1 niño hasta 7 años:", pol_kid1_s: "no cuenta en la ocupación máxima y se aloja gratis.", 
        pol_kid2_b: "Más de 7 años o más de 1 niño:", pol_kid2_s: "consulte al hotel para verificar condiciones y posibles cargos.", 
        pol_kid3: "Menores de 18 años: deben estar acompañados por los padres o presentar la autorización requerida.",
        pol_pay_title: "Pago y Cancelación", pol_pay1_b: "Cuotas:", pol_pay1_s: "Hasta 3x sin interés (Visa/Mastercard) para gastos sobre R$ 500.", pol_pay2_b: "Cancelación Gratis:", pol_pay2_s: "Hasta 28 horas hábiles antes del check-in.",
        loc_title: "Nuestra Ubicación", loc_desc: "Cerca de centros comerciales, metro y con fácil acceso a las vías principales.",
        ft_desc: "Una excelente opción de alojamiento en Samambaia, DF. CNPJ: 33.494.352/0001-08", ft_links: "Enlaces Rápidos", ft_wpp: "Llamar en WhatsApp",
        // Modal & Checkout
        md_title: "Resumen de la Reserva", md_stay_details: "Detalles de la Estancia", md_checkin: "Check-in:", md_checkout: "Check-out:",
        md_total_nights: "Noches Totales:", md_suite: "Suite:", md_max_pax: "Ocupación máxima:", md_person: "persona(s)",
        md_daily_rate: "Precio por Noche:", md_pet_service: "Servicio de Mascotas", md_pet_ask: "¿Desea incluir estancia en el área de mascotas?",
        md_no: "No", md_yes: "Sí", md_pet_limit: "Solo se permite 1 mascota por reserva.", md_subtotal_room: "Subtotal Alojamiento:",
        md_pet_subtotal: "Servicio Mascotas (1 mascota):", md_total_res: "Total Reserva:", md_btn_confirm: "Confirmar Reserva",
        md_success_title: "¡Reserva Solicitada!", md_success_desc: "Sus datos han sido procesados con éxito. Nuestro equipo confirmará su reserva en breve por correo o WhatsApp.", md_btn_back: "Volver al sitio"
    }
};

let currentLang = 'pt';

function changeLanguage(lang) {
    if(!i18n[lang]) return;
    currentLang = lang;
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[lang][key]) {
            el.innerHTML = i18n[lang][key];
        }
    });

    // Atualiza modal dinâmico caso esteja aberto
    if (!document.getElementById('modal-overlay').classList.contains('hidden')) {
        renderModal();
    }
}

const formatBRL = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
mobileMenu.addEventListener('click', () => { navLinks.classList.toggle('active'); });
document.querySelectorAll('.nav-links a').forEach(link => { link.addEventListener('click', () => { navLinks.classList.remove('active'); }); });

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Suporte touch para carrosséis de imagens (quartos)
    document.querySelectorAll('.room-carousel').forEach(carousel => {
        let startX = 0;
        carousel.addEventListener('touchstart', e => { startX = e.changedTouches[0].screenX; }, {passive: true});
        carousel.addEventListener('touchend', e => {
            let endX = e.changedTouches[0].screenX;
            let suite = carousel.id.replace('carousel-', '');
            if (startX - endX > 30) moveRoomCarousel(suite, 1);
            else if (endX - startX > 30) moveRoomCarousel(suite, -1);
        });
    });
});

// Carrossel Principal
let heroSlideIndex = 0;
let heroSlideTimer;

function showHeroSlide(index) {
    const slides = document.querySelectorAll('.hero-carousel .slide');
    const dots = document.querySelectorAll('.carousel-indicators .dot');
    if (!slides.length) return;
    
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    if (index >= slides.length) heroSlideIndex = 0;
    if (index < 0) heroSlideIndex = slides.length - 1;
    
    slides[heroSlideIndex].classList.add('active');
    dots[heroSlideIndex].classList.add('active');
}

function nextHeroSlide() {
    heroSlideIndex++;
    showHeroSlide(heroSlideIndex);
}

function startHeroTimer() {
    clearInterval(heroSlideTimer);
    heroSlideTimer = setInterval(nextHeroSlide, 5000);
}

function moveHeroSlide(n) {
    heroSlideIndex += n;
    showHeroSlide(heroSlideIndex);
    startHeroTimer();
}

function currentHeroSlide(n) {
    heroSlideIndex = n;
    showHeroSlide(heroSlideIndex);
    startHeroTimer();
}

startHeroTimer();

// Carrossel Interno
const carouselsPos = { solteiro: 0, casal: 0, duplo: 0, triplo: 0, familia: 0 };
function moveRoomCarousel(suite, dir) {
    const track = document.querySelector(`#carousel-${suite} .room-carousel-track`);
    const slides = track.querySelectorAll('.room-slide');
    if(slides.length === 0) return;
    
    carouselsPos[suite] += dir;
    if (carouselsPos[suite] < 0) carouselsPos[suite] = slides.length - 1;
    if (carouselsPos[suite] >= slides.length) carouselsPos[suite] = 0;
    
    track.style.transform = `translateX(-${carouselsPos[suite] * 100}%)`;
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3500);
}

// Fluxo de Reserva Modal com Suporte a Tradução
let modalState = { suiteKey: null, incluiPet: 'nao', qtdPet: 1, checkin: '', checkout: '' };

function iniciarReserva(suiteKey) {
    modalState.suiteKey = suiteKey;
    modalState.incluiPet = 'nao';
    modalState.qtdPet = 1;

    if(!modalState.checkin) {
        const timezoneOffset = (new Date()).getTimezoneOffset() * 60000;
        const hoje = new Date(Date.now() - timezoneOffset);
        const amanha = new Date(hoje);
        amanha.setDate(amanha.getDate() + 1);
        
        modalState.checkin = hoje.toISOString().split('T')[0];
        modalState.checkout = amanha.toISOString().split('T')[0];
    }

    renderModal();
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function atualizarDatas() {
    const ci = document.getElementById('modal-checkin').value;
    let co = document.getElementById('modal-checkout').value;
    
    if (ci && co) {
        if (co <= ci) {
            const ciDate = new Date(ci);
            ciDate.setDate(ciDate.getDate() + 1);
            co = ciDate.toISOString().split('T')[0];
        }
        modalState.checkin = ci;
        modalState.checkout = co;
        renderModal();
    }
}

function renderModal() {
    const txt = i18n[currentLang];
    const dias = Math.ceil((new Date(modalState.checkout) - new Date(modalState.checkin)) / (1000 * 60 * 60 * 24)) || 1;
    const suite = SUITES[modalState.suiteKey];
    const valorAcomodacao = dias * suite.preco;
    
    let valorPets = 0;
    if (modalState.incluiPet === 'sim') {
        modalState.qtdPet = 1;
        if (dias <= 3) {
            valorPets = 80 * dias;
        } else {
            valorPets = 250;
        }
    }
    
    const valorTotal = valorAcomodacao + valorPets;
    const minCheckin = (new Date()).toISOString().split('T')[0];
    const suiteNomeTraduzido = txt[`room_title_${modalState.suiteKey}`] || suite.nome;

    const modalHTML = `
        <div class="modal-header">
            <h2>${txt.md_title}</h2>
            <button class="close-modal" onclick="fecharModal()">×</button>
        </div>
        
        <div class="modal-body-grid">
            <div class="modal-step">
                <h3>${txt.md_stay_details}</h3>
                <div class="modal-dates">
                    <div class="input-group-modal">
                        <label>${txt.md_checkin}</label>
                        <input type="date" id="modal-checkin" value="${modalState.checkin}" min="${minCheckin}" onchange="atualizarDatas()">
                    </div>
                    <div class="input-group-modal">
                        <label>${txt.md_checkout}</label>
                        <input type="date" id="modal-checkout" value="${modalState.checkout}" onchange="atualizarDatas()">
                    </div>
                </div>
                <p><strong>${txt.md_total_nights}</strong> ${dias}</p>
                <hr>
                <p><strong>${txt.md_suite}</strong> ${suiteNomeTraduzido}</p>
                <p><strong>${txt.md_max_pax}</strong> ${suite.maxPax} ${txt.md_person}</p>
                <p><strong>${txt.md_daily_rate}</strong> ${formatBRL(suite.preco)}</p>
            </div>
            
            <div class="modal-step pet-selection-box">
                <h3>${txt.md_pet_service}</h3>
                <label>${txt.md_pet_ask}</label>
                <div class="radio-group">
                    <label><input type="radio" name="pet_opt" value="nao" ${modalState.incluiPet === 'nao' ? 'checked' : ''} onchange="atualizarPet('nao')"> ${txt.md_no}</label>
                    <label><input type="radio" name="pet_opt" value="sim" ${modalState.incluiPet === 'sim' ? 'checked' : ''} onchange="atualizarPet('sim')"> ${txt.md_yes}</label>
                </div>
                
                ${modalState.incluiPet === 'sim' ? `
                    <div style="margin-top: 15px; font-size: 0.9rem; color: var(--accent); font-weight: 600;">
                        <i class="fas fa-info-circle"></i> ${txt.md_pet_limit}
                    </div>
                ` : ''}
            </div>
        </div>

        <div class="summary-box">
            <div class="summary-row">
                <span>${txt.md_subtotal_room}</span>
                <span>${formatBRL(valorAcomodacao)}</span>
            </div>
            ${modalState.incluiPet === 'sim' ? `
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
        
        <button class="btn-checkout-final" onclick="finalizarReserva()">
            ${txt.md_btn_confirm}
        </button>
    `;

    document.getElementById('modal-content').innerHTML = modalHTML;
}

function atualizarPet(valor) {
    modalState.incluiPet = valor;
    renderModal();
}

function fecharModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}

function finalizarReserva() {
    const txt = i18n[currentLang];
    document.getElementById('modal-content').innerHTML = `
        <div class="success-screen">
            <div class="success-icon">
                <i class="fas fa-check"></i>
            </div>
            <h2>${txt.md_success_title}</h2>
            <p>${txt.md_success_desc}</p>
            <button class="btn-checkout-final btn-back" onclick="fecharModal()">
                ${txt.md_btn_back}
            </button>
        </div>
    `;
}