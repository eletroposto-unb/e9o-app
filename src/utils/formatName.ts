export const formatName = (name: string) => {
  const fullName: string = name;
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  return {firstName, lastName};
};

export const formatPayload = (data: formData | User) => {
  const {firstName, lastName} = formatName(data.name);
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
