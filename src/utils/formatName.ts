export const formatPayload = (data: formData | User) => {
  const fullName = data.name;
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  return {
    name: firstName,
    surname: lastName,
    email: data.email,
    cpf: data.cpf,
    is_admin: false,
    telefone: '',
    status: 'active',
  };
};
