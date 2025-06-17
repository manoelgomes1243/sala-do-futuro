import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Inicializa o Supabase
const supabase = createClient(
  'https://utcqxtsguerkkplqlvvm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...substitua_com_a_sua_public_key...'
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

  // Verifica se é admin
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
