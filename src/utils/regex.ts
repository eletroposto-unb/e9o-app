export const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
export const cpfRegex: RegExp = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})$/;
export const passwordRegex: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
export const nameRegex: RegExp = /^[a-z0-9_-]{3,15}$/;
