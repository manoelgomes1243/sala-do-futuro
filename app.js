import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
  'https://raedcdrreigrbtuilbhx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhZWRjZHJyZWlncmJ0dWlsYmh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNjg3NzMsImV4cCI6MjA2NTc0NDc3M30.m78xB8qTRRdtc1Qd1GU49ZJFrj7dyD7OdqonQ1mX7iY'
);

// LOGIN
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error, data } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert('Erro ao logar: ' + error.message);
    return;
  }

  const { data: isAdmin, error: adminError } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email);

  if (adminError) {
    alert('Erro ao verificar permissões: ' + adminError.message);
    return;
  }

  if (isAdmin && isAdmin.length > 0) {
    window.location.href = './dashboard.html';
  } else {
    alert('Login bem-sucedido, mas sem acesso de administrador.');
  }
});

// REGISTRO
document.getElementById('signup-btn').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    alert('Erro ao registrar: ' + error.message);
  } else {
    alert('Cadastro feito com sucesso!');
  }
});
