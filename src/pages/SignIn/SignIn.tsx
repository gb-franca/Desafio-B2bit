// src/pages/SignIn/SignIn.tsx - CÓDIGO OTIMIZADO

import React, { useState } from 'react';
import { useFormik } from 'formik'; 
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

import CardContainer from '../../components/CardContainer/CardContainer';
import './SignIn.css';
import b2bitLogo from "../../assets/B2Bit Logo.png"; 

// Schema de validação usando Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

const SignIn: React.FC = () => {
  const { login } = useAuth(); // Função de login do contexto
  const navigate = useNavigate();
  
  const [apiError, setApiError] = useState<string | null>(null);

  // Inicialização do Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setApiError(null); // Limpa erros antes da submissão
      
      try {
        await login({ email: values.email, password: values.password });

        // Redireciona para o perfil após login bem-sucedido
        navigate('/profile'); 
        
      } catch (erro) {
        // Exibe erro de credenciais (capturado do 'login' no AuthContext)
        setApiError('Credenciais Inválidas. Por favor, verifique e tente novamente.'); 
      }
    },
  });

  // Função auxiliar para renderizar o feedback de erro (Formik ou API)
  const renderError = (field: keyof typeof formik.errors) => {
    return formik.touched[field] && formik.errors[field] ? (
      <div className="validation-error">{formik.errors[field]}</div>
    ) : null;
  };

  return (
    <CardContainer>
      
      {/* Logotipo da aplicação */}
      <div className="logo-placeholder">
        <img src={b2bitLogo} alt="b2bit logo" />
      </div>

      {/* Exibe o erro de autenticação da API, se existir */}
      {apiError && (
        <div className="error-message">
          {apiError}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}> 
        
        {/* Campo E-mail */}
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="@gmail.com"
            className={`input-field ${renderError('email') ? 'input-error' : ''}`}
            {...formik.getFieldProps('email')} // Liga o campo ao Formik
          />
          {renderError('email')} {/* Exibe erro de validação do Formik */}
        </div>

        {/* Campo Senha */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="************"
            className={`input-field ${renderError('password') ? 'input-error' : ''}`}
            {...formik.getFieldProps('password')} // Liga o campo ao Formik
          />
          {renderError('password')} {/* Exibe erro de validação do Formik */}
        </div>

        {/* Botão de Login */}
        <button 
          type="submit" 
          className="sign-in-button"
          // Desabilita se estiver enviando OU se houver erros de validação
          disabled={formik.isSubmitting || !formik.isValid} 
        >
          {formik.isSubmitting ? 'Entrando...' : 'Sign In'}
        </button>
      </form>

    </CardContainer>
  );
};

export default SignIn;