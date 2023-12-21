import TouchID from 'react-native-touch-id';

type HandleSignInFunction = () => void;

export const useBiometricAuthentication = (
  handleSignIn: HandleSignInFunction,
) => {
  const optionalConfigObject = {
    title: 'Acesso com digital', // Android
    imageColor: '#3498db', // Android
    imageErrorColor: '#ff0000',
    errorMessage: 'Erro de autenticação', // Alteração da mensagem de erro
    sensorDescription: 'Posicione o dedo no leitor biométrico do seu celular', // Android
    sensorErrorDescription: 'Autenticação falhou tente novamente', // Android
    cancelText: 'Cancelar', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS
  };
  const authenticateWithBiometrics = async () => {
    try {
      const isSupported = await TouchID.isSupported();
      if (isSupported) {
        const biometryType = await TouchID.authenticate(
          '',
          optionalConfigObject,
        );
        if (biometryType) {
          handleSignIn();
        }
      } else {
        console.log('Biometria não suportada neste dispositivo.');
      }
    } catch (error) {
      console.log('Falha na autenticação biométrica:', error.message);
    }
  };

  return authenticateWithBiometrics;
};
