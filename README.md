# Recuperação de senha

**RF (Requisitos funcionais)**

- o usuario deve poder recuperar sua senha informando o seu email;
- o usuario deve receber um email com instrucoes de recuperacao de senha;
- o usuario deve poder resetar sua senha;

**RNF (Requisitos não-funcionais)**

- utilizar mailtrap para testar envios em ambiente de dev;
- utilizar amazon ses para envios em producao;
- o envio de emails deve acontecer em segundo plano (background jobs);

**RN (Regras de negócio)**

- o link enviado por email para resetar a senha deve expirar em 2h;
- o usuario precisa confirmar a nova senha ao resetar sua senha;

# Atualização do Perfil

**RF (Requisitos funcionais)**

- o usuario deve poder atualizar seu nome, email e senha;

**RN (Regras de negócio)**

- o usuario nao pode alterar seu email para um email ja utilizado;
- para atualizar a senha, o usuario deve informar a senha antiga;
- para atualizar a senha, o usuario precisa confirmar a nova senha;

# Painel do prestador

# Agendamento de serviços

**RF (Requisitos funcionais)**

- o usuario deve poder listar todos prestadores de servico cadastrados;
- o usuario deve poder listar os dias de um mes com pelo menos um  horario disponivel de um prestador;
- o usuario deve poder lsitar horarios disponiveis em um dia especifico de um prestador;
- o usuario deve poder realizar um novo agendamento com um prestador;

**RNF (Requisitos não-funcionais)**

- a listagem de prestadores deve ser armazenada em cache;

**RN (Regras de negócio)**

- cada agendamento deve durar 1h exatamente;
- os agendamentos devem estar disponiveis entre 8h às 18h;
- o usuario nao pode agendar em um horario ocupado;
- o usuario nao pode agendar em um horario que ja passou;
- o usuario nao pode agendar servicos consigo mesmo;


