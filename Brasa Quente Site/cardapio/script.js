// Cardápio da Brasa Quente
const cardapio = [
    // CARNES
    {
        id: 1,
        nome: "Picanha Nobre",
        descricao: "Corte nobre grelhado na brasa, acompanha farofa e vinagrete",
        preco: 89.90,
        categoria: "carnes",
        imagem: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500"
    },
    {
        id: 2,
        nome: "Costela Premium",
        descricao: "Costela assada por 8 horas, super macia e suculenta",
        preco: 79.90,
        categoria: "carnes",
        imagem: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500"
    },
    {
        id: 3,
        nome: "Fraldinha na Brasa",
        descricao: "Fraldinha temperada com sal grosso, acompanha alho assado",
        preco: 69.90,
        categoria: "carnes",
        imagem: "https://images.unsplash.com/photo-1558030006-450675393462?w=500"
    },
    {
        id: 4,
        nome: "Cordeiro Especial",
        descricao: "Paleta de cordeiro assada com alecrim e hortelã",
        preco: 94.90,
        categoria: "carnes",
        imagem: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500"
    },
    {
        id: 5,
        nome: "Maminha na Manteiga",
        descricao: "Maminha grelhada com manteiga de alho e ervas",
        preco: 74.90,
        categoria: "carnes",
        imagem: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=500"
    },
    {
        id: 6,
        nome: "Espetinho Misto",
        descricao: "Espetinhos de carne, frango e calabresa com pimentão e cebola",
        preco: 49.90,
        categoria: "carnes",
        imagem: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500"
    },
    
    // ACOMPANHAMENTOS
    {
        id: 7,
        nome: "Arroz Carreteiro",
        descricao: "Arroz com carne seca, bacon e temperos especiais",
        preco: 29.90,
        categoria: "acompanhamentos",
        imagem: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=500"
    },
   
    {
        id: 9,
        nome: "Batata Frita",
        descricao: "Batatas rústicas crocantes com alecrim e sal",
        preco: 24.90,
        categoria: "acompanhamentos",
        imagem: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500"
    },
    {
        id: 10,
        nome: "Vinagrete Caseiro",
        descricao: "Tomate, cebola, pimentão e cheiro-verde",
        preco: 14.90,
        categoria: "acompanhamentos",
        imagem: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500"
    },
    
    
    // BEBIDAS
    {
        id: 12,
        nome: "Caipirinha",
        descricao: "Clássica brasileira com limão, açúcar e cachaça",
        preco: 18.90,
        categoria: "bebidas",
        imagem: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500"
    },
    {
        id: 13,
        nome: "Suco Natural",
        descricao: "Laranja, limão, maracujá ou abacaxi (500ml)",
        preco: 12.90,
        categoria: "bebidas",
        imagem: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500"
    },
    {
        id: 14,
        nome: "Refrigerante",
        descricao: "Coca-Cola, Guaraná, Fanta ou Sprite (350ml)",
        preco: 8.90,
        categoria: "bebidas",
        imagem: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=500"
    },
    {
        id: 15,
        nome: "Chopp Brahma",
        descricao: "Chopp gelado (500ml)",
        preco: 14.90,
        categoria: "bebidas",
        imagem: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=500"
    },
    {
        id: 16,
        nome: "Vinho Tinto",
        descricao: "Taça de vinho chileno reservado",
        preco: 24.90,
        categoria: "bebidas",
        imagem: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500"
    },
    
    // SOBREMESAS
    {
        id: 17,
        nome: "Cupcake",
        descricao: "Cupcake de caramelo com raspadinha de laranja",
        preco: 16.90,
        categoria: "sobremesas",
        imagem: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=500"
    },
    {
        id: 18,
        nome: "Petit Gateau",
        descricao: "Bolo de chocolate com recheio quente, acompanha sorvete",
        preco: 22.90,
        categoria: "sobremesas",
        imagem: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500"
    },
   
    {
        id: 20,
        nome: "Sorvete Artesanal",
        descricao: "Sabores: chocolate, baunilha, morango ou doce de leite",
        preco: 14.90,
        categoria: "sobremesas",
        imagem: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500"
    }
];

// Função para renderizar os itens do cardápio
function renderizarCardapio(categoria = "todos") {
    const grid = document.getElementById("cardapio-grid");
    
    let itensFiltrados = cardapio;
    if (categoria !== "todos") {
        itensFiltrados = cardapio.filter(item => item.categoria === categoria);
    }
    
    if (itensFiltrados.length === 0) {
        grid.innerHTML = `
            <div class="sem-itens">
                <p>Nenhum item encontrado nesta categoria.</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = itensFiltrados.map(item => `
        <div class="card-item">
            <img src="${item.imagem}" alt="${item.nome}" class="item-imagem">
            <div class="item-info">
                <h3 class="item-nome">${item.nome}</h3>
                <p class="item-descricao">${item.descricao}</p>
                <div class="item-preco">R$ ${item.preco.toFixed(2)}</div>
            </div>
        </div>
    `).join("");
}

// Configurar os botões de categoria
function configurarCategorias() {
    const botoes = document.querySelectorAll(".categoria-btn");
    
    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            // Remove active de todos
            botoes.forEach(btn => btn.classList.remove("active"));
            // Adiciona active no clicado
            botao.classList.add("active");
            
            const categoria = botao.getAttribute("data-categoria");
            renderizarCardapio(categoria);
        });
    });
}

// Inicializar a página
document.addEventListener("DOMContentLoaded", () => {
    renderizarCardapio("todos");
    configurarCategorias();
});