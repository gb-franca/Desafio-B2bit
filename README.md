# 🔑 Desafio de Implementação: Tela de Login e Autenticação (B2BIT)

Este projeto implementa o fluxo completo de autenticação (Login, Persistência de Sessão e Rota Protegida) conforme especificado no desafio técnico.

---

## 🚀 Status do Projeto e Acesso

| Detalhe | Valor |
| :--- | :--- |
| **URL da Aplicação (Deploy):** | **https://desafio-b2bit-beige.vercel.app/** |
| **Tecnologias Utilizadas:** | React.js, TypeScript, Vite, React Router DOM, Formik & Yup |
| **Ambiente de Teste:** | Homologação (API de Terceiros) |

### Credenciais de Teste

Para acessar a área restrita, utilize as seguintes credenciais válidas:

| Campo | Valor |
| :--- | :--- |
| **E-mail:** | `cliente@youdrive.com` |
| **Senha:** | `password` |

---

## ✨ Funcionalidades Implementadas

O projeto atende a todos os requisitos funcionais solicitados, incluindo:

1.  **Login (Sign In):** Integração via `fetch` com a API de homologação para autenticação.
2.  **Persistência de Sessão:** Uso de **Context API** e **`localStorage`** para manter o usuário logado entre sessões e recarregamentos de página.
3.  **Roteamento Protegido:** A página `/profile` é protegida, redirecionando o usuário para `/` (Login) se não houver um token válido.
4.  **Busca de Perfil:** Requisição GET para `/auth/profile/` utilizando o **Token JWT (Bearer)** no cabeçalho.
5.  **Logout:** Botão "Sair" que remove o token e encerra a sessão.
6.  **UX:** Validação de formulário robusta com **Formik** e **Yup**.

---

## 🛠️ Como Executar o Projeto Localmente

Siga estas instruções para clonar e rodar a aplicação na sua máquina:

1.  **Clone o Repositório:**
    ```bash
    git clone [https://docs.github.com/pt/repositories/creating-and-managing-repositories/quickstart-for-repositories](https://docs.github.com/pt/repositories/creating-and-managing-repositories/quickstart-for-repositories)
    cd desafio-b2bit
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173/` (ou outra porta indicada).

    ## 👤 Desenvolvedor

Este projeto foi desenvolvido por:

* **Gabriel França** (GitHub: `gb-franca`)
