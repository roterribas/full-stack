import app from "./src/app.js";

const PORT = 3000;

// Executar a porta 300
app.listen(PORT, () => {
    console.log(`SERVIDOR RODANDO NO ENDEREÇO HTTP://LOCALHOST:${PORT}`)
});