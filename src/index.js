/*
O arquivo index.js é o ponto de entrada para a aplicação React. 

É aqui que o componente raiz da sua aplicação é renderizado na página. 

O papel deste arquivo é iniciar a aplicação React. Ele renderiza o 
componente App (que é o componente principal da sua aplicação) no 
elemento com o ID 'root' do seu HTML. Isso geralmente é feito no index.html
na pasta public do seu projeto.

O React.StrictMode é um utilitário que pode ajudar a detectar problemas 
potenciais no seu código durante o desenvolvimento. Ele não afeta o comportamento
da aplicação em produção, e pode ser removido se desejar.
*/

// Importando módulos necessários
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// O método ReactDOM.render é usado para renderizar um elemento React dentro do elemento root do seu HTML.
// Nesse caso, ele está renderizando o componente App dentro do elemento com id 'root'.
ReactDOM.render(
  // React.StrictMode é um wrapper que verifica possíveis problemas na aplicação durante o desenvolvimento.
  // É bom para garantir que o código siga as melhores práticas de React, mas é opcional.
  <React.StrictMode>
    
    <App />
  </React.StrictMode>,
  // Isso seleciona o elemento HTML com id 'root' para renderizar o componente.
  document.getElementById('root')
);
