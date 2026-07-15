/* =========================================================
   CONFORT VEÍCULOS
   LANDING PAGE INSTITUCIONAL
========================================================= */


/* =========================================================
   CONFIGURAÇÕES
========================================================= */

const CONFIG = {
  companyName: "Confort Veículos",

  whatsapp: "5544999999999",

  whatsappDisplay: "(44) 99999-9999",

  instagramUrl: "https://www.instagram.com/confortveiculos",

  instagramDisplay: "@confortveiculos",

  address: "Insira o endereço da loja",

  openingHours: "Segunda a sexta, das 8h às 18h | Sábado, das 8h às 13h"
};


/* =========================================================
   ELEMENTOS
========================================================= */

const header = document.querySelector(".header");

const menuButton = document.getElementById("menuButton");

const navigation = document.getElementById("navigation");

const navigationLinks = document.querySelectorAll(".navigation-link");

const financeForm = document.getElementById("financeForm");

const contactForm = document.getElementById("contactForm");

const financePhone = document.getElementById("financePhone");

const contactPhone = document.getElementById("contactPhone");

const financeEntry = document.getElementById("financeEntry");

const vehicleLinks = document.querySelectorAll("[data-vehicle]");

const whatsappLink = document.getElementById("whatsappLink");

const footerWhatsapp = document.getElementById("footerWhatsapp");

const floatingWhatsapp = document.getElementById("floatingWhatsapp");

const instagramLink = document.getElementById("instagramLink");

const whatsappText = document.getElementById("whatsappText");

const instagramText = document.getElementById("instagramText");

const addressText = document.getElementById("addressText");

const openingHoursText = document.getElementById("openingHoursText");

const currentYear = document.getElementById("currentYear");


/* =========================================================
   WHATSAPP
========================================================= */

function createWhatsAppUrl(message) {
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${CONFIG.whatsapp}?text=${encodedMessage}`;
}


function openWhatsApp(message) {
  const url = createWhatsAppUrl(message);

  window.open(url, "_blank", "noopener,noreferrer");
}


function configureContactLinks() {
  const defaultMessage =
    `Olá! Vim pelo site da ${CONFIG.companyName} ` +
    `e gostaria de receber mais informações.`;

  const whatsappUrl = createWhatsAppUrl(defaultMessage);

  const whatsappElements = [
    whatsappLink,
    footerWhatsapp,
    floatingWhatsapp
  ];

  whatsappElements.forEach((element) => {
    if (!element) return;

    element.href = whatsappUrl;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
  });

  if (instagramLink) {
    instagramLink.href = CONFIG.instagramUrl;
    instagramLink.target = "_blank";
    instagramLink.rel = "noopener noreferrer";
  }

  if (whatsappText) {
    whatsappText.textContent = CONFIG.whatsappDisplay;
  }

  if (instagramText) {
    instagramText.textContent = CONFIG.instagramDisplay;
  }

  if (addressText) {
    addressText.textContent = CONFIG.address;
  }

  if (openingHoursText) {
    openingHoursText.textContent = CONFIG.openingHours;
  }
}


/* =========================================================
   MENU MOBILE
========================================================= */

function closeMobileMenu() {
  menuButton?.classList.remove("active");
  navigation?.classList.remove("active");

  menuButton?.setAttribute("aria-expanded", "false");

  document.body.classList.remove("menu-open");
}


menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.classList.toggle("active");

  navigation?.classList.toggle("active", isOpen);

  menuButton.setAttribute(
    "aria-expanded",
    isOpen ? "true" : "false"
  );

  document.body.classList.toggle("menu-open", isOpen);
});


navigationLinks.forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});


document.addEventListener("click", (event) => {
  const clickedMenu = navigation?.contains(event.target);

  const clickedButton = menuButton?.contains(event.target);

  if (
    navigation?.classList.contains("active") &&
    !clickedMenu &&
    !clickedButton
  ) {
    closeMobileMenu();
  }
});


document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});


/* =========================================================
   HEADER
========================================================= */

function updateHeader() {
  if (!header) return;

  header.classList.toggle("scrolled", window.scrollY > 30);
}


window.addEventListener("scroll", updateHeader);


/* =========================================================
   NAVEGAÇÃO ATIVA
========================================================= */

function updateActiveNavigation() {
  const sections = document.querySelectorAll("main section[id]");

  let activeSection = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 160;

    if (window.scrollY >= top) {
      activeSection = section.id;
    }
  });

  navigationLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${activeSection}`) {
      link.classList.add("active");
    }
  });
}


window.addEventListener("scroll", updateActiveNavigation);


/* =========================================================
   ANIMAÇÕES AO ROLAR
========================================================= */

function initializeRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => {
      element.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}


/* =========================================================
   MÁSCARAS
========================================================= */

function phoneMask(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}


function currencyMask(value) {
  const numbers = value.replace(/\D/g, "");

  if (!numbers) return "";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Number(numbers));
}


[financePhone, contactPhone].forEach((input) => {
  input?.addEventListener("input", () => {
    input.value = phoneMask(input.value);
  });
});


financeEntry?.addEventListener("input", () => {
  financeEntry.value = currencyMask(financeEntry.value);
});


/* =========================================================
   FORMULÁRIO DE FINANCIAMENTO
========================================================= */

financeForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(financeForm);

  const name = formData.get("nome")?.toString().trim();

  const phone = formData.get("telefone")?.toString().trim();

  const interest = formData.get("interesse")?.toString().trim();

  const entry = formData.get("entrada")?.toString().trim();

  const trade = formData.get("troca")?.toString().trim();

  if (!name || !phone) {
    alert("Preencha seu nome e WhatsApp.");
    return;
  }

  const message = [
    "Olá! Gostaria de solicitar uma simulação de financiamento.",
    "",
    `Nome: ${name}`,
    `WhatsApp: ${phone}`,
    `Veículo de interesse: ${interest || "Ainda não definido"}`,
    `Valor de entrada: ${entry || "A definir"}`,
    `Possui veículo na troca: ${trade || "Não informado"}`
  ].join("\n");

  openWhatsApp(message);
});


/* =========================================================
   FORMULÁRIO DE CONTATO
========================================================= */

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);

  const name = formData.get("nome")?.toString().trim();

  const phone = formData.get("telefone")?.toString().trim();

  const subject = formData.get("assunto")?.toString().trim();

  const messageText = formData.get("mensagem")?.toString().trim();

  if (!name || !phone || !subject) {
    alert("Preencha os campos obrigatórios.");
    return;
  }

  const message = [
    `Olá! Vim pelo site da ${CONFIG.companyName}.`,
    "",
    `Nome: ${name}`,
    `WhatsApp: ${phone}`,
    `Interesse: ${subject}`,
    `Mensagem: ${messageText || "Nenhuma observação adicional"}`
  ].join("\n");

  openWhatsApp(message);
});


/* =========================================================
   INTERESSE POR TIPO DE VEÍCULO
========================================================= */

vehicleLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const vehicleType = link.dataset.vehicle;

    const contactSubject = document.getElementById("contactSubject");

    const contactMessage = document.getElementById("contactMessage");

    if (contactSubject) {
      contactSubject.value = "Consultar veículos disponíveis";
    }

    if (contactMessage) {
      contactMessage.value =
        `Gostaria de conhecer as opções de ${vehicleType} disponíveis.`;
    }
  });
});


/* =========================================================
   ANO AUTOMÁTICO
========================================================= */

function setCurrentYear() {
  if (!currentYear) return;

  currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

function initializeSite() {
  configureContactLinks();

  initializeRevealAnimations();

  setCurrentYear();

  updateHeader();

  updateActiveNavigation();
}


document.addEventListener("DOMContentLoaded", initializeSite);