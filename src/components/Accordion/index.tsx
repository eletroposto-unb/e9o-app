import {ScrollView, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import AccordionItem from './AccordionItem';
import {BACKGROUND, WHITE} from '../../styles/colors';

const HelpText = [
  {
    title: 'Scanner do QRCode',
    content:
      'Se você está enfrentando dificuldades ao usar o scanner de QR Code em nosso aplicativo, aqui estão algumas soluções comuns para os problemas mais frequentes:',
    items: [
      'Certifique-se de que o aplicativo tenha permissão para acessar a câmera;',
      'Limpe a lente da câmera;',
      'Verifique a iluminação;',
      'Mantenha o QR Code dentro da área de escaneamento;',
      'Verifique a qualidade do QR Code;',
      'Reinicie o aplicativo: Se todas as etapas anteriores não resolverem o problema, tente reiniciar o aplicativo. Feche-o completamente e abra-o novamente para uma reinicialização limpa.',
    ],
  },
  {
    title: 'Liberação por NFC',
    content:
      'Caso você esteja tendo dificuldades para ler uma tag NFC em nosso aplicativo, aqui estão algumas soluções para os problemas mais comuns.',
    items: [
      'Verifique se o seu dispositivo suporta NFC;',
      'Ative o NFC no seu dispositivo;',
      'Posicione corretamente a tag NFC;',
      'Remova interferências;',
      'Reinicie o aplicativo: Se todas as etapas anteriores não resolverem o problema, tente reiniciar o aplicativo. Feche-o completamente e abra-o novamente para uma reinicialização limpa.',
    ],
  },
  {
    title: 'Entrar em contato',
    content:
      'Se você precisar de ajuda ou tiver alguma dúvida sobre o nosso serviço, não hesite em entrar em contato conosco. Estamos sempre prontos para ajudar!',
    items: [
      'Você pode nos enviar um e-mail para o endereço: suport@electrogama.com',
    ],
  },
];

const Accordion = (): JSX.Element => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}>
      {HelpText.map((item, index) => {
        return (
          <AccordionItem index={index} title={item.title} items={item.items}>
            <Text style={styles.textSmall}>{item.content}</Text>
            {item.items &&
              item.items.map((i, index) => {
                return (
                  <Text style={styles.listItem}>
                    {index + 1} - {i}
                  </Text>
                );
              })}
          </AccordionItem>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  textSmall: {
    fontSize: 16,
    color: BACKGROUND,
    textAlign: 'justify',
  },
  listItem: {
    fontSize: 16,
    marginTop: 5,
    color: BACKGROUND,
    textAlign: 'left',
  },
});

export default Accordion;
