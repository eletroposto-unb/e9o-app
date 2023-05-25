export const formatName = (name: string) => {
  const fullName: string = name;
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  return {firstName, lastName};
};

export const formatUserPayload = (data: formData | User) => {
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

export const formatCarPayload = (data: formCarData | Car, user: User) => {
  console.log('formatCarPayload', data);
  return {
    placa: data.placa,
    modelo: data.modelo,
    tipo: data.tipo,
    marca: data.marca,
    ano: data.ano,
    tipoPlug: data.tipoPlug,
    cpf: user.cpf,
  };
};
