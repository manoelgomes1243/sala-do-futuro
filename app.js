import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://utcqxtsguerkkplqlvvm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0Y3F4dHNndWVya2twbHFsdnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNjQxNjQsImV4cCI6MjA2NTc0MDE2NH0.go-ovipaSSa-V1ouIbwnXJPVA9Jbwtsrgep48HXquho'
);

// login
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert('Erro ao logar: ' + error.message);
  } else {
    alert('Login bem-sucedido!');
    // redirecionar para dashboard futuramente
  }
});

// signup
document.getElementById('signup-btn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error, data } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert('Erro ao registrar: ' + error.message);
  } else {
    alert('Cadastro realizado com sucesso!');
  }
});